import { PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { ArchitecturalButton } from './Buttons';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';

interface NewArrivalsSectionProps {
  onAddToCart: (product: Product, variantName: string) => void;
  onOpenProduct: (product: Product) => void;
  onShopNewArrivals: () => void;
}

export function NewArrivalsSection({
  onAddToCart,
  onOpenProduct,
  onShopNewArrivals,
}: NewArrivalsSectionProps) {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <section
      id="new-arrivals"
      className="bg-[#EAE5D9] py-20 lg:py-28 border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 lg:pb-12 border-b border-[#242729]/12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#526878] font-medium mb-3">
                Latest Editions
              </p>
              <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] font-normal text-[#242729] [text-wrap:balance]">
                Fresh on the shelf.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <p className="text-[15px] sm:text-[17px] text-[#41443D] max-w-xs leading-relaxed">
                New tools, new textures, new ways to get started.
              </p>
              <ArchitecturalButton
                variant="secondary"
                showArrow
                onClick={onShopNewArrivals}
              >
                Shop all new arrivals
              </ArchitecturalButton>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-7">
          {newArrivals.map((product, index) => (
            <Reveal key={product.id} delayMs={index * 60}>
              <div className="flex flex-col h-full">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onOpenProduct={onOpenProduct}
                />
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#41443D]/85 line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
