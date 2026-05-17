import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { getAllFeedback } from "@/services/feedback";

const StatsSection = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    feedback: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [products, categories, feedback] = await Promise.all([
        getProducts(),
        getCategories(),
        getAllFeedback(),
      ]);

      setStats({
        products: products.length,
        categories: categories.length,
        feedback: feedback.length,
      });
    }

    loadStats();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#FDF8F3] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center rounded-[2rem] bg-[#1F3D36] p-8 md:p-12 shadow-2xl">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-[#F8D98E] text-sm font-bold uppercase tracking-[0.25em]">
              Personal shopping support
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Not sure which marble piece fits your space?
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              Tell us your size, placement, budget, and preferred deity or decor style. Our team will guide you with options before you order.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-[#D4A853] hover:bg-[#B8872F] text-white px-8 py-3 rounded-full text-lg shadow-lg"
            >
              Get buying help
            </Button>
          </div>

          {/* Dynamic Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/10 rounded-2xl shadow-lg border border-white/15">
              <div className="text-4xl font-bold text-[#F8D98E] mb-2">
                {stats.products}
              </div>
              <p className="text-white/80 font-medium text-sm">Products</p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-2xl shadow-lg border border-white/15">
              <div className="text-4xl font-bold text-[#F8D98E] mb-2">
                {stats.categories}
              </div>
              <p className="text-white/80 font-medium text-sm">Categories</p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-2xl shadow-lg border border-white/15">
              <div className="text-4xl font-bold text-[#F8D98E] mb-2">
                {stats.feedback}
              </div>
              <p className="text-white/80 font-medium text-sm">Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
