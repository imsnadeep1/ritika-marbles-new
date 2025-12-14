import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/mock';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
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
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#c9a962] uppercase tracking-wider mb-2">GALLERY</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Awards & Achievements</h2>
        </div>

        {/* Gallery Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg -ml-4 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg -mr-4 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
