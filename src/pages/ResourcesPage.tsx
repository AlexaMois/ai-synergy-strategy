import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Video, 
  Download, 
  ExternalLink,
  CheckSquare,
  BookOpen,
  Layout,
  FileCode,
  Play,
  FileSpreadsheet
} from "lucide-react";

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Все материалы" },
    { id: "checklists", label: "Чек-листы" },
    { id: "guides", label: "Гайды" },
    { id: "architectures", label: "Архитектуры" },
    { id: "videos", label: "Видео" },
    { id: "documentation", label: "Документация" },
  ];

  const resources = [
    {
      id: 1,
      category: "checklists",
      title: "Чек-лист «10 вопросов перед внедрением ИИ»",
      description: "Оцените готовность вашей компании к внедрению ИИ по 10 ключевым параметрам",
      type: "Чек-лист",
      icon: CheckSquare,
      link: "/checklist",
      actionLabel: "Открыть чек-лист",
      isExternal: false,
    },
    {
      id: 2,
      category: "guides",
      title: "Гайд «Как не потратить деньги на AI зря»",
      description: "Практическое руководство по оценке AI-решений и избежанию типичных ошибок при внедрении",
      type: "PDF-гайд",
      icon: BookOpen,
      link: "/resources/ai-investment-guide.pdf",
      actionLabel: "Скачать PDF",
      isExternal: false,
    },
    {
      id: 3,
      category: "architectures",
      title: "Архитектура системы Cargo Express",
      description: "Детальная схема автоматизации обработки заказов с интеграцией Telegram, Make и CRM",
      type: "Архитектура",
      icon: Layout,
      link: "/resources/cargo-express-architecture.pdf",
      actionLabel: "Скачать схему",
      isExternal: false,
    },
    {
      id: 4,
      category: "architectures",
      title: "Архитектура чат-бота Kraipotrebosoyz",
      description: "Схема интеграции AI-ассистента с базой знаний и системой бизнес-процессов",
      type: "Архитектура",
      icon: Layout,
      link: "/resources/kraipotrebosoyz-architecture.pdf",
      actionLabel: "Скачать схему",
      isExternal: false,
    },
    {
      id: 5,
      category: "videos",
      title: "Видео «Как работает AI Synergy Framework»",
      description: "2-минутное объяснение методологии и четырёх столпов эффективного внедрения ИИ",
      type: "Видео",
      icon: Video,
      link: "https://youtube.com/watch?v=example",
      actionLabel: "Смотреть видео",
      isExternal: true,
    },
    {
      id: 6,
      category: "videos",
      title: "Демо GolossOK в действии",
      description: "Живая демонстрация работы AI-помощника для автоматизации бизнес-коммуникаций",
      type: "Видео",
      icon: Play,
      link: "/golossok-demo",
      actionLabel: "Смотреть демо",
      isExternal: false,
    },
    {
      id: 7,
      category: "documentation",
      title: "Шаблон технического задания на внедрение ИИ",
      description: "Готовый шаблон ТЗ для заказа AI-решения у подрядчика или внутренней команды",
      type: "Документ",
      icon: FileCode,
      link: "/resources/ai-tz-template.docx",
      actionLabel: "Скачать шаблон",
      isExternal: false,
    },
    {
      id: 8,
      category: "documentation",
      title: "Методика расчёта ROI AI-проектов",
      description: "Excel-калькулятор для прогнозирования окупаемости внедрения искусственного интеллекта",
      type: "Таблица",
      icon: FileSpreadsheet,
      link: "/resources/ai-roi-calculator.xlsx",
      actionLabel: "Скачать калькулятор",
      isExternal: false,
    },
    {
      id: 9,
      category: "guides",
      title: "Гайд по выбору AI-платформы",
      description: "Сравнение Make, n8n, Zapier, российских LLM и других инструментов для разных задач",
      type: "PDF-гайд",
      icon: BookOpen,
      link: "/resources/ai-platform-comparison.pdf",
      actionLabel: "Скачать PDF",
      isExternal: false,
    },
    {
      id: 10,
      category: "checklists",
      title: "Чек-лист готовности данных к AI",
      description: "Проверьте качество, структуру и доступность данных перед началом AI-проекта",
      type: "Чек-лист",
      icon: CheckSquare,
      link: "/resources/data-readiness-checklist.pdf",
      actionLabel: "Скачать чек-лист",
      isExternal: false,
    },
  ];

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageBreadcrumbs currentPage="Библиотека материалов" />
        
        <main className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-text-heading leading-tight mb-4">
                Библиотека материалов
              </h1>
              <p className="text-base sm:text-lg text-[#6A6A6A] leading-relaxed">
                Чек-листы, гайды, архитектуры кейсов и видео для самостоятельной оценки AI-готовности компании
              </p>
            </div>
          </section>

          {/* Category Filters */}
          <section className="pb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-[#666] border border-[#E6EAEC] hover:border-primary hover:text-primary"
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
              {filteredResources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-[20px] p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] gradient-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-primary mb-2">
                          {resource.type}
                        </div>
                        <h3 className="text-lg font-semibold text-text-heading mb-2 leading-tight">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-[#6A6A6A] leading-relaxed mb-4">
                          {resource.description}
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          <a
                            href={resource.link}
                            target={resource.isExternal ? "_blank" : undefined}
                            rel={resource.isExternal ? "noopener noreferrer" : undefined}
                          >
                            {resource.isExternal ? (
                              <ExternalLink className="w-4 h-4 mr-2" />
                            ) : (
                              <Download className="w-4 h-4 mr-2" />
                            )}
                            {resource.actionLabel}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 md:py-16 lg:py-20">
            <div className="bg-[#F0F9FB] rounded-[24px] p-8 md:p-12 text-center">
              <h2 className="text-[24px] md:text-[30px] font-semibold text-text-heading mb-4">
                Нужна помощь с внедрением?
              </h2>
              <p className="text-base text-[#6A6A6A] mb-6 max-w-2xl mx-auto">
                Запишитесь на бесплатный экспресс-аудит процессов — за 30 минут найдём точки роста и определим, где ИИ даст эффект быстрее всего
              </p>
              <Button asChild size="lg">
                <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                  Записаться на аудит
                </a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ResourcesPage;
