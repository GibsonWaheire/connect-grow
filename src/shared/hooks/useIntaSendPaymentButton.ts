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
  // Removed optional fields that might cause 500 errors
}

export const useIntaSendPaymentButton = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    // Check if IntaSend SDK is loaded with better error handling
    const checkSDK = () => {
      if (typeof window !== 'undefined' && window.IntaSend) {
        setIsSDKLoaded(true);
        console.log('✅ IntaSend SDK is loaded and ready');
        console.log('IntaSend config:', {
          publicKey: config.intasend.publicKey,
          environment: config.intasend.environment,
          live: config.intasend.environment === 'live'
        });
        
        // Test if we can create an instance
        try {
          const testInstance = new window.IntaSend({
            publicAPIKey: config.intasend.publicKey,
            live: config.intasend.environment === 'live'
          });
          console.log('✅ IntaSend instance creation test successful');
        } catch (error) {
          console.error('❌ IntaSend instance creation test failed:', error);
        }
      } else {
        console.log('⏳ IntaSend SDK not ready yet, retrying...');
        setTimeout(checkSDK, 500);
      }
    };
    
    checkSDK();
  }, []);

  const createIntaSendButton = (options: IntaSendPaymentButtonOptions) => {
    if (!isSDKLoaded) {
      console.error('IntaSend SDK not loaded yet');
      return;
    }

    const element = document.getElementById('payment-button-container');
    if (!element) {
      console.error('Payment button container not found');
      return;
    }

    // Clear existing content
    element.innerHTML = '';
    
    // Create button exactly as per IntaSend documentation
    const button = document.createElement('button');
    button.className = 'intaSendPayButton';
    button.textContent = 'Pay with IntaSend';
    
    // Set ONLY the essential data attributes (like the working test button)
    button.setAttribute('data-amount', String(options.amount));
    button.setAttribute('data-currency', options.currency);
    
    // Only add optional attributes if they have valid values (like the working test button)
    if (options.email && options.email.trim()) button.setAttribute('data-email', options.email.trim());
    if (options.phone && options.phone.trim()) button.setAttribute('data-phone_number', options.phone.trim());
    if (options.first_name && options.first_name.trim()) button.setAttribute('data-first_name', options.first_name.trim());
    if (options.last_name && options.last_name.trim()) button.setAttribute('data-last_name', options.last_name.trim());
    if (options.api_ref && options.api_ref.trim()) button.setAttribute('data-api_ref', options.api_ref.trim());
    if (options.comment && options.comment.trim()) button.setAttribute('data-comment', options.comment.trim());
    if (options.country && options.country.trim()) button.setAttribute('data-country', options.country.trim());

    // Add styling
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

    // Add click handler for debugging
    button.addEventListener('click', (e) => {
      console.log('IntaSend button clicked!', e);
      console.log('Button element:', button);
      console.log('Window.IntaSend available:', !!window.IntaSend);
    });

    element.appendChild(button);
    
    console.log('IntaSend payment button created:', {
      element: button,
      className: button.className,
      dataAttributes: {
        amount: button.getAttribute('data-amount'),
        currency: button.getAttribute('data-currency'),
        email: button.getAttribute('data-email'),
        phone_number: button.getAttribute('data-phone_number'),
        first_name: button.getAttribute('data-first_name'),
        last_name: button.getAttribute('data-last_name'),
        country: button.getAttribute('data-country'),
        card_tarrif: button.getAttribute('data-card_tarrif'),
        mobile_tarrif: button.getAttribute('data-mobile_tarrif'),
        redirect_url: button.getAttribute('data-redirect_url')
      }
    });

    // Initialize IntaSend AFTER the button is created
    setTimeout(() => {
      try {
        console.log('🔄 Initializing IntaSend with button...');
        
        const intaSendInstance = new window.IntaSend({
          publicAPIKey: config.intasend.publicKey,
          live: config.intasend.environment === 'live'
        });

        console.log('✅ IntaSend instance created:', intaSendInstance);

        // Set up event handlers
        intaSendInstance
          .on("COMPLETE", (results: any) => {
            console.log("✅ Payment completed successfully:", results);
            if (results.invoice_id) {
              window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
            }
          })
          .on("FAILED", (results: any) => {
            console.log("❌ Payment failed:", results);
            alert("Payment failed. Please try again.");
          })
          .on("IN-PROGRESS", (results: any) => {
            console.log("⏳ Payment in progress:", results);
          });

        console.log('✅ IntaSend initialized successfully with event handlers');
        
        // Force button detection
        setTimeout(() => {
          console.log('🔍 Checking if button is detected by IntaSend...');
          const buttons = document.querySelectorAll('.intaSendPayButton');
          console.log('Found buttons with intaSendPayButton class:', buttons.length);
          
          buttons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn);
            console.log(`Button ${index} data-amount:`, btn.getAttribute('data-amount'));
          });
        }, 500);

      } catch (error) {
        console.error('❌ Failed to initialize IntaSend:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    }, 100);
  };

  return {
    isInitialized: isSDKLoaded,
    createIntaSendButton
  };
};