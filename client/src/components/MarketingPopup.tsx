import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketingPopupProps {
  message?: string;
  showDelay?: number;
  title?: string;
}

const MarketingPopup: React.FC<MarketingPopupProps> = ({
  message = "Get 20% off your first project when you sign up for our newsletter!",
  showDelay = 5000, // Show after 5 seconds
  title = "Special Offer"
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownBefore, setHasShownBefore] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Never show on payment page
    if (location.pathname === '/payment') return;

    // Check if popup has been shown before
    const hasShown = localStorage.getItem('marketing-popup-shown');
    if (hasShown) {
      setHasShownBefore(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, showDelay);

    return () => clearTimeout(timer);
  }, [showDelay, location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('marketing-popup-shown', 'true');
    setHasShownBefore(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    console.log('Newsletter signup:', email);
    // You can integrate with services like Mailchimp, ConvertKit, etc.
    alert('Thank you for subscribing! Check your email for your discount code.');
    handleClose();
  };

  const handleSkip = () => {
    handleClose();
  };

  // Don't render on payment page or if already shown before
  if (location.pathname === '/payment' || hasShownBefore) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-emerald-600" />
              <AlertDialogTitle className="text-lg font-semibold">
                {title}
              </AlertDialogTitle>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <AlertDialogDescription className="text-left">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <form onSubmit={handleSubscribe} className="my-4 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Claim Offer
            </Button>
            <AlertDialogCancel onClick={handleSkip} className="sm:w-auto">
              No Thanks
            </AlertDialogCancel>
          </div>
        </form>

        <div className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarketingPopup;

