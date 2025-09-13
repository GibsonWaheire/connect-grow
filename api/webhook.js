/**
 * Vercel serverless function to handle payment provider webhooks
 * 
 * Handles:
 * - Challenge verification (returns challenge string)
 * - Webhook events (logs and acknowledges)
 * - Method validation (POST only)
 */

export default function handler(req, res) {
  // Set CORS headers for webhook requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    const { challenge } = req.body;

    // Handle challenge verification
    if (challenge) {
      console.log('Webhook challenge received:', challenge);
      return res.status(200).send(challenge);
    }

    // Handle other webhook events
    console.log('Webhook event received:', JSON.stringify(req.body, null, 2));
    
    return res.status(200).json({ 
      success: true,
      message: 'Webhook received and processed'
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process webhook'
    });
  }
}
