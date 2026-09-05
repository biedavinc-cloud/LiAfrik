import { Link, useCurrentLang } from '@/components/Link';
import { Home } from 'lucide-react';
import { LinkButton } from '@/components/Button';
import { useSEO } from '@/lib/useSEO';

export default function NotFound() {
  const lang = useCurrentLang();
  const en = lang === 'en';
  useSEO({
    title: en ? 'Page Not Found | LiAfrik' : 'Page introuvable | LiAfrik',
    description: en ? 'The page you are looking for does not exist or has moved.' : "La page que vous cherchez n'existe pas ou a été déplacée.",
    noindex: true,
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-[120px] sm:text-[160px] font-bold leading-none text-gradient-blue-strong">404</p>
      <p className="mt-2 font-display text-2xl font-bold text-ink">{lang === 'en' ? 'Page not found' : 'Page introuvable'}</p>
      <p className="mt-2 text-ink-muted max-w-md">{lang === 'en' ? 'The page you are looking for does not exist or has moved.' : "La page que vous cherchez n'existe pas ou a été déplacée."}</p>
      <div className="mt-6">
        <LinkButton to="/" variant="primary" size="lg" icon={<Home className="h-4 w-4" />}>{lang === 'en' ? 'Back home' : "Retour à l'accueil"}</LinkButton>
      </div>
      <Link to="/#ecosystem" className="mt-4 text-sm text-liafrik-700 hover:text-liafrik-800">{lang === 'en' ? 'Explore the ecosystem' : "Explorer l'écosystème"}</Link>
    </div>
  );
}
