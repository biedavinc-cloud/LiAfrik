import { Link, useCurrentLang } from '@/components/Link';
import { Home } from 'lucide-react';
import { LinkButton } from '@/components/Button';
import { useSEO } from '@/lib/useSEO';
import { pick } from '@/i18n/LanguageContext';

export default function NotFound() {
  const lang = useCurrentLang();
  useSEO({
    title: pick(lang, {
      en: 'Page Not Found | LiAfrik', fr: 'Page introuvable | LiAfrik',
      ar: 'الصفحة غير موجودة | LiAfrik', es: 'Página no encontrada | LiAfrik', pt: 'Página não encontrada | LiAfrik',
    }),
    description: pick(lang, {
      en: 'The page you are looking for does not exist or has moved.',
      fr: "La page que vous cherchez n'existe pas ou a été déplacée.",
      ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      es: 'La página que buscas no existe o ha sido movida.',
      pt: 'A página que você procura não existe ou foi movida.',
    }),
    noindex: true,
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-[120px] sm:text-[160px] font-bold leading-none text-gradient-blue-strong">404</p>
      <p className="mt-2 font-display text-2xl font-bold text-ink">
        {pick(lang, { en: 'Page not found', fr: 'Page introuvable', ar: 'الصفحة غير موجودة', es: 'Página no encontrada', pt: 'Página não encontrada' })}
      </p>
      <p className="mt-2 text-ink-muted max-w-md">
        {pick(lang, {
          en: 'The page you are looking for does not exist or has moved.',
          fr: "La page que vous cherchez n'existe pas ou a été déplacée.",
          ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
          es: 'La página que buscas no existe o ha sido movida.',
          pt: 'A página que você procura não existe ou foi movida.',
        })}
      </p>
      <div className="mt-6">
        <LinkButton to="/" variant="primary" size="lg" icon={<Home className="h-4 w-4" />}>
          {pick(lang, { en: 'Back home', fr: "Retour à l'accueil", ar: 'العودة إلى الرئيسية', es: 'Volver al inicio', pt: 'Voltar ao início' })}
        </LinkButton>
      </div>
      <Link to="/#ecosystem" className="mt-4 text-sm text-liafrik-700 hover:text-liafrik-800">
        {pick(lang, { en: 'Explore the ecosystem', fr: "Explorer l'écosystème", ar: 'استكشف النظام المتكامل', es: 'Explorar el ecosistema', pt: 'Explorar o ecossistema' })}
      </Link>
    </div>
  );
}
