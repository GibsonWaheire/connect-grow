import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Header } from "@/shared/components/Header";
import { products } from "@/data/products";
import { useCart } from "@/shared/contexts/CartContext";

const ShopPage = () => {
  const { addItem } = useCart();

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Shop</h1>
          <p className="text-gray-600 mb-8">Quality tech for creators and businesses. Secure payments with IntaSend.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white flex flex-col">
                <a href={`/shop/${p.id}`}><OptimizedImage src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" /></a>
                <div className="p-5 flex-1 flex flex-col">
                  <a href={`/shop/${p.id}`} className="font-semibold hover:underline">{p.name}</a>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-3 font-semibold">${p.price.toFixed(2)}</div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <Button size="sm" onClick={() => addItem(p, 1)} className="flex-1">Add to Cart</Button>
                    <a href={`/shop/${p.id}`} className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50">Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ShopPage;

