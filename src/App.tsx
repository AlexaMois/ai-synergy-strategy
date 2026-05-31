import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import BackToHome from "@/components/BackToHome";
import Navigation from "@/components/Navigation";
import CallbackModal from "@/components/CallbackModal";

import Index from "./pages/NewHome";
const OldHome = lazy(() => import("./pages/OldHome"));

const BlogOldRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/materials/blog/${slug}`} replace />;
};

// Lazy load pages
const StartPage = lazy(() => import("./pages/start/StartPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AutomationHubPage = lazy(() => import("./pages/services/AutomationHubPage"));
const ServiceDetailPage = lazy(() => import("./pages/services/ServiceDetailPage"));
const PillarPage = lazy(() => import("./pages/services/PillarPage"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CaseDetailPage = lazy(() => import("./pages/cases/CaseDetailPage"));
const MaterialsPage = lazy(() => import("./pages/materials/MaterialsPage"));
const Checklist30Page = lazy(() => import("./pages/materials/Checklist30Page"));
const PlaudGuidePage = lazy(() => import("./pages/materials/PlaudGuidePage"));

const LegalPage = lazy(() => import("./pages/legal/LegalPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const CaseStudyKraypotrebsoyuz = lazy(() => import("./pages/CaseStudyKraypotrebsoyuz"));
const CaseStudyCargoExpress = lazy(() => import("./pages/CaseStudyCargoExpress"));
const CaseStudyDocSearch = lazy(() => import("./pages/CaseStudyDocSearch"));
const GolossokPricing = lazy(() => import("./pages/GolossokPricing"));
const Consent = lazy(() => import("./pages/Consent"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const NewYearGreeting = lazy(() => import("./pages/NewYearGreeting"));
const Redirect = lazy(() => import("./pages/Redirect"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PortalPage = lazy(() => import("./pages/portal/PortalPage"));
const PortalAdminPage = lazy(() => import("./pages/portal/PortalAdminPage"));
const NeurostylistPage = lazy(() => import("./pages/neurostylist/NeurostylistPage"));

const queryClient = new QueryClient();

// Minimal spinner loader
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Prefetch popular pages after initial load
const usePrefetchRoutes = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      import("./pages/start/StartPage");
      import("./pages/ServicesPage");
      import("./pages/CasesPage");
      import("./pages/About");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
};

const AppContent = () => {
  usePrefetchRoutes();
  
  return (
    <>
      <Navigation />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main */}
          <Route path="/" element={<Index />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/old-home" element={<OldHome />} />
          
          {/* Start */}
          <Route path="/start" element={<StartPage />} />
          
          {/* Services */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/automation" element={<AutomationHubPage />} />
          {/* Legacy slugs → 301-style redirects to current service pages */}
          <Route path="/services/diagnostics" element={<Navigate to="/services/digital-audit" replace />} />
          <Route path="/services/architecture" element={<Navigate to="/services/digital-solution-design" replace />} />
          <Route path="/services/support" element={<Navigate to="/services/implementation-support" replace />} />
          <Route path="/services/add-ons" element={<Navigate to="/services" replace />} />
          {/* Pillar SEO pages (поддержка URL с/без trailing slash) */}
          <Route path="/services/avtomatizaciya-biznes-processov" element={<PillarPage />} />
          <Route path="/services/avtomatizaciya-biznes-processov/" element={<PillarPage />} />
          <Route path="/services/cifrovizaciya-biznesa" element={<PillarPage />} />
          <Route path="/services/cifrovizaciya-biznesa/" element={<PillarPage />} />
          <Route path="/services/vnedrenie-ii-v-biznes" element={<PillarPage />} />
          <Route path="/services/vnedrenie-ii-v-biznes/" element={<PillarPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          
          {/* Products */}
          <Route path="/products" element={<Navigate to="/services" replace />} />
          <Route path="/products/voice-bot" element={<GolossokPricing />} />
          <Route path="/products/doc-search" element={<CaseStudyDocSearch />} />
          
          {/* Cases */}
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/kraypotrebsoyuz" element={<CaseStudyKraypotrebsoyuz />} />
          <Route path="/cases/cargo-express" element={<CaseStudyCargoExpress />} />
          <Route path="/cases/doc-search" element={<Navigate to="/products/doc-search" replace />} />
          <Route path="/cases/:slug" element={<CaseDetailPage />} />
          
          {/* Materials */}
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/materials/resources" element={<ResourcesPage />} />
          <Route path="/materials/blog" element={<Blog />} />
          <Route path="/materials/blog/:slug" element={<BlogPost />} />
          <Route path="/materials/checklist-30" element={<Checklist30Page />} />
          <Route path="/materials/plaud-guide" element={<PlaudGuidePage />} />
          
          {/* About */}
          <Route path="/about" element={<About />} />
          <Route path="/approach/contacts" element={<Navigate to="/about" replace />} />
          
          {/* Pricing */}
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Legal */}
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/legal/consent" element={<Consent />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/cookies" element={<CookiesPolicy />} />
          <Route path="/legal/terms" element={<Terms />} />
          
          {/* Redirects for old URLs */}
          <Route path="/approach" element={<Navigate to="/about" replace />} />
          <Route path="/resources" element={<Navigate to="/materials/resources" replace />} />
          <Route path="/blog" element={<Navigate to="/materials/blog" replace />} />
          <Route path="/blog/:slug" element={<BlogOldRedirect />} />
          <Route path="/consent" element={<Navigate to="/legal/consent" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/legal/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
          <Route path="/case_portfolio" element={<Navigate to="/cases" replace />} />
          <Route path="/case-studies/kraypotrebsoyuz" element={<Navigate to="/cases/kraypotrebsoyuz" replace />} />
          <Route path="/case-studies/cargo-express" element={<Navigate to="/cases/cargo-express" replace />} />
          <Route path="/case-studies/doc-search" element={<Navigate to="/products/doc-search" replace />} />
          <Route path="/golossok-pricing" element={<Navigate to="/products/voice-bot" replace />} />
          <Route path="/checklist" element={<Navigate to="/materials/checklist-30" replace />} />
          <Route path="/newyear" element={<NewYearGreeting />} />
          <Route path="/redirect" element={<Redirect />} />
          
          {/* Portal */}
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/admin" element={<PortalAdminPage />} />

          {/* Neurostylist — отключено, редирект на главную */}
          <Route path="/neurostylist" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <BackToHome />
          <AppContent />
          <CallbackModal />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
