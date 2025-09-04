import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  const handleWhatsAppOrder = () => {
    window.open("https://wa.me/1234567890?text=Hi! I'd like to place an order", "_blank");
  };

  const handlePayment = () => {
    // This would integrate with your payment system
    console.log("Redirect to payment portal");
  };

  return (
    <section className="min-h-screen flex items-center gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Quick Orders & <br />
              <span className="text-white/90">Secure Payments</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Academic help, tutoring, and digital solutions—accessible anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleWhatsAppOrder}
                className="group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop&crop=center" 
                  alt="Message" 
                  className="h-5 w-5 group-hover:scale-110 transition-transform rounded"
                />
                Place an Order
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                onClick={handlePayment}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
              >
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=20&h=20&fit=crop&crop=center" 
                  alt="Payment" 
                  className="h-5 w-5 rounded"
                />
                Pay Securely
              </Button>
            </div>
            <div className="mt-8 text-white/70 text-sm">
              ✨ Trusted by 500+ students worldwide
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Academic services and tutoring" 
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