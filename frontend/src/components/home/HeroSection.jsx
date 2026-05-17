import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MessageCircle, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/mock';
import { defaultStorefrontContent, getStorefrontContent } from '@/services/storefrontContent';

const HeroSection = () => {
  const [bestseller, setBestseller] = useState(defaultStorefrontContent.bestseller);

  useEffect(() => {
    getStorefrontContent().then((content) => setBestseller(content.bestseller));
  }, []);

  return (
    <section className="relative bg-[radial-gradient(circle_at_top_left,#FFF7E8,transparent_35%),linear-gradient(135deg,#F9F3EA_0%,#FFFFFF_45%,#EAF3EF_100%)] min-h-[82vh] flex items-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#1F3D36]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-[#D4A853]/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#1F3D36]/10 rounded-full blur-2xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A853]/40 bg-white/80 px-4 py-2 text-sm font-semibold text-[#1F3D36] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#B8872F]" />
              Premium handcrafted marble store
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1F3D36] leading-tight">
                Shop marble idols, temples and decor
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Discover handcrafted Makrana marble pieces, compare collections, and request a custom quote directly from our Jaipur workshop.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/god-statue">
                <Button className="bg-[#1F3D36] hover:bg-[#152C27] text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 transition-all hover:gap-4 shadow-lg">
                  Shop bestsellers
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I want help choosing a marble product`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-[#D4A853] bg-white/80 text-[#1F3D36] hover:bg-[#FFF7E8] px-8 py-6 text-lg rounded-full flex items-center gap-2 shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                  Ask on WhatsApp
                </Button>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {[
                { icon: ShieldCheck, title: "Quality checked", text: "Premium marble" },
                { icon: Truck, title: "Safe shipping", text: "Packed with care" },
                { icon: Sparkles, title: "Custom made", text: "Size and finish" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-[#E8D9C5] bg-white/80 p-4 shadow-sm">
                    <Icon className="w-5 h-5 text-[#B8872F] mb-2" />
                    <p className="font-semibold text-[#1F3D36] text-sm">{item.title}</p>
                    <p className="text-slate-500 text-xs">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Ecommerce product preview */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-xl">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A853]/30 to-[#1F3D36]/10 rounded-full blur-3xl scale-125" />
              
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-2xl backdrop-blur">
                <div className="absolute left-6 top-6 z-20 rounded-full bg-[#1F3D36] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                  Best seller
                </div>
                <img
                  src={bestseller.imageUrl}
                  alt={bestseller.title}
                  className="relative z-10 max-h-[550px] object-contain drop-shadow-2xl rounded-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 rounded-3xl bg-white/95 p-4 shadow-xl border border-[#E8D9C5]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[#B8872F]">
                        {bestseller.subtitle}
                      </p>
                      <h3 className="text-lg font-semibold text-[#1F3D36]">{bestseller.title}</h3>
                    </div>
                    <Link to={bestseller.ctaHref || "/god-statue"}>
                      <Button className="rounded-full bg-[#D4A853] hover:bg-[#B8872F] text-white">
                        {bestseller.ctaLabel || "View"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Decorative Lotus Flowers */}
              <div className="absolute -left-4 top-1/3 w-16 h-16 opacity-70">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4A853]">
                  <ellipse cx="50" cy="50" rx="20" ry="40" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(60 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(120 50 50)" />
                </svg>
              </div>
              <div className="absolute -right-8 bottom-1/4 w-20 h-20 opacity-50">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#1F3D36]">
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
      <div className="hidden lg:block absolute left-4 bottom-20 bg-white rounded-2xl shadow-xl p-4 max-w-xs border-l-4 border-[#D4A853] animate-fade-in-up">
        <p className="text-[#1F3D36] text-sm font-semibold mb-2">
          Need help selecting the right idol size?
        </p>
        <p className="text-slate-500 text-xs">
          Share your space details and we will recommend the right marble product.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
