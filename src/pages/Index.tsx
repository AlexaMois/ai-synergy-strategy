import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
import { initScrollTracking, captureUTMParams, initEngagementTracking } from "@/utils/analytics";

const Index = () => {
  const location = useLocation();
  
  // Capture UTM params on load
  useEffect(() => {
    captureUTMParams();
  }, []);
  
  // Initialize scroll depth tracking
  useEffect(() => {
    const cleanup = initScrollTracking();
    return cleanup;
  }, []);
  
  // Initialize engagement time tracking
  useEffect(() => {
    const cleanup = initEngagementTracking();
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
    "description": "Помогаю директорам производства и торговли сократить ручной труд, потери и хаос в процессах за 4–6 недель с помощью ИИ и автоматизации. Красноярск, работа по всей России и СНГ.",
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

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Автоматизация бизнеса с ИИ — Александра Моисеева",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero-description", ".foundation-description", "h1"]
    },
    "url": "https://aleksamois.ru/"
  };

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Основная навигация",
    "hasPart": [
      { "@type": "WebPage", "name": "Главная", "url": "https://aleksamois.ru/" },
      { "@type": "WebPage", "name": "Услуги", "url": "https://aleksamois.ru/services" },
      { "@type": "WebPage", "name": "Кейсы", "url": "https://aleksamois.ru/cases" },
      { "@type": "WebPage", "name": "Блог", "url": "https://aleksamois.ru/materials/blog" },
      { "@type": "WebPage", "name": "О нас", "url": "https://aleksamois.ru/about" },
      { "@type": "WebPage", "name": "FAQ", "url": "https://aleksamois.ru/faq" },
      { "@type": "WebPage", "name": "Контакты", "url": "https://aleksamois.ru/#contact" }
    ]
  };
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Автоматизация бизнеса с ИИ — убираем рутину и бардак в процессах | Александра Моисеева</title>
        <meta name="description" content="Помогаю директорам производства и торговли сократить ручной труд, потери и хаос в процессах за 4–6 недель с помощью ИИ и автоматизации. Красноярск, работа по всей России и СНГ." />
        <meta name="keywords" content="автоматизация бизнеса, автоматизация бизнес процессов, автоматизация бизнеса с помощью ИИ, ИИ для бизнеса Красноярск, нейросети для бизнеса" />
        <link rel="canonical" href="https://aleksamois.ru/" />
        <meta property="og:title" content="Автоматизация бизнеса с ИИ — убираем рутину и бардак в процессах | Александра Моисеева" />
        <meta property="og:description" content="Помогаю директорам производства и торговли сократить ручной труд, потери и хаос в процессах за 4–6 недель с помощью ИИ и автоматизации. Красноярск, работа по всей России и СНГ." />
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
        <script type="application/ld+json">
          {JSON.stringify(speakableSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationSchema)}
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
