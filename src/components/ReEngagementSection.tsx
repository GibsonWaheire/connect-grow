import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Sparkles, Clock, Star } from "lucide-react";

const updates = [
  {
    icon: Sparkles,
    title: "New AI-Powered Writing Assistant",
    description: "Enhanced academic writing with AI guidance and plagiarism detection."
  },
  {
    icon: Clock,
    title: "24/7 Express Service",
    description: "Rush orders now available with guaranteed delivery times."
  },
  {
    icon: Star,
    title: "Premium Tutoring Plans",
    description: "Unlimited sessions with top-rated tutors in your field."
  }
];

export const ReEngagementSection = () => {
  const handleClaimOffer = () => {
    window.open("https://wa.me/1234567890?text=Hi! I'd like to claim my 10% welcome back offer", "_blank");
  };

  return (
    <section className="py-20 gradient-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            It's Been a While 👋 – Here's What's New
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've been busy improving our services just for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {updates.map((update, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-sm shadow-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <update.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {update.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {update.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block bg-white shadow-hover border-0 p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                Welcome Back Offer
              </h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Get <span className="font-bold text-primary">10% off</span> your first order back
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleClaimOffer}
              className="text-lg"
            >
              Claim Your Offer
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Valid for orders placed within the next 30 days
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};