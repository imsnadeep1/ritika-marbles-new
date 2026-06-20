import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";

import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/products";
import ComingSoon from "@/components/ComingSoon";
import { getVisibleCategories } from "@/lib/categories";

const getAvailabilityStatus = (product) =>
  product.availability_status ||
  ((product.in_stock ?? product.inStock ?? true) ? "stock_available" : "available_on_order");

const getAvailabilityLabel = (product) =>
  getAvailabilityStatus(product) === "stock_available" ? "Stock available" : "Available on order";

const CategoryPage = () => {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

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

  const visibleProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return [...categoryProducts]
      .filter((product) => {
        const matchesSearch = !query || [product.name, product.description, product.slug]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
        const matchesAvailability =
          availabilityFilter === "all" || getAvailabilityStatus(product) === availabilityFilter;
        return matchesSearch && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price || 0) - Number(b.price || 0);
        if (sortBy === "price-high") return Number(b.price || 0) - Number(a.price || 0);
        return (a.name || "").localeCompare(b.name || "");
      });
  }, [availabilityFilter, categoryProducts, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <p className="text-xl text-gray-600">Loading products...</p>
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
        <div className="bg-[#F8F1E8] py-4 border-b border-[#E8D9C5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap">
              <Link to="/" className="text-slate-500 hover:text-[#1F3D36]">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-[#1F3D36] font-medium">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-br from-[#F8F1E8] via-white to-[#F4F7F4] py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-2">
                  Shop first
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F3D36]">
                  {category.name}
                </h1>
                <p className="mt-3 text-slate-600">
                  {visibleProducts.length} product{visibleProducts.length === 1 ? "" : "s"} ready to explore
                </p>
              </div>
              <a href="#collection-details" className="inline-flex w-fit items-center rounded-full border border-[#D4A853] bg-white px-5 py-3 text-sm font-bold text-[#1F3D36] shadow-sm hover:bg-[#FFF7E8]">
                Read collection details
              </a>
            </div>

            <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-[#E8D9C5] bg-white/90 p-3 shadow-sm md:grid-cols-[1fr_auto_auto]">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products in this collection"
                  className="w-full rounded-full border border-[#DDE8E2] py-3 pl-11 pr-4 outline-none focus:border-[#1F3D36]"
                />
              </label>
              <label className="relative block">
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  value={availabilityFilter}
                  onChange={(event) => setAvailabilityFilter(event.target.value)}
                  className="w-full rounded-full border border-[#DDE8E2] py-3 pl-11 pr-10 outline-none focus:border-[#1F3D36] md:w-56"
                >
                  <option value="all">All availability</option>
                  <option value="stock_available">Stock available</option>
                  <option value="available_on_order">Available on order</option>
                </select>
              </label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-full border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36] md:w-48"
              >
                <option value="featured">Sort by name</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#F8F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categoryProducts.length > 0 ? (
              visibleProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
                  {visibleProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-[#E8D9C5] transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
                    >
                      <div className="aspect-square overflow-hidden bg-white relative">
                        <img
                          src={product.image_url || "/images/placeholder.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${
                          getAvailabilityStatus(product) === "stock_available"
                            ? "bg-[#1F3D36]"
                            : "bg-[#B8872F]"
                        }`}>
                          {getAvailabilityLabel(product)}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-semibold text-[#1F3D36] mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-[#B8872F] font-bold">
                          ₹{Number(product.price || 0).toLocaleString()}
                        </p>
                        <p className="mt-auto pt-4 text-sm font-semibold text-[#1F3D36] group-hover:text-[#B8872F]">
                          View details →
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <ComingSoon
                  title="No matching products"
                  description="Try a different search term or availability filter to keep browsing this collection."
                />
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

        <section id="collection-details" className="py-14 bg-white scroll-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-[#E8D9C5] bg-[#F8FBF9] p-6 sm:p-8">
              <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
                Collection details
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D36] mb-4">
                About {category.name}
              </h2>
              <p className="text-slate-600 max-w-3xl text-lg leading-relaxed">
                {category.description || "Explore our premium handcrafted items. Every piece can be discussed with our team for sizing, finish, placement and delivery guidance."}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1F3D36] mb-8">
              Browse Other Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {allCategories
                .filter((c) => c.slug !== slug)
                .slice(0, 4)
                .map((cat) => (
                  <Link key={cat.id} to={`/category/${cat.slug}`} className="group">
                    <div className="aspect-square overflow-hidden rounded-[1.25rem] mb-3 shadow-md ring-1 ring-[#E8D9C5]">
                      <img
                        src={cat.image_url || "/images/placeholder.jpg"}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-[#1F3D36] font-medium text-center group-hover:text-[#B8872F] transition-colors">
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
