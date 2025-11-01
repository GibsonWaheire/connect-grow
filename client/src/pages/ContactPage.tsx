import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { Header } from "@/shared/components/Header";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2,
  Zap,
  ShoppingCart
} from "lucide-react";

const ContactPage = () => {
  const { sendMessage } = useWhatsApp();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Pre-fill form from URL parameters (for purchase links)
  useEffect(() => {
    const subject = searchParams.get('subject');
    const message = searchParams.get('message');
    if (subject) {
      setFormData(prev => ({ ...prev, subject: decodeURIComponent(subject) }));
    }
    if (message) {
      setFormData(prev => ({ ...prev, message: decodeURIComponent(message) }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Create email body with form data
    const emailBody = `Hello McGibs Digital Solutions,

I'd like to get in touch regarding: ${formData.subject}

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

---
This message was sent from the contact form on your website.`;

    const emailSubject = encodeURIComponent(formData.subject || "Inquiry from Contact Form");
    const emailBodyEncoded = encodeURIComponent(emailBody);

    try {
      // Open email client with pre-filled form data
      window.location.href = `mailto:pwriter455@gmail.com?subject=${emailSubject}&body=${emailBodyEncoded}`;
      
      // Simulate success (since mailto doesn't give feedback)
      setTimeout(() => {
        setSubmitStatus("success");
        setIsSubmitting(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }, 500);
    } catch (error) {
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    sendMessage("Hi! I'd like to discuss a project with your team.");
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "24/7 Support Available",
      action: handleWhatsApp,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      description: "pwriter455@gmail.com",
      action: () => window.location.href = "mailto:pwriter455@gmail.com",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "+1 (443) 869-7500",
      action: () => window.location.href = "tel:+14438697500",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Let's Start a Conversation
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                We're here to help bring your digital vision to life. Get in touch and let's discuss how we can work together.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>Typically respond within an hour during business hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="container mx-auto px-4 py-16">
          {/* Purchase Indicator */}
          {searchParams.get('subject')?.includes('Purchase') && (
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 flex items-start gap-4">
                <ShoppingCart className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-emerald-900 mb-2">Ready to Purchase!</h3>
                  <p className="text-emerald-800 text-sm">
                    We've pre-filled the form below with your package information. Just add your contact details and we'll process your order and send payment instructions.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Send Us a Message</h2>
                <p className="text-slate-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
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
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What can we help you with?"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, requirements, or any questions you have..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Get in Touch</h2>
                <p className="text-slate-600">
                  Prefer a different method? Choose the option that works best for you.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={index}
                      onClick={method.action}
                      className={`w-full p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-primary transition-all duration-300 text-left group ${method.hoverColor}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${method.color} ${method.hoverColor} p-3 rounded-lg text-white transition-colors`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-primary transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-slate-600 text-sm">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">Office Hours</h3>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</p>
                      <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</p>
                      <p><strong>Sunday:</strong> Closed</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    <Zap className="w-3 h-3 inline mr-1" />
                    WhatsApp support available 24/7 for urgent inquiries
                  </p>
                </div>
              </div>

              {/* Quick Response Guarantee */}
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">
                      Fast Response Guarantee
                    </h3>
                    <p className="text-sm text-slate-600">
                      We understand your time is valuable. We typically respond to all inquiries within 1 hour during business hours, and within 4 hours during evenings and weekends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
                What Happens Next?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Send Your Inquiry",
                    description: "Fill out the form or reach out via your preferred method. We'll receive your message instantly.",
                  },
                  {
                    step: "02",
                    title: "We Review & Respond",
                    description: "Our team reviews your request and responds with personalized information and next steps.",
                  },
                  {
                    step: "03",
                    title: "Start Your Project",
                    description: "Once we understand your needs, we'll prepare a proposal and get started on your project.",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ContactPage;

