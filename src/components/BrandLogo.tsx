interface BrandLogoProps {
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ tone = 'dark', size = 'md' }: BrandLogoProps) {
  const isLight = tone === 'light';
  const strokeColor = isLight ? '#FAF9F6' : '#242729';
  const foldColor = isLight ? '#D7AA43' : '#A85438';
  const textColor = isLight ? 'text-[#FAF9F6]' : 'text-[#242729]';

  const iconSize =
    size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-7 w-7' : 'h-6 w-6';
  const textSize =
    size === 'sm'
      ? 'text-[19px]'
      : size === 'lg'
        ? 'text-[26px]'
        : 'text-[21px] sm:text-[23px] lg:text-[25px]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${iconSize} shrink-0`}
      >
        <path
          d="M5 3.5H17.5L23 9V24.5H5V3.5Z"
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinejoin="miter"
        />
        <path
          d="M17.5 3.5V9H23"
          stroke={foldColor}
          strokeWidth="1.4"
          strokeLinejoin="miter"
        />
        <path
          d="M9.5 14H18.5M9.5 18H15"
          stroke={strokeColor}
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      </svg>
      <span
        className={`font-serif ${textSize} tracking-[0.2em] uppercase font-medium leading-none ${textColor}`}
      >
        PAPRIVA
      </span>
    </span>
  );
}
