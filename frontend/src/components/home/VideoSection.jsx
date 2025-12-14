import React from 'react';

const VideoSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Video Placeholder - Using gradient as video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5A1F2A] via-[#7B2D3A] to-[#5A1F2A]">
        <div className="absolute inset-0 bg-[url('https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor.jpg')] bg-cover bg-center opacity-20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#D4A853] font-light italic leading-relaxed">
          "Crafted with Passion, Made with Precision, Delivered with Pride"
        </h2>
      </div>
    </section>
  );
};

export default VideoSection;
