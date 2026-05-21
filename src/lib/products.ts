export type ProductSize = {
  id: string;
  volumeL: number;
  dims: string;
  weightKg: number;
  use: {ru: string; kk: string};
  startPrice: number;
  stock: 'in' | 'order';
  image: string;
};

export const SIZES: ProductSize[] = [
  {
    id: '5',
    volumeL: 5,
    dims: '28×19×14 см',
    weightKg: 0.3,
    use: {
      ru: 'Документы, мелкая фурнитура',
      kk: 'Құжаттар, ұсақ фурнитура'
    },
    startPrice: 240,
    stock: 'in',
    image: '/products/samla-5l.webp'
  },
  {
    id: '11',
    volumeL: 11,
    dims: '39×28×14 см',
    weightKg: 0.5,
    use: {ru: 'Канцелярия, текстиль', kk: 'Кеңсе тауарлары, тоқыма'},
    startPrice: 350,
    stock: 'in',
    image: '/products/samla-11l.webp'
  },
  {
    id: '22',
    volumeL: 22,
    dims: '39×28×28 см',
    weightKg: 0.8,
    use: {ru: 'Игрушки, обувь', kk: 'Ойыншықтар, аяқ киім'},
    startPrice: 490,
    stock: 'in',
    image: '/products/samla-22l.webp'
  },
  {
    id: '45',
    volumeL: 45,
    dims: '56×39×28 см',
    weightKg: 1.4,
    use: {
      ru: 'Сезонные вещи, инструменты',
      kk: 'Маусымдық заттар, құралдар'
    },
    startPrice: 690,
    stock: 'in',
    image: '/products/samla-45l.webp'
  },
  {
    id: '55',
    volumeL: 55,
    dims: '78×56×18 см',
    weightKg: 1.6,
    use: {ru: 'Постельное бельё, одежда', kk: 'Төсек-орын, киім'},
    startPrice: 790,
    stock: 'in',
    image: '/products/samla-55l.webp'
  },
  {
    id: '65',
    volumeL: 65,
    dims: '56×39×42 см',
    weightKg: 1.9,
    use: {ru: 'Архивы, склад товаров', kk: 'Мұрағат, тауар қоймасы'},
    startPrice: 890,
    stock: 'order',
    image: '/products/samla-65l.webp'
  },
  {
    id: '130',
    volumeL: 130,
    dims: '78×56×43 см',
    weightKg: 3.5,
    use: {ru: 'Промышленное хранение', kk: 'Өнеркәсіптік сақтау'},
    startPrice: 1490,
    stock: 'order',
    image: '/products/samla-130l.webp'
  }
];

export type TierKey = 't50' | 't200' | 't500' | 't1000';

export const TIER_LABEL: Record<TierKey, {ru: string; kk: string}> = {
  t50: {ru: 'от 50 шт', kk: '50 данадан'},
  t200: {ru: 'от 200 шт', kk: '200 данадан'},
  t500: {ru: 'от 500 шт', kk: '500 данадан'},
  t1000: {ru: 'от 1000 шт', kk: '1000 данадан'}
};

export const TIER_MIN: Record<TierKey, number> = {
  t50: 50,
  t200: 200,
  t500: 500,
  t1000: 1000
};

export const TIER_PRICES: Record<string, Record<TierKey, number>> = {
  '5': {t50: 240, t200: 220, t500: 200, t1000: 185},
  '11': {t50: 350, t200: 320, t500: 295, t1000: 270},
  '22': {t50: 490, t200: 450, t500: 410, t1000: 380},
  '45': {t50: 690, t200: 630, t500: 580, t1000: 540},
  '55': {t50: 790, t200: 720, t500: 660, t1000: 615},
  '65': {t50: 890, t200: 820, t500: 750, t1000: 700},
  '130': {t50: 1490, t200: 1370, t500: 1260, t1000: 1180}
};

export function tierForQty(qty: number): TierKey {
  if (qty >= TIER_MIN.t1000) return 't1000';
  if (qty >= TIER_MIN.t500) return 't500';
  if (qty >= TIER_MIN.t200) return 't200';
  return 't50';
}

export function formatRub(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}
