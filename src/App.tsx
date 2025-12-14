import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import BackToHome from "@/components/BackToHome";
import Index from "./pages/Index";

// Lazy load non-critical pages
const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CaseStudyKraypotrebsoyuz = lazy(() => import("./pages/CaseStudyKraypotrebsoyuz"));
const CaseStudyCargoExpress = lazy(() => import("./pages/CaseStudyCargoExpress"));
const CaseStudyDocSearch = lazy(() => import("./pages/CaseStudyDocSearch"));
const GolossokDemo = lazy(() => import("./pages/GolossokDemo"));
const GolossokPricing = lazy(() => import("./pages/GolossokPricing"));
const ChecklistPage = lazy(() => import("./pages/ChecklistPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const Consent = lazy(() => import("./pages/Consent"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const TestPage = lazy(() => import("./pages/TestPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
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
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/case-studies/kraypotrebsoyuz" element={<CaseStudyKraypotrebsoyuz />} />
            <Route path="/case-studies/cargo-express" element={<CaseStudyCargoExpress />} />
            <Route path="/case-studies/doc-search" element={<CaseStudyDocSearch />} />
            <Route path="/golossok-demo" element={<GolossokDemo />} />
            <Route path="/golossok-pricing" element={<GolossokPricing />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/test" element={<TestPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
