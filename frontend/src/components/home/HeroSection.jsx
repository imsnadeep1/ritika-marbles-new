import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Diamond, Flower2, HeartHandshake, MessageCircle, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/mock';

const heroIdolImage = "/images/products/ganesh_ji_hero.png";

const HeroSection = () => {
  const assurances = [
    { icon: HeartHandshake, title: "Handcrafted", text: "By skilled artisans" },
    { icon: Diamond, title: "Premium quality", text: "Finest marble with lasting beauty" },
    { icon: Truck, title: "Safe delivery", text: "Secure packaging, pan India delivery" },
    { icon: Flower2, title: "Divine touch", text: "Bringing peace, prosperity and positivity" },
  ];
  const particles = Array.from({ length: 18 }, (_, index) => index);

  return (
    <section className="luxury-hero relative isolate min-h-screen overflow-hidden bg-[#090909] text-white">
      <div className="luxury-temple-architecture absolute inset-0" />
      <div className="luxury-volumetric-rays absolute inset-0" />
      <div className="luxury-vignette absolute inset-0" />
      <div className="hero-mandala absolute -left-28 top-10 hidden h-[34rem] w-[34rem] opacity-[0.05] lg:block" />
      <div className="absolute right-[16%] top-[10%] h-64 w-64 rounded-full bg-[#F5D77A]/24 blur-[90px] lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle}
            className="gold-dust-particle"
            style={{
              "--x": `${8 + ((particle * 17) % 86)}%`,
              "--delay": `${particle * 0.28}s`,
              "--duration": `${7 + (particle % 6)}s`,
              "--size": `${2 + (particle % 4)}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-4 px-5 pb-20 pt-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:px-8 lg:pb-10 lg:pt-20 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 order-2 max-w-lg lg:order-1 lg:self-center xl:max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-3 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]"
          >
            <span className="h-px w-12 bg-[#D4AF37]" />
            Handcrafted With Devotion
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair text-[2.65rem] font-medium leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.2rem] xl:text-[4.65rem]"
          >
            Timeless Marble Art,
            <span className="gold-headline-gradient block">Crafted to Inspire</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75 }}
            className="mt-4 max-w-md font-inter text-[13px] leading-6 text-white/72 sm:text-sm xl:max-w-lg"
          >
            Exquisite marble idols, temples, sculptures, and decor handcrafted by skilled artisans from Rajasthan. Bringing divinity, elegance, and timeless craftsmanship into every space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mt-6 grid gap-3 sm:flex sm:flex-wrap"
          >
            <Link to="/god-statue" className="w-full sm:w-auto">
              <Button className="premium-gold-button h-12 w-full rounded-none px-8 py-6 font-inter text-xs font-bold uppercase tracking-[0.12em] text-black sm:w-auto">
                Explore Collection
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I want help choosing a marble product`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="h-12 w-full rounded-none border-[#D4AF37]/70 bg-black/20 px-8 py-6 font-inter text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md transition-all hover:border-[#F5D77A] hover:bg-[#D4AF37]/12 hover:text-[#F5D77A] sm:w-auto">
                <MessageCircle className="mr-3 h-4 w-4" />
                WhatsApp Inquiry
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {assurances.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6, borderColor: "rgba(245,215,122,0.5)" }}
                  className="premium-feature-card group min-h-20 p-3"
                >
                  <Icon className="mb-3 h-5 w-5 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
                  <p className="font-inter text-[10px] font-bold uppercase leading-tight tracking-[0.16em] text-[#F5D77A]">{item.title}</p>
                  <p className="mt-2 font-inter text-[10px] leading-4 text-white/58">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 70, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 flex min-h-[42vh] items-start justify-center lg:order-2 lg:min-h-[calc(100vh-5rem)] lg:justify-end lg:self-stretch"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 flex w-full max-w-[470px] items-start justify-center sm:max-w-[610px] lg:ml-auto lg:h-full lg:w-[60vw] lg:max-w-[860px] lg:justify-end"
          >
            <div className="absolute inset-x-10 top-[55%] h-32 rounded-full bg-black/70 blur-3xl lg:top-auto lg:bottom-10" />
            <img
              src={heroIdolImage}
              alt="White marble Ganesha idol with gold ornamentation"
              className="luxury-idol-image relative z-10 h-[45vh] min-h-[330px] w-full object-contain object-top drop-shadow-[0_40px_70px_rgba(0,0,0,0.9)] sm:h-[58vh] lg:h-full lg:max-h-[calc(100vh-4.5rem)] lg:min-h-[28rem] lg:object-[right_top]"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-20 overflow-hidden">
        <div className="relative flex min-h-20 w-full items-end justify-center overflow-hidden rounded-t-[48%] bg-[#f7f1e7] px-4 pt-6 text-center shadow-[0_-18px_55px_rgba(0,0,0,0.35)] sm:min-h-24">
          <div className="pb-3">
            <p className="font-inter text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-xs">Explore our collection</p>
            <h2 className="font-playfair text-2xl font-semibold leading-none text-[#1d1712] sm:text-3xl">Marble Creations for Every Space</h2>
            <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
