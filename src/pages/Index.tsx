import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import TrustMarquee from "@/components/TrustMarquee";
import TrustAndPosition from "@/components/TrustAndPosition";
import Foundation from "@/components/Foundation";
import Fork from "@/components/Fork";
import HowIChoose from "@/components/HowIChoose";
import SixQuestions from "@/components/SixQuestions";
import Cases from "@/components/Cases";
import AIFramework from "@/components/AIFramework";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  const location = useLocation();
  
  // Handle anchor scrolling when navigating with hash
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.hash]);
  
  return <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <MarqueeText />
        <TrustAndPosition />
        <TrustMarquee />
        <Foundation />
        <Fork />
        <HowIChoose />
        <SixQuestions />
        <Cases />
        <AIFramework />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
      <ExitIntentPopup />
    </div>;
};
export default Index;
