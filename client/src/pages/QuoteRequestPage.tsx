import { useState } from "react";
import emailjs from "@emailjs/browser";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/shared/components/Header";
import {
  Mail,
  Phone,
  User,
  FileText,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const QuoteRequestPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const templateParams = {
      to_email: "help@mcgibsdigitalsolutions.com",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company || "N/A",
      project_type: formData.projectType || "Not specified",
      budget: formData.budget || "Not specified",
      timeline: formData.timeline || "Not specified",
      message: formData.description,
      // also send as plain {{name}} and {{email}} in case template uses defaults
      name: formData.name,
      email: formData.email,
    };

    console.log("EmailJS templateParams:", templateParams);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setSubmitStatus("success");
      setIsSubmitting(false);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: "",
        });
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-cyan-50 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                Get Your Free Quote
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                Fill out the form below and we'll get back to you with a detailed quote within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Request Form */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                    <User className="w-6 h-6 text-emerald-600" />
                    Contact Information
                  </h2>
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
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
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
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company / Organization
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Inc. (optional)"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-emerald-600" />
                    Project Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-slate-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select project type</option>
                        <option value="Website">Website</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="E-commerce Platform">E-commerce Platform</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Full-Stack Solution">Full-Stack Solution</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select budget range</option>
                        <option value="Under KES 10,000">Under KES 10,000</option>
                        <option value="KES 10,000 - 50,000">KES 10,000 - 50,000</option>
                        <option value="KES 50,000 - 100,000">KES 50,000 - 100,000</option>
                        <option value="KES 100,000 - 250,000">KES 100,000 - 250,000</option>
                        <option value="KES 250,000+">KES 250,000+</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-2">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP / Urgent">ASAP / Urgent</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2-3 months">2-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Description *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, requirements, goals, and any specific features you need..."
                    rows={6}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    The more details you provide, the more accurate our quote will be.
                  </p>
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Quote request sent! We'll get back to you within 24 hours.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                    Something went wrong. Please try again or contact us at{" "}
                    <a href="mailto:help@mcgibsdigitalsolutions.com" className="underline">
                      help@mcgibsdigitalsolutions.com
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Quote Request
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Contact info */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900 mb-1">Email</h3>
                      <p className="text-sm text-slate-600">help@mcgibsdigitalsolutions.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900 mb-1">Phone</h3>
                      <p className="text-sm text-slate-600">+254726899113</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default QuoteRequestPage;
