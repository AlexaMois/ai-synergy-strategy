import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import BackToHome from "@/components/BackToHome";
import Index from "./pages/Index";

// Lazy load pages
const StartPage = lazy(() => import("./pages/start/StartPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const DiagnosticsPage = lazy(() => import("./pages/services/DiagnosticsPage"));
const ArchitecturePage = lazy(() => import("./pages/services/ArchitecturePage"));
const SupportPage = lazy(() => import("./pages/services/SupportPage"));
const AddOnsPage = lazy(() => import("./pages/services/AddOnsPage"));
const ProductsPage = lazy(() => import("./pages/products/ProductsPage"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CaseDetailPage = lazy(() => import("./pages/cases/CaseDetailPage"));
const DocSearchCasePage = lazy(() => import("./pages/cases/DocSearchCasePage"));
const MaterialsPage = lazy(() => import("./pages/materials/MaterialsPage"));

const DemoPage = lazy(() => import("./pages/demo/DemoPage"));
const LegalPage = lazy(() => import("./pages/legal/LegalPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const CaseStudyKraypotrebsoyuz = lazy(() => import("./pages/CaseStudyKraypotrebsoyuz"));
const CaseStudyCargoExpress = lazy(() => import("./pages/CaseStudyCargoExpress"));
const CaseStudyDocSearch = lazy(() => import("./pages/CaseStudyDocSearch"));
const GolossokDemo = lazy(() => import("./pages/GolossokDemo"));
const GolossokPricing = lazy(() => import("./pages/GolossokPricing"));
const ChecklistPage = lazy(() => import("./pages/ChecklistPage"));
const Consent = lazy(() => import("./pages/Consent"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const TestPage = lazy(() => import("./pages/TestPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-primary text-lg">Загрузка...</div>
  </div>
);

const App = () => (
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main */}
            <Route path="/" element={<Index />} />
            <Route path="/faq" element={<FAQPage />} />
            
            {/* Start */}
            <Route path="/start" element={<StartPage />} />
            
            {/* Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/diagnostics" element={<DiagnosticsPage />} />
            <Route path="/services/architecture" element={<ArchitecturePage />} />
            <Route path="/services/support" element={<SupportPage />} />
            <Route path="/services/add-ons" element={<AddOnsPage />} />
            
            {/* Products */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/voice-bot" element={<GolossokPricing />} />
            <Route path="/products/doc-search" element={<CaseStudyDocSearch />} />
            
            {/* Cases */}
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/kraypotrebsoyuz" element={<CaseStudyKraypotrebsoyuz />} />
            <Route path="/cases/cargo-express" element={<CaseStudyCargoExpress />} />
            <Route path="/cases/doc-search" element={<DocSearchCasePage />} />
            <Route path="/cases/:slug" element={<CaseDetailPage />} />
            
            {/* Materials */}
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/materials/resources" element={<ResourcesPage />} />
            <Route path="/materials/blog" element={<Blog />} />
            <Route path="/materials/blog/:slug" element={<BlogPost />} />
            
            {/* About */}
            <Route path="/about" element={<About />} />
            
            {/* Pricing */}
            <Route path="/pricing" element={<PricingPage />} />
            
            {/* Demo */}
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/demo/voice-bot" element={<GolossokDemo />} />
            
            {/* Legal */}
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/consent" element={<Consent />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<Terms />} />
            
            {/* Redirects for old URLs */}
            <Route path="/about" element={<Navigate to="/approach/contacts" replace />} />
            <Route path="/resources" element={<Navigate to="/materials/resources" replace />} />
            <Route path="/blog" element={<Navigate to="/materials/blog" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/materials/blog/:slug" replace />} />
            <Route path="/consent" element={<Navigate to="/legal/consent" replace />} />
            <Route path="/privacy-policy" element={<Navigate to="/legal/privacy-policy" replace />} />
            <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
            <Route path="/case-studies/kraypotrebsoyuz" element={<Navigate to="/cases/kraypotrebsoyuz" replace />} />
            <Route path="/case-studies/cargo-express" element={<Navigate to="/cases/cargo-express" replace />} />
            <Route path="/case-studies/doc-search" element={<Navigate to="/products/doc-search" replace />} />
            <Route path="/golossok-demo" element={<Navigate to="/demo/voice-bot" replace />} />
            <Route path="/golossok-pricing" element={<Navigate to="/products/voice-bot" replace />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/test" element={<TestPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
