import Hero from '@/sections/Hero';
import PoweredBy from '@/sections/PoweredBy';
import Ecosystem from '@/sections/Ecosystem';
import BuildYourStack from '@/sections/BuildYourStack';
import WhyLiAfrik from '@/sections/WhyLiAfrik';
import Industries from '@/sections/Industries';
import Features from '@/sections/Features';
import SecurityTeaser from '@/sections/SecurityTeaser';
import Stats from '@/sections/Stats';
import HowItWorks from '@/sections/HowItWorks';
import Testimonials from '@/sections/Testimonials';
import WorldMap from '@/sections/WorldMap';
import FAQ from '@/sections/FAQ';
import Contact from '@/sections/Contact';
import FinalCTA from '@/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
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
    </>
  );
}
