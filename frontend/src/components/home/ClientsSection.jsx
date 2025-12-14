import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clients } from '@/data/mock';
import { Button } from '@/components/ui/button';

const ClientsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7B2D3A]">Our Clients</h2>
        </div>

        {/* Clients Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full shadow-lg -ml-4 hidden md:flex border-[#D4A853]"
          >
            <ChevronLeft className="w-6 h-6 text-[#7B2D3A]" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full shadow-lg -mr-4 hidden md:flex border-[#D4A853]"
          >
            <ChevronRight className="w-6 h-6 text-[#7B2D3A]" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth items-center justify-start"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex-shrink-0 text-center group"
              >
                <div className="w-40 h-24 bg-white rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#7B2D3A]/5 transition-colors border border-[#D4A853]/20 shadow-sm">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain p-4 grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <p className="text-sm text-[#7B2D3A] font-medium">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
