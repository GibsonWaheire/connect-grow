export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890',
    defaultMessage: "Hi! I'd like to place an order",
  },
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  contact: {
    email: 'support@academicservicespro.com',
    phone: '+1 (234) 567-8900',
  },
} as const;

export type Config = typeof config;
