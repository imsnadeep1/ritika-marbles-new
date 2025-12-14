import React from 'react';
import { Sparkles } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#5A1F2A] via-[#7B2D3A] to-[#5A1F2A] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#D4A853]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#D4A853]/5 rounded-full blur-3xl" />
      
      {/* Decorative Border */}
      <div className="absolute inset-4 border border-[#D4A853]/20 rounded-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#D4A853]/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#D4A853]" />
            </div>
          </div>
          
          {/* Main Quote */}
          <blockquote className="space-y-6">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-light italic leading-relaxed">
              "Every masterpiece begins with a single chisel stroke. 
              <span className="text-[#D4A853]"> We're just getting started</span>, 
              crafting divine beauty one statue at a time."
            </p>
          </blockquote>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-[#D4A853]/50" />
            <div className="w-2 h-2 bg-[#D4A853] rounded-full" />
            <div className="w-16 h-px bg-[#D4A853]/50" />
          </div>
          
          {/* Sub Quote */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            At Ritika Marbles, we believe in the power of new beginnings. 
            With passion in our hearts and precision in our hands, 
            we're here to bring your divine visions to life.
          </p>
          
          {/* Signature */}
          <div className="pt-4">
            <p className="text-[#D4A853] font-semibold text-lg">— Ritika Marbles & Handicrafts</p>
            <p className="text-white/60 text-sm mt-1">A Fresh Journey in Divine Craftsmanship</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
