import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleEmail = () => {
    window.open("mailto:support@yourservice.com", "_blank");
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Academic Services Pro</h3>
            <p className="text-background/70 mb-6 leading-relaxed">
              Your trusted partner for academic writing, tutoring, and digital solutions. 
              We're committed to helping you achieve your educational and professional goals.
            </p>
            <div className="flex gap-4">
              <Button 
                variant="whatsapp" 
                size="lg" 
                onClick={handleWhatsApp}
                className="bg-primary hover:bg-primary-dark"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleEmail}
                className="border-background/30 text-background hover:bg-background hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                Email
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#samples" className="hover:text-primary transition-colors">Samples</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-background/70">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@yourservice.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-background/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © 2024 Academic Services Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/70">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#refund" className="hover:text-primary transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};