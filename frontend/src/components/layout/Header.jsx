import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories as fallbackCategories, siteConfig } from '@/data/mock';
import { getCategories } from '@/services/categories';
import { CATEGORY_GROUPS, getCategoryHref, getVisibleCategories } from '@/lib/categories';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const fallbackMenuCategories = fallbackCategories.map((category, index) => ({
  ...category,
  sort_order: category.sort_order ?? index + 1,
  menu_group: category.menu_group || (category.slug === 'temples' ? CATEGORY_GROUPS.MARBLE_COLLECTIONS : CATEGORY_GROUPS.GOD_STATUES),
}));

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState(fallbackMenuCategories);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data?.length) setCategories(data);
      })
      .catch((error) => console.error('Failed to load navigation collections:', error));
  }, []);

  const collectionLinks = [
    ...getVisibleCategories(categories, { placement: 'show_in_nav' }).slice(0, 7).map((category) => ({
      label: category.name,
      href: getCategoryHref(category),
    })),
    { label: 'View All Collections', href: '/collections' },
  ];

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections', dropdown: collectionLinks },
    { label: 'Custom Order', href: '/contact' },
    { label: 'About Us', href: '/about' },
    { label: 'Gallery', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => (href === '/' ? location.pathname === '/' : location.pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/10 bg-[#090909]/78 text-white shadow-[0_16px_42px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[86px] items-center justify-between gap-4 lg:h-[92px]">
          <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="RitikaMarbles.com home">
            <img src="/logo.svg" alt="Ritika Marbles Logo" className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-105 lg:h-16 lg:w-16" />
            <div className="flex flex-col leading-none">
              <span className="font-['Playfair_Display',Georgia,serif] text-lg font-semibold uppercase tracking-[0.12em] text-[#F5CD73] sm:text-xl">
                RITIKAMARBLES.COM
              </span>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
                Crafted in Stone
              </span>
            </div>
          </Link>

          <nav className="hidden items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className={`group relative flex items-center gap-1 px-4 py-3 text-xs font-bold uppercase tracking-[0.09em] transition-colors ${isActive(item.href) ? 'text-[#D4AF37]' : 'text-white/88 hover:text-[#D4AF37]'}`}>
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    <span className="absolute bottom-1 left-4 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-4 min-w-64 rounded-2xl border border-[#D4AF37]/25 bg-[#090909]/95 p-2 text-white shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={`${item.label}-${subItem.label}`} asChild>
                        <Link to={subItem.href} className="cursor-pointer rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-[#D4AF37]/12 hover:text-[#F5CD73]">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.label} to={item.href} className={`group relative px-4 py-3 text-xs font-bold uppercase tracking-[0.09em] transition-colors ${isActive(item.href) ? 'text-[#D4AF37]' : 'text-white/88 hover:text-[#D4AF37]'}`}>
                  {item.label}
                  <span className={`absolute bottom-1 left-4 h-px bg-[#D4AF37] transition-all duration-300 ${isActive(item.href) ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'}`} />
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3 text-[#F5CD73] sm:gap-4">
            <button onClick={() => navigate('/god-statue')} className="hidden rounded-full p-2 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-white md:inline-flex" aria-label="Search products">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/admin/login')} className="hidden rounded-full p-2 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-white md:inline-flex" aria-label="Account login">
              <User className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/god-statue')} className="hidden rounded-full p-2 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-white md:inline-flex" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/god-statue')} className="relative hidden rounded-full p-2 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-white md:inline-flex" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-black text-black">0</span>
            </button>
            <Button onClick={() => navigate('/contact')} className="hidden rounded-md border border-[#D4AF37] bg-transparent px-6 py-5 text-xs font-black uppercase tracking-[0.12em] text-[#F5CD73] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_28px_rgba(212,175,55,0.38)] xl:inline-flex">
              Enquire Now
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full p-2 text-[#F5CD73] transition-colors hover:bg-[#D4AF37]/10 lg:hidden" aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#D4AF37]/15 py-4">
            <nav className="flex flex-col gap-2 rounded-2xl border border-[#D4AF37]/15 bg-black/45 p-2 backdrop-blur-xl">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white/88 hover:bg-[#D4AF37]/10">
                        {item.label}
                        <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="space-y-1 py-2 pl-6">
                        {item.dropdown.map((subItem) => (
                          <Link key={`${item.label}-${subItem.label}`} to={subItem.href} className="block rounded-lg px-4 py-2 text-sm text-white/70 hover:bg-[#D4AF37]/10 hover:text-[#F5CD73]" onClick={() => setMobileMenuOpen(false)}>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.href} className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white/88 hover:bg-[#D4AF37]/10 hover:text-[#F5CD73]" onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} className="mx-4 my-3 rounded-md bg-[#D4AF37] text-xs font-black uppercase tracking-[0.12em] text-black hover:bg-[#F5CD73]">
                Enquire Now
              </Button>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mx-4 mb-3 rounded-md border border-[#D4AF37]/50 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-[#F5CD73]">
                WhatsApp Inquiry
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
