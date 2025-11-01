import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/shared/components/Header";
import { 
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Lock,
  Shield
} from "lucide-react";

const GetStartedPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    packageType: "",
    paymentMethod: "",
  });
  const [step, setStep] = useState<"info" | "payment">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.packageType) {
      setStep("payment");
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const email = "pwriter455@gmail.com";
    const subject = `Payment Request - ${formData.packageType}`;
    const body = `Hello McGibs Digital Solutions,

I'm ready to proceed with payment for the ${formData.packageType} package.

CUSTOMER INFORMATION:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}

PACKAGE SELECTED: ${formData.packageType}
PAYMENT METHOD: ${formData.paymentMethod}

Please send me payment instructions so I can complete the purchase.

Thank you!`;

    try {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      setTimeout(() => {
        setIsSubmitting(false);
        // Reset form after sending
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          packageType: "",
          paymentMethod: "",
        });
        setStep("info");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const packages = [
    { name: "Website Starter", price: "$499", value: "Website Starter - $499" },
    { name: "App Pro", price: "$1,999", value: "App Pro - $1,999" },
    { name: "Commerce Plus", price: "$1,499", value: "Commerce Plus - $1,499" },
  ];

  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-cyan-50 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                {step === "info" ? "Get Started Today" : "Complete Your Payment"}
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                {step === "info" 
                  ? "Fill out your information and choose your package to get started."
                  : "Select your payment method to complete your order."
                }
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === "info" ? "text-emerald-600" : "text-slate-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "info" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-600"}`}>
                    {step === "payment" ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                  </div>
                  <span className="font-medium">Your Info</span>
                </div>
                <div className={`w-16 h-0.5 ${step === "payment" ? "bg-emerald-600" : "bg-slate-300"}`} />
                <div className={`flex items-center gap-2 ${step === "payment" ? "text-emerald-600" : "text-slate-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "payment" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    2
                  </div>
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
              {step === "info" ? (
                <form onSubmit={handleInfoSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="packageType" className="block text-sm font-medium text-slate-700 mb-2">
                      Select Package *
                    </label>
                    <select
                      id="packageType"
                      name="packageType"
                      required
                      value={formData.packageType}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Choose a package</option>
                      {packages.map((pkg) => (
                        <option key={pkg.value} value={pkg.value}>
                          {pkg.name} - {pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
                  >
                    Continue to Payment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Package:</span>
                        <span className="font-medium">{formData.packageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Customer:</span>
                        <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-700 mb-4">
                      Select Payment Method *
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: "Credit/Debit Card", icon: CreditCard },
                        { value: "Bank Transfer", icon: Shield },
                        { value: "Mobile Money", icon: Lock },
                      ].map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.value}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.paymentMethod === method.value
                                ? "border-emerald-600 bg-emerald-50"
                                : "border-slate-200 hover:border-emerald-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.value}
                              checked={formData.paymentMethod === method.value}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-emerald-600"
                              required
                            />
                            <Icon className="w-6 h-6 text-emerald-600" />
                            <span className="font-medium">{method.value}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> After submitting, you'll receive payment instructions via email. We'll send you a secure payment link or account details to complete your purchase.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("info")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          Complete Payment Request
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Security Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                <Lock className="w-4 h-4" />
                <span>Secure payment processing. Your information is protected.</span>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default GetStartedPage;

