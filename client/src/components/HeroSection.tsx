import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

const terminalLines = [
  { type: 'cmd',     text: '$ place-order --subject="Python Programming"' },
  { type: 'cmd',     text: '  --pages=5 --deadline="24h" --level="BSc"' },
  { type: 'blank',   text: '' },
  { type: 'info',    text: 'Matching you with an expert writer...' },
  { type: 'success', text: '✓  Expert assigned in under 2 minutes' },
  { type: 'success', text: '✓  Draft submitted — ready for review' },
  { type: 'success', text: '✓  Turnitin scan: 0% similarity' },
  { type: 'success', text: '✓  Delivered on time' },
  { type: 'blank',   text: '' },
  { type: 'result',  text: '> Assignment complete. Grade: A+' },
];

const lineDelays = [0, 380, 700, 1150, 1850, 2650, 3450, 4150, 4800, 5500];

const stats = [
  { value: '500+', label: 'Students' },
  { value: 'A+',   label: 'Avg grade' },
  { value: '24h',  label: 'Turnaround' },
  { value: '0%',   label: 'AI content' },
];

export const HeroSection = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handles: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setVisible([]);
      lineDelays.forEach((delay, i) => {
        handles.push(setTimeout(() => setVisible(p => [...p, i]), delay));
      });
      handles.push(setTimeout(run, 9000));
    };

    handles.push(setTimeout(run, 600));
    return () => handles.forEach(clearTimeout);
  }, []);

  const handleGetStarted = () => {
    if (location.pathname === '/course-help' || location.pathname === '/course-help/') {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/services');
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#060d1b' }}
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 — blue, top-left */}
        <div
          className="aurora-blob-1 absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            top: '-200px',
            left: '-150px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        {/* Blob 2 — indigo, top-right */}
        <div
          className="aurora-blob-2 absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '-100px',
            right: '-100px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Blob 3 — cyan, bottom-center */}
        <div
          className="aurora-blob-3 absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            bottom: '-100px',
            left: '35%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* Dot grid — sits on top of blobs */}
      <div className="absolute inset-0 bg-dot-grid" />

      <div className="relative z-10 container mx-auto px-4 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="space-y-8">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300">Taking orders now</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] text-slate-100">
                Academic work,<br />
                <span className="text-blue-400">done right.</span>
              </h1>
              <p className="text-lg leading-relaxed max-w-md text-slate-400">
                Essays, programming assignments, research papers, presentations,
                and exam help. Human-written. Turnitin reports included. Delivered fast.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                View Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/14438697500"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-lg border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp
              </a>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {stats.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs mt-0.5 text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — Terminal ──────────────────────────────────── */}
          <div className="relative">
            <div
              className="rounded-xl overflow-hidden border border-white/[0.08] bg-slate-900"
              style={{ boxShadow: '0 0 60px rgba(59,130,246,0.08)' }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-1.5 px-4 py-3"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(0,0,0,0.25)',
                }}
              >
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-4 text-xs font-mono text-slate-500">
                  mcgibs — order terminal
                </span>
              </div>

              {/* Body */}
              <div className="p-5 font-mono text-sm min-h-[300px]">
                {terminalLines.map((line, i) => {
                  if (!visible.includes(i)) return null;
                  if (line.type === 'blank') return <div key={i} className="h-3" />;

                  const cls =
                    line.type === 'cmd'     ? 'text-slate-300' :
                    line.type === 'success' ? 'text-green-400'  :
                    line.type === 'info'    ? 'text-slate-500'  :
                    line.type === 'result'  ? 'text-blue-400'   :
                                              'text-slate-400';

                  const isLast = i === terminalLines.length - 1;

                  return (
                    <div key={i} className={cls} style={{ lineHeight: '1.8' }}>
                      {line.text}
                      {isLast && (
                        <span
                          className="inline-block w-2 h-[0.85em] bg-blue-400 align-middle ml-1 cursor-blink"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ambient glow behind terminal */}
            <div className="absolute -inset-6 -z-10 rounded-2xl blur-3xl bg-blue-500/[0.06]" />
          </div>

        </div>
      </div>
    </section>
  );
};
