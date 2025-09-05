// api/intasend/create-payment.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Request received:', {
      method: req.method,
      body: req.body,
      headers: req.headers
    });

    const {
      amount,
      currency,
      email,
      phone,
      first_name,
      last_name,
      reference,
      description,
      metadata,
      country,
      address,
      city,
      state,
      zipcode,
      method,
      card_tarrif,
      mobile_tarrif,
      redirect_url
    } = req.body;

    // Validate required fields
    if (!amount || !email || !phone || !first_name) {
      console.log('❌ Missing required fields:', { amount, email, phone, first_name });
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Amount, email, phone, and first_name are required'
      });
    }

    if (amount <= 0) {
      console.log('❌ Invalid amount:', amount);
      return res.status(400).json({ 
        error: 'Invalid amount',
        message: 'Amount must be greater than 0'
      });
    }

    // Use INTASEND_PRIVATE_KEY instead of VITE_INTASEND_SECRET_KEY
    const intasendPrivateKey = process.env.INTASEND_PRIVATE_KEY;
    const environment = process.env.VITE_INTASEND_ENVIRONMENT || 'sandbox';
    
    console.log('🔍 Environment check:', {
      hasPrivateKey: !!intasendPrivateKey,
      environment: environment,
      keyLength: intasendPrivateKey ? intasendPrivateKey.length : 0
    });

    if (!intasendPrivateKey || intasendPrivateKey === 'your_secret_key_here') {
      console.log('❌ Intasend private key not configured');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Intasend private key not configured'
      });
    }

    // Use the correct IntaSend API endpoint based on documentation
    const apiUrl = environment === 'live' 
      ? 'https://api.intasend.com/api/v1/checkout/'
      : 'https://sandbox.intasend.com/api/v1/checkout/';

    console.log('🔍 Using IntaSend API URL:', apiUrl);

    // Prepare checkout payload - simplified format
    const checkoutPayload = {
      amount: parseFloat(amount),
      currency: currency || 'USD',
      email,
      phone,
      first_name,
      last_name,
      redirect_url: redirect_url || `${req.headers.origin || 'https://connect-order-grow.vercel.app'}/payment-success`,
      description: description || `Payment for ${first_name} ${last_name}`,
      environment: environment
    };

    console.log('🔍 IntaSend checkout payload:', checkoutPayload);
    console.log('🔍 Using private key:', intasendPrivateKey.substring(0, 10) + '...');

    // Try the standard IntaSend API call
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${intasendPrivateKey}`,
        },
        body: JSON.stringify(checkoutPayload),
      });

      console.log('🔍 IntaSend response status:', response.status);
      console.log('🔍 IntaSend response headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('🔍 IntaSend response body:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText };
        }
        
        console.error('❌ IntaSend API error:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          apiUrl,
          payload: checkoutPayload
        });
        
        return res.status(response.status).json({ 
          error: 'IntaSend API error',
          message: `Status: ${response.status} - ${errorData.message || response.statusText}`,
          details: errorData,
          apiUrl,
          payload: checkoutPayload
        });
      }

      // Parse successful response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('❌ Failed to parse IntaSend response:', responseText);
        return res.status(500).json({ 
          error: 'Invalid response from IntaSend',
          message: 'Failed to parse response',
          responseText
        });
      }

      console.log('✅ IntaSend checkout created successfully:', data);
      res.json(data);
    } catch (error) {
      console.error('❌ IntaSend API call failed:', error);
      return res.status(500).json({ 
        error: 'IntaSend API call failed',
        message: error.message,
        apiUrl,
        payload: checkoutPayload
      });
    }
  } catch (error) {
    console.error('❌ Payment creation error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      error: 'Payment creation failed',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
}
