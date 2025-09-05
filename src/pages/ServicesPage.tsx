import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { useIntaSendPaymentButton } from '@/shared/hooks/useIntaSendPaymentButton';
import { AlertCircle, ChevronDown, ChevronUp, CheckCircle, CreditCard, MessageCircle } from 'lucide-react';

const services = [
  {
    id: 'non-technical',
    title: 'Non-Technical Writing',
    price: 8,
    description: 'Essays, research papers, literature reviews',
    subjects: ['English', 'History', 'Philosophy', 'Psychology', 'Sociology', 'Business', 'Marketing'],
    icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=48&h=48&fit=crop&crop=center',
    color: 'from-blue-500 to-blue-600',
    features: ['Human research only', 'Free revisions', '3-5 day turnaround', 'Turnitin report']
  },
  {
    id: 'technical',
    title: 'Technical Writing',
    price: 15,
    description: 'Programming, data analysis, technical subjects',
    subjects: ['Python', 'Java', 'C++', 'Data Analysis', 'Statistics', 'Mathematics', 'Engineering'],
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=48&h=48&fit=crop&crop=center',
    color: 'from-green-500 to-green-600',
    features: ['Expert technical knowledge', 'Code documentation', '5-7 day turnaround', 'Plagiarism report']
  },
  {
    id: 'presentations',
    title: 'Presentations & PPT',
    price: 5,
    description: 'PowerPoint presentations with transcripts included',
    subjects: ['All subjects', 'Professional design', 'Speaker notes', 'Transcripts included'],
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=48&h=48&fit=crop&crop=center',
    color: 'from-purple-500 to-purple-600',
    features: ['Professional design', 'Speaker notes included', '2-3 day turnaround', 'Transcripts provided']
  },
  {
    id: 'exam',
    title: 'Exam Help',
    price: 30,
    description: 'Professional assistance with exams',
    subjects: ['All subjects', 'Timely delivery', 'Guaranteed quality'],
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=48&h=48&fit=crop&crop=center',
    color: 'from-orange-500 to-orange-600',
    features: ['Same day delivery', 'Guaranteed quality', 'All subjects covered', '24/7 support']
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
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    subject: '',
    words: '275',
    slides: '1',
    urgency: 'normal',
    instructions: '',
    name: '',
    email: '',
    phone: ''
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { sendMessage } = useWhatsApp();
  const { initializePaymentButton } = useIntaSendPaymentButton();

  const WORDS_PER_PAGE = 275;

  const calculatePages = () => {
    return Math.ceil(parseInt(formData.words) / WORDS_PER_PAGE);
  };

  const calculatePrice = () => {
    const service = services.find(s => s.id === selectedService);
    if (!service) return 0;
    
    let basePrice;
    if (service.id === 'presentations') {
      basePrice = service.price * parseInt(formData.slides);
    } else {
      const pages = calculatePages();
      basePrice = service.price * pages;
    }
    
    // Urgency multiplier
    if (formData.urgency === 'urgent') basePrice *= 1.5;
    if (formData.urgency === 'express') basePrice *= 2;
    
    return basePrice;
  };

  const validateCurrentStep = () => {
    const errors: string[] = [];
    
    switch (currentStep) {
      case 0:
        if (!selectedService) {
          errors.push('Please select a service');
        }
        break;
      case 1:
        if (!formData.subject.trim()) {
          errors.push('Please enter a subject');
        }
        if (selectedService === 'presentations' && parseInt(formData.slides) < 1) {
          errors.push('Please enter number of slides');
        } else if (selectedService !== 'presentations' && parseInt(formData.words) < 275) {
          errors.push('Please enter at least 275 words');
        }
        break;
      case 2:
        if (!formData.name.trim()) {
          errors.push('Please enter your full name');
        }
        if (!formData.email.trim()) {
          errors.push('Please enter your email address');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.push('Please enter a valid email address');
        }
        if (!formData.phone.trim()) {
          errors.push('Please enter your phone number');
        }
        break;
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setShowAlert(false);
      }
    } else {
      setShowAlert(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowAlert(false);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    const service = services.find(s => s.id === serviceId);
    setFormData(prev => ({ ...prev, service: service?.title || '' }));
    setExpandedService(null);
  };

  const handleSubmit = () => {
    const service = services.find(s => s.id === selectedService);
    
    const message = `Hi Peter! I'd like to place an order:

Service: ${service?.title}
Subject: ${formData.subject}
${service?.id === 'presentations' ? `Slides: ${formData.slides}` : `Words: ${formData.words} (${calculatePages()} pages)`}
Urgency: ${formData.urgency}
Total Price: $${calculatePrice()}

Instructions: ${formData.instructions}

Contact: ${formData.name} (${formData.email}, ${formData.phone})`;

    sendMessage(message);
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);
      const service = services.find(s => s.id === selectedService);
      
      // Create detailed order summary
      const orderSummary = `
Service: ${service?.title}
Subject: ${formData.subject}
${service?.id === 'presentations' ? `Slides: ${formData.slides}` : `Words: ${formData.words} (${calculatePages()} pages)`}
Urgency: ${formData.urgency}
Instructions: ${formData.instructions || 'None provided'}
Contact: ${formData.name} (${formData.email}, ${formData.phone})
      `.trim();

      // Store order data in localStorage for potential use after payment
      const orderData = {
        ...formData,
        serviceId: selectedService,
        serviceTitle: service?.title,
        totalPrice: calculatePrice(),
        orderId: `ORDER_${Date.now()}_${selectedService}`,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));

      // Initialize IntaSend Payment Button
      const paymentOptions = {
        amount: calculatePrice(),
        currency: 'USD',
        email: formData.email,
        phone_number: formData.phone,
        first_name: formData.name.split(' ')[0] || formData.name,
        last_name: formData.name.split(' ').slice(1).join(' ') || '',
        api_ref: `ORDER_${Date.now()}_${selectedService}`,
        comment: orderSummary,
        country: 'US',
        method: 'CARD-PAYMENT' as const,
        card_tarrif: 'BUSINESS-PAYS' as const,
        mobile_tarrif: 'BUSINESS-PAYS' as const,
        redirect_url: `${window.location.origin}/payment-success`
      };

      // Initialize the payment button
      initializePaymentButton('payment-button-container', paymentOptions);
      
      setIsProcessingPayment(false);
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setIsProcessingPayment(false);
      alert('Failed to initialize payment. Please try again.');
    }
  };

  const renderServiceCards = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Choose Your Service</h3>
      {services.map((service) => (
        <Card
          key={service.id}
          className={`transition-all duration-300 ${
            selectedService === service.id
              ? 'border-primary shadow-xl scale-[1.02] ring-2 ring-primary/20'
              : 'hover:shadow-lg hover:scale-[1.01]'
          }`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <OptimizedImage
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg shadow-md"
                />
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  ${service.price}/{service.id === 'presentations' ? 'slide' : 'page'}
                </p>
                <Button
                  variant={selectedService === service.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleServiceSelect(service.id)}
                  className="mt-2"
                >
                  {selectedService === service.id ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    'Select'
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>

          <Collapsible
            open={expandedService === service.id}
            onOpenChange={() => setExpandedService(expandedService === service.id ? null : service.id)}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4">
                <span>View Details</span>
                {expandedService === service.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Subjects Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderServiceCards();

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject *</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Python Programming"
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {selectedService === 'presentations' ? 'Number of Slides *' : 'Number of Words *'}
                </label>
                <Input
                  type="number"
                  min={selectedService === 'presentations' ? 1 : 275}
                  value={selectedService === 'presentations' ? formData.slides : formData.words}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedService === 'presentations') {
                      setFormData(prev => ({ ...prev, slides: value === '' ? '' : value }));
                    } else {
                      setFormData(prev => ({ ...prev, words: value === '' ? '' : value }));
                    }
                  }}
                  onBlur={(e) => {
                    // Ensure minimum value when input loses focus
                    if (selectedService === 'presentations') {
                      if (!e.target.value || parseInt(e.target.value) < 1) {
                        setFormData(prev => ({ ...prev, slides: '1' }));
                      }
                    } else {
                      if (!e.target.value || parseInt(e.target.value) < 275) {
                        setFormData(prev => ({ ...prev, words: '275' }));
                      }
                    }
                  }}
                  className="h-12"
                />
                {selectedService !== 'presentations' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {calculatePages()} page(s) at 275 words per page
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger className="h-12">
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
                <label className="text-sm font-medium mb-2 block">Instructions/Requirements</label>
                <Textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Describe your assignment, requirements, and any specific instructions..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  className="h-12"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="h-12"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (234) 567-8900"
                  className="h-12"
                  required
                />
              </div>
              <div className="text-sm text-muted-foreground">
                * All fields are required for payment processing.
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Review Your Order</h3>
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Service:</span>
                    <span className="font-semibold text-primary">{formData.service}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subject:</span>
                    <span>{formData.subject}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {selectedService === 'presentations' ? 'Slides:' : 'Words:'}
                    </span>
                    <span>
                      {selectedService === 'presentations' 
                        ? `${formData.slides} slide(s)` 
                        : `${formData.words} (${calculatePages()} pages)`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Urgency:</span>
                    <span className="capitalize">{formData.urgency}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Price:</span>
                      <span className="text-2xl font-bold text-primary">${calculatePrice()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Choose how you'd like to proceed with your order
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 text-base w-full"
                  disabled={!formData.name}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order via WhatsApp
                </Button>
                
                <div className="w-full">
                  <Button
                    onClick={handlePayment}
                    disabled={!formData.name || isProcessingPayment}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base w-full"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isProcessingPayment ? 'Processing...' : 'Pay Now'}
                  </Button>
                  
                  {/* IntaSend Payment Button Container */}
                  <div id="payment-button-container" className="mt-2"></div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <p>• WhatsApp: Send order details and pay later</p>
                <p>• Pay Now: Secure payment with Intasend</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Place Your Order
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your service and complete the form below
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    index <= currentStep ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 text-center font-medium hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={steps[currentStep].progress} className="h-2" />
          </div>

          {/* Validation Alert */}
          {showAlert && validationErrors.length > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Please fix the following errors:</strong>
                <ul className="mt-2 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Main Content */}
          <Card className="p-6 shadow-xl border-0">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-2"
              >
                Back
              </Button>

              {currentStep < steps.length - 1 && (
                <Button
                  onClick={handleNext}
                  className="px-6 py-2 text-base"
                >
                  Next
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {selectedService && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="container mx-auto max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Estimated Price:</p>
                <p className="text-xl font-bold text-primary">${calculatePrice()}</p>
              </div>
              
              {currentStep === steps.length - 1 ? (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.name}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={!formData.name || isProcessingPayment}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm"
                  >
                    <CreditCard className="w-3 h-3 mr-1" />
                    {isProcessingPayment ? 'Processing...' : 'Pay'}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 0 && !selectedService}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
