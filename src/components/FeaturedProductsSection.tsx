import { Search, X } from 'lucide-react';
import { CATEGORIES, MOOD_COLLECTIONS, PRODUCTS } from '../data/catalog';
import { CategorySlug, MoodCollection, Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';

interface FeaturedProductsSectionProps {
  activeCategory: CategorySlug;
  activeMood: MoodCollection['id'] | null;
  searchQuery: string;
  sortBy: SortOption;
  onSelectCategory: (cat: CategorySlug) => void;
  onClearMood: () => void;
  onChangeSearch: (query: string) => void;
  onChangeSort: (sort: SortOption) => void;
  onAddToCart: (product: Product, variantName: string) => void;
  onOpenProduct: (product: Product) => void;
}

export function FeaturedProductsSection({
  activeCategory,
  activeMood,
  searchQuery,
  sortBy,
  onSelectCategory,
  onClearMood,
  onChangeSearch,
  onChangeSort,
  onAddToCart,
  onOpenProduct,
}: FeaturedProductsSectionProps) {
  const filterTabs: { id: CategorySlug; label: string }[] = [
    { id: 'all', label: 'All Essentials' },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
  ];

  const normalizedSearch = searchQuery.trim().toLowerCase();

  // Filter products across the full catalog
  let filtered = PRODUCTS.filter((product) => {
    const matchesCat =
      activeCategory === 'all' ? true : product.category === activeCategory;
    const matchesMood = activeMood ? product.moods.includes(activeMood) : true;
    const matchesQuery = normalizedSearch
      ? product.name.toLowerCase().includes(normalizedSearch) ||
        product.categoryLabel.toLowerCase().includes(normalizedSearch) ||
        product.shortDescription.toLowerCase().includes(normalizedSearch) ||
        product.materials.toLowerCase().includes(normalizedSearch)
      : true;
    return matchesCat && matchesMood && matchesQuery;
  });

  // On default unfiltered 'featured' view without search, show the primary 8 studio essentials
  const isDefaultUnfiltered =
    activeCategory === 'all' &&
    !activeMood &&
    !normalizedSearch &&
    sortBy === 'featured';

  if (isDefaultUnfiltered) {
    filtered = filtered.filter((p) => !p.isNewArrival).slice(0, 8);
  }

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') {
      return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    }
    return 0;
  });

  const activeMoodObj = activeMood
    ? MOOD_COLLECTIONS.find((m) => m.id === activeMood)
    : null;

  const hasActiveFilters =
    activeCategory !== 'all' ||
    Boolean(activeMood) ||
    Boolean(normalizedSearch) ||
    sortBy !== 'featured';

  return (
    <section
      id="featured-products"
      className="bg-[#F4F1E9] py-20 lg:py-28 border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#242729]/12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#526878] font-medium mb-3">
                Featured Objects
              </p>
              <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] font-normal text-[#242729] [text-wrap:balance]">
                Made for the way you think.
              </h2>
            </div>
            <p className="text-[15px] sm:text-[17px] text-[#41443D] max-w-md leading-relaxed">
              Everyday essentials. A little more thoughtfully made.
            </p>
          </div>
        </Reveal>

        {/* Interactive Category, Search & Sort Toolbar */}
        <div className="mt-8 space-y-4 pb-8">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="tablist"
            aria-label="Product categories"
          >
            {filterTabs.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-[3px] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#4D5E4C] text-[#FAF9F6]'
                      : 'bg-[#EAE5D9] text-[#242729]/85 hover:bg-[#D5C7AE]/70 hover:text-[#242729]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Inline Product Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="h-4 w-4 text-[#41443D]/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
                aria-label="Search shop products"
                placeholder="Search journals, pens, paper..."
                className="w-full min-h-[42px] bg-[#FAF9F6] border border-[#242729]/20 focus:border-[#242729] rounded-[3px] pl-9 pr-8 py-2 text-[14px] text-[#242729] placeholder:text-[#41443D]/55 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onChangeSearch('')}
                  aria-label="Clear product search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#41443D] hover:text-[#242729] cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
              {activeMoodObj && (
                <button
                  type="button"
                  onClick={onClearMood}
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] border border-[#C66C4D]/45 bg-[#FAF9F6] rounded-[3px] text-[12px] text-[#242729] hover:border-[#C66C4D] transition-colors cursor-pointer"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: activeMoodObj.accentColor }}
                  />
                  <span>Mood: {activeMoodObj.title}</span>
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}

              <span className="text-[12px] text-[#41443D]/80 tabular-nums">
                {sorted.length} {sorted.length === 1 ? 'object' : 'objects'}
              </span>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="product-sort"
                  className="text-[12px] uppercase tracking-[0.12em] text-[#41443D]/75 whitespace-nowrap"
                >
                  Sort
                </label>
                <select
                  id="product-sort"
                  value={sortBy}
                  onChange={(e) => onChangeSort(e.target.value as SortOption)}
                  className="min-h-[42px] bg-[#FAF9F6] border border-[#242729]/20 rounded-[3px] px-3 py-2 text-[13px] text-[#242729] focus:outline-none focus:border-[#242729] cursor-pointer"
                >
                  <option value="featured">Curated Order</option>
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        {sorted.length === 0 ? (
          <div className="py-16 px-4 text-center border border-[#242729]/12 bg-[#FAF9F6]">
            <p className="font-serif text-[26px] text-[#242729]">
              No items match that exact search or filter.
            </p>
            <p className="mt-2 text-[14px] text-[#41443D]">
              Try resetting your search, category, or mood filter to view all objects.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  onClearMood();
                  onChangeSearch('');
                  onChangeSort('featured');
                }}
                className="mt-6 px-6 py-3 bg-[#242729] text-[#F4F1E9] rounded-[3px] text-[13px] font-medium cursor-pointer hover:bg-[#495948] transition-colors"
              >
                Reset all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-7 lg:gap-y-12">
            {sorted.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
