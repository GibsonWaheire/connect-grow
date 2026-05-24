import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, MessageCircle, ShoppingBag, Package } from "lucide-react";

interface OrderData {
  orderId: string;
  customer: { name: string; email: string; phone: string; county: string; notes: string };
  items: { productId: string; name: string; price: number; quantity: number; imageUrl: string }[];
  subtotal: number;
  delivery: number;
  total: number;
  timestamp: string;
}

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) {
      const parsed: OrderData = JSON.parse(saved);
      if (!orderId || parsed.orderId === orderId) {
        setOrder(parsed);
      }
    }
  }, [orderId]);

  const handleWhatsApp = () => {
    const items = order?.items.map(i => `• ${i.name} x${i.quantity}`).join("\n") ?? "";
    const msg = encodeURIComponent(
      `Hi McGibs Digital Solutions! I just placed an order.\n\nOrder ID: ${order?.orderId}\nTotal: KES ${order?.total.toLocaleString()}\n\nItems:\n${items}\n\nDelivery to: ${order?.customer.county}\n\nPlease confirm and advise on delivery time. Thank you!`
    );
    window.open(`https://wa.me/254726899113?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple top bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <a href="/" className="font-bold text-slate-900 text-lg">McGibs <span className="text-emerald-600">Digital</span></a>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
          <p className="text-slate-500">Your payment was received. We'll prepare your order right away.</p>
        </div>

        {/* Order ID banner */}
        <div className="bg-slate-900 text-white rounded-xl p-5 text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Order Reference</p>
          <p className="text-2xl font-bold tracking-wider">{order?.orderId ?? orderId}</p>
          <p className="text-xs text-slate-400 mt-1">Save this number for tracking</p>
        </div>

        {order && (
          <>
            {/* Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-slate-500" />
                <h2 className="font-semibold text-slate-900">Items Ordered</h2>
              </div>
              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-3 space-y-1 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span><span>KES {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery</span>
                  <span>{order.delivery === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `KES ${order.delivery}`}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-base pt-1 border-t border-gray-100">
                  <span>Total Paid</span><span>KES {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <h2 className="font-semibold text-slate-900 mb-3">Delivery To</h2>
              <p className="text-sm text-slate-700 font-medium">{order.customer.name}</p>
              <p className="text-sm text-slate-500">{order.customer.county}</p>
              <p className="text-sm text-slate-500">{order.customer.email}</p>
              <p className="text-sm text-slate-500">{order.customer.phone}</p>
              {order.customer.notes && (
                <p className="text-sm text-slate-500 mt-1 italic">"{order.customer.notes}"</p>
              )}
            </div>
          </>
        )}

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Track Order on WhatsApp
          </button>
          <a
            href="/shop"
            className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-400 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </a>
        </div>

        <p className="text-xs text-slate-400 text-center mt-6">
          Expected delivery: same day (Nairobi CBD) or 1–3 days (other areas).<br />
          Questions? WhatsApp: <strong>+254 726 899 113</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
