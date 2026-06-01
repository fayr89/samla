import {useTranslations} from 'next-intl';

const DELIVERY = ['msk', 'rf', 'cis', 'pickup'] as const;
const PAYMENT = ['cashless', 'nds', 'deferred', 'docs'] as const;

export function Shipping() {
  const t = useTranslations('shipping');
  const delivery = useTranslations('shipping.delivery');
  const payment = useTranslations('shipping.payment');
  const tRoot = useTranslations();
  const deliveryChips = tRoot.raw('shipping.deliveryChips') as string[];
  const paymentChips = tRoot.raw('shipping.paymentChips') as string[];

  return (
    <section id="shipping" className="py-[clamp(64px,8vw,116px)] relative">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="reveal max-w-[760px]">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </div>

        <div className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-[4px] overflow-hidden">
          <div className="bg-[var(--color-bg)] px-8 py-[34px]">
            <h3 className="font-display text-[22px] font-bold flex items-center gap-3 mb-[22px]">
              <span className="w-[10px] h-[10px] bg-[var(--color-signal)] rounded-full" />
              {t('deliveryTitle')}
            </h3>
            <ul className="list-none flex flex-col gap-[14px]">
              {DELIVERY.map((k) => (
                <li
                  key={k}
                  className="flex gap-3 text-[15px] text-[var(--color-muted)] leading-[1.5] before:content-['→'] before:text-[var(--color-signal)] before:font-mono"
                >
                  {delivery(k)}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-[7px] mt-6">
              {deliveryChips.map((c) => (
                <span
                  key={c}
                  className="font-mono text-[11px] tracking-[0.08em] px-[11px] py-[6px] border border-[var(--color-line-strong)] rounded-[2px] text-[var(--color-muted)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-bg)] px-8 py-[34px]">
            <h3 className="font-display text-[22px] font-bold flex items-center gap-3 mb-[22px]">
              <span className="w-[10px] h-[10px] bg-[var(--color-signal)] rounded-full" />
              {t('paymentTitle')}
            </h3>
            <ul className="list-none flex flex-col gap-[14px]">
              {PAYMENT.map((k) => (
                <li
                  key={k}
                  className="flex gap-3 text-[15px] text-[var(--color-muted)] leading-[1.5] before:content-['→'] before:text-[var(--color-signal)] before:font-mono"
                >
                  {payment(k)}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-[7px] mt-6">
              {paymentChips.map((c) => (
                <span
                  key={c}
                  className="font-mono text-[11px] tracking-[0.08em] px-[11px] py-[6px] border border-[var(--color-line-strong)] rounded-[2px] text-[var(--color-muted)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
