import Image from 'next/image';
import {requireSession} from '@/lib/admin-auth';
import {Input} from '@/components/ui/input';
import {SIZES, CONTACTS, TIER_MIN, TIER_KEYS, tierLabelRu} from '@/lib/products';
import {
  saveContacts,
  savePrices,
  saveTierMins,
  uploadProductImage
} from './actions';

export const metadata = {title: 'Admin · Управление', robots: {index: false}};

const TIERS = TIER_KEYS;

const OK_LABEL: Record<string, string> = {
  contacts: 'Контакты сохранены. Vercel передеплоит за 1–2 мин.',
  prices: 'Цены сохранены. Vercel передеплоит за 1–2 мин.',
  tierMins: 'Пороги объёмов сохранены. Vercel передеплоит за 1–2 мин.'
};

function okMessage(key: string): string {
  if (OK_LABEL[key]) return OK_LABEL[key];
  if (key.startsWith('photo-')) {
    return `Фото для ${key.slice(6)} л сохранено. Vercel передеплоит за 1–2 мин.`;
  }
  return 'Сохранено.';
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ok?: string; error?: string}>;
}) {
  const {email} = await requireSession();
  const sp = await searchParams;

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-10">
      <header className="flex items-baseline justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            <span className="text-[#0066ff]">PROBOX</span>
            <span className="text-[#0b1220]">ы</span>
            <span className="text-muted-foreground font-normal ml-3">admin</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Вы вошли как {email}. Каждое сохранение коммитит в репо → Vercel
            передеплоит за 1–2 мин.
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="h-10 px-4 rounded-xl border border-border bg-background hover:bg-muted text-sm font-semibold"
          >
            Выйти
          </button>
        </form>
      </header>

      {sp.error ? (
        <div className="mb-6 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
          <p className="font-semibold">Ошибка</p>
          <p className="mt-1 text-foreground">{sp.error}</p>
        </div>
      ) : sp.ok ? (
        <div className="mb-6 rounded-xl bg-success/10 border border-success/30 p-4 text-sm">
          <p className="font-semibold text-success">Готово</p>
          <p className="mt-1 text-foreground">{okMessage(sp.ok)}</p>
        </div>
      ) : null}

      <section className="bg-background rounded-2xl border border-border p-6 md:p-8 mb-8">
        <h2 className="font-display text-xl font-bold mb-1">Контактная информация</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Отображается в шапке, футере и блоке заявки.
        </p>
        <form action={saveContacts} className="grid sm:grid-cols-2 gap-4">
          <Field name="phone" label="Телефон" defaultValue={CONTACTS.phone} />
          <Field name="email" label="Email" type="email" defaultValue={CONTACTS.email} />
          <Field
            name="address"
            label="Адрес"
            defaultValue={CONTACTS.address}
            wide
          />
          <Field name="hours" label="График" defaultValue={CONTACTS.hours} />
          <Field
            name="telegram"
            label="Telegram URL"
            defaultValue={CONTACTS.telegram}
            placeholder="https://t.me/..."
          />
          <Field
            name="whatsapp"
            label="WhatsApp URL"
            defaultValue={CONTACTS.whatsapp}
            placeholder="https://wa.me/..."
          />
          <Field name="company" label="Юр. лицо" defaultValue={CONTACTS.company} />
          <Field name="inn" label="ИНН" defaultValue={CONTACTS.inn} />
          <div className="sm:col-span-2">
            <SubmitBtn>Сохранить контакты</SubmitBtn>
          </div>
        </form>
      </section>

      <section className="bg-background rounded-2xl border border-border p-6 md:p-8 mb-8">
        <h2 className="font-display text-xl font-bold mb-1">Пороги объёмов</h2>
        <p className="text-sm text-muted-foreground mb-6">
          С какого количества штук начинает действовать каждая ступень
          оптовой цены. Подписи колонок в прайсе и в калькуляторе обновятся
          автоматически. Значения должны идти по возрастанию.
        </p>
        <form action={saveTierMins} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TIERS.map((t) => (
            <div key={t} className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ступень {TIERS.indexOf(t) + 1}
              </label>
              <NumInput name={`min_${t}`} defaultValue={TIER_MIN[t]} />
              <p className="text-xs text-muted-foreground">
                сейчас: {tierLabelRu(t)}
              </p>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4">
            <SubmitBtn>Сохранить пороги</SubmitBtn>
          </div>
        </form>
      </section>

      <section className="bg-background rounded-2xl border border-border p-6 md:p-8 mb-8">
        <h2 className="font-display text-xl font-bold mb-1">Прайс по объёмам</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Цены в рублях за штуку. «Доступность» меняет бейдж на карточке («В
          наличии» / «Под заказ»).
        </p>
        <form action={savePrices} className="space-y-4">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-2 py-2 font-semibold">Размер</th>
                  <th className="px-2 py-2 font-semibold">«от» (карточка)</th>
                  {TIERS.map((t) => (
                    <th key={t} className="px-2 py-2 font-semibold">
                      {tierLabelRu(t)}
                    </th>
                  ))}
                  <th className="px-2 py-2 font-semibold">Доступность</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s.id} className="border-t border-border">
                    <td className="px-2 py-2 font-display font-bold text-primary tabular-nums">
                      {s.volumeL} л
                    </td>
                    <td className="px-2 py-2">
                      <NumInput
                        name={`startPrice_${s.id}`}
                        defaultValue={s.startPrice}
                      />
                    </td>
                    {TIERS.map((t) => (
                      <td key={t} className="px-2 py-2">
                        <NumInput
                          name={`tier_${s.id}_${t}`}
                          defaultValue={s.tiers[t]}
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2">
                      <select
                        name={`stock_${s.id}`}
                        defaultValue={s.stock}
                        className="h-10 px-3 rounded-lg border border-border bg-background text-sm"
                      >
                        <option value="in">В наличии</option>
                        <option value="order">Под заказ</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SubmitBtn>Сохранить цены</SubmitBtn>
        </form>
      </section>

      <section className="bg-background rounded-2xl border border-border p-6 md:p-8">
        <h2 className="font-display text-xl font-bold mb-1">Фото товаров</h2>
        <p className="text-sm text-muted-foreground mb-6">
          PNG/JPG/WebP до 8 МБ. Я авто-обрежу фон, отскейлю под 1200×1200 и
          сохраню как WebP.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SIZES.map((s) => (
            <ImageSlot key={s.id} sizeId={s.id} volumeL={s.volumeL} image={s.image} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = 'text',
  placeholder,
  wide
}: {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
  placeholder?: string;
  wide?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${wide ? 'sm:col-span-2' : ''}`}>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <Input name={name} defaultValue={defaultValue} type={type} placeholder={placeholder} />
    </div>
  );
}

function NumInput({name, defaultValue}: {name: string; defaultValue: number}) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      inputMode="numeric"
      pattern="[0-9]*"
      className="w-24 h-10 px-3 rounded-lg border border-border bg-background text-sm tabular-nums text-right"
    />
  );
}

function SubmitBtn({children}: {children: React.ReactNode}) {
  return (
    <button
      type="submit"
      className="h-12 px-6 rounded-xl bg-primary text-white font-semibold shadow-[0_4px_14px_0_rgba(0,102,255,0.35)] hover:bg-[#0052cc] transition"
    >
      {children}
    </button>
  );
}

function ImageSlot({
  sizeId,
  volumeL,
  image
}: {
  sizeId: string;
  volumeL: number;
  image: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="font-display font-bold mb-2 text-sm">{volumeL} л</div>
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-3">
        <Image
          src={image}
          alt={`SAMLA ${volumeL} л`}
          fill
          sizes="200px"
          className="object-contain"
        />
      </div>
      <form action={uploadProductImage} encType="multipart/form-data" className="space-y-2">
        <input type="hidden" name="sizeId" value={sizeId} />
        <input
          type="file"
          name="file"
          accept="image/png,image/jpeg,image/webp"
          required
          className="block w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-semibold file:cursor-pointer"
        />
        <button
          type="submit"
          className="w-full h-9 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-[#0052cc] transition"
        >
          Заменить
        </button>
      </form>
    </div>
  );
}
