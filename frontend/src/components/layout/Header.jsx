import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
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
    <header className="bg-[#FFFBF5] shadow-sm sticky top-0 z-50 border-b border-[#D4A853]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#7B2D3A] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-[#D4A853] font-bold text-xl">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-[#7B2D3A]">{siteConfig.name}</span>
              <span className="text-sm text-[#D4A853]">{siteConfig.tagline}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#7B2D3A] transition-colors">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#FFFBF5] border border-[#D4A853]/30 shadow-lg">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <Link
                          to={subItem.href}
                          className="cursor-pointer hover:bg-[#7B2D3A]/10 hover:text-[#7B2D3A] px-4 py-2"
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
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#7B2D3A] transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-gray-600 hover:text-[#7B2D3A] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Button
              onClick={() => navigate('/contact')}
              className="hidden sm:flex bg-[#D4A853] hover:bg-[#B8923F] text-white px-6 py-2 rounded-full font-medium transition-all shadow-md"
            >
              Get a quote
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#7B2D3A]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#D4A853]/20">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-2 text-gray-700 cursor-pointer hover:bg-[#7B2D3A]/5">
                        {item.label}
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-6 py-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#7B2D3A]"
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
                      className="block px-4 py-2 text-gray-700 hover:bg-[#7B2D3A]/5"
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
                className="mx-4 mt-4 bg-[#D4A853] hover:bg-[#B8923F] text-white rounded-full"
              >
                Get a quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
