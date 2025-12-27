import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { FileText, Video, Download, ExternalLink, CheckSquare, BookOpen, Layout, FileCode, Play, FileSpreadsheet, Clock } from "lucide-react";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const categories = [{
    id: "all",
    label: "Все материалы"
  }, {
    id: "checklists",
    label: "Чек-листы"
  }, {
    id: "guides",
    label: "Гайды"
  }, {
    id: "architectures",
    label: "Архитектуры"
  }, {
    id: "videos",
    label: "Видео"
  }, {
    id: "documentation",
    label: "Документация"
  }];
  
  const resources: {
    id: number;
    category: string;
    title: string;
    description: string;
    type: string;
    icon: typeof CheckSquare;
    link: string;
    actionLabel: string;
    isExternal: boolean;
    status: "ready" | "coming-soon";
  }[] = [{
    id: 1,
    category: "checklists",
    title: "Чек-лист «10 вопросов перед внедрением ИИ»",
    description: "Оцените готовность вашей компании к внедрению ИИ по 10 ключевым параметрам",
    type: "Чек-лист",
    icon: CheckSquare,
    link: "/checklist",
    actionLabel: "Открыть чек-лист",
    isExternal: false,
    status: "ready"
  }, {
    id: 2,
    category: "guides",
    title: "Гайд «Как не потратить деньги на AI зря»",
    description: "Практическое руководство по оценке AI-решений и избежанию типичных ошибок при внедрении",
    type: "PDF-гайд",
    icon: BookOpen,
    link: "/resources/ai-investment-guide.pdf",
    actionLabel: "Скачать PDF",
    isExternal: false,
    status: "coming-soon"
  }, {
    id: 3,
    category: "architectures",
    title: "Архитектура системы Cargo Express",
    description: "Детальная схема автоматизации обработки заказов с интеграцией Telegram, Make и CRM",
    type: "Архитектура",
    icon: Layout,
    link: "/resources/cargo-express-architecture.pdf",
    actionLabel: "Скачать схему",
    isExternal: false,
    status: "coming-soon"
  }, {
    id: 4,
    category: "architectures",
    title: "Архитектура чат-бота Kraipotrebosoyz",
    description: "Схема интеграции AI-ассистента с базой знаний и системой бизнес-процессов",
    type: "Архитектура",
    icon: Layout,
    link: "/resources/kraipotrebosoyz-architecture.pdf",
    actionLabel: "Скачать схему",
    isExternal: false,
    status: "coming-soon"
  }, {
    id: 5,
    category: "videos",
    title: "Видео «Как работает AI Synergy Framework»",
    description: "2-минутное объяснение методологии и четырёх столпов эффективного внедрения ИИ",
    type: "Видео",
    icon: Video,
    link: "https://youtube.com/watch?v=example",
    actionLabel: "Смотреть видео",
    isExternal: true,
    status: "coming-soon"
  }, {
    id: 6,
    category: "videos",
    title: "Демо GolossOK в действии",
    description: "Живая демонстрация работы AI-помощника для автоматизации бизнес-коммуникаций",
    type: "Видео",
    icon: Play,
    link: "/demo/voice-bot",
    actionLabel: "Смотреть демо",
    isExternal: false,
    status: "ready"
  }, {
    id: 7,
    category: "documentation",
    title: "Шаблон технического задания на внедрение ИИ",
    description: "Готовый шаблон ТЗ для заказа AI-решения у подрядчика или внутренней команды",
    type: "Документ",
    icon: FileCode,
    link: "/resources/ai-tz-template.docx",
    actionLabel: "Скачать шаблон",
    isExternal: false,
    status: "coming-soon"
  }, {
    id: 8,
    category: "documentation",
    title: "Методика расчёта ROI AI-проектов",
    description: "Excel-калькулятор для прогнозирования окупаемости внедрения искусственного интеллекта",
    type: "Таблица",
    icon: FileSpreadsheet,
    link: "/resources/ai-roi-calculator.xlsx",
    actionLabel: "Скачать калькулятор",
    isExternal: false,
    status: "coming-soon"
  }, {
    id: 9,
    category: "guides",
    title: "Гайд по выбору AI-платформы",
    description: "Сравнение Make, n8n, Zapier, российских LLM и других инструментов для разных задач",
    type: "PDF-гайд",
    icon: BookOpen,
    link: "/resources/ai-platform-comparison.pdf",
    actionLabel: "Скачать PDF",
    isExternal: false,
    status: "coming-soon"
  }, {
    id: 10,
    category: "checklists",
    title: "Чек-лист готовности данных к AI",
    description: "Проверьте качество, структуру и доступность данных перед началом AI-проекта",
    type: "Чек-лист",
    icon: CheckSquare,
    link: "/resources/data-readiness-checklist.pdf",
    actionLabel: "Скачать чек-лист",
    isExternal: false,
    status: "coming-soon"
  }];
  
  const filteredResources = activeCategory === "all" ? resources : resources.filter(r => r.category === activeCategory);
  
  return (
    <PageTransition>
      <Helmet>
        <title>Ресурсы — Чек-листы, гайды и архитектуры | Александра Моисеева</title>
        <meta name="description" content="Бесплатные материалы для самостоятельной оценки AI-готовности: чек-листы, гайды, архитектуры кейсов и видео. Скачайте и начните внедрение ИИ." />
        <meta name="keywords" content="чек-лист ИИ, гайд внедрение AI, архитектура AI решений, бесплатные материалы искусственный интеллект" />
        <link rel="canonical" href="https://aleksamois.ru/resources" />
        <meta property="og:title" content="Ресурсы — Чек-листы, гайды и архитектуры" />
        <meta property="og:description" content="Бесплатные материалы для самостоятельной оценки AI-готовности компании." />
        <meta property="og:url" content="https://aleksamois.ru/resources" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.resources())}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs 
          currentPage="Материалы" 
          parentPages={[{ label: "Материалы", href: "/materials" }]} 
        />
        
        <main className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-foreground leading-tight mb-4">
                Библиотека материалов, <span className="font-semibold">для самостоятельной работы</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Чек-листы, гайды, архитектуры кейсов и видео для самостоятельной оценки AI-готовности компании
              </p>
            </div>
          </section>

          {/* Category Filters */}
          <section className="pb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)} 
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === cat.id 
                      ? "bg-primary text-white" 
                      : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* Resources Grid */}
          <section className="pb-10 md:pb-16 lg:pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map(resource => {
                const IconComponent = resource.icon;
                const isComingSoon = resource.status === "coming-soon";
                
                return (
                  <div 
                    key={resource.id} 
                    className={`bg-card border border-border rounded-2xl p-6 shadow-soft transition-shadow duration-200 relative ${
                      isComingSoon ? "opacity-70" : "hover:shadow-card"
                    }`}
                  >
                    {isComingSoon && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        Скоро
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        isComingSoon ? "bg-muted" : "bg-primary/10"
                      }`}>
                        <IconComponent className={`w-6 h-6 ${isComingSoon ? "text-muted-foreground" : "text-primary"}`} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-medium mb-2 ${isComingSoon ? "text-muted-foreground" : "text-primary"}`}>
                          {resource.type}
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2 leading-tight">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {resource.description}
                        </p>
                        {isComingSoon ? (
                          <Button 
                            size="sm" 
                            className="w-full sm:w-auto" 
                            disabled
                            variant="outline"
                          >
                            <Clock className="w-4 h-4 mr-2" strokeWidth={1.5} />
                            Скоро будет доступно
                          </Button>
                        ) : resource.link.startsWith("/") && !resource.link.includes(".") ? (
                          <Button asChild size="sm" className="w-full sm:w-auto">
                            <Link to={resource.link}>
                              <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
                              {resource.actionLabel}
                            </Link>
                          </Button>
                        ) : (
                          <Button asChild size="sm" className="w-full sm:w-auto">
                            <a 
                              href={resource.link} 
                              target={resource.isExternal ? "_blank" : undefined} 
                              rel={resource.isExternal ? "noopener noreferrer" : undefined}
                            >
                              {resource.isExternal ? <ExternalLink className="w-4 h-4 mr-2" strokeWidth={1.5} /> : <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />}
                              {resource.actionLabel}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-[24px] md:text-[30px] font-medium text-foreground mb-4">
                Нужна помощь, <span className="font-semibold">с внедрением ИИ?</span>
              </h2>
              <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                Оставьте Ваши контакты в форме ниже   
              </p>
              <Button size="lg" onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  const navHeight = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}>
                Обсудить задачу
              </Button>
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

export default ResourcesPage;
