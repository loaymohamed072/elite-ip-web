import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import Services from "@/components/sections/Services";
import Consultation from "@/components/sections/Consultation";
import Sectors from "@/components/sections/Sectors";
import Team from "@/components/sections/Team";
import Process from "@/components/sections/Process";
import Trust from "@/components/sections/Trust";
import FAQ from "@/components/sections/FAQ";
import Insights from "@/components/sections/Insights";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Positioning />
        <Services />
        <Consultation />
        <Sectors />
        <Team />
        <Process />
        <Trust />
        <FAQ />
        <FinalCTA />
        <Insights />
      </main>
      <Footer />
    </>
  );
}
