import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import "./black-titanium.css";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import BackToHome from "@/components/BackToHome";
import Navigation from "@/components/Navigation";
import CallbackModal from "@/components/CallbackModal";
import CookieConsent from "@/components/CookieConsent";
import ExitIntentPopup from "@/components/ExitIntentPopup";

import Index from "./pages/NewHome";
const HomePreview = lazy(() => import("./pages/HomePreview"));
const CommercialSolutions = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.SolutionsPage})));
const ProductsPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.ProductsPage})));
const KnowledgePage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.KnowledgePage})));
const MiniAgentsPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.MiniAgentsPage})));
const MiniAgentDetailPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.MiniAgentDetailPage})));
const AgentsPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.AgentsPage})));
const HermesPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.HermesPage})));
const CustomAgentsPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.CustomAgentsPage})));
const ExpertPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.ExpertPage})));
const CommercialPricingPage = lazy(() => import("./pages/commercial/CommercialPages").then(m => ({default:m.CommercialPricingPage})));

const BlogOldRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/materials/blog/${slug}`} replace />;
};

// Lazy load pages
const StartPage = lazy(() => import("./pages/start/StartPage"));
const AutomationHubPage = lazy(() => import("./pages/services/AutomationHubPage"));
const TenderServicePage = lazy(() => import("./pages/services/TenderServicePage"));
const ServiceDetailPage = lazy(() => import("./pages/services/ServiceDetailPage"));
const PillarPage = lazy(() => import("./pages/services/PillarPage"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CaseDetailPage = lazy(() => import("./pages/cases/CaseDetailPage"));
const MaterialsPage = lazy(() => import("./pages/materials/MaterialsPage"));
const Checklist30Page = lazy(() => import("./pages/materials/Checklist30Page"));
const PlaudGuidePage = lazy(() => import("./pages/materials/PlaudGuidePage"));

const LegalPage = lazy(() => import("./pages/legal/LegalPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const CaseStudyKraypotrebsoyuz = lazy(() => import("./pages/CaseStudyKraypotrebsoyuz"));
const CaseStudyCargoExpress = lazy(() => import("./pages/CaseStudyCargoExpress"));
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
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));

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

const blackTitaniumTemplate = (pathname: string) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/services/digital-tools-program") return "";
  if (["/services", "/products", "/mini-agents", "/ai-agents"].includes(path)) return "catalog";
  if (path === "/expert" || path === "/about") return "expert";
  if (path === "/pricing") return "pricing";
  if (path === "/faq" || path === "/materials" || path.startsWith("/materials/")) return "information";
  if (path === "/cases" || path.startsWith("/cases/")) return "case";
  if (["/services/", "/products/", "/mini-agents/", "/ai-agents/"].some(prefix => path.startsWith(prefix))) return "commercial";
  return "";
};
const AppContent = () => {
  usePrefetchRoutes();
  const pathname = useLocation().pathname;
  const template = blackTitaniumTemplate(pathname);
  const framed = Boolean(template) || pathname.replace(/\/+$/, "") === "/start" || pathname.replace(/\/+$/, "") === "/services/digital-tools-program";
  
  return (
    <>
      <Navigation />
      <Suspense fallback={<PageLoader />}>
        <div className={[template ? "bt-site bt-"+template : "", framed ? "site-route-frame" : ""].filter(Boolean).join(" ")} data-bt-template={template || undefined} style={framed ? undefined : {display:"contents"}}>
        <Routes>
          {/* Main */}
          <Route path="/" element={<Index />} />
          <Route path="/home-preview" element={<HomePreview />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/old-home" element={<Navigate to="/" replace />} />
          
          {/* Start */}
          <Route path="/start" element={<StartPage />} />
          <Route path="/start/" element={<StartPage />} />
          
          {/* Services */}
          <Route path="/services" element={<CommercialSolutions />} />
          <Route path="/services/automation" element={<AutomationHubPage />} />
          <Route path="/services/neurotenderolog" element={<TenderServicePage />} />
          <Route path="/services/neurotenderolog/" element={<TenderServicePage />} />
          {/* Legacy slugs → 301-style redirects to current service pages */}
          <Route path="/services/diagnostics" element={<Navigate to="/services/digital-audit" replace />} />
          <Route path="/services/architecture" element={<Navigate to="/services/digital-solution-design" replace />} />
          <Route path="/services/support" element={<Navigate to="/faq#technical-obligations" replace />} />
          <Route path="/services/add-ons" element={<Navigate to="/services" replace />} />
          {/* Demo legacy slugs */}
          <Route path="/demo" element={<Navigate to="/services" replace />} />
          <Route path="/demo/voice-bot" element={<Navigate to="/services/digital-solution-design" replace />} />
          {/* Pillar SEO pages (поддержка URL с/без trailing slash) */}
          <Route path="/services/avtomatizaciya-biznes-processov" element={<PillarPage />} />
          <Route path="/services/avtomatizaciya-biznes-processov/" element={<PillarPage />} />
          <Route path="/services/cifrovizaciya-biznesa" element={<PillarPage />} />
          <Route path="/services/cifrovizaciya-biznesa/" element={<PillarPage />} />
          <Route path="/services/vnedrenie-ii-v-biznes" element={<PillarPage />} />
          <Route path="/services/vnedrenie-ii-v-biznes/" element={<PillarPage />} />
          <Route path="/services/owner-digital-session" element={<Navigate to="/start" replace />} />
          <Route path="/services/digital-development-strategy" element={<Navigate to="/expert" replace />} />
          <Route path="/services/implementation-support" element={<Navigate to="/services/automation" replace />} />
          <Route path="/services/digital-tools-support" element={<Navigate to="/faq#technical-obligations" replace />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          
          {/* Products */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/neurotenderolog" element={<Navigate to="/services/neurotenderolog" replace />} />
          <Route path="/products/knowledge-management" element={<KnowledgePage />} />
          <Route path="/mini-agents" element={<MiniAgentsPage />} />
          <Route path="/mini-agents/:slug" element={<MiniAgentDetailPage />} />
          <Route path="/ai-agents" element={<AgentsPage />} />
          <Route path="/ai-agents/hermes" element={<HermesPage />} />
          <Route path="/ai-agents/custom" element={<CustomAgentsPage />} />
          <Route path="/expert" element={<ExpertPage />} />
          <Route path="/products/voice-bot" element={<Navigate to="/mini-agents/customer-voice-requests" replace />} />
          <Route path="/products/doc-search" element={<Navigate to="/cases/production-doc-search" replace />} />
          
          {/* Cases */}
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/kraypotrebsoyuz" element={<CaseStudyKraypotrebsoyuz />} />
          <Route path="/cases/cargo-express" element={<CaseStudyCargoExpress />} />
          <Route path="/cases/doc-search" element={<Navigate to="/cases/production-doc-search" replace />} />
          <Route path="/cases/:slug" element={<CaseDetailPage />} />
          
          {/* Materials */}
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/materials/resources" element={<Navigate to="/materials" replace />} />
          <Route path="/materials/blog" element={<Blog />} />
          <Route path="/materials/blog/:slug" element={<BlogPost />} />
          <Route path="/materials/checklist-30" element={<Checklist30Page />} />
          <Route path="/materials/plaud-guide" element={<PlaudGuidePage />} />
          <Route path="/materials/instrukciya-plaud-ai" element={<Navigate to="/materials/plaud-guide/" replace />} />
          
          {/* About */}
          <Route path="/about" element={<About />} />
          <Route path="/approach/contacts" element={<Navigate to="/about" replace />} />
          
          {/* Pricing */}
          <Route path="/pricing" element={<CommercialPricingPage />} />
          
          {/* Legal */}
          <Route path="/legal" element={<Navigate to="/legal/privacy-policy/" replace />} />
          <Route path="/legal/consent" element={<Consent />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/cookies" element={<CookiesPolicy />} />
          <Route path="/legal/terms" element={<Terms />} />
          
          {/* Redirects for old URLs */}
          <Route path="/training" element={<Navigate to="/services/digital-tools-program/" replace />} />
          <Route path="/automation" element={<Navigate to="/services/avtomatizaciya-biznes-processov/" replace />} />
          <Route path="/digitalization" element={<Navigate to="/services/cifrovizaciya-biznesa/" replace />} />
          <Route path="/ai" element={<Navigate to="/services/vnedrenie-ii-v-biznes/" replace />} />
          <Route path="/ai-smm" element={<Navigate to="/services/" replace />} />
          <Route path="/audit" element={<Navigate to="/start/" replace />} />
          
          <Route path="/diagnostics" element={<Navigate to="/services/digital-audit/" replace />} />
          <Route path="/diagnostic" element={<Navigate to="/services/digital-audit/" replace />} />
          <Route path="/approach" element={<Navigate to="/about" replace />} />
          <Route path="/resources" element={<Navigate to="/materials/resources" replace />} />
          <Route path="/blog" element={<Navigate to="/materials/blog" replace />} />
          <Route path="/blog/:slug" element={<BlogOldRedirect />} />
          <Route path="/consent" element={<Navigate to="/legal/consent" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/legal/privacy-policy/" replace />} />
          <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
          <Route path="/case_portfolio" element={<Navigate to="/cases/" replace />} />
          <Route path="/case-studies/kraypotrebsoyuz" element={<Navigate to="/cases/kraypotrebsoyuz" replace />} />
          <Route path="/case-studies/cargo-express" element={<Navigate to="/cases/cargo-express" replace />} />
          <Route path="/case-studies/doc-search" element={<Navigate to="/cases/production-doc-search" replace />} />
          <Route path="/golossok-pricing" element={<Navigate to="/pricing/" replace />} />
          <Route path="/checklist" element={<Navigate to="/materials/checklist-30" replace />} />
          <Route path="/newyear" element={<Navigate to="/" replace />} />
          <Route path="/newyear-greeting" element={<NewYearGreeting />} />
          <Route path="/redirect" element={<Redirect />} />
          
          {/* Portal */}
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/admin" element={<PortalAdminPage />} />

          {/* Neurostylist — продуктовая страница */}
          <Route path="/neurostylist" element={<NeurostylistPage />} />
          <Route path="/neurostylist/" element={<NeurostylistPage />} />

          {/* OAuth consent (managed Supabase OAuth server) */}
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Suspense>
      <ExitIntentPopup />
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
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
