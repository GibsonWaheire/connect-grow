import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { Header } from "@/shared/components/Header";
import { Monitor, Smartphone, BarChart3 } from "lucide-react";
import { useEffect } from "react";
import { products } from "@/data/products";
import { useCart } from "@/shared/contexts/CartContext";
import { CheckCircle2 } from "lucide-react";
import { AnimatedMetrics, FAQSection, CaseStudiesSection, EnhancedTestimonials } from "@/components/DigitalPageSections";

const DigitalHomePage = () => {
  const { sendMessage } = useWhatsApp();
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

  const handleQuote = () => {
    sendMessage("Hi! I'm interested in your digital solutions (web/mobile/apps).");
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-20">
          {/* background accents */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-5 ring-1 ring-white/20">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm">End-to-end Digital Solutions</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-white">
                  Design, build and scale your
                  <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> web & mobile products</span>
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-xl">
                  McGibs Digital Solutions ships production-grade websites, apps and commerce with modern stacks,
                  reliable infrastructure and clear communication.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button size="lg" onClick={handleQuote} className="bg-emerald-500 hover:bg-emerald-600 text-white">Get a Quote</Button>
                  <a href="#capabilities" className="text-white/80 hover:text-white underline underline-offset-4 flex items-center">See Capabilities</a>
                  <a
                    href="https://portfolio-main-two-bice.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white underline underline-offset-4"
                  >
                    View Portfolio
                  </a>
                </div>

                {/* Trusted by */}
                <div className="mt-10">
                  <div className="text-white/60 text-sm mb-3">Trusted by teams building for growth</div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-white/80 text-sm px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">Fintech</div>
                    <div className="text-white/80 text-sm px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">HealthTech</div>
                    <div className="text-white/80 text-sm px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">E‑commerce</div>
                    <div className="text-white/80 text-sm px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">Education</div>
                  </div>
                </div>
              </div>

              {/* Right visual stack */}
              <div className="relative">
                <div className="relative mx-auto max-w-lg">
                  {/* Dashboard card */}
                  <div className="relative rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-5 shadow-2xl">
                    <div className="flex items-center gap-2 text-white mb-4">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-sm">Analytics Dashboard</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-400/30 to-emerald-500/20 ring-1 ring-emerald-400/30" />
                      <div className="h-24 rounded-lg bg-gradient-to-br from-cyan-400/30 to-cyan-500/20 ring-1 ring-cyan-400/30" />
                      <div className="h-24 rounded-lg bg-gradient-to-br from-indigo-400/30 to-indigo-500/20 ring-1 ring-indigo-400/30" />
                      <div className="col-span-3 h-10 rounded-lg bg-white/10" />
                    </div>
                  </div>

                  {/* Phone card */}
                  <div className="absolute -right-6 -bottom-10 w-40 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-3 shadow-xl">
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-xs">Mobile UI</span>
                    </div>
                    <div className="h-48 rounded-xl bg-gradient-to-b from-white/20 to-white/10" />
                  </div>

                  {/* Website card */}
                  <div className="absolute -left-6 -top-8 w-48 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-4 shadow-xl">
                    <div className="flex items-center gap-2 text-white/80 mb-3">
                      <Monitor className="w-4 h-4" />
                      <span className="text-xs">Marketing Site</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 rounded bg-white/20" />
                      <div className="h-3 w-3/4 rounded bg-white/10" />
                      <div className="h-24 rounded-lg bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AnimatedMetrics />
          </div>
        </section>

        {/* Featured Work */}
        <section id="featured-work" className="container mx-auto px-4 py-12 bg-slate-100 text-slate-900">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Work</h2>
            <a
              href="https://portfolio-main-two-bice.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View full portfolio
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "SaaS Dashboard",
                desc: "Analytics, billing, and role-based access.",
                img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600",
                href: "https://portfolio-main-two-bice.vercel.app/",
              },
              {
                title: "E‑commerce Storefront",
                desc: "High‑conversion product pages and checkout.",
                img: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1600",
                href: "https://portfolio-main-two-bice.vercel.app/",
              },
              {
                title: "Mobile App UI",
                desc: "Onboarding, push notifications, offline-first.",
                img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600",
                href: "https://portfolio-main-two-bice.vercel.app/",
              },
            ].map((p) => (
              <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-600">{p.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="capabilities" className="container mx-auto px-4 py-16 lg:py-20 bg-white text-slate-900">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What we do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Websites & CMS", desc: "Marketing sites, blogs, landing pages, and headless CMS." },
              { title: "Web Apps", desc: "Dashboards, portals, and internal tools with modern stacks." },
              { title: "Mobile Apps", desc: "iOS/Android apps with React Native or native integrations." },
              { title: "E-commerce", desc: "Shops, payments, catalogs, and inventory flows." },
              { title: "UI/UX Design", desc: "Wireframes, prototypes, and design systems." },
              { title: "Cloud & DevOps", desc: "CI/CD, hosting, monitoring, and scalability." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-slate-200 shadow-sm bg-white">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-16 bg-slate-100 text-slate-900">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <a href="/shop" className="text-primary hover:underline">Browse all</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col">
                <a href={`/shop/${p.id}`}><OptimizedImage src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" /></a>
                <div className="p-5 flex-1 flex flex-col">
                  <a href={`/shop/${p.id}`} className="font-semibold hover:underline">{p.name}</a>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-3 font-semibold">${p.price.toFixed(2)}</div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <Button size="sm" onClick={() => addItem(p, 1)} className="flex-1">Add to Cart</Button>
                    <a href={`/shop/${p.id}`} className="inline-flex items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50">Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="container mx-auto px-4 py-12 bg-white text-slate-900">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Goals, scope, and constraints." },
              { step: "02", title: "Design", desc: "Wireframes, UI kit, prototypes." },
              { step: "03", title: "Build", desc: "Iterative development & QA." },
              { step: "04", title: "Launch", desc: "Deploy, monitor, handover." },
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-xl border border-slate-200 bg-white">
                <div className="text-sm text-slate-500 mb-1">{s.step}</div>
                <div className="font-semibold mb-1">{s.title}</div>
                <div className="text-slate-600 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="container mx-auto px-4 py-12 bg-slate-100 text-slate-900">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tech we use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            {["React", "TypeScript", "Node.js", "Vite", "Tailwind", "React Query", "Radix", "IntaSend", "Vercel", "Docker"].map((t) => (
              <div key={t} className="p-4 rounded-lg border border-slate-200 bg-white">{t}</div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 py-16 bg-white text-slate-900">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Simple, transparent pricing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Website Starter",
                price: "$499",
                features: ["1 landing page", "SEO setup", "Analytics", "1 revision"],
                highlight: false,
              },
              {
                name: "App Pro",
                price: "$1,999",
                features: ["Web app or mobile app", "Auth & dashboard", "Payments", "2 revisions"],
                highlight: true,
              },
              {
                name: "Commerce Plus",
                price: "$1,499",
                features: ["Product catalog", "Checkout (IntaSend)", "Admin tools", "2 revisions"],
                highlight: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`p-6 rounded-2xl border ${plan.highlight ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-baseline justify-between mb-4">
                  <div className="font-semibold">{plan.name}</div>
                  <div className="text-2xl font-bold">{plan.price}</div>
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span className="text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button onClick={handleQuote} className="w-full">Get started</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CaseStudiesSection />
        <EnhancedTestimonials />
        <FAQSection />

        <section className="container mx-auto px-4 pb-20">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 ring-1 ring-emerald-100 text-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Have a project in mind?</h3>
              <p className="text-slate-700">Share your requirements and we’ll suggest the best path forward.</p>
            </div>
            <Button onClick={handleQuote}>Talk to us</Button>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default DigitalHomePage;

