import {useTranslations} from 'next-intl';
import {
  ShoppingBag,
  PackageCheck,
  UtensilsCrossed,
  Archive,
  Warehouse,
  Store,
  type LucideIcon
} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';

const ITEMS: {key: string; Icon: LucideIcon}[] = [
  {key: 'marketplace', Icon: ShoppingBag},
  {key: 'fulfillment', Icon: PackageCheck},
  {key: 'horeca', Icon: UtensilsCrossed},
  {key: 'archive', Icon: Archive},
  {key: 'industry', Icon: Warehouse},
  {key: 'retail', Icon: Store}
];

export function Segments() {
  const t = useTranslations('segments');

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ITEMS.map(({key, Icon}) => (
            <div
              key={key}
              className="group p-6 lg:p-7 bg-background rounded-[var(--radius-card)] border border-border transition-all duration-200 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 transition-all duration-200 group-hover:bg-primary group-hover:text-white">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-tight">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
