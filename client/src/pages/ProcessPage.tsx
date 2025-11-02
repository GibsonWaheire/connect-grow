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

          {/* About Us CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-10 border-2 border-emerald-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Want to Know More About Our Team?</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Discover the people and values that make our proven process possible.
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

export default ProcessPage;

