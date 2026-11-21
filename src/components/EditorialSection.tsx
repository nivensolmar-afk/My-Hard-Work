import { ArrowRight } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/catalog';
import { EditorialArticle } from '../types';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface EditorialSectionProps {
  onSelectArticle: (article: EditorialArticle) => void;
}

export function EditorialSection({ onSelectArticle }: EditorialSectionProps) {
  const [first, second, third] = EDITORIAL_ARTICLES;

  return (
    <section
      id="editorial"
      className="bg-[#FAF9F6] py-20 lg:py-28 border-b border-[#242729]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 lg:pb-14 border-b border-[#242729]/10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#596A58] font-medium mb-3">
                The Journal
              </p>
              <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] font-normal text-[#242729] [text-wrap:balance]">
                Notes from the creative life.
              </h2>
            </div>
            <p className="text-[15px] text-[#41443D] max-w-sm leading-relaxed">
              Essays on quiet desks, tactile habits, and working by hand.
            </p>
          </div>
        </Reveal>

        {/* Asymmetrical 12-col editorial grid */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Article 1 — Wide Landscape (5 cols) */}
          <Reveal className="lg:col-span-5">
            <ArticleCard
              article={first}
              aspectClass="aspect-[4/3]"
              onRead={() => onSelectArticle(first)}
            />
          </Reveal>

          {/* Article 2 — Tall Portrait Centerpiece (3 cols) */}
          <Reveal className="lg:col-span-3" delayMs={80}>
            <ArticleCard
              article={second}
              aspectClass="aspect-[3/4]"
              onRead={() => onSelectArticle(second)}
            />
          </Reveal>

          {/* Article 3 — Wide Feature (4 cols) */}
          <Reveal className="lg:col-span-4" delayMs={140}>
            <ArticleCard
              article={third}
              aspectClass="aspect-[4/3] lg:aspect-[5/4]"
              onRead={() => onSelectArticle(third)}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  aspectClass,
  onRead,
}: {
  article: EditorialArticle;
  aspectClass: string;
  onRead: () => void;
}) {
  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={onRead}
        className={`w-full overflow-hidden bg-[#EAE5D9] border border-[#242729]/10 block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242729] ${aspectClass}`}
      >
        <ResilientImage
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </button>

      <div className="pt-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#41443D]/75">
          <span className="text-[#A85438] font-medium">{article.category}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="mt-2.5 font-serif text-[25px] sm:text-[28px] leading-[1.15] text-[#242729] [text-wrap:balance]">
          <button
            type="button"
            onClick={onRead}
            className="text-left hover:text-[#41443D] transition-colors cursor-pointer"
          >
            {article.title}
          </button>
        </h3>

        <p className="mt-2.5 text-[14px] leading-relaxed text-[#41443D]/85">
          {article.excerpt}
        </p>

        <button
          type="button"
          onClick={onRead}
          className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-[#242729] border-b border-[#242729]/30 pb-0.5 hover:border-[#242729] transition-colors cursor-pointer"
        >
          <span>Read article</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
