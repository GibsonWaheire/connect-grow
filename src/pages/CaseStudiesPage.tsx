import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Button } from "@/components/ui/button";

const CaseStudiesPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Real projects, real results. See how we've helped businesses scale their digital presence.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fintech Dashboard Platform",
                desc: "Built a comprehensive analytics dashboard with real-time data visualization, role-based access control, and integrated payment processing.",
                results: ["300% increase in user engagement", "50% reduction in support tickets", "4.8/5 user rating"],
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
                href: "https://portfolio-main-two-bice.vercel.app/",
                tech: ["React", "TypeScript", "Chart.js", "Stripe"],
              },
              {
                title: "E-commerce Mobile App",
                desc: "Developed a React Native app with offline-first architecture, push notifications, and seamless checkout experience.",
                results: ["40% higher mobile conversions", "5-star app store rating", "60% faster checkout"],
                img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200",
                href: "https://portfolio-main-two-bice.vercel.app/",
                tech: ["React Native", "Redux", "Firebase", "Stripe"],
              },
              {
                title: "Healthcare Portal",
                desc: "Created a patient portal with HIPAA compliance, secure messaging, appointment scheduling, and telemedicine integration.",
                results: ["80% patient satisfaction", "60% reduction in admin workload", "HIPAA compliant"],
                img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200",
                href: "https://portfolio-main-two-bice.vercel.app/",
                tech: ["React", "Node.js", "PostgreSQL", "WebRTC"],
              },
            ].map((study) => (
              <div key={study.title} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition">
                <a href={study.href} target="_blank" rel="noopener noreferrer">
                  <OptimizedImage src={study.img} alt={study.title} className="w-full h-64 object-cover" />
                </a>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{study.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{study.desc}</p>
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-emerald-800 mb-2">Key Results</div>
                    <ul className="space-y-1">
                      {study.results.map((result, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {study.tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {t}
                        </span>
                      ))}
                    </div>
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
      </MainLayout>
    </>
  );
};

export default CaseStudiesPage;

