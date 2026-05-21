import * as React from 'react';
import {cn} from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({className, type, ...props}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-[var(--radius-input)] border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export {Input};
