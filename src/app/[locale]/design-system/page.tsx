import {setRequestLocale} from 'next-intl/server';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Select} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {SectionHeader} from '@/components/ui/section-header';
import {Box, Star, Truck, Check} from 'lucide-react';

export default async function DesignSystemPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-4xl font-extrabold tracking-tight">
              <span className="text-primary">PROBOX</span>
              <span className="text-foreground">ы</span>
            </span>
            <Badge variant="accent">Design System</Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 text-balance">
            Дизайн-система для B2B оптовой торговли
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Компоненты и стили для создания современного лендинга PROBOXы —
            оптового поставщика контейнеров SAMLA в России.
          </p>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Компоненты"
            title="Кнопки"
            description="Основные варианты кнопок для различных сценариев использования."
            align="left"
          />

          <div className="mt-10 space-y-8">
            {/* Primary buttons */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Primary
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Маленькая</Button>
                <Button>Стандартная</Button>
                <Button size="lg">Большая</Button>
                <Button disabled>Отключена</Button>
              </div>
            </div>

            {/* Secondary buttons */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Secondary
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">
                  Маленькая
                </Button>
                <Button variant="secondary">Стандартная</Button>
                <Button variant="secondary" size="lg">
                  Большая
                </Button>
              </div>
            </div>

            {/* Other variants */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Другие варианты
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Акцент</Button>
                <Button variant="link">Ссылка</Button>
                <Button variant="primary" size="icon">
                  <Box />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="py-12 md:py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Компоненты"
            title="Бейджи"
            description="Метки для выделения статусов, тегов и специальных условий."
            align="left"
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <Badge>опт от 50 шт</Badge>
            <Badge variant="accent">хит продаж</Badge>
            <Badge variant="success">в наличии</Badge>
            <Badge variant="warning">осталось мало</Badge>
            <Badge variant="outline">130 литров</Badge>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Компоненты"
            title="Карточки"
            description="Различные типы карточек для товаров, функций и отзывов."
            align="left"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Product Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>SAMLA 130л</CardTitle>
                  <Badge variant="accent">хит</Badge>
                </div>
                <CardDescription>
                  Самый большой контейнер для хранения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] bg-muted rounded-[var(--radius-input)] flex items-center justify-center mb-4">
                  <Box className="h-16 w-16 text-muted-foreground/30" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground tabular-nums">
                    1 890 ₽
                  </span>
                  <span className="text-sm text-muted-foreground">/шт</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Добавить в заявку</Button>
              </CardFooter>
            </Card>

            {/* Feature Card */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-[var(--radius-input)] bg-primary/10 flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Доставка по РФ</CardTitle>
                <CardDescription>
                  Отправляем транспортными компаниями в любой город России
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['СДЭК', 'Деловые линии', 'ПЭК'].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Testimonial Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-warning text-warning"
                    />
                  ))}
                </div>
                <CardDescription className="text-foreground">
                  {
                    '"Отличное качество контейнеров и быстрая доставка. Работаем уже 2 года."'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    АК
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Алексей Козлов
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ООО {'"СтройМаркет"'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="py-12 md:py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Компоненты"
            title="Элементы форм"
            description="Поля ввода, выпадающие списки и текстовые области для форм."
            align="left"
          />

          <div className="mt-10 max-w-md space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Имя контактного лица
              </label>
              <Input placeholder="Введите ваше имя" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input type="email" placeholder="email@company.ru" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Размер контейнера
              </label>
              <Select>
                <option value="">Выберите размер</option>
                <option value="5">SAMLA 5л</option>
                <option value="11">SAMLA 11л</option>
                <option value="22">SAMLA 22л</option>
                <option value="45">SAMLA 45л</option>
                <option value="65">SAMLA 65л</option>
                <option value="85">SAMLA 85л</option>
                <option value="130">SAMLA 130л</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Комментарий к заявке
              </label>
              <Textarea placeholder="Укажите дополнительные пожелания..." />
            </div>

            <Button className="w-full">Отправить заявку</Button>
          </div>
        </div>
      </section>

      {/* Section Headers Demo */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Компоненты"
            title="Заголовки секций"
            description="Примеры заголовков с надписями и описаниями для разных секций сайта."
            align="left"
          />

          <div className="mt-10 space-y-16">
            <div className="p-8 bg-muted rounded-[var(--radius-card)]">
              <SectionHeader
                eyebrow="Каталог"
                title="7 размеров на любые задачи"
                description="От компактных 5-литровых контейнеров для мелочей до вместительных 130-литровых боксов для хранения крупных вещей."
                align="center"
              />
            </div>

            <div className="p-8 bg-muted rounded-[var(--radius-card)]">
              <SectionHeader
                eyebrow="Преимущества"
                title="Почему выбирают PROBOXы"
                description="Прямые поставки, оптовые цены и надёжный сервис для вашего бизнеса."
                align="left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-12 md:py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Основа"
            title="Цветовая палитра"
            description="Основные цвета бренда и их применение в интерфейсе."
            align="left"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="h-24 rounded-[var(--radius-card)] bg-primary"></div>
              <p className="text-sm font-semibold">Primary</p>
              <p className="text-xs text-muted-foreground">#0066FF</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-[var(--radius-card)] bg-accent"></div>
              <p className="text-sm font-semibold">Accent</p>
              <p className="text-xs text-muted-foreground">#FF6B35</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-[var(--radius-card)] bg-foreground"></div>
              <p className="text-sm font-semibold">Foreground</p>
              <p className="text-xs text-muted-foreground">#0B1220</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-[var(--radius-card)] border border-border bg-background"></div>
              <p className="text-sm font-semibold">Background</p>
              <p className="text-xs text-muted-foreground">#FFFFFF</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="h-16 rounded-[var(--radius-card)] bg-success"></div>
              <p className="text-sm font-semibold">Success</p>
              <p className="text-xs text-muted-foreground">#10B981</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-[var(--radius-card)] bg-warning"></div>
              <p className="text-sm font-semibold">Warning</p>
              <p className="text-xs text-muted-foreground">#F59E0B</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-[var(--radius-card)] bg-muted-foreground"></div>
              <p className="text-sm font-semibold">Muted Foreground</p>
              <p className="text-xs text-muted-foreground">#475569</p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Основа"
            title="Типографика"
            description="Шрифты Manrope для заголовков и Inter для основного текста."
            align="left"
          />

          <div className="mt-10 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Manrope — Заголовки
              </p>
              <h1 className="font-display text-5xl font-extrabold tracking-tight">
                Контейнеры SAMLA оптом
              </h1>
              <h2 className="font-display text-4xl font-bold tracking-tight">
                7 размеров на любые задачи
              </h2>
              <h3 className="font-display text-2xl font-bold">
                Доставка по всей России
              </h3>
            </div>

            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Inter — Основной текст
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                PROBOXы — ваш надёжный партнёр по оптовым поставкам контейнеров
                SAMLA от IKEA. Предлагаем широкий ассортимент прозрачных
                пластиковых контейнеров объёмом от 5 до 130 литров.
              </p>
              <p className="text-base text-muted-foreground">
                Минимальный заказ от 50 штук. Работаем с юридическими лицами и
                ИП. Доставка транспортными компаниями в любую точку России и
                Казахстана.
              </p>
              <p className="text-sm text-muted-foreground">
                Цены на сайте указаны без НДС. Для расчёта стоимости с доставкой
                свяжитесь с менеджером.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
