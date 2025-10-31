import { useParams } from "react-router-dom";
import { getProductById } from "@/data/products";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/shared/contexts/CartContext";
import { OptimizedImage } from "@/shared/components/OptimizedImage";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const product = getProductById(productId);
  const { addItem } = useCart();

  if (!product) {
    return (
      <>
        <Header />
        <MainLayout>
          <div className="container mx-auto px-4 pt-24 pb-16">
            <p className="text-gray-600">Product not found.</p>
          </div>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <OptimizedImage src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-xl border" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</div>
              <div className="flex gap-3">
                <Button onClick={() => addItem(product, 1)}>Add to Cart</Button>
                <a href="/cart" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">View Cart</a>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ProductDetailPage;

