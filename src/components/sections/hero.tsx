import {useTranslations} from 'next-intl';
import {ArrowRight} from 'lucide-react';
import {SIZES} from '@/lib/products';

const FEATS = ['original', 'docs', 'nds', 'shipping'] as const;
const CARD_SIZES = [0, 1, 2, 3, 4, 6]; // 5l, 11l, 22l, 45l, 55l, 130l

export function Hero() {
  const t = useTranslations('hero');
  const card = useTranslations('hero.card');
  const feats = useTranslations('hero.feats');
  const minPrice = Math.min(...SIZES.flatMap((s) => Object.values(s.tiers)));

  return (
    <section className="hero relative border-b border-[var(--color-line)] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          background: `
            radial-gradient(120% 80% at 85% -10%, rgba(255,212,0,.10), transparent 55%),
            linear-gradient(transparent 0 calc(100% - 1px), var(--color-line) 0) 0 0/100% 64px,
            linear-gradient(90deg, transparent 0 calc(100% - 1px), var(--color-line) 0) 0 0/64px 100%
          `
        }}
      />
      <div className="relative z-[1] max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)] grid lg:grid-cols-[1.15fr_0.85fr] gap-[clamp(30px,4vw,64px)] items-end pt-[clamp(46px,7vw,92px)] pb-[clamp(40px,6vw,72px)]">
        <div>
          <div className="reveal inline-flex font-mono text-[11px] tracking-[0.12em] uppercase border border-[var(--color-line-strong)]">
            <span className="px-[13px] py-[7px] bg-[var(--color-signal)] text-[var(--color-signal-ink)] font-bold">
              {t('chipLeft')}
            </span>
            <span className="px-[13px] py-[7px] text-[var(--color-muted)]">
              {t('chipRight')}
            </span>
          </div>

          <h1 className="reveal mt-[26px] font-display font-extrabold text-[clamp(40px,7.2vw,92px)] leading-[1.02] tracking-[-0.035em]">
            {t('titleA')}{' '}
            <em className="not-italic text-[var(--color-signal)]">{t('titleB')}</em>{' '}
            {t('titleC')}
          </h1>

          <p className="reveal mt-6 text-[clamp(16px,1.5vw,20px)] text-[var(--color-muted)] max-w-[48ch] leading-[1.55]">
            {t('subtitle')}
          </p>

          <div className="reveal mt-[34px] flex flex-wrap gap-[14px]">
            <a href="#contacts" className="btn btn-primary">
              {t('ctaPrimary')}
              <ArrowRight aria-hidden />
            </a>
            <a href="#contacts" className="btn btn-ghost">
              {t('ctaSecondary')}
            </a>
          </div>

          <ul className="reveal mt-[32px] flex flex-wrap gap-y-2 gap-x-[22px] list-none">
            {FEATS.map((k) => (
              <li
                key={k}
                className="font-mono text-[12.5px] text-[var(--color-muted)] flex items-center gap-2 before:content-[''] before:w-[6px] before:h-[6px] before:bg-[var(--color-signal)] before:rotate-45"
              >
                {feats(k)}
              </li>
            ))}
          </ul>
        </div>

        <aside className="reveal border border-[var(--color-line-strong)] bg-gradient-to-b from-[var(--color-bg-2)] to-[var(--color-bg)] rounded-[4px] overflow-hidden">
          <div className="flex justify-between items-center px-[18px] py-4 border-b border-[var(--color-line)] font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--color-muted)]">
            <span>{card('title')}</span>
            <span className="bg-[var(--color-orange)] text-white px-[9px] py-[3px] font-bold text-[10px]">
              {card('badge')}
            </span>
          </div>
          <div className="px-5 pt-[22px] pb-2 flex flex-col gap-[7px]">
            {CARD_SIZES.map((i, idx) => {
              const s = SIZES[i];
              if (!s) return null;
              return (
                <div
                  key={s.id}
                  className="relative flex items-center justify-between px-4 border border-[var(--color-line-strong)] font-mono transition hover:border-[var(--color-signal)] hover:bg-[rgba(255,212,0,0.06)]"
                  style={{
                    height: `${34 + idx * 6}px`,
                    background:
                      'repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0 2px,transparent 2px 10px)'
                  }}
                >
                  <span className="text-[15px] font-bold">{s.volumeL} л</span>
                  <span className="text-[11px] text-[var(--color-muted)]">
                    {s.dims.replace(/\s*см\s*$/, '')}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center px-5 py-4 border-t border-[var(--color-line)]">
            <div className="flex items-center gap-3">
              <div className="flex">
                <span className="w-[30px] h-[30px] rounded-full border-[1.5px] border-[var(--color-bg-2)] grid place-items-center font-display font-bold text-xs bg-[var(--color-signal)] text-[var(--color-signal-ink)]">
                  А
                </span>
                <span className="w-[30px] h-[30px] rounded-full border-[1.5px] border-[var(--color-bg-2)] -ml-[9px] grid place-items-center font-display font-bold text-xs bg-[var(--color-orange)] text-white">
                  М
                </span>
                <span className="w-[30px] h-[30px] rounded-full border-[1.5px] border-[var(--color-bg-2)] -ml-[9px] grid place-items-center font-display font-bold text-xs bg-[#3a3730] text-[var(--color-fg)]">
                  Д
                </span>
              </div>
              <div>
                <b className="font-display text-[17px]">{card('clientsNum')}</b>
                <small className="block font-mono text-[10px] text-[var(--color-muted)] tracking-[0.08em] uppercase">
                  {card('clients')}
                </small>
              </div>
            </div>
            <div className="text-right">
              <b className="font-display text-[17px] text-[var(--color-signal)]">
                {card('fromShort')}&nbsp;{minPrice}&nbsp;₽
              </b>
              <small className="block font-mono text-[10px] text-[var(--color-muted)] tracking-[0.08em] uppercase">
                {card('priceLabel')}
              </small>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
