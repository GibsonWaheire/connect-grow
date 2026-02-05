import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { useCart } from "@/shared/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">KES {item.price.toLocaleString()}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, Math.max(1, Number(e.target.value)))}
                          className="w-20 border rounded px-2 py-1"
                        />
                        <button onClick={() => removeItem(item.productId)} className="text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>
                    <div className="font-semibold">KES {(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 border rounded-xl h-fit">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
                </div>
                <a href="/checkout"><Button className="w-full">Proceed to Checkout</Button></a>
              </div>
            </div>
          )}
        </section>
      </MainLayout>
    </>
  );
};

export default CartPage;

