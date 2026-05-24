import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    {
      q: "What's your process for handling changes or revisions?",
      a: "We include revision rounds in our packages. Additional revisions are billed at our hourly rate. We always discuss scope changes upfront to avoid surprises."
    },
    {
      q: "Do you provide source code and documentation?",
      a: "Yes, upon project completion, you receive full source code access, comprehensive documentation, and we provide training sessions for your team."
    },
  ];

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-[88px] pb-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-12 text-center">Everything you need to know about working with us</p>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="font-semibold pr-4">{faq.q}</span>
                    <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-6">
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <p className="text-gray-700 mb-4">Still have questions?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all">
                    Contact us →
                  </a>
                  <a href="/about" className="inline-flex items-center justify-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg font-semibold transition-all">
                    Learn About Us →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default FAQPage;

