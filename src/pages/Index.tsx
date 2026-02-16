import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SEOHead } from "@/components/SEOHead";
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
import { initScrollTracking } from "@/utils/analytics";

const Index = () => {
  const location = useLocation();
  
  // Initialize scroll depth tracking
  useEffect(() => {
    const cleanup = initScrollTracking();
    return cleanup;
  }, []);
  
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
    "telephone": "+7 995 078 88 37",
    "email": "ai@aleksamois.ru",
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
      "telephone": "+7 995 078 88 37",
      "email": "ai@aleksamois.ru",
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
      <SEOHead />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
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
