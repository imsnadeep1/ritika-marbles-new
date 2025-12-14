import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import VideoSection from '@/components/home/VideoSection';
import FeaturedSections from '@/components/home/FeaturedSections';
import StatsSection from '@/components/home/StatsSection';
import QuoteSection from '@/components/home/QuoteSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <VideoSection />
        <FeaturedSections />
        <StatsSection />
        <QuoteSection />
        <WhyChooseUs />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default HomePage;
