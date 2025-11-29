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
import WhoIAm from "@/components/WhoIAm";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
const Index = () => {
  return <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MarqueeText />
      <TrustAndPosition />
      <WhatIDo />
      <TrustMarquee />
      <HowIWorkProcess />
      <Cases />
      <AIFramework />
      <WhoIAm />
      <Services />
      <HowIWork />
      <WhoIWorkWith />
      
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
      <FloatingCTA />
      <ExitIntentPopup />
    </div>;
};
export default Index;