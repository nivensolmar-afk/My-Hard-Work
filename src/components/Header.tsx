import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { CategorySlug } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  isScrolled: boolean;
  activeCategory: CategorySlug;
  onGoHome: () => void;
  onSelectCategory: (category: CategorySlug) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export function Header({
  cartCount,
  isScrolled,
  activeCategory,
  onGoHome,
  onSelectCategory,
  onNavigateSection,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavAction = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  const navItems: { label: string; isActive?: boolean; action: () => void }[] = [
    {
      label: 'Shop',
      isActive: activeCategory === 'all',
      action: () => onSelectCategory('all'),
    },
    {
      label: 'Writing',
      isActive: activeCategory === 'writing',
      action: () => onSelectCategory('writing'),
    },
    {
      label: 'Paper',
      isActive: activeCategory === 'paper',
      action: () => onSelectCategory('paper'),
    },
    {
      label: 'Art & Color',
      isActive: activeCategory === 'art-color',
      action: () => onSelectCategory('art-color'),
    },
    {
      label: 'Workspace',
      isActive: activeCategory === 'desk',
      action: () => onSelectCategory('desk'),
    },
    {
      label: 'Our Story',
      action: () => onNavigateSection('brand-story'),
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-[#242729]/12 shadow-[0_4px_24px_rgba(36,39,41,0.06)]'
            : 'bg-[#F4F1E9] border-[#242729]/10'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 lg:h-[84px] flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Left: Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 -ml-2 text-[#242729] hover:text-[#41443D] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            aria-label="PAPRIVA Home"
            className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242729]"
          >
            <BrandLogo tone="dark" size="md" />
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center justify-center gap-7 xl:gap-9"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="group relative py-2 text-[13px] tracking-[0.06em] uppercase text-[#242729]/85 hover:text-[#242729] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242729]"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 bottom-1 h-[1px] bg-[#242729] transition-transform duration-200 origin-left w-full ${
                    item.isActive && activeCategory !== 'all'
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Zone 3: Utility Icons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="p-2.5 text-[#242729] hover:text-[#41443D] transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#242729]"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.6]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onOpenAccount}
              aria-label="Account and orders"
              className="hidden sm:flex p-2.5 text-[#242729] hover:text-[#41443D] transition-colors cursor-pointer min-w-[40px] min-h-[40px] items-center justify-center focus-visible:outline-2 focus-visible:outline-[#242729]"
            >
              <User className="h-[18px] w-[18px] stroke-[1.6]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-2.5 -mr-1.5 text-[#242729] hover:text-[#41443D] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#242729]"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.6]" aria-hidden="true" />
              <span
                className={`tabular-nums text-[12px] font-medium transition-transform duration-200 ${
                  cartCount > 0 ? 'text-[#242729]' : 'text-[#242729]/55'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      <div
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-[#242729]/45 backdrop-blur-[2px]"
        />
        <aside
          aria-label="Mobile navigation"
          className={`relative w-full max-w-[340px] h-full bg-[#F4F1E9] text-[#242729] border-r border-[#242729]/12 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#242729]/10">
            <BrandLogo tone="dark" size="sm" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 -mr-2 text-[#242729] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              <X className="h-5 w-5 stroke-[1.6]" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleNavAction(item.action)}
                    className="w-full text-left py-3.5 text-[22px] font-serif text-[#242729] border-b border-[#242729]/8 hover:text-[#41443D] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#242729]/12 space-y-3">
              <button
                type="button"
                onClick={() => handleNavAction(onOpenSearch)}
                className="w-full flex items-center gap-3 py-2.5 text-[14px] text-[#242729]/85 hover:text-[#242729] cursor-pointer"
              >
                <Search className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                <span>Search Collection</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavAction(onOpenAccount)}
                className="w-full flex items-center gap-3 py-2.5 text-[14px] text-[#242729]/85 hover:text-[#242729] cursor-pointer"
              >
                <User className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                <span>Account &amp; Orders</span>
              </button>
            </div>
          </nav>

          <div className="px-6 py-5 border-t border-[#242729]/10 text-[12px] text-[#41443D]/80">
            Free shipping on orders over $75
          </div>
        </aside>
      </div>
    </>
  );
}
