'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

const KEYS = [
  'original',
  'min',
  'delivery',
  'marketplace',
  'docs',
  'discount',
  'shipping',
  'visit'
] as const;

export function Faq() {
  const t = useTranslations('faq');
  const items = useTranslations('faq.items');
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id="faq"
      className="bg-[var(--color-bg-2)] border-y border-[var(--color-line)] py-[clamp(64px,8vw,116px)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </div>

        <div className="reveal mt-11 border-t border-[var(--color-line)]">
          {KEYS.map((k) => {
            const isOpen = open === k;
            return (
              <div key={k} className="border-b border-[var(--color-line)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : k)}
                  className={`w-full text-left bg-transparent border-0 cursor-pointer py-[26px] flex justify-between items-center gap-6 font-display font-semibold text-[clamp(17px,1.7vw,21px)] transition ${
                    isOpen ? 'text-[var(--color-signal)]' : 'text-[var(--color-fg)] hover:text-[var(--color-signal)]'
                  }`}
                  aria-expanded={isOpen}
                >
                  {items(`${k}.q`)}
                  <span
                    className={`w-[30px] h-[30px] border rounded-full grid place-items-center font-mono text-[18px] transition ${
                      isOpen
                        ? 'bg-[var(--color-signal)] text-[var(--color-signal-ink)] border-[var(--color-signal)] rotate-45'
                        : 'border-[var(--color-line-strong)]'
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-[400ms]"
                  style={{maxHeight: isOpen ? '420px' : '0px'}}
                >
                  <p className="text-[var(--color-muted)] text-[15.5px] leading-[1.65] pb-[26px] max-w-[75ch]">
                    {items(`${k}.a`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
