import { FileText, Code, Monitor, BookOpen, Wand2 } from 'lucide-react';
import { servicesData } from '@/shared/data/services';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'non-technical':  FileText,
  'technical':      Code,
  'presentations':  Monitor,
  'exams':          BookOpen,
  'ai-refinement':  Wand2,
};

interface AcademicServicesSectionProps {
  onOrderClick?: (serviceId: string) => void;
}

export const AcademicServicesSection = ({ onOrderClick }: AcademicServicesSectionProps) => {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: '#080f20' }}>
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-400">
            services
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h2 className="text-3xl font-bold text-white">
              Pick your service. Place your order.
            </h2>
            <span className="text-sm text-slate-500">All prices in USD</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesData.map(service => {
            const Icon = iconMap[service.id] ?? FileText;

            return (
              <div
                key={service.id}
                className="relative flex flex-col rounded-xl p-6 transition-all"
                style={{
                  border: service.popular
                    ? '1px solid rgba(59,130,246,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: service.popular
                    ? 'rgba(59,130,246,0.05)'
                    : 'rgba(255,255,255,0.02)',
                }}
                onMouseOver={e => {
                  if (!service.popular)
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                }}
                onMouseOut={e => {
                  if (!service.popular)
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                }}
              >
                {/* Top blue line for popular */}
                {service.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #3b82f6, transparent)',
                    }}
                  />
                )}

                {/* Popular badge */}
                {service.popular && (
                  <span
                    className="absolute -top-3 right-4 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: '#3b82f6', color: '#fff' }}
                  >
                    Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(59,130,246,0.1)' }}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>

                {/* Title + desc */}
                <h3 className="font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mb-5">
                  <span className="font-mono text-2xl font-bold text-white">
                    ${service.price}
                  </span>
                  <span className="text-sm text-slate-500 ml-1">/ {service.unit}</span>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-6 flex-1">
                  {service.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-green-400 text-xs leading-none">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Order button */}
                <button
                  onClick={() => onOrderClick?.(service.id)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={
                    service.popular
                      ? { background: '#3b82f6', color: '#fff' }
                      : {
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#e2e8f0',
                          background: 'rgba(255,255,255,0.04)',
                        }
                  }
                  onMouseOver={e => {
                    if (service.popular) {
                      e.currentTarget.style.background = '#2563eb';
                    } else {
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                      e.currentTarget.style.color = '#60a5fa';
                    }
                  }}
                  onMouseOut={e => {
                    if (service.popular) {
                      e.currentTarget.style.background = '#3b82f6';
                    } else {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#e2e8f0';
                    }
                  }}
                >
                  Order Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
