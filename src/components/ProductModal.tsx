import { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variantName: string, quantity: number) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0]?.name || 'Standard');
      setQuantity(1);
      setActiveImage(product.image);
      setJustAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#242729]/55 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF9F6] text-[#242729] border border-[#242729]/15 grid grid-cols-1 md:grid-cols-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 h-10 w-10 bg-[#FAF9F6]/90 border border-[#242729]/15 rounded-[3px] flex items-center justify-center text-[#242729] hover:bg-[#242729] hover:text-[#F4F1E9] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Left Gallery Column */}
        <div className="md:col-span-6 bg-[#EAE5D9] p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4F1E9] border border-[#242729]/10">
            <ResilientImage
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.secondaryImage && (
            <div className="grid grid-cols-2 gap-3">
              {[product.image, product.secondaryImage].map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgSrc)}
                  className={`aspect-[4/3] overflow-hidden border cursor-pointer transition-opacity ${
                    activeImage === imgSrc
                      ? 'border-[#242729] opacity-100'
                      : 'border-[#242729]/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={imgSrc}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#41443D]/75">
              <span>{product.categoryLabel}</span>
              {product.badge && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span className="text-[#242729] font-medium">{product.badge}</span>
                </>
              )}
            </div>

            <h2
              id="pdp-title"
              className="mt-2 font-serif text-[30px] sm:text-[34px] leading-[1.1] text-[#242729]"
            >
              {product.name}
            </h2>

            <p className="mt-3 tabular-nums text-[20px] font-medium text-[#242729]">
              ${product.price}.00
            </p>

            <p className="mt-4 text-[14px] leading-relaxed text-[#41443D]">
              {product.shortDescription}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#242729]/10">
                <p className="text-[12px] uppercase tracking-[0.12em] text-[#41443D]/80 mb-3">
                  Finish / Edition:{' '}
                  <span className="text-[#242729] font-medium">{selectedVariant}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant === variant.name;
                    return (
                      <button
                        key={variant.name}
                        type="button"
                        onClick={() => setSelectedVariant(variant.name)}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-[3px] border text-[13px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#242729] bg-[#EAE5D9] text-[#242729] font-medium'
                            : 'border-[#242729]/18 bg-transparent text-[#41443D] hover:border-[#242729]/50'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-[#242729]/25"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="mt-6 pt-5 border-t border-[#242729]/10 space-y-2 text-[13px]">
              <div className="flex justify-between gap-4">
                <span className="text-[#41443D]/75">Dimensions</span>
                <span className="text-[#242729] text-right">{product.dimensions}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#41443D]/75">Materials</span>
                <span className="text-[#242729] text-right">{product.materials}</span>
              </div>
            </div>

            <ul className="mt-5 space-y-1.5 text-[13px] text-[#41443D] list-disc pl-4">
              {product.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Quantity + Add to Bag */}
          <div className="mt-8 pt-6 border-t border-[#242729]/12 flex items-center gap-3">
            <div className="inline-flex items-center border border-[#242729]/25 rounded-[3px] h-12">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 h-full text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="px-3 text-[14px] tabular-nums font-medium">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 h-full text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 h-12 rounded-[3px] text-[14px] font-medium tracking-[0.02em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                justAdded
                  ? 'bg-[#596A58] text-[#FAF9F6]'
                  : 'bg-[#242729] text-[#F4F1E9] hover:bg-[#303538]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Added to your bag</span>
                </>
              ) : (
                <span className="tabular-nums">
                  Add to bag · ${(product.price * quantity).toFixed(0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
