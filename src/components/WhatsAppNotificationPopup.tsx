/**
 * Copyright (c) 2024 Peter's School Help
 * All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 * 
 * For licensing inquiries: pwriter455@gmail.com
 */

import React, { useState, useEffect } from 'react';
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
import { MessageCircle, Phone } from "lucide-react";
import { config } from "@/config/environment";

interface WhatsAppNotificationPopupProps {
  newWhatsAppNumber?: string;
  message?: string;
  showDelay?: number; // Delay in milliseconds before showing popup
}

const WhatsAppNotificationPopup: React.FC<WhatsAppNotificationPopupProps> = ({
  newWhatsAppNumber = config.whatsapp.number, // Use current number from config
  message = "We have a new WhatsApp number for better service!",
  showDelay = 0 // Show immediately
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownBefore, setHasShownBefore] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasShown = localStorage.getItem('whatsapp-notification-shown');
    if (hasShown) {
      setHasShownBefore(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, showDelay);

    return () => clearTimeout(timer);
  }, [showDelay]);

  // Temporary: Clear localStorage for testing (remove this line when done testing)
  useEffect(() => {
    localStorage.removeItem('whatsapp-notification-shown');
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as shown in localStorage
    localStorage.setItem('whatsapp-notification-shown', 'true');
    setHasShownBefore(true);
  };

  const handleWhatsAppClick = () => {
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${newWhatsAppNumber.replace(/\s+/g, '')}`;
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  const handleCallClick = () => {
    // Create phone link
    const phoneUrl = `tel:${newWhatsAppNumber.replace(/\s+/g, '')}`;
    window.open(phoneUrl, '_self');
    handleClose();
  };

  // Don't render if already shown before
  if (hasShownBefore) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-6 w-6 text-green-600" />
            <AlertDialogTitle className="text-lg font-semibold">
              Get Started with Your Project
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="my-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-lg font-medium text-green-800">
            <MessageCircle className="h-5 w-5" />
            <span>+1 443 869 7500</span>
          </div>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel onClick={handleClose}>
            Maybe Later
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleWhatsAppClick}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat with Us
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WhatsAppNotificationPopup;
