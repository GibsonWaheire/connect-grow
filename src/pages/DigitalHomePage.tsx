import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { Header } from "@/shared/components/Header";
import { Monitor, Smartphone, BarChart3 } from "lucide-react";

const DigitalHomePage = () => {
  const { sendMessage } = useWhatsApp();

  const handleQuote = () => {
    sendMessage("Hi! I'm interested in your digital solutions (web/mobile/apps).");
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-24 pb-16">
          {/* background accents */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-sm">End-to-end Digital Solutions</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                  Build and scale your digital products with confidence
                </h1>
                <p className="text-white/80 text-lg mb-8">
                  We ship production-grade websites, web apps, and mobile apps with modern stacks,
                  robust infrastructure, and clear communication.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button size="lg" onClick={handleQuote}>Get a Quote</Button>
                  <a href="#capabilities" className="text-white/80 hover:text-white underline underline-offset-4">See Capabilities</a>
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
                  <div className="flex flex-wrap items-center gap-6 opacity-80">
                    <div className="text-white/70 text-sm px-3 py-1 rounded border border-white/10">Fintech</div>
                    <div className="text-white/70 text-sm px-3 py-1 rounded border border-white/10">HealthTech</div>
                    <div className="text-white/70 text-sm px-3 py-1 rounded border border-white/10">E‑commerce</div>
                    <div className="text-white/70 text-sm px-3 py-1 rounded border border-white/10">Education</div>
                  </div>
                </div>
              </div>

              {/* Right visual stack */}
              <div className="relative">
                <div className="relative mx-auto max-w-lg">
                  {/* Dashboard card */}
                  <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-5 shadow-2xl">
                    <div className="flex items-center gap-2 text-white/80 mb-4">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-sm">Analytics Dashboard</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/0 ring-1 ring-white/10" />
                      <div className="h-24 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/0 ring-1 ring-white/10" />
                      <div className="h-24 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/0 ring-1 ring-white/10" />
                      <div className="col-span-3 h-10 rounded-lg bg-white/10" />
                    </div>
                  </div>

                  {/* Phone card */}
                  <div className="absolute -right-6 -bottom-10 w-40 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-3 shadow-xl">
                    <div className="flex items-center gap-2 text-white/70 mb-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-xs">Mobile UI</span>
                    </div>
                    <div className="h-48 rounded-xl bg-gradient-to-b from-white/10 to-white/5" />
                  </div>

                  {/* Website card */}
                  <div className="absolute -left-6 -top-8 w-48 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-4 shadow-xl">
                    <div className="flex items-center gap-2 text-white/70 mb-3">
                      <Monitor className="w-4 h-4" />
                      <span className="text-xs">Marketing Site</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 rounded bg-white/15" />
                      <div className="h-3 w-3/4 rounded bg-white/10" />
                      <div className="h-24 rounded-lg bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work */}
        <section className="container mx-auto px-4 py-12">
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
                img: "https://images.unsplash.com/photo-1551281044-8a5d1d112d6b?w=1200",
                href: "https://portfolio-main-two-bice.vercel.app/",
              },
              {
                title: "E‑commerce Storefront",
                desc: "High‑conversion product pages and checkout.",
                img: "https://images.unsplash.com/photo-1515165562835-c3b8c4f0b6a1?w=1200",
                href: "https://portfolio-main-two-bice.vercel.app/",
              },
              {
                title: "Mobile App UI",
                desc: "Onboarding, push notifications, offline-first.",
                img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200",
                href: "https://portfolio-main-two-bice.vercel.app/",
              },
            ].map((p) => (
              <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden border hover:shadow-lg transition">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-gray-600">{p.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="capabilities" className="container mx-auto px-4 py-16 lg:py-20">
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
              <div key={item.title} className="p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Goals, scope, and constraints." },
              { step: "02", title: "Design", desc: "Wireframes, UI kit, prototypes." },
              { step: "03", title: "Build", desc: "Iterative development & QA." },
              { step: "04", title: "Launch", desc: "Deploy, monitor, handover." },
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-xl border bg-white">
                <div className="text-sm text-gray-500 mb-1">{s.step}</div>
                <div className="font-semibold mb-1">{s.title}</div>
                <div className="text-gray-600 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tech we use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center text-gray-700">
            {["React", "TypeScript", "Node.js", "Vite", "Tailwind", "React Query", "Radix", "Stripe/IntaSend", "Vercel", "Docker"].map((t) => (
              <div key={t} className="p-4 rounded-lg border bg-white">{t}</div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What clients say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "They delivered on time with a level of polish that impressed our stakeholders.",
                author: "Operations Lead, Fintech",
              },
              {
                quote: "Communication was clear and the codebase is a pleasure to maintain.",
                author: "CTO, HealthTech Startup",
              },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl border bg-white">
                <p className="text-gray-800">“{t.quote}”</p>
                <div className="mt-3 text-sm text-gray-600">— {t.author}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Have a project in mind?</h3>
              <p className="text-white/80">Share your requirements and we’ll suggest the best path forward.</p>
            </div>
            <Button variant="secondary" onClick={handleQuote}>Talk to us</Button>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default DigitalHomePage;

