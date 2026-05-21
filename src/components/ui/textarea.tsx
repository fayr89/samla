import * as React from 'react';
import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({className, ...props}, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded-[var(--radius-input)] border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-y',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export {Textarea};
