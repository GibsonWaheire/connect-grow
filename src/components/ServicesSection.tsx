import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Monitor, Code } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Academic Writing",
    description: "Essays, research papers, dissertations, and thesis writing with expert guidance."
  },
  {
    icon: Users,
    title: "Tutoring",
    description: "One-on-one and group tutoring sessions across various subjects and levels."
  },
  {
    icon: Monitor,
    title: "Digital Services",
    description: "Content creation, digital marketing, and online presence optimization."
  },
  {
    icon: Code,
    title: "Web/App Development",
    description: "Custom websites, mobile apps, and software development solutions."
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional solutions tailored to your academic and digital needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="gradient-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border-0"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};