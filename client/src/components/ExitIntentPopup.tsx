import { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed
    const dismissed = localStorage.getItem('exit-intent-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Detect exit intent (mouse leaving top of screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isDismissed && !isVisible) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isDismissed, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('exit-intent-dismissed', 'true');
  };

  const handleGetDiscount = () => {
    window.location.href = '/quote';
    handleDismiss();
  };

  const handleViewPricing = () => {
    window.location.href = '/pricing';
    handleDismiss();
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-slide-up">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Gift className="w-8 h-8 text-emerald-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Wait! Don't Go Yet! 🎁
          </h3>
          
          <p className="text-slate-600 mb-6">
            Get <span className="font-bold text-emerald-600">10% off</span> your first project when you start today!
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleGetDiscount}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
            >
              Claim 10% Discount
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              onClick={handleViewPricing}
              variant="outline"
              className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-4"
            >
              View Pricing
            </Button>

            <button
              onClick={handleDismiss}
              className="text-sm text-slate-500 hover:text-slate-700 w-full"
            >
              No thanks, I'll browse more
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          .animate-slide-up {
            animation: slide-up 0.4s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

