import { Truck, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onExploreFreeShipping: () => void;
}

export function AnnouncementBar({ onExploreFreeShipping }: AnnouncementBarProps) {
  return (
    <div className="bg-[#41443D] text-[#FAF9F6] h-9 px-4 flex items-center justify-center border-b border-[#242729]/15">
      <button
        type="button"
        onClick={onExploreFreeShipping}
        className="group inline-flex items-center gap-2 text-[11px] sm:text-[12px] tracking-[0.06em] text-[#F4F1E9] hover:text-[#FAF9F6] transition-colors cursor-pointer whitespace-nowrap truncate max-w-full focus-visible:outline-1 focus-visible:outline-[#F4F1E9]"
      >
        <Truck className="h-3.5 w-3.5 shrink-0 text-[#D7AA43]" aria-hidden="true" />
        <span className="truncate">
          Thoughtful tools for everyday creativity — Free shipping on orders over $75
        </span>
        <ArrowRight
          className="h-3 w-3 shrink-0 text-[#D5C7AE] transition-transform duration-200 group-hover:translate-x-0.5 hidden sm:inline-block"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
