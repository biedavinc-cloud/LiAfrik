import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

const techs = [
  'Google Cloud', 'Cloudflare', 'Hostinger', 'Netlify', 'Vercel', 'NVIDIA',
  'Docker', 'Linux', 'GitHub', 'React', 'TailwindCSS', 'Node.js', 'PostgreSQL',
  'Redis', 'Next.js',
];

export default function PoweredBy() {
  const { t } = useLang();
  const row = [...techs, ...techs];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={undefined} title={t('powered.title')} subtitle={t('powered.sub')} />
      </div>

      <div className="relative mt-10 mask-fade-x-wide">
        <div className="flex gap-3 sm:gap-4 w-max animate-marquee-left" style={{ ['--marquee-duration' as string]: '50s' }}>
          {row.map((tech, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-2xl bg-white border border-cloud-200 px-5 py-3 shadow-card hover:shadow-float transition-shadow">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-liafrik-500 to-cyanx-400" />
              <span className="text-sm font-semibold text-ink-soft whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
