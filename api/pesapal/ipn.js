/**
 * Pesapal IPN (Instant Payment Notification) Listener
 * 
 * Pesapal sends GET requests with query parameters:
 * - pesapal_notification_type (e.g., "CHANGE")
 * - pesapal_transaction_tracking_id (transaction ID)
 * - pesapal_merchant_reference (your order reference)
 * 
 * The handler must echo back the same query string parameters as received.
 * After receiving the notification, you should query Pesapal's API to verify
 * the transaction status and update your database accordingly.
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Pesapal sends GET requests with query parameters
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are accepted'
    });
  }

  try {
    const {
      pesapal_notification_type,
      pesapal_transaction_tracking_id,
      pesapal_merchant_reference
    } = req.query;

    // Log the IPN notification
    console.log('Pesapal IPN received:', {
      notification_type: pesapal_notification_type,
      transaction_tracking_id: pesapal_transaction_tracking_id,
      merchant_reference: pesapal_merchant_reference,
      timestamp: new Date().toISOString(),
      query: req.query
    });

    // Validate required parameters
    if (!pesapal_notification_type || !pesapal_transaction_tracking_id || !pesapal_merchant_reference) {
      console.error('Missing required Pesapal IPN parameters');
      return res.status(400).json({ 
        error: 'Bad request',
        message: 'Missing required parameters'
      });
    }

    // Pesapal requires you to echo back the same query string parameters
    // Build the response query string
    const responseQueryString = 
      `pesapal_notification_type=${pesapal_notification_type}&` +
      `pesapal_transaction_tracking_id=${pesapal_transaction_tracking_id}&` +
      `pesapal_merchant_reference=${pesapal_merchant_reference}`;

    // TODO: After acknowledging the IPN, you should:
    // 1. Query Pesapal's transaction status API to verify payment status
    // 2. Update your database/order status accordingly
    // 3. Send confirmation emails to customers
    // 4. Update inventory if applicable
    
    // Example: You would call Pesapal's API here to verify the transaction
    // const transactionStatus = await verifyPesapalTransaction(pesapal_transaction_tracking_id);
    // await updateOrderStatus(pesapal_merchant_reference, transactionStatus);

    // Return the echoed query string as required by Pesapal
    return res.status(200).send(responseQueryString);

  } catch (error) {
    console.error('Pesapal IPN processing error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process IPN notification'
    });
  }
}
