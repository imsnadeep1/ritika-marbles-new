import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig, navItems } from '@/data/mock';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-[#E8D9C5]">
      <div className="hidden md:block bg-[#1F3D36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
              Secure custom orders
            </span>
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4A853]" />
              Safe pan-India delivery
            </span>
          </div>
          <a href={`tel:${siteConfig.phone}`} className="text-[#F8E7C8] hover:text-white transition-colors">
            Talk to a marble expert: {siteConfig.phone}
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Ritika Marbles Logo" className="w-14 h-14 rounded-2xl shadow-sm" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-[#1F3D36]">{siteConfig.name}</span>
              <span className="text-sm text-[#B8872F]">{siteConfig.tagline}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1F3D36] transition-colors">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-[#E8D9C5] shadow-xl rounded-2xl">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <Link
                          to={subItem.href}
                          className="cursor-pointer hover:bg-[#F8F1E8] hover:text-[#1F3D36] px-4 py-2 rounded-lg"
                        >
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#1F3D36] transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/god-statue')}
              className="hidden md:flex items-center gap-2 text-slate-600 hover:text-[#1F3D36] transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline text-sm font-medium">Search catalog</span>
            </button>
            <Button
              onClick={() => navigate('/god-statue')}
              className="hidden sm:flex bg-[#1F3D36] hover:bg-[#152C27] text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop collections
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#1F3D36]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8D9C5]">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-2 text-slate-700 cursor-pointer hover:bg-[#F8F1E8] rounded-xl">
                        {item.label}
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-6 py-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-slate-600 hover:text-[#1F3D36]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-slate-700 hover:bg-[#F8F1E8] rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button
                onClick={() => {
                  navigate('/contact');
                  setMobileMenuOpen(false);
                }}
                className="mx-4 mt-4 bg-[#1F3D36] hover:bg-[#152C27] text-white rounded-full"
              >
                Shop collections
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
