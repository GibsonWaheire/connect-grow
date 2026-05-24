import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/shared/components/Header";
import { products } from "@/data/products";
import { Search, ShoppingCart, Check, SlidersHorizontal, X } from "lucide-react";
import { useCart } from "@/shared/contexts/CartContext";

const CATEGORIES = [
  "All",
  "Phones",
  "Laptops",
  "Desktops",
  "Tablets",
  "Smart Watches",
  "Earphones & Headphones",
  "Speakers",
  "Network Devices",
  "TVs & Displays",
  "Power & Accessories",
  "Gaming & Entertainment",
];

// Ordered list — first match wins, so put multi-word brands before single words
const KNOWN_BRANDS = [
  "Harman Kardon", "TP-Link", "HyperX",
  "Samsung", "Apple", "Tecno", "Infinix", "Xiaomi", "Nokia", "Realme",
  "Motorola", "Oppo", "Vivo", "Itel", "OnePlus", "Google", "ZTE", "Huawei",
  "HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "Microsoft",
  "MikroTik", "Ubiquiti", "JBL", "Sony", "Anker", "Bose", "Marshall",
  "Oraimo", "Sennheiser", "Garmin", "Fitbit", "Noise", "Huawei",
  "LG", "Hisense", "SanDisk", "Baseus", "Logitech", "PlayStation",
  "POCO", "Redmi",
];

const getBrand = (name: string): string => {
  const lower = name.toLowerCase();
  for (const brand of KNOWN_BRANDS) {
    if (lower.includes(brand.toLowerCase())) return brand;
  }
  return "Other";
};

// ─── Sort options ─────────────────────────────────────────────────────────────
type SortKey = "default" | "price-asc" | "price-desc" | "name";
const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name" },
];

// ─── Component ────────────────────────────────────────────────────────────────
const ShopPage = () => {
  const { addItem } = useCart();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState<SortKey>("default");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  // Sync ?cat= query param
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && CATEGORIES.includes(cat)) {
      setCategory(cat);
      setBrand("All");
    }
  }, [searchParams]);

  // Reset brand when category changes
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setBrand("All");
  };

  // Products in the selected category
  const categoryProducts = useMemo(
    () => products.filter(p => category === "All" || p.category === category),
    [category]
  );

  // Available brands for this category (only brands with products)
  const availableBrands = useMemo(() => {
    if (category === "All") return [];
    const brandSet = new Set(categoryProducts.map(p => getBrand(p.name)));
    return Array.from(brandSet).sort();
  }, [categoryProducts, category]);

  // Final filtered + sorted list
  const filtered = useMemo(() => {
    let list = categoryProducts.filter(p => {
      const matchBrand = brand === "All" || getBrand(p.name) === brand;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchSearch;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [categoryProducts, brand, search, sort]);

  const handleAdd = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    addItem(product, 1);
    setAddedIds(prev => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 2000);
  };

  const clearAll = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setSort("default");
  };

  const hasActiveFilter = search || category !== "All" || brand !== "All" || sort !== "default";

  return (
    <>
      <Header />
      <div className="pt-[88px] bg-gray-50 min-h-screen">

        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-0.5">Electronics Shop</h1>
            <p className="text-slate-500 text-sm">
              Phones, laptops, tablets, network devices & more — fast delivery across Kenya
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-7xl">

          {/* ── Search + Sort row ── */}
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-white outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-slate-700 focus:ring-2 focus:ring-slate-400 outline-none"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Category tabs — horizontally scrollable ── */}
          <div className="overflow-x-auto pb-1 mb-1 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border whitespace-nowrap ${
                    category === cat
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-gray-200 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Brand chips — only when a category is selected ── */}
          {category !== "All" && availableBrands.length > 1 && (
            <div className="overflow-x-auto pb-1 mb-5 mt-3 -mx-4 px-4">
              <div className="flex gap-2 min-w-max items-center">
                <span className="text-xs text-slate-400 font-medium shrink-0">Brand:</span>
                {["All", ...availableBrands].map(b => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border whitespace-nowrap ${
                      brand === b
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-500 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
                    }`}
                  >
                    {b === "All" ? "All Brands" : b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Results bar ── */}
          <div className="flex items-center justify-between mb-4 mt-4">
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-900">{filtered.length}</span>{" "}
              product{filtered.length !== 1 ? "s" : ""}
              {brand !== "All" && <span className="text-emerald-600"> · {brand}</span>}
              {category !== "All" && <span> in {category}</span>}
            </p>
            {hasActiveFilter && (
              <button
                onClick={clearAll}
                className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* ── Product grid ── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <p className="text-slate-500 mb-3">No products match your filters.</p>
              <button onClick={clearAll} className="text-emerald-600 text-sm font-medium underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
                >
                  {/* Image */}
                  <a href={`/shop/${p.id}`} className="relative block overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {p.badge}
                      </span>
                    )}
                    {p.originalPrice && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        -{Math.round((1 - p.price / p.originalPrice) * 100)}%
                      </span>
                    )}
                    {!p.inStock && (
                      <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-500">Out of Stock</span>
                      </div>
                    )}
                  </a>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                      {getBrand(p.name) !== "Other" ? getBrand(p.name) : p.category}
                    </span>
                    <a
                      href={`/shop/${p.id}`}
                      className="font-semibold text-slate-900 text-sm leading-snug hover:text-emerald-600 transition-colors mb-1 line-clamp-2"
                    >
                      {p.name}
                    </a>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base font-bold text-slate-900">
                          KES {p.price.toLocaleString()}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            KES {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAdd(p.id)}
                          disabled={!p.inStock}
                          className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-colors ${
                            addedIds.has(p.id)
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                              : "bg-slate-900 hover:bg-slate-800 text-white disabled:bg-gray-100 disabled:text-gray-400"
                          }`}
                        >
                          {addedIds.has(p.id) ? (
                            <><Check className="w-3.5 h-3.5" /> Added</>
                          ) : (
                            <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
                          )}
                        </button>
                        <a
                          href={`/shop/${p.id}`}
                          className="px-3 py-2 border border-gray-200 hover:border-slate-400 rounded-lg text-slate-500 hover:text-slate-900 transition-colors text-xs font-medium whitespace-nowrap"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
