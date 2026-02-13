import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { servicesData, urgencyOptions, ServiceData } from "@/shared/data/services";
import { Loader2, Calculator, CreditCard } from "lucide-react";

interface OrderFormData {
  serviceId: string;
  quantity: number;
  subject: string;
  urgency: string;
  instructions: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AcademicOrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedServiceId?: string;
  preselectedSubject?: string;
}

export const AcademicOrderForm = ({
  open,
  onOpenChange,
  preselectedServiceId,
  preselectedSubject,
}: AcademicOrderFormProps) => {
  const [formData, setFormData] = useState<OrderFormData>({
    serviceId: "",
    quantity: 1,
    subject: "",
    urgency: "standard",
    instructions: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle preselection when props change
  useEffect(() => {
    if (open && preselectedServiceId) {
      setFormData((prev) => ({
        ...prev,
        serviceId: preselectedServiceId,
      }));
    }
  }, [open, preselectedServiceId]);

  useEffect(() => {
    if (open && preselectedSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: preselectedSubject,
      }));
    }
  }, [open, preselectedSubject]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({
        serviceId: preselectedServiceId || "",
        quantity: 1,
        subject: preselectedSubject || "",
        urgency: "standard",
        instructions: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setError(null);
    }
  }, [open, preselectedServiceId, preselectedSubject]);

  const selectedService = useMemo(() => {
    return servicesData.find((s) => s.id === formData.serviceId);
  }, [formData.serviceId]);

  const selectedUrgency = useMemo(() => {
    return urgencyOptions.find((u) => u.id === formData.urgency);
  }, [formData.urgency]);

  const calculatedPrice = useMemo(() => {
    if (!selectedService || !selectedUrgency) return 0;
    
    // For AI refinement, quantity is in 500-word blocks
    if (selectedService.id === "ai-refinement") {
      return selectedService.price * formData.quantity * selectedUrgency.multiplier;
    }
    
    // For exams, quantity is number of exams
    if (selectedService.id === "exams") {
      return selectedService.price * formData.quantity * selectedUrgency.multiplier;
    }
    
    // For other services, quantity is pages/slides
    return selectedService.price * formData.quantity * selectedUrgency.multiplier;
  }, [selectedService, selectedUrgency, formData.quantity]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
    }));
    setError(null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.serviceId) {
      setError("Please select a service");
      return;
    }
    if (!formData.firstName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    if (calculatedPrice <= 0) {
      setError("Invalid price calculation");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert USD to KES (approximate rate, adjust as needed)
      // Using rate of ~130 KES per USD
      const KES_RATE = 130;
      const amountInKES = Math.round(calculatedPrice * KES_RATE);

      const response = await fetch("/api/create-intasend-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInKES,
          currency: "KES",
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName || "",
          phone_number: formData.phone,
          redirect_url: `${window.location.origin}/payment-success?order=academic&service=${encodeURIComponent(selectedService?.title || "")}&amount=${amountInKES}`,
          comment: `Academic Order: ${selectedService?.title} - ${formData.quantity} ${selectedService?.unit} - ${selectedUrgency?.name} (${selectedUrgency?.time})
Subject: ${formData.subject || "Not specified"}
Instructions: ${formData.instructions || "None"}
Total: $${calculatedPrice.toFixed(2)} USD (KES ${amountInKES})`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Payment creation failed");
      }

      const data = await response.json();
      
      // Redirect to IntaSend payment page
      if (data.invoice?.url || data.url) {
        window.location.href = data.invoice?.url || data.url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to create payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const getQuantityLabel = () => {
    if (!selectedService) return "Quantity";
    if (selectedService.id === "ai-refinement") return "Number of 500-word blocks";
    if (selectedService.id === "exams") return "Number of exams";
    if (selectedService.id === "presentations") return "Number of slides";
    return "Number of pages";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Place Your Order
          </DialogTitle>
          <p className="text-muted-foreground">
            Fill in the details below and proceed to payment
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="serviceId">Service Type *</Label>
            <Select
              value={formData.serviceId}
              onValueChange={(value) => handleSelectChange("serviceId", value)}
            >
              <SelectTrigger id="serviceId">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {servicesData.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title} - ${service.price}/{service.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedService && (
              <p className="text-sm text-muted-foreground">
                {selectedService.description}
              </p>
            )}
          </div>

          {/* Quantity and Urgency */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">{getQuantityLabel()} *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Delivery Urgency *</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => handleSelectChange("urgency", value)}
              >
                <SelectTrigger id="urgency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {urgencyOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name} ({option.time}) - {option.multiplier}x
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject/Topic</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Psychology, Python Programming, Business"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions/Requirements</Label>
            <Textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Any specific requirements, formatting guidelines, or additional details..."
              rows={4}
            />
          </div>

          {/* Customer Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1234567890"
                  required
                />
              </div>
            </div>
          </div>

          {/* Price Calculation */}
          {selectedService && selectedUrgency && (
            <div className="bg-muted p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5" />
                <h4 className="font-semibold">Order Summary</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>
                    {selectedService.title} × {formData.quantity}{" "}
                    {selectedService.unit}
                  </span>
                  <span>${(selectedService.price * formData.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {selectedUrgency.name} ({selectedUrgency.time})
                  </span>
                  <span>{selectedUrgency.multiplier}x</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total (USD):</span>
                  <span>${calculatedPrice.toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ≈ KES {Math.round(calculatedPrice * 130).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting || !selectedService || calculatedPrice <= 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with IntaSend - ${calculatedPrice.toFixed(2)} USD
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment processing via IntaSend. Your information is encrypted and secure.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
