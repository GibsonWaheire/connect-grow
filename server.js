import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your actual domain
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Intasend API proxy endpoints
app.post('/api/intasend/create-payment', async (req, res) => {
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
      metadata
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
    if (!intasendSecretKey) {
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
        metadata
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
});

app.get('/api/intasend/verify-payment/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const intasendSecretKey = process.env.VITE_INTASEND_SECRET_KEY;

    if (!intasendSecretKey) {
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
      throw new Error(`Payment verification failed: ${response.statusText}`);
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
});

app.get('/api/intasend/payment-details/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const intasendSecretKey = process.env.VITE_INTASEND_SECRET_KEY;

    if (!intasendSecretKey) {
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
      throw new Error(`Failed to get payment details: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Payment details error:', error);
    res.status(500).json({ 
      error: 'Failed to get payment details',
      message: error.message 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS origin: ${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`);
});
