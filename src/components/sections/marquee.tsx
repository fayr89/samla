import {useTranslations} from 'next-intl';

export function Marquee() {
  const t = useTranslations();
  const items = t.raw('marquee') as string[];
  const line = items.join(' · ') + ' · ';

  return (
    <div
      className="border-b border-[var(--color-line)] bg-[var(--color-signal)] text-[var(--color-signal-ink)] overflow-hidden"
      aria-hidden
    >
      <div className="marquee-track flex gap-[40px] whitespace-nowrap py-[11px] font-mono text-[13px] font-bold tracking-[0.04em] uppercase">
        <span className="inline-flex items-center gap-[40px]">
          {line}
          <span className="text-[9px]">◆</span>
        </span>
        <span className="inline-flex items-center gap-[40px]">
          {line}
          <span className="text-[9px]">◆</span>
        </span>
      </div>
    </div>
  );
}
