import { Globe } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function LanguageToggle({ lang, setLang, className }: { lang: 'en' | 'fr'; setLang: (l: 'en' | 'fr') => void; className?: string }) {
  return (
    <div className={cn('flex items-center rounded-full bg-cloud-100 border border-cloud-200 p-0.5 text-xs font-semibold', className)}>
      <Globe className="h-3.5 w-3.5 text-liafrik-600 mx-1.5" />
      <button onClick={() => setLang('en')}
        className={cn('px-2 py-1 rounded-full transition-all', lang === 'en' ? 'bg-white text-liafrik-700 shadow-sm' : 'text-ink-light hover:text-ink-soft')}>
        EN
      </button>
      <button onClick={() => setLang('fr')}
        className={cn('px-2 py-1 rounded-full transition-all', lang === 'fr' ? 'bg-white text-liafrik-700 shadow-sm' : 'text-ink-light hover:text-ink-soft')}>
        FR
      </button>
    </div>
  );
}
