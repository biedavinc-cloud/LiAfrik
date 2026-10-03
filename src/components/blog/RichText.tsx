import { Link } from '@/components/Link';
import { parseInline } from '@/lib/blogMarkup';
import { resolveHref, type BlogLang } from '@/data/blog';

/** Renders **bold** and [links](href) used inside article text. */
export default function RichText({ text, lang }: { text: string; lang: BlogLang }) {
  return (
    <>
      {parseInline(text).map((t, i) => {
        if (t.type === 'bold') return <strong key={i} className="font-semibold text-ink">{t.text}</strong>;
        if (t.type === 'link') {
          const href = resolveHref(t.href, lang);
          const cls = 'font-semibold text-liafrik-700 underline decoration-liafrik-200 underline-offset-4 hover:decoration-liafrik-600 transition-colors';
          return href.startsWith('/') ? (
            <Link key={i} to={href} className={cls}>{t.text}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{t.text}</a>
          );
        }
        return <span key={i}>{t.text}</span>;
      })}
    </>
  );
}
