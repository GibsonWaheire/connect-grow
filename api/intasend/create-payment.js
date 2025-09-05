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

    // Try different IntaSend API endpoints
    const apiUrls = environment === 'live' 
      ? [
          'https://api.intasend.com/api/v1/checkout/',
          'https://api.intasend.com/v1/checkout/',
          'https://api.intasend.com/checkout/'
        ]
      : [
          'https://sandbox.intasend.com/api/v1/checkout/',
          'https://sandbox.intasend.com/v1/checkout/',
          'https://sandbox.intasend.com/checkout/'
        ];

    // Prepare checkout payload with all required fields
    const checkoutPayload = {
      amount: parseFloat(amount),
      currency: currency || 'USD',
      email,
      phone,
      first_name,
      last_name,
      redirect_url: redirect_url || `${req.headers.origin || 'https://connect-order-grow.vercel.app'}/payment-success`,
      description: description || `Payment for ${first_name} ${last_name}`,
      environment,
      // Optional fields
      ...(reference && { reference }),
      ...(metadata && { metadata }),
      ...(country && { country }),
      ...(address && { address }),
      ...(city && { city }),
      ...(state && { state }),
      ...(zipcode && { zipcode }),
      ...(method && { method }),
      ...(card_tarrif && { card_tarrif }),
      ...(mobile_tarrif && { mobile_tarrif })
    };

    console.log('🔍 IntaSend checkout payload:', checkoutPayload);

    // Try different authentication methods and API endpoints
    const authMethods = [
      { name: 'Bearer Token', header: `Bearer ${intasendPrivateKey}` },
      { name: 'API Key', header: intasendPrivateKey },
      { name: 'X-API-Key', header: intasendPrivateKey, headerName: 'X-API-Key' }
    ];

    let response;
    let lastError;
    let successfulConfig = null;

    // Try each API endpoint
    for (const apiUrl of apiUrls) {
      console.log(`🔍 Trying API endpoint: ${apiUrl}`);
      
      // Try each authentication method for this endpoint
      for (const authMethod of authMethods) {
        try {
          console.log(`🔍 Trying ${authMethod.name} with ${apiUrl}`);
          
          const headers = {
            'Content-Type': 'application/json',
          };
          
          if (authMethod.headerName) {
            headers[authMethod.headerName] = authMethod.header;
          } else {
            headers['Authorization'] = authMethod.header;
          }

          response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(checkoutPayload),
          });

          console.log(`🔍 ${authMethod.name} + ${apiUrl} response status:`, response.status);
          
          if (response.ok) {
            console.log(`✅ ${authMethod.name} + ${apiUrl} successful!`);
            successfulConfig = { authMethod: authMethod.name, apiUrl };
            break;
          } else {
            // Clone the response to read the body without consuming it
            const responseClone = response.clone();
            const errorText = await responseClone.text();
            console.log(`❌ ${authMethod.name} + ${apiUrl} failed:`, response.status, errorText);
            lastError = { method: authMethod.name, apiUrl, status: response.status, error: errorText };
          }
        } catch (error) {
          console.log(`❌ ${authMethod.name} + ${apiUrl} error:`, error.message);
          lastError = { method: authMethod.name, apiUrl, error: error.message };
        }
      }
      
      if (successfulConfig) {
        break;
      }
    }

    // Check if we found a successful configuration
    if (!successfulConfig) {
      console.error('❌ All API endpoints and authentication methods failed:', lastError);
      return res.status(500).json({ 
        error: 'IntaSend API error',
        message: 'All API endpoints and authentication methods failed',
        details: lastError,
        triedEndpoints: apiUrls,
        triedAuthMethods: authMethods.map(m => m.name)
      });
    }

    // Log the response body before processing
    const responseText = await response.text();
    console.log('🔍 IntaSend response body:', responseText);
    console.log('✅ Successful configuration:', successfulConfig);

    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Failed to parse IntaSend response:', responseText);
      return res.status(500).json({ 
        error: 'Invalid response from IntaSend',
        message: 'Failed to parse response'
      });
    }

    console.log('✅ IntaSend checkout created successfully:', data);
    res.json(data);
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
