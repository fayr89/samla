'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {
  SIZES,
  TIER_PRICES,
  TIER_MIN,
  TIER_KEYS,
  tierForQty,
  formatRub,
  type TierKey
} from '@/lib/products';

function fmtQty(n: number): string {
  return n.toLocaleString('ru-RU');
}

export function Calculator() {
  const t = useTranslations('calc');
  const [qty, setQty] = useState<Record<string, number>>({});

  const totalQty = useMemo(
    () => Object.values(qty).reduce((acc, v) => acc + (v || 0), 0),
    [qty]
  );

  const tier: TierKey = tierForQty(totalQty);
  const tierIdx = TIER_KEYS.indexOf(tier);
  const nextTier: TierKey | null = tierIdx < TIER_KEYS.length - 1 ? TIER_KEYS[tierIdx + 1] : null;

  const totalSum = useMemo(() => {
    return SIZES.reduce((acc, s) => {
      const q = qty[s.id] || 0;
      if (q <= 0) return acc;
      return acc + q * TIER_PRICES[s.id][tier];
    }, 0);
  }, [qty, tier]);

  const lines = SIZES.filter((s) => (qty[s.id] || 0) > 0);

  const progressPct = nextTier
    ? Math.min(
        100,
        Math.round(
          ((totalQty - TIER_MIN[tier]) /
            (TIER_MIN[nextTier] - TIER_MIN[tier])) *
            100
        )
      )
    : 100;

  const setVal = (id: string, n: number) => {
    setQty((q) => ({...q, [id]: Math.max(0, n)}));
  };

  const step = (id: string, dir: 1 | -1) => {
    const cur = qty[id] || 0;
    const inc = cur >= 100 ? 50 : 10;
    setVal(id, cur + dir * inc);
  };

  return (
    <section
      id="calc"
      className="bg-[var(--color-bg-2)] border-y border-[var(--color-line)] py-[clamp(64px,8vw,116px)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
          <p className="lede">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIZES.map((s) => {
              const q = qty[s.id] || 0;
              const unitPrice = TIER_PRICES[s.id][tier];
              return (
                <div
                  key={s.id}
                  className={`border rounded-[4px] p-4 bg-[var(--color-bg)] flex flex-col gap-3 transition ${
                    q > 0
                      ? 'border-[var(--color-signal)] shadow-[inset_0_0_0_1px_var(--color-signal)]'
                      : 'border-[var(--color-line)]'
                  }`}
                >
                  <div className="flex justify-between items-baseline">
                    <div className="font-display font-extrabold text-[24px]">
                      {s.volumeL}
                      <small className="font-mono text-[11px] text-[var(--color-muted)] font-normal">
                        &nbsp;{t('qtyUnit') === 'дана' ? 'л' : 'л'}
                      </small>
                    </div>
                    <div className="font-mono text-[12px] text-[var(--color-signal)]">
                      {unitPrice} {t('perPiece')}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-[var(--color-muted-2)] -mt-1">
                    {s.dims.replace(/\s*см\s*$/, '')}
                  </div>
                  <div className="flex items-stretch border border-[var(--color-line-strong)] rounded-[3px] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => step(s.id, -1)}
                      className="basis-[38px] h-[38px] bg-[var(--color-bg-3)] text-[var(--color-fg)] font-mono text-[18px] hover:bg-[var(--color-signal)] hover:text-[var(--color-signal-ink)] transition"
                      aria-label="−"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={q}
                      onChange={(e) => setVal(s.id, parseInt(e.target.value, 10) || 0)}
                      inputMode="numeric"
                      className="flex-1 min-w-0 h-[38px] bg-transparent border-x border-[var(--color-line)] text-[var(--color-fg)] text-center font-mono text-[15px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => step(s.id, 1)}
                      className="basis-[38px] h-[38px] bg-[var(--color-bg-3)] text-[var(--color-fg)] font-mono text-[18px] hover:bg-[var(--color-signal)] hover:text-[var(--color-signal-ink)] transition"
                      aria-label="+"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="reveal lg:sticky lg:top-[84px] border border-[var(--color-line-strong)] rounded-[4px] bg-[var(--color-bg)] overflow-hidden">
            <div className="px-[22px] py-[18px] border-b border-[var(--color-line)] font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-muted)] flex justify-between">
              <span>{t('summaryTitle')}</span>
              <span>{t('tierBadge', {n: TIER_MIN[tier]})}</span>
            </div>
            <div className="px-[22px] py-[22px]">
              {lines.length === 0 ? (
                <div className="text-center text-[var(--color-muted-2)] py-[30px] font-mono text-sm">
                  {t('empty')}
                </div>
              ) : (
                <div>
                  {lines.map((s) => {
                    const q = qty[s.id]!;
                    const line = q * TIER_PRICES[s.id][tier];
                    return (
                      <div
                        key={s.id}
                        className="flex justify-between font-mono text-[13px] py-[9px] text-[var(--color-muted)] border-b border-dashed border-[var(--color-line)]"
                      >
                        <span>
                          {s.volumeL} л × {fmtQty(q)}
                        </span>
                        <span className="text-[var(--color-fg)]">{formatRub(line)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="h-[6px] bg-[var(--color-bg-3)] rounded-[3px] my-4 overflow-hidden">
                <i
                  className="block h-full bg-[var(--color-signal)] transition-[width] duration-500"
                  style={{width: `${progressPct}%`}}
                />
              </div>
              <p className="font-mono text-[11px] text-[var(--color-muted)]">
                {nextTier
                  ? t('toNext', {
                      n: TIER_MIN[nextTier],
                      left: fmtQty(Math.max(0, TIER_MIN[nextTier] - totalQty))
                    })
                  : t('maxTier')}
              </p>
              <div className="flex justify-between items-baseline mt-[18px] pt-[18px] border-t border-[var(--color-line-strong)]">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    {t('totalLabel')}
                  </div>
                  <div className="font-mono text-xs text-[var(--color-signal)] mt-1">
                    {fmtQty(totalQty)} {t('qtyUnit')}
                  </div>
                </div>
                <div className="font-display font-extrabold text-[34px] tracking-[-0.02em]">
                  {formatRub(totalSum)}
                </div>
              </div>
              <a href="#contacts" className="btn btn-primary w-full justify-center mt-[18px]">
                {t('cta')}
              </a>
              <p className="font-mono text-[10.5px] text-[var(--color-muted-2)] text-center mt-[14px] leading-[1.5]">
                {t('disclaimer')}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
