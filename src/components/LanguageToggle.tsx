import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SUPPORTED_LANGS, LANG_LABELS, type Lang } from '@/i18n/LanguageContext';

const SHORT_LABEL: Record<Lang, string> = { en: 'EN', fr: 'FR', ar: 'AR', es: 'ES', pt: 'PT' };

export default function LanguageToggle({ lang, setLang, className }: { lang: Lang; setLang: (l: Lang) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full bg-cloud-100 border border-cloud-200 px-2.5 py-1.5 text-xs font-semibold text-liafrik-700 hover:bg-cloud-200/70 transition-colors"
      >
        <Globe className="h-3.5 w-3.5 text-liafrik-600" />
        {SHORT_LABEL[lang]}
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 rtl:right-auto rtl:left-0 mt-1.5 w-40 rounded-xl border border-cloud-200 bg-white shadow-card py-1 z-50"
        >
          {SUPPORTED_LANGS.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === lang}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between gap-2 px-3 py-1.5 text-sm text-left rtl:text-right hover:bg-cloud-50 transition-colors',
                l === lang ? 'text-liafrik-700 font-semibold' : 'text-ink-soft'
              )}
            >
              <span>{LANG_LABELS[l]}</span>
              {l === lang && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
