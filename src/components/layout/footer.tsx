import {Mail, Phone, MapPin, Send, MessageCircle} from 'lucide-react';
import {CONTACTS} from '@/lib/products';

export function Footer() {
  const year = new Date().getFullYear();

  const catalog = [
    {label: '5 л', href: '#size-5'},
    {label: '11 л', href: '#size-11'},
    {label: '22 л', href: '#size-22'},
    {label: '45 л', href: '#size-45'},
    {label: '55 л', href: '#size-55'},
    {label: '65 л', href: '#size-65'},
    {label: '130 л', href: '#size-130'}
  ];

  const company = [
    {label: 'О нас', href: '#about'},
    {label: 'Доставка', href: '#shipping'},
    {label: 'Оплата', href: '#payment'},
    {label: 'FAQ', href: '#faq'},
    {label: 'Контакты', href: '#contacts'}
  ];

  const business = [
    {label: 'Прайс-лист (PDF)', href: '#price-pdf'},
    {label: 'Договор-оферта', href: '#offer'},
    {label: 'Реквизиты', href: '#requisites'},
    {label: 'Стать дилером', href: '#dealer'}
  ];

  return (
    <footer className="bg-[#0b1220] text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <div
              className="text-2xl font-extrabold tracking-tight mb-3"
              style={{fontFamily: 'var(--font-manrope)'}}
            >
              <span className="text-[#3a86ff]">PROBOX</span>
              <span className="text-white">ы</span>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              Оптовая поставка контейнеров SAMLA от IKEA. Склад в РФ, отгрузка от 1 дня.
            </p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                <span>{CONTACTS.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                <a
                  href={`tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`}
                  className="hover:text-white font-semibold"
                >
                  {CONTACTS.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="hover:text-white"
                >
                  {CONTACTS.email}
                </a>
              </li>
            </ul>
            <p className="text-xs text-slate-500 mt-4">{CONTACTS.hours}</p>
          </div>

          <FooterColumn title="Каталог" items={catalog} />
          <FooterColumn title="Компания" items={company} />
          <FooterColumn title="Для бизнеса" items={business} />
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#0066ff] transition"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#0066ff] transition"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACTS.email}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#0066ff] transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © {year} PROBOXы. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items
}: {
  title: string;
  items: {label: string; href: string}[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="text-sm text-slate-400 hover:text-white transition"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
