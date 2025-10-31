import { CheckCircle2, TrendingUp, Users, Clock, Award, MessageSquare } from 'lucide-react';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { Button } from '@/components/ui/button';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { useEffect, useState } from 'react';

export const AnimatedMetrics = () => {
  const [counts, setCounts] = useState({ projects: 0, clients: 0, satisfaction: 0, support: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const animate = (target: number, key: keyof typeof counts) => {
      let current = 0;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounts(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, interval);
    };

    animate(50, 'projects');
    animate(100, 'clients');
    animate(100, 'satisfaction');
    animate(24, 'support');
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      {[
        { icon: TrendingUp, label: 'Projects Delivered', value: `${counts.projects}+`, colorClass: 'text-emerald-500' },
        { icon: Users, label: 'Happy Clients', value: `${counts.clients}+`, colorClass: 'text-cyan-500' },
        { icon: Award, label: 'Client Satisfaction', value: `${counts.satisfaction}%`, colorClass: 'text-indigo-500' },
        { icon: Clock, label: 'Support Hours', value: `${counts.support}/7`, colorClass: 'text-orange-500' },
      ].map((metric) => (
        <div key={metric.label} className="text-center p-6 rounded-xl bg-white border border-slate-200">
          <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.colorClass}`} />
          <div className="text-3xl font-bold mb-1">{metric.value}</div>
          <div className="text-sm text-slate-600">{metric.label}</div>
        </div>
      ))}
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Project timelines vary based on scope. A simple website takes 2-4 weeks, web apps 4-8 weeks, and mobile apps 6-12 weeks. We provide detailed timelines during the discovery phase."
    },
    {
      q: "Do you provide ongoing support after launch?",
      a: "Yes! We offer maintenance packages, bug fixes, feature updates, and 24/7 support. Many clients work with us long-term for continuous improvements."
    },
    {
      q: "What technologies do you use?",
      a: "We use modern stacks: React, TypeScript, Node.js, React Native for mobile, Tailwind CSS, and cloud platforms like Vercel. We choose the best tools for each project."
    },
    {
      q: "Can you work with our existing team?",
      a: "Absolutely! We integrate seamlessly with in-house teams, using tools like Slack, GitHub, and project management platforms for smooth collaboration."
    },
    {
      q: "What's included in your pricing?",
      a: "Our pricing includes design, development, testing, deployment, documentation, and initial training. Additional features or revisions are discussed upfront."
    },
    {
      q: "Do you handle the hosting and deployment?",
      a: "Yes, we can set up and manage hosting, CI/CD pipelines, monitoring, and backups. We use reliable platforms like Vercel, AWS, or your preferred provider."
    },
  ];

  return (
    <section id="faq" className="container mx-auto px-4 py-16 bg-white text-slate-900">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-semibold">{faq.q}</span>
              <svg className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-6 text-slate-600">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export const CaseStudiesSection = () => {
  const handleQuote = () => {
    window.location.href = '/contact';
  };

  return (
    <section id="case-studies" className="container mx-auto px-4 py-16 bg-slate-100 text-slate-900">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Case Studies</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Real projects, real results. See how we've helped businesses scale their digital presence.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Fintech Dashboard Platform",
            desc: "Built a comprehensive analytics dashboard with real-time data visualization, role-based access, and payment integrations.",
            results: "300% increase in user engagement, 50% reduction in support tickets",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
            href: "https://portfolio-main-two-bice.vercel.app/",
          },
          {
            title: "E-commerce Mobile App",
            desc: "Developed a React Native app with offline-first architecture, push notifications, and seamless checkout experience.",
            results: "40% higher mobile conversions, 5-star app store rating",
            img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200",
            href: "https://portfolio-main-two-bice.vercel.app/",
          },
          {
            title: "Healthcare Portal",
            desc: "Created a patient portal with HIPAA compliance, secure messaging, appointment scheduling, and telemedicine integration.",
            results: "80% patient satisfaction, 60% reduction in admin workload",
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200",
            href: "https://portfolio-main-two-bice.vercel.app/",
          },
        ].map((study) => (
          <div key={study.title} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition">
            <a href={study.href} target="_blank" rel="noopener noreferrer">
              <OptimizedImage src={study.img} alt={study.title} className="w-full h-48 object-cover" />
            </a>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{study.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{study.desc}</p>
              <div className="p-3 bg-emerald-50 rounded-lg mb-4">
                <div className="text-xs font-semibold text-emerald-800 mb-1">Results</div>
                <div className="text-sm text-emerald-700">{study.results}</div>
              </div>
              <a href={study.href} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                View case study →
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <a href="https://portfolio-main-two-bice.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Button>View Full Portfolio</Button>
        </a>
      </div>
    </section>
  );
};

export const EnhancedTestimonials = () => {
  return (
    <section id="testimonials" className="container mx-auto px-4 py-16 bg-white text-slate-900">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What clients say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            quote: "They delivered on time with a level of polish that impressed our stakeholders. The codebase is clean and maintainable.",
            author: "Sarah Chen",
            role: "Operations Lead",
            company: "Fintech Startup",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
          },
          {
            quote: "Communication was clear and the codebase is a pleasure to maintain. Great partnership from start to finish.",
            author: "Michael Torres",
            role: "CTO",
            company: "HealthTech",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          },
          {
            quote: "The team understood our vision and executed flawlessly. Our user engagement increased significantly after launch.",
            author: "Emily Rodriguez",
            role: "Product Manager",
            company: "E-commerce Platform",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          },
        ].map((t, i) => (
          <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-700 mb-4">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <OptimizedImage src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{t.author}</div>
                <div className="text-sm text-slate-600">{t.role}, {t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

