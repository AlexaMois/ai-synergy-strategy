import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import { ArrowRight, Search, X, Factory, Building2, Truck, FileText, Briefcase, GraduationCap } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Case images
import caseKraypotrebsoyuz from "@/assets/cases/case-kraypotrebsoyuz.jpg";
import caseDocSearch from "@/assets/cases/case-doc-search.jpg";
import caseCargoExpress from "@/assets/cases/case-cargo-express.jpg";

interface CaseItem {
  id: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  industry: string;
  solutionType: string;
  link: string;
  status: "ready" | "placeholder";
  image?: string;
}

const INDUSTRIES = [
  { id: "all", label: "Все отрасли", icon: Building2 },
  { id: "production", label: "Производство", icon: Factory },
  { id: "logistics", label: "Логистика", icon: Truck },
  { id: "education", label: "Образование", icon: GraduationCap },
  { id: "it", label: "IT", icon: FileText },
  { id: "services", label: "Услуги", icon: Briefcase },
  { id: "retail", label: "Торговля", icon: Building2 },
];

const SOLUTION_TYPES = [
  { id: "all", label: "Все решения" },
  { id: "automation", label: "Автоматизация" },
  { id: "assistant", label: "AI-ассистенты" },
  { id: "content", label: "Контент" },
  { id: "docs", label: "Документооборот" },
];

