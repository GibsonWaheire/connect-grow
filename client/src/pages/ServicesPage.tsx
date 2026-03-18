import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Header } from '@/shared/components/Header';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    title: 'Websites & CMS',
    price: 19500,
    desc: 'Marketing sites, blogs, landing pages, and headless CMS.',
    features: ['Responsive design', 'SEO optimized', 'Fast loading', 'Easy to manage'],
  },
  {
    title: 'Web Apps',
    price: 35000,
    desc: 'Dashboards, portals, and internal tools with modern stacks.',
    features: ['User authentication', 'Real-time updates', 'Scalable architecture', 'API integration'],
  },
  {
    title: 'Mobile Apps',
    price: 45000,
    desc: 'iOS/Android apps with React Native or native integrations.',
    features: ['Cross-platform', 'Push notifications', 'Offline support', 'App store ready'],
  },
  {
    title: 'E-commerce',
    price: 25000,
    desc: 'Shops, payments, catalogs, and inventory flows.',
    features: ['Product management', 'Secure checkout', 'Payment integration', 'Order tracking'],
  },
  {
    title: 'UI/UX Design',
    price: 9750,
    desc: 'Wireframes, prototypes, and design systems.',
    features: ['User research', 'Wireframing', 'Prototyping', 'Design systems'],
  },
  {
    title: 'Cloud & DevOps',
    price: 13000,
    desc: 'CI/CD, hosting, monitoring, and scalability.',
    features: ['CI/CD pipelines', 'Cloud hosting', 'Monitoring', 'Auto-scaling'],
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const handlePay = (title: string, price: number) => {
    navigate(`/checkout?service=${encodeURIComponent(title)}&amount=${price}`);
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600 mb-12">
            Select a service to pay instantly, or{' '}
            <a href="/quote" className="text-emerald-600 hover:underline font-medium">
              request a custom quote
            </a>{' '}
            first.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => (
              <div
                key={service.title}
                className="flex flex-col p-6 rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-md hover:border-emerald-300 transition-all"
              >
                <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                <p className="text-2xl font-bold text-emerald-600 mb-2">
                  KES {service.price.toLocaleString()}
                </p>
                <p className="text-gray-600 mb-4 text-sm">{service.desc}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePay(service.title, service.price)}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2.5 rounded-xl transition-all mt-auto"
                >
                  Pay KES {service.price.toLocaleString()}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200">
            <h2 className="text-2xl font-bold mb-3 text-slate-900">Want to Learn More About Our Team?</h2>
            <p className="text-slate-600 mb-6">
              Discover our story, values, and commitment to delivering exceptional digital solutions.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ServicesPage;
