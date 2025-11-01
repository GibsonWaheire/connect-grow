import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, X } from "lucide-react";

const CourseHelpPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't show on course-help page
    if (location.pathname === '/course-help') {
      return;
    }

    // Check if user has dismissed it before
    const dismissed = localStorage.getItem('course-help-popup-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClick = () => {
    navigate('/course-help');
    handleDismiss();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('course-help-popup-dismissed', 'true');
  };

  // Don't render if dismissed or on course-help page
  if (isDismissed || location.pathname === '/course-help' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-slide-up safe-area-bottom safe-area-right" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
      <div className="bg-white rounded-lg shadow-2xl border-2 border-emerald-500 p-3 sm:p-4 max-w-xs w-full relative group hover:shadow-3xl transition-all duration-300">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-3 pr-6">
          <div className="bg-emerald-100 rounded-full p-2 flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1 text-sm">
              Need Course Help?
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Get expert assistance with your academic assignments and coursework.
            </p>
            <Button
              onClick={handleClick}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 h-auto"
              size="sm"
            >
              Get Help Now
            </Button>
          </div>
        </div>

        {/* Decorative pulse animation */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CourseHelpPopup;

