import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { servicesData } from "@/shared/data/services";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { CheckCircle2 } from "lucide-react";

interface AcademicServicesSectionProps {
  onOrderClick?: (serviceId: string) => void;
}

export const AcademicServicesSection = ({ onOrderClick }: AcademicServicesSectionProps) => {

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Academic Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional academic help at competitive prices. Choose a service below to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <Card
              key={service.id}
              className={`relative hover:shadow-lg transition-all ${
                service.popular ? "border-primary shadow-md" : ""
              }`}
            >
              {service.popular && (
                <Badge className="absolute -top-3 right-4 bg-primary text-white">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <OptimizedImage
                    src={service.icon}
                    alt={service.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-primary font-bold text-lg">
                      ${service.price}/{service.unit}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Includes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-muted px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onOrderClick?.(service.id)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  Order Now
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
