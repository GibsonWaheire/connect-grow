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
    // Wait for IntaSend SDK to load and initialize
    const initializeIntaSend = () => {
      if (typeof window !== 'undefined' && window.IntaSend) {
        try {
          // Initialize IntaSend exactly as per documentation
          const intaSendInstance = new window.IntaSend({
            publicAPIKey: config.intasend.publicKey,
            live: config.intasend.environment === 'live'
          });

          // Set up event handlers
          intaSendInstance
            .on("COMPLETE", (results: any) => {
              console.log("Payment completed successfully:", results);
              if (results.invoice_id) {
                window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
              }
            })
            .on("FAILED", (results: any) => {
              console.log("Payment failed:", results);
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

  const createIntaSendButton = (options: IntaSendPaymentButtonOptions) => {
    if (!isInitialized) {
      console.error('IntaSend not initialized yet');
      return;
    }

    const element = document.getElementById('payment-button-container');
    if (element) {
      // Clear existing content
      element.innerHTML = '';
      
      // Create button exactly as per IntaSend documentation
      const button = document.createElement('button');
      button.className = 'intaSendPayButton';
      button.textContent = 'Pay with IntaSend';
      
      // Set data attributes exactly as per documentation
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

      // Add some basic styling
      button.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        margin-top: 8px;
        transition: all 0.3s ease;
      `;

      // Add hover effect
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
      });

      element.appendChild(button);
      
      console.log('IntaSend payment button created with options:', options);
      
      // IntaSend should automatically detect this button
      // No additional initialization needed
    }
  };

  return {
    isInitialized,
    createIntaSendButton
  };
};