import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import VideoSection from "@/components/home/VideoSection";
import FeaturedSections from "@/components/home/FeaturedSections";
import StatsSection from "@/components/home/StatsSection";
import QuoteSection from "@/components/home/QuoteSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ErrorBoundary from "@/components/ErrorBoundary";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ErrorBoundary fallback={<div className="py-10 text-center">Unable to load some sections right now.</div>}>
          <HeroSection />
          <ProductsSection />
          <VideoSection />
          <FeaturedSections />
          <StatsSection />
          <QuoteSection />
          <WhyChooseUs />
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default HomePage;
