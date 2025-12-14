import React from 'react';

/**
 * PlaceholderImage - A styled placeholder card with logo and text
 * Matches the Royal Gold & Deep Burgundy theme
 */
const PlaceholderImage = ({ 
  name, 
  className = '', 
  variant = 'default',
  showLogo = true 
}) => {
  // Different gradient variants matching the theme
  const variants = {
    default: 'from-[#7B2D3A] via-[#5A1F2A] to-[#7B2D3A]',
    gold: 'from-[#D4A853] via-[#B8923F] to-[#D4A853]',
    light: 'from-[#9E4A58] via-[#7B2D3A] to-[#9E4A58]',
    cream: 'from-[#FDF8F3] via-[#FFFBF5] to-[#FDF8F3]'
  };

  return (
    <div 
      className={`relative w-full h-full bg-gradient-to-br ${variants[variant]} flex flex-col items-center justify-center p-6 ${className}`}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4A853] opacity-60" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4A853] opacity-60" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4A853] opacity-60" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4A853] opacity-60" />
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="marble-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M0,20 Q10,10 20,20 T40,20" stroke="#D4A853" strokeWidth="0.5" fill="none"/>
              <path d="M0,30 Q15,20 30,30 T40,30" stroke="#fff" strokeWidth="0.3" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marble-pattern)"/>
        </svg>
      </div>
      
      {/* Logo */}
      {showLogo && (
        <div className="mb-4 relative z-10">
          <img 
            src="/logo.svg" 
            alt="Ritika Marbles" 
            className="w-20 h-20 opacity-90"
          />
        </div>
      )}
      
      {/* Category/Product Name */}
      <div className="relative z-10 text-center">
        <p className="text-[#D4A853] text-xs uppercase tracking-widest mb-2 font-medium">
          Ritika Marbles
        </p>
        <h3 className={`font-bold leading-tight ${variant === 'cream' ? 'text-[#7B2D3A]' : 'text-white'}`} style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
          {name}
        </h3>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />
    </div>
  );
};

export default PlaceholderImage;
