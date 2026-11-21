import { STORY_IMAGE } from '../data/catalog';
import { ArchitecturalButton } from './Buttons';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface BrandStorySectionProps {
  onOpenStudioModal: () => void;
}

export function BrandStorySection({ onOpenStudioModal }: BrandStorySectionProps) {
  return (
    <section
      id="brand-story"
      className="bg-[#2B312C] text-[#F4F1E9]"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Architectural Showroom Photo */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[480px] lg:min-h-[640px] bg-[#303538] overflow-hidden">
          <ResilientImage
            src={STORY_IMAGE}
            alt="Inside the PAPRIVA retail showroom featuring black steel shelving, solid oak display counter, and organized paper goods"
            className="w-full h-full object-cover lg:absolute lg:inset-0"
          />
        </div>

        {/* Right Editorial Story Column */}
        <div className="lg:col-span-5 px-5 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-20 lg:py-24 flex flex-col justify-between">
          <Reveal>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#D7AA43] mb-5">
                PAPRIVA &middot; Where Every Idea Begins.
              </p>
              <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.06] font-normal text-[#FAF9F6] [text-wrap:balance]">
                Good ideas deserve good spaces.
              </h2>
              <p className="mt-7 text-[15px] sm:text-[17px] leading-[1.7] text-[#EAE5D9]/90 tracking-[0.005em]">
                We believe the tools around us shape the way we think. From the paper you reach for every morning to the pen you keep close, small details make room for bigger ideas. We curate useful, beautiful things for people who love making, planning, writing, and exploring.
              </p>
            </div>

            <div className="mt-10">
              <ArchitecturalButton
                variant="light"
                size="lg"
                showArrow
                onClick={onOpenStudioModal}
              >
                Get to know us
              </ArchitecturalButton>
            </div>
          </Reveal>

          <div className="mt-14 pt-8 border-t border-[#F4F1E9]/14 grid grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#D5C7AE]">
                Materials
              </p>
              <p className="mt-1.5 text-[14px] text-[#FAF9F6]/90">
                Acid-free cotton, Belgian linen &amp; solid brass
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#D5C7AE]">
                Showroom Hours
              </p>
              <p className="mt-1.5 text-[14px] text-[#FAF9F6]/90 tabular-nums">
                Tue – Sun · 10am – 6pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
