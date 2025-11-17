import Hero from "@/components/Hero";
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Trust />
      <Services />
      <HowIWork />
      <WhoIWorkWith />
      <Cases />
      <WhyItWorks />
      <MyStory />
      <FAQ />
      <Authority />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
