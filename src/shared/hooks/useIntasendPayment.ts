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
      // Validate required fields
      if (!paymentData.email || !paymentData.phone || !paymentData.first_name) {
        throw new Error('Missing required payment information');
      }

      if (paymentData.amount <= 0) {
        throw new Error('Invalid payment amount');
      }

      // Use our backend proxy instead of calling Intasend directly
      const response = await fetch('/api/intasend/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          metadata: {
            service_type: paymentData.reference.split('_')[2] || 'unknown',
            order_timestamp: new Date().toISOString(),
            source: 'web_order_form'
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Payment creation failed: ${response.statusText} - ${errorData.message || 'Unknown error'}`);
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
      const response = await fetch(`/api/intasend/verify-payment/${invoiceId}`, {
        method: 'GET',
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

  const getPaymentDetails = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/intasend/payment-details/${invoiceId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to get payment details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting payment details:', error);
      throw error;
    }
  };

  return {
    createPayment,
    verifyPayment,
    getPaymentDetails,
  };
};
