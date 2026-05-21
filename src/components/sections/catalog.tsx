import Image from 'next/image';
import {useTranslations, useLocale} from 'next-intl';
import {ArrowRight} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';
import {Badge} from '@/components/ui/badge';
import {SIZES, formatRub} from '@/lib/products';

export function Catalog() {
  const t = useTranslations('catalog');
  const locale = useLocale() as 'ru' | 'kk';

  return (
    <section id="sizes" className="py-16 md:py-24 px-4 sm:px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {SIZES.map((s) => (
            <article
              key={s.id}
              id={`size-${s.id}`}
              className="group flex flex-col bg-background rounded-[var(--radius-card)] border border-border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                <Image
                  src={s.image}
                  alt={`SAMLA ${s.volumeL} л`}
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  {s.stock === 'in' ? (
                    <Badge variant="success">{t('inStock')}</Badge>
                  ) : (
                    <Badge variant="warning">{t('onOrder')}</Badge>
                  )}
                </div>
              </div>

              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="font-display text-3xl font-extrabold text-foreground tracking-tight"
                    style={{letterSpacing: '-0.02em'}}
                  >
                    {s.volumeL} {t('liter')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {t('dims')}: {s.dims}
                </p>

                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <li>
                    {t('weight')}: {s.weightKg} {t('kg')}
                  </li>
                  <li className="line-clamp-1">{s.use[locale]}</li>
                </ul>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">{t('from')}</span>
                    <div className="font-display text-lg font-bold text-primary tabular-nums">
                      {formatRub(s.startPrice)}
                      <span className="text-xs font-medium text-muted-foreground">
                        /{t('pc')}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#prices"
                    aria-label={t('details')}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
