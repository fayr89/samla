'use server';

import {readFile} from 'fs/promises';
import path from 'path';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import sharp from 'sharp';
import {requireSession} from '@/lib/admin-auth';
import {commitFile} from '@/lib/github-write';
import {TIER_KEYS, type TierKey} from '@/lib/products';

const DATA_PATH = 'data/site.json';

const REQUIRED_ENV = [
  'GITHUB_TOKEN',
  'GITHUB_OWNER',
  'GITHUB_REPO',
  'GITHUB_BRANCH'
];

function missingEnv(): string[] {
  return REQUIRED_ENV.filter(
    (k) => !process.env[k] || process.env[k]!.length === 0
  );
}

function okUrl(key: string): string {
  return `/admin?ok=${encodeURIComponent(key)}`;
}

function errUrl(msg: string): string {
  return `/admin?error=${encodeURIComponent(msg)}`;
}

type SiteData = {
  contacts: Record<string, string>;
  tierMins?: Record<TierKey, number>;
  products: Array<{
    id: string;
    volumeL: number;
    dims: string;
    weightKg: number;
    use: {ru: string; kk: string};
    startPrice: number;
    stock: 'in' | 'order';
    image: string;
    tiers: Record<TierKey, number>;
  }>;
};

async function loadSiteData(): Promise<SiteData> {
  const buf = await readFile(path.join(process.cwd(), DATA_PATH), 'utf8');
  return JSON.parse(buf);
}

function toJson(data: SiteData): string {
  return JSON.stringify(data, null, 2) + '\n';
}

export async function saveContacts(formData: FormData): Promise<void> {
  await requireSession();

  let target: string;
  const missing = missingEnv();
  if (missing.length > 0) {
    target = errUrl(
      `Не заданы env-переменные на Vercel: ${missing.join(', ')}`
    );
  } else {
    try {
      const data = await loadSiteData();
      const fields = [
        'phone',
        'email',
        'address',
        'hours',
        'telegram',
        'whatsapp',
        'company',
        'inn'
      ];
      for (const f of fields) {
        const v = formData.get(f);
        if (typeof v === 'string') data.contacts[f] = v.trim();
      }
      await commitFile(DATA_PATH, toJson(data), 'admin: update contacts');
      revalidatePath('/', 'layout');
      target = okUrl('contacts');
    } catch (e) {
      console.error('saveContacts crashed:', e);
      const msg = e instanceof Error ? e.message : 'неизвестная ошибка';
      target = errUrl(`Не удалось сохранить контакты: ${msg}`);
    }
  }
  redirect(target);
}

export async function saveTierMins(formData: FormData): Promise<void> {
  await requireSession();

  let target: string;
  const missing = missingEnv();
  if (missing.length > 0) {
    target = errUrl(
      `Не заданы env-переменные на Vercel: ${missing.join(', ')}`
    );
  } else {
    try {
      const data = await loadSiteData();
      const next: Partial<Record<TierKey, number>> = {};
      for (const t of TIER_KEYS) {
        const raw = formData.get(`min_${t}`);
        if (typeof raw !== 'string' || raw.trim() === '') {
          throw new Error(`порог для ${t} пустой`);
        }
        const n = parseInt(raw.replace(/\s/g, ''), 10);
        if (!Number.isFinite(n) || n < 1) {
          throw new Error(`порог для ${t} должен быть положительным числом`);
        }
        next[t] = n;
      }
      // Enforce strict ascending order so tierForQty() returns sensible results
      const values = TIER_KEYS.map((t) => next[t]!);
      for (let i = 1; i < values.length; i++) {
        if (values[i] <= values[i - 1]) {
          throw new Error(
            `пороги должны идти по возрастанию: ${values.join(' → ')}`
          );
        }
      }
      data.tierMins = next as Record<TierKey, number>;
      await commitFile(DATA_PATH, toJson(data), 'admin: update tier thresholds');
      revalidatePath('/', 'layout');
      target = okUrl('tierMins');
    } catch (e) {
      console.error('saveTierMins crashed:', e);
      const msg = e instanceof Error ? e.message : 'неизвестная ошибка';
      target = errUrl(`Не удалось сохранить пороги: ${msg}`);
    }
  }
  redirect(target);
}

