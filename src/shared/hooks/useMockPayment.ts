// src/shared/hooks/useMockPayment.ts
import { useState } from 'react';

export interface MockPaymentOptions {
  amount: number;
  currency: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export const useMockPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processMockPayment = async (options: MockPaymentOptions) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock invoice ID
      const invoiceId = `MOCK_${Date.now()}`;
      
      // Store order data for WhatsApp
      const orderData = {
        amount: options.amount,
        currency: options.currency,
        email: options.email,
        first_name: options.first_name,
        last_name: options.last_name,
        phone: options.phone,
        invoice_id: invoiceId,
        payment_method: 'Mock Payment',
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));
      
      // Redirect to success page
      window.location.href = `/payment-success?invoice_id=${invoiceId}`;
      
    } catch (error) {
      console.error('Mock payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processMockPayment,
    isProcessing
  };
};
