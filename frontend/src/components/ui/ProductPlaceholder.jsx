import React from 'react';

/**
 * ProductPlaceholder - A styled placeholder for product images
 * Shows logo, product name, and price in an elegant card design
 */
const ProductPlaceholder = ({ 
  name, 
  price,
  className = '' 
}) => {
  return (
    <div 
      className={`relative w-full h-full bg-gradient-to-br from-[#FFFBF5] via-[#FDF8F3] to-[#FFFBF5] flex flex-col items-center justify-center p-6 ${className}`}
    >
      {/* Decorative border frame */}
      <div className="absolute inset-4 border-2 border-[#D4A853]/30 rounded-lg" />
      
      {/* Inner decorative corners */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#7B2D3A]" />
      <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#7B2D3A]" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[#7B2D3A]" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#7B2D3A]" />
      
      {/* Diamond pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamond-pattern" patternUnits="userSpaceOnUse" width="30" height="30">
              <rect width="30" height="30" fill="none"/>
              <path d="M15,0 L30,15 L15,30 L0,15 Z" stroke="#7B2D3A" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond-pattern)"/>
        </svg>
      </div>
      
      {/* Logo */}
      <div className="mb-3 relative z-10">
        <img 
          src="/logo.svg" 
          alt="Ritika Marbles" 
          className="w-16 h-16 opacity-80"
        />
      </div>
      
      {/* Product Name */}
      <div className="relative z-10 text-center px-4">
        <p className="text-[#D4A853] text-[10px] uppercase tracking-widest mb-1">
          Premium Collection
        </p>
        <h3 
          className="text-[#7B2D3A] font-bold text-sm leading-tight mb-2 line-clamp-2" 
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {name}
        </h3>
        {price && (
          <p className="text-[#7B2D3A] font-semibold text-lg">
            ₹{price.toLocaleString()}
          </p>
        )}
      </div>
      
      {/* Bottom lotus icon */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <svg className="w-6 h-4 text-[#D4A853]" viewBox="0 0 24 16" fill="currentColor">
          <ellipse cx="12" cy="14" rx="2" ry="4" opacity="0.8"/>
          <ellipse cx="8" cy="13" rx="2" ry="4" transform="rotate(-20 8 13)" opacity="0.6"/>
          <ellipse cx="16" cy="13" rx="2" ry="4" transform="rotate(20 16 13)" opacity="0.6"/>
        </svg>
      </div>
    </div>
  );
};

export default ProductPlaceholder;
