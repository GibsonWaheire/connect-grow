import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OptimizedImage } from './OptimizedImage';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    price?: string;
    features?: string[];
  };
  onClick?: () => void;
  className?: string;
}

export const ServiceCard = ({ service, onClick, className }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        'gradient-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border-0 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <OptimizedImage 
            src={service.icon} 
            alt={service.title}
            width={32}
            height={32}
            className="h-8 w-8 rounded object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {service.description}
        </p>
        {service.price && (
          <p className="text-lg font-bold text-primary mb-3">
            {service.price}
          </p>
        )}
        {service.features && service.features.length > 0 && (
          <div className="space-y-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                ✓ {feature}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
