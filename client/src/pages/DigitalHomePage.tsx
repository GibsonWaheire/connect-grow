import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
    accent: '#3b82f6',
    label: 'Web Development',
    word: 'Websites',
  },
  {
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80',
    accent: '#6366f1',
    label: 'Full-Stack Apps',
    word: 'Web Apps',
  },
  {
    src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1920&q=80',
    accent: '#06b6d4',
    label: 'Cloud & DevOps',
    word: 'Mobile Apps',
  },
];

const SERVICES = [
  {
    num: '01',
    title: 'Websites & CMS',
    desc: 'Marketing sites, blogs, landing pages, and headless CMS platforms built for speed and SEO.',
    tags: ['Responsive', 'SEO-optimised', 'Fast loading'],
  },
  {
    num: '02',
    title: 'Web Applications',
    desc: 'Full-stack apps with user auth, real-time data, dashboards, and admin panels.',
    tags: ['User auth', 'Real-time data', 'Scalable backend'],
  },
  {
    num: '03',
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS and Android apps with offline support and push notifications.',
    tags: ['React Native', 'Offline support', 'Push notifications'],
  },
  {
    num: '04',
    title: 'E-commerce Platforms',
    desc: 'Complete online stores — product management, M-Pesa payments, and order tracking.',
    tags: ['M-Pesa / Card', 'Inventory mgmt', 'Order tracking'],
  },
  {
    num: '05',
    title: 'UI / UX Design',
    desc: 'Wireframes, prototypes, and full design systems. Clean, conversion-focused interfaces.',
    tags: ['Wireframes', 'Prototypes', 'Design systems'],
  },
  {
    num: '06',
    title: 'Cloud & DevOps',
    desc: 'CI/CD pipelines, cloud hosting, monitoring dashboards, and scalable infrastructure.',
    tags: ['CI/CD', 'Cloud hosting', 'Uptime monitoring'],
  },
];

