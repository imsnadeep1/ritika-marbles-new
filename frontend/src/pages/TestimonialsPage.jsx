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
        <section className="bg-[#1a5d4c] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
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
