export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  whatsapp: {
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '15636578107',
    defaultMessage: "Hi Peter! I'd like to place an order",
  },
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  contact: {
    email: 'peter@schoolhelp.com',
    phone: '+1 (563) 657-8107',
  },
} as const;

export type Config = typeof config;
