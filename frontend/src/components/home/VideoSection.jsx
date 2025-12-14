import React from 'react';

const VideoSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Video Placeholder - Using gradient as video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-light italic leading-relaxed">
          "Crafted with Passion, Made with Precision, Delivered with Pride"
        </h2>
      </div>
    </section>
  );
};

export default VideoSection;
