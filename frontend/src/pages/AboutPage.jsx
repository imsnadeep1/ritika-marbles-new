import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { Award, Users, Clock, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#7B2D3A] via-[#5A1F2A] to-[#7B2D3A] py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Story
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              A legacy of divine marble craftsmanship, inspired by devotion and perfected by generations.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-[#FFFBF5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor.jpg"
                  alt="Our Workshop"
                  className="rounded-2xl shadow-2xl"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#7B2D3A]">
                  A Legacy of Excellence
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Ritika Marbles was founded with a vision to preserve and promote the ancient
                  art of marble sculpting. Rooted in Jaipur — the heart of India’s marble heritage —
                  our journey is guided by devotion, precision, and artistry.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Combining time-honored craftsmanship with modern techniques, our artisans
                  sculpt more than statues — they create timeless expressions of faith and beauty.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every piece leaving our workshop carries the soul of Rajasthan,
                  crafted to inspire devotion for generations to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#7B2D3A] mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Principles that guide every creation — from raw marble to divine masterpiece.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Premium Quality",
                  desc: "Only the finest Makrana marble and materials are used.",
                },
                {
                  icon: Users,
                  title: "Master Artisans",
                  desc: "Decades of sculpting expertise in every creation.",
                },
                {
                  icon: Clock,
                  title: "Timely Delivery",
                  desc: "On-time delivery without compromising craftsmanship.",
                },
                {
                  icon: Heart,
                  title: "Customer Devotion",
                  desc: "Every order handled with care, respect, and transparency.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center p-6 bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#D4A853]/20"
                >
                  <div className="w-16 h-16 bg-[#7B2D3A] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-[#D4A853]" />
                  </div>
                  <h3 className="font-semibold text-[#7B2D3A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="py-24 bg-gradient-to-br from-[#7B2D3A] to-[#5A1F2A] text-center">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-2xl md:text-3xl text-white italic leading-relaxed">
              “In every block of marble, we see divinity waiting to emerge —
              shaped by devotion, perfected by art.”
            </p>
            <p className="mt-6 text-[#D4A853] font-semibold">
              — Ritika Marbles & Handicrafts
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default AboutPage;
