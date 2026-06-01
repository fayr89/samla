'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {Menu, X} from 'lucide-react';
import {CONTACTS} from '@/lib/products';

const NAV = [
  {key: 'sizes', href: '#sizes'},
  {key: 'prices', href: '#prices'},
  {key: 'calc', href: '#calc'},
  {key: 'shipping', href: '#shipping'},
  {key: 'faq', href: '#faq'},
  {key: 'contacts', href: '#contacts'}
] as const;

export function Header() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const telHref = `tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`;

  return (
    <header className="sticky top-0 z-[100] w-full bg-[rgba(19,18,13,0.82)] backdrop-blur-[14px] border-b border-[var(--color-line)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)] h-[68px] flex items-center gap-7">
        <Link href="/" className="flex flex-col leading-none mr-auto">
          <span className="font-display font-extrabold text-[20px] tracking-[-0.02em]">
            {tCommon('brand')}
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--color-muted)] mt-[3px]">
            {tCommon('tagline')}
          </span>
        </Link>

        <nav className="hidden lg:flex gap-[26px]">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition"
            >
              {tNav(item.key)}
            </a>
          ))}
        </nav>

        <a href={telHref} className="hidden md:inline font-mono text-sm font-medium text-[var(--color-signal)]">
          {CONTACTS.phone}
        </a>

        <div className="hidden md:flex gap-[2px] font-mono text-[11px]">
          <Link
            href={pathname}
            locale="ru"
            className={`px-2 py-[5px] border ${locale === 'ru' ? 'bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]' : 'border-[var(--color-line)] text-[var(--color-muted)]'}`}
          >
            RU
          </Link>
          <Link
            href={pathname}
            locale="kk"
            className={`px-2 py-[5px] border ${locale === 'kk' ? 'bg-[var(--color-fg)] text-[var(--color-bg)] border-[var(--color-fg)]' : 'border-[var(--color-line)] text-[var(--color-muted)]'}`}
          >
            KK
          </Link>
        </div>

        <a href="#contacts" className="hidden sm:inline-flex btn btn-primary">
          {tCommon('ctaPrice')}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-[var(--color-line)]"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--color-line)] bg-[var(--color-bg-2)]">
          <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)] py-4 flex flex-col gap-2">
            {NAV.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-base text-[var(--color-fg)]"
              >
                {tNav(item.key)}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link
                href={pathname}
                locale="ru"
                onClick={() => setOpen(false)}
                className={`flex-1 text-center px-3 py-2 text-sm font-bold font-mono ${locale === 'ru' ? 'bg-[var(--color-signal)] text-[var(--color-signal-ink)]' : 'border border-[var(--color-line-strong)] text-[var(--color-muted)]'}`}
              >
                RU
              </Link>
              <Link
                href={pathname}
                locale="kk"
                onClick={() => setOpen(false)}
                className={`flex-1 text-center px-3 py-2 text-sm font-bold font-mono ${locale === 'kk' ? 'bg-[var(--color-signal)] text-[var(--color-signal-ink)]' : 'border border-[var(--color-line-strong)] text-[var(--color-muted)]'}`}
              >
                KK
              </Link>
            </div>
            <a href={telHref} className="btn btn-ghost justify-center mt-2">
              {CONTACTS.phone}
            </a>
            <a href="#contacts" onClick={() => setOpen(false)} className="btn btn-primary justify-center">
              {tCommon('ctaPrice')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