export async function savePrices(formData: FormData): Promise<void> {
  await requireSession();

  let target: string;
  const missing = missingEnv();
  if (missing.length > 0) {
    target = errUrl(
      `Не заданы env-переменные на Vercel: ${missing.join(', ')}`
    );
  } else {
    try {
      const data = await loadSiteData();
      for (const p of data.products) {
        const sp = formData.get(`startPrice_${p.id}`);
        if (typeof sp === 'string' && sp !== '') {
          const n = parseInt(sp.replace(/\s/g, ''), 10);
          if (Number.isFinite(n) && n >= 0) p.startPrice = n;
        }
        const stock = formData.get(`stock_${p.id}`);
        if (stock === 'in' || stock === 'order') p.stock = stock;

        for (const tier of ['t50', 't200', 't500', 't1000'] as const) {
          const v = formData.get(`tier_${p.id}_${tier}`);
          if (typeof v === 'string' && v !== '') {
            const n = parseInt(v.replace(/\s/g, ''), 10);
            if (Number.isFinite(n) && n >= 0) p.tiers[tier] = n;
          }
        }
      }
      await commitFile(DATA_PATH, toJson(data), 'admin: update pricing');
      revalidatePath('/', 'layout');
      target = okUrl('prices');
    } catch (e) {
      console.error('savePrices crashed:', e);
      const msg = e instanceof Error ? e.message : 'неизвестная ошибка';
      target = errUrl(`Не удалось сохранить цены: ${msg}`);
    }
  }
  redirect(target);
}

export async function uploadProductImage(formData: FormData): Promise<void> {
  await requireSession();

  let target: string;
  const missing = missingEnv();
  if (missing.length > 0) {
    target = errUrl(
      `Не заданы env-переменные на Vercel: ${missing.join(', ')}`
    );
  } else {
    try {
      const sizeId = formData.get('sizeId');
      const file = formData.get('file');
      if (typeof sizeId !== 'string' || !(file instanceof File)) {
        throw new Error('не передан sizeId или файл');
      }
      if (!/^(5|11|22|45|55|65|130)$/.test(sizeId)) {
        throw new Error(`неизвестный размер: ${sizeId}`);
      }
      if (file.size === 0) throw new Error('файл пустой');
      if (file.size > 8 * 1024 * 1024) {
        throw new Error('файл больше 8 МБ');
      }

      const buf = Buffer.from(await file.arrayBuffer());
      const trimmed = await sharp(buf)
        .trim({background: '#FFFFFF', threshold: 12})
        .toBuffer();
      const tMeta = await sharp(trimmed).metadata();
      const TARGET = 1200,
        TARGET_H = 760,
        MAX_W = 1080;
      let h = TARGET_H;
      let w = Math.round((tMeta.width ?? 1) * (h / (tMeta.height ?? 1)));
      if (w > MAX_W) {
        w = MAX_W;
        h = Math.round((tMeta.height ?? 1) * (w / (tMeta.width ?? 1)));
      }
      const scaled = await sharp(trimmed).resize(w, h).toBuffer();
      const out = await sharp({
        create: {
          width: TARGET,
          height: TARGET,
          channels: 4,
          background: {r: 255, g: 255, b: 255, alpha: 1}
        }
      })
        .composite([{input: scaled, gravity: 'center'}])
        .webp({quality: 90})
        .toBuffer();

      await commitFile(
        `public/products/samla-${sizeId}l.webp`,
        out,
        `admin: replace photo for ${sizeId}l`
      );
      revalidatePath('/', 'layout');
      target = okUrl(`photo-${sizeId}`);
    } catch (e) {
      console.error('uploadProductImage crashed:', e);
      const msg = e instanceof Error ? e.message : 'неизвестная ошибка';
      target = errUrl(`Не удалось загрузить фото: ${msg}`);
    }
  }
  redirect(target);
}
