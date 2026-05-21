import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-[0_4px_14px_0_rgba(0,102,255,0.39)] hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(0,102,255,0.45)]',
        secondary:
          'bg-background text-foreground border border-border hover:bg-muted hover:border-muted-foreground/20',
        ghost: 'text-foreground hover:bg-muted hover:text-foreground',
        accent:
          'bg-accent text-accent-foreground shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] hover:bg-accent-hover hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)]',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-12 px-6 text-sm rounded-[var(--radius-button)]',
        sm: 'h-10 px-4 text-sm rounded-[var(--radius-button)]',
        lg: 'h-14 px-8 text-base rounded-[var(--radius-button)]',
        icon: 'h-12 w-12 rounded-[var(--radius-button)]'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, ...props}, ref) => {
    return (
      <button
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
