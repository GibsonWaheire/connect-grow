const MPESA_BASE = 'https://api.safaricom.co.ke';

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
  // Format: YYYYMMDDHHmmss
  return new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
}

async function getAccessToken(consumerKey, consumerSecret) {
  const credentials = btoa(`${consumerKey}:${consumerSecret}`);
  const res = await fetch(`${MPESA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
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

async function handleSTKPush(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

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

  const consumerKey = env.MPESA_CONSUMER_KEY;
  const consumerSecret = env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    return json({ error: 'M-Pesa credentials not configured on server' }, 500);
  }

  const shortCode = env.MPESA_SHORTCODE;
  const passkey = env.MPESA_PASSKEY;
  const callbackUrl = env.MPESA_CALLBACK_URL || 'https://connect-grow.pwriter455.workers.dev/api/mpesa/callback';

  if (!shortCode || !passkey) {
    return json({ error: 'M-Pesa shortcode and passkey not configured on server' }, 500);
  }

  try {
    const timestamp = getTimestamp();
    const password = btoa(`${shortCode}${passkey}${timestamp}`);
    const accessToken = await getAccessToken(consumerKey, consumerSecret);
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

    const stkRes = await fetch(`${MPESA_BASE}/mpesa/stkpush/v1/processrequest`, {
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API routes FIRST
    if (url.pathname === '/api/mpesa/stkpush' && request.method === 'POST') {
      return handleSTKPush(request, env);
    }

    // OPTIONS preflight for the API route
    if (url.pathname === '/api/mpesa/stkpush' && request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Static assets LAST
    return env.ASSETS.fetch(request);
  },
};
