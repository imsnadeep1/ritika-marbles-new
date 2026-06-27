import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, User, ShoppingBag as BagIcon } from 'lucide-react';
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

  const createCollectionMenu = (label, href, group) => ({
    label,
    href,
    dropdown: [
      ...getVisibleCategories(categories, { group, placement: 'show_in_nav' }).map((category) => ({
        label: category.name,
        href: getCategoryHref(category),
      })),
      { label: 'View All', href },
    ],
  });

  const menuItems = [
    navItems[0],
    createCollectionMenu('GOD STATUES', '/god-statue', CATEGORY_GROUPS.GOD_STATUES),
    createCollectionMenu('MARBLE COLLECTIONS', '/collections', CATEGORY_GROUPS.MARBLE_COLLECTIONS),
    ...navItems.slice(1),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4A853]/10 bg-black/90 text-white shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 lg:h-24">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src="/logo.svg" alt="Ritika Marbles Logo" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
            <div className="hidden flex-col sm:flex">
              <span className="text-lg font-medium uppercase tracking-[0.18em] text-[#F7CE75] lg:text-xl">{siteConfig.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4A853]">{siteConfig.tagline}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="group flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white/86 transition-colors hover:text-[#F2C66B]">
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl border border-[#D4A853]/30 bg-[#080808] p-2 text-white shadow-2xl">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={`${item.label}-${subItem.label}`} asChild>
                        <Link to={subItem.href} className="cursor-pointer rounded-lg px-4 py-2 text-sm text-white/84 hover:bg-[#D4A853]/12 hover:text-[#F2C66B]">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.label} to={item.href} className="relative px-3 py-2 text-xs font-bold uppercase tracking-wide text-white/86 transition-colors after:absolute after:bottom-0 after:left-3 after:h-px after:w-0 after:bg-[#D4A853] after:transition-all hover:text-[#F2C66B] hover:after:w-[calc(100%-1.5rem)]">
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={() => navigate('/god-statue')} className="hidden text-[#F2C66B] transition-transform hover:scale-110 md:inline-flex" aria-label="Search catalog">
              <Search className="h-6 w-6" />
            </button>
            <button onClick={() => navigate('/contact')} className="hidden text-[#F2C66B] transition-transform hover:scale-110 md:inline-flex" aria-label="Contact account team">
              <User className="h-6 w-6" />
            </button>
            <button onClick={() => navigate('/god-statue')} className="relative hidden text-[#F2C66B] transition-transform hover:scale-110 md:inline-flex" aria-label="Shopping inquiry bag">
              <BagIcon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A853] text-[10px] font-bold text-black">0</span>
            </button>
            <Button onClick={() => navigate('/contact')} className="hidden rounded-md border border-[#D4A853] bg-transparent px-6 py-5 text-xs font-bold uppercase tracking-wide text-[#F2C66B] hover:bg-[#D4A853] hover:text-black xl:inline-flex">
              Enquire Now
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#F2C66B]" aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#D4A853]/20 py-4">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-white/88 hover:bg-[#D4A853]/10">
                        {item.label}
                        <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="space-y-2 py-2 pl-6">
                        {item.dropdown.map((subItem) => (
                          <Link key={`${item.label}-${subItem.label}`} to={subItem.href} className="block px-4 py-2 text-sm text-white/70 hover:text-[#F2C66B]" onClick={() => setMobileMenuOpen(false)}>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.href} className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-white/88 hover:bg-[#D4A853]/10" onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Button onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} className="mx-4 mt-3 rounded-md bg-[#D4A853] text-black hover:bg-[#F2C66B]">
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
