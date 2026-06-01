import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {CONTACTS, SIZES} from '@/lib/products';

const COMPANY_LINKS = [
  {key: 'About', href: '#about'},
  {key: 'Shipping', href: '#shipping'},
  {key: 'Payment', href: '#shipping'}
] as const;

const BUSINESS_LINKS = [
  {key: 'Price', href: '#contacts'},
  {key: 'Contract', href: '#contacts'},
  {key: 'Requisites', href: '#contacts'},
  {key: 'Dealer', href: '#contacts'}
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');
  const telHref = `tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] pt-14 pb-7">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[20px] tracking-[-0.02em]">
                {tCommon('brand')}
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--color-muted)] mt-[3px]">
                {tCommon('tagline')}
              </span>
            </Link>
            <p className="text-[var(--color-muted)] text-sm leading-[1.6] my-4 max-w-[34ch]">
              {t('about')}
            </p>
            <ul className="list-none flex flex-col gap-2 font-mono text-[13px] text-[var(--color-muted)]">
              <li>{CONTACTS.address}</li>
              <li>
                <a href={telHref}>{CONTACTS.phone}</a>
              </li>
              <li>
                <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
              </li>
            </ul>
            <p className="font-mono text-[11px] text-[var(--color-muted-2)] mt-[14px] tracking-[0.06em]">
              {t('hours')}
            </p>
          </div>

          <FooterCol title={t('catalogTitle')}>
            <ul className="list-none flex flex-col gap-[9px]">
              {SIZES.map((s) => (
                <li key={s.id}>
                  <a href="#sizes" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition">
                    {s.volumeL} л
                  </a>
                </li>
              ))}
            </ul>
          </FooterCol>

          <FooterCol title={t('companyTitle')}>
            <ul className="list-none flex flex-col gap-[9px]">
              {COMPANY_LINKS.map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition">
                    {t(`company${l.key}`)}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition">
                  {tNav('faq')}
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition">
                  {tNav('contacts')}
                </a>
              </li>
            </ul>
          </FooterCol>

          <FooterCol title={t('businessTitle')}>
            <ul className="list-none flex flex-col gap-[9px]">
              {BUSINESS_LINKS.map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition">
                    {t(`business${l.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </FooterCol>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mt-12 pt-6 border-t border-[var(--color-line)] font-mono text-[11.5px] text-[var(--color-muted-2)]">
          <span>{t('rights', {year})}</span>
          <div className="flex gap-[18px]">
            <a href={CONTACTS.telegram} className="hover:text-[var(--color-signal)]">
              Telegram
            </a>
            <a href={CONTACTS.whatsapp} className="hover:text-[var(--color-signal)]">
              WhatsApp
            </a>
            <a href={`mailto:${CONTACTS.email}`} className="hover:text-[var(--color-signal)]">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <div>
      <h4 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-signal)] mb-4">
        {title}
      </h4>
      {children}
    </div>
  );
}
