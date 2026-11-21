import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variantName: string) => void;
  onOpenProduct: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onOpenProduct,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.name || 'Standard'
  );
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col h-full">
      {/* Product Image Surface */}
      <div
        onClick={() => onOpenProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenProduct(product);
          }
        }}
        aria-label={`View details for ${product.name}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE5D9] border border-[#242729]/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242729]"
      >
        <ResilientImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          />
        )}

        {/* Quick Add Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 flex justify-end opacity-100 lg:opacity-0 lg:translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] text-[12px] font-medium tracking-[0.03em] transition-colors cursor-pointer shadow-sm ${
              justAdded
                ? 'bg-[#596A58] text-[#FAF9F6]'
                : 'bg-[#FAF9F6]/95 text-[#242729] hover:bg-[#4D5E4C] hover:text-[#FAF9F6] border border-[#242729]/15 hover:border-[#4D5E4C]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Add to bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Metadata (Zero-Pill Clean Typographic Rhythm) */}
      <div className="pt-3.5 flex-1 flex flex-col justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#41443D]/75">
            <span>{product.categoryLabel}</span>
            {product.badge && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span
                  className={`font-medium ${
                    product.badge === 'Bestseller'
                      ? 'text-[#A85438]'
                      : product.badge === 'New Arrival'
                        ? 'text-[#526878]'
                        : 'text-[#4D5E4C]'
                  }`}
                >
                  {product.badge}
                </span>
              </>
            )}
          </div>

          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <h3 className="font-sans text-[16px] font-medium text-[#242729] leading-snug">
              <button
                type="button"
                onClick={() => onOpenProduct(product)}
                className="text-left hover:underline decoration-[#242729]/35 underline-offset-4 cursor-pointer"
              >
                {product.name}
              </button>
            </h3>
            <span className="tabular-nums text-[15px] font-medium text-[#242729] shrink-0">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Color / Variant Swatches */}
        {product.variants && product.variants.length > 0 && (
          <div className="pt-1 flex items-center gap-2">
            <div className="flex items-center gap-1.5" role="group" aria-label={`Color options for ${product.name}`}>
              {product.variants.map((variant) => {
                const isSelected = selectedVariant === variant.name;
                return (
                  <button
                    key={variant.name}
                    type="button"
                    title={variant.name}
                    aria-label={`${variant.name}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedVariant(variant.name)}
                    className={`h-3.5 w-3.5 rounded-full border transition-transform cursor-pointer ${
                      isSelected
                        ? 'ring-1 ring-[#242729] ring-offset-2 ring-offset-[#F4F1E9] scale-110 border-[#242729]/40'
                        : 'border-[#242729]/25 hover:scale-110'
                    }`}
                    style={{ backgroundColor: variant.colorHex }}
                  />
                );
              })}
            </div>
            <span className="text-[12px] text-[#41443D]/75 truncate">
              {selectedVariant}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
