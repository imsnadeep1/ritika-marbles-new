import React from "react";
import { Award, Settings, Headphones, Truck, Grid } from "lucide-react";

const iconMap = {
  award: Award,
  settings: Settings,
  headphones: Headphones,
  truck: Truck,
  grid: Grid,
};

const whyChooseUs = [
  {
    id: 1,
    icon: "award",
    title: "Premium Craftsmanship",
    description: "Every sculpture is crafted with precision and passion.",
  },
  {
    id: 2,
    icon: "settings",
    title: "Fully Customizable",
    description: "Tailor any design to match your exact requirements.",
  },
  {
    id: 3,
    icon: "headphones",
    title: "Dedicated Support",
    description: "We guide you throughout your entire buying journey.",
  },
  {
    id: 4,
    icon: "truck",
    title: "Safe Shipping",
    description: "Your marble masterpiece reaches safely anywhere in India.",
  },
  {
    id: 5,
    icon: "grid",
    title: "Wide Product Range",
    description: "From idols to décor—everything under one roof.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
            Why shoppers trust us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F3D36]">
            A better way to buy custom marble
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Clear guidance, careful packing, and handcrafted products made for homes, temples, and premium interiors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {whyChooseUs.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div key={item.id} className="text-center group rounded-[1.5rem] border border-[#E8D9C5] bg-[#FFFBF5] p-5 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#1F3D36] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <IconComponent className="w-8 h-8 text-[#D4A853]" />
                </div>
                <h3 className="text-[#1F3D36] font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
