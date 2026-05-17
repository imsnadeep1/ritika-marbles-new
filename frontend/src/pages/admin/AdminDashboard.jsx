import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FolderOpen,
  MessageSquare,
  Package,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { getAllFeedback } from "@/services/feedback";
import { getAllReviews } from "@/services/reviews";
import ComingSoon from "@/components/ComingSoon";

const statCards = [
  { key: "categories", label: "Categories", icon: FolderOpen, color: "bg-emerald-50 text-emerald-700" },
  { key: "products", label: "Products", icon: Package, color: "bg-amber-50 text-amber-700" },
  { key: "feedback", label: "Customer requests", icon: MessageSquare, color: "bg-blue-50 text-blue-700" },
  { key: "pendingReviews", label: "Pending reviews", icon: Star, color: "bg-purple-50 text-purple-700" },
];

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [prod, cats, fb, rev] = await Promise.all([
          getProducts(),
          getCategories(),
          getAllFeedback(),
          getAllReviews(),
        ]);

        setProducts(prod || []);
        setCategories(cats || []);
        setFeedback(fb || []);
        setReviews(rev || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const counts = {
    categories: categories.length,
    products: products.length,
    feedback: feedback.length,
    pendingReviews: reviews.filter((review) => !review.approved).length,
  };

  const pendingFeedback = feedback.filter((item) => !item.approved);
  const recentProducts = [...products].slice(0, 5);
  const recentRequests = [...feedback].slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-gradient-to-br from-[#10221E] via-[#1F3D36] to-[#2F5D52] p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-[#F8D98E] text-sm font-bold uppercase tracking-[0.25em] mb-3">
              Admin overview
            </p>
            <h1 className="text-3xl md:text-4xl font-bold">Store management dashboard</h1>
            <p className="mt-3 max-w-2xl text-white/75">
              Track product readiness, customer activity, reviews, and quick catalog tasks from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/products" className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B8872F]">
              <Plus className="w-4 h-4" />
              Add product
            </Link>
            <Link to="/admin/feedback" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20">
              Review requests
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="rounded-3xl bg-white p-6 shadow-sm border border-[#DDE8E2]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-bold text-[#1F3D36]">
                    {loading ? "--" : counts[card.key]}
                  </p>
                </div>
                <div className={`rounded-2xl p-3 ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-sm border border-[#DDE8E2]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-[#1F3D36]">Recent products</h2>
              <p className="text-sm text-slate-500">Latest catalog items and prices.</p>
            </div>
            <Link to="/admin/products" className="text-sm font-semibold text-[#B8872F] hover:text-[#1F3D36]">
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <ComingSoon
                title="Products coming soon"
                description="Add products from the Products tab to populate this dashboard section."
                className="py-6"
              />
            ) : (
              recentProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-[#EEF3EF] p-3">
                  <img
                    src={product.image_url || "/images/placeholder.jpg"}
                    alt={product.name}
                    className="w-14 h-14 rounded-2xl object-cover bg-slate-100"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1F3D36] truncate">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.categories?.name || "Uncategorized"}</p>
                  </div>
                  <p className="font-bold text-[#B8872F]">₹{Number(product.price || 0).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm border border-[#DDE8E2]">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-[#B8872F]" />
            <h2 className="text-xl font-bold text-[#1F3D36]">Action queue</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-[#F8F1E8] p-4">
              <p className="text-2xl font-bold text-[#1F3D36]">{pendingFeedback.length}</p>
              <p className="text-sm text-slate-600">Customer requests waiting for review</p>
            </div>
            {recentRequests.length === 0 ? (
              <ComingSoon
                title="Requests coming soon"
                description="Customer inquiries and feedback will show here when visitors start submitting them."
                className="py-6"
              />
            ) : (
              recentRequests.map((item) => (
                <div key={item.id} className="border-b border-[#EEF3EF] pb-3 last:border-b-0">
                  <p className="font-semibold text-[#1F3D36]">{item.name || "Anonymous customer"}</p>
                  <p className="text-sm text-slate-500 line-clamp-2">{item.message || "No message provided"}</p>
                </div>
              ))
            )}
            <Link to="/admin/feedback" className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8872F] hover:text-[#1F3D36]">
              Open request inbox
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
