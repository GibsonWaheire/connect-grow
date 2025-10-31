export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '14438697500', // +1 443 869 7500 (no spaces for WhatsApp links)
    defaultMessage: "Hi Peter! I'd like to place an order",
  },
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
