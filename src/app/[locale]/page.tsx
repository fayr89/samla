import {setRequestLocale, getTranslations} from 'next-intl/server';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sections = [
    {id: 1, name: 'Design System', file: 'src/app/globals.css', done: true},
    {id: 2, name: 'Header (заглушка)', file: 'src/components/layout/header.tsx', done: true},
    {id: 3, name: 'Hero', file: 'src/components/sections/hero.tsx'},
    {id: 4, name: 'Каталог 7 размеров', file: 'src/components/sections/catalog.tsx'},
    {id: 5, name: 'Кому подходит', file: 'src/components/sections/segments.tsx'},
    {id: 6, name: 'B2B преимущества', file: 'src/components/sections/advantages.tsx'},
    {id: 7, name: 'Сетка цен', file: 'src/components/sections/pricing.tsx'},
    {id: 8, name: 'Калькулятор заявки', file: 'src/components/sections/calculator.tsx'},
    {id: 9, name: 'Доставка и оплата', file: 'src/components/sections/shipping.tsx'},
    {id: 10, name: 'FAQ', file: 'src/components/sections/faq.tsx'},
    {id: 11, name: 'CTA + форма', file: 'src/components/sections/contact.tsx'},
    {id: 12, name: 'Footer (заглушка)', file: 'src/components/layout/footer.tsx', done: true}
  ];

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20 bg-[radial-gradient(circle_at_top_right,_#F0F7FF,_transparent_60%)]">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="text-3xl font-extrabold tracking-tight"
            style={{fontFamily: 'var(--font-manrope)'}}
          >
            <span className="text-[#0066ff]">PROBOX</span>
            <span className="text-[#0b1220]">ы</span>
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-semibold">
            v0 pending
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-balance"
          style={{fontFamily: 'var(--font-manrope)'}}
        >
          {t('skeleton.title')}
        </h1>
        <p className="text-lg text-slate-600 mb-12 max-w-xl">
          {t('skeleton.subtitle')}
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            {t('skeleton.next')}
          </h2>
          <ol className="space-y-3">
            {sections.map((s) => (
              <li
                key={s.id}
                className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0"
              >
                <span
                  className={`w-7 h-7 shrink-0 rounded-full text-xs font-bold flex items-center justify-center ${
                    s.done
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {s.done ? '✓' : s.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900">{s.name}</div>
                  <code className="text-xs text-slate-500 break-all">
                    {s.file}
                  </code>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </div>
  );
}
