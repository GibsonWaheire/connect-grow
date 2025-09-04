import { useState } from 'react';
import { useServices } from '@/shared/hooks/useServices';
import { ServiceCard } from '@/shared/components/ServiceCard';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const categories = [
  { id: 'all', name: 'All Services', icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=24&h=24&fit=crop&crop=center' },
  { id: 'non-technical', name: 'Non-Technical', icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=24&h=24&fit=crop&crop=center' },
  { id: 'technical', name: 'Technical', icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=24&h=24&fit=crop&crop=center' },
  { id: 'exams', name: 'Exams', icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=24&h=24&fit=crop&crop=center' },
];

export const ServicesSection = () => {
  const { services, loading, getServicesByCategory } = useServices();
  const { sendMessage } = useWhatsApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleServiceClick = (serviceTitle: string) => {
    sendMessage(`Hi! I'm interested in your ${serviceTitle} service. Can you provide more details?`);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const filteredServices = activeCategory === 'all' 
    ? services 
    : getServicesByCategory(activeCategory);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional help for all your school needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional help for all your school needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className="flex items-center gap-2"
            >
              <OptimizedImage
                src={category.icon}
                alt={category.name}
                width={20}
                height={20}
                className="w-5 h-5 rounded"
              />
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
