import { useEffect, useState } from 'react';
import { config } from '@/config/environment';

// WhatsApp integration function
const sendOrderToWhatsApp = (options: IntaSendPaymentButtonOptions, paymentResults?: Record<string, unknown>) => {
  const orderData = localStorage.getItem('pendingOrder');
  let orderDetails = '';
  
  if (orderData) {
    try {
      const parsed = JSON.parse(orderData);
      
      // Format all order details in a comprehensive, readable format
      orderDetails = `
📋 NEW ORDER RECEIVED - ${parsed.orderId}

💰 PAYMENT DETAILS:
• Amount: $${options.amount} ${options.currency}
• Status: ${paymentResults ? '✅ PAID' : '🎭 MOCK PAYMENT'}
${paymentResults ? `• Invoice ID: ${paymentResults.invoice_id}` : '• Mock Payment - No Invoice'}

👤 CUSTOMER DETAILS:
• Name: ${options.first_name} ${options.last_name}
• Email: ${options.email}
• Phone: ${options.phone || 'Not provided'}

📝 SERVICE DETAILS:
• Service: ${parsed.serviceTitle || parsed.serviceId}
• Subject: ${parsed.subject || 'Not specified'}
• Words: ${parsed.words || 'Not specified'}
• Pages: ${parsed.pages || 'Not specified'}
• Slides: ${parsed.slides || 'Not specified'}
• Urgency: ${parsed.urgency || 'normal'}
• Instructions: ${parsed.instructions || 'None provided'}

📊 ORDER SUMMARY:
• Total Price: $${parsed.totalPrice}
• Order ID: ${parsed.orderId}
• Timestamp: ${new Date(parsed.timestamp).toLocaleString()}

${paymentResults ? '🎉 Payment completed successfully!' : '🎭 Mock payment - please process manually'}
      `.trim();
    } catch (error) {
      console.error('Error parsing order data:', error);
      orderDetails = `
📋 NEW ORDER RECEIVED

💰 Payment: $${options.amount} ${options.currency}
✅ Status: ${paymentResults ? 'PAID' : 'MOCK PAYMENT'}

👤 Customer: ${options.first_name} ${options.last_name}
📧 Email: ${options.email}

${paymentResults ? `🔗 Invoice ID: ${paymentResults.invoice_id}` : '🎭 Mock Payment - No Invoice'}

⚠️ Note: Full order details could not be parsed. Check localStorage for complete data.
      `.trim();
    }
  } else {
    orderDetails = `
📋 NEW ORDER RECEIVED

💰 Payment: $${options.amount} ${options.currency}
✅ Status: ${paymentResults ? 'PAID' : 'MOCK PAYMENT'}

👤 Customer: ${options.first_name} ${options.last_name}
📧 Email: ${options.email}

${paymentResults ? `🔗 Invoice ID: ${paymentResults.invoice_id}` : '🎭 Mock Payment - No Invoice'}

⚠️ Note: Order details not found in localStorage. Customer may have cleared browser data.
    `.trim();
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
  phone?: string;
}

export const useIntaSendPaymentButton = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [intaSendInstance, setIntaSendInstance] = useState<any>(null);

  useEffect(() => {
    // Initialize IntaSend once globally when SDK is loaded
    const checkSDK = () => {
      if (typeof window !== 'undefined' && window.IntaSend) {
        setIsSDKLoaded(true);
        console.log('✅ IntaSend SDK is loaded and ready');
        
        // Initialize IntaSend instance once globally
        try {
          const instance = new window.IntaSend({
            publicAPIKey: config.intasend.publicKey,
            live: config.intasend.environment === 'live'
          });
          
          // Set up global event handlers
          instance
            .on("COMPLETE", (results: any) => {
              console.log("✅ IntaSend payment completed successfully:", results);
              // Send order details to WhatsApp
              const orderData = localStorage.getItem('pendingOrder');
              if (orderData) {
                try {
                  const parsed = JSON.parse(orderData);
                  sendOrderToWhatsApp({
                    amount: results.amount || 0,
                    currency: results.currency || 'USD',
                    email: parsed.email || '',
                    first_name: parsed.name?.split(' ')[0] || '',
                    last_name: parsed.name?.split(' ').slice(1).join(' ') || '',
                    phone: parsed.phone || ''
                  }, results);
                } catch (error) {
                  console.error('Error parsing order data for WhatsApp:', error);
                }
              }
              if (results.invoice_id) {
                window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
              }
            })
            .on("FAILED", (results: any) => {
              console.log("❌ IntaSend payment failed:", results);
              alert('Payment failed. Please try again or contact support.');
            })
            .on("IN-PROGRESS", (results: any) => {
              console.log("⏳ IntaSend payment in progress:", results);
            });
          
          setIntaSendInstance(instance);
          console.log('✅ IntaSend instance created and event handlers set up globally');
        } catch (error) {
          console.error('❌ IntaSend instance creation failed:', error);
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
      pointer-events: auto;
      z-index: 1000;
      position: relative;
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
    
    // Add click handler that creates a checkout link and redirects to IntaSend
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('🔍 Button clicked! Creating IntaSend checkout... (NEW VERSION)');
      
      try {
        // Create checkout link using IntaSend API
        const checkoutData = {
          amount: options.amount,
          currency: options.currency,
          email: options.email,
          first_name: options.first_name,
          last_name: options.last_name,
          phone_number: options.phone,
          redirect_url: `${window.location.origin}/payment-success`,
          comment: `Service payment for ${options.first_name} ${options.last_name}`
        };
        
        console.log('💳 Creating checkout with data:', checkoutData);
        
        // Call our backend API to create IntaSend checkout
        const response = await fetch('/api/create-intasend-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkoutData)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ Checkout created:', result);
          
          if (result.url) {
            // Redirect to IntaSend payment page
            window.location.href = result.url;
          } else {
            console.error('❌ No checkout URL received');
            alert('Payment initialization failed. Please try again.');
          }
        } else {
          console.error('❌ Failed to create checkout:', response.status);
          alert('Payment initialization failed. Please try again.');
        }
      } catch (error) {
        console.error('❌ Error creating checkout:', error);
        alert('Payment initialization failed. Please try again.');
      }
    });
    
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

  // IntaSend is initialized globally in useEffect and automatically detects buttons

  // Removed handlePaymentWithFallback and handleMockPayment functions
  // IntaSend now handles everything automatically through proper initialization

  return {
    isInitialized: isSDKLoaded,
    createIntaSendButton
  };
};