import { useLocation } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const CTASection = () => {
  const location = useLocation();

  const handleGetStarted = () => {
    if (location.pathname === '/course-help' || location.pathname === '/course-help/') {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = '/services';
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: '#060d1b' }}
    >
      {/* Glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(59,130,246,0.12), transparent)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">

          {/* Terminal box */}
          <div
            className="rounded-xl overflow-hidden mb-10"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(13,24,41,0.9)',
            }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-3"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs font-mono text-slate-500">get-started.sh</span>
            </div>

            <div className="p-6 font-mono text-sm space-y-1">
              <div className="text-slate-600"># 3 steps to get your assignment done</div>
              <div className="h-2" />
              <div>
                <span className="text-blue-400">1.</span>
                <span className="text-slate-300 ml-2">Message us your assignment details</span>
              </div>
              <div>
                <span className="text-blue-400">2.</span>
                <span className="text-slate-300 ml-2">Confirm your order and pay securely</span>
              </div>
              <div>
                <span className="text-blue-400">3.</span>
                <span className="text-slate-300 ml-2">Receive your work with Turnitin report</span>
              </div>
              <div className="h-2" />
              <div className="flex items-center gap-1">
                <span className="text-green-400">$ contact us now</span>
                <span
                  className="inline-block w-2 h-[0.85em] bg-green-400 align-middle cursor-blink"
                />
              </div>
            </div>
          </div>

          {/* Headline + CTAs */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to start?</h2>
            <p className="text-slate-400 mb-8">
              Join 500+ students who trust McGibs for academic help.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                View Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/14438697500"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-medium px-7 py-3 rounded-lg border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
