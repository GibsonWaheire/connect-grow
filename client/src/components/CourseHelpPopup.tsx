import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, X, Sparkles, Zap, Star } from "lucide-react";

const CourseHelpPopup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check localStorage once on component mount
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    const dismissed = localStorage.getItem('course-help-popup-dismissed');
    return dismissed === 'true';
  });

  // Don't show on course-help page
  if (location.pathname === '/course-help') {
    return null;
  }

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  const handleClick = () => {
    navigate('/course-help');
    handleDismiss();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('course-help-popup-dismissed', 'true');
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-[60] safe-area-bottom safe-area-right animate-slide-up-noticeable" 
      style={{ 
        maxWidth: 'calc(100vw - 3rem)',
        pointerEvents: 'auto'
      }}
    >
      {/* Glowing shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl blur-xl opacity-60 animate-pulse-glow -z-10" />
      
      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-2xl border-4 border-white/50 p-1 max-w-md w-full group hover:shadow-3xl transition-all duration-300 animate-bounce-subtle">
        {/* Animated border glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl opacity-50 blur-md animate-pulse-glow" />
        
        <div className="relative bg-white rounded-xl p-6">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100 z-10"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="flex items-start gap-4 pr-8">
            {/* Animated icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-lg animate-pulse opacity-50" />
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-4 shadow-xl animate-bounce-slow">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              {/* Sparkle effects */}
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400 animate-spin-slow" />
              <Star className="absolute -bottom-1 -left-1 h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1 rounded-full mb-3 animate-pulse">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-xs font-bold">Special Offer!</span>
              </div>
              
              <h3 className="font-bold text-slate-900 mb-2 text-lg md:text-xl leading-tight">
                🎓 Need Course Help?
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Get expert assistance with your academic assignments. Quality guaranteed, fast delivery.
              </p>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span>Quality</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Zap className="h-3 w-3 text-emerald-500" />
                  <span>Fast</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <GraduationCap className="h-3 w-3 text-blue-500" />
                  <span>Expert</span>
                </div>
              </div>
              
              <Button
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                size="lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get Help Now →
              </Button>
            </div>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-float opacity-60" />
            <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full animate-float-delay-1 opacity-60" />
            <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float-delay-2 opacity-60" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up-noticeable {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          60% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-8px) translateX(4px);
          }
          66% {
            transform: translateY(-4px) translateX(-4px);
          }
        }
        
        @keyframes float-delay-1 {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-6px) translateX(3px);
          }
        }
        
        @keyframes float-delay-2 {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(-3px);
          }
        }
        
        .animate-slide-up-noticeable {
          animation: slide-up-noticeable 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float-delay-1 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-float-delay-2 {
          animation: float-delay-2 3.5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default CourseHelpPopup;

