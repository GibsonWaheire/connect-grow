import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { useCart } from "@/shared/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { items, subtotal, clear } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    if (!firstName || !email || subtotal <= 0) {
      setError("Please complete your details and ensure your cart has items.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/create-intasend-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: subtotal,
          currency: "USD",
          email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phone,
          comment: `Order with ${items.length} items`,
          redirect_url: `${window.location.origin}/payment-success`,
        }),
      }).catch(() => {
        // If backend is not available, redirect to contact page with order details
        const subject = encodeURIComponent(`Order Request - $${subtotal.toFixed(2)}`);
        const body = encodeURIComponent(`Hello McGibs Digital Solutions,

I'd like to place an order with the following details:

Order Summary:
- Total Amount: $${subtotal.toFixed(2)}
- Number of Items: ${items.length}
- Items: ${items.map(item => item.name).join(', ')}

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Please proceed with payment processing and send me payment instructions.

Thank you!`);
        window.location.href = `/contact?subject=${subject}&message=${body}`;
        return null;
      });

      if (!response || !response.ok) {
        // Fallback to email contact if API fails
        const subject = encodeURIComponent(`Order Request - $${subtotal.toFixed(2)}`);
        const body = encodeURIComponent(`Hello McGibs Digital Solutions,

I'd like to place an order with the following details:

Order Summary:
- Total Amount: $${subtotal.toFixed(2)}
- Number of Items: ${items.length}
- Items: ${items.map(item => item.name).join(', ')}

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Please proceed with payment processing and send me payment instructions.

Thank you!`);
        window.location.href = `/contact?subject=${subject}&message=${body}`;
        return;
      }

      const data = await response.json();
      const redirectUrl = data.url || data.redirect_url || data.checkout_url;
      if (redirectUrl) {
        clear();
        window.location.href = redirectUrl;
        return;
      }
      throw new Error("No redirect URL returned by payment provider");
    } catch (e: any) {
      // Fallback to email contact on any error
      const subject = encodeURIComponent(`Order Request - $${subtotal.toFixed(2)}`);
      const body = encodeURIComponent(`Hello McGibs Digital Solutions,

I'd like to place an order with the following details:

Order Summary:
- Total Amount: $${subtotal.toFixed(2)}
- Number of Items: ${items.length}
- Items: ${items.map(item => item.name).join(', ')}

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Please proceed with payment processing and send me payment instructions.

Thank you!`);
      window.location.href = `/contact?subject=${subject}&message=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First name</label>
                    <input className="w-full border rounded px-3 py-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last name</label>
                    <input className="w-full border rounded px-3 py-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input className="w-full border rounded px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <div>
                  <Button onClick={handleCheckout} disabled={loading}>
                    {loading ? "Processing..." : "Pay with IntaSend"}
                  </Button>
                </div>
              </div>

              <div className="p-6 border rounded-xl h-fit">
                <div className="font-semibold mb-3">Order Summary</div>
                <div className="space-y-2 mb-4">
                  {items.map((i) => (
                    <div key={i.productId} className="flex items-center justify-between text-sm">
                      <span>{i.name} × {i.quantity}</span>
                      <span>${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </MainLayout>
    </>
  );
};

export default CheckoutPage;

