import { config } from '@/config/environment';

export interface IntasendPaymentRequest {
  amount: number;
  currency: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  reference: string;
  description: string;
}

export interface IntasendPaymentResponse {
  state: string;
  invoice_id: string;
  payment_url: string;
  amount: number;
  currency: string;
}

export const useIntasendPayment = () => {
  const createPayment = async (paymentData: IntasendPaymentRequest): Promise<IntasendPaymentResponse> => {
    try {
      const response = await fetch('https://api.intasend.com/v1/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.intasend.secretKey}`,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency,
          email: paymentData.email,
          phone: paymentData.phone,
          first_name: paymentData.first_name,
          last_name: paymentData.last_name,
          reference: paymentData.reference,
          description: paymentData.description,
          environment: config.intasend.environment,
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment creation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Intasend payment error:', error);
      throw error;
    }
  };

  const verifyPayment = async (invoiceId: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://api.intasend.com/v1/checkout/${invoiceId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.intasend.secretKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Payment verification failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.state === 'COMPLETE';
    } catch (error) {
      console.error('Intasend verification error:', error);
      return false;
    }
  };

  return {
    createPayment,
    verifyPayment,
  };
};
