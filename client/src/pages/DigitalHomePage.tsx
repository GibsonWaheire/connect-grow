import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Header } from "@/shared/components/Header";
import { Monitor, Smartphone, BarChart3, ArrowRight, Check, Zap, Shield, Code, Rocket, Heart, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { products } from "@/data/products";
import { useCart } from "@/shared/contexts/CartContext";
import { CheckCircle2, Sparkles } from "lucide-react";
import { AnimatedMetrics, FAQSection, CaseStudiesSection, EnhancedTestimonials } from "@/components/DigitalPageSections";
import { ExtraServicesSection } from "@/components/ExtraServicesSection";

const DigitalHomePage = () => {
  const { addItem } = useCart();

  useEffect(() => {
    document.title = "McGibs Digital Solutions | Web, Mobile & E‑commerce";
    const desc = "McGibs Digital Solutions builds production‑grade websites, web apps, mobile apps, and e‑commerce with modern stacks and reliable delivery.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'McGibs Digital Solutions | Web, Mobile & E‑commerce' },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
    ];
    ogTags.forEach(tag => {
      let el = document.querySelector(`meta[property="${tag.property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // Structured Data (Schema.org)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "McGibs Digital Solutions",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "description": desc,
      "sameAs": ["https://portfolio-main-two-bice.vercel.app/"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "pwriter455@gmail.com"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Website Starter",
          "price": "499",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "App Pro",
          "price": "1999",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Commerce Plus",
          "price": "1499",
          "priceCurrency": "USD"
        }
      ]
    };
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }, []);



  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero Section - Real Images & Animations */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-16 lg:pb-24">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 opacity-20">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=1080&fit=crop"
              alt="Modern workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90" />
          </div>

          {/* Floating Elements Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-float" style={{ animationDuration: '6s', animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl animate-float" style={{ animationDuration: '7s', animationDelay: '4s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge with Animation */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white rounded-full px-4 py-2 mb-6 ring-1 ring-white/20 animate-fade-in">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Building Digital Solutions Since 2020</span>
                </div>

                {/* Main Heading with Animation */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white animate-slide-up">
                  We Build
                  <span className="block text-emerald-400 mt-2">Custom Digital Products</span>
                  <span className="block text-white text-3xl md:text-4xl lg:text-5xl mt-2">That Drive Results</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-delay">
                  Full-stack development for web apps, mobile apps, and e-commerce. We turn your ideas into scalable, production-ready software.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 animate-fade-in-delay-2">
                  <Button 
                    size="lg" 
                    onClick={() => window.location.href = '/get-started'} 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg group shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    🚀 Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={() => window.location.href = '/quote'} 
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg group"
                  >
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <a 
                    href="#capabilities" 
                    className="px-8 py-6 text-lg border-2 border-white/30 rounded-lg hover:border-white/50 hover:bg-white/5 transition-all flex items-center gap-2"
                  >
                    See Our Work
                  </a>
                </div>

                {/* Trust Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 animate-fade-in-delay-3">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-400">50+</div>
                    <div className="text-xs md:text-sm text-white/70">Projects</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400">100+</div>
                    <div className="text-xs md:text-sm text-white/70">Clients</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-indigo-400">5+</div>
                    <div className="text-xs md:text-sm text-white/70">Years</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Real Portfolio Images */}
              <div className="relative mt-12 lg:mt-0">
                {/* Main Hero Image - Animated */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                    alt="Digital development work"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Floating Portfolio Cards */}
                <div className="absolute -top-8 -right-8 w-48 rounded-xl overflow-hidden shadow-xl border-2 border-white/20 bg-white/10 backdrop-blur-md animate-float-slow hidden md:block">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
                    alt="SaaS Dashboard"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-medium">Dashboard Project</span>
                    </div>
                    <div className="text-xs text-white/70">See Portfolio →</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 w-40 rounded-xl overflow-hidden shadow-xl border-2 border-white/20 bg-white/10 backdrop-blur-md animate-float-slow hidden md:block" style={{ animationDelay: '1s' }}>
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
                    alt="E-commerce App"
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-3 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <Smartphone className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-medium">Mobile App</span>
                    </div>
                    <div className="text-xs text-white/70">Live Project</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <AnimatedMetrics />
          </div>

          {/* Add CSS animations */}
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              33% { transform: translateY(-20px) translateX(10px); }
              66% { transform: translateY(-10px) translateX(-10px); }
            }
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(2deg); }
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes scale-in {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-float {
              animation: float infinite ease-in-out;
            }
            .animate-float-slow {
              animation: float-slow infinite ease-in-out;
            }
            .animate-fade-in {
              animation: fade-in 0.6s ease-out;
            }
            .animate-fade-in-delay {
              animation: fade-in 0.8s ease-out 0.2s both;
            }
            .animate-fade-in-delay-2 {
              animation: fade-in 1s ease-out 0.4s both;
            }
            .animate-fade-in-delay-3 {
              animation: fade-in 1.2s ease-out 0.6s both;
            }
            .animate-slide-up {
              animation: slide-up 0.8s ease-out;
            }
            .animate-scale-in {
              animation: scale-in 1s ease-out 0.3s both;
            }
          `}</style>
        </section>

        {/* Value Proposition Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Why Choose McGibs Digital Solutions?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We combine technical excellence with business acumen to deliver solutions that drive real results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Rocket,
                  title: "Fast Time-to-Market",
                  desc: "Agile development process ensures your product launches on schedule",
                  gradient: "from-emerald-500/10 to-emerald-600/5",
                  border: "border-emerald-200",
                  iconColor: "text-emerald-600"
                },
                {
                  icon: Code,
                  title: "Modern Tech Stack",
                  desc: "Built with cutting-edge technologies that scale with your business",
                  gradient: "from-blue-500/10 to-blue-600/5",
                  border: "border-blue-200",
                  iconColor: "text-blue-600"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  desc: "Security-first approach with best practices and compliance built-in",
                  gradient: "from-purple-500/10 to-purple-600/5",
                  border: "border-purple-200",
                  iconColor: "text-purple-600"
                },
                {
                  icon: Heart,
                  title: "Dedicated Support",
                  desc: "Ongoing maintenance and support to keep your product running smoothly",
                  gradient: "from-pink-500/10 to-pink-600/5",
                  border: "border-pink-200",
                  iconColor: "text-pink-600"
                },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-xl border-2 ${item.border} bg-gradient-to-br ${item.gradient} hover:shadow-lg transition-all group`}>
                  <div className={`w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4 ${item.iconColor} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section - Enhanced */}
        <section id="capabilities" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Complete Digital Solutions
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                From concept to deployment, we handle every aspect of your digital presence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: "Websites & CMS", 
                  desc: "Marketing sites, blogs, landing pages, and headless CMS with SEO optimization.", 
                  icon: "🌐", 
                  gradient: "from-blue-500/20 to-cyan-500/10", 
                  border: "border-blue-300",
                  features: ["Responsive Design", "SEO Optimized", "Fast Performance"]
                },
                { 
                  title: "Web Applications", 
                  desc: "Full-stack web apps with authentication, real-time features, and dashboards.", 
                  icon: "💻", 
                  gradient: "from-purple-500/20 to-pink-500/10", 
                  border: "border-purple-300",
                  features: ["User Auth", "Real-time Data", "Scalable"]
                },
                { 
                  title: "Mobile Apps", 
                  desc: "Native iOS/Android apps with React Native for cross-platform efficiency.", 
                  icon: "📱", 
                  gradient: "from-emerald-500/20 to-teal-500/10", 
                  border: "border-emerald-300",
                  features: ["Cross-platform", "Offline Support", "Push Notifications"]
                },
                { 
                  title: "E-commerce Platforms", 
                  desc: "Complete online stores with payment integration, inventory, and admin tools.", 
                  icon: "🛒", 
                  gradient: "from-orange-500/20 to-amber-500/10", 
                  border: "border-orange-300",
                  features: ["Payment Gateway", "Inventory Management", "Order Tracking"]
                },
                { 
                  title: "UI/UX Design", 
                  desc: "User-centered design with wireframes, prototypes, and design systems.", 
                  icon: "🎨", 
                  gradient: "from-indigo-500/20 to-violet-500/10", 
                  border: "border-indigo-300",
                  features: ["User Research", "Prototyping", "Design Systems"]
                },
                { 
                  title: "Cloud & DevOps", 
                  desc: "CI/CD pipelines, cloud hosting, monitoring, and scalable infrastructure.", 
                  icon: "☁️", 
                  gradient: "from-slate-500/20 to-gray-500/10", 
                  border: "border-slate-300",
                  features: ["CI/CD", "Cloud Hosting", "Monitoring"]
                },
              ].map((item) => (
                <div key={item.title} className={`p-8 rounded-2xl border-2 ${item.border} shadow-lg hover:shadow-xl transition-all bg-gradient-to-br ${item.gradient} hover:scale-[1.02] group`}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Moved Earlier */}
        <EnhancedTestimonials />

        {/* Featured Work */}
        <section id="featured-work" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Featured Projects</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore our portfolio of successful digital solutions across industries.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "SaaS Dashboard Platform",
                  desc: "Analytics, billing, and role-based access for enterprise teams.",
                  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop",
                  href: "https://portfolio-main-two-bice.vercel.app/",
                  category: "Web App",
                  badgeClass: "bg-emerald-500"
                },
                {
                  title: "E‑commerce Storefront",
                  desc: "High‑conversion product pages with seamless checkout experience.",
                  img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop",
                  href: "https://portfolio-main-two-bice.vercel.app/",
                  category: "E-commerce",
                  badgeClass: "bg-blue-500"
                },
                {
                  title: "Mobile App UI",
                  desc: "Onboarding, push notifications, and offline-first architecture.",
                  img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600",
                  href: "https://portfolio-main-two-bice.vercel.app/",
                  category: "Mobile App",
                  badgeClass: "bg-purple-500"
                },
              ].map((p) => (
                <a 
                  key={p.title} 
                  href={p.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group rounded-2xl overflow-hidden border-2 border-slate-200 bg-white hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <OptimizedImage src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${p.badgeClass} text-white text-xs font-medium backdrop-blur-sm`}>
                      {p.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="font-bold text-lg mb-2 text-slate-900 group-hover:text-emerald-600 transition-colors">{p.title}</div>
                    <div className="text-sm text-slate-600 leading-relaxed">{p.desc}</div>
                    <div className="mt-4 flex items-center gap-2 text-emerald-600 font-medium text-sm">
                      View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="https://portfolio-main-two-bice.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all"
              >
                View Full Portfolio <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Process Section - Enhanced */}
        <section id="process" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Proven Process</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A structured approach that ensures quality delivery every time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  step: "01", 
                  title: "Discovery", 
                  desc: "Deep dive into your goals, audience, and requirements. We create a comprehensive project roadmap.", 
                  color: "from-blue-500/20 to-indigo-500/10", 
                  border: "border-blue-300",
                  icon: "🔍"
                },
                { 
                  step: "02", 
                  title: "Design", 
                  desc: "Wireframes, visual mockups, and interactive prototypes. We iterate until perfection.", 
                  color: "from-purple-500/20 to-pink-500/10", 
                  border: "border-purple-300",
                  icon: "🎨"
                },
                { 
                  step: "03", 
                  title: "Development", 
                  desc: "Agile sprints with regular demos, QA testing, and code reviews. Clear communication throughout.", 
                  color: "from-emerald-500/20 to-teal-500/10", 
                  border: "border-emerald-300",
                  icon: "⚡"
                },
                { 
                  step: "04", 
                  title: "Launch & Support", 
                  desc: "Deployment, monitoring setup, documentation, and ongoing support to ensure success.", 
                  color: "from-orange-500/20 to-amber-500/10", 
                  border: "border-orange-300",
                  icon: "🚀"
                },
              ].map((s) => (
                <div key={s.step} className={`p-8 rounded-2xl border-2 ${s.border} shadow-lg hover:shadow-xl transition-all bg-gradient-to-br ${s.color} relative group`}>
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div className="text-sm text-slate-500 mb-3 font-bold">{s.step}</div>
                  <div className="font-bold text-xl mb-3 text-slate-900">{s.title}</div>
                  <div className="text-slate-700 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 flex-col sm:flex-row gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Featured Products</h2>
                <p className="text-slate-600">Handpicked quality tech products</p>
              </div>
              <a href="/shop" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                Browse All <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-white flex flex-col shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] group">
                  <a href={`/shop/${p.id}`} className="relative overflow-hidden">
                    <OptimizedImage src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </a>
                  <div className="p-6 flex-1 flex flex-col">
                    <a href={`/shop/${p.id}`} className="font-bold text-lg hover:text-emerald-600 transition-colors mb-2">{p.name}</a>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">{p.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-slate-900">${p.price.toFixed(2)}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" onClick={() => addItem(p, 1)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                      <a href={`/shop/${p.id}`} className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">View</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Built With Modern Technology</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We use cutting-edge tools and frameworks to build fast, scalable solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {["React", "TypeScript", "Node.js", "Vite", "Tailwind", "React Query", "Radix UI", "IntaSend", "Vercel", "Docker"].map((t) => (
                <div key={t} className="p-6 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all text-center font-semibold text-slate-700 hover:text-emerald-600 group">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Simple, Transparent Pricing</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choose the package that fits your needs. All packages include free consultation and support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Website Starter",
                  price: "$499",
                  period: "one-time",
                  features: ["1-2 page website", "SEO optimization", "Analytics setup", "Mobile responsive", "1 revision round"],
                  highlight: false,
                  gradient: "from-blue-50 to-cyan-50",
                  border: "border-blue-300",
                },
                {
                  name: "App Pro",
                  price: "$1,999",
                  period: "one-time",
                  features: ["Web or mobile app", "User authentication", "Dashboard/Admin panel", "Payment integration", "2 revision rounds"],
                  highlight: true,
                  gradient: "from-emerald-50 to-teal-50",
                  border: "border-emerald-400",
                },
                {
                  name: "Commerce Plus",
                  price: "$1,499",
                  period: "one-time",
                  features: ["Full e-commerce site", "Product catalog", "Checkout (IntaSend)", "Admin dashboard", "2 revision rounds"],
                  highlight: false,
                  gradient: "from-purple-50 to-pink-50",
                  border: "border-purple-300",
                },
              ].map((plan) => (
                <div key={plan.name} className={`p-8 rounded-2xl border-2 ${plan.border} shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br ${plan.gradient} ${plan.highlight ? 'scale-105 ring-4 ring-emerald-200 relative' : ''}`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-600 text-white text-sm font-bold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="font-bold text-2xl mb-2 text-slate-900">{plan.name}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-600 text-sm">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => window.location.href = '/get-started'} 
                      className={`w-full py-6 text-lg font-semibold ${plan.highlight ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                    >
                      🛒 Get Started
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/quote'} 
                      variant="outline"
                      className={`w-full py-4 text-base border-2 ${plan.highlight ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                    >
                      Get Free Quote
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CaseStudiesSection />
        <ExtraServicesSection />
        <FAQSection />

        {/* Final CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 text-white">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)'
                }} />
              </div>
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Amazing?</h3>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Let's discuss your project and turn your vision into a powerful digital solution.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    onClick={() => window.location.href = '/get-started'} 
                    size="lg" 
                    className="bg-white text-emerald-600 hover:bg-slate-50 px-8 py-6 text-lg font-semibold shadow-lg"
                  >
                    🚀 Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/quote'} 
                    size="lg" 
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
                  >
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <a 
                    href="/contact" 
                    className="px-8 py-6 text-lg border-2 border-white rounded-lg hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/about" 
                    className="px-8 py-6 text-lg border-2 border-white rounded-lg hover:bg-white/10 transition-all"
                  >
                    About Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default DigitalHomePage;
