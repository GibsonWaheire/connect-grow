/**
 * Payment Provider Configuration
 * 
 * This file allows you to easily switch between different payment providers.
 * Currently supports: IntaSend, Stripe, PayPal, or custom provider
 * 
 * To use a different provider:
 * 1. Set the PAYMENT_PROVIDER environment variable or update defaultProvider below
 * 2. Configure the provider settings in environment.ts
 * 3. Implement the payment processing logic in the selected provider's handler
 */

export type PaymentProvider = 'intasend' | 'stripe' | 'paypal' | 'custom' | 'none';

export interface PaymentConfig {
  provider: PaymentProvider;
  enabled: boolean;
  apiKey?: string;
  publicKey?: string;
  secretKey?: string;
  environment?: 'sandbox' | 'live';
}

/**
 * Get the active payment provider from environment or config
 */
export const getPaymentProvider = (): PaymentProvider => {
  // Check environment variable first
  const envProvider = import.meta.env.VITE_PAYMENT_PROVIDER?.toLowerCase();
  
  if (envProvider && ['intasend', 'stripe', 'paypal', 'custom', 'none'].includes(envProvider)) {
    return envProvider as PaymentProvider;
  }
  
  // Default to none (email-based) if no provider configured
  return 'none';
};

/**
 * Check if a payment provider is available and configured
 */
export const isPaymentProviderAvailable = (provider: PaymentProvider): boolean => {
  const config = getPaymentConfig(provider);
  return config.enabled && (!!config.apiKey || !!config.publicKey);
};

/**
 * Get configuration for a specific payment provider
 */
export const getPaymentConfig = (provider: PaymentProvider): PaymentConfig => {
  switch (provider) {
    case 'intasend':
      return {
        provider: 'intasend',
        enabled: !!import.meta.env.VITE_INTASEND_PUBLIC_KEY,
        publicKey: import.meta.env.VITE_INTASEND_PUBLIC_KEY,
        secretKey: import.meta.env.VITE_INTASEND_SECRET_KEY,
        environment: import.meta.env.VITE_INTASEND_ENVIRONMENT === 'live' ? 'live' : 'sandbox',
      };
    
    case 'stripe':
      return {
        provider: 'stripe',
        enabled: !!import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
        secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY,
        environment: import.meta.env.VITE_STRIPE_ENVIRONMENT === 'live' ? 'live' : 'sandbox',
      };
    
    case 'paypal':
      return {
        provider: 'paypal',
        enabled: !!import.meta.env.VITE_PAYPAL_CLIENT_ID,
        apiKey: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT === 'live' ? 'live' : 'sandbox',
      };
    
    case 'custom':
      return {
        provider: 'custom',
        enabled: !!import.meta.env.VITE_CUSTOM_PAYMENT_ENABLED,
        apiKey: import.meta.env.VITE_CUSTOM_PAYMENT_API_KEY,
      };
    
    case 'none':
    default:
      return {
        provider: 'none',
        enabled: true, // Email-based payment is always available
      };
  }
};

/**
 * Process payment based on the configured provider
 */
export const processPayment = async (
  amount: number,
  currency: string = 'USD',
  customerInfo: {
    email: string;
    name: string;
    phone?: string;
  },
  metadata?: Record<string, any>
): Promise<{ success: boolean; paymentUrl?: string; error?: string }> => {
  const provider = getPaymentProvider();
  const config = getPaymentConfig(provider);

  if (!config.enabled) {
    return {
      success: false,
      error: `Payment provider ${provider} is not configured`,
    };
  }

  switch (provider) {
    case 'intasend':
      // IntaSend payment processing
      // This will work if IntaSend SDK is loaded and configured
      try {
        if (window.IntaSend && config.publicKey) {
          // IntaSend processing logic here
          // For now, return email fallback
          return {
            success: false,
            error: 'IntaSend integration requires backend API',
          };
        }
      } catch (error) {
        console.error('IntaSend error:', error);
      }
      break;

    case 'stripe':
      // Stripe payment processing
      // Requires Stripe.js SDK
      return {
        success: false,
        error: 'Stripe integration not yet implemented. Please configure in paymentProviders.ts',
      };

    case 'paypal':
      // PayPal payment processing
      return {
        success: false,
        error: 'PayPal integration not yet implemented. Please configure in paymentProviders.ts',
      };

    case 'custom':
      // Custom payment provider
      return {
        success: false,
        error: 'Custom payment provider not yet implemented. Please configure in paymentProviders.ts',
      };

    case 'none':
    default:
      // Fallback to email-based payment (always available)
      return {
        success: true, // Email will be sent
        paymentUrl: undefined,
      };
  }

  return {
    success: false,
    error: 'Payment processing not available',
  };
};

/**
 * Get available payment methods for the current provider
 */
export const getAvailablePaymentMethods = (): string[] => {
  const provider = getPaymentProvider();

  switch (provider) {
    case 'intasend':
      return ['Credit/Debit Card', 'Mobile Money', 'Bank Transfer'];
    
    case 'stripe':
      return ['Credit/Debit Card', 'Apple Pay', 'Google Pay'];
    
    case 'paypal':
      return ['PayPal', 'Credit/Debit Card'];
    
    case 'custom':
      return ['Credit/Debit Card', 'Bank Transfer'];
    
    case 'none':
    default:
      return ['Credit/Debit Card', 'Bank Transfer', 'Mobile Money'];
  }
};

