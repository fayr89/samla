import * as React from 'react';
import {cn} from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}

export {SectionHeader};
