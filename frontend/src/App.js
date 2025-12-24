import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Public Pages */
import HomePage from "@/pages/HomePage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";
import GodStatuePage from "@/pages/GodStatuePage";
import CategoryPage from "@/pages/CategoryPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import TestimonialsPage from "@/pages/TestimonialsPage";

/* Admin Layout & Auth */
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminFeedback from '@/pages/admin/AdminFeedback';


/* Supabase-powered Admin Pages */
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import CategoriesAdmin from "@/pages/admin/CategoriesAdmin";
import FeedbackAdmin from "@/pages/admin/FeedbackAdmin";
import ReviewsAdmin from "@/pages/admin/ReviewsAdmin";
import EsteemedClientsAdmin from "@/pages/admin/EsteemedClientsAdmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/god-statue" element={<GodStatuePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/collections/:type" element={<CategoryPage />} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard */}
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />

            {/* Catalog Management */}
            <Route path="categories" element={<CategoriesAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />

            {/* Client Diaries (Reviews) */}
            <Route path="reviews" element={<ReviewsAdmin />} />

            {/* Esteemed Clients */}
            <Route path="clients" element={<EsteemedClientsAdmin />} />

            {/* Contact / Feedback */}
            <Route path="feedback" element={<FeedbackAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
