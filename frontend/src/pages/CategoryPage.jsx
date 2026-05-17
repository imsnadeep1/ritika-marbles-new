import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ChevronRight } from "lucide-react";

import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/products";
import ComingSoon from "@/components/ComingSoon";

const CategoryPage = () => {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load category + products
  useEffect(() => {
    async function loadData() {
      const categories = await getCategories();
      const products = await getProducts();

      setAllCategories(categories);

      // Find category by slug
      const selectedCategory = categories.find((c) => c.slug === slug);
      setCategory(selectedCategory);

      if (selectedCategory) {
        const filteredProducts = products.filter(
          (p) => p.category_id === selectedCategory.id
        );
        setCategoryProducts(filteredProducts);
      }

      setLoading(false);
    }

    loadData();
  }, [slug]);

  // If loading
  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <p className="text-xl text-gray-600">Loading category...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // If category not found
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
        <div className="bg-[#F8F1E8] py-4 border-b border-[#E8D9C5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-slate-500 hover:text-[#1F3D36]">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#1F3D36] font-medium">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
              Collection
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F3D36] mb-4">
              {category.name}
            </h1>
            <p className="text-slate-600 max-w-2xl text-lg">
              {category.description || "Explore our premium handcrafted items."}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-[#F8F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm ring-1 ring-[#E8D9C5] hover:-translate-y-1 hover:shadow-xl transition-all group"
                  >
                    <div className="aspect-square overflow-hidden bg-white relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[#1F3D36] px-3 py-1 text-xs font-bold text-white">
                        Inquire now
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#1F3D36] mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[#B8872F] font-bold">
                        ₹{product.price?.toLocaleString()}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-[#1F3D36]">
                        View details
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1F3D36] mb-8">
              Browse Other Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
