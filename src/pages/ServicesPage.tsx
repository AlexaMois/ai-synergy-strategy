import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Target, Users, Cog, Database, Layers, Award, ShieldCheck } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { Link } from "react-router-dom";

const systemElements = [
  { icon: Target, label: "Смысл задачи" },
  { icon: Users, label: "Люди" },
  { icon: Cog, label: "Процессы" },
  { icon: Database, label: "Данные" },
  { icon: Layers, label: "Архитектура" },
];

const ServicesPage = () => {
  return <PageTransition>
      <Helmet>
        <title>Услуги — Александра Моисеева, Инженер по ИИ</title>
        <meta name="description" content="Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты. Работаю с компаниями от 3 до 300 человек." />
        <meta name="keywords" content="услуги ИИ, внедрение AI, аудит процессов, AI архитектура, консалтинг искусственный интеллект" />
        <link rel="canonical" href="https://aleksamois.ru/services" />
        <meta property="og:title" content="Услуги — Александра Моисеева, Инженер по ИИ" />
        <meta property="og:description" content="Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты." />
        <meta property="og:url" content="https://aleksamois.ru/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/SeDuxP3Pk3V5RVtJnT6UW1GlRPb2/social-images/social-1764599945173-Логотип Горизонтальный_Монтажная область 1.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.services())}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <PageBreadcrumbs currentPage="Услуги" />
      
        <main>
        {/* Hero Section */}
        <section className="pt-20 pb-0 bg-background">
          <div className="container mx-auto px-4">
            {/* Two column layout: Text left, Infographic right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-0">
              {/* Left column - Text */}
              <div className="mb-0 mt-[20px] ml-[30px]">
                <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-medium text-foreground mb-6 leading-tight">
                  Услуги: <span className="font-semibold">стратегический и инженерный подход к ИИ</span>
                </h1>
                <ul className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Помогаю внедрить ИИ так, чтобы он работал и приносил результаты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Работаю с компаниями от 3 до 300 человек</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Помогаю внедрить ИИ без переделки процессов и остановки операционки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Защищаю бизнес от неправильных решений и лишних затрат</span>
                  </li>
                </ul>
                
                {/* Three stages process */}
                
                
              </div>

              {/* Right column - Infographic */}
              <div className="flex justify-center lg:flex lg:items-center lg:justify-center pt-10">
                <div className="relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]">
                  {/* Connecting lines from center to elements */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420">
                    {systemElements.map((_, index) => {
                      const angle = (index * 72 - 90) * (Math.PI / 180);
                      const innerRadius = 60;
                      const outerRadius = 130;
                      const x1 = 210 + Math.cos(angle) * innerRadius;
                      const y1 = 210 + Math.sin(angle) * innerRadius;
                      const x2 = 210 + Math.cos(angle) * outerRadius;
                      const y2 = 210 + Math.sin(angle) * outerRadius;
                      return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="6 4" />;
                    })}
                  </svg>
                  
                  {/* Center circle - turquoise filled */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary flex items-center justify-center z-10 shadow-card ring-1 ring-primary/20">
                    <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight px-2">Система<br />как целое</span>
                  </div>
                  
                  {/* Elements around the circle */}
                  {systemElements.map((element, index) => {
                    const angle = (index * 72 - 90) * (Math.PI / 180);
                    const radius = 160;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const Icon = element.icon;
                    return (
                      <div 
                        key={index} 
                        className="absolute flex flex-col items-center justify-center gap-1 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-card shadow-card ring-1 ring-border/50 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <span className="text-[8px] sm:text-[9px] font-medium text-foreground text-center leading-tight px-1">
                          {element.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Full width description block */}
            
          </div>
        </section>

        {/* Trust Badge Section */}
        <section className="py-6 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base font-medium text-foreground">
                  Дипломированный специалист по ИИ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base font-medium text-foreground">
                  Квалификация KAEO уровень 5
                </span>
              </div>
              <Link 
                to="/about#qualifications" 
                className="text-primary hover:text-primary/80 hover:underline text-sm font-medium transition-colors"
              >
                Смотреть сертификаты →
              </Link>
            </div>
          </div>
        </section>

        <ServicesDetailed />
        <AdditionalServices />
        <Contact />
        <Partners />
        </main>
      
        <Footer />
      </div>
    </PageTransition>;
};
export default ServicesPage;