import { MessageCircle, CheckCircle, Phone, Truck, Shield, Star } from "lucide-react";
import { products } from "@/data/products";

const FEATURED_IDS = [
  "samsung-galaxy-a35",
  "iphone-14",
  "hp-250-g8",
  "jbl-charge-5",
  "mikrotik-hap-ac2",
  "samsung-43-smart-tv",
];

const featured = FEATURED_IDS.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;

const handleWhatsApp = (productName?: string) => {
  const text = productName
    ? `Hi! I saw your Facebook ad and I'm interested in:\n\n*${productName}*\n\nIs it available? What's the price and delivery time?`
    : `Hi! I saw your Facebook ad for electronics. I'd like to know more about your products and pricing.`;
  window.open(`https://wa.me/254726899113?text=${encodeURIComponent(text)}`, "_blank");
};

const ElectronicsLandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-center text-sm py-2 px-4">
        Free delivery in Nairobi on orders above KES 5,000 — Call/WhatsApp: 0726 899 113
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-slate-900">McGibs</span>
            <span className="text-xl font-bold text-blue-600"> Electronics</span>
          </div>
          <button
            onClick={() => handleWhatsApp()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Us
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="inline-block bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Nairobi's Trusted Electronics Store
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Phones, Laptops, Speakers<br />& MikroTik Routers
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Genuine products. Best prices in Kenya. Same-day delivery in Nairobi. Order now — pay on delivery available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => handleWhatsApp()}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </button>
            <a
              href="/shop"
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              Browse All Products
            </a>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-slate-50 border-b border-gray-200 py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: "100% Genuine Products" },
              { icon: Truck, label: "Same-Day Nairobi Delivery" },
              { icon: Phone, label: "M-Pesa / Cash on Delivery" },
              { icon: Star, label: "500+ Happy Customers" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center">Featured Products</h2>
          <p className="text-slate-500 text-center mb-10">Click any product to order directly via WhatsApp</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{p.category}</p>
                  <h3 className="font-semibold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-slate-900">KES {p.price.toLocaleString()}</div>
                    <button
                      onClick={() => handleWhatsApp(p.name)}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/shop"
              className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="bg-slate-50 py-14 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">How to Order</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Pick Your Item", desc: "Browse our products and choose what you want." },
              { step: "2", title: "WhatsApp Us", desc: "Send us the product name. We confirm stock and share payment details." },
              { step: "3", title: "Get Delivered", desc: "Pay via M-Pesa or cash on delivery. We deliver same-day in Nairobi." },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Why Buy From Us</h2>
          <div className="space-y-4">
            {[
              "All products are genuine and come with manufacturer warranty",
              "M-Pesa payments accepted — safe and instant",
              "Cash on delivery available for Nairobi orders",
              "Free installation support for MikroTik routers",
              "After-sales support via WhatsApp",
              "Competitive prices — we match any genuine quote",
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-blue-700 text-white py-14 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Order?</h2>
        <p className="text-white/80 mb-8 text-lg">WhatsApp us now — we reply within minutes.</p>
        <button
          onClick={() => handleWhatsApp()}
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp: 0726 899 113
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white/60 text-sm text-center py-6 px-4">
        &copy; {new Date().getFullYear()} McGibs Digital Solutions — Electronics Shop, Nairobi, Kenya
      </footer>
    </div>
  );
};

export default ElectronicsLandingPage;
