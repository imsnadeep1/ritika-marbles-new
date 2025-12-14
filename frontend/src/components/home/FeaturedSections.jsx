import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedCard = ({ title, subtitle, linkTo, linkText }) => (
  <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#7B2D3A] via-[#5A1F2A] to-[#7B2D3A] aspect-[4/3]">
    {/* Decorative pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="featured-pattern" patternUnits="userSpaceOnUse" width="60" height="60">
            <path d="M30,0 L60,30 L30,60 L0,30 Z" stroke="#D4A853" strokeWidth="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#featured-pattern)"/>
      </svg>
    </div>
    
    {/* Center logo */}
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
      <img src="/logo.svg" alt="" className="w-40 h-40" />
    </div>
    
    {/* Decorative corners */}
    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4A853]" />
    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4A853]" />
    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4A853]" />
    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4A853]" />
    
    {/* Content overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#5A1F2A]/90 via-transparent to-transparent flex flex-col justify-end p-8">
      <p className="text-[#D4A853] text-sm font-medium mb-2 tracking-widest">{subtitle}</p>
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{title}</h3>
      <Link to={linkTo}>
        <Button className="bg-[#D4A853] hover:bg-[#B8923F] text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
          {linkText}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  </div>
);

const FeaturedSections = () => {
  return (
    <section className="py-20 bg-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-[#7B2D3A] italic leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            "Transform your space into a sanctuary of beauty and harmony with our exquisite products, 
            where elegance meets enchantment."
          </p>
        </div>

        {/* Two Column Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <FeaturedCard 
            title="BEAUTY AND INSPIRATION"
            subtitle="BRING HOME"
            linkTo="/collections/handicrafts"
            linkText="EXPLORE"
          />
          <FeaturedCard 
            title="SPACE ENHANCEMENT"
            subtitle="EXQUISITE"
            linkTo="/collections/wall-panels"
            linkText="EXPLORE"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
