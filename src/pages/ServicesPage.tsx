import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { ServiceComparison } from '@/shared/components/ServiceComparison';

const services = [
  {
    id: 'non-technical',
    title: 'Non-Technical Writing',
    price: 8,
    description: 'Essays, research papers, literature reviews',
    subjects: ['English', 'History', 'Philosophy', 'Psychology', 'Sociology', 'Business', 'Marketing'],
    icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=48&h=48&fit=crop&crop=center'
  },
  {
    id: 'technical',
    title: 'Technical Writing',
    price: 15,
    description: 'Programming, data analysis, technical subjects',
    subjects: ['Python', 'Java', 'C++', 'Data Analysis', 'Statistics', 'Mathematics', 'Engineering'],
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=48&h=48&fit=crop&crop=center'
  },
  {
    id: 'exam',
    title: 'Exam Help',
    price: 30,
    description: 'Professional assistance with exams',
    subjects: ['All subjects', 'Timely delivery', 'Guaranteed quality'],
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=48&h=48&fit=crop&crop=center'
  }
];

const steps = [
  { id: 'service', title: 'Choose Service', progress: 25 },
  { id: 'details', title: 'Project Details', progress: 50 },
  { id: 'contact', title: 'Contact Info', progress: 75 },
  { id: 'review', title: 'Review & Submit', progress: 100 }
];

export const ServicesPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    service: '',
    subject: '',
    pages: 1,
    urgency: 'normal',
    instructions: '',
    name: '',
    email: '',
    phone: ''
  });
  const { sendMessage } = useWhatsApp();

  const calculatePrice = () => {
    const service = services.find(s => s.id === selectedService);
    if (!service) return 0;
    
    let basePrice = service.price * formData.pages;
    
    // Urgency multiplier
    if (formData.urgency === 'urgent') basePrice *= 1.5;
    if (formData.urgency === 'express') basePrice *= 2;
    
    return basePrice;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const service = services.find(s => s.id === selectedService);
    const message = `Hi! I'd like to place an order:

Service: ${service?.title}
Subject: ${formData.subject}
Pages: ${formData.pages}
Urgency: ${formData.urgency}
Total Price: $${calculatePrice()}

Instructions: ${formData.instructions}

Contact: ${formData.name} (${formData.email}, ${formData.phone})`;

    sendMessage(message);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Choose Your Service</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all ${
                    selectedService === service.id 
                      ? 'border-primary shadow-lg scale-105' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSelectedService(service.id);
                    setFormData(prev => ({ ...prev, service: service.title }));
                  }}
                >
                  <CardHeader className="text-center">
                    <OptimizedImage
                      src={service.icon}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded mx-auto mb-2"
                    />
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-primary font-bold">${service.price}/page</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {service.subjects.slice(0, 3).map((subject, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Project Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Python Programming"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Number of Pages</label>
                <Input
                  type="number"
                  min="1"
                  value={formData.pages}
                  onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (3-5 days)</SelectItem>
                    <SelectItem value="urgent">Urgent (1-2 days)</SelectItem>
                    <SelectItem value="express">Express (Same day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Price</label>
                <div className="text-2xl font-bold text-primary">${calculatePrice()}</div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Instructions/Requirements</label>
              <Textarea
                value={formData.instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="Describe your assignment, requirements, and any specific instructions..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (234) 567-8900"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Review Your Order</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-semibold">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subject:</span>
                    <span>{formData.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages:</span>
                    <span>{formData.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgency:</span>
                    <span className="capitalize">{formData.urgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Price:</span>
                    <span className="text-xl font-bold text-primary">${calculatePrice()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Click submit to send your order details via WhatsApp
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Service Comparison Section */}
      <ServiceComparison />
      
      {/* Order Form Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Place Your Order
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete the form below to get started with your school help order
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={steps[currentStep].progress} className="h-2" />
          </div>

          {/* Main Content */}
          <Card className="p-8">
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Submit Order
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!selectedService && currentStep === 0}>
                  Next
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
