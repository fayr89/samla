'use client';

import Image from 'next/image';
import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Plus, Minus, FileDown} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';
import {
  SIZES,
  TIER_PRICES,
  TIER_MIN,
  tierForQty,
  formatRub,
  type TierKey
} from '@/lib/products';

const STEP = 10;

export function Calculator() {
  const t = useTranslations('calculator');
  const tierLocale = useTranslations('pricing.tierLabels');
  const [qty, setQty] = useState<Record<string, number>>({});

  const totalQty = useMemo(
    () => Object.values(qty).reduce((acc, v) => acc + (v || 0), 0),
    [qty]
  );

  const tier: TierKey = tierForQty(totalQty);

  const totalSum = useMemo(() => {
    return SIZES.reduce((acc, s) => {
      const q = qty[s.id] || 0;
      if (q <= 0) return acc;
      const p = TIER_PRICES[s.id][tier];
      return acc + q * p;
    }, 0);
  }, [qty, tier]);

  const items = SIZES.filter((s) => (qty[s.id] || 0) > 0);

  const nextTier: TierKey | null =
    tier === 't50'
      ? 't200'
      : tier === 't200'
        ? 't500'
        : tier === 't500'
          ? 't1000'
          : null;
  const progress = nextTier
    ? Math.min(100, Math.round((totalQty / TIER_MIN[nextTier]) * 100))
    : 100;

  const setVal = (id: string, v: number) => {
    setQty((q) => ({...q, [id]: Math.max(0, v)}));
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="mt-10 md:mt-14 grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 bg-background rounded-[var(--radius-card)] border border-border divide-y divide-border">
            {SIZES.map((s) => {
              const q = qty[s.id] || 0;
              const p = TIER_PRICES[s.id][tier];
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5"
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                    <Image
                      src={s.image}
                      alt={`SAMLA ${s.volumeL} л`}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg font-bold tabular-nums">
                      {s.volumeL} {t('liter')}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.dims}</div>
                    <div className="text-xs mt-1 font-medium text-primary tabular-nums">
                      {formatRub(p)}/{t('pc')}
                    </div>
                  </div>

                  <div className="flex items-center rounded-xl border border-border overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setVal(s.id, q - STEP)}
                      disabled={q <= 0}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
                      aria-label="−"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      step={STEP}
                      value={q}
                      onChange={(e) => setVal(s.id, parseInt(e.target.value, 10) || 0)}
                      className="w-14 sm:w-16 h-9 sm:h-10 text-center text-sm font-semibold tabular-nums bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <button
                      type="button"
                      onClick={() => setVal(s.id, q + STEP)}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-background hover:bg-muted transition"
                      aria-label="+"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-24 bg-background rounded-[var(--radius-card)] border border-border p-6">
            <h3 className="font-display text-xl font-bold mb-4">{t('summaryTitle')}</h3>

            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                {t('empty')}
              </p>
            ) : (
              <ul className="space-y-2 mb-5">
                {items.map((s) => {
                  const q = qty[s.id] || 0;
                  const sum = q * TIER_PRICES[s.id][tier];
                  return (
                    <li
                      key={s.id}
                      className="flex items-baseline justify-between text-sm"
                    >
                      <span className="text-muted-foreground tabular-nums">
                        {s.volumeL} л × {q}
                      </span>
                      <span className="font-medium tabular-nums">{formatRub(sum)}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">{t('totalQty')}</span>
                <span className="font-semibold tabular-nums">
                  {totalQty} {t('pc')}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground text-sm">{t('totalSum')}</span>
                <span className="font-display text-2xl font-extrabold text-primary tabular-nums">
                  {formatRub(totalSum)}
                </span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-muted">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {tierLocale(tier)}
                </span>
                {nextTier && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {Math.max(0, TIER_MIN[nextTier] - totalQty)} {t('toNext')}
                  </span>
                )}
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{width: `${progress}%`}}
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              {t('disclaimer')}
            </p>

            <a
              href="#contacts"
              className="mt-5 flex items-center justify-center h-12 w-full rounded-xl bg-primary text-white font-semibold shadow-[0_8px_24px_-6px_rgba(0,102,255,0.45)] hover:bg-[#0052cc] transition"
            >
              {t('submit')}
            </a>
            <a
              href="#contacts"
              className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <FileDown className="w-4 h-4" />
              {t('or')}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
