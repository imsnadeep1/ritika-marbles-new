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
    <section className="py-20 bg-gradient-to-br from-[#FDF8F3] to-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#7B2D3A]">
              Come & Discuss
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover divine marble artistry, handcrafted with precision and
              devotion. Let us bring your vision to life.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-[#7B2D3A] hover:bg-[#5A1F2A] text-white px-8 py-3 rounded-full text-lg shadow-lg"
            >
              Contact Us
            </Button>
          </div>

          {/* Dynamic Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#D4A853]/20">
              <div className="text-4xl font-bold text-[#D4A853] mb-2">
                {stats.products}
              </div>
              <p className="text-[#7B2D3A] font-medium text-sm">Products</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#D4A853]/20">
              <div className="text-4xl font-bold text-[#D4A853] mb-2">
                {stats.categories}
              </div>
              <p className="text-[#7B2D3A] font-medium text-sm">Categories</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#D4A853]/20">
              <div className="text-4xl font-bold text-[#D4A853] mb-2">
                {stats.feedback}
              </div>
              <p className="text-[#7B2D3A] font-medium text-sm">Feedback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
