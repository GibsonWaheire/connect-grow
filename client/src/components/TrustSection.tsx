import { useState } from 'react';
import { Shield, CheckCircle2, Clock, Zap, Download, FileText } from 'lucide-react';

// ── Why us data ───────────────────────────────────────────────────────────────

const features = [
  {
    icon: Shield,
    title: '100% Human-Written',
    desc: 'No AI. Every word is researched and written by a real expert — not generated.',
    accent: '#3b82f6',
  },
  {
    icon: CheckCircle2,
    title: 'Turnitin Reports',
    desc: 'Every order ships with a full plagiarism report attached. Always 0% similarity.',
    accent: '#22c55e',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    desc: 'Standard 3–5 days. Rush and express options available for tight deadlines.',
    accent: '#a78bfa',
  },
  {
    icon: Zap,
    title: '24/7 Support',
    desc: 'Reach us on WhatsApp any time. We reply fast and keep you updated throughout.',
    accent: '#f59e0b',
  },
];

const technicalSubjects = [
  'Python', 'Java', 'C++', 'Data Analysis',
  'Statistics', 'Mathematics', 'Engineering', 'Machine Learning',
];

const nonTechnicalSubjects = [
  'English Lit', 'History', 'Philosophy', 'Psychology',
  'Sociology', 'Business', 'Marketing', 'Economics',
];

const deliveryOptions = [
  { label: 'Standard', time: '3 – 5 days',  rate: 'Base price' },
  { label: 'Urgent',   time: '24 – 48 h',   rate: '1.5×' },
  { label: 'Express',  time: '12 – 24 h',   rate: '2×' },
];

