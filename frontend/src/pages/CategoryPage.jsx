import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ChevronRight } from "lucide-react";

import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/products";

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
          <h1 className="text-3xl font-bold text-[#7B2D3A]">
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
        <div className="bg-[#FDF8F3] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-[#7B2D3A]">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#7B2D3A] font-medium">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[#7B2D3A] mb-4">
              {category.name}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              {category.description || "Explore our premium handcrafted items."}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#7B2D3A] mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[#D4A853] font-bold">
                        ₹{product.price?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found in this category.
                </p>
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
            <h2 className="text-3xl font-bold text-[#7B2D3A] mb-8">
              Browse Other Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {allCategories
                .filter((c) => c.slug !== slug)
                .slice(0, 4)
                .map((cat) => (
                  <Link key={cat.id} to={`/category/${cat.slug}`} className="group">
                    <div className="aspect-square overflow-hidden rounded-xl mb-3 shadow-md">
                      <img
                        src={cat.image_url || "/images/placeholder.jpg"}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-[#7B2D3A] font-medium text-center group-hover:text-[#D4A853] transition-colors">
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
