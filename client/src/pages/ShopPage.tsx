import { useState, useMemo } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Header } from "@/shared/components/Header";
import { products } from "@/data/products";
import { useCart } from "@/shared/contexts/CartContext";
import { Search, Filter } from "lucide-react";

const ShopPage = () => {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Shop</h1>
          <p className="text-gray-600 mb-8">Quality tech for creators and businesses. Secure payments with IntaSend.</p>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Filters:</span>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg border transition ${
                  !selectedCategory
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                }`}
              >
                All
              </button>

              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    selectedCategory === cat
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Price Range:</span>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="flex-1"
              />
              <span className="text-sm font-medium">${priceRange[1]}</span>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory(null); setPriceRange([0, 2000]); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white flex flex-col hover:shadow-lg transition">
                  <a href={`/shop/${p.id}`}>
                    <OptimizedImage src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" />
                  </a>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <a href={`/shop/${p.id}`} className="font-semibold hover:underline">{p.name}</a>
                      <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">{p.category}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                    <div className="mt-3 font-semibold text-lg">${p.price.toFixed(2)}</div>
                    <div className="mt-auto pt-4 flex gap-2">
                      <Button size="sm" onClick={() => addItem(p, 1)} className="flex-1">Add to Cart</Button>
                      <a href={`/shop/${p.id}`} className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </MainLayout>
    </>
  );
};

export default ShopPage;
