import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { Button } from "@/components/ui/button";

import { ChevronRight, Check, MessageCircle, Phone, Ruler, Truck, Sparkles } from "lucide-react";

import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";

import FeedbackForm from "@/components/FeedbackForm";
import ProductFeedbackList from "@/components/ProductFeedbackList";

import { siteConfig } from "@/data/mock"; // Keep siteConfig for WhatsApp/Phone

const ProductDetailPage = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  // ---------------- FETCH PRODUCT + CATEGORY DATA ----------------
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const products = await getProducts();
      const categories = await getCategories();

      const foundProduct = products.find((p) => p.slug === slug);
      setProduct(foundProduct);

      if (foundProduct) {
        const cat = categories.find((c) => c.id === foundProduct.category_id);
        setCategory(cat);

        // Related products (simple: same category or exclude itself)
        const sameCategory = products.filter(
          (p) => p.id !== foundProduct.id && p.category_id === foundProduct.category_id
        );
        const fallbackRelated = products.filter((p) => p.id !== foundProduct.id);
        setRelated((sameCategory.length ? sameCategory : fallbackRelated).slice(0, 4));
      } else {
        setCategory(null);
        setRelated([]);
      }

      setLoading(false);
    }

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <p className="text-xl text-gray-600">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // ---------------- PRODUCT NOT FOUND ----------------
  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#1F3D36]">
            Product Not Found
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

  const availabilityStatus = product.availability_status || ((product.in_stock ?? product.inStock ?? true) ? "stock_available" : "available_on_order");
  const isProductAvailable = availabilityStatus === "stock_available";
  const availabilityLabel = isProductAvailable ? "Stock available" : "Available on order";
  const productUrl = typeof window !== "undefined"
    ? `${window.location.origin}/product/${product.slug}`
    : `/product/${product.slug}`;
  const whatsappMessage = encodeURIComponent([
    "Hi, I'm interested in this product:",
    `Product: ${product.name}`,
    `Price: ₹${Number(product.price || 0).toLocaleString()}`,
    `Availability: ${availabilityLabel}`,
    category?.name ? `Category: ${category.name}` : null,
    product.description ? `Details: ${product.description}` : null,
    `Product link: ${productUrl}`,
  ].filter(Boolean).join("\n"));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-[#F8F1E8] py-4 border-b border-[#E8D9C5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-slate-500 hover:text-[#1F3D36]">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />

              {category && (
                <>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-slate-500 hover:text-[#1F3D36]"
                  >
                    {category.name}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </>
              )}

              <span className="text-[#1F3D36] font-medium">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product-first hero */}
        <section className="py-8 sm:py-12 bg-gradient-to-br from-white via-[#F8F1E8] to-[#F4F7F4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
              {/* Image Gallery */}
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="aspect-square overflow-hidden rounded-[2rem] bg-[#F8F1E8] ring-1 ring-[#E8D9C5] shadow-xl">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product purchase summary */}
              <div className="space-y-5 rounded-[2rem] border border-[#E8D9C5] bg-white/95 p-5 shadow-xl sm:p-7">
                <div>
                  <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
                    Ready to inquire
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#1F3D36] mb-3">
                    {product.name}
                  </h1>
                  <p className="text-[#B8872F] text-3xl font-bold">
                    ₹{Number(product.price).toLocaleString()}
                  </p>
                </div>

                {/* Availability */}
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF3EF] px-4 py-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isProductAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-[#1F3D36] font-semibold">
                    {availabilityLabel}
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-full flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Inquiry
                    </Button>
                  </a>
                  <a href={`tel:${siteConfig.phone}`} className="flex-1">
                    <Button className="w-full bg-[#1F3D36] hover:bg-[#152C27] text-white py-3 rounded-full flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Call Now
                    </Button>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-[#F8F1E8] p-4 text-sm text-[#1F3D36]">
                    <Sparkles className="mb-2 h-5 w-5 text-[#B8872F]" />
                    Handcrafted finish
                  </div>
                  <div className="rounded-2xl bg-[#F8F1E8] p-4 text-sm text-[#1F3D36]">
                    <Ruler className="mb-2 h-5 w-5 text-[#B8872F]" />
                    Custom sizing
                  </div>
                  <div className="rounded-2xl bg-[#F8F1E8] p-4 text-sm text-[#1F3D36]">
                    <Truck className="mb-2 h-5 w-5 text-[#B8872F]" />
                    Delivery support
                  </div>
                </div>

                <a href="#product-details" className="inline-flex text-sm font-bold text-[#B8872F] hover:text-[#1F3D36]">
                  View product details and features ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section id="product-details" className="py-12 bg-white scroll-mt-28 border-t border-[#E8D9C5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-[2rem] border border-[#E8D9C5] bg-white p-6 shadow-sm sm:p-8">
                <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">Product details</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D36] mb-4">About this piece</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {product.description || "Contact us for material, sizing, finish and customization guidance for this product."}
                </p>
              </div>

              {product.features?.length > 0 && (
                <div className="rounded-[2rem] border border-[#E8D9C5] bg-[#F8FBF9] p-6 shadow-sm sm:p-8">
                  <h3 className="font-semibold text-[#1F3D36] mb-4">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600">
                        <Check className="mt-0.5 w-5 h-5 shrink-0 text-[#B8872F]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 bg-[#F8F1E8] rounded-[2rem] p-6 border border-[#E8D9C5] sm:p-8">
              <h3 className="font-semibold text-[#1F3D36] mb-2">Custom Orders Welcome</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We can create custom sizes and designs based on your requirements. Contact us to discuss your specifications and get a personalized quote.
              </p>
            </div>

            {product.video_url && (
              <div className="mt-6 bg-white rounded-[2rem] p-5 border border-[#E8D9C5]">
                <h3 className="font-semibold text-[#1F3D36] mb-3">Product Video</h3>
                <video src={product.video_url} controls className="w-full rounded-xl bg-black">
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </section>

        {/* Customer Feedback Section */}
        <section className="py-12 bg-white border-t border-[#E8D9C5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1F3D36] mb-6">
              Customer Feedback
            </h2>

            {/* List of Reviews */}
            <ProductFeedbackList productId={product.id} />

            {/* Submit Feedback */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#1F3D36] mb-4">
                Leave a Review
              </h3>
              <FeedbackForm productId={product.id} />
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-[#F8F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1F3D36] mb-8">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.slug}`}
                  className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm ring-1 ring-[#E8D9C5] hover:-translate-y-1 hover:shadow-xl transition-all group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#1F3D36] text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#B8872F] font-bold">
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                  </div>
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

export default ProductDetailPage;