const PRICING = [
  { name: 'Social Media Post',  desc: 'Copy + design, 1 platform',           price: 'KES 1,300',  unit: 'per post',  hot: false },
  { name: 'Logo Design',        desc: '2 concepts, 2 revisions, PNG + SVG',   price: 'KES 1,950',  unit: 'one-time',  hot: false },
  { name: 'SEO Audit',          desc: 'Site analysis, keywords, action plan', price: 'KES 2,600',  unit: 'one-time',  hot: true  },
  { name: 'Social Media Mgmt',  desc: '12 posts/mo, analytics, 1 platform',   price: 'KES 4,550',  unit: 'per month', hot: false },
  { name: 'Landing Page',       desc: 'Responsive, SEO-ready, contact form',  price: 'KES 6,500',  unit: 'one-time',  hot: false },
  { name: 'Brand Identity Kit', desc: 'Logo, palette, typography, guidelines',price: 'KES 9,750',  unit: 'one-time',  hot: false },
  { name: 'Website Starter',    desc: '1–2 pages, mobile-ready, forms',       price: 'KES 19,500', unit: 'one-time',  hot: true  },
  { name: 'Full Web App',       desc: 'Auth, dashboard, DB, deployment',      price: 'Custom',     unit: 'quote',     hot: false },
];

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'A simple website takes 2–4 weeks, web apps 4–8 weeks, and mobile apps 6–12 weeks. We provide detailed timelines during the discovery phase.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes. We offer maintenance packages, bug fixes, feature updates, and 24/7 support. Many clients work with us long-term for ongoing improvements.',
  },
  {
    q: 'What technologies do you use?',
    a: 'React, TypeScript, Node.js, React Native, Tailwind CSS, and cloud platforms like Vercel. We choose the best tool for each project.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Absolutely. We integrate with in-house teams via Slack, GitHub, and project management tools for smooth collaboration.',
  },
  {
    q: "What's included in your pricing?",
    a: 'Design, development, testing, deployment, documentation, and initial training. Additional scope or revisions are discussed upfront — no surprises.',
  },
  {
    q: 'Do you handle hosting and deployment?',
    a: 'Yes. We set up and manage hosting, CI/CD pipelines, monitoring, and backups on Vercel, AWS, or your preferred cloud provider.',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const DigitalHomePage = () => {
  const [wordVisible, setWordVisible] = useState(true);
  const [slideIdx, setSlideIdx]       = useState(0);
  const [paused, setPaused]           = useState(false);
  const [faqOpen, setFaqOpen]         = useState<number | null>(null);
  const bgRef                         = useRef<HTMLDivElement>(null);

  // Slide auto-advance — word fades in sync with slide
  const advance = useCallback(() => {
    setWordVisible(false);
    setTimeout(() => {
      setSlideIdx(i => (i + 1) % SLIDES.length);
      setWordVisible(true);
    }, 350);
  }, []);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, 5500);
    return () => clearInterval(id);
  }, [paused, advance]);

  // Parallax scroll
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // SEO
  useEffect(() => {
    document.title = 'McGibs Digital Solutions | Web, Mobile & E-commerce';
    const desc = 'McGibs Digital Solutions builds production-grade websites, web apps, mobile apps, and e-commerce with modern stacks and reliable delivery.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, []);

  return (
    <>
      <Header />
      <MainLayout>

        {/* ══ Hero ══════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ backgroundColor: '#060d1b' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Layer 1: Background images — parallax + Ken Burns + crossfade ── */}
          <div
            ref={bgRef}
            className="absolute pointer-events-none will-change-transform"
            style={{ inset: 0, top: '-10%', height: '120%' }}
          >
            {SLIDES.map((s, i) => (
              <div
                key={s.src}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: i === slideIdx ? 1 : 0 }}
              >
                <div
                  className={`absolute inset-0 bg-center bg-cover ${i === slideIdx ? 'animate-kenburns' : ''}`}
                  style={{ backgroundImage: `url(${s.src})` }}
                />
                {/* Per-slide colour tint */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: `radial-gradient(ellipse at 70% 50%, ${s.accent}66 0%, transparent 65%)` }}
                />
              </div>
            ))}
          </div>

          {/* ── Layer 2: Dark overlays ───────────────────────────────────────── */}
          {/* Left dark veil — desktop */}
          <div
            className="absolute inset-0 z-10 hidden lg:block"
            style={{ background: 'linear-gradient(to right, rgba(6,13,27,0.92) 0%, rgba(6,13,27,0.75) 40%, rgba(6,13,27,0.3) 70%, transparent 100%)' }}
          />
          {/* Full veil — mobile */}
          <div className="absolute inset-0 z-10 lg:hidden" style={{ background: 'rgba(6,13,27,0.82)' }} />
          {/* Top fade */}
          <div
            className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #060d1b, transparent)' }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #060d1b)' }}
          />

          {/* ── Layer 3: Content ─────────────────────────────────────────────── */}
          <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
            <div className="max-w-2xl">

              {/* #2 — Slide category label */}
              <div className="inline-flex items-center gap-2 mb-6 text-sm font-medium transition-opacity duration-300" style={{ opacity: wordVisible ? 1 : 0 }}>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: SLIDES[slideIdx].accent }}
                />
                <span className="text-white/60 uppercase tracking-widest text-xs">
                  {SLIDES[slideIdx].label}
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-white mb-6">
                We build
                <span
                  className="block transition-opacity duration-300"
                  style={{ opacity: wordVisible ? 1 : 0, color: SLIDES[slideIdx].accent }}
                >
                  {SLIDES[slideIdx].word}
                </span>
                {/* #3 — stronger "that ship." */}
                <span className="block text-white/70 text-5xl lg:text-6xl mt-1 font-semibold">
                  that ship.
                </span>
              </h1>

              <p className="text-xl leading-relaxed text-white/60 mb-10 max-w-lg">
                Full-stack development for web, mobile, and e-commerce.
                Scalable, production-ready software — delivered on time.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <button
                  onClick={() => window.location.href = '/get-started'}
                  className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors text-base"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="inline-flex items-center gap-2 font-medium px-8 py-4 rounded-xl text-white transition-all text-base"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  Free Quote
                </button>
              </div>

              <div
                className="flex flex-wrap gap-10 pt-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
              >
                {[
                  { v: '50+',  l: 'Projects' },
                  { v: '100+', l: 'Clients' },
                  { v: '5+',   l: 'Years' },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-3xl font-bold text-white">{s.v}</div>
                    <div className="text-sm mt-1 text-white/60 uppercase tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Slide dots ───────────────────────────────────────────────────── */}
          <div className="absolute bottom-8 left-6 sm:left-10 z-30 flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => { setWordVisible(false); setTimeout(() => { setSlideIdx(i); setWordVisible(true); }, 350); }}
                className="rounded-full transition-all duration-400"
                style={{
                  width:  i === slideIdx ? 28 : 8,
                  height: 8,
                  background: i === slideIdx ? SLIDES[slideIdx].accent : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>

          {/* #4 — Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none">
            <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
          </div>
        </section>

        {/* ══ Services ══════════════════════════════════════════════════════ */}
        <section id="capabilities" className="py-24" style={{ backgroundColor: '#080f20' }}>
          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">

            <div className="mb-14">
              <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">
                what we build
              </p>
              <h2 className="text-3xl font-bold text-white">
                Full-stack, from design to deployment.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map(item => (
                <div
                  key={item.num}
                  className="rounded-xl p-6 transition-all"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onMouseOver={e =>
                    (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)')
                  }
                  onMouseOut={e =>
                    (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')
                  }
                >
                  <div className="text-xs font-mono text-slate-600 mb-3">{item.num}</div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded font-mono"
                        style={{ background: 'rgba(59,130,246,0.08)', color: '#60a5fa' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all services <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ══ Pricing ═══════════════════════════════════════════════════════ */}
        <section id="pricing" className="py-24" style={{ backgroundColor: '#060d1b' }}>
          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">

            <div className="mb-12">
              <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">
                pricing
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <h2 className="text-3xl font-bold text-white">
                  Transparent rates. No surprises.
                </h2>
                <span className="text-sm text-slate-500">All prices in KES unless noted</span>
              </div>
            </div>

            {/* Contained pricing table */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Column headers */}
              <div
                className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-mono uppercase tracking-widest text-slate-600"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="col-span-4">Service</div>
                <div className="col-span-4">What's included</div>
                <div className="col-span-2 text-right">Starting at</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Rows */}
              {PRICING.map((row, i) => (
                <div
                  key={row.name}
                  className="relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 items-center transition-colors"
                  style={{
                    borderBottom:
                      i < PRICING.length - 1
                        ? '1px solid rgba(255,255,255,0.04)'
                        : undefined,
                    background: row.hot
                      ? 'rgba(59,130,246,0.06)'
                      : 'transparent',
                  }}
                  onMouseOver={e =>
                    !row.hot && (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')
                  }
                  onMouseOut={e =>
                    !row.hot && (e.currentTarget.style.background = 'transparent')
                  }
                >
                  {/* Blue left accent on popular rows */}
                  {row.hot && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-sm"
                      style={{ background: '#3b82f6' }}
                    />
                  )}

                  {/* Service name + badge */}
                  <div className="md:col-span-4 flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{row.name}</span>
                    {row.hot && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0"
                        style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-4 text-sm text-slate-500">{row.desc}</div>

                  {/* Price */}
                  <div className="md:col-span-2 md:text-right">
                    <span className="font-mono font-bold text-white">{row.price}</span>
                    <span className="text-xs text-slate-600 ml-1.5 md:block md:ml-0">{row.unit}</span>
                  </div>

                  {/* Button */}
                  <div className="md:col-span-2 md:text-right">
                    <a
                      href="/get-started"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={
                        row.hot
                          ? { background: '#3b82f6', color: '#fff' }
                          : {
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#94a3b8',
                              background: 'rgba(255,255,255,0.04)',
                            }
                      }
                      onMouseOver={e => {
                        if (row.hot) e.currentTarget.style.background = '#2563eb';
                        else {
                          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                          e.currentTarget.style.color = '#60a5fa';
                        }
                      }}
                      onMouseOut={e => {
                        if (row.hot) e.currentTarget.style.background = '#3b82f6';
                        else {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = '#94a3b8';
                        }
                      }}
                    >
                      Order
                    </a>
                  </div>
                </div>
              ))}

              {/* Footer row */}
              <div
                className="px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-sm text-slate-500">
                  Need something custom? We scope and quote for free.
                </p>
                <a
                  href="/quote"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0"
                >
                  Get a free quote <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-24" style={{ backgroundColor: '#080f20' }}>
          <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left label */}
              <div className="lg:col-span-1">
                <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">faq</p>
                <h2 className="text-3xl font-bold text-white mb-2">Questions</h2>
                <p className="text-sm text-slate-500">
                  Common things clients ask before getting started.
                </p>
                <a
                  href="/faq"
                  className="inline-block mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  See all FAQs →
                </a>
              </div>

              {/* Q&A */}
              <div className="lg:col-span-2">
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      className="w-full py-5 text-left flex items-start justify-between gap-4"
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      <span className="font-medium text-sm text-white leading-snug">{faq.q}</span>
                      <span
                        className="text-xl leading-none shrink-0 mt-0.5 transition-colors"
                        style={{ color: faqOpen === i ? '#3b82f6' : '#475569' }}
                      >
                        {faqOpen === i ? '−' : '+'}
                      </span>
                    </button>
                    {faqOpen === i && (
                      <p className="pb-5 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ Final CTA ═════════════════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#060d1b' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(59,130,246,0.12), transparent)',
            }}
          />
          <div className="relative z-10 w-full px-6 sm:px-10 max-w-3xl mx-auto text-center">
            <p className="text-xs font-mono uppercase tracking-widest mb-4 text-blue-400">
              get started
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to build something?
            </h3>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">
              Let's talk about your project. First call is free — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.href = '/get-started'}
                className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.location.href = '/quote'}
                className="inline-flex items-center gap-2 font-medium px-7 py-3 rounded-lg border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
              >
                Free Quote
              </button>
              <a
                href="/contact"
                className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-white transition-colors"
              >
                Contact →
              </a>
            </div>
          </div>
        </section>

      </MainLayout>
    </>
  );
};

export default DigitalHomePage;
