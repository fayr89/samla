import siteData from '@/../data/site.json';

export type TierKey = 't50' | 't200' | 't500' | 't1000';

export const TIER_KEYS: TierKey[] = ['t50', 't200', 't500', 't1000'];

const FALLBACK_TIER_MIN: Record<TierKey, number> = {
  t50: 50,
  t200: 200,
  t500: 500,
  t1000: 1000
};

export type ProductSize = {
  id: string;
  volumeL: number;
  dims: string;
  weightKg: number;
  use: {ru: string; kk: string};
  startPrice: number;
  stock: 'in' | 'order';
  image: string;
  tiers: Record<TierKey, number>;
};

export type Contacts = {
  phone: string;
  email: string;
  address: string;
  hours: string;
  telegram: string;
  whatsapp: string;
  company: string;
  inn: string;
};

export const SIZES: ProductSize[] = siteData.products as ProductSize[];

export const CONTACTS: Contacts = siteData.contacts as Contacts;

export const TIER_PRICES: Record<string, Record<TierKey, number>> = Object.fromEntries(
  SIZES.map((s) => [s.id, s.tiers])
);

export const TIER_MIN: Record<TierKey, number> = (() => {
  const raw = (siteData as {tierMins?: Partial<Record<TierKey, number>>}).tierMins;
  return {
    t50: raw?.t50 ?? FALLBACK_TIER_MIN.t50,
    t200: raw?.t200 ?? FALLBACK_TIER_MIN.t200,
    t500: raw?.t500 ?? FALLBACK_TIER_MIN.t500,
    t1000: raw?.t1000 ?? FALLBACK_TIER_MIN.t1000
  };
})();

export function tierForQty(qty: number): TierKey {
  if (qty >= TIER_MIN.t1000) return 't1000';
  if (qty >= TIER_MIN.t500) return 't500';
  if (qty >= TIER_MIN.t200) return 't200';
  return 't50';
}

export function tierLabelRu(tier: TierKey): string {
  return `от ${TIER_MIN[tier]} шт`;
}

export function formatRub(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}
