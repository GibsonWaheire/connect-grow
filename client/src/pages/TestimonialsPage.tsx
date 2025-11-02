import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { OptimizedImage } from "@/shared/components/OptimizedImage";

const TestimonialsPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Hear from businesses we've helped transform their digital presence.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "They delivered on time with a level of polish that impressed our stakeholders. The codebase is clean and maintainable.",
                author: "Sarah Chen",
                role: "Operations Lead",
                company: "Fintech Startup",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                rating: 5,
              },
              {
                quote: "Communication was clear and the codebase is a pleasure to maintain. Great partnership from start to finish.",
                author: "Michael Torres",
                role: "CTO",
                company: "HealthTech",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                rating: 5,
              },
              {
                quote: "The team understood our vision and executed flawlessly. Our user engagement increased significantly after launch.",
                author: "Emily Rodriguez",
                role: "Product Manager",
                company: "E-commerce Platform",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
                rating: 5,
              },
              {
                quote: "Professional, responsive, and results-driven. They transformed our outdated system into a modern platform.",
                author: "David Kim",
                role: "Founder",
                company: "SaaS Platform",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
                rating: 5,
              },
              {
                quote: "Outstanding work quality and attention to detail. They went above and beyond our expectations.",
                author: "Lisa Anderson",
                role: "Marketing Director",
                company: "Retail Brand",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                rating: 5,
              },
              {
                quote: "The mobile app they built increased our sales by 35%. Highly recommend their services.",
                author: "James Wilson",
                role: "CEO",
                company: "E-commerce Company",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <OptimizedImage src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{t.author}</div>
                    <div className="text-sm text-gray-600">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* About Us CTA */}
          <div className="mt-16 text-center bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-10 border-2 border-emerald-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">Get to Know Our Team</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Learn about the people behind these successful projects. Discover our expertise, values, and what makes us different.
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

export default TestimonialsPage;

