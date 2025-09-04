import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { OptimizedImage } from "@/shared/components/OptimizedImage";

export const CTASection = () => {
  const { sendMessage } = useWhatsApp();

  const handleGetStarted = () => {
    sendMessage("Hi! I need school help. Can you tell me about your services and pricing?");
  };

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join hundreds of satisfied students who trust us with their school needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleGetStarted}
              className="group bg-white text-primary hover:bg-white/90 shadow-hover"
            >
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=24&h=24&fit=crop&crop=center" 
                alt="Get Started"
                className="h-6 w-6 group-hover:scale-110 transition-transform rounded object-cover"
              />
              Get Started Now
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Human Research Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};