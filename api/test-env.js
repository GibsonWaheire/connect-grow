// api/test-env.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const envCheck = {
      hasIntasendPrivateKey: !!process.env.INTASEND_PRIVATE_KEY,
      intasendEnvironment: process.env.VITE_INTASEND_ENVIRONMENT || 'sandbox',
      nodeEnv: process.env.NODE_ENV,
      // Don't expose the actual key, just show if it exists and its length
      keyLength: process.env.INTASEND_PRIVATE_KEY ? process.env.INTASEND_PRIVATE_KEY.length : 0,
      // Check if it's the default placeholder
      isPlaceholder: process.env.INTASEND_PRIVATE_KEY === 'your_secret_key_here'
    };

    console.log('🔍 Environment check:', envCheck);

    res.json({
      success: true,
      environment: envCheck,
      message: 'Environment variables check completed'
    });
  } catch (error) {
    console.error('❌ Environment check error:', error);
    res.status(500).json({ 
      error: 'Environment check failed',
      message: error.message 
    });
  }
}
