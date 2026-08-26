'use client';

import { ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes, ReactNode, ElementType } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MagneticElement } from './MagneticElement';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
export type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type PolymorphicButtonProps = ButtonProps | AnchorProps;

const getVariantClasses = (variant: ButtonVariant = 'primary') => {
  switch (variant) {
    case 'primary':
      return 'bg-bc-white text-bc-black hover:bg-bc-pure-white hover:scale-[1.02] border border-transparent';
    case 'secondary':
      return 'bg-transparent text-bc-white border border-bc-white/30 hover:border-bc-white hover:bg-bc-white hover:text-bc-black';
    case 'ghost':
      return 'bg-transparent text-bc-white hover:opacity-70';
    case 'outline':
      return 'bg-transparent text-bc-white border border-bc-white/40 hover:border-bc-white hover:bg-bc-white/10';
    default:
      return 'bg-bc-white text-bc-black hover:bg-bc-pure-white';
  }
};

const getSizeClasses = (size: ButtonSize = 'md') => {
  switch (size) {
    case 'sm':
      return 'px-4 py-2 text-xs tracking-wider';
    case 'md':
      return 'px-6 py-3 text-sm tracking-widest';
    case 'lg':
      return 'px-8 py-4 text-base tracking-widest';
    default:
      return 'px-6 py-3 text-sm tracking-widest';
  }
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, PolymorphicButtonProps>(
  ({ variant = 'primary', size = 'md', magnetic = false, className, children, as, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-white disabled:opacity-50 disabled:pointer-events-none active:scale-95';

    const combinedClasses = cn(baseClasses, getVariantClasses(variant), getSizeClasses(size), className);

    let element = null;

    if ('href' in props && props.href) {
      const { href, ...anchorProps } = props as AnchorProps;
      const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

      if (isExternal) {
        element = (
          <a ref={ref as any} href={href} className={combinedClasses} {...anchorProps}>
            {children}
          </a>
        );
      } else {
        element = (
          <Link ref={ref as any} href={href} className={combinedClasses} {...(anchorProps as any)}>
            {children}
          </Link>
        );
      }
    } else {
      element = (
        <button ref={ref as any} className={combinedClasses} {...(props as ButtonProps)}>
          {children}
        </button>
      );
    }

    if (magnetic) {
      return <MagneticElement>{element}</MagneticElement>;
    }

    return element;
  }
);

Button.displayName = 'Button';
