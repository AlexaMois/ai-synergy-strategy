import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import TrustMarquee from "@/components/TrustMarquee";
import TrustAndPosition from "@/components/TrustAndPosition";
import Services from "@/components/Services";
import HowIWork from "@/components/HowIWork";
import WhoIWorkWith from "@/components/WhoIWorkWith";
import Cases from "@/components/Cases";
import Authority from "@/components/Authority";
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
      <Services />
      <HowIWork />
      <WhoIWorkWith />
      <Cases />
      <Authority />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
