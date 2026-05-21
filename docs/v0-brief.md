# PROBOXы — ТЗ для v0.dev

Документ для генерации UI-компонентов лендинга через [v0.dev](https://v0.dev).
Каждая секция — отдельный промпт. Копируешь блок целиком в новый чат v0,
получаешь React-компонент, мы вставляем в Next.js проект.

---

## 0. Контекст проекта (для понимания, не для копирования в v0)

- **Бренд:** PROBOXы (логотип: `PROBOX` латиницей + `ы` кириллицей в конце)
- **Что продаём:** прозрачные контейнеры SAMLA от IKEA, 7 размеров: 5, 11, 22, 45, 55, 65, 130 л, все с крышками
- **Кому:** B2B, оптовые покупатели — реселлеры (маркетплейсы WB/Ozon), фулфилмент, общепит, архивы, склады/3PL
- **Минимальный заказ:** от 50 шт
- **География:** склад в РФ, доставка по РФ и СНГ (Казахстан в приоритете)
- **Сайт:** RU + KK (казахский)
- **Стек:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Вайб:** яркий и современный, B2B, доверие + энергия

---

## 1. Дизайн-система (закинь это в v0 ПЕРВЫМ промптом, чтобы зафиксировать стиль)

```
Build a design system foundation for a modern B2B wholesale landing page.

Brand: PROBOXы — wholesale supplier of transparent IKEA SAMLA containers in Russia.
Tone: bright, energetic, modern, but trustworthy and business-oriented.

Color palette:
- Primary: #0066FF (electric blue) for CTAs, links, accents
- Primary dark (hover): #0052CC
- Accent: #FF6B35 (vivid orange) for highlights, badges, "hot" prices
- Background: #FFFFFF main, #F8FAFC subtle sections
- Foreground: #0B1220 (almost black) for headings, #475569 (slate-600) for body
- Border: #E2E8F0 (slate-200)
- Success: #10B981, Warning: #F59E0B

Typography:
- Headings: Manrope, weight 700-800, tight tracking (-0.02em on h1)
- Body: Inter, weight 400-500
- Numeric/data: Inter Tabular Nums

Spacing & shape:
- Border radius: 16px on cards, 12px on buttons, 8px on inputs
- Buttons: h-12, px-6, font-semibold, with subtle shadow on primary
- Cards: white bg, border slate-200, shadow-sm, hover:shadow-lg transition
- Sections: py-20 on desktop, py-12 on mobile

Components I will need across the site:
1. Button: primary (blue), secondary (white with border), ghost
2. Badge: small pill, used for "опт от 50 шт", "хит", "в наличии"
3. Card: product card, feature card, testimonial card
4. Input + Select + Textarea: with floating labels, blue focus ring
5. Section header: small uppercase eyebrow + large h2 + supporting paragraph

Output: a Tailwind config + a single demo page showcasing each component in light theme.
Use shadcn/ui patterns. Don't include dark mode for now. All copy in Russian.
```

---

## 2. Header / Навигация

```
Build a sticky header for a B2B wholesale landing page, Russian language.

Brand: PROBOXы (logo is text: "PROBOX" in latin + "ы" in cyrillic, blue color #0066FF, manrope extrabold).

Layout (desktop):
- Left: logo + tagline "Контейнеры SAMLA оптом"
- Center: nav links — Размеры · Цены · Доставка · FAQ · Контакты
- Right: phone number "+7 (000) 000-00-00" with phone icon (clickable tel:),
  language switcher RU / KK (active state on RU),
  primary CTA button "Запросить прайс" (opens modal)

Mobile (under 768px):
- Logo on left, burger menu on right
- Drawer slides from right with: nav links, phone, lang switcher, big CTA button at bottom

Behavior:
- Sticky on scroll, with subtle backdrop-blur and slight shadow after 50px scroll
- On scroll, slightly shrink padding (smooth transition)

Style: bright, modern. White background, blue accent. Tailwind only.
```

---

## 3. Hero

```
Build a hero section for "PROBOXы" — wholesale IKEA SAMLA containers in Russia. B2B audience.

Left column (60% width on desktop):
- Eyebrow chip: "Опт от 50 шт · Склад в РФ" (blue background tint)
- H1 (very large, manrope extrabold, ~64px desktop): «Контейнеры SAMLA от IKEA оптом от 50 шт»
  Make the words "SAMLA" and "оптом" pop — SAMLA in default color, "оптом от 50 шт" highlighted with the orange accent color #FF6B35 via underline or background swipe.
- Subheadline (~20px, slate-600): «7 размеров от 5 до 130 литров. Отгрузка от 1 рабочего дня со склада в Москве. Доставка по всей России и в Казахстан. Документы для юрлиц.»
- Two CTAs side by side:
  - Primary: "Получить прайс-лист" (blue, large, with arrow icon)
  - Secondary: "Позвонить +7 (000) 000-00-00" (white with border, phone icon)
- Trust strip below CTAs: 4 small items inline with check icons —
  «Оригинал IKEA» · «УПД, договор» · «Безнал и НДС» · «Отгрузка от 1 дня»

Right column (40%):
- Hero visual: an isometric / 3D-rendered stack of 4-5 transparent plastic containers
  of different sizes nested and stacked, with subtle blue glow/shadow.
  Use placeholder images for now (next/image with /placeholder.svg).
- Floating badge in top-right: "ХИТ" pill in orange.
- Floating badge in bottom-left: card with "1200+ B2B-клиентов" + small avatar group.

Background: subtle radial gradient from white to very light blue (#F0F7FF) in top-right corner.

Mobile: stack vertically, visual goes below text, CTAs full-width.
```

---

## 4. Каталог размеров (7 SKU)

```
Build a product catalog grid for the SAMLA container line by IKEA.
There are 7 sizes. Display as responsive grid: 4 columns desktop, 2 tablet, 1 mobile.

Section header (centered):
- Eyebrow: "КАТАЛОГ"
- H2: «7 размеров под любую задачу»
- Subtitle: «От компактных боксов 5 л до промышленных 130 л. Все с крышками, штабелируются, прозрачный пластик.»

Each card has:
- Top: product image placeholder (next/image, square aspect, light slate background)
- Badge top-left: "В наличии" (green pill) or "Под заказ" (orange) — make first 5 "В наличии"
- Volume label, huge: «5 л» / «11 л» / «22 л» / «45 л» / «55 л» / «65 л» / «130 л» (manrope extrabold)
- Dimensions row, small (slate-500): «Д×Ш×В: 28×19×14 см» (use placeholder dimensions for now)
- Bullet list, 2 lines: weight + suggested use (e.g. "Для документов и мелочи")
- Bottom row: «от {price} ₽/шт» in blue + small "→" button "Подробнее"

Use these placeholder data fields:
1. 5 л — 28×19×14 см — 0.3 кг — «Документы, мелкая фурнитура» — от 240 ₽
2. 11 л — 39×28×14 см — 0.5 кг — «Канцелярия, текстиль» — от 350 ₽
3. 22 л — 39×28×28 см — 0.8 кг — «Игрушки, обувь» — от 490 ₽
4. 45 л — 56×39×28 см — 1.4 кг — «Сезонные вещи, инструменты» — от 690 ₽
5. 55 л — 78×56×18 см — 1.6 кг — «Постельное бельё, одежда» — от 790 ₽
6. 65 л — 56×39×42 см — 1.9 кг — «Архивы, склад товаров» — от 890 ₽
7. 130 л — 78×56×43 см — 3.5 кг — «Промышленное хранение» — от 1490 ₽

Card hover: lift up 4px, shadow grows, image scales 1.03.
Use Tailwind only, all in Russian. Make it bright and modern.
```

---

## 5. Кому подходит (сегменты)

```
Build a "Who buys from us" section showing 6 B2B customer segments. Russian language.

Section header:
- Eyebrow: «КОМУ ПОДХОДИТ»
- H2: «Берут оптом для»
- Subtitle: «От первого заказа в 50 штук до контракта на десятки тысяч в месяц.»

Grid: 3 columns desktop, 2 tablet, 1 mobile.

Each card: large colored icon (use lucide-react), bold title, 2-line description.
Cards have white background, rounded-2xl, border slate-200, icon in a soft colored square 56×56.

Segments (use lucide-react icon names):
1. ShoppingBag — «Селлеры маркетплейсов» — «Упаковка и фасовка товаров для Wildberries, Ozon, Я.Маркета»
2. PackageCheck — «Фулфилмент и 3PL» — «Хранение, сортировка, отгрузка со склада клиента»
3. UtensilsCrossed — «Общепит и HoReCa» — «Хранение продуктов, инвентаря, расходников»
4. Archive — «Архивы и типографии» — «Долгосрочное хранение документов и тиражей»
5. Warehouse — «Производство» — «Комплектующие, инструмент, готовая продукция»
6. Store — «Розничные сети» — «Магазины фикс-прайс, хозтовары, товары для дома»

Hover: icon background goes to brand blue, icon turns white, smooth transition.
```

---

## 6. B2B-преимущества

```
Build a 4-card feature section emphasizing wholesale advantages. Russian.

Header:
- Eyebrow: «ПОЧЕМУ PROBOXы»
- H2: «B2B-условия без посредников»

4 cards in one row (stack on mobile), each tall card with:
- Large number 01/02/03/04 in light gray (huge, outline style)
- Icon in top-right corner
- Bold title
- Paragraph description

Content:
1. «Склад в Москве» — «7 размеров всегда в наличии. Отгружаем в день оплаты, утренние заказы — день в день.»
2. «Документы для юрлиц» — «УПД, счёт, договор, спецификация. Работаем с НДС и без, по безналу.»
3. «Доставка по РФ и СНГ» — «Своя логистика по Москве и МО. ТК по России. Прямые отгрузки в Казахстан, Беларусь, Кыргызстан.»
4. «Гарантия оригинала» — «Поставка напрямую с фабрики IKEA. Сертификаты, маркировка, оригинальная упаковка.»

Style: very white, lots of whitespace, blue accents. Numbers in outline style (text-stroke).
```

---

## 7. Сетка цен по объёму (price tiers table)

```
Build a wholesale pricing table for 7 product sizes × 4 volume tiers. Russian language. B2B style.

Header:
- Eyebrow: «ОПТОВЫЕ ЦЕНЫ»
- H2: «Чем больше объём — тем ниже цена»
- Subtitle: «Цена за 1 штуку в рублях. Скачайте полный прайс с актуальными ценами.»

Table layout (responsive — converts to cards on mobile):
- Columns: Размер | от 50 шт | от 200 шт | от 500 шт | от 1000 шт | Индивидуально
- Rows: 5 л / 11 л / 22 л / 45 л / 55 л / 65 л / 130 л

Use placeholder pricing (descending by tier, 10-15% drop per tier):
- 5 л: 240 / 220 / 200 / 185 / по запросу
- 11 л: 350 / 320 / 295 / 270 / по запросу
- 22 л: 490 / 450 / 410 / 380 / по запросу
- 45 л: 690 / 630 / 580 / 540 / по запросу
- 55 л: 790 / 720 / 660 / 615 / по запросу
- 65 л: 890 / 820 / 750 / 700 / по запросу
- 130 л: 1490 / 1370 / 1260 / 1180 / по запросу

Visual:
- Header row: blue background, white text, sticky on horizontal scroll
- Volume column: bold, blue
- Best tier column (от 1000 шт): subtle orange highlight as "best deal"
- Last column: shows "по запросу" with small chat-bubble icon, hover shows "+ персональная скидка"

Below table: two CTAs side by side
- Primary: "Скачать прайс-лист (PDF)"
- Secondary: "Получить персональную цену"

Mobile: each size becomes a card with vertical tier list.
```

---

## 8. Калькулятор заявки

```
Build an interactive wholesale order calculator. Russian. B2B style.

Section header:
- Eyebrow: «КАЛЬКУЛЯТОР»
- H2: «Рассчитайте стоимость вашего заказа»
- Subtitle: «Укажите количество по каждому размеру — получите ориентировочную сумму и условия отгрузки.»

Two-column layout, left = inputs (60%), right = summary card (40%, sticky).

Left side — list of 7 rows, one per size:
- Small product thumbnail on left
- Size label "5 л" + dimensions in slate-500
- Counter input on right: minus button | number input | plus button
  Min 0, step 10 (since wholesale)
- Below input: shows current tier price («250 ₽/шт») that updates based on quantity

Right side — sticky summary card:
- "Ваш заказ" header
- List of selected sizes with subtotals (only show items with qty > 0)
- Total quantity: «Итого: X шт»
- Total amount: «Сумма: X ₽» (large, bold, blue)
- Volume tier badge: shows current tier ("ОТ 200 ШТ — средний опт") with progress to next tier
- Disclaimer: «Цена ориентировочная. Точную сумму с учётом доставки и скидок пришлёт менеджер.»
- CTA button full-width: "Отправить заявку"
- Below: text link "или скачать прайс PDF"

Logic (pseudocode the developer will wire later):
- As user changes quantities, total qty determines tier (50/200/500/1000)
- All prices recalculate based on that tier
- Use the pricing data from the price table section

Style: clean, modern, lots of whitespace, blue accents, smooth number animations.
```

---

## 9. Доставка и оплата

```
Build a 2-column "Доставка и оплата" (Shipping & Payment) section. Russian.

Header:
- Eyebrow: «ЛОГИСТИКА»
- H2: «Доставка и оплата»

Left card — «Доставка»:
- Icon: Truck (lucide)
- Title
- List with check-icons:
  - «По Москве и МО — своя логистика, от 1 дня»
  - «По России — Деловые Линии, ПЭК, СДЭК, КИТ»
  - «В Казахстан, Беларусь, Кыргызстан — прямые отгрузки»
  - «Самовывоз со склада в Подольске бесплатно»
- Small map/region badge strip: МСК · СПб · ЕКБ · НСК · КЗН · АЛА · АСТ

Right card — «Оплата»:
- Icon: Wallet (lucide)
- Title
- List:
  - «Безналичный расчёт по счёту»
  - «С НДС и без НДС»
  - «Отсрочка платежа от 2-го заказа»
  - «Документы: УПД, договор, счёт-фактура»
- Logos strip: Сбербанк, Тинькофф Бизнес, Альфа-Банк (use placeholder text logos)

Both cards same height, white bg, rounded-2xl, slate-200 border.
```

---

## 10. FAQ

```
Build a FAQ accordion for a B2B wholesale landing page. Russian.

Header centered:
- Eyebrow: «FAQ»
- H2: «Частые вопросы»

Layout: single column, max-width ~720px, centered.

8 questions, all collapsed by default except first one (open):

1. «Это оригинальные контейнеры IKEA?»
   «Да. Мы работаем напрямую с фабрикой-производителем. На партии есть сертификаты и оригинальная маркировка SAMLA. По запросу пришлём фото со склада.»

2. «Какой минимальный заказ?»
   «От 50 штук одного размера или сборного заказа из разных размеров. Заказы меньше 50 шт — индивидуально, пишите менеджеру.»

3. «Сколько стоит доставка?»
   «По Москве и МО — от 800 ₽, день в день. По России — рассчитываем под партию, обычно 5-15% от стоимости заказа. В Казахстан и СНГ — индивидуально.»

4. «Работаете с маркетплейсами?»
   «Да, упаковываем под требования WB/Ozon/Я.Маркета. Можем отгрузить напрямую в фулфилмент или на ваш склад.»

5. «Какие документы предоставляете?»
   «Полный пакет для юрлиц и ИП: договор поставки, счёт, УПД, спецификация. Работаем с НДС и без.»

6. «Есть ли скидка от объёма?»
   «Да, сетка скидок до 25% при заказе от 1000 шт. При регулярных закупках — индивидуальные условия и отсрочка платежа.»

7. «Сколько занимает отгрузка?»
   «Заказы оплаченные до 12:00 — отгружаем в этот же день. После 12:00 — на следующий рабочий день. Крупные партии (5000+ шт) — 2-3 дня.»

8. «Можно ли посмотреть товар вживую?»
   «Да, приезжайте на склад в Подольске по записи. Покажем все размеры, дадим образцы для теста.»

Style: rounded-xl items, slate-200 borders, smooth chevron rotation on open, blue accent on active.
```

---

## 11. Финальный CTA + форма заявки

```
Build a final CTA section with a B2B inquiry form. Russian.

Two columns. Left = headline + benefits (50%), right = form card (50%).

Left column:
- Eyebrow: «ОСТАВИТЬ ЗАЯВКУ»
- H2 (large): «Получите персональный прайс за 15 минут»
- Subhead: «Менеджер перезвонит, уточнит объём и пришлёт коммерческое предложение с лучшей ценой и сроками отгрузки.»
- 3 bullet points with check icons:
  «Расчёт стоимости с учётом доставки»
  «Образцы товара по запросу»
  «Спецусловия для постоянных клиентов»
- Small text below: «Или напишите напрямую: tg @proboxy · wa.me/79000000000»

Right column — form card on white bg, rounded-2xl, shadow-lg:
- Form title small: «Заявка на оптовую поставку»
- Fields (top to bottom, all required except comment):
  - Имя и фамилия (input)
  - Компания (input)
  - Телефон (input, masked +7)
  - Email (input)
  - Объём заказа (select: «до 200 шт» / «200-500» / «500-1000» / «1000+» / «не знаю, подскажите»)
  - Какие размеры интересуют (multi-select chips: 5 / 11 / 22 / 45 / 55 / 65 / 130 л)
  - Комментарий (textarea, optional, placeholder «город доставки, сроки, особые условия»)
- Submit button full-width: «Отправить заявку»
- Below: small text «Нажимая, вы соглашаетесь с политикой обработки персональных данных»

Style: floating labels on inputs, blue focus ring, smooth chip selection states.
Section background: subtle gradient from white to #F0F7FF.
```

---

## 12. Footer

```
Build a footer for PROBOXы. Russian. Wide, structured, B2B.

4 columns + bottom row.

Column 1 (logo + about):
- Logo: "PROBOXы" + tagline «Оптовая поставка контейнеров SAMLA от IKEA»
- Address: «Москва, Подольск, ул. ХХХ, стр. ХХ»
- Phone (large, clickable): «+7 (000) 000-00-00»
- Email: «sales@proboxy.ru»
- Mode: «Пн-Пт 9:00–19:00 МСК»

Column 2 — «Каталог»:
- 5 л · 11 л · 22 л · 45 л · 55 л · 65 л · 130 л (as anchor links)

Column 3 — «Компания»:
- О нас · Доставка · Оплата · FAQ · Контакты

Column 4 — «Для бизнеса»:
- Прайс-лист (PDF) · Договор-оферта · Реквизиты · Стать дилером · Скачать каталог

Bottom row (above © line):
- Lang switcher: RU / KK
- Messengers: Telegram, WhatsApp, Email — small round buttons

Very bottom:
- © 2026 PROBOXы. ООО «{name}», ИНН 0000000000
- Right: «Политика конфиденциальности · Согласие на обработку ПД»

Dark background: #0B1220, light text. Blue link accents on hover.
```

---

## Порядок работы с v0

1. **Промпт #1** (дизайн-система) — обязательно первым, чтобы зафиксировать токены.
2. Дальше по порядку 2-12. Каждый промпт — новый чат в v0 (или один длинный чат с памятью, если v0 это поддерживает в твоём тарифе).
3. После каждой генерации жми «Add to project» или скачивай код — мы вставим в Next.js.
4. Если результат не нравится — итерируй в v0: «сделай хедер с большим логотипом», «увеличь hero», «убери трасть-стрип» и т.д.

## Что я делаю параллельно

Поднимаю Next.js 15 проект с базовой структурой, i18n (RU/KK), shadcn/ui, чтобы как только ты принесёшь сгенерированные секции — мы их сразу интегрировали.
