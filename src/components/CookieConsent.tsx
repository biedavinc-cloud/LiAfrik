import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from '@/components/Link';
import { useLang } from '@/i18n/LanguageContext';

const STORAGE_KEY = 'liafrik-cookie-consent';
export type ConsentValue = 'accepted' | 'declined';

export function getCookieConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'declined' ? v : null;
}

export default function CookieConsent() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent('liafrik-cookie-consent', { detail: value }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-[60]"
          role="dialog"
          aria-live="polite"
          aria-label={t('cookie.title')}
        >
          <div className="rounded-2xl bg-white border border-cloud-200 shadow-premium p-5">
            <div className="flex items-start gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-liafrik-50 text-liafrik-700 shrink-0">
                <Cookie className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="font-display font-bold text-sm text-ink">{t('cookie.title')}</p>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                  {t('cookie.body')}{' '}
                  <Link to="/privacy" className="text-liafrik-700 font-medium hover:text-liafrik-800">
                    {t('cookie.learnMore')}
                  </Link>
                </p>
              </div>
              <button
                onClick={() => choose('declined')}
                aria-label={t('cookie.decline')}
                className="shrink-0 text-ink-light hover:text-ink-soft transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => choose('declined')}
                className="flex-1 rounded-full border border-cloud-200 px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-cloud-50 transition-colors"
              >
                {t('cookie.decline')}
              </button>
              <button
                onClick={() => choose('accepted')}
                className="flex-1 rounded-full bg-liafrik-600 px-4 py-2 text-xs font-semibold text-white hover:bg-liafrik-700 transition-colors"
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
