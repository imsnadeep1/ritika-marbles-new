import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/mock';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse hover:animate-none"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
      
      {/* Call Button */}
      <a
        href={`tel:${siteConfig.phone}`}
        className="w-14 h-14 bg-[#D4A853] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Call Us"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;
