// api/create-intasend-checkout.js
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
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      redirect_url,
      comment
    } = req.body;

    // Validate required fields
    if (!amount || !currency || !email || !first_name) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Amount, currency, email, and first_name are required'
      });
    }

    const intasendSecretKey = process.env.VITE_INTASEND_SECRET_KEY;
    if (!intasendSecretKey || intasendSecretKey === 'your_secret_key_here') {
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Intasend secret key not configured'
      });
    }

    // Use sandbox API for testing
    const apiUrl = process.env.VITE_INTASEND_ENVIRONMENT === 'live' 
      ? 'https://api.intasend.com/v1/checkout/'
      : 'https://sandbox.intasend.com/api/v1/checkout/';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${intasendSecretKey}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        email,
        phone: phone_number,
        first_name,
        last_name,
        comment,
        redirect_url,
        environment: process.env.VITE_INTASEND_ENVIRONMENT || 'sandbox'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('IntaSend API error:', errorData);
      throw new Error(`Intasend API error: ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('✅ IntaSend checkout created:', data);
    res.json(data);
  } catch (error) {
    console.error('Checkout creation error:', error);
    res.status(500).json({ 
      error: 'Checkout creation failed',
      message: error.message 
    });
  }
}
