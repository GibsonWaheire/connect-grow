import { useEffect } from 'react';
import { config } from '@/config/environment';

// Extend Window interface to include IntaSend
declare global {
  interface Window {
    IntaSend: any;
  }
}

export interface IntaSendPaymentButtonOptions {
  amount: number;
  currency: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  api_ref?: string;
  comment?: string;
  country?: string;
  method?: 'M-PESA' | 'CARD-PAYMENT';
  card_tarrif?: 'BUSINESS-PAYS' | 'CUSTOMER-PAYS';
  mobile_tarrif?: 'BUSINESS-PAYS' | 'CUSTOMER-PAYS';
  redirect_url?: string;
}

export const useIntaSendPaymentButton = () => {
  useEffect(() => {
    // Initialize IntaSend when component mounts
    if (typeof window !== 'undefined' && window.IntaSend) {
      const intaSendInstance = new window.IntaSend({
        publicAPIKey: config.intasend.publicKey,
        live: config.intasend.environment === 'live'
      });

      // Set up event handlers
      intaSendInstance
        .on("COMPLETE", (results: any) => {
          console.log("Payment completed successfully:", results);
          // Redirect to success page
          if (results.invoice_id) {
            window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
          }
        })
        .on("FAILED", (results: any) => {
          console.log("Payment failed:", results);
          // Handle payment failure
          alert("Payment failed. Please try again.");
        })
        .on("IN-PROGRESS", (results: any) => {
          console.log("Payment in progress:", results);
        });

      // Store instance globally for use in components
      (window as any).intaSendInstance = intaSendInstance;
    }
  }, []);

  const createPaymentButton = (options: IntaSendPaymentButtonOptions) => {
    const button = document.createElement('button');
    button.className = 'intaSendPayButton';
    button.textContent = 'Pay Now';
    
    // Set data attributes
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        button.setAttribute(`data-${key}`, String(value));
      }
    });

    return button;
  };

  const initializePaymentButton = (elementId: string, options: IntaSendPaymentButtonOptions) => {
    const element = document.getElementById(elementId);
    if (element && window.IntaSend) {
      // Clear existing content
      element.innerHTML = '';
      
      // Create and append payment button
      const button = createPaymentButton(options);
      element.appendChild(button);
      
      // Initialize IntaSend for this button
      if ((window as any).intaSendInstance) {
        (window as any).intaSendInstance.render();
      }
    }
  };

  return {
    createPaymentButton,
    initializePaymentButton
  };
};
