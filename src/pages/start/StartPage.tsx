import { useState, useRef, useCallback } from "react";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import AIDiagnostic from "@/components/ai-calculator/AIDiagnostic";
import { DiagnosticData, CalculationResult } from "@/components/ai-calculator/types";
import { trackCTAClick } from "@/utils/analytics";

const StartPage = () => {
  const [diagnosticStarted, setDiagnosticStarted] = useState(false);
  
  const diagnosticRef = useRef<HTMLDivElement>(null);

  const startDiagnostic = () => {
    setDiagnosticStarted(true);
    setTimeout(() => {
      diagnosticRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDiagnosticComplete = useCallback((data: DiagnosticData, result: CalculationResult) => {
    // Results handled within AIDiagnostic component
  }, []);

  const handleCTA = useCallback(() => {
    trackCTAClick({ location: 'other', buttonText: 'Start Page CTA' });
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>С чего начать внедрение ИИ — AI-диагностика бизнеса | Александра Моисеева</title>
        <meta name="description" content="За 2 минуты ИИ покажет, где вы теряете деньги и какой результат можно получить от автоматизации. Бесплатная AI-диагностика бизнеса." />
        <meta name="keywords" content="AI диагностика бизнеса, внедрение ИИ, ROI автоматизации, экономия на процессах" />
        <link rel="canonical" href="https://aleksamois.ru/start" />
        <meta property="og:title" content="С чего начать внедрение ИИ — AI-диагностика | Александра Моисеева" />
        <meta property="og:description" content="За 2 минуты ИИ покажет, где вы теряете деньги и какой результат можно получить от автоматизации." />
        <meta property="og:url" content="https://aleksamois.ru/start" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.start())}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="С чего начать" />
        
        <main>
          {/* Hero Section */}
          <section className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-диагностика</span>
              </div>
              
              <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold text-foreground leading-tight mb-6">
                С чего начать внедрение ИИ в бизнес
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                За 2 минуты ИИ покажет, где вы теряете деньги и какой результат можно получить от автоматизации
              </p>
              
              {!diagnosticStarted && (
                <Button 
                  size="lg" 
                  onClick={startDiagnostic}
                  className="text-lg px-8 py-6 h-auto"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Запустить AI-диагностику
                </Button>
              )}
            </div>
          </section>

          {/* Diagnostic Section */}
          {diagnosticStarted && (
            <section ref={diagnosticRef} className="py-10 md:py-16 bg-muted">
              <div className="container mx-auto px-4">
                <AIDiagnostic 
                  onComplete={handleDiagnosticComplete}
                  onCTA={handleCTA}
                />
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StartPage;
