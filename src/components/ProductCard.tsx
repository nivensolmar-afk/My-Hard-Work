import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variantName: string) => void;
  onOpenProduct: (product: Product) => void;
  description?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  onOpenProduct,
  description,
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
    <article
      onClick={() => onOpenProduct(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const target = e.target as HTMLElement;
          if (target.tagName !== 'BUTTON') {
            e.preventDefault();
            onOpenProduct(product);
          }
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`View ${product.name}, $${product.price}`}
      className="group flex flex-col h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242729]"
    >
      {/* Product Image Surface */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE5D9] border border-[#242729]/10">
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
      </div>

      {/* Product Metadata (Zero-Pill Clean Typographic Rhythm) */}
      <div className="pt-3.5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#41443D]/75 truncate">
            <span className="truncate">{product.categoryLabel}</span>
            {product.badge && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span
                  className={`font-medium shrink-0 ${
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

          <div className="mt-1.5 flex items-baseline justify-between gap-2.5">
            <h3 className="font-sans text-[15px] sm:text-[16px] font-medium text-[#242729] leading-snug group-hover:underline decoration-[#242729]/40 underline-offset-4">
              {product.name}
            </h3>
            <span className="tabular-nums text-[15px] font-medium text-[#242729] shrink-0">
              ${product.price}
            </span>
          </div>

          {description && (
            <p className="mt-2 text-[13px] leading-relaxed text-[#41443D]/85 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {/* Color / Variant Swatches */}
          {product.variants && product.variants.length > 0 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2"
            >
              <div
                className="flex items-center gap-1.5"
                role="group"
                aria-label={`Color options for ${product.name}`}
              >
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant === variant.name;
                  return (
                    <button
                      key={variant.name}
                      type="button"
                      title={variant.name}
                      aria-label={variant.name}
                      aria-pressed={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(variant.name);
                      }}
                      className={`h-4 w-4 rounded-full border transition-transform cursor-pointer ${
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

          {/* Dedicated Touch-Friendly Add to Bag Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full min-h-[42px] px-4 py-2.5 rounded-[3px] text-[13px] font-medium tracking-[0.02em] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              justAdded
                ? 'bg-[#596A58] text-[#FAF9F6] border border-[#596A58]'
                : 'bg-[#FAF9F6] text-[#242729] border border-[#242729]/20 hover:bg-[#4D5E4C] hover:text-[#FAF9F6] hover:border-[#4D5E4C]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Added to bag</span>
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
    </article>
  );
}
