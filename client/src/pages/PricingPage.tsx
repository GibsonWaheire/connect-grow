import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/shared/utils";

const digitalProducts = [
  {
    name: "Social Media Post (Single)",
    price: 1300,
    period: "per post",
    features: ["Professional copy", "Basic design", "1 platform", "1 revision"],
    highlight: false,
  },
  {
    name: "Logo Design (Basic)",
    price: 1950,
    period: "one-time",
    features: ["Custom logo", "2 revision rounds", "PNG & SVG", "Source files"],
    highlight: false,
  },
  {
    name: "SEO Audit (Basic)",
    price: 2600,
    period: "one-time",
    features: ["Site analysis", "Keyword research", "Action plan", "Recommendations"],
    highlight: true,
  },
  {
    name: "Content Creation (500 words)",
    price: 3250,
    period: "per article",
    features: ["SEO-optimized", "Well-researched", "Ready to publish", "1 revision"],
    highlight: false,
  },
  {
    name: "Social Media Management",
    price: 4550,
    period: "per month",
    features: ["12 posts/month", "Engagement", "Analytics report", "2 platforms"],
    highlight: false,
  },
  {
    name: "Landing Page Design",
    price: 6500,
    period: "one-time",
    features: ["Mobile responsive", "SEO setup", "Contact form", "1 revision round"],
    highlight: false,
  },
  {
    name: "Brand Identity Kit",
    price: 9750,
    period: "one-time",
    features: ["Logo", "Color palette", "Typography", "Brand guidelines"],
    highlight: false,
  },
  {
    name: "Content Package (5 articles)",
    price: 13000,
    period: "one-time",
    features: ["5 x 500 words", "SEO-optimized", "7-day delivery", "2 revisions"],
    highlight: false,
  },
  {
    name: "Website Starter Kit",
    price: 19500,
    period: "one-time",
    features: ["1-2 pages", "Mobile responsive", "SEO setup", "Contact form"],
    highlight: false,
  },
];

const PricingPage = () => {
  const navigate = useNavigate();

  const handlePay = (name: string, price: number) => {
    navigate(`/checkout?service=${encodeURIComponent(name)}&amount=${price}`);
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Digital services from KES 1,300 to KES 19,500. All prices in Kenyan Shillings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {digitalProducts.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border flex flex-col ${
                  plan.highlight
                    ? 'border-emerald-300 bg-emerald-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-1">{formatPrice(plan.price)}</div>
                  <div className="text-sm text-gray-500">{plan.period}</div>
                  <h3 className="text-xl font-semibold mt-4">{plan.name}</h3>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Button
                    onClick={() => handlePay(plan.name, plan.price)}
                    className={`w-full py-6 text-lg font-semibold ${
                      plan.highlight
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    Pay {formatPrice(plan.price)}
                  </Button>
                  <Button
                    onClick={() => navigate('/quote')}
                    variant="outline"
                    className={`w-full py-4 border-2 ${
                      plan.highlight
                        ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Get Free Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="text-gray-600 mb-4">Need a custom solution? Let's discuss your requirements.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate('/quote')}>
                Contact us for custom pricing
              </Button>
              <Button variant="outline" onClick={() => navigate('/services')}>
                Browse All Services
              </Button>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default PricingPage;
