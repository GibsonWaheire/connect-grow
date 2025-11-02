import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
const PricingPage = () => {

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the package that fits your needs. All packages include ongoing support and updates.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Website Starter",
                price: "$499",
                period: "one-time",
                features: ["1 landing page", "SEO setup", "Analytics integration", "1 revision round", "Mobile responsive", "Basic support"],
                highlight: false,
              },
              {
                name: "App Pro",
                price: "$1,999",
                period: "one-time",
                features: ["Web app or mobile app", "User authentication", "Dashboard/Admin panel", "Payment integration", "2 revision rounds", "Priority support"],
                highlight: true,
              },
              {
                name: "Commerce Plus",
                price: "$1,499",
                period: "one-time",
                features: ["Full product catalog", "Shopping cart & checkout", "Payment processing (IntaSend)", "Admin dashboard", "2 revision rounds", "Priority support"],
                highlight: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-2xl border ${plan.highlight ? 'border-emerald-300 bg-emerald-50 shadow-lg scale-105' : 'border-gray-200 bg-white'}`}>
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-1">{plan.price}</div>
                  <div className="text-sm text-gray-500">{plan.period}</div>
                  <h3 className="text-xl font-semibold mt-4">{plan.name}</h3>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Button 
                    onClick={() => window.location.href = '/get-started'} 
                    className={`w-full py-6 text-lg font-semibold ${plan.highlight ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                  >
                    🛒 Get Started
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/quote'} 
                    variant="outline"
                    className={`w-full py-4 border-2 ${plan.highlight ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}
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
              <Button variant="outline" onClick={() => window.location.href = '/quote'}>Contact us for custom pricing</Button>
              <Button variant="outline" onClick={() => window.location.href = '/about'}>Learn More About Us</Button>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default PricingPage;

