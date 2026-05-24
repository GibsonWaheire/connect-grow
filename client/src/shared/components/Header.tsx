import { useState, useRef, useEffect } from 'react';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { ChevronDown, Menu, X, Phone, MapPin, Mail, Clock, Truck } from 'lucide-react';

// ── Ticker items ──────────────────────────────────────────────────────────────
const tickerItems = [
  { icon: Phone,   text: 'Call / WhatsApp: +254 726 899 113' },
  { icon: MapPin,  text: 'Nairobi, Kenya' },
  { icon: Mail,    text: 'help@mcgibsdigitalsolutions.com' },
  { icon: Clock,   text: 'Mon – Sat: 8 AM – 8 PM' },
  { icon: Truck,   text: 'Free delivery in Nairobi on orders above KES 5,000' },
  { icon: Phone,   text: 'Phones · Laptops · Speakers · MikroTik Routers — Shop Now' },
  { icon: Clock,   text: 'Same-day delivery available in Nairobi CBD' },
  { icon: Truck,   text: 'M-Pesa accepted — pay on delivery available' },
  { icon: MapPin,  text: 'We deliver to Westlands, Kasarani, Kiambu, Thika & beyond' },
  { icon: Phone,   text: 'WhatsApp us for instant quotes & availability' },
  { icon: Mail,    text: 'Web design · Mobile apps · E-commerce · Branding' },
  { icon: Clock,   text: 'Fast turnaround — most orders ready within 24 hrs' },
  { icon: Truck,   text: 'Samsung · Apple · HP · Lenovo · Dell · JBL · Sony · MikroTik' },
  { icon: Phone,   text: 'Student discounts available — ask us on WhatsApp' },
  { icon: MapPin,  text: 'Serving clients across Kenya and East Africa' },
  { icon: Mail,    text: 'Custom software development — request a free quote today' },
  { icon: Clock,   text: 'All electronics come with warranty — genuine products only' },
  { icon: Truck,   text: 'MikroTik installation & configuration support included' },
  { icon: Phone,   text: 'Bulk orders welcome — call +254 726 899 113 for pricing' },
  { icon: MapPin,  text: 'Online orders shipped nationwide via courier' },
];

// Duplicate for seamless loop
const allTicker = [...tickerItems, ...tickerItems];

// ── Main nav (slim) ───────────────────────────────────────────────────────────
const mainNav = [
  { label: 'Services', href: '/services' },
  { label: 'Shop',     href: '/shop' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
];

// ── "More" hamburger menu ─────────────────────────────────────────────────────
const moreItems = [
  { label: 'About Us',      href: '/about' },
  { label: 'Pricing',       href: '/pricing' },
  { label: 'Get a Quote',   href: '/quote' },
  { label: 'Get Started',   href: '/get-started' },
  { label: 'Course Help',   href: '/course-help' },
  { label: 'Portfolio',     href: 'https://portfolio-main-two-bice.vercel.app/', external: true },
  { label: 'Case Studies',  href: '/case-studies' },
  { label: 'Our Process',   href: '/process' },
  { label: 'Tech Stack',    href: '/tech-stack' },
  { label: 'Testimonials',  href: '/testimonials' },
  { label: 'FAQ',           href: '/faq' },
];

export const Header = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useWhatsApp();

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* ── Ticker bar ────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white overflow-hidden h-8 flex items-center">
        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: 'tickerScroll 80s linear infinite' }}
        >
          {allTicker.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 mr-12 text-xs">
              <item.icon className="w-3 h-3 text-emerald-400 shrink-0" />
              {item.text}
              <span className="ml-12 text-slate-600">|</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes tickerScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── Main header ───────────────────────────────────────────────────── */}
      <header className="fixed top-8 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-bold text-slate-900 text-base">McGibs</span>
              <span className="font-bold text-emerald-600 text-base hidden sm:inline">Digital</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {mainNav.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(v => !v)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                    {moreItems.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-slate-700"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {mainNav.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <p className="text-xs text-slate-400 px-3 mb-2 uppercase tracking-wider">More</p>
                {moreItems.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 px-3 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors block"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
