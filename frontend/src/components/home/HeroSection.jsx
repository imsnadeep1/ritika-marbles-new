import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Diamond, Flower2, HeartHandshake, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/mock';
import { defaultStorefrontContent, getStorefrontContent } from '@/services/storefrontContent';

const HeroSection = () => {
  const [bestseller, setBestseller] = useState(defaultStorefrontContent.bestseller);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    getStorefrontContent().then((content) => setBestseller(content.bestseller));
  }, []);

  useEffect(() => {
    setImageLoaded(Boolean(bestseller.imageUrl));
  }, [bestseller.imageUrl]);

  const assurances = [
    { icon: HeartHandshake, title: "Handcrafted", text: "By skilled artisans" },
    { icon: Diamond, title: "Premium quality", text: "Finest marble with lasting beauty" },
    { icon: Truck, title: "Safe delivery", text: "Secure packaging, pan India delivery" },
    { icon: Flower2, title: "Divine touch", text: "Bringing peace, prosperity and positivity" },
  ];

  return (
    <section className="relative isolate min-h-[calc(100vh-68px)] overflow-hidden bg-[#050505] text-white md:min-h-[calc(100vh-78px)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(217,165,64,0.28),transparent_18%),radial-gradient(circle_at_15%_10%,rgba(185,138,50,0.15),transparent_24%),linear-gradient(90deg,#050505_0%,#080706_45%,#17110a_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.74)_45%,rgba(0,0,0,0.2)_100%)]" />
      <div className="absolute -left-24 top-2 hidden h-96 w-96 rounded-full border border-[#d8a642]/10 lg:block" />
      <div className="hero-mandala absolute left-0 top-0 hidden h-full w-[31rem] opacity-[0.18] lg:block" />
      <div className="hero-sparkles absolute right-0 top-0 h-full w-1/2 opacity-80" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-68px)] w-full max-w-[1440px] items-center gap-8 px-4 pb-28 pt-10 sm:px-6 md:min-h-[calc(100vh-78px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:px-8 lg:pb-24 lg:pt-12">
        <div className="relative order-2 flex gap-4 sm:gap-7 lg:order-1">
          <div className="hidden pt-24 text-xs font-bold text-white/70 sm:block">
            <div className="flex flex-col items-center gap-5">
              <span className="text-[#d8a642]">01</span>
              <span className="h-16 w-px bg-[#d8a642]" />
              <span>02</span>
              <span>03</span>
            </div>
          </div>

          <div className="max-w-xl space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-[#d8a642]">
              <span className="h-px w-12 bg-[#d8a642]" />
              Handcrafted with devotion
            </div>

            <div className="space-y-4">
              <h1 className="text-[2.8rem] font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Timeless Marble Art,
                <span className="block text-[#d8a642]">Crafted to Inspire</span>
              </h1>
              <div className="mx-0 h-px w-56 bg-gradient-to-r from-[#d8a642] via-[#f6d082] to-transparent" />
              <p className="max-w-md text-sm leading-7 text-white/72 sm:text-base">
                Exquisite marble idols, temples, and decor crafted by skilled artisans from Rajasthan. Bringing divinity, elegance and positivity to your space.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link to="/god-statue" className="w-full sm:w-auto">
                <Button className="h-12 w-full rounded bg-[#d8a642] px-7 text-xs font-bold uppercase tracking-wide text-black shadow-[0_14px_35px_rgba(216,166,66,0.28)] transition-all hover:bg-[#f0c35c] sm:w-auto">
                  Explore collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I want help choosing a marble product`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" className="h-12 w-full rounded border-[#d8a642]/55 bg-black/20 px-6 text-xs font-bold uppercase tracking-wide text-white backdrop-blur hover:bg-[#d8a642] hover:text-black sm:w-auto">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp inquiry
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#d8a642]/20 bg-white/[0.04] p-3 backdrop-blur-md sm:grid-cols-4 sm:gap-0 sm:p-4">
              {assurances.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`p-3 ${index > 0 ? "sm:border-l sm:border-[#d8a642]/10" : ""}`}>
                    <Icon className="mb-3 h-6 w-6 text-[#d8a642]" />
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-[#f6d082]">{item.title}</p>
                    <p className="mt-2 text-[10px] leading-4 text-white/62">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative order-1 flex min-h-[360px] items-end justify-center lg:order-2 lg:min-h-[610px]">
          <div className="absolute bottom-4 right-0 h-72 w-72 rounded-full bg-[#d8a642]/20 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
          <div className="absolute right-4 top-6 hidden h-[76%] w-[54%] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(216,166,66,0.18))] blur-sm lg:block" />
          <div className="relative flex w-full max-w-[640px] items-end justify-center">
            {imageLoaded ? (
              <img
                src={bestseller.imageUrl}
                alt={bestseller.title}
                onError={() => setImageLoaded(false)}
                className="relative z-10 h-[360px] w-full object-contain object-bottom drop-shadow-[0_35px_50px_rgba(0,0,0,0.75)] sm:h-[500px] lg:h-[650px]"
              />
            ) : (
              <div className="relative z-10 flex h-[340px] w-[min(100%,26rem)] flex-col items-center justify-center rounded-[2rem] border border-[#d8a642]/25 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur sm:h-[500px]">
                <ShieldCheck className="mb-5 h-12 w-12 text-[#d8a642]" />
                <p className="text-2xl font-semibold text-white">{bestseller.title}</p>
                <p className="mt-3 text-sm text-white/65">Handcrafted marble idol</p>
              </div>
            )}
            <div className="absolute bottom-8 right-3 z-20 max-w-[12rem] rounded-2xl border border-[#d8a642]/25 bg-black/45 p-3 text-xs text-white/75 shadow-2xl backdrop-blur-md sm:right-10 sm:max-w-[14rem] sm:p-4">
              <p className="font-bold uppercase tracking-[0.18em] text-[#d8a642]">{bestseller.subtitle}</p>
              <p className="mt-1 font-semibold text-white">{bestseller.title}</p>
              <Link to={bestseller.ctaHref || "/god-statue"} className="mt-3 inline-flex text-[11px] font-bold uppercase text-[#f6d082]">
                {bestseller.ctaLabel || "View"} artwork
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-20 overflow-hidden">
        <div className="relative left-1/2 flex min-h-20 w-[140vw] -translate-x-1/2 items-end justify-center overflow-hidden rounded-t-[50%] bg-[#f7f1e7] px-4 pt-6 text-center shadow-[0_-12px_30px_rgba(0,0,0,0.25)] sm:min-h-24">
          <div className="pb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8a642] sm:text-xs">Explore our collection</p>
            <h2 className="text-2xl font-semibold leading-none text-[#1d1712] sm:text-3xl">Marble Creations for Every Space</h2>
            <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-[#d8a642] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
