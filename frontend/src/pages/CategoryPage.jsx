import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ChevronRight, MessageCircle, Search, SlidersHorizontal, ArrowRight } from "lucide-react";

import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/products";
import ComingSoon from "@/components/ComingSoon";
import { getVisibleCategories } from "@/lib/categories";
import { getProductCoverImage } from "@/lib/products";
import { siteConfig } from "@/data/mock";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

const CategoryPage = () => {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setSearch("");
    setSortBy("featured");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const categories = getVisibleCategories(await getCategories());
      const products = await getProducts();

      setAllCategories(categories);

      const selectedCategory = categories.find((c) => c.slug === slug);
      setCategory(selectedCategory);

      if (selectedCategory) {
        const filteredProducts = products.filter(
          (p) => p.category_id === selectedCategory.id
        );
        setCategoryProducts(filteredProducts);
      } else {
        setCategoryProducts([]);
      }

      setLoading(false);
    }

    loadData();
  }, [slug]);

  const displayedProducts = useMemo(() => {
    let items = [...categoryProducts];
    const query = search.trim().toLowerCase();

    if (query) {
      items = items.filter((p) =>
        [p.name, p.description]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(query))
      );
    }

    switch (sortBy) {
      case "price-asc":
        return items.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
      case "price-desc":
        return items.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      case "name":
        return items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      default:
        return items;
    }
  }, [categoryProducts, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-10 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="h-48 sm:h-64 rounded-[2rem] bg-[#F8F1E8] animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-[1.5rem] bg-[#F8F1E8] aspect-[3/4] animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#1F3D36]">
            Category Not Found
          </h1>
          <Link
            to="/"
            className="text-[#D4A853] hover:underline mt-4 inline-block"
          >
            Return to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-[#F8F1E8] py-3 sm:py-4 border-b border-[#E8D9C5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm overflow-x-auto">
              <Link to="/" className="text-slate-500 hover:text-[#1F3D36] shrink-0">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-[#1F3D36] font-medium truncate">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        {/* Category Hero */}
        <section className="relative overflow-hidden bg-[#1F3D36]">
          {category.image_url && (
            <img
              src={category.image_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#10221E]/90 via-[#1F3D36]/80 to-[#1F3D36]/60" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <p className="text-[#F8D98E] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
              Collection
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-white/80 max-w-2xl text-base sm:text-lg">
              {category.description || "Explore our premium handcrafted items."}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
              {categoryProducts.length} piece{categoryProducts.length === 1 ? "" : "s"} available
            </div>
          </div>
        </section>

        {/* Filters */}
        {categoryProducts.length > 0 && (
          <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E8D9C5] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search in this collection..."
                    className="w-full rounded-full border border-[#E8D9C5] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1F3D36] focus:ring-1 focus:ring-[#1F3D36]"
                  />
                </div>
                <div className="relative shrink-0">
                  <SlidersHorizontal className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto appearance-none rounded-full border border-[#E8D9C5] py-2.5 pl-10 pr-8 text-sm outline-none focus:border-[#1F3D36] bg-white"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {search && (
                <p className="mt-2 text-sm text-slate-500">
                  {displayedProducts.length} result{displayedProducts.length === 1 ? "" : "s"} for &ldquo;{search}&rdquo;
                </p>
              )}
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-8 sm:py-12 bg-[#F8F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categoryProducts.length > 0 ? (
              displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
                  {displayedProducts.map((product) => (
                    <article
                      key={product.id}
                      className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm ring-1 ring-[#E8D9C5] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                    >
                      <Link to={`/product/${product.slug}`} className="block">
                        <div className="aspect-square overflow-hidden bg-white relative">
                          <img
                            src={getProductCoverImage(product)}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-[#1F3D36] px-3 py-1 text-xs font-bold text-white">
                            Inquire now
                          </span>
                          {(product.in_stock ?? product.inStock) !== false && (
                            <span className="absolute right-3 top-3 rounded-full bg-green-500/90 px-2.5 py-1 text-[10px] font-bold text-white uppercase">
                              In stock
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#1F3D36] mb-2 line-clamp-2 group-hover:text-[#B8872F] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-[#B8872F] font-bold text-lg">
                            ₹{product.price?.toLocaleString()}
                          </p>
                          {product.description && (
                            <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <p className="mt-3 text-sm font-semibold text-[#1F3D36] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View details
                            <ArrowRight className="w-4 h-4" />
                          </p>
                        </div>
                      </Link>
                      <div className="px-4 pb-4">
                        <a
                          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white py-2.5 text-sm font-semibold transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Quick WhatsApp inquiry
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-slate-600 mb-4">No products match your search.</p>
                  <button
                    onClick={() => setSearch("")}
                    className="text-[#D4A853] hover:underline font-semibold"
                  >
                    Clear search
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <ComingSoon
                  title="Products coming soon"
                  description="This collection is ready, and products will appear here once they are added from the admin dashboard."
                />
                <Link
                  to="/"
                  className="text-[#D4A853] hover:underline mt-4 inline-block"
                >
                  Browse all categories
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D36] mb-6 sm:mb-8">
              Browse Other Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {allCategories
                .filter((c) => c.slug !== slug)
                .slice(0, 4)
                .map((cat) => (
                  <Link key={cat.id} to={`/category/${cat.slug}`} className="group">
                    <div className="aspect-square overflow-hidden rounded-[1.25rem] mb-3 shadow-md ring-1 ring-[#E8D9C5] relative">
                      <img
                        src={cat.image_url || "/images/placeholder.jpg"}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10221E]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white text-sm font-semibold inline-flex items-center gap-1">
                          Explore <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <h3 className="text-[#1F3D36] font-medium text-center text-sm sm:text-base group-hover:text-[#B8872F] transition-colors">
                      {cat.name}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default CategoryPage;
