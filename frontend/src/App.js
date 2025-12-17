import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import GodStatuePage from '@/pages/GodStatuePage';
import CategoryPage from '@/pages/CategoryPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminLogin from '@/pages/admin/AdminLogin';
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import CategoriesAdmin from "@/pages/admin/CategoriesAdmin";
import FeedbackAdmin from "@/pages/admin/FeedbackAdmin";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/god-statue" element={<GodStatuePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/collections/:type" element={<CategoryPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="/admin/products" element={<ProductsAdmin />} />
            <Route path="/admin/categories" element={<CategoriesAdmin />} />
            <Route path="/admin/feedback" element={<FeedbackAdmin />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
