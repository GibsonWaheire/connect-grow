import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, products } from "@/data/products";
import { Header } from "@/shared/components/Header";
import { useCart } from "@/shared/contexts/CartContext";
import {
  ShoppingCart, Check, ChevronRight, MessageCircle,
  Shield, Truck, RefreshCw, CreditCard, Plus, Minus,
  Package, X, ZoomIn,
} from "lucide-react";

const setMeta = (property: string, content: string) => {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
};

type Tab = "overview" | "specs" | "inbox";

// ─── Inquiry modal ────────────────────────────────────────────────────────────
const InquiryModal = ({
  productName,
  price,
  onClose,
}: {
  productName: string;
  price: number;
  onClose: () => void;
}) => {
  const [question, setQuestion] = useState("");

  const send = () => {
    const msg = encodeURIComponent(
      `Hi McGibs! I have a question about:\n\n*${productName}*\nKES ${price.toLocaleString()}\n\n${question || "Can you give me more details about this product?"}`
    );
    window.open(`https://wa.me/254726899113?text=${msg}`, "_blank");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">Ask about this product</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs text-slate-500 mb-3 bg-slate-50 rounded-lg p-3">
            <span className="font-medium text-slate-700">{productName}</span>
            <br />KES {price.toLocaleString()}
          </p>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="E.g. Does this support dual SIM? What colours are available? Can it charge my MacBook?"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none resize-none mb-3"
          />
          <button
            onClick={send}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id ?? "");
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [added, setAdded] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);

  const gallery =
    product?.images && product.images.length > 0
      ? product.images
      : product
      ? [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl]
      : [];

  const related = product
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} — McGibs Digital Solutions`;
    setMeta("og:title", `${product.name} | McGibs Electronics Kenya`);
    setMeta("og:description", product.description);
    setMeta("og:image", product.imageUrl);
    setMeta("og:url", window.location.href);
    setMeta("og:type", "product");
    return () => {
      document.title = "McGibs Digital Solutions";
    };
  }, [product]);

  // Reset state when navigating between products
  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    setActiveTab("overview");
    setAdded(false);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, qty);
    navigate("/shop-checkout");
  };

  const discount = product?.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  // ── Not found ──
  if (!product) {
    return (
      <>
        <Header />
        <div className="pt-[88px] min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 mb-4">Product not found.</p>
            <a href="/shop" className="text-emerald-600 underline text-sm">
              Back to Shop
            </a>
          </div>
        </div>
      </>
    );
  }

  // ── Main render ──
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-[88px]">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-3 max-w-6xl">
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
              <a href="/" className="hover:text-emerald-600 transition-colors">Home</a>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <a href="/shop" className="hover:text-emerald-600 transition-colors">Shop</a>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <a
                href={`/shop?cat=${encodeURIComponent(product.category)}`}
                className="hover:text-emerald-600 transition-colors"
              >
                {product.category}
              </a>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="text-slate-600 truncate max-w-[220px]">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* ── ABOVE FOLD: Gallery + Info ── */}
          <div className="grid lg:grid-cols-5 gap-8 mb-10">

            {/* Gallery */}
            <div className="lg:col-span-2 space-y-3">
              <div
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden relative group cursor-zoom-in"
                onClick={() => setImgZoomed(true)}
              >
                <img
                  src={gallery[activeImg]}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {product.badge}
                  </span>
                )}
                {discount && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    -{discount}%
                  </span>
                )}
                <div className="absolute bottom-3 right-3 bg-black/40 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i
                        ? "border-emerald-500 shadow-sm"
                        : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-3 flex flex-col">

              {/* Category */}
              <span className="text-xs text-slate-400 uppercase tracking-widest mb-2">
                {product.category}
              </span>

              {/* Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-slate-900">
                  KES {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    KES {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount && (
                  <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-md">
                    Save KES {(product.originalPrice! - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock */}
              <p
                className={`text-sm font-medium mb-5 ${
                  product.inStock ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {product.inStock
                  ? "✓ In Stock — Ready for dispatch"
                  : "✗ Currently Out of Stock"}
              </p>

              {/* Key features */}
              {product.features && product.features.length > 0 && (
                <ul className="space-y-2 mb-6 bg-slate-50 rounded-xl p-4">
                  {product.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-slate-500 font-medium">Qty</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors border-r border-gray-200"
                    disabled={qty <= 1}
                  >
                    <Minus className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-slate-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(10, q + 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors border-l border-gray-200"
                    disabled={qty >= 10}
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>
                {qty > 1 && (
                  <span className="text-xs text-slate-400">
                    Total: KES {(product.price * qty).toLocaleString()}
                  </span>
                )}
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-4">
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                >
                  Buy Now — KES {(product.price * qty).toLocaleString()}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 border-2 font-semibold py-3.5 rounded-xl transition-all text-sm ${
                    added
                      ? "border-emerald-400 text-emerald-700 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-400 text-slate-800 hover:bg-white"
                  } disabled:opacity-40`}
                >
                  {added ? (
                    <><Check className="w-4 h-4" /> Added to Cart!</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                  )}
                </button>
              </div>

              {added && (
                <a
                  href="/cart"
                  className="block text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-4 underline underline-offset-2"
                >
                  View cart & checkout →
                </a>
              )}

              {/* Warranty */}
              {product.warranty && (
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-3">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  {product.warranty}
                </p>
              )}

              {/* WhatsApp inquiry — small */}
              <button
                onClick={() => setShowInquiry(true)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-green-600 transition-colors mt-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Have a question? Ask via WhatsApp
              </button>
            </div>
          </div>

          {/* ── TRUST STRIP ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {[
              { icon: Shield, label: "Genuine Products", sub: "100% authentic, never refurbished" },
              { icon: Truck, label: "Fast Delivery", sub: "Same day Nairobi, 1–3 days upcountry" },
              { icon: CreditCard, label: "M-Pesa Payment", sub: "Secure STK push — pay on your phone" },
              { icon: RefreshCw, label: "7-Day Returns", sub: "Not happy? We make it right" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── TABS ── */}
          <div className="bg-white rounded-2xl border border-gray-200 mb-10 overflow-hidden">
            {/* Tab headers */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {(["overview", "specs", "inbox"] as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-emerald-500 text-emerald-600 bg-emerald-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab === "overview"
                    ? "Overview"
                    : tab === "specs"
                    ? "Specifications"
                    : "In the Box"}
                </button>
              ))}
            </div>

            {/* Tab body */}
            <div className="p-6 lg:p-8">

              {/* Overview */}
              {activeTab === "overview" && (
                <div className="max-w-3xl">
                  <p className="text-slate-600 leading-relaxed text-sm mb-6">
                    {product.overview ?? product.description}
                  </p>
                  {product.features && product.features.length > 0 && (
                    <>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                        Key Features
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {!product.overview && !product.features && (
                    <p className="text-slate-400 text-sm">
                      Detailed overview coming soon. WhatsApp us for full product info.
                    </p>
                  )}
                </div>
              )}

              {/* Specs */}
              {activeTab === "specs" && (
                <div>
                  {product.specs && Object.keys(product.specs).length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[400px]">
                        <tbody>
                          {Object.entries(product.specs).map(([key, val], i) => (
                            <tr
                              key={key}
                              className={`border-b border-gray-100 ${
                                i % 2 === 0 ? "bg-gray-50/60" : "bg-white"
                              }`}
                            >
                              <td className="py-3 px-4 font-medium text-slate-600 w-2/5 align-top">
                                {key}
                              </td>
                              <td className="py-3 px-4 text-slate-800 align-top">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm">
                      Full specifications will be listed here shortly. Use the contact section below for detailed specs.
                    </p>
                  )}
                </div>
              )}

              {/* In the Box */}
              {activeTab === "inbox" && (
                <div>
                  {product.inTheBox && product.inTheBox.length > 0 ? (
                    <ul className="space-y-2.5 max-w-sm">
                      {product.inTheBox.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                          <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                            <Package className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 text-sm">
                      In the box details coming soon.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── NEED HELP? ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 mb-0.5">Have a question about this product?</p>
              <p className="text-xs text-slate-500">
                Ask about specs, compatibility, delivery timelines, or anything else. We respond fast on WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setShowInquiry(true)}
              className="shrink-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Ask on WhatsApp
            </button>
          </div>

          {/* ── RELATED PRODUCTS ── */}
          {related.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  More in {product.category}
                </h2>
                <a
                  href={`/shop?cat=${encodeURIComponent(product.category)}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  See all →
                </a>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map(p => (
                  <a
                    key={p.id}
                    href={`/shop/${p.id}`}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {p.badge && (
                        <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        KES {p.price.toLocaleString()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── IMAGE ZOOM LIGHTBOX ── */}
      {imgZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setImgZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setImgZoomed(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={gallery[activeImg]}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}

      {/* ── WHATSAPP INQUIRY MODAL ── */}
      {showInquiry && (
        <InquiryModal
          productName={product.name}
          price={product.price}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </>
  );
};

export default ProductDetailPage;
