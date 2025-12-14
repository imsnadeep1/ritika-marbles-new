import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { stats } from '@/data/mock';

const StatsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-[#FDF8F3] to-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#7B2D3A]">Come & Discuss</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Come & Discuss, where artisans craft dreams into reality, sculpting customized statues 
              that embody personal narratives. In the realm of Ritika Marbles, imagination takes form 
              as bespoke statues stand as unique symbols of individuality and expression.
            </p>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-[#7B2D3A] hover:bg-[#5A1F2A] text-white px-8 py-3 rounded-full text-lg shadow-lg"
            >
              Contact Us
            </Button>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#D4A853]/20"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#D4A853] mb-2">
                  {stat.value}+
                </div>
                <div className="text-sm text-[#7B2D3A] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
