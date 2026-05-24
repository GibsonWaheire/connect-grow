import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { useCart } from "@/shared/contexts/CartContext";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  const delivery = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + delivery;

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-[88px]">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
              <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">Your cart is empty.</p>
              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                {items.map(item => (
                  <div key={item.productId} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                    <a href={`/shop/${item.productId}`}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                      />
                    </a>
                    <div className="flex-1 min-w-0">
                      <a href={`/shop/${item.productId}`} className="font-semibold text-slate-900 text-sm hover:text-emerald-600 line-clamp-2">
                        {item.name}
                      </a>
                      <p className="text-sm text-slate-400 mt-0.5">KES {item.price.toLocaleString()} each</p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-slate-900 text-sm">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                <a href="/shop" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors mt-2">
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Continue Shopping
                </a>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-24">
                <h2 className="font-semibold text-slate-900 mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery</span>
                    <span>{delivery === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `KES ${delivery}`}</span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-xs text-slate-400">Free delivery on orders above KES 5,000</p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3 mb-5 flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>

                <a
                  href="/shop-checkout"
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-xs text-slate-400 text-center mt-3">
                  Pay securely via M-Pesa
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
