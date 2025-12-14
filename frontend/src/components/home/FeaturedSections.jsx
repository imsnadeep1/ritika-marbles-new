import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedSections = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
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
                src="https://img.freepik.com/free-photo/beautiful-decorative-colorful-marble-vase_181624-51426.jpg?w=800"
                alt="Marble Handicrafts"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <p className="text-[#c9a962] text-sm font-medium mb-2">BRING HOME</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">BEAUTY AND INSPIRATION</h3>
              <Link to="/collections/handicrafts">
                <Button className="bg-[#1a5d4c] hover:bg-[#154a3d] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
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
                src="https://img.freepik.com/free-photo/white-marble-texture-background_53876-63441.jpg?w=800"
                alt="Wall Panels"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <p className="text-[#c9a962] text-sm font-medium mb-2">EXQUISITE</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">SPACE ENHANCEMENT</h3>
              <Link to="/collections/wall-panels">
                <Button className="bg-[#1a5d4c] hover:bg-[#154a3d] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
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
