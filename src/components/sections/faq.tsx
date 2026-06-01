'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ChevronDown} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';

const KEYS = ['original', 'min', 'delivery', 'marketplace', 'docs', 'discount', 'shipping', 'visit'];

export function Faq() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 bg-muted">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-10 md:mt-14 space-y-3">
          {KEYS.map((k, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={k}
                className={`rounded-xl border bg-background transition-colors ${
                  isOpen ? 'border-primary/40 shadow-sm' : 'border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5"
                >
                  <span
                    className={`font-display font-bold text-base sm:text-lg ${
                      isOpen ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {t(`items.${k}.q`)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {t(`items.${k}.a`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
