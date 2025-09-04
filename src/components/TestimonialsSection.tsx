import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Graduate Student",
    rating: 5,
    text: "Amazing support throughout my thesis writing. The quality was exceptional and delivered right on time. Highly recommend!",
    avatar: "SM"
  },
  {
    name: "James L.",
    role: "MBA Student",
    rating: 5,
    text: "The tutoring sessions helped me improve my grades significantly. Professional, patient, and very knowledgeable tutors.",
    avatar: "JL"
  },
  {
    name: "Maria G.",
    role: "Business Owner",
    text: "Outstanding web development service. They built exactly what I envisioned and provided excellent ongoing support.",
    rating: 5,
    avatar: "MG"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from students and professionals who trust our services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-0 relative"
            >
              <CardContent className="p-6">
                <div className="absolute top-4 left-4">
                  <Quote className="h-6 w-6 text-primary/20" />
                </div>
                
                <div className="flex items-center gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground leading-relaxed mb-6 text-center">
                  "{testimonial.text}"
                </p>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mx-auto mb-3">
                    {testimonial.avatar}
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};