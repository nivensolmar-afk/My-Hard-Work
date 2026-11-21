import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-gradient-to-br from-[#EAE5D9] via-[#E2DBCC] to-[#D5C7AE]/60 flex flex-col items-center justify-center p-6 text-center select-none"
      >
        <BookOpen className="h-7 w-7 text-[#41443D]/45 stroke-[1.25]" aria-hidden="true" />
        <span className="mt-2.5 text-[12px] uppercase tracking-[0.14em] text-[#41443D]/70 font-medium max-w-[20ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
