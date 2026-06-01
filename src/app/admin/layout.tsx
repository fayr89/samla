import type {Metadata} from 'next';
import {Manrope, Inter} from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Admin · PROBOXы',
  robots: {index: false, follow: false}
};

export default function AdminLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-muted">{children}</body>
    </html>
  );
}
