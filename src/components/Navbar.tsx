import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/Link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import Logo from './Logo';
import { LinkButton } from './Button';
import { useLang } from '@/i18n/LanguageContext';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // FIX: bloque le scroll du body quand le menu mobile est ouvert,
  // pour éviter que la page défile derrière l'overlay.
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  const navItems = [
    { label: t('nav.products'), href: '/products' },
    { label: t('nav.solutions'), href: '/#ecosystem' },
    { label: t('nav.security'), href: '/security' },
    { label: t('nav.about'), href: '/#why' },
    { label: t('nav.support'), href: '/support' },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className={cn(
        'mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-500',
        scrolled ? 'mt-2' : 'mt-3 sm:mt-4'
      )}>
        <nav className={cn(
          'flex items-center justify-between rounded-2xl px-4 sm:px-5 transition-all duration-500',
          scrolled
            ? 'h-14 bg-white/85 backdrop-blur-xl border border-cloud-200 shadow-card'
            : 'h-16 bg-white/60 backdrop-blur-md border border-white/60'
        )}>
          <Logo />

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.label} to={item.href}
                className="relative px-3.5 py-2 text-sm font-medium text-ink-soft hover:text-liafrik-700 transition-colors rounded-lg hover:bg-liafrik-50/70">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle lang={lang} setLang={setLang} />
            <LinkButton to="/support" variant="ghost" size="sm" className="hidden sm:inline-flex">
              {t('nav.bookDemo')}
            </LinkButton>
            <LinkButton to="/products" variant="primary" size="sm" iconRight={<ArrowRight className="h-4 w-4" />} className="hidden sm:inline-flex">
              {t('nav.startFree')}
            </LinkButton>
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden grid place-items-center h-9 w-9 rounded-lg text-ink-soft hover:bg-liafrik-50" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            // FIX: max-h + overflow-y-auto pour rester accessible en mode paysage
            // ou sur les petits écrans où le menu déroulant dépasserait la hauteur visible.
            className="lg:hidden mx-4 sm:mx-6 mt-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-cloud-200 shadow-premium overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.label} to={item.href} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-liafrik-50 hover:text-liafrik-700">
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <LinkButton to="/support" variant="outline" size="sm" className="w-full justify-center">{t('nav.bookDemo')}</LinkButton>
                <LinkButton to="/products" variant="primary" size="sm" className="w-full justify-center">{t('nav.startFree')}</LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LanguageToggle({ lang, setLang }: { lang: 'en' | 'fr'; setLang: (l: 'en' | 'fr') => void }) {
  return (
    <div className="flex items-center rounded-full bg-cloud-100 border border-cloud-200 p-0.5 text-xs font-semibold">
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
