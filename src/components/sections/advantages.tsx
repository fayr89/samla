import {useTranslations} from 'next-intl';
import {
  Warehouse,
  FileText,
  Truck,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';

const ITEMS: {key: string; Icon: LucideIcon}[] = [
  {key: 'warehouse', Icon: Warehouse},
  {key: 'docs', Icon: FileText},
  {key: 'delivery', Icon: Truck},
  {key: 'original', Icon: ShieldCheck}
];

export function Advantages() {
  const t = useTranslations('advantages');

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          align="left"
        />

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({key, Icon}, idx) => (
            <article
              key={key}
              className="relative h-full p-7 bg-background rounded-[var(--radius-card)] border border-border overflow-hidden"
            >
              <span
                className="absolute -top-2 -left-1 font-display text-7xl lg:text-8xl font-extrabold leading-none select-none pointer-events-none"
                style={{
                  WebkitTextStroke: '1.5px rgba(15,23,42,0.08)',
                  color: 'transparent'
                }}
              >
                0{idx + 1}
              </span>
              <Icon className="absolute top-7 right-7 w-7 h-7 text-primary" />

              <div className="relative pt-12">
                <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
