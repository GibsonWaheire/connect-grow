import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";

const ProcessPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h1>
          <p className="text-gray-600 mb-12">How we work to deliver exceptional results</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We start by understanding your goals, target audience, and technical requirements. This phase includes stakeholder interviews, competitive analysis, and project scoping.", duration: "1-2 weeks" },
              { step: "02", title: "Design", desc: "Our design team creates wireframes, visual mockups, and interactive prototypes. We iterate based on your feedback until the design aligns perfectly with your vision.", duration: "2-3 weeks" },
              { step: "03", title: "Build", desc: "Development happens in sprints with regular demos. We maintain clear communication, conduct QA testing, and ensure code quality throughout the build phase.", duration: "4-12 weeks" },
              { step: "04", title: "Launch", desc: "We handle deployment, configure hosting, set up monitoring, and provide comprehensive documentation. Post-launch support ensures everything runs smoothly.", duration: "1 week" },
            ].map((phase) => (
              <div key={phase.step} className="relative">
                <div className="p-6 rounded-xl border border-gray-200 bg-white">
                  <div className="text-sm text-gray-500 mb-1">Phase {phase.step}</div>
                  <h3 className="font-semibold text-lg mb-2">{phase.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{phase.desc}</p>
                  <div className="text-xs text-emerald-600 font-medium">Duration: {phase.duration}</div>
                </div>
                {phase.step !== "04" && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-500" />
                )}
              </div>
            ))}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ProcessPage;

