import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/mock';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-6 sm:gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse hover:animate-none"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </a>
      
      {/* Call Button */}
      <a
        href={`tel:${siteConfig.phone}`}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#D4A853] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Call Us"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;
