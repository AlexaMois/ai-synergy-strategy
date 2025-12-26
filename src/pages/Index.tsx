import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarqueeText from "@/components/MarqueeText";
import TrustMarquee from "@/components/TrustMarquee";
import Foundation from "@/components/Foundation";
import Fork from "@/components/Fork";
import Cases from "@/components/Cases";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import FloatingCTA from "@/components/FloatingCTA";

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
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Александра Моисеева — Независимый стратег и инженер по ИИ</title>
        <meta name="description" content="Независимая архитектура ИИ под задачи бизнеса: диагностика, стратегия, сопровождение. ROI 200-400%, окупаемость 3-6 месяцев. Без привязки к платформам." />
        <meta name="keywords" content="ИИ консалтинг, внедрение искусственного интеллекта, AI стратегия, автоматизация бизнеса, нейросети для бизнеса, Александра Моисеева" />
        <link rel="canonical" href="https://aleksamois.ru/" />
        <meta property="og:title" content="Александра Моисеева — Стратег и инженер ИИ | ROI 200-400%" />
        <meta property="og:description" content="Независимая архитектура ИИ под задачи бизнеса: диагностика, стратегия, сопровождение. ROI 200-400%." />
        <meta property="og:url" content="https://aleksamois.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        <TrustMarquee />
        <Foundation />
        <Fork />
        <Cases />
        <MarqueeText />
        <FAQ />
        <Testimonials />
        <Contact />
        <Partners />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
