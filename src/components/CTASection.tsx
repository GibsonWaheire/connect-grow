import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const handleOrderNow = () => {
    window.open("https://wa.me/1234567890?text=Hi! I'm ready to place an order", "_blank");
  };

  const handlePayAndAccess = () => {
    // This would integrate with your payment/sample system
    console.log("Redirect to payment and samples portal");
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
            Join hundreds of satisfied students and professionals who trust us with their academic and digital needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleOrderNow}
              className="group bg-white text-primary hover:bg-white/90 shadow-hover"
            >
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=24&h=24&fit=crop&crop=center" 
                alt="Message"
                className="h-6 w-6 group-hover:scale-110 transition-transform rounded object-cover"
              />
              Order Now
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=20&h=20&fit=crop&crop=center" 
                alt="Arrow"
                className="h-5 w-5 group-hover:translate-x-1 transition-transform rounded object-cover"
              />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              onClick={handlePayAndAccess}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=24&h=24&fit=crop&crop=center" 
                alt="Document"
                className="h-6 w-6 rounded object-cover"
              />
              Pay & Access Samples
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};