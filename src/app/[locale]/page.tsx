import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/sections/hero';
import {Catalog} from '@/components/sections/catalog';
import {Segments} from '@/components/sections/segments';
import {Advantages} from '@/components/sections/advantages';
import {Pricing} from '@/components/sections/pricing';
import {Calculator} from '@/components/sections/calculator';
import {Shipping} from '@/components/sections/shipping';
import {Faq} from '@/components/sections/faq';
import {Contact} from '@/components/sections/contact';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Catalog />
      <Segments />
      <Advantages />
      <Pricing />
      <Calculator />
      <Shipping />
      <Faq />
      <Contact />
    </>
  );
}
