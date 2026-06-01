'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Check, Send, MessageCircle} from 'lucide-react';
import {SectionHeader} from '@/components/ui/section-header';
import {Input} from '@/components/ui/input';
import {Select} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {SIZES, CONTACTS} from '@/lib/products';

const BENEFITS = ['calc', 'samples', 'special'] as const;
const VOLUMES = ['v200', 'v500', 'v1000', 'v1000p', 'vIdk'] as const;

export function Contact() {
  const t = useTranslations('contact');
  const [sizes, setSizes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSize = (id: string) => {
    setSizes((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contacts"
      className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-background to-[#F0F7FF]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <SectionHeader
              eyebrow={t('eyebrow')}
              title={t('title')}
              description={t('subtitle')}
              align="left"
            />

            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-base">{t(`benefits.${b}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted transition text-sm font-semibold"
              >
                <Send className="w-4 h-4 text-primary" />
                Telegram
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted transition text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-success" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-background rounded-[var(--radius-card)] border border-border shadow-lg p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold mb-6">{t('formTitle')}</h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-display text-xl font-bold mb-2">
                  {t('thanksTitle')}
                </h4>
                <p className="text-sm text-muted-foreground">{t('thanksDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t('name')}
                    </label>
                    <Input required name="name" placeholder={t('namePh')} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t('company')}
                    </label>
                    <Input required name="company" placeholder={t('companyPh')} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t('phone')}
                    </label>
                    <Input
                      required
                      type="tel"
                      name="phone"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      name="email"
                      placeholder="name@company.ru"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('volume')}
                  </label>
                  <Select required name="volume" defaultValue="">
                    <option value="" disabled>
                      {t('volumePh')}
                    </option>
                    {VOLUMES.map((v) => (
                      <option key={v} value={v}>
                        {t(`volumes.${v}`)}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('sizes')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => {
                      const active = sizes.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleSize(s.id)}
                          aria-pressed={active}
                          className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition tabular-nums ${
                            active
                              ? 'bg-primary text-white border-primary'
                              : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                          }`}
                        >
                          {s.volumeL} л
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('comment')}
                  </label>
                  <Textarea name="comment" placeholder={t('commentPh')} rows={3} />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary text-white font-semibold shadow-[0_8px_24px_-6px_rgba(0,102,255,0.55)] hover:bg-[#0052cc] transition"
                >
                  {t('submit')}
                </button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {t('policy')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
