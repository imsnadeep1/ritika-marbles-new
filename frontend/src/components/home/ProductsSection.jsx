import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categories";

const ProductsSection = () => {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Supabase
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
              Shop by collection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F3D36]">
              Find the perfect marble piece
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Browse curated categories for home temples, gifting, decor, and custom commissioned statues.
            </p>
          </div>
          <Link to="/god-statue">
            <Button className="bg-[#1F3D36] hover:bg-[#152C27] text-white rounded-full px-6 gap-2 w-fit">
              <ShoppingBag className="w-4 h-4" />
              Browse catalog
            </Button>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-80 rounded-[1.75rem] bg-[#F8F1E8] animate-pulse" />
            ))}
          </div>
        )}

        {/* No categories */}
        {!loading && categories.length === 0 && (
          <p className="text-center text-slate-600 text-lg">
            No categories available yet.
          </p>
        )}

        {/* Category Carousel */}
        {categories.length > 0 && (
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              onClick={() => scroll("left")}
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#FFF7E8] rounded-full shadow-lg -ml-4 hidden md:flex border-[#E8D9C5]"
            >
              <ChevronLeft className="w-6 h-6 text-[#1F3D36]" />
            </Button>

            <Button
              onClick={() => scroll("right")}
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#FFF7E8] rounded-full shadow-lg -mr-4 hidden md:flex border-[#E8D9C5]"
            >
              <ChevronRight className="w-6 h-6 text-[#1F3D36]" />
            </Button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="flex-shrink-0 w-72 group"
                >
                  <div className="bg-white rounded-[1.75rem] overflow-hidden shadow-sm ring-1 ring-[#E8D9C5] transition-all hover:-translate-y-2 hover:shadow-2xl duration-300">
                    <div className="aspect-square overflow-hidden relative bg-[#F8F1E8]">
                      <img
                        src={category.image_url || "/images/placeholder.jpg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#1F3D36] shadow-sm">
                        Collection
                      </div>
                    </div>

                    <div className="p-5 bg-white">
                      <h3 className="text-[#1F3D36] font-semibold text-base line-clamp-2 min-h-[3rem]">
                        {category.name}
                      </h3>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Explore designs</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#B8872F]">
                          Shop
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
