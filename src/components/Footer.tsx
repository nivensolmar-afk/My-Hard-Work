import { CategorySlug } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectCategory: (category: CategorySlug) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenInfoModal: (topic: 'shipping' | 'faq' | 'privacy' | 'terms' | 'contact') => void;
}

export function Footer({
  onSelectCategory,
  onNavigateSection,
  onOpenInfoModal,
}: FooterProps) {
  return (
    <footer className="bg-[#242729] text-[#F4F1E9]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10 lg:pt-20 lg:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-[#F4F1E9]/12">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-4 pr-0 lg:pr-10">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="PAPRIVA Home"
              className="inline-block"
            >
              <BrandLogo tone="light" size="lg" />
            </a>
            <p className="mt-4 font-serif text-[20px] text-[#FAF9F6]/95 leading-snug">
              Where Every Idea Begins.
            </p>
            <p className="mt-2 text-[13px] tracking-[0.06em] uppercase text-[#D5C7AE]">
              Paper &bull; Creativity &bull; Everyday Essentials
            </p>
            <div className="mt-6 flex items-center gap-5 text-[13px] tracking-[0.06em] uppercase text-[#D5C7AE]">
              <button
                type="button"
                onClick={() => onOpenInfoModal('contact')}
                className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
              >
                Instagram
              </button>
              <span className="text-[#F4F1E9]/25" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => onOpenInfoModal('contact')}
                className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
              >
                Pinterest
              </button>
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#D5C7AE] mb-5">
              Shop
            </h3>
            <ul className="space-y-3 text-[14px] text-[#EAE5D9]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('notebooks')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Notebooks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('writing')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Writing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('art-color')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Art Supplies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('desk')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Desk Essentials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('new-arrivals')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — Information */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#D5C7AE] mb-5">
              Information
            </h3>
            <ul className="space-y-3 text-[14px] text-[#EAE5D9]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('brand-story')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('contact')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('shipping')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Shipping &amp; Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('faq')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('privacy')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('terms')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#D5C7AE] mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-[14px] text-[#EAE5D9]/85">
              <li>
                <a
                  href="mailto:hello@papriva.com"
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  hello@papriva.com
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('contact')}
                  className="hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  Customer Support
                </button>
              </li>
              <li className="pt-2 text-[13px] text-[#A69A89] leading-relaxed">
                412 Mercer St, Suite 2B
                <br />
                Portland, OR 97209
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-[#A69A89]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>&copy; 2026 PAPRIVA. All rights reserved.</span>
            <button
              type="button"
              onClick={() => onOpenInfoModal('privacy')}
              className="hover:text-[#F4F1E9] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => onOpenInfoModal('terms')}
              className="hover:text-[#F4F1E9] transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>

          <div
            aria-label="Accepted payment methods"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[#EAE5D9]/70"
          >
            <span className="border border-[#F4F1E9]/18 px-2 py-0.5 rounded-[2px]">Visa</span>
            <span className="border border-[#F4F1E9]/18 px-2 py-0.5 rounded-[2px]">Mastercard</span>
            <span className="border border-[#F4F1E9]/18 px-2 py-0.5 rounded-[2px]">Amex</span>
            <span className="border border-[#F4F1E9]/18 px-2 py-0.5 rounded-[2px]">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
