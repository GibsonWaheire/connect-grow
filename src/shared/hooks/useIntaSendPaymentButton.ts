// src/shared/hooks/useIntaSendPaymentButton.ts
import { useEffect, useState } from 'react';
import { config } from '@/config/environment';

// TypeScript declarations for IntaSend SDK
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IntaSend: any;
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
  const [sdkLoadError, setSdkLoadError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [intaSendInstance, setIntaSendInstance] = useState<any>(null);

  useEffect(() => {
    // Check if IntaSend is already loaded
    if (window.IntaSend) {
      console.log('✅ IntaSend SDK already loaded');
      setIsSDKLoaded(true);
      
      // Initialize IntaSend instance globally
      try {
        const instance = new window.IntaSend({
          publicAPIKey: config.intasend.publicKey,
          live: config.intasend.environment === 'live'
        });
        
        // Set up global event handlers
        instance
          .on("COMPLETE", (results: Record<string, unknown>) => {
            console.log("✅ Payment completed:", results);
            if (results.invoice_id) {
              window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
            }
          })
          .on("FAILED", (results: Record<string, unknown>) => {
            console.log("❌ Payment failed:", results);
            alert('Payment failed. Please try again.');
          })
          .on("IN-PROGRESS", (results: Record<string, unknown>) => {
            console.log("⏳ Payment in progress:", results);
          });
        
        setIntaSendInstance(instance);
        console.log('✅ IntaSend instance initialized globally');
      } catch (error) {
        console.error('❌ Failed to initialize IntaSend instance:', error);
      }
      
      return;
    }

    // Check if script is already in HTML head
    const existingScript = document.querySelector('script[src*="intasend-inline.js"]');
    if (existingScript) {
      console.log('✅ IntaSend SDK script found in HTML head, waiting for load...');
      // Wait for the script to load
      const checkInterval = setInterval(() => {
        if (window.IntaSend) {
          console.log('✅ IntaSend SDK loaded from HTML head');
          setIsSDKLoaded(true);
          
          // Initialize IntaSend instance
          try {
            const instance = new window.IntaSend({
              publicAPIKey: config.intasend.publicKey,
              live: config.intasend.environment === 'live'
            });
            
            // Set up global event handlers
            instance
              .on("COMPLETE", (results: Record<string, unknown>) => {
                console.log("✅ Payment completed:", results);
                if (results.invoice_id) {
                  window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
                }
              })
              .on("FAILED", (results: Record<string, unknown>) => {
                console.log("❌ Payment failed:", results);
                alert('Payment failed. Please try again.');
              })
              .on("IN-PROGRESS", (results: Record<string, unknown>) => {
                console.log("⏳ Payment in progress:", results);
              });
            
            setIntaSendInstance(instance);
            console.log('✅ IntaSend instance initialized from HTML head');
          } catch (error) {
            console.error('❌ Failed to initialize IntaSend instance:', error);
          }
          
          clearInterval(checkInterval);
        }
      }, 100);
      
      // Clear interval after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
      return;
    }

    // Try multiple SDK URLs for better reliability
    const sdkUrls = [
      'https://unpkg.com/intasend-inlinejs-sdk@3.0.4/build/intasend-inline.js',
      'https://unpkg.com/intasend-inlinejs-sdk@latest/build/intasend-inline.js',
      'https://cdn.jsdelivr.net/npm/intasend-inlinejs-sdk@3.0.4/build/intasend-inline.js'
    ];

    let currentUrlIndex = 0;

    const tryLoadSDK = () => {
      if (currentUrlIndex >= sdkUrls.length) {
        console.error('❌ All IntaSend SDK URLs failed to load');
        setSdkLoadError(true);
        return;
      }

      const script = document.createElement('script');
      script.src = sdkUrls[currentUrlIndex];
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log(`✅ IntaSend SDK loaded from: ${sdkUrls[currentUrlIndex]}`);
        
        // Wait a bit for the SDK to be fully initialized
        setTimeout(() => {
          if (window.IntaSend) {
            try {
              const instance = new window.IntaSend({
                publicAPIKey: config.intasend.publicKey,
                live: config.intasend.environment === 'live'
              });
              
              // Set up global event handlers
              instance
                .on("COMPLETE", (results: Record<string, unknown>) => {
                  console.log("✅ Payment completed:", results);
                  if (results.invoice_id) {
                    window.location.href = `/payment-success?invoice_id=${results.invoice_id}`;
                  }
                })
                .on("FAILED", (results: Record<string, unknown>) => {
                  console.log("❌ Payment failed:", results);
                  alert('Payment failed. Please try again.');
                })
                .on("IN-PROGRESS", (results: Record<string, unknown>) => {
                  console.log("⏳ Payment in progress:", results);
                });
              
              setIntaSendInstance(instance);
              setIsSDKLoaded(true);
              console.log('✅ IntaSend instance initialized after SDK load');
            } catch (error) {
              console.error('❌ Failed to initialize IntaSend instance after SDK load:', error);
              setSdkLoadError(true);
            }
          } else {
            console.error('❌ IntaSend not available after script load');
            setSdkLoadError(true);
          }
        }, 500);
      };
      
      script.onerror = () => {
        console.warn(`⚠️ Failed to load IntaSend SDK from: ${sdkUrls[currentUrlIndex]}`);
        currentUrlIndex++;
        setTimeout(tryLoadSDK, 1000); // Try next URL after 1 second
      };
      
      document.head.appendChild(script);
    };

    tryLoadSDK();

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src*="intasend-inline.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const createIntaSendButton = (options: IntaSendPaymentButtonOptions) => {
    console.log('🔍 createIntaSendButton called with options:', options);
    console.log('🔍 SDK loaded:', isSDKLoaded);
    console.log('🔍 SDK error:', sdkLoadError);
    console.log('🔍 Window.IntaSend exists:', !!window.IntaSend);
    console.log('🔍 IntaSend config:', {
      publicKey: config.intasend.publicKey,
      environment: config.intasend.environment,
      hasPublicKey: !!config.intasend.publicKey
    });
    
    const element = document.getElementById('payment-button-container');
    if (!element) {
      console.error('❌ Payment button container not found');
      return;
    }
    console.log('✅ Payment button container found');

    // Clear existing content
    element.innerHTML = '';

    if (!isSDKLoaded) {
      console.error('❌ IntaSend SDK not loaded yet');
      // Show a message to the user
      const errorDiv = document.createElement('div');
      errorDiv.className = 'p-4 bg-red-50 border border-red-200 rounded-lg';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <div class="text-red-600 mr-2">❌</div>
          <div>
            <p class="text-sm text-red-800 font-medium">Payment system unavailable</p>
            <p class="text-xs text-red-600">Please refresh the page or try again later.</p>
            <button onclick="window.location.reload()" class="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
              Refresh Page
            </button>
          </div>
        </div>
      `;
      element.appendChild(errorDiv);
      return;
    }

    if (!config.intasend.publicKey) {
      console.error('❌ IntaSend public key not configured');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'p-4 bg-yellow-50 border border-yellow-200 rounded-lg';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <div class="text-yellow-600 mr-2">⚠️</div>
          <div>
            <p class="text-sm text-yellow-800 font-medium">IntaSend not configured</p>
            <p class="text-xs text-yellow-600">Public key is missing. Please check environment variables.</p>
          </div>
        </div>
      `;
      element.appendChild(errorDiv);
      return;
    }

    // Create button with proper IntaSend attributes
    const button = document.createElement('button');
    button.className = 'intaSendPayButton';
    button.textContent = 'Pay with IntaSend';

    console.log('🔍 Creating button with class:', button.className);

    // Set IntaSend required attributes
    button.setAttribute('data-amount', String(options.amount));
    button.setAttribute('data-currency', options.currency);
    button.setAttribute('data-public_key', config.intasend.publicKey);
    button.setAttribute('data-email', options.email || '');
    button.setAttribute('data-first_name', options.first_name || '');
    button.setAttribute('data-last_name', options.last_name || '');
    button.setAttribute('data-phone', options.phone || '');
    button.setAttribute('data-redirect_url', `${window.location.origin}/payment-success`);
    button.setAttribute('data-callback_url', `${window.location.origin}/payment-success`);
    button.setAttribute('data-host', window.location.origin);
    button.setAttribute('data-environment', config.intasend.environment);
    
    // Add additional debugging attributes
    button.setAttribute('data-live', String(config.intasend.environment === 'live'));

    console.log('🔍 Button attributes set:', {
      amount: button.getAttribute('data-amount'),
      currency: button.getAttribute('data-currency'),
      public_key: button.getAttribute('data-public_key'),
      email: button.getAttribute('data-email'),
      environment: button.getAttribute('data-environment')
    });

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

    // Add click debugging (without preventing default behavior)
    button.addEventListener('click', (e) => {
      console.log('🔍 Payment button clicked!');
      console.log('🔍 Event:', e);
      console.log('🔍 Button element:', button);
      console.log('🔍 IntaSend instance available:', !!intaSendInstance);
      console.log('🔍 Window.IntaSend available:', !!window.IntaSend);
      
      // Check if IntaSend has detected this button
      const buttons = document.querySelectorAll('.intaSendPayButton');
      console.log('🔍 Found IntaSend buttons on page:', buttons.length);
      
      // Don't prevent default - let IntaSend handle it naturally
      // If IntaSend doesn't work, we'll fall back to manual approach
      setTimeout(() => {
        console.log('🔍 Checking if IntaSend handled the click...');
        // If nothing happened after 2 seconds, try manual approach
        if (!e.defaultPrevented) {
          console.log('🔍 IntaSend didn\'t handle the click, trying manual approach...');
          
          if (!intaSendInstance) {
            console.error('❌ IntaSend instance not available');
            alert('Payment system not ready. Please try again.');
            return;
          }

          try {
            console.log('🔍 Attempting to create payment with IntaSend...');
            
            // Try different methods to trigger payment
            if (typeof intaSendInstance.createPayment === 'function') {
              console.log('🔍 Using createPayment method...');
              intaSendInstance.createPayment({
                amount: options.amount,
                currency: options.currency,
                email: options.email,
                first_name: options.first_name,
                last_name: options.last_name,
                phone: options.phone,
                redirect_url: `${window.location.origin}/payment-success`,
                callback_url: `${window.location.origin}/payment-success`,
                host: window.location.origin
              });
            } else {
              console.log('🔍 Available methods on IntaSend instance:', Object.getOwnPropertyNames(intaSendInstance));
              console.log('🔍 Trying alternative approach - direct URL redirect...');
              
              // Try to construct the IntaSend payment URL directly
              const paymentData = {
                amount: String(options.amount),
                currency: options.currency,
                email: options.email,
                first_name: options.first_name,
                last_name: options.last_name,
                phone: options.phone,
                redirect_url: `${window.location.origin}/payment-success`,
                callback_url: `${window.location.origin}/payment-success`,
                host: window.location.origin,
                public_key: config.intasend.publicKey
              };
              
              console.log('🔍 Payment data:', paymentData);
              
              // Try to redirect to IntaSend payment page directly
              const baseUrl = config.intasend.environment === 'live' 
                ? 'https://pay.intasend.com' 
                : 'https://sandbox.intasend.com';
              
              const paymentUrl = `${baseUrl}/pay?${new URLSearchParams(paymentData).toString()}`;
              console.log('🔍 Redirecting to payment URL:', paymentUrl);
              
              // Open payment in new window/tab
              window.open(paymentUrl, '_blank');
            }
            
            console.log('✅ Payment request sent to IntaSend');
          } catch (error) {
            console.error('❌ Failed to create payment:', error);
            alert('Failed to initiate payment. Please try again.');
          }
        }
      }, 2000);
    });

    element.appendChild(button);

    // The IntaSend SDK auto-detects buttons with the 'intaSendPayButton' class
    // Event handlers are already set up globally
    console.log('✅ IntaSend button created and ready');
    
    // Add a small delay to ensure the SDK has time to detect the button
    setTimeout(() => {
      console.log('🔍 Checking if IntaSend detected the button...');
      if (window.IntaSend && intaSendInstance) {
        console.log('✅ IntaSend instance is ready and should auto-detect the button');
        console.log('🔍 IntaSend instance methods:', Object.getOwnPropertyNames(intaSendInstance));
        console.log('🔍 IntaSend instance prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(intaSendInstance)));
        
        // Try to manually trigger button detection if available
        if (typeof intaSendInstance.detectButtons === 'function') {
          console.log('🔍 Manually triggering button detection...');
          intaSendInstance.detectButtons();
        }
        
        // Check if there's a method to manually trigger payment
        if (typeof intaSendInstance.triggerPayment === 'function') {
          console.log('🔍 Found triggerPayment method');
        }
        if (typeof intaSendInstance.startPayment === 'function') {
          console.log('🔍 Found startPayment method');
        }
        if (typeof intaSendInstance.processPayment === 'function') {
          console.log('🔍 Found processPayment method');
        }
      } else {
        console.warn('⚠️ IntaSend instance not ready, button may not work');
      }
    }, 1000);

    console.log('IntaSend payment button created with options:', options);
  };

  return {
    createIntaSendButton,
    isSDKLoaded,
    isInitialized: isSDKLoaded, // Add alias for compatibility
    sdkLoadError,
    intaSendInstance
  };
};