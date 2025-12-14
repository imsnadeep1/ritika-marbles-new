import React from 'react';

/**
 * WatermarkedImage - Displays an image with the Ritika Marbles logo as watermark
 */
const WatermarkedImage = ({ 
  src, 
  alt, 
  className = '',
  watermarkPosition = 'bottom-right', // 'bottom-right', 'bottom-left', 'center', 'top-right'
  watermarkSize = 'md' // 'sm', 'md', 'lg'
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const sizeClasses = {
    'sm': 'w-10 h-10',
    'md': 'w-14 h-14',
    'lg': 'w-20 h-20'
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {/* Watermark overlay */}
      <div className={`absolute ${positionClasses[watermarkPosition]} ${sizeClasses[watermarkSize]} bg-white/80 rounded-full p-1.5 shadow-lg backdrop-blur-sm`}>
        <img 
          src="/logo.svg" 
          alt="Ritika Marbles" 
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default WatermarkedImage;
