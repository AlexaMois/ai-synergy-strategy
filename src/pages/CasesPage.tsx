import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Search, X, Factory, Building2, Truck, FileText, Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";

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
  { id: "kraypotrebsoyuz", title: "Вместо сервера за 1,5 млн ₽ — архитектура, которая окупилась", description: "Спроектировали ИИ-архитектуру для Крайпотребсоюза без дорогой инфраструктуры. Автоматизация договоров и отчётности.", metrics: [{ label: "Экономия", value: "1,3 млн ₽" }, { label: "Время", value: "−6 ч/нед" }], industry: "services", solutionType: "automation", link: "/cases/kraypotrebsoyuz", status: "ready", image: caseKraypotrebsoyuz },
  { id: "doc-search", title: "QR-код на рабочем месте → ответ из документации за 3 секунды", description: "Интеллектуальный поиск по технической документации для производственной компании. Понимает текст, изображения и смешанные языки.", metrics: [{ label: "Экономия", value: "150–350 тыс ₽/мес" }, { label: "Время ответа", value: "3 сек" }], industry: "production", solutionType: "docs", link: "/products/doc-search", status: "ready", image: caseDocSearch },
  { id: "cargo-express", title: "Заявки голосом → сразу в Google Sheets", description: "ИИ-система приёма заявок для транспортной компании. Голос и текст автоматически раскладываются в таблицы с аналитикой.", metrics: [{ label: "Экономия", value: "3–4 ч/нед" }, { label: "Потери", value: "0%" }], industry: "logistics", solutionType: "automation", link: "/cases/cargo-express", status: "ready", image: caseCargoExpress },
  { id: "ai-smm", title: "AI-SMM Агентство — автоматизация генерации контента", description: "AI-бот для SMM-команд: генерация постов, сторис, прогревов и контент-планов под разные платформы.", metrics: [{ label: "Время", value: "8 ч → 15 мин" }, { label: "Экономия", value: "80 тыс ₽/мес" }], industry: "services", solutionType: "content", link: "/cases/ai-smm", status: "placeholder" },
  { id: "school-assistant", title: "Умный AI-ассистент для родителей", description: "Telegram-бот для лицея: расписание, посещаемость, уведомления. Ответы за 5–10 секунд вместо 10–15 минут.", metrics: [{ label: "Экономия", value: "50 ч/мес" }, { label: "Ответ", value: "5–10 сек" }], industry: "education", solutionType: "assistant", link: "/cases/school-assistant", status: "placeholder" },
  { id: "neuro-tender", title: "НейроТендеролог — отбор релевантных тендеров", description: "Python-скрипт для автоматического анализа тендеров с Контура. LLM-оценка релевантности в 3 этапа.", metrics: [{ label: "Время", value: "3 ч → 15 мин" }, { label: "Точность", value: "85–90%" }], industry: "services", solutionType: "automation", link: "/cases/neuro-tender", status: "placeholder" },
  { id: "neuro-notes", title: "НейроКонспектолог — расшифровка встреч", description: "Автоматическая транскрибация с разметкой по спикерам. Интеграция с Telegram, Notion, Google Docs.", metrics: [{ label: "Экономия", value: "10 ч/нед" }, { label: "Ошибки", value: "минимум" }], industry: "it", solutionType: "automation", link: "/cases/neuro-notes", status: "placeholder" },
  { id: "vasya-secretary", title: "ИИ-Вася Секретарь", description: "Персональный ассистент в Telegram: календарь, заметки, визитки, заявки. Голосовое управление.", metrics: [{ label: "Экономия", value: "20+ ч/мес" }, { label: "ROI", value: "~15×" }], industry: "services", solutionType: "assistant", link: "/cases/vasya-secretary", status: "placeholder" },
  { id: "neuro-fireman", title: "НейроПожарник — AI-ассистент по нормам ПБ", description: "AI-ассистент в Telegram с базой знаний по нормативам промышленной безопасности.", metrics: [{ label: "Ответ", value: "10 сек" }, { label: "Время", value: "−80%" }], industry: "production", solutionType: "assistant", link: "/cases/neuro-fireman", status: "placeholder" },
  { id: "neuro-farmer", title: "НейроФермер — автоматизация учёта", description: "Telegram-бот с голосовым управлением для фермерского хозяйства: учёт надоев, рождений, процедур.", metrics: [{ label: "Экономия", value: "60 ч/мес" }, { label: "Выгода", value: "2 млн ₽/год" }], industry: "production", solutionType: "automation", link: "/cases/neuro-farmer", status: "placeholder" },
  { id: "samprodam-bot", title: "СамПродам Бот — автоматизация договоров", description: "Telegram-бот с OCR для агентства недвижимости: чтение паспортов и ЕГРН, генерация PDF.", metrics: [{ label: "Формат", value: "PDF/Word" }, { label: "OCR", value: "паспорта" }], industry: "services", solutionType: "docs", link: "/cases/samprodam-bot", status: "placeholder" },
  { id: "digital-twin", title: "Цифровой двойник производства", description: "Автоматический сбор данных из CRM, ERP, СКУД. Чат-интерфейс для голосовых и текстовых запросов.", metrics: [{ label: "Ответ", value: "<1 сек" }, { label: "Решения", value: "×5 быстрее" }], industry: "production", solutionType: "automation", link: "/cases/digital-twin", status: "placeholder" },
  { id: "corporate-docs", title: "Ассистент по корпоративным документам", description: "Поиск ответов по базе >10 000 файлов. Гибридный поиск с генерацией через LLM.", metrics: [{ label: "Точность", value: "95%" }, { label: "Нагрузка", value: "−40%" }], industry: "it", solutionType: "docs", link: "/cases/corporate-docs", status: "placeholder" },
  { id: "doc-classification", title: "Распознавание и классификация документов", description: "OCR-модуль с классификатором документов. Интеграция с 1С и Google Sheets.", metrics: [{ label: "Скорость", value: "0,2 сек" }, { label: "Точность", value: "98%" }], industry: "services", solutionType: "docs", link: "/cases/doc-classification", status: "placeholder" },
];

