import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProblemSection } from '@/components/ProblemSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { WhyWhalio } from '@/components/WhyWhalio';
import { Industries } from '@/components/Industries';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0b132b] selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <WhyWhalio />
      <Industries />
      <CTA />
      <Footer />
    </main>
  );
}
