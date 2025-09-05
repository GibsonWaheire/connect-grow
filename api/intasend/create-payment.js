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
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Amount, email, phone, and first_name are required'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount',
        message: 'Amount must be greater than 0'
      });
    }

    const intasendSecretKey = process.env.VITE_INTASEND_SECRET_KEY;
    if (!intasendSecretKey || intasendSecretKey === 'your_secret_key_here') {
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Intasend secret key not configured'
      });
    }

    const response = await fetch('https://api.intasend.com/v1/checkout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${intasendSecretKey}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        email,
        phone,
        first_name,
        last_name,
        reference,
        description,
        environment: process.env.VITE_INTASEND_ENVIRONMENT || 'sandbox',
        metadata,
        // Optional enhanced parameters
        ...(country && { country }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(zipcode && { zipcode }),
        ...(method && { method }),
        ...(card_tarrif && { card_tarrif }),
        ...(mobile_tarrif && { mobile_tarrif }),
        ...(redirect_url && { redirect_url })
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Intasend API error: ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ 
      error: 'Payment creation failed',
      message: error.message 
    });
  }
}
