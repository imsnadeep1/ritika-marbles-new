import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FFFBF5] via-[#FDF8F3] to-[#F5EDE4] min-h-[80vh] flex items-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#7B2D3A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#D4A853]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#D4A853]/5 rounded-full blur-2xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#7B2D3A] leading-tight">
                CRAFTING BEAUTY
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#D4A853] leading-tight">
                FROM STONE
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-lg">
              Discover our exquisite collection of handcrafted marble statues and handicrafts, 
              created by master artisans with decades of experience.
            </p>
            <Link to="/god-statue">
              <Button className="bg-[#7B2D3A] hover:bg-[#5A1F2A] text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 transition-all hover:gap-4 shadow-lg">
                EXPLORE
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Ganesh Image */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A853]/20 to-transparent rounded-full blur-3xl scale-150" />
              
              {/* Main Image */}
              <img
                src="https://www.pandeymarblemoorti.com/assets/front/images/ganesh.png"
                alt="Marble Ganesh Statue"
                className="relative z-10 max-h-[600px] object-contain drop-shadow-2xl"
              />
              
              {/* Decorative Lotus Flowers */}
              <div className="absolute -left-4 top-1/3 w-16 h-16 opacity-60">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4A853]">
                  <ellipse cx="50" cy="50" rx="20" ry="40" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(60 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(120 50 50)" />
                </svg>
              </div>
              <div className="absolute -right-8 bottom-1/4 w-20 h-20 opacity-60">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#7B2D3A]/30">
                  <ellipse cx="50" cy="50" rx="20" ry="40" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(60 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(120 50 50)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Popup */}
      <div className="hidden lg:block absolute left-4 bottom-20 bg-white rounded-lg shadow-xl p-4 max-w-xs border-l-4 border-[#D4A853] animate-fade-in-up">
        <p className="text-[#7B2D3A] text-sm font-medium mb-2">
          Welcome to Ritika Marbles & Handicraft – Jaipur's trusted name in divine marble art
        </p>
        <p className="text-gray-500 text-xs">
          Kindly let us know which Statue you are looking for?
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
