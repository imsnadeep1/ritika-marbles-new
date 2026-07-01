import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories as fallbackCategories, siteConfig, navItems } from '@/data/mock';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (data?.length) setCategories(data);
      })
      .catch((error) => console.error('Failed to load navigation collections:', error));
  }, []);

  const menuItems = [
    navItems[0],
    {
      label: 'COLLECTIONS',
      href: '/collections',
      dropdown: [
        ...getVisibleCategories(categories, { group: CATEGORY_GROUPS.GOD_STATUES, placement: 'show_in_nav' }).map((category) => ({
          label: category.name,
          href: getCategoryHref(category),
        })),
        ...getVisibleCategories(categories, { group: CATEGORY_GROUPS.MARBLE_COLLECTIONS, placement: 'show_in_nav' }).map((category) => ({
          label: category.name,
          href: getCategoryHref(category),
        })),
        { label: 'View All Collections', href: '/collections' },
      ],
    },
    { label: 'CUSTOM ORDER', href: '/contact?type=custom-order' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'CLIENTS', href: '/testimonials' },
    { label: 'BLOG', href: '/blog' },
    { label: 'CONTACT US', href: '/contact' },
  ];

  const submitSearch = (event) => {
    event?.preventDefault();
    const query = searchTerm.trim();
    if (!query) {
      setSearchOpen(true);
      return;
    }
    navigate(`/god-statue?q=${encodeURIComponent(query)}`);
    setSearchTerm('');
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${isHome ? 'fixed' : 'sticky'} top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#090909] shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500`}>
      <div className="border-b border-[#D4AF37]/15 bg-[#050505]/95">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <p className="py-1.5 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#F5D77A]/90">
            GSTIN: {siteConfig.gstNumber}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-4 md:h-[78px]">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <img src="/logo.svg" alt="Ritika Marbles Logo" className="h-10 w-10 rounded-xl object-contain sm:h-12 sm:w-12" />
            <div className="flex min-w-0 flex-col leading-none">
              <span className="truncate text-base font-semibold uppercase tracking-[0.08em] text-[#D4AF37] sm:text-xl">
                RitikaMarbles.com
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.38em] text-[#F5D77A]/80 sm:text-[10px]">
                Crafted in stone
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/35 px-2 py-1 shadow-[0_12px_36px_rgba(0,0,0,0.28)] backdrop-blur-md md:flex">
            {menuItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-[11px] font-bold text-white transition-colors [text-shadow:0_1px_8px_rgba(0,0,0,0.75)] hover:text-[#F5D77A] xl:px-4">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-[70vh] overflow-y-auto rounded-2xl border border-[#D4AF37]/20 bg-[#0b0b0b] p-2 shadow-2xl">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={`${item.label}-${subItem.label}`} asChild>
                        <Link to={subItem.href} className="cursor-pointer rounded-xl px-4 py-2 text-white/75 hover:bg-[#D4AF37]/10 hover:text-[#F5D77A]">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.label} to={item.href} className="px-3 py-2 text-[11px] font-bold text-white transition-colors [text-shadow:0_1px_8px_rgba(0,0,0,0.75)] hover:text-[#F5D77A] xl:px-4">
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={submitSearch} className="hidden items-center sm:flex">
              <div className={`flex items-center overflow-hidden rounded-full border border-[#D4AF37]/40 bg-black/30 transition-all duration-300 ${searchOpen ? 'w-44 px-3 lg:w-56' : 'w-9'}`}>
                <button type="submit" className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-[#D4AF37] transition-colors hover:text-white" aria-label="Search products" onClick={() => !searchOpen && setSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onBlur={() => !searchTerm && setSearchOpen(false)}
                  placeholder="Search products"
                  className={`w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none ${searchOpen ? 'block' : 'hidden'}`}
                />
              </div>
            </form>
            <Button onClick={() => navigate('/contact')} className="hidden rounded border border-[#D4AF37]/70 bg-transparent px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-[#F5D77A] shadow-[0_0_18px_rgba(212,175,55,0.14)] transition-all hover:bg-[#D4AF37] hover:text-black sm:flex">
              Enquire Now
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg border border-[#D4AF37]/30 p-2 text-[#D4AF37] lg:hidden" aria-label="Toggle navigation">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#D4AF37]/20 py-4 lg:hidden">
            <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/30 px-3">
              <Search className="h-5 w-5 flex-shrink-0 text-[#D4AF37]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </form>
            <nav className="flex flex-col gap-2 rounded-2xl bg-white/[0.03] p-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-white/85 hover:bg-[#D4AF37]/10">
                        {item.label}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="space-y-2 py-2 pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link key={`${item.label}-${subItem.label}`} to={subItem.href} className="block rounded-xl px-4 py-2 text-sm text-white/65 hover:bg-[#D4AF37]/10 hover:text-[#F5D77A]" onClick={() => setMobileMenuOpen(false)}>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.href} className="block rounded-xl px-4 py-3 text-sm font-bold text-white/85 hover:bg-[#D4AF37]/10 hover:text-[#F5D77A]" onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} className="mx-4 mt-4 rounded bg-[#D4AF37] text-black hover:bg-[#F5D77A]">
                Enquire Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
