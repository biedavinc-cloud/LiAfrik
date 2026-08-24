import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import techIcons from '@/data/techIcons.json';

const techs = techIcons;

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
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0"
                fill={`#${tech.hex}`}
                aria-hidden="true"
              >
                <path d={tech.path} />
              </svg>
              <span className="text-sm font-semibold text-ink-soft whitespace-nowrap">{tech.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
