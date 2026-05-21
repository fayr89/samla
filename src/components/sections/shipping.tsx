import {useTranslations} from 'next-intl';
import {Truck, Wallet, Check} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';

const DELIVERY_KEYS = ['msk', 'rf', 'cis', 'pickup'] as const;
const PAYMENT_KEYS = ['cashless', 'nds', 'deferred', 'docs'] as const;
const REGIONS = ['МСК', 'СПб', 'ЕКБ', 'НСК', 'КЗН', 'АЛА', 'АСТ'];
const BANKS = ['Сбербанк', 'Тинькофф Бизнес', 'Альфа-Банк'];

export function Shipping() {
  const t = useTranslations('shipping');

  return (
    <section id="shipping" className="py-16 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
          <div className="p-7 lg:p-8 bg-background rounded-[var(--radius-card)] border border-border">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-5">{t('deliveryTitle')}</h3>

            <ul className="space-y-3 mb-6">
              {DELIVERY_KEYS.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{t(`delivery.${k}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map((r) => (
                <span
                  key={r}
                  className="text-xs font-semibold px-2 py-1 rounded-md bg-muted text-muted-foreground"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="p-7 lg:p-8 bg-background rounded-[var(--radius-card)] border border-border">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
              <Wallet className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-5">{t('paymentTitle')}</h3>

            <ul className="space-y-3 mb-6">
              {PAYMENT_KEYS.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{t(`payment.${k}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {BANKS.map((b) => (
                <span
                  key={b}
                  className="text-xs font-semibold px-3 py-1.5 rounded-md border border-border text-muted-foreground"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
