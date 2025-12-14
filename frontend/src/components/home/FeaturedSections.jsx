import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedSections = () => {
  return (
    <section className="py-20 bg-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-[#7B2D3A] italic leading-relaxed">
            "Transform your space into a sanctuary of beauty and harmony with our exquisite products, 
            where elegance meets enchantment."
          </p>
        </div>

        {/* Two Column Features */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Bring Home */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor.jpg"
                alt="Marble Handicrafts"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#7B2D3A]/90 via-[#7B2D3A]/40 to-transparent flex flex-col justify-end p-8">
              <p className="text-[#D4A853] text-sm font-medium mb-2">BRING HOME</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">BEAUTY AND INSPIRATION</h3>
              <Link to="/collections/handicrafts">
                <Button className="bg-[#D4A853] hover:bg-[#B8923F] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
                  EXPLORE
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Space Enhancement */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor2.jpg"
                alt="Wall Panels"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#7B2D3A]/90 via-[#7B2D3A]/40 to-transparent flex flex-col justify-end p-8">
              <p className="text-[#D4A853] text-sm font-medium mb-2">EXQUISITE</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">SPACE ENHANCEMENT</h3>
              <Link to="/collections/wall-panels">
                <Button className="bg-[#D4A853] hover:bg-[#B8923F] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
                  EXPLORE
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
