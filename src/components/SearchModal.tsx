import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { CATEGORIES, EDITORIAL_ARTICLES, PRODUCTS } from '../data/catalog';
import { CategorySlug, EditorialArticle, Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: CategorySlug) => void;
  onSelectArticle: (article: EditorialArticle) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
  onSelectArticle,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const matchedProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      )
    : PRODUCTS.slice(0, 4);

  const matchedArticles = q
    ? EDITORIAL_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search store"
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-4"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/50 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-3xl bg-[#FAF9F6] text-[#242729] border border-[#242729]/15 shadow-xl max-h-[82vh] flex flex-col">
        {/* Search Input Header */}
        <div className="px-6 py-4 border-b border-[#242729]/12 flex items-center gap-3.5 bg-[#F4F1E9]">
          <Search className="h-5 w-5 text-[#41443D] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journals, fountain pens, gouache, desk trays..."
            className="w-full bg-transparent text-[16px] text-[#242729] placeholder:text-[#41443D]/55 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-2 -mr-2 text-[#242729] hover:text-[#41443D] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Search Results Body */}
        <div className="p-6 overflow-y-auto space-y-7">
          {/* Quick Department Links */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#41443D]/75 mb-3">
              Departments
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectCategory(cat.id);
                  }}
                  className="px-3 py-1.5 bg-[#EAE5D9] hover:bg-[#242729] hover:text-[#F4F1E9] rounded-[3px] text-[12px] text-[#242729] transition-colors cursor-pointer"
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Product Results */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#41443D]/75 mb-3">
              {q ? `Objects (${matchedProducts.length})` : 'Popular Objects'}
            </p>
            {matchedProducts.length === 0 ? (
              <p className="text-[14px] text-[#41443D] py-4">
                No products found matching &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="group flex items-center gap-3.5 p-2.5 border border-[#242729]/10 hover:border-[#242729]/40 bg-[#F4F1E9]/50 text-left transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-14 shrink-0 bg-[#EAE5D9] overflow-hidden">
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-[0.1em] text-[#41443D]/75 truncate">
                        {product.categoryLabel}
                      </p>
                      <p className="text-[14px] font-medium text-[#242729] truncate">
                        {product.name}
                      </p>
                      <p className="text-[13px] tabular-nums text-[#41443D]">
                        ${product.price}
                      </p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-[#41443D] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Editorial Matches */}
          {matchedArticles.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#41443D]/75 mb-3">
                Journal Notes
              </p>
              <div className="space-y-2">
                {matchedArticles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectArticle(article);
                    }}
                    className="w-full text-left p-3 border border-[#242729]/10 hover:border-[#242729]/40 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#41443D]/75">
                        {article.category} · {article.readTime}
                      </p>
                      <p className="font-serif text-[20px] text-[#242729]">
                        {article.title}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