const cases: CaseItem[] = [
  {
    id: "kraypotrebsoyuz",
    title: "Вместо сервера за 1,5 млн ₽ — архитектура, которая окупилась",
    description: "Спроектировали ИИ-архитектуру для Крайпотребсоюза без дорогой инфраструктуры. Автоматизация договоров и отчётности.",
    metrics: [
      { label: "Экономия", value: "1,3 млн ₽" },
      { label: "Время", value: "−6 ч/нед" },
    ],
    industry: "services",
    solutionType: "automation",
    link: "/cases/kraypotrebsoyuz",
    status: "ready",
    image: caseKraypotrebsoyuz,
  },
  {
    id: "doc-search",
    title: "QR-код на рабочем месте → ответ из документации за 3 секунды",
    description: "Интеллектуальный поиск по технической документации для производственной компании. Понимает текст, изображения и смешанные языки.",
    metrics: [
      { label: "Экономия", value: "150–350 тыс ₽/мес" },
      { label: "Время ответа", value: "3 сек" },
    ],
    industry: "production",
    solutionType: "docs",
    link: "/cases/doc-search",
    status: "ready",
    image: caseDocSearch,
  },
  {
    id: "cargo-express",
    title: "Заявки голосом → сразу в Google Sheets",
    description: "ИИ-система приёма заявок для транспортной компании. Голос и текст автоматически раскладываются в таблицы с аналитикой.",
    metrics: [
      { label: "Экономия", value: "3–4 ч/нед" },
      { label: "Потери", value: "0%" },
    ],
    industry: "logistics",
    solutionType: "automation",
    link: "/cases/cargo-express",
    status: "ready",
    image: caseCargoExpress,
  },
  {
    id: "ai-smm",
    title: "AI-SMM Агентство — автоматизация генерации контента",
    description: "AI-бот для SMM-команд: генерация постов, сторис, прогревов и контент-планов под разные платформы.",
    metrics: [
      { label: "Время", value: "8 ч → 15 мин" },
      { label: "Экономия", value: "80 тыс ₽/мес" },
    ],
    industry: "services",
    solutionType: "content",
    link: "/cases/ai-smm",
    status: "placeholder",
  },
  {
    id: "school-assistant",
    title: "Умный AI-ассистент для родителей",
    description: "Telegram-бот для лицея: расписание, посещаемость, уведомления. Ответы за 5–10 секунд вместо 10–15 минут.",
    metrics: [
      { label: "Экономия", value: "50 ч/мес" },
      { label: "Ответ", value: "5–10 сек" },
    ],
    industry: "education",
    solutionType: "assistant",
    link: "/cases/school-assistant",
    status: "placeholder",
  },
  {
    id: "neuro-tender",
    title: "НейроТендеролог — отбор релевантных тендеров",
    description: "Python-скрипт для автоматического анализа тендеров с Контура. LLM-оценка релевантности в 3 этапа.",
    metrics: [
      { label: "Время", value: "3 ч → 15 мин" },
      { label: "Точность", value: "85–90%" },
    ],
    industry: "services",
    solutionType: "automation",
    link: "/cases/neuro-tender",
    status: "placeholder",
  },
  {
    id: "neuro-notes",
    title: "НейроКонспектолог — расшифровка встреч",
    description: "Автоматическая транскрибация с разметкой по спикерам. Интеграция с Telegram, Notion, Google Docs.",
    metrics: [
      { label: "Экономия", value: "10 ч/нед" },
      { label: "Ошибки", value: "минимум" },
    ],
    industry: "it",
    solutionType: "automation",
    link: "/cases/neuro-notes",
    status: "placeholder",
  },
  {
    id: "vasya-secretary",
    title: "ИИ-Вася Секретарь",
    description: "Персональный ассистент в Telegram: календарь, заметки, визитки, заявки. Голосовое управление.",
    metrics: [
      { label: "Экономия", value: "20+ ч/мес" },
      { label: "ROI", value: "~15×" },
    ],
    industry: "services",
    solutionType: "assistant",
    link: "/cases/vasya-secretary",
    status: "placeholder",
  },
  {
    id: "neuro-fireman",
    title: "НейроПожарник — AI-ассистент по нормам ПБ",
    description: "AI-ассистент в Telegram с базой знаний по нормативам промышленной безопасности.",
    metrics: [
      { label: "Ответ", value: "10 сек" },
      { label: "Время", value: "−80%" },
    ],
    industry: "production",
    solutionType: "assistant",
    link: "/cases/neuro-fireman",
    status: "placeholder",
  },
  {
    id: "neuro-farmer",
    title: "НейроФермер — автоматизация учёта",
    description: "Telegram-бот с голосовым управлением для фермерского хозяйства: учёт надоев, рождений, процедур.",
    metrics: [
      { label: "Экономия", value: "60 ч/мес" },
      { label: "Выгода", value: "2 млн ₽/год" },
    ],
    industry: "production",
    solutionType: "automation",
    link: "/cases/neuro-farmer",
    status: "placeholder",
  },
  {
    id: "samprodam-bot",
    title: "СамПродам Бот — автоматизация договоров",
    description: "Telegram-бот с OCR для агентства недвижимости: чтение паспортов и ЕГРН, генерация PDF.",
    metrics: [
      { label: "Формат", value: "PDF/Word" },
      { label: "OCR", value: "паспорта" },
    ],
    industry: "services",
    solutionType: "docs",
    link: "/cases/samprodam-bot",
    status: "placeholder",
  },
  {
    id: "digital-twin",
    title: "Цифровой двойник производства",
    description: "Автоматический сбор данных из CRM, ERP, СКУД. Чат-интерфейс для голосовых и текстовых запросов.",
    metrics: [
      { label: "Ответ", value: "<1 сек" },
      { label: "Решения", value: "×5 быстрее" },
    ],
    industry: "production",
    solutionType: "automation",
    link: "/cases/digital-twin",
    status: "placeholder",
  },
  {
    id: "corporate-docs",
    title: "Ассистент по корпоративным документам",
    description: "Поиск ответов по базе >10 000 файлов. Гибридный поиск с генерацией через LLM.",
    metrics: [
      { label: "Точность", value: "95%" },
      { label: "Нагрузка", value: "−40%" },
    ],
    industry: "it",
    solutionType: "docs",
    link: "/cases/corporate-docs",
    status: "placeholder",
  },
  {
    id: "doc-classification",
    title: "Распознавание и классификация документов",
    description: "OCR-модуль с классификатором документов. Интеграция с 1С и Google Sheets.",
    metrics: [
      { label: "Скорость", value: "0,2 сек" },
      { label: "Точность", value: "98%" },
    ],
    industry: "services",
    solutionType: "docs",
    link: "/cases/doc-classification",
    status: "placeholder",
  },
];

const CasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [activeSolutionType, setActiveSolutionType] = useState("all");

  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          caseItem.title.toLowerCase().includes(query) ||
          caseItem.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Industry filter
      if (activeIndustry !== "all" && caseItem.industry !== activeIndustry) {
        return false;
      }

      // Solution type filter
      if (activeSolutionType !== "all" && caseItem.solutionType !== activeSolutionType) {
        return false;
      }

      return true;
    });
  }, [searchQuery, activeIndustry, activeSolutionType]);

  const readyCases = filteredCases.filter((c) => c.status === "ready");
  const placeholderCases = filteredCases.filter((c) => c.status === "placeholder");

  return (
    <PageTransition>
      <Helmet>
        <title>Кейсы внедрения ИИ — Реальные результаты | Александра Моисеева</title>
        <meta
          name="description"
          content="14+ кейсов внедрения ИИ для бизнеса: автоматизация процессов, AI-ассистенты, работа с документами. Экономия до 1,3 млн ₽, окупаемость от 1 месяца."
        />
        <meta
          name="keywords"
          content="кейсы внедрения ИИ, примеры AI автоматизации, результаты искусственный интеллект, ROI ИИ проектов"
        />
        <link rel="canonical" href="https://neuro-moiseeva.ru/cases" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <PageBreadcrumbs currentPage="Кейсы" />

            {/* Hero Section */}
            <section className="text-center mb-12 mt-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Кейсы внедрения ИИ
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Реальные проекты с измеримыми результатами. 
                Экономия времени, денег и ресурсов.
              </p>
            </section>

            {/* Search */}
            <section className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по кейсам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 py-6 text-base bg-card border-border"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </section>

            {/* Filters */}
            <section className="mb-10">
              {/* Industry Filter */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide justify-center mb-4">
                {INDUSTRIES.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => setActiveIndustry(industry.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 font-medium text-sm",
                        activeIndustry === industry.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{industry.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Solution Type Filter */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide justify-center">
                {SOLUTION_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveSolutionType(type.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 font-medium text-sm border",
                      activeSolutionType === type.id
                        ? "bg-primary/10 text-primary border-primary"
                        : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Results count */}
            {(searchQuery || activeIndustry !== "all" || activeSolutionType !== "all") && (
              <p className="text-sm text-muted-foreground text-center mb-6">
                Найдено: {filteredCases.length} {filteredCases.length === 1 ? "кейс" : filteredCases.length < 5 ? "кейса" : "кейсов"}
              </p>
            )}

            {/* Ready Cases */}
            {readyCases.length > 0 && (
              <section className="mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {readyCases.map((caseItem) => (
                    <CaseCard key={caseItem.id} caseItem={caseItem} />
                  ))}
                </div>
              </section>
            )}

            {/* Placeholder Cases */}
            {placeholderCases.length > 0 && (
              <section className="mb-16">
                {readyCases.length > 0 && (
                  <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                    Ещё кейсы
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placeholderCases.map((caseItem) => (
                    <CaseCard key={caseItem.id} caseItem={caseItem} isPlaceholder />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {filteredCases.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">Кейсы не найдены</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveIndustry("all");
                    setActiveSolutionType("all");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </main>

        <Contact />
        <Partners />
        <Footer />
      </div>
    </PageTransition>
  );
};

// Compact Case Card Component
interface CaseCardProps {
  caseItem: CaseItem;
  isPlaceholder?: boolean;
}

const CaseCard = ({ caseItem, isPlaceholder }: CaseCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-full transition-all duration-300",
        isPlaceholder 
          ? "opacity-70 hover:opacity-100" 
          : "shadow-soft hover:shadow-card hover:-translate-y-1"
      )}
    >
      {/* Image */}
      {caseItem.image ? (
        <div className="w-full h-32 overflow-hidden">
          <img 
            src={caseItem.image} 
            alt={caseItem.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-32 bg-muted flex items-center justify-center">
          <Building2 className="w-8 h-8 text-muted-foreground/30" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-3 leading-tight line-clamp-2">
          {caseItem.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
          {caseItem.description}
        </p>

        {/* Metrics */}
        <div className="flex gap-4 mb-4">
          {caseItem.metrics.slice(0, 2).map((metric, idx) => (
            <div key={idx} className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">{metric.label}</p>
              <p className="text-sm font-semibold text-primary">{metric.value}</p>
            </div>
          ))}
      </div>

        {/* Button */}
        {isPlaceholder ? (
          <div className="pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Скоро будет доступен</span>
          </div>
        ) : (
          <Button asChild variant="outline" size="sm" className="w-full mt-auto">
            <Link to={caseItem.link}>
              Смотреть кейс
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CasesPage;
