import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Header } from "@/shared/components/Header";
import { Smartphone, BarChart3, ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";
import { products } from "@/data/products";
import { useCart } from "@/shared/contexts/CartContext";
import { CheckCircle2 } from "lucide-react";
import { AnimatedMetrics, FAQSection, CaseStudiesSection, EnhancedTestimonials } from "@/components/DigitalPageSections";
import ExtraServicesSection from "@/components/ExtraServicesSection";
import { ServicesStickyPopup } from "@/components/ServicesStickyPopup";
import { formatPrice } from "@/shared/utils";

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
        { "@type": "Offer", "name": "Social Media Post", "price": "1300", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Logo Design", "price": "1950", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "SEO Audit", "price": "2600", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Content Creation", "price": "3250", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Social Media Management", "price": "4550", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Landing Page Design", "price": "6500", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Brand Identity Kit", "price": "9750", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Content Package", "price": "13000", "priceCurrency": "KES" },
        { "@type": "Offer", "name": "Website Starter Kit", "price": "19500", "priceCurrency": "KES" }
      ]
    };
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

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
      <ServicesStickyPopup />
      <MainLayout>
        {/* Hero Section — kept as-is */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white pt-24 pb-16 lg:pb-24">
          <div className="absolute inset-0 opacity-20">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=1080&fit=crop"
              alt="Modern workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-blue-950/90" />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-float" style={{ animationDuration: '6s', animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl animate-float" style={{ animationDuration: '7s', animationDelay: '4s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white rounded-full px-4 py-2 mb-6 ring-1 ring-white/20 animate-fade-in">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Building Digital Solutions Since 2020</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white animate-slide-up">
                  We Build
                  <span className="block text-emerald-400 mt-2">Custom Digital Products</span>
                  <span className="block text-white text-3xl md:text-4xl lg:text-5xl mt-2">That Drive Results</span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-delay">
                  Full-stack development for web apps, mobile apps, and e-commerce. We turn your ideas into scalable, production-ready software.
                </p>

                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 animate-fade-in-delay-2">
                  <Button
                    size="lg"
                    onClick={() => window.location.href = '/get-started'}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg group shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    Get Started
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

              <div className="relative mt-12 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                    alt="Digital development work"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

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

            <AnimatedMetrics />
          </div>

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
            .animate-float { animation: float infinite ease-in-out; }
            .animate-float-slow { animation: float-slow infinite ease-in-out; }
            .animate-fade-in { animation: fade-in 0.6s ease-out; }
            .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.2s both; }
            .animate-fade-in-delay-2 { animation: fade-in 1s ease-out 0.4s both; }
            .animate-fade-in-delay-3 { animation: fade-in 1.2s ease-out 0.6s both; }
            .animate-slide-up { animation: slide-up 0.8s ease-out; }
            .animate-scale-in { animation: scale-in 1s ease-out 0.3s both; }
          `}</style>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose McGibs Digital Solutions?
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                We combine technical excellence with business acumen to deliver solutions that drive real results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Fast Time-to-Market", desc: "Agile development process ensures your product launches on schedule." },
                { title: "Modern Tech Stack", desc: "Built with cutting-edge technologies that scale with your business." },
                { title: "Enterprise Security", desc: "Security-first approach with best practices and compliance built-in." },
                { title: "Dedicated Support", desc: "Ongoing maintenance and support to keep your product running smoothly." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <h3 className="font-semibold text-base mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="capabilities" className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Complete Digital Solutions
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                From concept to deployment, we handle every aspect of your digital presence.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Websites & CMS",
                  desc: "Marketing sites, blogs, landing pages, and headless CMS with SEO optimization.",
                  features: ["Responsive Design", "SEO Optimized", "Fast Performance"],
                },
                {
                  title: "Web Applications",
                  desc: "Full-stack web apps with authentication, real-time features, and dashboards.",
                  features: ["User Auth", "Real-time Data", "Scalable"],
                },
                {
                  title: "Mobile Apps",
                  desc: "Native iOS/Android apps with React Native for cross-platform efficiency.",
                  features: ["Cross-platform", "Offline Support", "Push Notifications"],
                },
                {
                  title: "E-commerce Platforms",
                  desc: "Complete online stores with payment integration, inventory, and admin tools.",
                  features: ["Payment Gateway", "Inventory Management", "Order Tracking"],
                },
                {
                  title: "UI/UX Design",
                  desc: "User-centered design with wireframes, prototypes, and design systems.",
                  features: ["User Research", "Prototyping", "Design Systems"],
                },
                {
                  title: "Cloud & DevOps",
                  desc: "CI/CD pipelines, cloud hosting, monitoring, and scalable infrastructure.",
                  features: ["CI/CD", "Cloud Hosting", "Monitoring"],
                },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-xl border border-slate-200 bg-white">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-1.5">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <EnhancedTestimonials />

        {/* Featured Work */}
        <section id="featured-work" className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
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
                },
                {
                  title: "E‑commerce Storefront",
                  desc: "High‑conversion product pages with seamless checkout experience.",
                  img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop",
                  href: "https://portfolio-main-two-bice.vercel.app/",
                  category: "E-commerce",
                },
                {
                  title: "Mobile App UI",
                  desc: "Onboarding, push notifications, and offline-first architecture.",
                  img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600",
                  href: "https://portfolio-main-two-bice.vercel.app/",
                  category: "Mobile App",
                },
              ].map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <OptimizedImage src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/70 text-white text-xs font-medium backdrop-blur-sm">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-semibold text-base mb-1.5 text-slate-900">{p.title}</div>
                    <div className="text-sm text-slate-500 leading-relaxed mb-3">{p.desc}</div>
                    <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm">
                      View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="https://portfolio-main-two-bice.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View Full Portfolio <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Proven Process</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                A structured approach that ensures quality delivery every time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "Deep dive into your goals, audience, and requirements. We create a comprehensive project roadmap.",
                },
                {
                  step: "02",
                  title: "Design",
                  desc: "Wireframes, visual mockups, and interactive prototypes. We iterate until perfection.",
                },
                {
                  step: "03",
                  title: "Development",
                  desc: "Agile sprints with regular demos, QA testing, and code reviews. Clear communication throughout.",
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  desc: "Deployment, monitoring setup, documentation, and ongoing support to ensure success.",
                },
              ].map((s) => (
                <div key={s.step} className="p-6 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold tracking-widest text-emerald-600 mb-3">{s.step}</div>
                  <div className="font-semibold text-lg mb-2 text-slate-900">{s.title}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-end justify-between mb-10 flex-col sm:flex-row gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1.5">Featured Digital Services</h2>
                <p className="text-slate-500">Digital services from KES 1,300 to KES 19,500</p>
              </div>
              <a href="/shop" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
                Browse All <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col hover:border-slate-300 hover:shadow-md transition-all">
                  <a href={`/shop/${p.id}`} className="relative overflow-hidden">
                    <OptimizedImage src={p.imageUrl} alt={p.name} className="w-full h-44 object-cover" />
                  </a>
                  <div className="p-5 flex-1 flex flex-col">
                    <a href={`/shop/${p.id}`} className="font-semibold text-base text-slate-900 hover:text-emerald-600 transition-colors mb-1.5">{p.name}</a>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{p.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xl font-bold text-slate-900">{formatPrice(p.price)}</div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => addItem(p, 1)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                      <a href={`/shop/${p.id}`} className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">View</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built With Modern Technology</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                We use cutting-edge tools and frameworks to build fast, scalable solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {["React", "TypeScript", "Node.js", "Vite", "Tailwind", "React Query", "Radix UI", "IntaSend", "Vercel", "Docker"].map((t) => (
                <div key={t} className="p-4 rounded-lg border border-slate-200 bg-white text-center text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Choose the package that fits your needs. All packages include free consultation and support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Social Media Post",
                  price: 1300,
                  period: "per post",
                  features: ["Professional copy", "Basic design", "1 platform", "1 revision"],
                  highlight: false,
                },
                {
                  name: "SEO Audit (Basic)",
                  price: 2600,
                  period: "one-time",
                  features: ["Site analysis", "Keyword research", "Action plan", "Recommendations"],
                  highlight: true,
                },
                {
                  name: "Website Starter Kit",
                  price: 19500,
                  period: "one-time",
                  features: ["1-2 pages", "Mobile responsive", "SEO setup", "Contact form"],
                  highlight: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`p-8 rounded-xl border flex flex-col ${
                    plan.highlight
                      ? "border-emerald-500 bg-white shadow-md"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {plan.highlight && (
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-4">Most Popular</div>
                  )}
                  <div className="mb-6">
                    <div className="font-semibold text-xl mb-2 text-slate-900">{plan.name}</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-slate-900">{formatPrice(plan.price)}</span>
                      <span className="text-slate-400 text-sm">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Button
                      onClick={() => window.location.href = '/get-started'}
                      className={`w-full ${plan.highlight ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                    >
                      Get Started
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/quote'}
                      variant="outline"
                      className="w-full border-slate-200 text-slate-600 hover:bg-slate-50"
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

        {/* Final CTA */}
        <section className="bg-slate-900 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
              Let's discuss your project and turn your vision into a powerful digital solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => window.location.href = '/get-started'}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={() => window.location.href = '/quote'}
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8"
              >
                Get Free Quote
              </Button>
              <a
                href="/contact"
                className="px-8 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default DigitalHomePage;
