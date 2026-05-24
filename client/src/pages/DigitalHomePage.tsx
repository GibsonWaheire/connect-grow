import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Header } from "@/shared/components/Header";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FAQSection } from "@/components/DigitalPageSections";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&h=900&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop",
];

const CYCLING_WORDS = ["Websites", "Mobile Apps", "E-commerce", "Digital Products"];

const SERVICES = [
  {
    num: "01",
    title: "Websites & CMS",
    desc: "Marketing sites, blogs, landing pages, and headless CMS platforms built for speed and SEO.",
    tags: ["Responsive Design", "SEO Optimised", "Fast Loading"],
  },
  {
    num: "02",
    title: "Web Applications",
    desc: "Full-stack apps with user authentication, real-time data, dashboards, and admin panels.",
    tags: ["User Auth", "Real-time Data", "Scalable Backend"],
  },
  {
    num: "03",
    title: "Mobile Apps",
    desc: "Cross-platform iOS and Android apps with offline support and push notifications.",
    tags: ["React Native", "Offline Support", "Push Notifications"],
  },
  {
    num: "04",
    title: "E-commerce Platforms",
    desc: "Complete online stores — product management, M-Pesa payments, order tracking, and admin tools.",
    tags: ["M-Pesa / Card", "Inventory Management", "Order Tracking"],
  },
  {
    num: "05",
    title: "UI/UX Design",
    desc: "Wireframes, prototypes, and full design systems. Clean, user-centred interfaces that convert.",
    tags: ["Wireframes", "Prototypes", "Design Systems"],
  },
  {
    num: "06",
    title: "Cloud & DevOps",
    desc: "CI/CD pipelines, cloud hosting, monitoring dashboards, and scalable infrastructure.",
    tags: ["CI/CD Pipelines", "Cloud Hosting", "Uptime Monitoring"],
  },
];

const DigitalHomePage = () => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [wordIdx, setWordIdx]     = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // Crossfade every 5 s
  useEffect(() => {
    const t = setInterval(() => {
      setHeroSlide(s => (s + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Cycle headline word every 3 s with fade
  useEffect(() => {
    const t = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(t);
  }, []);

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
      <MainLayout>
        {/* ── Hero — split layout, crossfade right panel ── */}
        <section className="flex pt-[88px]" style={{ minHeight: '480px', maxHeight: '600px', height: '55vh' }}>

          {/* Left — text panel */}
          <div className="bg-slate-900 text-white flex items-center w-full lg:w-1/2 px-8 sm:px-12 py-10 overflow-hidden">
            <div className="max-w-lg">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
                McGibs Digital Solutions
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                We Build
                <span
                  className="block text-emerald-400 transition-opacity duration-300"
                  style={{ opacity: wordVisible ? 1 : 0 }}
                >
                  {CYCLING_WORDS[wordIdx]}
                </span>
                <span className="block text-white text-3xl sm:text-4xl mt-1">That Drive Results</span>
              </h1>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Full-stack development for web, mobile and e-commerce. Scalable, production-ready software — delivered on time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/get-started'}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                >
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/quote'}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Free Quote
                </Button>
              </div>
              <div className="flex gap-10 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-400">50+</div>
                  <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100+</div>
                  <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">Years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — crossfading image panel */}
          <div className="relative hidden lg:block lg:w-1/2 overflow-hidden">
            {HERO_IMAGES.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${src})`,
                  opacity: heroSlide === i ? 1 : 0,
                  transition: 'opacity 1.2s ease-in-out',
                }}
              />
            ))}
            {/* subtle dark overlay so image doesn't clash */}
            <div className="absolute inset-0 bg-slate-900/20" />
            {/* slide indicator dots */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: heroSlide === i ? '#10b981' : 'rgba(255,255,255,0.4)' }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Services — full-width alternating bands ── */}
        <section id="capabilities">
          <div className="bg-white py-10 border-b border-slate-100">
            <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">What We Build</h2>
              <p className="text-slate-500">Full-stack development from concept to launch.</p>
            </div>
          </div>

          {SERVICES.map((item, i) => (
            <div key={item.num} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <div className="container mx-auto px-4 sm:px-8 max-w-6xl py-12">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                  {/* Large number */}
                  <div
                    className="text-[100px] font-black leading-none select-none shrink-0 hidden lg:block"
                    style={{ color: i % 2 === 0 ? '#f1f5f9' : '#e2e8f0', width: '140px' }}
                  >
                    {item.num}
                  </div>

                  {/* Title + desc */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-slate-400 lg:hidden">{item.num}</span>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-slate-500 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>

                  {/* Tags + link */}
                  <div className="lg:w-64 shrink-0">
                    <div className="flex flex-wrap gap-y-2 gap-x-3 mb-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-sm text-slate-600">
                          — {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="/services"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Pricing — rate card table ── */}
        <section id="pricing" className="bg-slate-50 py-14">
          <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">Pricing</h2>
              <p className="text-slate-500">Transparent rates. No hidden fees. All packages include free consultation.</p>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-400">
              <div className="col-span-5">Service</div>
              <div className="col-span-3">Includes</div>
              <div className="col-span-2 text-right">From</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {[
              { name: "Social Media Post",      desc: "Copy + basic design, 1 platform",        price: "KES 1,300",  unit: "per post",  hot: false },
              { name: "Logo Design",            desc: "2 concepts, 2 revisions, PNG + SVG",      price: "KES 1,950",  unit: "one-time",  hot: false },
              { name: "SEO Audit",              desc: "Site analysis, keywords, action plan",    price: "KES 2,600",  unit: "one-time",  hot: true  },
              { name: "Social Media Mgmt",      desc: "12 posts/mo, analytics, 1 platform",      price: "KES 4,550",  unit: "per month", hot: false },
              { name: "Landing Page",           desc: "Responsive, SEO, contact form",           price: "KES 6,500",  unit: "one-time",  hot: false },
              { name: "Brand Identity Kit",     desc: "Logo, palette, typography, guidelines",   price: "KES 9,750",  unit: "one-time",  hot: false },
              { name: "Website Starter",        desc: "1–2 pages, mobile-ready, contact form",   price: "KES 19,500", unit: "one-time",  hot: true  },
              { name: "Full Web App",           desc: "Auth, dashboard, DB, deployment",         price: "Custom",     unit: "quote",     hot: false },
            ].map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-12 gap-4 py-4 border-b border-slate-100 items-center ${row.hot ? 'bg-emerald-50/50' : ''}`}
              >
                <div className="col-span-5 flex items-center gap-2">
                  <span className="font-semibold text-slate-900 text-sm">{row.name}</span>
                  {row.hot && <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded uppercase">Popular</span>}
                </div>
                <div className="col-span-3 text-xs text-slate-500">{row.desc}</div>
                <div className="col-span-2 text-right">
                  <span className="font-bold text-slate-900 text-sm">{row.price}</span>
                  <span className="text-xs text-slate-400 block">{row.unit}</span>
                </div>
                <div className="col-span-2 text-right">
                  <a
                    href="/get-started"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Order →
                  </a>
                </div>
              </div>
            ))}

            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="text-sm text-slate-400">Need something custom? We quote based on scope.</p>
              <a
                href="/quote"
                className="text-sm font-semibold text-slate-900 border-b border-slate-900 hover:text-emerald-600 hover:border-emerald-600 transition-colors pb-0.5"
              >
                Get a free quote
              </a>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* Final CTA */}
        <section className="bg-slate-900 py-14">
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
