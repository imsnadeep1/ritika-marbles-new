import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gem, HandHeart, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/mock';

const heroImage = '/images/products/gallery1.png';

const trustHighlights = [
  { icon: HandHeart, title: 'Handcrafted', text: 'By skilled artisans' },
  { icon: Gem, title: 'Premium Quality', text: 'Finest marble with lasting beauty' },
  { icon: Truck, title: 'Safe Delivery', text: 'Secure packaging, pan India delivery' },
  { icon: Sparkles, title: 'Divine Touch', text: 'Bringing peace, prosperity & positivity' },
];

const HeroSection = () => {
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-[#030405] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(3,4,4,0.96)_42%,rgba(20,13,4,0.7)_72%,rgba(41,25,8,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_17%_27%,rgba(212,168,83,0.2),transparent_13%),radial-gradient(circle_at_51%_25%,rgba(255,255,255,0.16),transparent_10%),radial-gradient(circle_at_73%_57%,rgba(212,168,83,0.24),transparent_27%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#d6aa52_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -left-28 top-8 hidden h-[410px] w-[410px] rounded-full border border-[#D4A853]/10 lg:block" />
      <div className="absolute -left-16 top-20 hidden h-[290px] w-[290px] rounded-full border border-[#D4A853]/10 lg:block" />
      <div className="absolute right-0 top-0 hidden h-full w-[36%] bg-[linear-gradient(90deg,transparent,rgba(255,227,164,0.13))] lg:block" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-[1440px] items-center gap-0 px-4 pb-28 pt-6 sm:px-6 md:pb-32 lg:grid-cols-[45%_55%] lg:px-8 lg:pb-36 lg:pt-0 xl:min-h-[860px]">
        <div className="order-2 z-20 animate-fade-up-premium lg:order-1 lg:pl-16 xl:pl-20">
          <div className="mb-6 flex max-w-md items-center gap-4 sm:mb-8">
            <p className="shrink-0 text-sm font-medium uppercase tracking-[0.22em] text-[#F4C967] sm:text-lg">
              Handcrafted with Devotion
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#D4A853] to-transparent" />
          </div>

          <div className="flex items-start gap-5 sm:gap-8">
            <div className="hidden pt-16 sm:flex sm:flex-col sm:items-center sm:gap-5">
              <span className="text-lg font-semibold text-[#F2C66B]">01</span>
              <span className="h-[76px] w-px bg-[#D4A853]" />
              <span className="text-lg text-white/92">02</span>
              <span className="text-lg text-white/92">03</span>
            </div>

            <div className="max-w-[650px]">
              <h1 className="font-['Playfair_Display',Georgia,serif] text-[3.45rem] font-medium leading-[0.93] tracking-[-0.045em] text-white drop-shadow-[0_8px_22px_rgba(0,0,0,0.55)] sm:text-[5rem] lg:text-[5.7rem] xl:text-[6.65rem]">
                Timeless Marble Art,
                <span className="block bg-gradient-to-r from-[#FBE59C] via-[#D4A853] to-[#B9822D] bg-clip-text text-transparent">
                  Crafted to Inspire
                </span>
              </h1>

              <div className="my-6 flex max-w-[440px] items-center gap-4 sm:my-8">
                <span className="h-px flex-1 bg-[#D4A853]/55" />
                <Sparkles className="h-5 w-5 text-[#D4A853]" />
                <span className="h-px flex-1 bg-[#D4A853]/55" />
              </div>

              <p className="max-w-[570px] text-[1.05rem] leading-8 text-white/88 sm:text-xl sm:leading-9">
                Exquisite marble idols, temples, and décor crafted by skilled artisans from Rajasthan. Bringing divinity, elegance and positivity to your space.
              </p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4 lg:mt-10">
                <Link to="/god-statue" className="w-full sm:w-auto">
                  <Button className="h-14 w-full rounded-md bg-gradient-to-r from-[#F7D277] to-[#D5A446] px-7 text-sm font-bold uppercase tracking-wide text-black shadow-[0_18px_44px_rgba(212,168,83,0.32)] hover:from-[#FFE4A1] hover:to-[#C89636] sm:w-auto">
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
                  <Button variant="outline" className="h-14 w-full rounded-md border-[#D4A853] bg-black/25 px-7 text-sm font-bold uppercase tracking-wide text-white backdrop-blur hover:bg-[#D4A853]/10 hover:text-white sm:w-auto">
                    <MessageCircle className="mr-3 h-5 w-5 text-[#F2C66B]" />
                    WhatsApp Inquiry
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-md border border-white/18 bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md md:grid-cols-4 lg:max-w-[590px] xl:max-w-[670px]">
            {trustHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`px-3 py-5 text-center ${index !== trustHighlights.length - 1 ? 'md:border-r md:border-white/14' : ''} ${index < 2 ? 'border-b border-white/14 md:border-b-0' : ''}`}>
                  <Icon className="mx-auto mb-3 h-9 w-9 stroke-[1.5] text-[#D4A853]" />
                  <p className="text-[11px] font-bold uppercase tracking-tight text-[#F2C66B]">{item.title}</p>
                  <p className="mx-auto mt-2 max-w-[120px] text-xs leading-5 text-white/78">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-1 relative z-10 flex min-h-[420px] animate-premium-float items-end justify-center overflow-visible lg:order-2 lg:min-h-[790px] lg:justify-end">
          <div className="absolute bottom-5 left-1/2 h-[70%] w-[76%] -translate-x-1/2 rounded-full bg-[#D4A853]/25 blur-3xl animate-gold-glow lg:bottom-20" />
          <div className="absolute bottom-0 right-[3%] h-[82%] w-[62%] rounded-l-full bg-[linear-gradient(118deg,rgba(255,255,255,0.16),rgba(212,168,83,0.06)_58%,transparent)] blur-[2px]" />
          <img
            src={heroImage}
            alt="White and gold handcrafted marble Ganesh idol with gold crown"
            className="relative z-10 w-[112%] max-w-[610px] translate-y-5 object-contain object-bottom drop-shadow-[0_38px_36px_rgba(0,0,0,0.82)] sm:max-w-[680px] md:w-full lg:max-w-[790px] lg:translate-x-16 lg:translate-y-14 xl:max-w-[900px] xl:translate-x-20"
          />
          <div className="absolute right-2 top-4 z-20 rounded-full border border-[#D4A853]/50 bg-black/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F2C66B] backdrop-blur sm:right-10 sm:top-10 lg:right-3 lg:top-20">
            <PackageCheck className="mr-2 inline h-4 w-4" />
            Best Seller
          </div>
          <div className="absolute bottom-10 left-2 z-20 hidden rounded-xl border border-white/15 bg-black/45 p-4 text-sm text-white/80 backdrop-blur md:block lg:bottom-24 lg:left-12">
            <ShieldCheck className="mb-2 h-5 w-5 text-[#D4A853]" />
            Quality checked marble finish for devotional spaces.
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-30 overflow-hidden leading-none">
        <div className="mx-auto h-[92px] w-[118%] -translate-x-[9%] rounded-t-[50%] border-t-2 border-[#D4A853] bg-[linear-gradient(135deg,#fbfaf6,#eee6d8)] shadow-[0_-16px_50px_rgba(0,0,0,0.28)] sm:h-32 lg:h-[150px]" />
        <div className="absolute inset-x-0 bottom-6 text-center sm:bottom-9 lg:bottom-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B8872F] sm:text-sm">Explore our collection</p>
          <h2 className="mt-2 font-['Playfair_Display',Georgia,serif] text-3xl font-medium tracking-[-0.035em] text-[#111] sm:text-4xl lg:text-5xl">Marble Creations for Every Space</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
