import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { useCart } from "@/shared/contexts/CartContext";
import { useMpesaPayment } from "@/shared/hooks/useMpesaPayment";
import { ArrowLeft, Smartphone, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("7") || digits.startsWith("1")) return "254" + digits;
  return digits;
};

const generateOrderId = () =>
  "ORD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 5).toUpperCase();

const CheckoutPage = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { status, message, pay, reset } = useMpesaPayment();

  const delivery = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + delivery;

  const [form, setForm] = useState({ name: "", email: "", phone: "", county: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notified, setNotified] = useState(false);

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 9) e.phone = "Valid M-Pesa phone required";
    if (!form.county.trim()) e.county = "County / location required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    pay(formatPhone(form.phone), total, `McGibs Shop Order — ${items.length} item(s)`);
  };

  // Watch for payment success
  if (status === "success" && !notified) {
    setNotified(true);
    const orderId = generateOrderId();
    const orderData = { orderId, customer: form, items, subtotal, delivery, total, timestamp: new Date().toISOString() };
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    clear();

    // Notify owner via EmailJS
    const itemsList = items.map(i => `${i.name} x${i.quantity} — KES ${(i.price * i.quantity).toLocaleString()}`).join("\n");
    emailjs.send("service_f2b2p85", "template_contact", {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      subject: `New Shop Order: ${orderId}`,
      message: `New shop order received!\n\nOrder ID: ${orderId}\nCustomer: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCounty: ${form.county}\n\nItems:\n${itemsList}\n\nSubtotal: KES ${subtotal.toLocaleString()}\nDelivery: KES ${delivery}\nTotal: KES ${total.toLocaleString()}\n\nNotes: ${form.notes || "None"}`,
    }, "qt_5lcSYSB6Vp2Ll3").catch(() => {});

    navigate(`/order-success?id=${orderId}`);
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-[88px]">
        <div className="container mx-auto px-4 py-8 max-w-5xl">

          <a href="/cart" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition-colors" onClick={e => { e.preventDefault(); window.history.back(); }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </a>

          <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 mb-4">Your cart is empty.</p>
              <a href="/shop" className="text-emerald-600 underline text-sm">Go to Shop</a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Left — form + payment */}
              <div className="lg:col-span-2 space-y-5">

                {/* Customer details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="font-semibold text-slate-900 mb-5">Delivery Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                      <input
                        value={form.name}
                        onChange={e => set("name", e.target.value)}
                        placeholder="John Kamau"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${errors.name ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${errors.email ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">M-Pesa Phone *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => set("phone", e.target.value)}
                        placeholder="0726 899 113"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">County / Location *</label>
                      <input
                        value={form.county}
                        onChange={e => set("county", e.target.value)}
                        placeholder="Nairobi, Westlands"
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none ${errors.county ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Delivery Notes (optional)</label>
                      <textarea
                        value={form.notes}
                        onChange={e => set("notes", e.target.value)}
                        placeholder="Building name, landmark, any delivery instructions..."
                        rows={2}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* M-Pesa payment block */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="font-semibold text-slate-900 mb-1">Pay via M-Pesa</h2>
                  <p className="text-sm text-slate-500 mb-5">
                    Click below to receive an M-Pesa prompt on your phone. Enter your PIN to complete payment.
                  </p>

                  {/* Idle / ready */}
                  {(status === "idle" || status === "failed" || status === "cancelled") && (
                    <>
                      {status === "failed" && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
                          <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{message || "Payment failed. Please try again."}</span>
                        </div>
                      )}
                      {status === "cancelled" && (
                        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm p-3 rounded-lg mb-4">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Payment was cancelled. You can try again.</span>
                        </div>
                      )}
                      <button
                        onClick={handlePay}
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-lg transition-colors text-base"
                      >
                        <Smartphone className="w-5 h-5" />
                        Pay KES {total.toLocaleString()} via M-Pesa
                      </button>
                    </>
                  )}

                  {/* Sending STK */}
                  {status === "sending" && (
                    <div className="flex items-center justify-center gap-3 py-5 text-slate-600">
                      <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                      <span className="text-sm font-medium">Sending payment request…</span>
                    </div>
                  )}

                  {/* Waiting for PIN */}
                  {status === "waiting" && (
                    <div className="text-center py-4">
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                        <Smartphone className="w-7 h-7 text-green-600 animate-pulse" />
                      </div>
                      <p className="font-semibold text-slate-900 mb-1">Check your phone</p>
                      <p className="text-sm text-slate-500 mb-4">An M-Pesa prompt has been sent to <strong>{form.phone}</strong>. Enter your PIN to complete.</p>
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Waiting for confirmation…
                      </div>
                      <button onClick={reset} className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right — order summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-24">
                <h2 className="font-semibold text-slate-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-900 truncate">{item.name}</p>
                        <p className="text-xs text-slate-400">× {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-900 shrink-0">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery</span>
                    <span>{delivery === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `KES ${delivery}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-base pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    Payment processed securely via M-Pesa. Your order will be confirmed immediately after payment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
