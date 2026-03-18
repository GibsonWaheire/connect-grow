import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice } from "@/shared/utils";

const ExtraServicesSection = () => {
  const services = [
    {
      category: "AI & Content Services",
      shopCategory: null,
      priceFrom: null,
      services: [
        "AI Content Humanizer",
        "Turnitin Checkout",
        "AI Rewriting & Paraphrasing",
        "Content Originality Enhancement",
        "AI Detection Removal",
      ],
    },
    {
      category: "Web Development",
      shopCategory: "Web Development",
      priceFrom: 6500,
      services: [
        "Custom Website Development",
        "E-commerce Platforms",
        "Landing Page Design",
        "Website Redesign",
        "Progressive Web Apps (PWAs)",
      ],
    },
    {
      category: "Mobile Development",
      shopCategory: null,
      priceFrom: null,
      services: [
        "Mobile App Development (iOS & Android)",
        "Cross-Platform Apps",
        "App Maintenance & Updates",
        "Mobile Optimization",
      ],
    },
    {
      category: "Social Media",
      shopCategory: "Social Media",
      priceFrom: 1300,
      services: [
        "Social Media Posts",
        "Content Creation",
        "Social Media Management",
        "Engagement & Analytics",
      ],
    },
    {
      category: "Digital Marketing",
      shopCategory: "Digital Marketing",
      priceFrom: 2600,
      services: [
        "SEO Optimization",
        "Digital Marketing Strategy",
        "Content Marketing",
        "Social Media Management",
      ],
    },
    {
      category: "Business Solutions",
      shopCategory: null,
      priceFrom: null,
      services: [
        "Business Automation",
        "CRM Development",
        "Dashboard & Analytics",
        "API Integration",
      ],
    },
    {
      category: "Content",
      shopCategory: "Content",
      priceFrom: 3250,
      services: [
        "Blog Posts",
        "Articles",
        "Content Packages",
        "SEO-Optimized Copy",
      ],
    },
    {
      category: "Design Services",
      shopCategory: "Design",
      priceFrom: 1950,
      services: [
        "UI/UX Design",
        "Brand Identity Design",
        "Graphic Design",
        "Design Systems",
      ],
    },
    {
      category: "Cloud & Infrastructure",
      shopCategory: null,
      priceFrom: null,
      services: [
        "Cloud Migration",
        "DevOps & CI/CD",
        "Server Setup & Configuration",
        "Infrastructure Management",
      ],
    },
    {
      category: "Specialized Services",
      shopCategory: null,
      priceFrom: null,
      services: [
        "Blockchain Development",
        "AI/ML Integration",
        "Voice & Chatbot Development",
        "Custom Software Solutions",
      ],
    },
  ];

  const handleContact = (service?: string) => {
    const subject = service
      ? `Inquiry about ${service}`
      : "Inquiry about Extra Services";
    const message = service
      ? `Hello, I'm interested in learning more about your ${service} service. Please provide more details and pricing.`
      : "Hello, I'm interested in learning more about your extra services. Please provide more details and pricing.";
    window.location.href = `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A full range of digital solutions to cover every aspect of your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {services.map((category, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-5 bg-white flex flex-col hover:border-slate-300 transition-colors"
            >
              <h3 className="font-semibold text-base text-slate-900 mb-1">
                {category.category}
              </h3>
              {category.priceFrom != null ? (
                <p className="text-xs text-emerald-600 font-medium mb-3">from {formatPrice(category.priceFrom)}</p>
              ) : (
                <div className="mb-3" />
              )}

              <ul className="space-y-1.5 mb-4 flex-1">
                {category.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                    <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-600" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>

              {category.shopCategory ? (
                <Button
                  onClick={() => window.location.href = `/shop?category=${encodeURIComponent(category.shopCategory!)}`}
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  View in Shop <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={() => handleContact(category.category)}
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Get Quote <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Need a Custom Solution?
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get in touch and let's discuss how we can help with your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => handleContact()}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
            >
              Get a Custom Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => window.location.href = '/about'}
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraServicesSection;

export { ExtraServicesSection };
