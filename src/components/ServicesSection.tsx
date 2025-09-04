import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop&crop=center",
    title: "Academic Writing",
    description: "Essays, research papers, dissertations, and thesis writing with expert guidance."
  },
  {
    icon: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=64&h=64&fit=crop&crop=center",
    title: "Tutoring",
    description: "One-on-one and group tutoring sessions across various subjects and levels."
  },
  {
    icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
    title: "Digital Services",
    description: "Content creation, digital marketing, and online presence optimization."
  },
  {
    icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=64&h=64&fit=crop&crop=center",
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
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="h-8 w-8 rounded object-cover"
                  />
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