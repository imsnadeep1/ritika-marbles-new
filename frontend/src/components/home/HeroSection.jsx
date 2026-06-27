import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gem, HandHeart, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/mock';
import { defaultStorefrontContent, getStorefrontContent } from '@/services/storefrontContent';

const trustHighlights = [
  { icon: HandHeart, title: 'Handcrafted', text: 'By skilled artisans' },
  { icon: Gem, title: 'Premium Quality', text: 'Finest marble with lasting beauty' },
  { icon: Truck, title: 'Safe Delivery', text: 'Secure packaging, pan India delivery' },
  { icon: Sparkles, title: 'Divine Touch', text: 'Bringing peace, prosperity & positivity' },
];

const HeroSection = () => {
  const [bestseller, setBestseller] = useState(defaultStorefrontContent.bestseller);

  useEffect(() => {
    getStorefrontContent().then((content) => setBestseller(content.bestseller));
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(212,168,83,0.22),transparent_18%),radial-gradient(circle_at_48%_10%,rgba(255,255,255,0.14),transparent_14%),linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(6,7,7,0.92)_42%,rgba(10,7,4,0.45)_100%)]" />
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] bg-[radial-gradient(circle_at_60%_50%,rgba(212,168,83,0.28),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(178,118,28,0.14)_100%)]" />
      <div className="absolute left-[-8rem] top-12 hidden h-80 w-80 rounded-full border border-[#D4A853]/10 lg:block" />
      <div className="absolute left-[-6rem] top-20 hidden h-56 w-56 rounded-full border border-[#D4A853]/10 lg:block" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#d4a853_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-8 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-28 lg:pt-16">
        <div className="order-2 z-10 lg:order-1">
          <div className="mb-8 flex items-center gap-4 text-[#F2C66B]">
            <span className="h-px w-12 bg-[#D4A853]/60 sm:w-24" />
            <p className="text-sm font-medium uppercase tracking-[0.26em] sm:text-lg">Handcrafted with devotion</p>
          </div>

          <div className="flex gap-5 sm:gap-8">
            <div className="hidden pt-10 sm:flex sm:flex-col sm:items-center sm:gap-5">
              <span className="font-semibold text-[#F2C66B]">01</span>
              <span className="h-20 w-px bg-[#D4A853]" />
              <span className="text-white/90">02</span>
              <span className="text-white/90">03</span>
            </div>

            <div className="max-w-2xl">
              <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Timeless Marble Art,
                <span className="block bg-gradient-to-r from-[#F8D981] via-[#D4A853] to-[#FFF3C0] bg-clip-text text-transparent">
                  Crafted to Inspire
                </span>
              </h1>
              <div className="my-7 flex items-center gap-4 sm:my-9">
                <span className="h-px flex-1 bg-[#D4A853]/45" />
                <Sparkles className="h-5 w-5 text-[#D4A853]" />
                <span className="h-px flex-1 bg-[#D4A853]/45" />
              </div>
              <p className="max-w-xl text-base leading-8 text-white/82 sm:text-lg lg:text-xl">
                Exquisite marble idols, temples, and décor crafted by skilled artisans from Rajasthan. Bringing divinity, elegance and positivity to your space.
              </p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
                <Link to="/god-statue" className="w-full sm:w-auto">
                  <Button className="h-14 w-full rounded-md bg-gradient-to-r from-[#F6CF73] to-[#D4A853] px-7 text-sm font-bold uppercase tracking-wide text-black shadow-[0_18px_45px_rgba(212,168,83,0.28)] hover:from-[#FFE09A] hover:to-[#C99A3F] sm:w-auto">
                    Explore Collection
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I want to inquire about marble idols and custom orders`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="h-14 w-full rounded-md border-[#D4A853] bg-black/20 px-7 text-sm font-bold uppercase tracking-wide text-white backdrop-blur hover:bg-[#D4A853]/10 sm:w-auto">
                    <MessageCircle className="mr-3 h-5 w-5 text-[#F2C66B]" />
                    WhatsApp Inquiry
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-xl border border-white/16 bg-black/35 shadow-2xl backdrop-blur md:grid-cols-4 lg:max-w-3xl">
            {trustHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`p-4 text-center sm:p-5 ${index !== trustHighlights.length - 1 ? 'md:border-r md:border-white/14' : ''} ${index < 2 ? 'border-b border-white/14 md:border-b-0' : ''}`}>
                  <Icon className="mx-auto mb-3 h-8 w-8 text-[#D4A853]" />
                  <p className="text-xs font-bold uppercase text-[#F2C66B]">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/78">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-1 relative z-10 flex min-h-[390px] items-end justify-center lg:order-2 lg:min-h-[720px]">
          <div className="absolute bottom-0 left-1/2 h-[72%] w-[86%] -translate-x-1/2 rounded-full bg-[#D4A853]/20 blur-3xl" />
          <div className="absolute right-0 top-8 hidden h-[84%] w-[54%] rounded-l-full bg-[linear-gradient(120deg,rgba(255,255,255,0.18),rgba(212,168,83,0.08))] blur-sm lg:block" />
          <img
            src={bestseller.imageUrl || '/images/products/ganesh-new-top.png'}
            alt={bestseller.title || 'Handcrafted white marble Ganesh idol'}
            className="relative z-10 max-h-[420px] w-full max-w-[520px] object-contain object-bottom drop-shadow-[0_32px_35px_rgba(0,0,0,0.7)] sm:max-h-[560px] lg:max-h-[760px] lg:max-w-[720px] lg:translate-y-8 xl:max-w-[790px]"
          />
          <div className="absolute right-3 top-4 z-20 rounded-full border border-[#D4A853]/50 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#F2C66B] backdrop-blur sm:right-8 lg:top-16">
            <PackageCheck className="mr-2 inline h-4 w-4" />
            Best Seller
          </div>
          <div className="absolute bottom-3 left-2 z-20 hidden rounded-2xl border border-white/15 bg-black/45 p-4 text-sm text-white/80 backdrop-blur md:block lg:left-0 lg:bottom-16">
            <ShieldCheck className="mb-2 h-5 w-5 text-[#D4A853]" />
            Quality checked marble finish for devotional spaces.
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-20 overflow-hidden leading-none">
        <div className="mx-auto h-20 w-[115%] -translate-x-[7.5%] rounded-t-[50%] border-t-2 border-[#D4A853] bg-[linear-gradient(135deg,#fbf8f1,#eee7db)] sm:h-28 lg:h-36" />
        <div className="absolute inset-x-0 bottom-6 text-center sm:bottom-9 lg:bottom-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B8872F] sm:text-sm">Explore our collection</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111] sm:text-4xl lg:text-5xl">Marble Creations for Every Space</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
