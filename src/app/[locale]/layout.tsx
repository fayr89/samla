import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Manrope, Inter} from 'next/font/google';
import {routing} from '@/i18n/routing';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import '../globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://samla-sooty.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PROBOXы — контейнеры SAMLA от IKEA оптом',
  description:
    'Оптовая поставка контейнеров SAMLA от IKEA от 50 шт. 7 размеров от 5 до 130 литров. Склад в РФ. Доставка по России и в Казахстан.',
  keywords: [
    'SAMLA оптом',
    'контейнеры IKEA оптом',
    'пластиковые ящики оптом',
    'B2B SAMLA',
    'PROBOXы'
  ],
  openGraph: {
    type: 'website',
    siteName: 'PROBOXы',
    title: 'PROBOXы — контейнеры SAMLA от IKEA оптом от 50 шт',
    description:
      '7 размеров от 5 до 130 литров. Склад в РФ. Доставка по всей России и в Казахстан. Документы для юрлиц.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROBOXы — контейнеры SAMLA от IKEA оптом',
    description:
      '7 размеров от 5 до 130 литров. Склад в РФ. Доставка по всей России и в Казахстан.'
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