const statsGrid = [
  { value: '500+', label: 'Students helped' },
  { value: 'A+',   label: 'Average grade' },
  { value: '98%',  label: 'On-time delivery' },
  { value: '0%',   label: 'AI content' },
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface TrustSectionProps {
  onSubjectClick?: (serviceId: string, subject: string) => void;
}

// ── TrustSection ──────────────────────────────────────────────────────────────

export const TrustSection = ({ onSubjectClick }: TrustSectionProps) => {
  const [tab, setTab] = useState<'technical' | 'nonTechnical'>('technical');

  const handleSubject = (name: string) => {
    const serviceId = tab === 'technical' ? 'technical' : 'non-technical';
    onSubjectClick?.(serviceId, name);
  };

  const subjects = tab === 'technical' ? technicalSubjects : nonTechnicalSubjects;

  return (
    <section className="py-24" style={{ backgroundColor: '#080f20' }}>
      <div className="container mx-auto px-4">

        {/* Section label */}
        <div className="mb-14">
          <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">
            why mcgibs
          </p>
          <h2 className="text-3xl font-bold text-white">
            Built for students who need results.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Left — Features + Delivery table ── */}
          <div className="space-y-3">
            {features.map(f => (
              <div
                key={f.title}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div
                  className="p-2 rounded-lg shrink-0 mt-0.5"
                  style={{ background: `${f.accent}18` }}
                >
                  <f.icon className="w-4 h-4" style={{ color: f.accent }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}

            {/* Delivery table */}
            <div
              className="rounded-xl overflow-hidden mt-2"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="px-5 py-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  delivery options
                </span>
              </div>
              {deliveryOptions.map((opt, i) => (
                <div
                  key={opt.label}
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                  }}
                >
                  <span className="text-sm font-medium text-white">{opt.label}</span>
                  <span className="text-sm text-slate-500">{opt.time}</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}
                  >
                    {opt.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Subjects + Stats ── */}
          <div className="space-y-4">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {/* Tab header */}
              <div
                className="p-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h3 className="font-semibold text-white mb-4 text-sm">Subjects we cover</h3>
                <div className="flex gap-2">
                  {(['technical', 'nonTechnical'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
                      style={
                        tab === t
                          ? { background: '#3b82f6', color: '#fff' }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              color: '#94a3b8',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }
                      }
                    >
                      {t === 'technical' ? 'Technical' : 'Non-Technical'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject grid */}
              <div className="p-5 grid grid-cols-2 gap-2">
                {subjects.map(name => (
                  <button
                    key={name}
                    onClick={() => handleSubject(name)}
                    className="text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-slate-300 hover:text-blue-400"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    onMouseOver={e =>
                      (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)')
                    }
                    onMouseOut={e =>
                      (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')
                    }
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {statsGrid.map(s => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl text-center"
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs mt-1 text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ── Samples ───────────────────────────────────────────────────────────────────

const samples = [
  {
    name: 'Research Paper — Psychology',
    subject: 'Psychology',
    type: 'Research Paper',
    download: 'https://drive.google.com/uc?export=download&id=1POlzd7atqCJQq9B32fi57NhT3HFrzk7e',
    desc: 'A+ quality paper on cognitive psychology with proper citations.',
  },
  {
    name: 'Python Code Analysis',
    subject: 'Python',
    type: 'Programming',
    download: 'https://drive.google.com/uc?export=download&id=1FbD35TWHxrNBYww5siXK23vDS3Cuc1gx',
    desc: 'Clean, documented Python assignment with line-by-line explanations.',
  },
  {
    name: 'Business Case Study',
    subject: 'Business',
    type: 'Case Study',
    download: 'https://drive.google.com/uc?export=download&id=11yuP8eMYWkwHXsIg_nkDxaY2VfOhf-8P',
    desc: 'Comprehensive business analysis backed by real market data.',
  },
  {
    name: 'Literature Review',
    subject: 'English',
    type: 'Lit Review',
    download: 'https://drive.google.com/uc?export=download&id=1kIrygLick8hSlbzfSLCvaLic2LMkxIUq',
    desc: 'Academic literature review with proper formatting and citations.',
  },
  {
    name: 'Statistics Report',
    subject: 'Statistics',
    type: 'Report',
    download: 'https://drive.google.com/uc?export=download&id=1mPcVy15xUwXqO5lDQg1EQQtY2QQ-eHe2',
    desc: 'Statistical analysis with clear explanations and visualisations.',
  },
  {
    name: 'Marketing Presentation',
    subject: 'Marketing',
    type: 'PPT',
    download: 'https://drive.google.com/uc?export=download&id=1FaqfrfEcELZrHUbpOFRCuThJK_UOCb08',
    desc: 'Professional slide deck with speaker notes included.',
  },
];

export const SamplesSection = () => {
  return (
    <section className="py-24" style={{ backgroundColor: '#060d1b' }}>
      <div className="container mx-auto px-4">

        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">
            sample work
          </p>
          <h2 className="text-3xl font-bold text-white">
            See the quality before you order.
          </h2>
          <p className="mt-2 text-slate-400">
            Real work, real grades. Download any sample free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {samples.map((s, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl p-5 transition-all group"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseOver={e =>
                (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)')
              }
              onMouseOut={e =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')
              }
            >
              {/* Tags */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="p-1.5 rounded"
                  style={{ background: 'rgba(59,130,246,0.12)' }}
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: '#94a3b8',
                  }}
                >
                  {s.type}
                </span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    color: '#4ade80',
                  }}
                >
                  {s.subject}
                </span>
              </div>

              <h3 className="font-semibold text-white mb-1 text-sm">{s.name}</h3>
              <p className="text-sm text-slate-500 flex-1 mb-5 leading-relaxed">{s.desc}</p>

              <button
                onClick={() => window.open(s.download, '_blank')}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all text-slate-300 hover:text-blue-400"
                style={{
                  border: '1px solid rgba(255,255,255,0.09)',
                  background: 'rgba(255,255,255,0.03)',
                }}
                onMouseOver={e =>
                  (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)')
                }
                onMouseOut={e =>
                  (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')
                }
              >
                <Download className="w-3.5 h-3.5" />
                Download Sample
              </button>
            </div>
          ))}
        </div>

        {/* Quality bar */}
        <div
          className="mt-8 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            border: '1px solid rgba(34,197,94,0.15)',
            background: 'rgba(34,197,94,0.04)',
          }}
        >
          <div>
            <p className="font-semibold text-white text-sm">Quality you can verify</p>
            <p className="text-sm mt-0.5 text-slate-500">
              Every order ships with a Turnitin report and plagiarism scan. 100% human-written.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {['Turnitin Report', 'Plagiarism-Free', 'Human Only'].map(t => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  border: '1px solid rgba(34,197,94,0.25)',
                  color: '#4ade80',
                  background: 'rgba(34,197,94,0.08)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
