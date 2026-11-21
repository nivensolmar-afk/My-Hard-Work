import { HERO_IMAGE } from '../data/catalog';
import { ArchitecturalButton } from './Buttons';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreCollection: () => void;
  onDiscoverStudio: () => void;
}

export function Hero({ onExploreCollection, onDiscoverStudio }: HeroProps) {
  return (
    <section
      id="top"
      aria-label="Featured showroom"
      className="bg-[#F4F1E9] border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Editorial Column (~42%) */}
        <div className="lg:col-span-5 px-5 sm:px-8 lg:px-12 py-14 sm:py-18 lg:py-24 flex flex-col justify-between bg-[#F4F1E9] order-2 lg:order-1">
          <div className="max-w-lg">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#A85438] font-medium mb-5">
              Architectural Stationery &amp; Studio Goods
            </p>
            <h1 className="font-serif text-[46px] sm:text-[62px] lg:text-[78px] xl:text-[84px] leading-[0.98] font-normal text-[#242729] tracking-[-0.015em] [text-wrap:balance]">
              Make room
              <br />
              for ideas.
            </h1>
            <p className="mt-6 sm:mt-7 text-[16px] sm:text-[18px] leading-[1.6] text-[#41443D] max-w-md">
              Beautifully considered tools for writing, creating, organizing, and bringing your next idea to life.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <ArchitecturalButton
                variant="primary"
                size="lg"
                showArrow
                onClick={onExploreCollection}
              >
                Explore the collection
              </ArchitecturalButton>
              <ArchitecturalButton
                variant="secondary"
                size="lg"
                onClick={onDiscoverStudio}
              >
                Discover our studio
              </ArchitecturalButton>
            </div>
          </div>

          <div className="mt-12 lg:mt-16 pt-6 border-t border-[#242729]/12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                aria-label="Seasonal studio pigment palette"
                className="flex items-center gap-1"
              >
                <span className="h-3 w-5 bg-[#596A58] rounded-[1px]" title="Muted Forest Green" />
                <span className="h-3 w-5 bg-[#71899B] rounded-[1px]" title="Dusty Blue" />
                <span className="h-3 w-5 bg-[#C66C4D] rounded-[1px]" title="Terracotta" />
                <span className="h-3 w-5 bg-[#D7AA43] rounded-[1px]" title="Mustard Ochre" />
                <span className="h-3 w-5 bg-[#B5A6C8] rounded-[1px]" title="Soft Lavender" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#41443D]/80 hidden sm:inline">
                Portland Flagship
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#41443D]/75 tabular-nums">
              Autumn / Winter
            </span>
          </div>
        </div>

        {/* Right Architectural Showroom Image (~58%) */}
        <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[460px] lg:min-h-[640px] xl:min-h-[700px] bg-[#EAE5D9] order-1 lg:order-2 overflow-hidden">
          <ResilientImage
            src={HERO_IMAGE}
            alt="PAPER & FORM architectural stationery showroom with matte charcoal steel shelving, oak display tables, and natural daylight"
            loading="eager"
            className="w-full h-full object-cover object-center lg:absolute lg:inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#242729]/15 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
