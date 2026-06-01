import {useTranslations} from 'next-intl';
import {SIZES, TIER_PRICES, TIER_MIN, TIER_KEYS, formatRub} from '@/lib/products';

const TIERS = TIER_KEYS;

export function Pricing() {
  const t = useTranslations('pricing');
  const tierLocale = useTranslations('pricing.tierLabels');

  return (
    <section id="prices" className="py-[clamp(64px,8vw,116px)] relative">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
          <p className="lede">{t('subtitle')}</p>
        </div>

        <div className="reveal mt-12 hidden md:block border border-[var(--color-line-strong)] rounded-[4px] overflow-hidden font-mono">
          <div className="grid grid-cols-[1.4fr_repeat(5,1fr)] bg-[var(--color-bg-3)] text-[11px] tracking-[0.08em] uppercase text-[var(--color-muted)]">
            <div className="px-4 py-[15px]">{t('colSize')}</div>
            {TIERS.map((tier) => (
              <div key={tier} className="px-4 py-[15px] border-l border-[var(--color-line)]">
                {tierLocale('template', {n: TIER_MIN[tier]})}
              </div>
            ))}
            <div className="px-4 py-[15px] border-l border-[var(--color-line)]">
              {t('colCustom')}
            </div>
          </div>
          <div>
            {SIZES.map((s) => {
              const prices = TIER_PRICES[s.id];
              return (
                <div
                  key={s.id}
                  className="grid grid-cols-[1.4fr_repeat(5,1fr)] border-t border-[var(--color-line)] transition hover:bg-[var(--color-bg-2)] hover:[&_.best]:text-[var(--color-signal)]"
                >
                  <div className="px-4 py-[17px] flex flex-col gap-[3px] font-display font-bold text-[18px]">
                    {s.volumeL} л
                    <small className="font-mono text-[11px] font-normal text-[var(--color-muted)]">
                      {s.dims.replace(/\s*см\s*$/, '')}
                    </small>
                  </div>
                  {TIERS.map((tier) => (
                    <div
                      key={tier}
                      className={`px-4 py-[17px] text-[14px] border-l border-[var(--color-line)] flex items-center ${
                        tier === 't1000' ? 'best font-bold' : ''
                      }`}
                    >
                      {formatRub(prices[tier])}
                    </div>
                  ))}
                  <div className="px-4 py-[17px] text-[12px] text-[var(--color-muted-2)] border-l border-[var(--color-line)] flex items-center">
                    {t('onRequest')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal mt-12 grid md:hidden gap-4">
          {SIZES.map((s) => {
            const prices = TIER_PRICES[s.id];
            return (
              <div key={s.id} className="border border-[var(--color-line-strong)] rounded-[4px] font-mono overflow-hidden">
                <div className="bg-[var(--color-bg-3)] px-4 py-3 font-display text-[18px] font-bold flex justify-between items-baseline">
                  <span>{s.volumeL} л</span>
                  <small className="text-[11px] text-[var(--color-muted)] font-normal">
                    {s.dims.replace(/\s*см\s*$/, '')}
                  </small>
                </div>
                {TIERS.map((tier) => (
                  <div
                    key={tier}
                    className={`px-4 py-[11px] text-[13px] border-t border-[var(--color-line)] flex justify-between items-center ${
                      tier === 't1000' ? 'font-bold' : ''
                    }`}
                  >
                    <span className="text-[var(--color-muted)]">
                      {tierLocale('template', {n: TIER_MIN[tier]})}
                    </span>
                    <span>{formatRub(prices[tier])}</span>
                  </div>
                ))}
                <div className="px-4 py-[11px] text-[13px] border-t border-[var(--color-line)] flex justify-between items-center text-[var(--color-muted-2)]">
                  <span>{t('colCustom')}</span>
                  <span>{t('onRequest')}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-7 flex flex-wrap gap-[14px]">
          <a href="#contacts" className="btn btn-primary">
            {t('ctaPrice')}
          </a>
          <a href="#contacts" className="btn btn-ghost">
            {t('ctaCustom')}
          </a>
        </div>
        <p className="reveal mt-4 font-mono text-[11.5px] text-[var(--color-muted-2)]">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
