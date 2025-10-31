import React, { useEffect } from 'react';
import { useIntaSendPaymentButton } from '../shared/hooks/useIntaSendPaymentButton';

const IntaSendTest = () => {
  const { createIntaSendButton, isSDKLoaded, sdkLoadError } = useIntaSendPaymentButton();

  useEffect(() => {
    // Only try to create the button if the SDK has loaded successfully
    if (isSDKLoaded) {
      console.log('🧪 Creating test IntaSend button...');
      createIntaSendButton({
        amount: 100, // Hard-coded valid amount
        currency: 'KES', // Hard-coded valid currency
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        phone: '+254700000000'
      });
    }
  }, [isSDKLoaded, createIntaSendButton]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">IntaSend Button Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          SDK Status: {isSDKLoaded ? '✅ Loaded' : '⏳ Loading...'}
        </p>
        {sdkLoadError && (
          <p className="text-red-600 text-sm mt-2">
            ❌ Error: The payment system is not available.
          </p>
        )}
      </div>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Setup Required:</h3>
        <p className="text-sm text-blue-700">
          Create a <code>.env</code> file in your project root with:
        </p>
        <pre className="text-xs mt-2 bg-blue-100 p-2 rounded overflow-x-auto">
{`VITE_INTASEND_PUBLIC_KEY=your_key_here
VITE_INTASEND_SECRET_KEY=your_secret_here
VITE_INTASEND_ENVIRONMENT=sandbox`}
        </pre>
      </div>
      
      <div id="payment-button-container" className="min-h-[60px] border-2 border-dashed border-gray-300 rounded p-4">
        <p className="text-gray-500 text-sm text-center">
          Payment button will appear here...
        </p>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Test Amount: 100 KES</p>
        <p>Test Email: test@example.com</p>
      </div>
    </div>
  );
};

export default IntaSendTest;
