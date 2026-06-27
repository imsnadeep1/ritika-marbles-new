import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, User, ShoppingCart } from 'lucide-react';
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
  const navigate = useNavigate();

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
    { label: 'CUSTOM ORDER', href: '/contact' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'GALLERY', href: '/testimonials' },
    { label: 'CONTACT US', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#c59633]/20 bg-[#030303]/95 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-4 md:h-[78px]">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <img src="/logo.svg" alt="Ritika Marbles Logo" className="h-10 w-10 rounded-xl object-contain sm:h-12 sm:w-12" />
            <div className="flex min-w-0 flex-col leading-none">
              <span className="truncate text-base font-semibold uppercase tracking-[0.08em] text-[#d8a642] sm:text-xl">
                RitikaMarbles.com
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.38em] text-[#b98a32] sm:text-[10px]">
                Crafted in stone
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-[11px] font-bold text-white/80 transition-colors hover:text-[#d8a642] xl:px-4">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-[70vh] overflow-y-auto rounded-2xl border border-[#d8a642]/20 bg-[#0b0b0b] p-2 shadow-2xl">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={`${item.label}-${subItem.label}`} asChild>
                        <Link to={subItem.href} className="cursor-pointer rounded-xl px-4 py-2 text-white/75 hover:bg-[#d8a642]/10 hover:text-[#d8a642]">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.label} to={item.href} className="px-3 py-2 text-[11px] font-bold text-white/80 transition-colors hover:text-[#d8a642] xl:px-4">
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => navigate('/god-statue')} className="hidden text-[#d8a642] transition-colors hover:text-white sm:inline-flex" aria-label="Search catalog">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/contact')} className="hidden text-[#d8a642] transition-colors hover:text-white md:inline-flex" aria-label="Account">
              <User className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/god-statue')} className="relative hidden text-[#d8a642] transition-colors hover:text-white md:inline-flex" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d8a642] text-[10px] font-bold text-black">
                0
              </span>
            </button>
            <Button onClick={() => navigate('/contact')} className="hidden rounded border border-[#d8a642]/70 bg-transparent px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-[#f6d082] shadow-[0_0_18px_rgba(216,166,66,0.12)] transition-all hover:bg-[#d8a642] hover:text-black sm:flex">
              Enquire Now
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-lg border border-[#d8a642]/30 p-2 text-[#d8a642] lg:hidden" aria-label="Toggle navigation">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#d8a642]/20 py-4 lg:hidden">
            <nav className="flex flex-col gap-2 rounded-2xl bg-white/[0.03] p-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-white/85 hover:bg-[#d8a642]/10">
                        {item.label}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="space-y-2 py-2 pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link key={`${item.label}-${subItem.label}`} to={subItem.href} className="block rounded-xl px-4 py-2 text-sm text-white/65 hover:bg-[#d8a642]/10 hover:text-[#d8a642]" onClick={() => setMobileMenuOpen(false)}>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.href} className="block rounded-xl px-4 py-3 text-sm font-bold text-white/85 hover:bg-[#d8a642]/10 hover:text-[#d8a642]" onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} className="mx-4 mt-4 rounded bg-[#d8a642] text-black hover:bg-[#f1c15a]">
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
