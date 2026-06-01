'use client';

import {useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {Menu, X, Phone} from 'lucide-react';
import {CONTACTS} from '@/lib/products';

const navItems = [
  {key: 'sizes', href: '#sizes'},
  {key: 'prices', href: '#prices'},
  {key: 'shipping', href: '#shipping'},
  {key: 'faq', href: '#faq'},
  {key: 'contacts', href: '#contacts'}
] as const;

export function Header() {
  const t = useTranslations();
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2 shrink-0">
          <span
            className="text-2xl lg:text-3xl font-extrabold tracking-tight"
            style={{fontFamily: 'var(--font-manrope)'}}
          >
            <span className="text-[#0066ff]">PROBOX</span>
            <span className="text-[#0b1220]">ы</span>
          </span>
          <span className="hidden lg:inline text-xs text-slate-500">
            {t('common.tagline')}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-[#0066ff] transition-colors"
            >
              {tNav(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <a
            href={`tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[#0066ff]"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xl:inline">{CONTACTS.phone}</span>
          </a>

          <div className="hidden sm:flex items-center rounded-lg bg-slate-100 p-0.5">
            <Link
              href={pathname}
              locale="ru"
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                locale === 'ru'
                  ? 'bg-white text-[#0066ff] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              RU
            </Link>
            <Link
              href={pathname}
              locale="kk"
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                locale === 'kk'
                  ? 'bg-white text-[#0066ff] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              KK
            </Link>
          </div>

          <a
            href="#contacts"
            className="hidden sm:inline-flex items-center justify-center h-10 lg:h-11 px-4 lg:px-5 rounded-xl bg-[#0066ff] text-white text-sm font-semibold shadow-sm hover:bg-[#0052cc] transition"
          >
            {t('common.ctaPrimary')}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100"
            aria-label="Меню"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-base font-medium text-slate-700"
              >
                {tNav(item.key)}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Link
                href={pathname}
                locale="ru"
                onClick={() => setOpen(false)}
                className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-bold ${
                  locale === 'ru'
                    ? 'bg-[#0066ff] text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                RU
              </Link>
              <Link
                href={pathname}
                locale="kk"
                onClick={() => setOpen(false)}
                className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-bold ${
                  locale === 'kk'
                    ? 'bg-[#0066ff] text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                KK
              </Link>
            </div>
            <a
              href={`tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              {CONTACTS.phone}
            </a>
            <a
              href="#contacts"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center h-12 rounded-xl bg-[#0066ff] text-white text-base font-semibold"
            >
              {t('common.ctaPrimary')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
