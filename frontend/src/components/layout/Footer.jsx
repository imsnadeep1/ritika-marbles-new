import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { siteConfig, navItems, categories } from '@/data/mock';

const Footer = () => {
  return (
    <footer className="bg-[#7B2D3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#D4A853] rounded-lg flex items-center justify-center">
                <span className="text-[#7B2D3A] font-bold text-lg">R</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{siteConfig.name}</h3>
                <p className="text-sm text-[#D4A853]">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Crafting exquisite marble statues and handicrafts with passion and precision. 
              We bring divine beauty to your spaces with our handcrafted masterpieces.
            </p>
            <div className="flex gap-4">
              <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-[#D4A853]/20 rounded-full flex items-center justify-center hover:bg-[#D4A853]/40 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-[#D4A853]/20 rounded-full flex items-center justify-center hover:bg-[#D4A853]/40 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={siteConfig.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-[#D4A853]/20 rounded-full flex items-center justify-center hover:bg-[#D4A853]/40 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#D4A853]">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-white/80 hover:text-[#D4A853] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#D4A853]">Our Products</h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} className="text-white/80 hover:text-[#D4A853] text-sm transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#D4A853]">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#D4A853]" />
                <span className="text-white/80 text-sm">{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#D4A853]" />
                <a href={`tel:${siteConfig.phone}`} className="text-white/80 hover:text-[#D4A853] text-sm transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#D4A853]" />
                <a href={`mailto:${siteConfig.email}`} className="text-white/80 hover:text-[#D4A853] text-sm transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D4A853]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-white/60 hover:text-[#D4A853] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-[#D4A853] text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
