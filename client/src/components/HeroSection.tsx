import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useNavigate, useLocation } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    // If on course-help page, ALWAYS scroll to services section - NEVER redirect
    if (location.pathname === '/course-help' || location.pathname === '/course-help/') {
      const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Retry after a short delay if element not found yet
          setTimeout(scrollToServices, 100);
        }
      };
      scrollToServices();
      return;
    }
    // Otherwise redirect to services page
    navigate('/services');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("School Help Inquiry - Services & Pricing");
    const body = encodeURIComponent(`Hi McGibs Digital Solutions,

I'm interested in your academic writing and course help services.

Could you please tell me about:
- Your current services and pricing
- Turnaround times
- Any special offers you have

Looking forward to hearing from you!

Best regards,
[Your name]`);
    
    window.open(`mailto:pwriter455@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section className="min-h-screen flex items-center gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">500+ Students Helped</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-2">
                Welcome to McGibs Digital Solutions 👋
              </h2>
              <p className="text-lg md:text-xl text-white/80">
                Expert academic writing and course assistance to help you succeed!
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ace Your <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Academic Goals
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professional essays, research papers, technical assignments & presentations. 
              <span className="font-semibold text-yellow-300">100% human research</span> with Turnitin reports & 24/7 support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleGetStarted}
                className="group w-full sm:w-auto"
              >
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=20&h=20&fit=crop&crop=center" 
                  alt="Get Started" 
                  className="h-5 w-5 group-hover:scale-110 transition-transform rounded"
                />
                View Services & Order
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                onClick={handleEmail}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              >
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=20&h=20&fit=crop&crop=center" 
                  alt="Email" 
                  className="h-5 w-5 rounded"
                />
                Contact Us
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>100% Human Research</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Turnitin Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>500+ Students Helped</span>
              </div>
            </div>
            
            {/* Privacy Notice */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-white/80 text-sm text-center">
                🔒 Your privacy is protected. We use your information only to provide services and never share it with third parties. 
                <a href="/privacy-policy" className="text-white underline hover:text-white/80 ml-1">
                  Read our Privacy Policy
                </a>
              </p>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Academic writing and school help services" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};