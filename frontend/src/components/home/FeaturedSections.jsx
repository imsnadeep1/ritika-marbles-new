import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedSections = () => {
  return (
    <section className="py-20 bg-[#F8F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
            Curated shopping edits
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F3D36] mb-5">
            Shop by room, ritual, or occasion
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explore handpicked marble collections designed for home temples, festive gifting, heritage interiors, and statement decor.
          </p>
        </div>

        {/* Two Column Features */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Bring Home */}
          <div className="relative group overflow-hidden rounded-[2rem] shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/products/decor.png"
                alt="Marble Handicrafts"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#10221E]/95 via-[#1F3D36]/45 to-transparent flex flex-col justify-end p-8">
              <p className="text-[#F8D98E] text-sm font-bold uppercase tracking-[0.2em] mb-2">For home temples</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Idols crafted for daily worship</h3>
              <Link to="/collections/handicrafts">
                <Button className="bg-[#D4A853] hover:bg-[#B8923F] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
                  Shop collection
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Space Enhancement */}
          <div className="relative group overflow-hidden rounded-[2rem] shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/products/decor2.png"
                alt="Wall Panels"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#10221E]/95 via-[#1F3D36]/45 to-transparent flex flex-col justify-end p-8">
              <p className="text-[#F8D98E] text-sm font-bold uppercase tracking-[0.2em] mb-2">For premium interiors</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Decor that elevates every space</h3>
              <Link to="/collections/wall-panels">
                <Button className="bg-[#D4A853] hover:bg-[#B8923F] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
                  Shop decor
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
