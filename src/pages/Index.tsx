import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import TrustMarquee from "@/components/TrustMarquee";
import TrustAndPosition from "@/components/TrustAndPosition";
import WhatIDo from "@/components/WhatIDo";
import HowIWorkProcess from "@/components/HowIWorkProcess";
import Services from "@/components/Services";
import HowIWork from "@/components/HowIWork";
import WhoIWorkWith from "@/components/WhoIWorkWith";
import Authority from "@/components/Authority";
import Cases from "@/components/Cases";
import AIFramework from "@/components/AIFramework";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MarqueeText />
      <TrustAndPosition />
      <TrustMarquee />
      <WhatIDo />
      <HowIWorkProcess />
      <Cases />
      <AIFramework />
      <Services />
      <HowIWork />
      <WhoIWorkWith />
      <Authority />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
