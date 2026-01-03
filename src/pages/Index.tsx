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
import CookieConsent from "@/components/CookieConsent";
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

  // Organization schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NeyroResheniya (Александра Моисеева)",
    "alternateName": "НейроРешения",
    "description": "ИИ решения для бизнеса и руководителей. Независимая архитектура ИИ под задачи бизнеса: диагностика, стратегия, сопровождение.",
    "url": "https://aleksamois.ru",
    "logo": "https://aleksamois.ru/og-image.png",
    "image": "https://aleksamois.ru/og-image.png",
    "telephone": "+7 993 721 73 67",
    "email": "neiroreshenia@yandex.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Красной Гвардии, 24, офис 224",
      "addressLocality": "Красноярск",
      "postalCode": "660000",
      "addressRegion": "Красноярский край",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "56.0153",
      "longitude": "92.8932"
    },
    "areaServed": ["RU", "CIS"],
    "priceRange": "$$",
    "founder": {
      "@type": "Person",
      "name": "Александра Моисеева",
      "jobTitle": "Независимый стратег и инженер по ИИ",
      "knowsAbout": ["Искусственный интеллект", "Автоматизация бизнеса", "Machine Learning", "Нейросети"],
      "memberOf": [
        { "@type": "Organization", "name": "НФИИ (Национальная Федерация Искусственного Интеллекта)" },
        { "@type": "Organization", "name": "IT-Park" }
      ],
      "award": "Премия «Успешный бизнес»"
    },
    "sameAs": [
      "https://t.me/neiroreshenia",
      "https://t.me/aleksamois"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7 993 721 73 67",
      "email": "neiroreshenia@yandex.com",
      "contactType": "customer service",
      "availableLanguage": ["Russian"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги по внедрению ИИ",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Диагностика ИИ",
            "description": "Экспресс-аудит готовности бизнеса к ИИ"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Архитектура ИИ",
            "description": "Проектирование ИИ-решений под задачи бизнеса"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Сопровождение",
            "description": "Внедрение и поддержка ИИ-решений"
          }
        }
      ]
    }
  };
  
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
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
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
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
