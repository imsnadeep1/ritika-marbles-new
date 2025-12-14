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
    <section className="py-20 bg-gradient-to-br from-[#f8f5f0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Why Choose Us</h2>
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
                <div className="w-20 h-20 mx-auto mb-4 bg-[#1a5d4c] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#154a3d] transition-all duration-300 shadow-lg">
                  <IconComponent className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-gray-800 font-semibold text-lg mb-2">{item.title}</h3>
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
