import {useTranslations} from 'next-intl';
import {SIZES} from '@/lib/products';

export function Catalog() {
  const t = useTranslations('sizes');
  const use = useTranslations('sizes.use');
  const custom = useTranslations('sizes.custom');

  return (
    <section id="sizes" className="py-[clamp(64px,8vw,116px)] relative">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
          <p className="lede">{t('subtitle')}</p>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-[4px] overflow-hidden">
          {SIZES.map((s, idx) => {
            const inStock = s.stock === 'in';
            const sku = String(idx + 1).padStart(2, '0');
            return (
              <article
                key={s.id}
                className="group bg-[var(--color-bg)] p-6 min-h-[280px] flex flex-col relative transition hover:bg-[var(--color-bg-2)]"
              >
                <div className="flex justify-between items-start mb-auto">
                  <span
                    className={`font-mono text-[10px] tracking-[0.1em] uppercase px-[9px] py-1 rounded-[2px] ${
                      inStock
                        ? 'bg-[rgba(255,212,0,0.14)] text-[var(--color-signal)]'
                        : 'bg-[rgba(255,90,31,0.16)] text-[#ff8a5c]'
                    }`}
                  >
                    {inStock ? t('inStock') : t('onOrder')}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-muted-2)]">
                    {t('skuPrefix')}&nbsp;{sku}
                  </span>
                </div>
                <div className="font-display font-extrabold text-[clamp(40px,4vw,56px)] leading-[0.9] tracking-[-0.03em] mt-[10px] mb-[6px]">
                  {s.volumeL}
                  <sub className="font-mono text-[0.32em] font-medium text-[var(--color-muted)] align-baseline">
                    {t('unit')}
                  </sub>
                </div>
                <div className="font-mono text-xs text-[var(--color-muted)] mb-[14px]">
                  {s.dims} · {s.weightKg} кг
                </div>
                <div className="text-[13.5px] text-[var(--color-muted)] border-t border-dashed border-[var(--color-line-strong)] pt-[13px] mb-4">
                  {use(s.id)}
                </div>
                <div className="flex items-baseline justify-between mt-auto">
                  <em className="not-italic font-mono text-[10px] text-[var(--color-muted-2)] tracking-[0.1em] uppercase">
                    {t('from')}
                  </em>
                  <b className="font-display text-[22px]">
                    {s.startPrice}
                    <small className="text-[13px] text-[var(--color-muted)] font-medium">
                      &nbsp;{t('perPiece')}
                    </small>
                  </b>
                </div>
                <a
                  href="#prices"
                  className="absolute top-6 right-6 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition"
                  aria-label={t('toPrices')}
                >
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--color-signal)" strokeWidth={2}>
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              </article>
            );
          })}
          <article className="bg-[var(--color-bg-2)] p-6 min-h-[280px] flex flex-col items-center justify-center text-center gap-[14px]">
            <div className="font-display font-extrabold text-[26px] leading-[1.05]">
              {custom('title')}
            </div>
            <p className="text-[var(--color-muted)] text-[13.5px]">{custom('desc')}</p>
            <a href="#contacts" className="btn btn-primary !py-[11px] !px-[18px]">
              {custom('cta')}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
