import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { useLocation } from "react-router-dom";

export const CTASection = () => {
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
    window.location.href = '/services';
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("School Help Inquiry - Ready to Get Started");
    const body = encodeURIComponent(`Hi McGibs Digital Solutions,

I'm ready to get started with your academic writing services!

Could you please provide:
- Current pricing for your services
- Available turnaround times
- How to place an order
- Any current special offers

I'm looking forward to working with you!

Best regards,
[Your name]`);
    
    window.open(`mailto:pwriter455@gmail.com?subject=${subject}&body=${body}`, '_blank');
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
            Join hundreds of satisfied students who trust us with their academic needs. Professional writing, technical courses, and exam help with 100% human research.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleGetStarted}
              className="group bg-white text-primary hover:bg-white/90 shadow-hover w-full sm:w-auto"
            >
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=24&h=24&fit=crop&crop=center" 
                alt="Get Started"
                className="h-6 w-6 group-hover:scale-110 transition-transform rounded object-cover"
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
                src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=24&h=24&fit=crop&crop=center" 
                alt="Email"
                className="h-6 w-6 rounded object-cover"
              />
              Contact Us
            </Button>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Turnitin Reports</span>
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