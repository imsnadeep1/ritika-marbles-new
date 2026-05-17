import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import ClientDiaries from '../components/home/ClientDiaries';
import EsteemedClients from '../components/home/EsteemedClients';
import { defaultStorefrontContent, getStorefrontContent } from '@/services/storefrontContent';


const TestimonialsPage = () => {
  const [content, setContent] = useState(defaultStorefrontContent.clientDiary);

  useEffect(() => {
    getStorefrontContent().then((data) => setContent(data.clientDiary));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#10221E] via-[#1F3D36] to-[#10221E] py-24">
          <div className="absolute left-8 top-8 h-40 w-40 rounded-full bg-[#D4A853]/10 blur-3xl" />
          <div className="absolute bottom-8 right-8 h-52 w-52 rounded-full bg-white/5 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#D4A853] text-sm font-bold uppercase tracking-[0.25em] mb-4">
              Customer stories
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>
        </section>

        {/* Admin Controlled Sections */}
        <ClientDiaries />
        <EsteemedClients />
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default TestimonialsPage;
