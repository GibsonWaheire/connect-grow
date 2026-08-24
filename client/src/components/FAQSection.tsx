import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What kinds of work do you help with?',
    a: 'Essays, research papers, technical writing, programming assignments, presentations, and exams — across all subjects. Both technical (Python, Math, Engineering) and non-technical (English, History, Psychology).',
  },
  {
    q: 'How do you guarantee the work is original?',
    a: 'All work is 100% human-researched and written. We never use AI-generated content. Every order comes with a Turnitin report showing 0% similarity.',
  },
  {
    q: 'What are your prices and turnaround times?',
    a: 'Non-technical writing: $8/page. Technical writing: $15/page. Presentations: $5/slide. Exam help: $30. Standard delivery is 3–5 days. Rush and express options are available.',
  },
  {
    q: 'How do I place an order?',
    a: 'Message us on WhatsApp (+1 443-869-7500) or email (pwriter455@gmail.com) with your assignment details, deadline, and requirements. We reply fast and get started the same day.',
  },
  {
    q: 'Is my information kept private?',
    a: 'Yes. We never share your personal information or assignment details with anyone. All communications are confidential.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes — unlimited revisions until you are completely satisfied. Our support team is on WhatsApp 24/7.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Credit/debit cards, PayPal, and mobile payments via our secure IntaSend system. Bank transfers are available for larger orders.',
  },
  {
    q: 'Can you handle same-day deadlines?',
    a: 'Yes. We handle urgent assignments and can often deliver within 12–24 hours. Contact us right away with your deadline and we will tell you what is possible.',
  },
];

export const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ backgroundColor: '#080f20' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          <div className="mb-12">
            <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">
              faq
            </p>
            <h2 className="text-3xl font-bold text-white">Common questions</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                  style={{
                    background:
                      open === i
                        ? 'rgba(59,130,246,0.06)'
                        : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span className="font-medium text-white pr-4 text-sm">{faq.q}</span>
                  {open === i ? (
                    <Minus className="w-4 h-4 shrink-0 text-blue-400" />
                  ) : (
                    <Plus className="w-4 h-4 shrink-0 text-slate-500" />
                  )}
                </button>

                {open === i && (
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed text-slate-400"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Support links */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/14438697500"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all text-white"
              style={{ background: '#22c55e' }}
              onMouseOver={e => (e.currentTarget.style.background = '#16a34a')}
              onMouseOut={e => (e.currentTarget.style.background = '#22c55e')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              WhatsApp Support
            </a>
            <a
              href="mailto:pwriter455@gmail.com"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all text-slate-300 hover:text-blue-400"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
              }}
              onMouseOver={e =>
                (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)')
              }
              onMouseOut={e =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')
              }
            >
              Email Support
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
