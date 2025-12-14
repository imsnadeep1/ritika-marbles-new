import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/mock';
import { Button } from '@/components/ui/button';

const ProductsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-[#7B2D3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#D4A853] text-lg italic mb-2">This is what we do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4A853]">Our Products</h2>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg -ml-4 hidden md:flex border-[#D4A853]"
          >
            <ChevronLeft className="w-6 h-6 text-[#7B2D3A]" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg -mr-4 hidden md:flex border-[#D4A853]"
          >
            <ChevronRight className="w-6 h-6 text-[#7B2D3A]" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="flex-shrink-0 w-72 group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center bg-[#5A1F2A]">
                    <h3 className="text-white font-medium text-sm">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
