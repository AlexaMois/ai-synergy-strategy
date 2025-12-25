import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import ServicesDetailed from "@/components/ServicesDetailed";
import AdditionalServices from "@/components/AdditionalServices";
import PageTransition from "@/components/PageTransition";
import { Search, Building2, Handshake, Target, Users, Cog, Database, Layers } from "lucide-react";

const ServicesPage = () => {
  const systemElements = [
    { icon: Target, label: "Смысл задачи" },
    { icon: Users, label: "Люди" },
    { icon: Cog, label: "Процессы" },
    { icon: Database, label: "Данные" },
    { icon: Layers, label: "Архитектура" },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Услуги — Александра Моисеева, Инженер по ИИ</title>
        <meta name="description" content="Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты. Работаю с компаниями от 3 до 300 человек." />
        <meta name="keywords" content="услуги ИИ, внедрение AI, аудит процессов, AI архитектура, консалтинг искусственный интеллект" />
        <link rel="canonical" href="https://aleksamois.ru/services" />
        <meta property="og:title" content="Услуги — Александра Моисеева, Инженер по ИИ" />
        <meta property="og:description" content="Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты." />
        <meta property="og:url" content="https://aleksamois.ru/services" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
      
        <main>
        {/* Hero Section */}
        <section className="pt-32 pb-10 md:pb-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Two column layout: Text left, Infographic right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10">
              {/* Left column - Text */}
              <div>
                <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-medium text-foreground mb-6 leading-tight">
                  Услуги: <span className="font-semibold">инженерный подход к ИИ</span>
                </h1>
                <p className="text-base sm:text-lg text-foreground leading-relaxed">
                  Три этапа: диагностика → архитектура → сопровождение. Помогаю внедрить ИИ так, чтобы он работал и приносил результаты. Смотрю на систему как целое: смысл задачи, люди, процессы, данные, архитектура.
                </p>
              </div>

              {/* Right column - Infographic */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-semibold text-primary text-center leading-tight">Система<br/>как целое</span>
                  </div>
                  
                  {/* Elements around the circle */}
                  {systemElements.map((element, index) => {
                    const angle = (index * 72 - 90) * (Math.PI / 180); // 72 degrees apart, starting from top
                    const radius = 110; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const Icon = element.icon;
                    
                    return (
                      <div
                        key={index}
                        className="absolute flex flex-col items-center gap-1 sm:gap-2 animate-fade-in-up"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border border-border shadow-soft flex items-center justify-center">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground text-center whitespace-nowrap">
                          {element.label}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Connecting lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                    {systemElements.map((_, index) => {
                      const angle = (index * 72 - 90) * (Math.PI / 180);
                      const innerRadius = 48;
                      const outerRadius = 95;
                      const x1 = 160 + Math.cos(angle) * innerRadius;
                      const y1 = 160 + Math.sin(angle) * innerRadius;
                      const x2 = 160 + Math.cos(angle) * outerRadius;
                      const y2 = 160 + Math.sin(angle) * outerRadius;
                      
                      return (
                        <line
                          key={index}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="hsl(var(--primary))"
                          strokeWidth="1.5"
                          strokeOpacity="0.3"
                          strokeDasharray="4 4"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* Three stages process */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
              {/* Stage 1: Diagnostics */}
              <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">01</span>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-soft flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">Диагностика</span>
              </div>

              {/* Arrow 1 */}
              <div className="text-primary text-2xl rotate-90 sm:rotate-0">→</div>

              {/* Stage 2: Architecture */}
              <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">02</span>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-soft flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">Архитектура</span>
              </div>

              {/* Arrow 2 */}
              <div className="text-primary text-2xl rotate-90 sm:rotate-0">→</div>

              {/* Stage 3: Support */}
              <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">03</span>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-soft flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">Сопровождение</span>
              </div>
            </div>

            {/* Full width description block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-soft">
              <p className="text-base sm:text-lg text-foreground leading-relaxed text-center">
                Работаю с компаниями от 3 до 300 человек. Помогаю внедрить ИИ без переделки процессов и остановки операционки. Смотрю на систему как целое: смысл задачи, люди, процессы, данные, архитектура — вместе. Защищаю бизнес от неправильных решений и лишних затрат.
              </p>
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
    </PageTransition>
  );
};

export default ServicesPage;
