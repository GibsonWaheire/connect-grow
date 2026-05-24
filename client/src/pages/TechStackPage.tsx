import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";

const TechStackPage = () => {
  const technologies = [
    { category: "Frontend", techs: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS"] },
    { category: "Backend", techs: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"] },
    { category: "Mobile", techs: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)"] },
    { category: "State Management", techs: ["React Query", "Zustand", "Redux", "Context API"] },
    { category: "UI Libraries", techs: ["Radix UI", "shadcn/ui", "Framer Motion", "Lucide Icons"] },
    { category: "Payments", techs: ["IntaSend", "Stripe", "PayPal", "M-Pesa"] },
    { category: "DevOps", techs: ["Vercel", "AWS", "Docker", "GitHub Actions", "CI/CD"] },
    { category: "Testing", techs: ["Jest", "React Testing Library", "Cypress", "Playwright"] },
  ];

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-[88px] pb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Tech Stack</h1>
          <p className="text-gray-600 mb-12">Modern technologies we use to build fast, scalable, and maintainable applications</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((category) => (
              <div key={category.category} className="p-6 rounded-xl border border-gray-200 bg-white">
                <h3 className="font-semibold text-lg mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.techs.map((tech) => (
                    <li key={tech} className="text-gray-700 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* About Us CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-10 border-2 border-emerald-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Learn About Our Expertise</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Get to know the team behind these technologies and our commitment to staying at the forefront of innovation.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Learn More About Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default TechStackPage;

