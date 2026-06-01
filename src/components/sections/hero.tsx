import {useTranslations} from 'next-intl';
import {ArrowRight, Phone, Check, Sparkles} from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');

  const trust = [t('trust.original'), t('trust.docs'), t('trust.nds'), t('trust.shipping')];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#F0F7FF,_transparent_60%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t('eyebrow')}
            </span>

            <h1
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-balance"
              style={{letterSpacing: '-0.02em'}}
            >
              {t.rich('title', {
                samla: (chunks) => <span className="text-foreground">{chunks}</span>,
                wholesale: (chunks) => (
                  <span className="relative inline-block">
                    <span className="relative z-10 text-foreground">{chunks}</span>
                    <span className="absolute left-0 right-0 bottom-1 h-3 md:h-4 bg-[#FF6B35]/30 -z-0 rounded" />
                  </span>
                )
              })}
            </h1>

            <p className="mt-6 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t('subtitle')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center gap-2 h-12 lg:h-14 px-6 lg:px-7 rounded-xl bg-primary text-white text-base font-semibold shadow-[0_8px_24px_-6px_rgba(0,102,255,0.55)] hover:bg-[#0052cc] transition"
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`tel:${tCommon('phone').replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 h-12 lg:h-14 px-6 lg:px-7 rounded-xl border border-border bg-background text-base font-semibold hover:bg-muted transition"
              >
                <Phone className="w-5 h-5" />
                <span>
                  {t('ctaSecondary')} {tCommon('phone')}
                </span>
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              {trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/10 via-white to-accent/10 border border-border" />
              <div className="absolute inset-6 flex items-end justify-center">
                <div className="relative w-full h-full flex flex-col items-center justify-end gap-2">
                  {[1, 2, 3, 4, 5].map((i, idx) => {
                    const w = 90 - idx * 8;
                    const h = 26 - idx * 2;
                    return (
                      <div
                        key={i}
                        className="rounded-md border-2 border-primary/30 bg-white/70 backdrop-blur"
                        style={{
                          width: `${w}%`,
                          height: `${h}px`,
                          boxShadow:
                            '0 4px 12px -4px rgba(0,102,255,0.15), inset 0 1px 0 0 rgba(255,255,255,0.6)'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 px-3 py-1.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                {t('badgeHot')}
              </div>

              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 bg-white rounded-2xl shadow-xl border border-border p-3 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['А', 'М', 'Д'].map((ltr, i) => (
                    <div
                      key={ltr}
                      className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                        ['bg-primary', 'bg-accent', 'bg-success'][i]
                      }`}
                    >
                      {ltr}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-foreground">{t('badgeClients')}</div>
                  <div className="text-muted-foreground">{t('badgeClientsSub')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
