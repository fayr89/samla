import {useTranslations} from 'next-intl';
import {FileDown, MessageCircle} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';
import {SIZES, TIER_PRICES, formatRub, type TierKey} from '@/lib/products';

const TIERS: TierKey[] = ['t50', 't200', 't500', 't1000'];

export function Pricing() {
  const t = useTranslations('pricing');
  const tierLocale = useTranslations('pricing.tierLabels');

  return (
    <section id="prices" className="py-16 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
        />

        <div className="mt-10 md:mt-14 hidden md:block rounded-[var(--radius-card)] border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left font-semibold px-5 py-4">{t('colSize')}</th>
                {TIERS.map((tier) => (
                  <th
                    key={tier}
                    className={`text-right font-semibold px-5 py-4 ${tier === 't1000' ? 'bg-accent/90' : ''}`}
                  >
                    {tierLocale(tier)}
                  </th>
                ))}
                <th className="text-right font-semibold px-5 py-4">{t('colCustom')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {SIZES.map((s) => {
                const prices = TIER_PRICES[s.id];
                return (
                  <tr key={s.id} className="hover:bg-muted/50 transition">
                    <td className="px-5 py-4 font-display font-bold text-primary tabular-nums">
                      {s.volumeL} л
                    </td>
                    {TIERS.map((tier) => (
                      <td
                        key={tier}
                        className={`px-5 py-4 text-right tabular-nums ${
                          tier === 't1000' ? 'bg-accent/5 font-semibold text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {formatRub(prices[tier])}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {t('onRequest')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid md:hidden gap-4">
          {SIZES.map((s) => {
            const prices = TIER_PRICES[s.id];
            return (
              <div
                key={s.id}
                className="rounded-[var(--radius-card)] border border-border bg-background p-5"
              >
                <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
                  <span className="font-display text-2xl font-extrabold text-primary tabular-nums">
                    {s.volumeL} л
                  </span>
                  <span className="text-xs text-muted-foreground">{s.dims}</span>
                </div>
                <ul className="space-y-2">
                  {TIERS.map((tier) => (
                    <li
                      key={tier}
                      className={`flex items-center justify-between text-sm ${
                        tier === 't1000' ? 'font-semibold text-accent' : ''
                      }`}
                    >
                      <span className="text-muted-foreground">{tierLocale(tier)}</span>
                      <span className="tabular-nums">{formatRub(prices[tier])}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">{t('colCustom')}</span>
                    <span className="text-xs text-muted-foreground">{t('onRequest')}</span>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#contacts"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-white font-semibold shadow-[0_8px_24px_-6px_rgba(0,102,255,0.45)] hover:bg-[#0052cc] transition"
          >
            <FileDown className="w-4 h-4" />
            {t('ctaPrice')}
          </a>
          <a
            href="#contacts"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-border bg-background font-semibold hover:bg-muted transition"
          >
            {t('ctaCustom')}
          </a>
        </div>
      </div>
    </section>
  );
}
