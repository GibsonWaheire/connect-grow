import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { OptimizedImage } from '@/shared/components/OptimizedImage';

const pricingPlans = [
  {
    id: 'basic',
    title: 'Academic Writing',
    price: '$8',
    period: 'per page',
    description: 'Unbeatable pricing for quality academic writing',
    features: [
      'Human research only (no AI)',
      'Plagiarism-free guarantee',
      '24/7 support',
      'Expert writers',
      'Free revisions',
      'Fast delivery'
    ],
    popular: false,
    icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=48&h=48&fit=crop&crop=center'
  },
  {
    id: 'ai-refinement',
    title: 'AI Work Refinement',
    price: '$10',
    period: 'per 500 words',
    description: 'Transform AI work to meet school standards',
    features: [
      'AI to human quality conversion',
      'School compliance guarantee',
      'Grammar and style improvement',
      'Content enhancement',
      'Quick turnaround',
      'Quality assurance'
    ],
    popular: true,
    icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=48&h=48&fit=crop&crop=center'
  },
  {
    id: 'exam',
    title: 'Exam Assistance',
    price: '$30',
    period: 'per exam',
    description: 'Professional help with exams and assessments',
    features: [
      'All subjects covered',
      'Timely delivery',
      'Guaranteed quality',
      'Confidential service',
      'Comprehensive support',
      'Result guarantee'
    ],
    popular: false,
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=48&h=48&fit=crop&crop=center'
  }
];

const additionalServices = [
  {
    title: 'Technical Courses',
    price: '$15/page',
    description: 'Python, Data Analysis, Statistics',
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=32&h=32&fit=crop&crop=center'
  },
  {
    title: 'Tutoring Services',
    price: 'From $25/hour',
    description: 'One-on-one personalized learning',
    icon: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=32&h=32&fit=crop&crop=center'
  },
  {
    title: 'Digital Services',
    price: 'From $50/project',
    description: 'Content creation & digital marketing',
    icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=32&h=32&fit=crop&crop=center'
  }
];

export const PricingSection = () => {
  const { sendMessage } = useWhatsApp();

  const handleGetQuote = (service: string) => {
    sendMessage(`Hi! I'm interested in your ${service} service. Can you provide more details and a quote?`);
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unbeatable prices for quality academic services. No hidden fees, no surprises.
          </p>
        </div>

        {/* Main Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <OptimizedImage
                    src={plan.icon}
                    alt={plan.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded"
                  />
                </div>
                <CardTitle className="text-xl">{plan.title}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <OptimizedImage
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=16&h=16&fit=crop&crop=center"
                        alt="Check"
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2 rounded"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleGetQuote(plan.title)}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Additional Services</h3>
          <p className="text-muted-foreground">Specialized services for specific needs</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <OptimizedImage
                    src={service.icon}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded"
                  />
                </div>
                <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
                <p className="text-primary font-bold mb-2">{service.price}</p>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <Button 
                  onClick={() => handleGetQuote(service.title)}
                  variant="outline"
                  size="sm"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="inline-block bg-primary text-white p-8">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Quote?</h3>
            <p className="mb-6">Contact us for bulk orders, custom requirements, or special pricing</p>
            <Button 
              onClick={() => sendMessage("Hi! I need a custom quote for my academic needs.")}
              variant="secondary"
              size="lg"
            >
              Get Custom Quote
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
