export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '14438697500', // +1 443 869 7500 (no spaces for WhatsApp links)
    defaultMessage: "Hi Peter! I'd like to place an order",
  },
  // Payment Providers Configuration
  // Set VITE_PAYMENT_PROVIDER to 'intasend', 'stripe', 'paypal', 'custom', or 'none'
  payment: {
    provider: import.meta.env.VITE_PAYMENT_PROVIDER || 'none', // 'none' uses email-based payment
    intasend: {
      publicKey: import.meta.env.VITE_INTASEND_PUBLIC_KEY || '',
      secretKey: import.meta.env.VITE_INTASEND_SECRET_KEY || '',
      environment: import.meta.env.VITE_INTASEND_ENVIRONMENT || 'sandbox',
      currency: 'USD',
      country: 'US',
      apiBaseUrl: import.meta.env.VITE_INTASEND_ENVIRONMENT === 'live' 
        ? 'https://payment.intasend.com/api/' 
        : 'https://sandbox.intasend.com/api/',
    },
    stripe: {
      publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
      secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || '',
      environment: import.meta.env.VITE_STRIPE_ENVIRONMENT || 'sandbox',
    },
    paypal: {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
      environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT || 'sandbox',
    },
    custom: {
      apiKey: import.meta.env.VITE_CUSTOM_PAYMENT_API_KEY || '',
      apiUrl: import.meta.env.VITE_CUSTOM_PAYMENT_API_URL || '',
    },
  },
  // Keep intasend for backward compatibility (deprecated - use payment.intasend instead)
  intasend: {
    publicKey: import.meta.env.VITE_INTASEND_PUBLIC_KEY || '',
    secretKey: import.meta.env.INTASEND_SECRET_KEY || '',
    environment: import.meta.env.VITE_INTASEND_ENVIRONMENT || 'sandbox',
    currency: 'USD',
    country: 'US',
    apiBaseUrl: import.meta.env.VITE_INTASEND_ENVIRONMENT === 'live' 
      ? 'https://payment.intasend.com/api/' 
      : 'https://sandbox.intasend.com/api/',
  },
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    payments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
  },
  contact: {
    email: 'peter@schoolhelp.com',
    phone: '+1 (443) 869-7500',
  },
} as const;

export type Config = typeof config;
