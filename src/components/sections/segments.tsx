import {useTranslations} from 'next-intl';

const ITEMS = [
  'marketplace',
  'fulfillment',
  'horeca',
  'archive',
  'industry',
  'retail'
] as const;

export function Segments() {
  const t = useTranslations('audience');
  const items = useTranslations('audience.items');

  return (
    <section id="audience" className="relative pt-0 pb-[clamp(64px,8vw,116px)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
          <p className="lede">{t('subtitle')}</p>
        </div>
        <div className="reveal mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-[4px] overflow-hidden">
          {ITEMS.map((k, i) => (
            <div
              key={k}
              className="group bg-[var(--color-bg)] px-[26px] py-[30px] relative overflow-hidden transition hover:bg-[var(--color-bg-2)] before:absolute before:left-0 before:top-0 before:w-[3px] before:h-0 before:bg-[var(--color-signal)] before:transition-all before:duration-[350ms] hover:before:h-full"
            >
              <div className="font-mono text-[11px] text-[var(--color-signal)] tracking-[0.1em]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-[21px] font-bold mt-[14px] mb-[9px]">
                {items(`${k}.title`)}
              </h3>
              <p className="text-[var(--color-muted)] text-[14.5px] leading-[1.5]">
                {items(`${k}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
