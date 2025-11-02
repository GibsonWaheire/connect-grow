import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  FileText, 
  Globe, 
  Smartphone, 
  ShoppingCart,
  Code,
  Search,
  Palette,
  Cloud,
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const ExtraServicesSection = () => {
  const services = [
    {
      category: "AI & Content Services",
      icon: Sparkles,
      services: [
        "AI Content Humanizer - Remove AI detection markers",
        "Turnitin Checkout - Pass plagiarism checks",
        "AI Rewriting & Paraphrasing",
        "Content Originality Enhancement",
        "AI Detection Removal"
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      category: "Web Development",
      icon: Globe,
      services: [
        "Custom Website Development",
        "E-commerce Platforms",
        "Landing Page Design",
        "Website Redesign",
        "Progressive Web Apps (PWAs)"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200"
    },
    {
      category: "Mobile Development",
      icon: Smartphone,
      services: [
        "Mobile App Development (iOS & Android)",
        "Cross-Platform Apps",
        "App Maintenance & Updates",
        "Mobile Optimization"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      category: "Digital Marketing",
      icon: Search,
      services: [
        "SEO Optimization",
        "Digital Marketing Strategy",
        "Content Marketing",
        "Social Media Management"
      ],
      color: "from-orange-500 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200"
    },
    {
      category: "Business Solutions",
      icon: Code,
      services: [
        "Business Automation",
        "CRM Development",
        "Dashboard & Analytics",
        "API Integration"
      ],
      color: "from-indigo-500 to-violet-500",
      bgColor: "from-indigo-50 to-violet-50",
      borderColor: "border-indigo-200"
    },
    {
      category: "Design Services",
      icon: Palette,
      services: [
        "UI/UX Design",
        "Brand Identity Design",
        "Graphic Design",
        "Design Systems"
      ],
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200"
    },
    {
      category: "Cloud & Infrastructure",
      icon: Cloud,
      services: [
        "Cloud Migration",
        "DevOps & CI/CD",
        "Server Setup & Configuration",
        "Infrastructure Management"
      ],
      color: "from-slate-500 to-gray-500",
      bgColor: "from-slate-50 to-gray-50",
      borderColor: "border-slate-200"
    },
    {
      category: "Specialized Services",
      icon: Zap,
      services: [
        "Blockchain Development",
        "AI/ML Integration",
        "Voice & Chatbot Development",
        "Custom Software Solutions"
      ],
      color: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200"
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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Check Our Extra Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Beyond our core offerings, we provide a wide range of digital solutions to meet all your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.bgColor} border-2 ${category.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Category Title */}
                <h3 className="font-bold text-lg mb-4 text-slate-900">
                  {category.category}
                </h3>

                {/* Services List */}
                <ul className="space-y-2 mb-4">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)'
            }} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need One of These Services?
            </h3>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Get in touch and let's discuss how we can help with your specific needs. We offer custom solutions tailored to your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => handleContact()}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-slate-50 px-8 py-6 text-lg font-semibold shadow-lg"
              >
                Get a Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => window.location.href = '/about'}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraServicesSection;
