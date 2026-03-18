// Set MPESA_ENV secret to "production" to use live API, defaults to sandbox
const MPESA_BASE_SANDBOX    = 'https://sandbox.safaricom.co.ke';
const MPESA_BASE_PRODUCTION = 'https://api.safaricom.co.ke';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function getTimestamp() {
  return new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
}

async function getAccessToken(consumerKey, consumerSecret, base) {
  const credentials = btoa(`${consumerKey}:${consumerSecret}`);
  const res = await fetch(`${base}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Access token error (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

function normalizePhone(raw) {
  let phone = raw.toString().trim().replace(/\s+/g, '').replace(/^\+/, '');
  if (phone.startsWith('0')) phone = '254' + phone.slice(1);
  if (!phone.startsWith('254')) phone = '254' + phone;
  return phone;
}

function getMpesaCredentials(env) {
  const consumerKey    = env.MPESA_CONSUMER_KEY;
  const consumerSecret = env.MPESA_CONSUMER_SECRET;
  const shortCode      = env.MPESA_SHORTCODE;
  const passkey        = env.MPESA_PASSKEY;
  const base           = env.MPESA_ENV === 'production' ? MPESA_BASE_PRODUCTION : MPESA_BASE_SANDBOX;
  return { consumerKey, consumerSecret, shortCode, passkey, base };
}

async function handleSTKPush(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { phone, amount, description } = body;
  if (!phone || !amount) {
    return json({ error: 'phone and amount are required' }, 400);
  }

  const { consumerKey, consumerSecret, shortCode, passkey, base } = getMpesaCredentials(env);
  if (!consumerKey || !consumerSecret) {
    return json({ error: 'M-Pesa credentials not configured on server' }, 500);
  }
  if (!shortCode || !passkey) {
    return json({ error: 'M-Pesa shortcode and passkey not configured on server' }, 500);
  }

  const callbackUrl = env.MPESA_CALLBACK_URL || 'https://connect-grow.pwriter455.workers.dev/api/mpesa/callback';

  try {
    const timestamp = getTimestamp();
    const password = btoa(`${shortCode}${passkey}${timestamp}`);
    const accessToken = await getAccessToken(consumerKey, consumerSecret, base);
    const normalizedPhone = normalizePhone(phone);

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(Number(amount)),
      PartyA: normalizedPhone,
      PartyB: shortCode,
      PhoneNumber: normalizedPhone,
      CallBackURL: callbackUrl,
      AccountReference: 'McGibsDigital',
      TransactionDesc: description || 'Payment for digital services',
    };

    const stkRes = await fetch(`${base}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const stkData = await stkRes.json();

    if (!stkRes.ok || stkData.errorCode) {
      return json({ error: stkData.errorMessage || 'STK push failed', details: stkData }, 400);
    }

    return json({
      success: true,
      checkoutRequestId: stkData.CheckoutRequestID,
      merchantRequestId: stkData.MerchantRequestID,
      message: 'STK push sent. Check your phone to complete payment.',
    });
  } catch (err) {
    return json({ error: err.message || 'Internal server error' }, 500);
  }
}

async function handleSTKQuery(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { checkoutRequestId } = body;
  if (!checkoutRequestId) {
    return json({ error: 'checkoutRequestId is required' }, 400);
  }

  const { consumerKey, consumerSecret, shortCode, passkey, base } = getMpesaCredentials(env);
  if (!consumerKey || !consumerSecret || !shortCode || !passkey) {
    return json({ error: 'M-Pesa credentials not configured on server' }, 500);
  }

  try {
    const timestamp = getTimestamp();
    const password = btoa(`${shortCode}${passkey}${timestamp}`);
    const accessToken = await getAccessToken(consumerKey, consumerSecret, base);

    const queryRes = await fetch(`${base}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }),
    });

    const data = await queryRes.json();
    const code = String(data.ResultCode);

    if (code === '0') {
      return json({ status: 'success', message: 'Payment confirmed. Thank you!' });
    } else if (code === '1032') {
      return json({ status: 'cancelled', message: 'Payment was cancelled.' });
    } else if (code === '1037') {
      return json({ status: 'timeout', message: 'Payment timed out.' });
    } else if (data.errorCode === '500.001.1001') {
      // Transaction still in progress — client should keep polling
      return json({ status: 'pending', message: 'Waiting for payment...' });
    } else {
      // Any other non-zero code is still pending or unknown
      return json({ status: 'pending', message: data.ResultDesc || 'Processing...' });
    }
  } catch (err) {
    return json({ error: err.message || 'Query failed' }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (url.pathname === '/api/mpesa/stkpush' && request.method === 'POST') {
      return handleSTKPush(request, env);
    }

    if (url.pathname === '/api/mpesa/query' && request.method === 'POST') {
      return handleSTKQuery(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
