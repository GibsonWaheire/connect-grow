import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { sendMessage } = useWhatsApp();

  const handleGetStarted = () => {
    navigate('/services');
  };

  const handleWhatsApp = () => {
    sendMessage("Hi! I'd like to discuss my school help needs and get a quote.");
  };

  return (
    <section className="min-h-screen flex items-center gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              School Help <br />
              <span className="text-white/90">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professional help for all your school needs. Quality work at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleGetStarted}
                className="group"
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
                onClick={handleWhatsApp}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
              >
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop&crop=center" 
                  alt="WhatsApp" 
                  className="h-5 w-5 rounded"
                />
                Chat on WhatsApp
              </Button>
            </div>
            <div className="mt-8 text-white/70 text-sm">
              ✨ Human research only • No AI • 24/7 Support • 500+ satisfied students
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="School help services" 
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