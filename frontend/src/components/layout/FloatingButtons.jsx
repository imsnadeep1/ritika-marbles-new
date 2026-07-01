import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/mock';
import { getGeneralWhatsAppMessage, getProductWhatsAppUrl } from '@/lib/products';
import { getProducts } from '@/services/products';

const FloatingButtons = () => {
  const location = useLocation();
  const productSlug = location.pathname.match(/^\/product\/([^/]+)/)?.[1];
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productSlug) {
      setProduct(null);
      return;
    }

    let cancelled = false;
    getProducts()
      .then((products) => {
        if (cancelled) return;
        setProduct(products.find((item) => item.slug === productSlug) || { slug: productSlug });
      })
      .catch(() => {
        if (!cancelled) setProduct({ slug: productSlug });
      });

    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  const whatsappUrl = productSlug && product
    ? getProductWhatsAppUrl(product)
    : `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(getGeneralWhatsAppMessage())}`;

  return (
    <div className="fixed bottom-8 right-6 z-50 hidden flex-col gap-4 sm:flex">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse hover:animate-none"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

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
