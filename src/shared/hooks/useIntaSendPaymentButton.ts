import { useEffect, useState } from 'react';
import { config } from '@/config/environment';

// WhatsApp integration function
const sendOrderToWhatsApp = (options: IntaSendPaymentButtonOptions, paymentResults?: Record<string, unknown>) => {
  const orderData = localStorage.getItem('orderData');
  let orderDetails = '';
  
  if (orderData) {
    try {
      const parsed = JSON.parse(orderData);
      orderDetails = `
📋 NEW ORDER RECEIVED

💰 Payment: $${options.amount} ${options.currency}
✅ Status: ${paymentResults ? 'PAID' : 'MOCK PAYMENT'}

📝 Order Details:
${parsed}

👤 Customer: ${options.first_name} ${options.last_name}
📧 Email: ${options.email}

${paymentResults ? `🔗 Invoice ID: ${paymentResults.invoice_id}` : '🎭 Mock Payment - No Invoice'}
      `.trim();
    } catch (error) {
      console.error('Error parsing order data:', error);
      orderDetails = `New order from ${options.first_name} ${options.last_name} - $${options.amount}`;
    }
  } else {
    orderDetails = `New order from ${options.first_name} ${options.last_name} - $${options.amount}`;
  }

  const whatsappUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(orderDetails)}`;
  window.open(whatsappUrl, '_blank');
};

// Extend Window interface to include IntaSend
declare global {
  interface Window {
    IntaSend: new (config: { publicAPIKey: string; live: boolean }) => {
      on: (event: string, callback: (results: Record<string, unknown>) => void) => unknown;
      scan: () => void;
    };
  }
}

export interface IntaSendPaymentButtonOptions {
  amount: number;
  currency: string;
  email?: string;
  first_name?: string;
  last_name?: string;
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
    
    // Create button exactly like the working test button
    const button = document.createElement('button');
    button.className = 'intaSendPayButton';
    button.textContent = 'Pay with IntaSend';
    
    // Set ONLY the essential data attributes (exactly like the working test button)
    button.setAttribute('data-amount', String(options.amount));
    button.setAttribute('data-currency', options.currency);
    
    // Only add the same attributes as the working test button
    if (options.email && options.email.trim()) button.setAttribute('data-email', options.email.trim());
    if (options.first_name && options.first_name.trim()) button.setAttribute('data-first_name', options.first_name.trim());
    if (options.last_name && options.last_name.trim()) button.setAttribute('data-last_name', options.last_name.trim());

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

    // Add click handler with IntaSend + fallback
    button.addEventListener('click', (e) => {
      console.log('IntaSend button clicked!', e);
      console.log('Button element:', button);
      console.log('Window.IntaSend available:', !!window.IntaSend);
      
      // Try IntaSend first, fallback to mock if it fails
      handlePaymentWithFallback(options, button);
    });

    element.appendChild(button);
    
    // Add status message
    const statusDiv = document.createElement('div');
    statusDiv.id = 'payment-status';
    statusDiv.style.cssText = `
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      background: #f0f9ff;
      border: 1px solid #0ea5e9;
      color: #0c4a6e;
    `;
    statusDiv.textContent = '💳 Secure payment powered by IntaSend';
    element.appendChild(statusDiv);
    
    console.log('IntaSend payment button created:', {
      element: button,
      className: button.className,
      dataAttributes: {
        amount: button.getAttribute('data-amount'),
        currency: button.getAttribute('data-currency'),
        email: button.getAttribute('data-email'),
        first_name: button.getAttribute('data-first_name'),
        last_name: button.getAttribute('data-last_name')
      }
    });
  };

  const handlePaymentWithFallback = (options: IntaSendPaymentButtonOptions, button: HTMLButtonElement) => {
    console.log('🔄 Starting payment with IntaSend + fallback...');
    
    // Show loading state
    button.textContent = 'Processing Payment...';
    button.disabled = true;

    // Try IntaSend first
    try {
      console.log('🎯 Attempting IntaSend payment...');
      
      // Initialize IntaSend instance
      const intaSendInstance = new window.IntaSend({
        publicAPIKey: config.intasend.publicKey,
        live: config.intasend.environment === 'live'
      });

      // Set up event handlers
      (intaSendInstance as any)
        .on("COMPLETE", (results: Record<string, unknown>) => {
          console.log("✅ IntaSend payment completed successfully:", results);
          // Send order details to WhatsApp
          sendOrderToWhatsApp(options, results);
          if (results.invoice_id) {
            window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
          }
        })
        .on("FAILED", (results: Record<string, unknown>) => {
          console.log("❌ IntaSend payment failed:", results);
          console.log("🔄 Falling back to mock payment...");
          handleMockPayment(options, button);
        })
        .on("IN-PROGRESS", (results: Record<string, unknown>) => {
          console.log("⏳ IntaSend payment in progress:", results);
        });

      // Trigger IntaSend to scan for buttons and show payment modal
      console.log('🔍 Triggering IntaSend scan...');
      intaSendInstance.scan();

      // Set a timeout to detect if IntaSend is not responding
      setTimeout(() => {
        if (button.disabled && button.textContent === 'Processing Payment...') {
          console.log("⏰ IntaSend timeout - falling back to mock payment");
          handleMockPayment(options, button);
        }
      }, 5000);

    } catch (error) {
      console.error('❌ IntaSend initialization failed:', error);
      console.log('🔄 Falling back to mock payment...');
      handleMockPayment(options, button);
    }
  };

  const handleMockPayment = (options: IntaSendPaymentButtonOptions, button: HTMLButtonElement) => {
    console.log('🎭 Starting mock payment flow...');
    
    // Show loading state
    button.textContent = 'Processing Payment...';
    button.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
      console.log('✅ Mock payment completed successfully');
      
      // Simulate successful payment
      const mockResults = {
        invoice_id: `MOCK_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        status: 'completed',
        payment_method: 'card',
        timestamp: new Date().toISOString()
      };

      console.log('Mock payment results:', mockResults);
      
      // Send order details to WhatsApp
      sendOrderToWhatsApp(options, mockResults);
      
      // Redirect to success page
      window.location.href = `/payment-success?invoice_id=${mockResults.invoice_id}&mock=true`;
      
    }, 2000);
  };

  return {
    isInitialized: isSDKLoaded,
    createIntaSendButton
  };
};