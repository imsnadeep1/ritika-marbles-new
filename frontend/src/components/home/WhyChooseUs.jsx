import React from 'react';
import { Award, Settings, Headphones, Truck, Grid } from 'lucide-react';
import { whyChooseUs } from '@/data/mock';

const iconMap = {
  award: Award,
  settings: Settings,
  headphones: Headphones,
  truck: Truck,
  grid: Grid
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFFBF5] to-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#7B2D3A]">Why Choose Us</h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {whyChooseUs.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[#7B2D3A] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#5A1F2A] transition-all duration-300 shadow-lg">
                  <IconComponent className="w-9 h-9 text-[#D4A853]" />
                </div>
                <h3 className="text-[#7B2D3A] font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
