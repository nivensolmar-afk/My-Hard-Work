import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { CategorySlug } from '../types';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface CategorySectionProps {
  onSelectCategory: (category: CategorySlug) => void;
}

const CATEGORY_ACCENTS: Record<CategorySlug, string> = {
  all: '#242729',
  notebooks: '#596A58',
  writing: '#71899B',
  paper: '#B99A72',
  'art-color': '#C66C4D',
  desk: '#D7AA43',
  books: '#9682AE',
};

export function CategorySection({ onSelectCategory }: CategorySectionProps) {
  return (
    <section
      id="categories"
      className="bg-[#FAF9F6] py-20 lg:py-28 border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 lg:pb-14 border-b border-[#242729]/10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#596A58] font-medium mb-3">
                Curated Departments
              </p>
              <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] font-normal text-[#242729] [text-wrap:balance]">
                Find your next favorite.
              </h2>
            </div>
            <p className="text-[15px] sm:text-[17px] text-[#41443D] max-w-sm leading-relaxed">
              Everything you need to think, make, plan, and create.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12">
          {CATEGORIES.map((category, index) => {
            const accent = CATEGORY_ACCENTS[category.id];
            return (
              <Reveal key={category.id} delayMs={index * 60}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className="group w-full text-left flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242729]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EAE5D9] border border-[#242729]/10">
                    <ResilientImage
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 inset-x-0 h-[3px] transition-opacity duration-300 opacity-85 group-hover:opacity-100"
                      style={{ backgroundColor: accent }}
                    />
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-[24px] sm:text-[26px] leading-snug text-[#242729] group-hover:text-[#41443D] transition-colors">
                        {category.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[#41443D]/85 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                    <span className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#242729]/15 rounded-[3px] text-[#242729] transition-all duration-200 group-hover:bg-[#596A58] group-hover:text-[#FAF9F6] group-hover:border-[#596A58]">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
