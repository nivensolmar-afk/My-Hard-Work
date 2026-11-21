import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { CategorySlug, Product } from '../types';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface ProductDetailPageProps {
  product: Product;
  onBackToShop: () => void;
  onSelectCategory: (category: CategorySlug) => void;
  onAddToCart: (product: Product, variantName: string, quantity: number) => void;
  onOpenCart: () => void;
  onOpenProduct: (product: Product) => void;
}

export function ProductDetailPage({
  product,
  onBackToShop,
  onSelectCategory,
  onAddToCart,
  onOpenCart,
  onOpenProduct,
}: ProductDetailPageProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSelectedVariant(product.variants?.[0]?.name || 'Standard');
    setQuantity(1);
    setActiveImage(product.image);
    setJustAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const galleryImages = product.secondaryImage
    ? [product.image, product.secondaryImage]
    : [product.image];

  const relatedProducts = PRODUCTS.filter(
    (item) => item.id !== product.id && item.category === product.category
  )
    .concat(
      PRODUCTS.filter(
        (item) => item.id !== product.id && item.category !== product.category
      )
    )
    .slice(0, 4);

  const whatsappUrl = buildSingleProductWhatsAppUrl(
    product,
    selectedVariant,
    quantity
  );

  return (
    <div className="bg-[#FAF9F6] text-[#242729]">
      {/* Breadcrumb & Back Navigation */}
      <div className="bg-[#F4F1E9] border-b border-[#242729]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase text-[#41443D]/80 min-w-0"
          >
            <button
              type="button"
              onClick={onBackToShop}
              className="hover:text-[#242729] transition-colors cursor-pointer shrink-0"
            >
              PAPRIVA Shop
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => onSelectCategory(product.category)}
              className="hover:text-[#242729] transition-colors cursor-pointer truncate"
            >
              {product.categoryLabel}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#242729] font-medium truncate">
              {product.name}
            </span>
          </nav>

          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#242729] hover:text-[#4D5E4C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to shop</span>
          </button>
        </div>
      </div>

      {/* Main Product Details Split */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Image Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE5D9] border border-[#242729]/10">
              <ResilientImage
                src={activeImage || product.image}
                alt={product.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryImages.map((imgSrc, idx) => {
                  const isActive = activeImage === imgSrc;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(imgSrc)}
                      aria-label={`View image ${idx + 1} of ${product.name}`}
                      className={`aspect-[4/3] overflow-hidden bg-[#EAE5D9] border transition-all cursor-pointer ${
                        isActive
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
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-[#F4F1E9] border border-[#242729]/10 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#41443D]/75">
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

            <h1 className="mt-3 font-serif text-[34px] sm:text-[42px] leading-[1.08] font-normal text-[#242729] [text-wrap:balance]">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline justify-between gap-4 pb-6 border-b border-[#242729]/12">
              <span className="tabular-nums text-[24px] font-medium text-[#242729]">
                ${product.price}.00
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[#41443D]/85">
                <Truck className="h-3.5 w-3.5 text-[#596A58]" aria-hidden="true" />
                <span>Free shipping over $75</span>
              </span>
            </div>

            <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.65] text-[#41443D]">
              {product.shortDescription}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-7 pt-6 border-t border-[#242729]/10">
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
                        className={`inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-[3px] border text-[13px] transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#242729] bg-[#FAF9F6] text-[#242729] font-medium'
                            : 'border-[#242729]/18 bg-transparent text-[#41443D] hover:border-[#242729]/50'
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-[#242729]/25 shrink-0"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Primary Purchase Actions */}
            <div className="mt-7 pt-6 border-t border-[#242729]/10 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div
                  aria-label="Quantity selector"
                  className="inline-flex items-center justify-between border border-[#242729]/25 bg-[#FAF9F6] rounded-[3px] h-12 sm:w-32 shrink-0"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 h-full text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="px-2 text-[14px] tabular-nums font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 h-full text-[#242729] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 min-h-[48px] px-6 rounded-[3px] text-[14px] font-medium tracking-[0.02em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    justAdded
                      ? 'bg-[#596A58] text-[#FAF9F6]'
                      : 'bg-[#242729] text-[#F4F1E9] hover:bg-[#495948]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Added to bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                      <span className="tabular-nums">
                        Add to bag · ${(product.price * quantity).toFixed(0)}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {justAdded && (
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="w-full min-h-[44px] border border-[#596A58] bg-[#FAF9F6] text-[#242729] hover:bg-[#EAE5D9] rounded-[3px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  View shopping bag &amp; checkout
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] px-5 border border-[#242729]/25 bg-[#FAF9F6] hover:border-[#495948] hover:bg-[#EAE5D9]/60 text-[#242729] rounded-[3px] text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#495948]" aria-hidden="true" />
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Specifications */}
            <div className="mt-8 pt-6 border-t border-[#242729]/10 space-y-2.5 text-[13px]">
              <div className="flex justify-between gap-4">
                <span className="text-[#41443D]/75">Dimensions</span>
                <span className="text-[#242729] text-right">{product.dimensions}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#41443D]/75">Materials</span>
                <span className="text-[#242729] text-right">{product.materials}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#41443D]/75">Curation</span>
                <span className="text-[#242729] text-right">PAPRIVA · Where Every Idea Begins.</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#242729]/10">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#41443D]/75 mb-3">
                Details &amp; Craftsmanship
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-[#41443D] list-disc pl-4">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Objects */}
      <section className="bg-[#F4F1E9] border-t border-[#242729]/10 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-4 pb-8 border-b border-[#242729]/10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#526878] font-medium mb-2">
                Continue Exploring
              </p>
              <h2 className="font-serif text-[30px] sm:text-[38px] leading-tight text-[#242729]">
                More from the shelf.
              </h2>
            </div>
            <button
              type="button"
              onClick={onBackToShop}
              className="text-[13px] font-medium text-[#242729] border-b border-[#242729]/35 pb-0.5 hover:border-[#242729] cursor-pointer whitespace-nowrap"
            >
              View all objects
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-7">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                product={related}
                onAddToCart={(prod, variant) => onAddToCart(prod, variant, 1)}
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
