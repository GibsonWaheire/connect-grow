import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { CheckCircle2 } from "lucide-react";

const ServicesPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600 mb-12">Comprehensive digital solutions tailored to your needs</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Websites & CMS", desc: "Marketing sites, blogs, landing pages, and headless CMS.", features: ["Responsive design", "SEO optimized", "Fast loading", "Easy to manage"] },
              { title: "Web Apps", desc: "Dashboards, portals, and internal tools with modern stacks.", features: ["User authentication", "Real-time updates", "Scalable architecture", "API integration"] },
              { title: "Mobile Apps", desc: "iOS/Android apps with React Native or native integrations.", features: ["Cross-platform", "Push notifications", "Offline support", "App store ready"] },
              { title: "E-commerce", desc: "Shops, payments, catalogs, and inventory flows.", features: ["Product management", "Secure checkout", "Payment integration", "Order tracking"] },
              { title: "UI/UX Design", desc: "Wireframes, prototypes, and design systems.", features: ["User research", "Wireframing", "Prototyping", "Design systems"] },
              { title: "Cloud & DevOps", desc: "CI/CD, hosting, monitoring, and scalability.", features: ["CI/CD pipelines", "Cloud hosting", "Monitoring", "Auto-scaling"] },
            ].map((service) => (
              <div key={service.title} className="p-6 rounded-xl border border-gray-200 shadow-sm bg-white">
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ServicesPage;
