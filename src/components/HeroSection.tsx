import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/services');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("School Help Inquiry - Services & Pricing");
    const body = encodeURIComponent(`Hi Peter,

I remember you from before and I'm interested in your school help services.

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
                Hi there! I'm Peter 👋
              </h2>
              <p className="text-lg md:text-xl text-white/80">
                Remember me? I'm still here to help with your academic needs!
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
                Email Peter
              </Button>
            </div>
            
            <div className="mt-8 text-white/70 text-sm">
              ✨ Human research only • Turnitin reports • 24/7 Support • 500+ satisfied students
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