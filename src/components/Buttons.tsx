import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light' | 'ghost';
  showArrow?: boolean;
  size?: 'md' | 'lg';
}

export function ArchitecturalButton({
  children,
  variant = 'primary',
  showArrow = false,
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-[3px] font-medium tracking-[0.02em] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242729] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizes = {
    md: 'px-6 py-3.5 text-[14px]',
    lg: 'px-7 py-4 text-[15px]',
  };

  const variants = {
    primary:
      'bg-[#242729] text-[#F4F1E9] hover:bg-[#495948] border border-[#242729] hover:border-[#495948]',
    secondary:
      'bg-[#FAF9F6]/60 text-[#242729] border border-[#242729]/30 hover:border-[#B99A72] hover:bg-[#EAE5D9]',
    light:
      'bg-[#F4F1E9] text-[#242729] border border-[#F4F1E9] hover:bg-[#D5C7AE] hover:border-[#D5C7AE] focus-visible:outline-[#F4F1E9]',
    ghost:
      'bg-transparent text-[#242729] hover:text-[#596A58] px-0 py-1.5 border-b border-transparent hover:border-[#596A58] rounded-none',
  };

  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
