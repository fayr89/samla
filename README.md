# PROBOXы — лендинг

B2B-лендинг оптовых поставок контейнеров SAMLA от IKEA. Next.js 16 + Tailwind 4 +
next-intl (RU/KK). Деплой на Vercel, продакшен — `samla-sooty.vercel.app`.

## Локальная разработка

```bash
npm install
npm run dev
```

## Структура

- `src/app/[locale]/` — лендинг (RU/KK)
- `src/app/admin/` — админ-панель (вход по магик-линку на ADMIN_EMAIL)
- `src/components/sections/` — секции лендинга
- `src/components/layout/` — header, footer
- `src/components/ui/` — дизайн-система
- `data/site.json` — единственный источник правды для контактов, цен, товаров
- `public/products/` — фото товаров (1200×1200 WebP)
- `docs/v0-brief.md` — ТЗ для v0.dev генерации UI

## Админка

Адрес: `/admin`. Вход по магик-линку, который приходит на `ADMIN_EMAIL` через
Resend. После сохранения формы: коммит в репо через GitHub API → Vercel
автоматически передеплоит (~1–2 мин).

### Что можно править

- Контакты (телефон, email, адрес, график, telegram, whatsapp, ИНН, юр.лицо)
- Цены: для каждого размера — «от» (карточка), 4 тира опта, статус (в наличии /
  под заказ)
- Фото товаров: загружаешь любой PNG/JPG/WebP до 8 МБ, сервер авто-обрезает
  фон, скейлит до 1200×1200 WebP и коммитит в `public/products/`

### Setup на Vercel

Переменные окружения (см. `.env.example`):

| Переменная | Назначение |
|---|---|
| `ADMIN_EMAIL` | Кому разрешён вход (e.g. `fayrdmit89@gmail.com`) |
| `AUTH_SECRET` | HMAC-секрет для токенов. `openssl rand -base64 32` |
| `RESEND_API_KEY` | Resend API key для отправки писем |
| `EMAIL_FROM` | Отправитель писем (на тесте `onboarding@resend.dev`) |
| `GITHUB_TOKEN` | PAT с правом Contents: Read+Write на репо samla |
| `GITHUB_OWNER` | `fayr89` |
| `GITHUB_REPO` | `samla` |
| `GITHUB_BRANCH` | Ветка для коммитов (та, что Vercel деплоит в прод) |
| `NEXT_PUBLIC_SITE_URL` | Полный URL сайта для magic-link в письмах |

### Создание токенов

**Resend API key** — https://resend.com → Sign up → API Keys → Create. Бесплатный
тариф: 100 писем/день, 3000/мес. Отправитель `onboarding@resend.dev` работает
сразу. Для своего домена — Domains → Add → DNS-записи.

**GitHub PAT** — https://github.com/settings/personal-access-tokens/new →
Repository access: **Only select repositories → samla** → Repository permissions:
**Contents: Read and write**. Срок — на ваш выбор.

**AUTH_SECRET** — на маке `openssl rand -base64 32`, или
https://generate-secret.vercel.app/32 в браузере.

## Деплой

Push в `claude/product-landing-page-H9FDX` (или `main`, когда переключим) →
Vercel автоматически деплоит. Дефолтная ветка репо настроена в Vercel.
