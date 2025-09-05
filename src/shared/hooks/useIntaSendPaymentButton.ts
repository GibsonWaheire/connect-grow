import { useEffect, useState } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for IntaSend SDK to load
    const initializeIntaSend = () => {
      if (typeof window !== 'undefined' && window.IntaSend) {
        try {
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

          setIsInitialized(true);
          console.log('IntaSend initialized successfully');
        } catch (error) {
          console.error('Failed to initialize IntaSend:', error);
        }
      } else {
        // Retry after a short delay if IntaSend is not loaded yet
        setTimeout(initializeIntaSend, 100);
      }
    };

    initializeIntaSend();
  }, []);

  const createPaymentButtonElement = (options: IntaSendPaymentButtonOptions) => {
    // Create button element with all required data attributes
    const button = document.createElement('button');
    button.className = 'intaSendPayButton';
    button.textContent = 'Pay Now';
    
    // Set all data attributes as per IntaSend documentation
    button.setAttribute('data-amount', String(options.amount));
    button.setAttribute('data-currency', options.currency);
    
    if (options.email) button.setAttribute('data-email', options.email);
    if (options.phone) button.setAttribute('data-phone_number', options.phone);
    if (options.first_name) button.setAttribute('data-first_name', options.first_name);
    if (options.last_name) button.setAttribute('data-last_name', options.last_name);
    if (options.api_ref) button.setAttribute('data-api_ref', options.api_ref);
    if (options.comment) button.setAttribute('data-comment', options.comment);
    if (options.country) button.setAttribute('data-country', options.country);
    if (options.method) button.setAttribute('data-method', options.method);
    if (options.card_tarrif) button.setAttribute('data-card_tarrif', options.card_tarrif);
    if (options.mobile_tarrif) button.setAttribute('data-mobile_tarrif', options.mobile_tarrif);
    if (options.redirect_url) button.setAttribute('data-redirect_url', options.redirect_url);

    return button;
  };

  const initializePaymentButton = (elementId: string, options: IntaSendPaymentButtonOptions) => {
    if (!isInitialized) {
      console.error('IntaSend not initialized yet');
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      // Clear existing content
      element.innerHTML = '';
      
      // Create and append payment button
      const button = createPaymentButtonElement(options);
      element.appendChild(button);
      
      console.log('Payment button created with options:', options);
    }
  };

  return {
    isInitialized,
    initializePaymentButton
  };
};
