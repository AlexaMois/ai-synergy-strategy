import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import SixQuestions from "@/components/SixQuestions";
import TrustMarquee from "@/components/TrustMarquee";
import TrustAndPosition from "@/components/TrustAndPosition";
import WhatIDo from "@/components/WhatIDo";
import Cases from "@/components/Cases";
import AIFramework from "@/components/AIFramework";
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
      <SixQuestions />
      <TrustAndPosition />
      <WhatIDo />
      <TrustMarquee />
      <Cases />
      <AIFramework />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
      <FloatingCTA />
      <ExitIntentPopup />
    </div>;
};
export default Index;