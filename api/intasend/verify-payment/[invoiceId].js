// api/intasend/verify-payment/[invoiceId].js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { invoiceId } = req.query;
    const intasendSecretKey = process.env.VITE_INTASEND_SECRET_KEY;

    if (!intasendSecretKey || intasendSecretKey === 'your_secret_key_here') {
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Intasend secret key not configured'
      });
    }

    const response = await fetch(`https://api.intasend.com/v1/checkout/${invoiceId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${intasendSecretKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to verify payment: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      error: 'Payment verification failed',
      message: error.message 
    });
  }
}
