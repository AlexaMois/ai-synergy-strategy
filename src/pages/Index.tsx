import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import HowIWork from "@/components/HowIWork";
import WhoIWorkWith from "@/components/WhoIWorkWith";
import Cases from "@/components/Cases";
import WhyItWorks from "@/components/WhyItWorks";
import MyStory from "@/components/MyStory";
import FAQ from "@/components/FAQ";
import Authority from "@/components/Authority";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MarqueeText />
      <Trust />
      <Services />
      <HowIWork />
      <WhoIWorkWith />
      <Cases />
      <WhyItWorks />
      <MyStory />
      <Authority />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
