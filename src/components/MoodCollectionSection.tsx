import { ArrowRight } from 'lucide-react';
import { MOOD_COLLECTIONS } from '../data/catalog';
import { MoodCollection } from '../types';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface MoodCollectionSectionProps {
  onSelectMood: (moodId: MoodCollection['id']) => void;
}

export function MoodCollectionSection({ onSelectMood }: MoodCollectionSectionProps) {
  const [quiet, colorful, organized, sketchbook] = MOOD_COLLECTIONS;

  return (
    <section
      id="creative-moods"
      className="bg-[#FAF9F6] py-20 lg:py-28 border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#A85438] font-medium mb-3">
                Curated Atmospheres
              </p>
              <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] font-normal text-[#242729] [text-wrap:balance]">
                Your desk, your kind of inspiration.
              </h2>
            </div>
            <p className="text-[15px] text-[#41443D] max-w-sm leading-relaxed">
              Four distinct approaches to a creative practice—select a mood to filter our shelves.
            </p>
          </div>
        </Reveal>

        {/* Magazine-style Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1: Large Feature Left (7 cols) */}
          <Reveal className="lg:col-span-7">
            <MoodCard
              collection={quiet}
              heightClass="aspect-[4/3] lg:aspect-auto lg:h-[520px]"
              onSelect={() => onSelectMood(quiet.id)}
            />
          </Reveal>

          {/* Card 2: Tall Feature Right (5 cols) */}
          <Reveal className="lg:col-span-5" delayMs={80}>
            <MoodCard
              collection={colorful}
              heightClass="aspect-[4/3] lg:aspect-auto lg:h-[520px]"
              onSelect={() => onSelectMood(colorful.id)}
            />
          </Reveal>

          {/* Card 3: Bottom Left (5 cols) */}
          <Reveal className="lg:col-span-5" delayMs={120}>
            <MoodCard
              collection={organized}
              heightClass="aspect-[4/3] lg:aspect-auto lg:h-[440px]"
              onSelect={() => onSelectMood(organized.id)}
            />
          </Reveal>

          {/* Card 4: Bottom Right (7 cols) */}
          <Reveal className="lg:col-span-7" delayMs={160}>
            <MoodCard
              collection={sketchbook}
              heightClass="aspect-[4/3] lg:aspect-auto lg:h-[440px]"
              onSelect={() => onSelectMood(sketchbook.id)}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MoodCard({
  collection,
  heightClass,
  onSelect,
}: {
  collection: MoodCollection;
  heightClass: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full overflow-hidden bg-[#EAE5D9] border border-[#242729]/10 text-left block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242729] ${heightClass}`}
    >
      <ResilientImage
        src={collection.image}
        alt={collection.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[4px]"
        style={{ backgroundColor: collection.accentColor }}
      />
      {/* Measured Contrast Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#242729]/85 via-[#242729]/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 text-[#FAF9F6] flex flex-col justify-end">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#EAE5D9]/85">
          {collection.subtitle}
        </p>
        <h3 className="mt-2 font-serif text-[28px] sm:text-[34px] leading-[1.1] font-normal text-[#FAF9F6]">
          {collection.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#EAE5D9]/90 max-w-md">
          {collection.description}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] uppercase text-[#FAF9F6]">
          <span className="border-b border-[#FAF9F6]/50 pb-0.5 group-hover:border-[#FAF9F6] transition-colors">
            Explore collection
          </span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  );
}
