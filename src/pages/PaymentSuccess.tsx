import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useIntasendPayment } from '@/shared/hooks/useIntasendPayment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail, Phone, Calendar, DollarSign } from 'lucide-react';

interface OrderData {
  name: string;
  email: string;
  phone: string;
  serviceTitle: string;
  subject: string;
  words: string;
  slides: string;
  urgency: string;
  instructions: string;
  totalPrice: number;
  orderId: string;
  timestamp: string;
}

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { verifyPayment, getPaymentDetails } = useIntasendPayment();

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      const invoiceId = searchParams.get('invoice_id');
      
      if (invoiceId) {
        try {
          // Get payment details from Intasend
          const paymentDetails = await getPaymentDetails(invoiceId);
          const isSuccess = paymentDetails.state === 'COMPLETE';
          
          if (isSuccess) {
            // Get stored order data
            const storedOrder = localStorage.getItem('pendingOrder');
            if (storedOrder) {
              setOrderData(JSON.parse(storedOrder));
              localStorage.removeItem('pendingOrder'); // Clean up
            }
          }
          
          setPaymentStatus(isSuccess ? 'success' : 'failed');
        } catch (error) {
          console.error('Payment verification error:', error);
          setPaymentStatus('failed');
        }
      } else {
        setPaymentStatus('failed');
      }
    };

    verifyPaymentStatus();
  }, [searchParams, getPaymentDetails]);

  const handleEmailPeter = () => {
    const subject = encodeURIComponent(`Order Confirmation - ${orderData?.orderId}`);
    const body = encodeURIComponent(`Hi Peter,

I have successfully completed my payment for the following order:

Order ID: ${orderData?.orderId}
Service: ${orderData?.serviceTitle}
Subject: ${orderData?.subject}
${orderData?.words ? `Words: ${orderData.words} (${Math.ceil(parseInt(orderData.words) / 275)} pages)` : `Slides: ${orderData?.slides}`}
Urgency: ${orderData?.urgency}
Total Paid: $${orderData?.totalPrice}

Instructions: ${orderData?.instructions || 'None provided'}

Please confirm receipt and let me know the next steps.

Best regards,
${orderData?.name}
${orderData?.email}
${orderData?.phone}`);

    window.open(`mailto:pwriter455@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleNewOrder = () => {
    navigate('/services');
  };

  if (paymentStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
          <p className="text-gray-600 mb-6">There was an issue with your payment. Please try again or contact Peter directly.</p>
          <div className="space-y-3">
            <Button onClick={handleNewOrder} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" onClick={handleEmailPeter} className="w-full">
              Contact Peter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your order has been confirmed and payment received.</p>
          </div>

          {orderData && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Order Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">{orderData.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{orderData.serviceTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">{orderData.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Urgency:</span>
                        <span className="font-medium capitalize">{orderData.urgency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-medium text-green-600">${orderData.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{orderData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{orderData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(orderData.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {orderData.instructions && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Instructions</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {orderData.instructions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Peter will review your order and get back to you within 24 hours with the next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleEmailPeter} className="bg-green-600 hover:bg-green-700">
                <Mail className="w-4 h-4 mr-2" />
                Email Peter
              </Button>
              <Button variant="outline" onClick={handleNewOrder}>
                Place Another Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
