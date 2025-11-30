import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CasesPage from "./pages/CasesPage";
import CaseStudyKraypotrebsoyuz from "./pages/CaseStudyKraypotrebsoyuz";
import CaseStudyCargoExpress from "./pages/CaseStudyCargoExpress";
import GolossokDemo from "./pages/GolossokDemo";
import GolossokPricing from "./pages/GolossokPricing";
import ChecklistPage from "./pages/ChecklistPage";
import ResourcesPage from "./pages/ResourcesPage";
import Consent from "./pages/Consent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
          <Route path="/golossok-demo" element={<GolossokDemo />} />
          <Route path="/golossok-pricing" element={<GolossokPricing />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
