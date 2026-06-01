import type {Metadata} from 'next';
import {Manrope, Inter, JetBrains_Mono} from 'next/font/google';
import '../globals.css';

const manrope = Manrope({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
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
      className={`${manrope.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg-2)]">{children}</body>
    </html>
  );
}