const PillButton = ({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "turquoise";
  className?: string;
}) => {
  const styles = {
    dark: "bg-foreground text-background hover:bg-foreground/90",
    light: "bg-background text-foreground hover:bg-background/90",
    turquoise: "bg-accent text-accent-foreground hover:bg-primary-dark",
  }[variant];
  const iconBg = {
    dark: "bg-accent text-accent-foreground",
    light: "bg-foreground text-background",
    turquoise: "bg-background text-foreground",
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base md:text-lg shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles} ${className}`}
    >
      <span>{children}</span>
      <span className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full ${iconBg} group-hover:translate-x-0.5 transition-transform`}>
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
      </span>
    </Link>
  );
};

const FEATURED_PALETTES = ["bg-surface-mint", "bg-surface-lavender", "bg-surface-blush"];

const CasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [activeSolutionType, setActiveSolutionType] = useState("all");

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!c.title.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) return false;
      }
      if (activeIndustry !== "all" && c.industry !== activeIndustry) return false;
      if (activeSolutionType !== "all" && c.solutionType !== activeSolutionType) return false;
      return true;
    });
  }, [searchQuery, activeIndustry, activeSolutionType]);

  const readyCases = filteredCases.filter((c) => c.status === "ready");
  const placeholderCases = filteredCases.filter((c) => c.status === "placeholder");

  const resetFilters = () => {
    setSearchQuery("");
    setActiveIndustry("all");
    setActiveSolutionType("all");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Кейсы автоматизации бизнес‑процессов с ИИ — реальные цифры и результаты | Александра Моисеева</title>
        <meta name="description" content="Реальные истории: как ИИ‑ассистенты, голосовые боты и RAG‑системы сократили ручной труд, ускорили обработку заявок и снизили брак на производстве." />
        <meta name="keywords" content="примеры автоматизации бизнеса, кейсы автоматизации бизнес процессов, кейсы внедрения ИИ, результаты ИИ в бизнесе" />
        <link rel="canonical" href="https://aleksamois.ru/cases" />
        <meta property="og:title" content="Кейсы автоматизации бизнес‑процессов с ИИ — реальные цифры и результаты | Александра Моисеева" />
        <meta property="og:description" content="Реальные истории: как ИИ‑ассистенты, голосовые боты и RAG‑системы сократили ручной труд, ускорили обработку заявок и снизили брак на производстве." />
        <meta property="og:url" content="https://aleksamois.ru/cases" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbs.cases())}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageBreadcrumbs currentPage="Кейсы" />

        <main>
          {/* HERO — лавандовая плашка */}
          <section className="pt-8 md:pt-12 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="relative rounded-[32px] md:rounded-[40px] bg-surface-lavender overflow-hidden shadow-plate-lg ring-1 ring-foreground/5">
                <div className="px-6 md:px-12 lg:px-16 py-14 md:py-20">
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">Кейсы</p>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-foreground mb-6 max-w-5xl">
                    Кейсы цифрового развития{" "}
                    <span className="font-iriska font-normal italic text-accent">бизнеса</span>
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/85 mb-5 max-w-3xl leading-snug font-medium">
                    Реальные задачи компаний, где цифровые инструменты помогли снизить ручную
                    нагрузку, сохранить бюджет, ускорить работу и усилить управляемость.
                  </p>
                  <p className="text-base md:text-lg text-foreground/70 mb-10 max-w-3xl leading-snug">
                    В каждом проекте сначала разбираем процесс, данные, людей и текущие
                    инструменты. После этого подбираем решение: стратегию, аудит, обучение,
                    внедрение, разработку или сопровождение.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <PillButton to="/start" variant="dark">Подобрать формат работы</PillButton>
                    <PillButton to="/services" variant="light">Посмотреть услуги</PillButton>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* РЕЗУЛЬТАТЫ В ЦИФРАХ */}
          <section className="container mx-auto max-w-7xl px-4 pt-16 md:pt-24">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Результаты{" "}
                <span className="font-iriska font-normal italic text-accent">в цифрах</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Четыре показателя из последних проектов — коротко и по делу.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { value: "1,7 млн ₽", label: "сохранено за квартал в проекте АкТрансСервис", bg: "bg-surface-mint" },
                { value: "1,3 млн ₽", label: "сохранено за квартал в проекте Крайпотребсоюз", bg: "bg-surface-lavender" },
                { value: "0%", label: "потерь заявок после автоматизации в Грузовом Экспрессе", bg: "bg-surface-blush" },
                { value: "3 сек", label: "вместо 25 минут на ответ по техническому запросу", bg: "bg-surface-sand" },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`relative rounded-[24px] ${m.bg} p-7 shadow-card ring-1 ring-foreground/5 min-h-[180px] flex flex-col`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
                    {m.value}
                  </p>
                  <p className="text-sm md:text-base text-foreground/70 leading-snug mt-auto">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ОСНОВНЫЕ КЕЙСЫ — заголовок + поиск/фильтры */}
          <section className="container mx-auto max-w-7xl px-4 pt-16 md:pt-24">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                Основные{" "}
                <span className="font-iriska font-normal italic text-accent">кейсы</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Отфильтруйте по отрасли и типу решения — или ищите по ключевому слову.
              </p>
            </div>

            <div className="max-w-2xl mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по кейсам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-12 py-6 text-base bg-card border-foreground/10 rounded-full shadow-card"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon;
                const active = activeIndustry === industry.id;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustry(industry.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-200",
                      active
                        ? "bg-foreground text-background shadow-card"
                        : "bg-card text-muted-foreground ring-1 ring-foreground/10 hover:text-foreground hover:ring-foreground/30"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{industry.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {SOLUTION_TYPES.map((type) => {
                const active = activeSolutionType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveSolutionType(type.id)}
                    className={cn(
                      "px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-200",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                    )}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>

            {(searchQuery || activeIndustry !== "all" || activeSolutionType !== "all") && (
              <p className="text-sm text-muted-foreground mt-6">
                Найдено: {filteredCases.length}{" "}
                {filteredCases.length === 1 ? "кейс" : filteredCases.length < 5 ? "кейса" : "кейсов"}
              </p>
            )}
          </section>

          {/* FEATURED CASES — крупные цветные плашки */}
          {readyCases.length > 0 && (
            <section className="container mx-auto max-w-7xl px-4 pt-12 pb-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {readyCases.map((c, i) => (
                  <FeaturedCaseCard key={c.id} caseItem={c} palette={FEATURED_PALETTES[i % FEATURED_PALETTES.length]} />
                ))}
              </div>
            </section>
          )}

          {/* PLACEHOLDER CASES — компактная сетка */}
          {placeholderCases.length > 0 && (
            <section className="container mx-auto max-w-7xl px-4 pt-12 pb-16 md:pb-24">
              {readyCases.length > 0 && (
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                  <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
                      Ещё{" "}
                      <span className="font-iriska font-normal italic text-accent">проекты</span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                      Детали этих кейсов появятся постепенно — пока сводки и метрики.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMore((v) => !v)}
                    aria-expanded={showMore}
                    className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all whitespace-nowrap"
                  >
                    {showMore ? "Свернуть" : `Показать ещё (${placeholderCases.length})`}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", showMore && "rotate-180")} />
                  </button>
                </div>
              )}
              {(showMore || readyCases.length === 0) && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
                  {placeholderCases.map((c) => (
                    <PlaceholderCaseCard key={c.id} caseItem={c} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* EMPTY STATE */}
          {filteredCases.length === 0 && (
            <section className="container mx-auto max-w-7xl px-4 py-20 text-center">
              <p className="text-lg text-muted-foreground mb-6">Кейсы не найдены</p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all"
              >
                Сбросить фильтры
              </button>
            </section>
          )}

          {/* HOW TO READ CASES */}
          <section className="container mx-auto max-w-7xl px-4 pt-4 pb-16 md:pb-24">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05]">
                Что важно в{" "}
                <span className="font-iriska font-normal italic text-accent">каждом кейсе</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              {/* Top row: large + medium */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="md:col-span-7 rounded-[28px] bg-surface-mint p-8 md:p-12 shadow-plate ring-1 ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
                  <span className="text-sm font-mono text-muted-foreground mb-4">01</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-3">Сначала процесс</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Каждый проект начинается с разбора текущей работы: кто участвует, где возникают повторения, какие данные используются и где теряется время.
                  </p>
                </div>
                <div className="md:col-span-5 rounded-[28px] bg-surface-lavender p-7 md:p-9 shadow-plate ring-1 ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
                  <span className="text-sm font-mono text-muted-foreground mb-4">02</span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">Потом решение</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Инструмент подбирается под задачу компании: готовое решение, low-code, база знаний, помощник, интеграция или разработка.
                  </p>
                </div>
              </div>
              {/* Bottom wide plate with 2 compact items */}
              <div className="rounded-[28px] bg-surface-blush p-7 md:p-10 shadow-plate ring-1 ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="flex flex-col md:border-r md:border-foreground/10 md:pr-12">
                    <span className="text-sm font-mono text-muted-foreground mb-3">03</span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-2">Затем внедрение</h3>
                    <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                      Решение встраивается в ежедневную работу команды: инструкции, роли, статусы, обучение и сопровождение.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-mono text-muted-foreground mb-3">04</span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-2">В финале результат</h3>
                    <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                      Главный показатель — сохранённый бюджет, сниженная ручная нагрузка, понятный контроль и рабочий инструмент, который применяют сотрудники.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA — тёмная плашка */}
          <section className="px-4 md:px-6 pb-16 md:pb-24">
            <div className="container mx-auto max-w-7xl">
              <div className="rounded-[32px] md:rounded-[40px] bg-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5">
                <div className="grid md:grid-cols-12 gap-6 items-center px-6 md:px-12 lg:px-16 py-14 md:py-20">
                  <div className="md:col-span-8">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-5">
                      Хотите такой же{" "}
                      <span className="font-iriska font-normal italic text-accent">результат?</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/75 max-w-2xl">
                      Начнём со стратегической встречи или подбора формата работы под вашу задачу.
                    </p>
                  </div>
                  <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
                    <PillButton to="/start" variant="turquoise">Подобрать формат</PillButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Contact />
        <Partners />
        <Footer />
      </div>
    </PageTransition>
  );
};

// Большая плашка featured-кейса
const FeaturedCaseCard = ({ caseItem, palette }: { caseItem: CaseItem; palette: string }) => {
  return (
    <Link
      to={caseItem.link}
      className={cn(
        "group relative rounded-[28px] overflow-hidden shadow-card ring-1 ring-foreground/5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
        palette
      )}
    >
      {caseItem.image && (
        <div className="w-full h-44 overflow-hidden">
          <img
            src={caseItem.image}
            alt={caseItem.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
          {caseItem.title}
        </h3>
        <p className="text-sm md:text-base text-foreground/70 leading-snug mb-6 flex-1">
          {caseItem.description}
        </p>
        <div className="flex gap-6 mb-6 pt-5 border-t border-foreground/10">
          {caseItem.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex-1">
              <p className="text-xs uppercase tracking-widest text-foreground/55 font-semibold mb-1">
                {m.label}
              </p>
              <p className="text-lg md:text-xl font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 text-foreground font-semibold text-base">
          Смотреть кейс
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

// Компактная карточка placeholder-кейса
const PlaceholderCaseCard = ({ caseItem }: { caseItem: CaseItem }) => {
  return (
    <div className="relative rounded-[24px] bg-card ring-1 ring-foreground/10 p-6 flex flex-col h-full transition-all duration-300 hover:ring-foreground/25 hover:shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">
          скоро с деталями
        </span>
      </div>
      <h3 className="text-base md:text-lg font-bold text-foreground leading-tight mb-3">
        {caseItem.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-snug mb-5 flex-1">
        {caseItem.description}
      </p>
      <div className="flex gap-5 pt-4 border-t border-foreground/10">
        {caseItem.metrics.slice(0, 2).map((m, idx) => (
          <div key={idx} className="flex-1">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
              {m.label}
            </p>
            <p className="text-base font-bold text-foreground">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasesPage;
