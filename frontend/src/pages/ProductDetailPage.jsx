import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/mock';
import { ChevronRight, Check, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/data/mock';
import ProductPlaceholder from '@/components/ui/ProductPlaceholder';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#7B2D3A]">Product Not Found</h1>
          <Link to="/" className="text-[#D4A853] hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-[#FDF8F3] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-gray-500 hover:text-[#7B2D3A]">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to={`/category/${category?.slug}`} className="text-gray-500 hover:text-[#7B2D3A]">
                {category?.name}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#7B2D3A] font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                  {hasImages ? (
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProductPlaceholder name={product.name} price={product.price} />
                  )}
                </div>
                {hasImages && product.images.length > 1 && (
                  <div className="flex gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-[#7B2D3A]' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#7B2D3A] mb-2">{product.name}</h1>
                  <p className="text-[#D4A853] text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#7B2D3A]">Features:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-5 h-5 text-[#D4A853]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-gray-600">
                    {product.inStock ? 'In Stock' : 'Made to Order'}
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I'm interested in ${product.name}`}
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
                    <Button className="w-full bg-[#D4A853] hover:bg-[#B8923F] text-white py-3 rounded-full flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Call Now
                    </Button>
                  </a>
                </div>

                {/* Custom Note */}
                <div className="bg-[#FDF8F3] rounded-xl p-6 border border-[#D4A853]/20">
                  <h3 className="font-semibold text-[#7B2D3A] mb-2">Custom Orders Welcome</h3>
                  <p className="text-gray-600 text-sm">
                    We can create custom sizes and designs based on your requirements. 
                    Contact us to discuss your specifications and get a personalized quote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#7B2D3A] mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.filter(p => p.id !== product.id).slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-square overflow-hidden">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <ProductPlaceholder name={item.name} price={item.price} />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#7B2D3A] text-sm line-clamp-2 mb-1">{item.name}</h3>
                    <p className="text-[#D4A853] font-bold">₹{item.price.toLocaleString()}</p>
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
