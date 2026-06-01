import {useTranslations} from 'next-intl';

const KEYS = ['warehouse', 'docs', 'delivery', 'original'] as const;

export function Advantages() {
  const t = useTranslations('why');
  const items = useTranslations('why.items');

  return (
    <section
      id="about"
      className="bg-[var(--color-bg-2)] border-y border-[var(--color-line)] py-[clamp(64px,8vw,116px)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </div>
        <div className="mt-[52px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {KEYS.map((k, i) => (
            <div key={k} className="reveal">
              <div className="font-mono text-[13px] text-[var(--color-signal)] font-bold tracking-[0.1em]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-[20px] font-bold mt-[18px] mb-3 pt-[18px] border-t border-[var(--color-line-strong)]">
                {items(`${k}.title`)}
              </h3>
              <p className="text-[var(--color-muted)] text-[14.5px] leading-[1.55]">
                {items(`${k}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
