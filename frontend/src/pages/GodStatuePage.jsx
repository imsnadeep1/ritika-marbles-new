import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { categories } from '@/data/mock';

const GodStatuePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[#7B2D3A] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#D4A853] mb-4">God Statues</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Explore our divine collection of handcrafted marble god statues, each piece created 
              with devotion and precision.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 bg-[#7B2D3A]">
                      <h3 className="text-white font-medium text-center">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Orders CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#7B2D3A] mb-4">Looking for Something Custom?</h2>
            <p className="text-gray-600 mb-8">
              We specialize in creating custom marble statues tailored to your specifications. 
              Contact us to discuss your unique requirements.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#D4A853] hover:bg-[#B8923F] text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Get Custom Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default GodStatuePage;
