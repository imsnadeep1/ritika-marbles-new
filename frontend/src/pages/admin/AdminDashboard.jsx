import React, { useEffect, useState } from "react";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { getAllFeedback } from "@/services/feedback";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    async function load() {
      const prod = await getProducts();
      const cats = await getCategories();
      const fb = await getAllFeedback();

      setProducts(prod);
      setCategories(cats);
      setFeedback(fb);
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-3xl font-bold">{categories.length}</p>
          <p className="text-gray-600 mt-1">Categories</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-3xl font-bold">{products.length}</p>
          <p className="text-gray-600 mt-1">Products</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-3xl font-bold">{feedback.length}</p>
          <p className="text-gray-600 mt-1">Feedback Entries</p>
        </div>
      </div>

      {/* Latest Products */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Latest Products</h2>
        {products.slice(0, 5).map((p) => (
          <div key={p.id} className="border-b py-2">
            {p.name} - ₹{p.price}
          </div>
        ))}
      </div>

      {/* Latest Feedback */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Latest Feedback</h2>
        {feedback.slice(0, 5).map((f) => (
          <div key={f.id} className="border-b py-2">
            {f.name || "Anonymous"} — {f.message.slice(0, 40)}…
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
