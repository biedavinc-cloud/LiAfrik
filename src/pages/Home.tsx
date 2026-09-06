import { Suspense, lazy } from 'react';
import Hero from '@/sections/Hero';

// Below-the-fold sections are code-split so the initial bundle only has
// to parse/execute what's needed for the first paint (Hero). This is
// what actually moves the Lighthouse Performance score — everything
// else streams in right after, while the user is still reading the hero.
const PoweredBy = lazy(() => import('@/sections/PoweredBy'));
const Ecosystem = lazy(() => import('@/sections/Ecosystem'));
const BuildYourStack = lazy(() => import('@/sections/BuildYourStack'));
const WhyLiAfrik = lazy(() => import('@/sections/WhyLiAfrik'));
const Industries = lazy(() => import('@/sections/Industries'));
const Features = lazy(() => import('@/sections/Features'));
const SecurityTeaser = lazy(() => import('@/sections/SecurityTeaser'));
const Stats = lazy(() => import('@/sections/Stats'));
const HowItWorks = lazy(() => import('@/sections/HowItWorks'));
const Testimonials = lazy(() => import('@/sections/Testimonials'));
const WorldMap = lazy(() => import('@/sections/WorldMap'));
const FAQ = lazy(() => import('@/sections/FAQ'));
const Contact = lazy(() => import('@/sections/Contact'));
const FinalCTA = lazy(() => import('@/sections/FinalCTA'));

// A near-invisible placeholder (not null) so each section reserves some
// space and avoids a jarring layout jump as it streams in.
const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <PoweredBy />
        <Ecosystem />
        <div id="build">
          <BuildYourStack />
        </div>
        <div id="why">
          <WhyLiAfrik />
        </div>
        <Industries />
        <Features />
        <SecurityTeaser />
        <Stats />
        <div id="how">
          <HowItWorks />
        </div>
        <Testimonials />
        <WorldMap />
        <FAQ />
        <Contact />
        <FinalCTA />
      </Suspense>
    </>
  );
}
