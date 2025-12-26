import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, BookOpen, ArrowRight } from "lucide-react";

const MaterialsPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Материалы — Ресурсы и блог | Александра Моисеева</title>
        <meta name="description" content="Полезные материалы для самостоятельного изучения: чек-листы, гайды, статьи блога по внедрению ИИ в бизнес." />
        <meta name="keywords" content="материалы ИИ, чек-листы AI, блог искусственный интеллект, ресурсы внедрение" />
        <link rel="canonical" href="https://aleksamois.ru/materials" />
        <meta property="og:title" content="Материалы — Ресурсы и блог | Александра Моисеева" />
        <meta property="og:description" content="Полезные материалы: чек-листы, гайды, статьи блога по внедрению ИИ в бизнес." />
        <meta property="og:url" content="https://aleksamois.ru/materials" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Материалы" />
        
        <main>
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 max-w-5xl text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-6">
                Материалы для изучения
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Чек-листы, гайды и статьи для самостоятельной оценки AI-готовности компании
              </p>
            </div>
          </section>

          {/* Navigation Cards */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                <Link
                  to="/materials/resources"
                  className="bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    Ресурсы
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Чек-листы, PDF-гайды, архитектуры кейсов, шаблоны ТЗ и калькуляторы ROI
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Перейти к ресурсам
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>

                <Link
                  to="/materials/blog"
                  className="bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-card hover:border-primary/20 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    Блог
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Статьи о практике внедрения ИИ, разборы кейсов, тренды и инсайты
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Читать блог
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </div>
            </div>
          </section>

          <Contact />
          <Partners />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default MaterialsPage;
