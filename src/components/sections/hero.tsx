import Image from 'next/image';
import {ArrowRight, Phone, Check} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

const trustItems = [
  'Оригинал IKEA',
  'УПД, договор',
  'Безнал и НДС',
  'Отгрузка от 1 дня'
];

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-[radial-gradient(circle_at_top_right,_#F0F7FF,_transparent_60%)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8">
          {/* Left column - 60% on desktop */}
          <div className="w-full lg:w-[60%] space-y-6">
            {/* Eyebrow chip */}
            <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary">
              Опт от 50 шт · Склад в РФ
            </Badge>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight text-balance">
              Контейнеры SAMLA от IKEA{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">оптом от 50 шт</span>
                <span 
                  className="absolute bottom-1 left-0 right-0 h-3 bg-accent/20 -z-0 rounded-sm"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              7 размеров от 5 до 130 литров. Отгрузка от 1 рабочего дня со склада в Москве. 
              Доставка по всей России и в Казахстан. Документы для юрлиц.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="group">
                Получить прайс-лист
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg">
                <Phone className="w-5 h-5" />
                Позвонить +7 (000) 000-00-00
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - 40% on desktop */}
          <div className="w-full lg:w-[40%] relative">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Hero image container with glow */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex items-center justify-center">
                {/* Blue glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-3xl bg-primary/10 -z-10"
                  aria-hidden="true"
                />
                
                {/* Container stack image placeholder */}
                <div className="relative w-full aspect-square">
                  <Image
                    src="/placeholder.svg"
                    alt="Стопка прозрачных контейнеров SAMLA разных размеров"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Floating badge - HIT */}
              <Badge 
                variant="accent" 
                className="absolute -top-2 -right-2 sm:top-4 sm:right-4 px-4 py-2 text-sm font-bold bg-accent text-accent-foreground shadow-lg"
              >
                ХИТ
              </Badge>

              {/* Floating card - B2B clients */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-8 sm:left-0 bg-white rounded-2xl shadow-xl border border-border p-4 flex items-center gap-3">
                {/* Avatar group */}
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-white flex items-center justify-center text-xs font-semibold text-primary"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-foreground">1200+</div>
                  <div className="text-xs text-muted-foreground">B2B-клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
