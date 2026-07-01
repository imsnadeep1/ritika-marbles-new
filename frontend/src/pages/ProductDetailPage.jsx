import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { Button } from "@/components/ui/button";

import { ChevronRight, Check, MessageCircle, Phone, Share2, Star, ArrowRight } from "lucide-react";

import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";

import FeedbackForm from "@/components/FeedbackForm";
import ProductFeedbackList from "@/components/ProductFeedbackList";

import { siteConfig } from "@/data/mock";
import { getProductCoverImage, getProductImages, getProductWhatsAppUrl } from "@/lib/products";

const ProductDetailPage = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setSelectedImage(0);
  }, [slug]);

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

        const rel = products
          .filter((p) => p.id !== foundProduct.id && p.category_id === foundProduct.category_id)
          .slice(0, 4);
        if (rel.length < 4) {
          const more = products
            .filter((p) => p.id !== foundProduct.id && !rel.find((r) => r.id === p.id))
            .slice(0, 4 - rel.length);
          rel.push(...more);
        }
        setRelated(rel);
      }

      setLoading(false);
    }

    loadData();
  }, [slug]);

  const handleShare = async () => {
    const shareData = {
      title: product?.name,
      text: `Check out ${product?.name} at Ritika Marbles`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="min-h-[280px] sm:min-h-[360px] lg:min-h-[480px] rounded-[2rem] bg-[#F8F1E8] animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-[#F8F1E8] rounded-lg animate-pulse" />
                <div className="h-6 w-1/3 bg-[#F8F1E8] rounded-lg animate-pulse" />
                <div className="h-24 bg-[#F8F1E8] rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const isProductAvailable = product.in_stock ?? product.inStock ?? true;
  const whatsappUrl = getProductWhatsAppUrl(product);
  const productImages = getProductImages(product);
  const activeImage = productImages[selectedImage] || getProductCoverImage(product);

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-[#F8F1E8] py-3 sm:py-4 border-b border-[#E8D9C5]">
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

              <span className="text-[#1F3D36] font-medium line-clamp-1">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product Detail Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[520px] max-h-[78vh] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-[#F8F1E8] ring-1 ring-[#E8D9C5] shadow-xl cursor-zoom-in p-4 sm:p-6 transition-transform duration-300 ${
                    imageZoomed ? "scale-[1.01]" : ""
                  }`}
                  onClick={() => setImageZoomed(!imageZoomed)}
                  onMouseEnter={() => setImageZoomed(true)}
                  onMouseLeave={() => setImageZoomed(false)}
                >
                  <img
                    src={activeImage}
                    alt={product.name}
                    className={`max-h-[min(72vh,680px)] w-full object-contain transition-transform duration-500 ${
                      imageZoomed ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>

                {productImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                    {productImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        className={`shrink-0 rounded-xl overflow-hidden border-2 bg-[#F8F1E8] transition-all ${
                          selectedImage === index
                            ? "border-[#B8872F] shadow-md"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-center text-xs text-slate-400 hidden sm:block">
                  {productImages.length > 1
                    ? "Select a photo to view the full image"
                    : "Full product image shown in original proportions"}
                </p>
              </div>

              {/* Product Info */}
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <p className="text-[#B8872F] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-2 sm:mb-3">
                    Product detail
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1F3D36] mb-3">
                    {product.name}
                  </h1>
                  <p className="text-[#B8872F] text-2xl sm:text-3xl font-bold">
                    ₹{Number(product.price).toLocaleString()}
                  </p>
                </div>

                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  {product.description}
                </p>

                {product.features && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#1F3D36]">Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-slate-600"
                        >
                          <Check className="w-5 h-5 text-[#B8872F] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF3EF] px-4 py-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isProductAvailable ? "bg-green-500" : "bg-orange-500"
                      }`}
                    />
                    <span className="text-[#1F3D36] font-semibold text-sm">
                      {isProductAvailable ? "In Stock" : "Made to Order"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E8D9C5] px-4 py-2 text-sm font-semibold text-[#1F3D36] hover:bg-[#F8F1E8] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                {/* CTA Buttons - desktop */}
                <div className="hidden lg:flex flex-col sm:flex-row gap-4 pt-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
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

                <div className="bg-[#F8F1E8] rounded-2xl p-5 sm:p-6 border border-[#E8D9C5]">
                  <h3 className="font-semibold text-[#1F3D36] mb-2">
                    Custom Orders Welcome
                  </h3>
                  <p className="text-slate-600 text-sm">
                    We can create custom sizes and designs based on your
                    requirements. Contact us to discuss your specifications
                    and get a personalized quote.
                  </p>
                </div>

                {product.video_url && (
                  <div className="bg-white rounded-2xl p-5 border border-[#E8D9C5]">
                    <h3 className="font-semibold text-[#1F3D36] mb-3">
                      Product Video
                    </h3>
                    <video
                      src={product.video_url}
                      controls
                      className="w-full rounded-xl bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Feedback Section */}
        <section id="reviews" className="py-10 sm:py-12 bg-white border-t border-[#E8D9C5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-[#B8872F]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F3D36]">
                Customer Feedback
              </h2>
            </div>

            <ProductFeedbackList productId={product.id} />

            <div className="mt-8">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1F3D36] mb-4">
                Leave a Review
              </h3>
              <FeedbackForm productId={product.id} />
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="py-12 sm:py-16 bg-[#F8F1E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1F3D36]">
                  You May Also Like
                </h2>
                {category && (
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm font-semibold text-[#B8872F] hover:text-[#1F3D36] inline-flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.slug}`}
                    className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm ring-1 ring-[#E8D9C5] hover:-translate-y-1 hover:shadow-xl transition-all group"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-[#F8F1E8] flex items-center justify-center p-3">
                      <img
                        src={getProductCoverImage(item)}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-medium text-[#1F3D36] text-sm line-clamp-2 mb-1 group-hover:text-[#B8872F] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[#B8872F] font-bold text-sm sm:text-base">
                        ₹{Number(item.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-[#E8D9C5] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-area-pb">
        <div className="flex gap-3 max-w-lg mx-auto">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-full flex items-center justify-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
          <a href={`tel:${siteConfig.phone}`} className="flex-1">
            <Button className="w-full bg-[#1F3D36] hover:bg-[#152C27] text-white py-2.5 rounded-full flex items-center justify-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              Call
            </Button>
          </a>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ProductDetailPage;
