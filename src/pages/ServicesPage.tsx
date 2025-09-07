import { useState, useCallback } from 'react';
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
import { parsePhoneNumber, isValidPhoneNumber, getCountries, getCountryCallingCode, CountryCode } from 'libphonenumber-js';
import validator from 'validator';

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

// Generate countries list dynamically using libphonenumber-js
const countries = getCountries().map(countryCode => ({
  code: countryCode,
  name: new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) || countryCode,
  dialCode: `+${getCountryCallingCode(countryCode)}`,
  format: `+${getCountryCallingCode(countryCode)} XXX XXX XXX` // Generic format, will be improved
}));

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
    phone: '',
    country: 'AE'
  });
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { sendMessage } = useWhatsApp();
  const { isInitialized, createIntaSendButton, sdkLoadError } = useIntaSendPaymentButton();

  const WORDS_PER_PAGE = 275;

  const calculatePages = useCallback(() => {
    return Math.ceil(parseInt(formData.words) / WORDS_PER_PAGE);
  }, [formData.words]);

  const getSelectedCountry = useCallback(() => {
    return countries.find(c => c.code === formData.country) || countries[0];
  }, [formData.country]);

  const formatPhoneNumber = useCallback((phone: string, countryCode: string) => {
    try {
      const phoneNumber = parsePhoneNumber(phone, countryCode as CountryCode);
      return phoneNumber ? phoneNumber.formatInternational() : phone;
    } catch (error) {
      // Fallback to simple formatting if parsing fails
      const country = countries.find(c => c.code === countryCode) || countries[0];
      return `${country.dialCode} ${phone.replace(/[^\d]/g, '')}`;
    }
  }, []);

  const validatePhoneNumber = useCallback((phone: string, countryCode: string) => {
    try {
      return isValidPhoneNumber(phone, countryCode as CountryCode);
    } catch (error) {
      // Fallback to basic length validation if parsing fails
      const cleanPhone = phone.replace(/[^\d]/g, '');
      return cleanPhone.length >= 7 && cleanPhone.length <= 15;
    }
  }, []);

  const calculatePrice = useCallback(() => {
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
  }, [selectedService, formData.slides, formData.urgency, calculatePages]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    
    // Generate email suggestions
    if (value.includes('@')) {
      const [localPart, domain] = value.split('@');
      if (localPart && domain) {
        // Comprehensive list of popular email domains
        const commonDomains = [
          'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com',
          'protonmail.com', 'zoho.com', 'yandex.com', 'mail.com', 'gmx.com', 'web.de',
          'live.com', 'msn.com', 'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net',
          'bellsouth.net', 'cox.net', 'charter.net', 'earthlink.net', 'juno.com',
          'netzero.net', 'rocketmail.com', 'ymail.com', 'inbox.com', 'fastmail.com'
        ];
        const suggestions = commonDomains
          .filter(d => d.startsWith(domain.toLowerCase()))
          .map(d => `${localPart}@${d}`);
        setEmailSuggestions(suggestions);
        setShowEmailSuggestions(suggestions.length > 0);
      }
    } else {
      setEmailSuggestions([]);
      setShowEmailSuggestions(false);
    }
  }, []);

  const selectEmailSuggestion = useCallback((email: string) => {
    setFormData(prev => ({ ...prev, email }));
    setShowEmailSuggestions(false);
  }, []);

  // Pure validation function that doesn't set state
  const getStepValidationErrors = useCallback(() => {
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
        } else if (formData.name.trim().split(/\s+/).length < 2) {
          errors.push('Please enter your first and last name');
        }
        if (!formData.email.trim()) {
          errors.push('Please enter your email address');
        } else if (!validator.isEmail(formData.email.trim())) {
          errors.push('Please enter a valid email address (e.g., user@example.com)');
        }
        if (!formData.phone.trim()) {
          errors.push('Please enter your phone number');
        } else {
          if (!validatePhoneNumber(formData.phone, formData.country)) {
            const country = getSelectedCountry();
            errors.push(`Please enter a valid ${country.name} phone number`);
          }
        }
        break;
    }
    
    return errors;
  }, [currentStep, selectedService, formData, validatePhoneNumber, getSelectedCountry]);

  // State-setting validation function
  const validateCurrentStep = useCallback(() => {
    const errors = getStepValidationErrors();
    setValidationErrors(errors);
    return errors.length === 0;
  }, [getStepValidationErrors]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setShowAlert(false);
      }
    } else {
      setShowAlert(true);
    }
  }, [currentStep, validateCurrentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowAlert(false);
    }
  }, [currentStep]);

  const handleServiceSelect = useCallback((serviceId: string) => {
    setSelectedService(serviceId);
    const service = services.find(s => s.id === serviceId);
    setFormData(prev => ({ ...prev, service: service?.title || '' }));
    setExpandedService(null);
  }, []);

  const handleSubmit = useCallback(() => {
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
  }, [selectedService, formData, calculatePages, calculatePrice, sendMessage]);

  const handlePayment = useCallback(async () => {
    try {
      if (!isInitialized) {
        alert('Payment system is still loading. Please wait a moment and try again.');
        return;
      }

      setIsProcessingPayment(true);
      const service = services.find(s => s.id === selectedService);
      
      // Validate and format data for IntaSend
      const email = formData.email.trim().toLowerCase();
      const phone = formData.phone.trim();
      
      // Strict email validation using validator library
      if (!validator.isEmail(email)) {
        alert('Please enter a valid email address (e.g., user@example.com)');
        setIsProcessingPayment(false);
        return;
      }
      
      // Country-specific phone validation
      if (!validatePhoneNumber(phone, formData.country)) {
        const country = getSelectedCountry();
        alert(`Please enter a valid ${country.name} phone number. Format: ${country.format}`);
        setIsProcessingPayment(false);
        return;
      }
      
      // Format phone number for IntaSend
      const formattedPhone = formatPhoneNumber(phone, formData.country);
      
      // Enhanced name splitting
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || 'Customer';
      const lastName = nameParts.slice(1).join(' ') || 'User';
      
      // Create detailed order summary
      const orderSummary = `
Service: ${service?.title}
Subject: ${formData.subject}
${service?.id === 'presentations' ? `Slides: ${formData.slides}` : `Words: ${formData.words} (${calculatePages()} pages)`}
Urgency: ${formData.urgency}
Instructions: ${formData.instructions || 'None provided'}
Contact: ${formData.name} (${email}, ${formattedPhone})
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
      
      // Initialize IntaSend Payment Button with validated data
      const paymentOptions = {
        amount: calculatePrice(),
        currency: 'USD',
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: formattedPhone
      };

      console.log('🔍 IntaSend Payment Options:', paymentOptions);

      // Create the IntaSend payment button
      createIntaSendButton(paymentOptions);
      
      setIsProcessingPayment(false);
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setIsProcessingPayment(false);
      alert('Failed to initialize payment. Please try again.');
    }
  }, [isInitialized, formData, selectedService, calculatePrice, calculatePages, formatPhoneNumber, validatePhoneNumber, getSelectedCountry, createIntaSendButton]);

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
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Philosophy">Philosophy</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="Sociology">Sociology</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                    <SelectItem value="Statistics">Statistics</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                    <SelectItem value="Database Management">Database Management</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Accounting">Accounting</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Political Science">Political Science</SelectItem>
                    <SelectItem value="International Relations">International Relations</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Nursing">Nursing</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="Anthropology">Anthropology</SelectItem>
                    <SelectItem value="Linguistics">Linguistics</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Art History">Art History</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Theater">Theater</SelectItem>
                    <SelectItem value="Film Studies">Film Studies</SelectItem>
                    <SelectItem value="Journalism">Journalism</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Social Work">Social Work</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                    <SelectItem value="Architecture">Architecture</SelectItem>
                    <SelectItem value="Urban Planning">Urban Planning</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Veterinary Science">Veterinary Science</SelectItem>
                    <SelectItem value="Other">Other (specify in instructions)</SelectItem>
                  </SelectContent>
                </Select>
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
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p className="text-sm text-muted-foreground">We need this information to process your order and send updates</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name (e.g., John Smith)"
                  className="h-12"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">As it appears on your ID or payment card</p>
              </div>
              <div className="relative">
                <label className="text-sm font-medium mb-2 block">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="your.email@example.com"
                  className="h-12"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">We'll send order updates and payment receipts here</p>
                {showEmailSuggestions && emailSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {emailSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        onClick={() => selectEmailSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Country *</label>
                <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value, phone: '' }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name} ({country.dialCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Select your country to set the correct phone format</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center px-3 py-3 border border-input bg-background rounded-md text-sm font-medium text-muted-foreground min-w-[80px]">
                    {getSelectedCountry().dialCode}
                  </div>
                  <Input
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setFormData(prev => ({ ...prev, phone: value }));
                    }}
                    placeholder="Enter your phone number"
                    className="h-12 flex-1"
                    required
                  />
                </div>
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium mb-1">📱 Phone Number Format:</p>
                  <p className="text-xs text-blue-700">
                    <strong>Example:</strong> {getSelectedCountry().format.replace(/X/g, '0')}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Just enter the numbers without spaces or special characters
                  </p>
                  <p className="text-xs text-blue-500 mt-1">
                    💡 The country code (+{getSelectedCountry().dialCode.replace('+', '')}) is already added for you
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="text-green-600 mt-0.5">✅</div>
                  <div>
                    <p className="text-sm text-green-800 font-medium">Almost Done!</p>
                    <p className="text-xs text-green-700 mt-1">
                      All fields are required for secure payment processing. We'll use this information to:
                    </p>
                    <ul className="text-xs text-green-600 mt-1 ml-4 list-disc">
                      <li>Process your payment securely</li>
                      <li>Send order updates and receipts</li>
                      <li>Contact you if we have questions</li>
                    </ul>
                  </div>
                </div>
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
                Review your order details above. Use the buttons below to proceed.
              </p>
              
              {/* IntaSend Payment Button Container */}
              <div id="payment-button-container" className="mt-6">
                {/* IntaSend button will be inserted here when payment is initiated */}
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <p>• WhatsApp: Send order details and pay later</p>
                <p>• Pay with IntaSend: Secure payment processing</p>
                {sdkLoadError && (
                  <p className="text-red-600 mt-2">
                    ⚠️ Payment system temporarily unavailable. Please use WhatsApp to place your order.
                  </p>
                )}
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
                    Order via WhatsApp
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={!formData.name || isProcessingPayment || !isInitialized || sdkLoadError}
                    className={`px-4 py-2 text-sm ${
                      sdkLoadError 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <CreditCard className="w-3 h-3 mr-1" />
                    {sdkLoadError 
                      ? 'Payment Unavailable' 
                      : !isInitialized 
                        ? 'Loading Payment...' 
                        : isProcessingPayment 
                          ? 'Processing...' 
                          : 'Pay with IntaSend'
                    }
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={getStepValidationErrors().length > 0}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue to Next Step
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
