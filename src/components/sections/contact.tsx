'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowRight} from 'lucide-react';
import {SIZES, CONTACTS} from '@/lib/products';

const VOLUMES = ['v200', 'v500', 'v1000', 'v1000p', 'vIdk'] as const;

export function Contact() {
  const t = useTranslations('contact');
  const tRoot = useTranslations();
  const benefits = tRoot.raw('contact.benefits') as string[];
  const [picked, setPicked] = useState<Set<string>>(new Set());

  return (
    <section
      id="contacts"
      className="bg-[var(--color-bg-2)] border-t border-[var(--color-line)] py-[clamp(64px,8vw,116px)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,64px)] grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[clamp(32px,5vw,72px)] items-start">
        <div className="reveal">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">
            {t('titleA')}
            <br />
            {t('titleB')}
          </h2>
          <p className="lede">{t('subtitle')}</p>
          <ul className="list-none mt-7 flex flex-col gap-[14px]">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-[15.5px] text-[var(--color-muted)] before:content-['✓'] before:text-[var(--color-signal)] before:font-bold"
              >
                {b}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-8">
            <a href={CONTACTS.telegram} className="btn btn-ghost flex-1 justify-center">
              {t('telegram')}
            </a>
            <a href={CONTACTS.whatsapp} className="btn btn-ghost flex-1 justify-center">
              {t('whatsapp')}
            </a>
          </div>
        </div>

        <form
          className="reveal border border-[var(--color-line-strong)] rounded-[6px] bg-[var(--color-bg)] p-[clamp(24px,3vw,38px)]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3 className="font-display text-[23px] font-bold mb-6">{t('formTitle')}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t('name')} placeholder={t('namePh')} type="text" />
            <Field label={t('company')} placeholder={t('companyPh')} type="text" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Field label={t('phone')} placeholder={t('phonePh')} type="tel" />
            <Field label={t('email')} placeholder={t('emailPh')} type="email" />
          </div>

          <FormBlock label={t('volume')}>
            <select className="w-full bg-[var(--color-bg-3)] border border-[var(--color-line)] rounded-[3px] text-[var(--color-fg)] px-[14px] py-[13px] text-[15px] focus:outline-none focus:border-[var(--color-signal)] focus:bg-[var(--color-bg-2)]">
              <option>{t('volumePh')}</option>
              {VOLUMES.map((v) => (
                <option key={v}>{t(`volumes.${v}`)}</option>
              ))}
            </select>
          </FormBlock>

          <FormBlock label={t('sizes')}>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => {
                const id = String(s.volumeL);
                const active = picked.has(id);
                return (
                  <label
                    key={id}
                    className={`inline-flex items-center gap-[6px] font-mono text-[13px] border rounded-[2px] px-3 py-2 cursor-pointer transition ${
                      active
                        ? 'bg-[var(--color-signal)] text-[var(--color-signal-ink)] border-[var(--color-signal)] font-bold'
                        : 'border-[var(--color-line-strong)] text-[var(--color-muted)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={active}
                      onChange={() => {
                        setPicked((prev) => {
                          const next = new Set(prev);
                          if (next.has(id)) next.delete(id);
                          else next.add(id);
                          return next;
                        });
                      }}
                    />
                    {s.volumeL} л
                  </label>
                );
              })}
            </div>
          </FormBlock>

          <FormBlock label={t('comment')}>
            <textarea
              placeholder={t('commentPh')}
              rows={3}
              className="w-full resize-y min-h-[84px] bg-[var(--color-bg-3)] border border-[var(--color-line)] rounded-[3px] text-[var(--color-fg)] px-[14px] py-[13px] text-[15px] focus:outline-none focus:border-[var(--color-signal)] focus:bg-[var(--color-bg-2)]"
            />
          </FormBlock>

          <button type="submit" className="btn btn-primary w-full justify-center mt-2">
            {t('submit')}
            <ArrowRight aria-hidden />
          </button>
          <p className="font-mono text-[10.5px] text-[var(--color-muted-2)] text-center mt-[14px] leading-[1.5]">
            {t('policy')}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <FormBlock label={label}>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[var(--color-bg-3)] border border-[var(--color-line)] rounded-[3px] text-[var(--color-fg)] px-[14px] py-[13px] text-[15px] focus:outline-none focus:border-[var(--color-signal)] focus:bg-[var(--color-bg-2)]"
      />
    </FormBlock>
  );
}

function FormBlock({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className="mt-4">
      <label className="block font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-muted)] mb-[7px]">
        {label}
      </label>
      {children}
    </div>
  );
}
