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
        <section className="container mx-auto px-4 pt-24 pb-16">
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
        </section>
      </MainLayout>
    </>
  );
};

export default TechStackPage;

