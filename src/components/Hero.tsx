import { useState, useEffect, useCallback, useRef } from "react";
import { Check, ArrowRight, AlertCircle, Lightbulb, Quote, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SolutionData {
  id: string;
  menuTitle: string;
  h2Title: string;
  description: string;
  problems: string[];
  howItWorks: string[];
  example: string;
  result: string;
  ctaText: string;
  caseLink?: string;
}

const solutions: SolutionData[] = [
  {
    id: "sales",
    menuTitle: "Продажи и заявки",
    h2Title: "Автоматизация обработки заявок и продаж",
    description: "Система, которая принимает заявки 24/7, квалифицирует лиды и передаёт менеджерам только готовых к покупке клиентов.",
    problems: [
      "Заявки теряются в почте, мессенджерах и CRM — никто не знает, сколько упущено",
      "Клиент ждёт ответа часами, а конкурент отвечает за минуты",
      "Менеджеры тратят 60% времени на рутинные вопросы вместо продаж"
    ],
    howItWorks: [
      "ИИ-ассистент принимает заявки из всех каналов и мгновенно отвечает клиенту",
      "Автоматическая квалификация: горячие лиды сразу попадают к менеджеру",
      "Все коммуникации логируются — руководитель видит полную картину"
    ],
    example: "Клиент оставляет заявку в 23:00 — получает ответ через 30 секунд, записывается на консультацию, менеджер видит карточку утром.",
    result: "Конверсия заявок в сделки растёт на 25–40% за счёт скорости и качества обработки.",
    ctaText: "Рассчитать стоимость автоматизации продаж"
  },
  {
    id: "leads",
    menuTitle: "Контроль лидогенерации",
    h2Title: "Контроль качества лидов и работы менеджеров",
    description: "Прозрачная система, где видно каждый лид: откуда пришёл, кто обработал, почему не закрыли.",
    problems: [
      "Маркетинг говорит «лиды есть», продажи говорят «лиды плохие» — правды не узнать",
      "Менеджеры сливают лиды, а вы узнаёте об этом через месяц по отчётам",
      "Нет понимания реальной стоимости привлечения клиента по каналам"
    ],
    howItWorks: [
      "Автоматическая разметка лидов по источнику, качеству и этапу воронки",
      "ИИ анализирует переписки и звонки — фиксирует причины отказов",
      "Дашборд показывает конверсию по менеджерам, каналам и продуктам"
    ],
    example: "Руководитель видит: из 100 лидов с Яндекса 40 не обработаны в срок, причина — один менеджер систематически не перезванивает.",
    result: "Потери лидов снижаются на 30–50%, маркетинговый бюджет перераспределяется на рабочие каналы.",
    ctaText: "Навести порядок в лидогенерации"
  },
  {
    id: "docs",
    menuTitle: "Документы и первичка",
    h2Title: "Автоматизация документооборота и первичной документации",
    description: "ИИ распознаёт, проверяет и заносит документы в учётную систему без ручного ввода.",
    problems: [
      "Бухгалтер вручную вбивает данные из 50 накладных в день — ошибки неизбежны",
      "Документы теряются, дубли создаются, сверка занимает дни",
      "Контрагент прислал скан — и начинается квест по расшифровке"
    ],
    howItWorks: [
      "ИИ распознаёт сканы и фото документов с точностью 98%+",
      "Автоматическая проверка на дубли, ошибки в реквизитах, соответствие договору",
      "Данные попадают в 1С/МойСклад/Excel без участия человека"
    ],
    example: "Водитель фотографирует накладную на телефон — через 2 минуты документ в системе, сверка пройдена.",
    result: "Время на обработку документов сокращается в 5–10 раз, ошибки ручного ввода исчезают.",
    ctaText: "Автоматизировать документооборот",
    caseLink: "/cases/doc-search"
  },
  {
    id: "knowledge",
    menuTitle: "База знаний",
    h2Title: "ИИ-база знаний для сотрудников компании",
    description: "Умный поиск по регламентам, инструкциям и документам — сотрудник получает ответ за секунды.",
    problems: [
      "Новички задают одни и те же вопросы — руководители тратят часы на объяснения",
      "Регламенты лежат в разных папках, актуальную версию найти невозможно",
      "Знания уходят вместе с сотрудниками — каждый раз учим заново"
    ],
    howItWorks: [
      "Загружаете документы — ИИ индексирует и понимает контекст",
      "Сотрудник задаёт вопрос на человеческом языке — получает точный ответ с ссылкой на источник",
      "Система учится на вопросах и подсказывает, какие регламенты нужно дополнить"
    ],
    example: "Менеджер спрашивает: «Какая скидка для оптовиков от 500 тыс.?» — получает ответ и ссылку на прайс-лист.",
    result: "Время на поиск информации сокращается с 15 минут до 30 секунд, нагрузка на руководителей падает.",
    ctaText: "Создать базу знаний"
  },
  {
    id: "analytics",
    menuTitle: "Аналитика и маржа",
    h2Title: "ИИ-аналитика маржинальности и эффективности бизнеса",
    description: "Автоматический расчёт реальной прибыли по продуктам, клиентам и направлениям — без Excel и ожидания отчётов.",
    problems: [
      "Реальную маржу по сделке знаете только через месяц, когда уже поздно",
      "Финансист готовит отчёт неделю — к моменту готовности данные устарели",
      "Непонятно, какие клиенты прибыльные, а какие съедают ресурсы"
    ],
    howItWorks: [
      "ИИ собирает данные из CRM, бухгалтерии и склада в единую модель",
      "Автоматический расчёт маржи с учётом всех косвенных затрат",
      "Алерты при падении показателей и аномалиях"
    ],
    example: "В понедельник утром руководитель видит: маржа по направлению Х упала на 12% из-за роста логистических затрат.",
    result: "Решения принимаются на основе данных, а не интуиции — прибыль растёт на 10–20%.",
    ctaText: "Посмотреть аналитику бизнеса"
  },
  {
    id: "forecast",
    menuTitle: "Прогнозирование спроса",
    h2Title: "Прогнозирование спроса и оптимизация закупок",
    description: "ИИ анализирует историю продаж и внешние факторы — вы знаете, что и сколько закупать.",
    problems: [
      "Деньги заморожены в складе, а ходовых позиций не хватает",
      "Закупщик заказывает «по ощущениям» — то пересорт, то дефицит",
      "Сезонность и тренды учитываются задним числом"
    ],
    howItWorks: [
      "ИИ строит прогноз на основе исторических данных, сезонности и трендов",
      "Автоматические рекомендации по закупкам с учётом сроков поставки",
      "Система учитывает акции, праздники и внешние события"
    ],
    example: "За 3 недели до Нового года система рекомендует увеличить закупку позиции Y на 40% — прогноз сбывается.",
    result: "Оборачиваемость склада растёт на 20–30%, упущенные продажи из-за дефицита сокращаются.",
    ctaText: "Запросить прогноз спроса"
  },
  {
    id: "tender",
    menuTitle: "Подготовка тендеров",
    h2Title: "Автоматизация подготовки тендерной документации",
    description: "ИИ анализирует закупки, оценивает шансы на победу и готовит документы — вы участвуете только в перспективных.",
    problems: [
      "На подготовку одной заявки уходит 2–3 дня, а побеждаем в 10% случаев",
      "Перспективные закупки пропускаем, потому что не успеваем отследить",
      "Ошибки в документах приводят к отклонению заявок"
    ],
    howItWorks: [
      "ИИ мониторит площадки и отбирает закупки по вашим критериям",
      "Автоматическая оценка конкуренции и вероятности победы",
      "Генерация документов по шаблонам с проверкой на соответствие требованиям"
    ],
    example: "Система находит закупку на 5 млн, оценивает шансы в 70%, готовит заявку за 2 часа вместо 2 дней.",
    result: "Количество поданных заявок растёт в 3 раза, процент побед увеличивается за счёт отбора.",
    ctaText: "Автоматизировать подготовку тендеров"
  },
  {
    id: "voice",
    menuTitle: "Голосовой помощник",
    h2Title: "Личный голосовой ИИ-помощник руководителя",
    description: "Диктуете голосом — получаете готовые письма, протоколы и поручения. Руки свободны, голова разгружена.",
    problems: [
      "После совещания нужно час переносить договорённости в задачи",
      "В дороге накапливается 20 сообщений, на которые нет времени ответить",
      "Идеи теряются, потому что записывать некогда"
    ],
    howItWorks: [
      "Диктуете мысль голосом — ИИ превращает в структурированный текст",
      "Автоматическое создание задач, писем и напоминаний из голосовых заметок",
      "Интеграция с календарём, почтой и таск-трекером"
    ],
    example: "В машине диктуете: «Напомни Иванову про договор и назначь встречу на следующую среду» — задачи созданы.",
    result: "Экономия 1–2 часа в день на рутинных коммуникациях, важное не теряется.",
    ctaText: "Подключить голосового помощника"
  },
  {
    id: "dashboard",
    menuTitle: "Дашборд директора",
    h2Title: "Управленческий дашборд для руководителя бизнеса",
    description: "Все ключевые показатели на одном экране: деньги, продажи, задолженности, эффективность — без звонков и Excel.",
    problems: [
      "Чтобы узнать остаток на счёте, нужно звонить бухгалтеру",
      "Отчёты приходят раз в неделю — реагировать уже поздно",
      "Данные в разных системах — собрать картину невозможно"
    ],
    howItWorks: [
      "Подключаем источники данных: банк, CRM, 1С, склад",
      "ИИ агрегирует и визуализирует ключевые метрики",
      "Настраиваемые алерты при отклонениях от нормы"
    ],
    example: "Открываете телефон в 8 утра — видите: выручка за вчера, остаток на счёте, просроченная дебиторка, план на сегодня.",
    result: "Полный контроль бизнеса в реальном времени, решения принимаются на основе актуальных данных.",
    ctaText: "Посмотреть пример дашборда"
  }
];

const Hero = () => {
  const [activeSolution, setActiveSolution] = useState<string>(solutions[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const currentSolution = solutions.find(s => s.id === activeSolution) || solutions[0];
  const currentIndex = solutions.findIndex(s => s.id === activeSolution);

  const minSwipeDistance = 50;

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      const nextIndex = (currentIndex + 1) % solutions.length;
      handleManualSelect(solutions[nextIndex].id);
    }
    
    if (isRightSwipe) {
      const prevIndex = (currentIndex - 1 + solutions.length) % solutions.length;
      handleManualSelect(solutions[prevIndex].id);
    }
  };

  // Auto-scroll buttons to center active one
  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeButton = buttonRefs.current[activeSolution];
    
    if (container && activeButton) {
      const scrollLeft = activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeSolution]);

  // Collapse card when solution changes
  useEffect(() => {
    setIsCardExpanded(false);
  }, [activeSolution]);

  // Auto-switching every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveSolution(prev => {
        const currentIdx = solutions.findIndex(s => s.id === prev);
        const nextIdx = (currentIdx + 1) % solutions.length;
        return solutions[nextIdx].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleManualSelect = useCallback((id: string) => {
    setActiveSolution(id);
    setIsPaused(true); // Полная остановка навсегда
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="relative pt-20 lg:pt-24 pb-8 lg:pb-10 overflow-hidden">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-100" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-4 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-[1.15] mb-2 lg:mb-3 tracking-tight">
            Решения для бизнеса и руководителей
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed max-w-2xl">
            Автоматизация продаж, документов, контроля и аналитики<br className="hidden sm:block" />
            без переделки системы и остановки операционки.
          </p>
        </div>

        {/* Mobile Horizontal Scroll Navigation */}
        <div className="lg:hidden mb-4">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
            <span>👆</span>
            <span>Выберите решение:</span>
          </p>
          <div 
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {solutions.map((solution, index) => (
              <button
                key={solution.id}
                ref={(el) => buttonRefs.current[solution.id] = el}
                onClick={() => handleManualSelect(solution.id)}
                className={cn(
                  "flex-shrink-0 min-w-[110px] py-2 px-3 rounded-xl transition-all duration-300",
                  "flex items-center gap-2 text-xs font-medium whitespace-nowrap",
                  activeSolution === solution.id
                    ? "bg-primary text-primary-foreground shadow-md border border-primary scale-105"
                    : "bg-card/50 border border-border/30 text-muted-foreground opacity-60"
                )}
              >
                <span className={cn(
                  "font-bold tabular-nums",
                  activeSolution === solution.id ? "text-primary-foreground" : "text-primary/60"
                )}>
                  {formatNumber(index + 1)}
                </span>
                <span className="truncate">{solution.menuTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Show ONLY active solution with collapse/expand + swipe */}
        <div 
          className="lg:hidden relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            key={currentSolution.id}
            className="bg-card rounded-xl border border-t-[3px] border-border/20 border-t-primary p-4 animate-fade-in relative overflow-hidden"
          >
            {/* Content wrapper with max-height transition */}
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              isCardExpanded ? "max-h-[1000px]" : "max-h-[140px]"
            )}>
              {/* Compact header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-primary/60 tabular-nums">
                  {formatNumber(currentIndex + 1)}
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {currentSolution.h2Title}
                </h3>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {currentSolution.description}
              </p>
              
              {/* Problems */}
              <div className="mb-3">
                <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">
                  Что идёт не так
                </h4>
                <ul className="space-y-1">
                  {currentSolution.problems.map((problem, i) => (
                    <li key={i} className="text-xs text-foreground flex gap-2 leading-relaxed">
                      <span className="text-primary shrink-0">•</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Example */}
              <div className="mb-3 pt-2 border-t border-border/20">
                <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  Пример
                </h4>
                <p className="text-xs italic text-foreground/80 leading-relaxed">
                  "{currentSolution.example}"
                </p>
              </div>
              
              {/* How it works */}
              <div className="mb-3">
                <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">
                  Как работает
                </h4>
                <ul className="space-y-1">
                  {currentSolution.howItWorks.map((step, i) => (
                    <li key={i} className="text-xs text-foreground flex gap-2 leading-relaxed">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Result */}
              <div className="pt-2 border-t border-border/20 mb-3">
                <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                  Результат
                </h4>
                <p className="text-xs font-medium text-foreground leading-relaxed">
                  {currentSolution.result}
                </p>
              </div>
              
              {/* CTA */}
              <Button size="sm" className="w-full text-xs" onClick={handleCTAClick}>
                {currentSolution.ctaText}
              </Button>
            </div>
            
            {/* Gradient fade overlay when collapsed */}
            {!isCardExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none" />
            )}
          </div>
          
          {/* Expand/Collapse button */}
          <button 
            onClick={() => {
              setIsCardExpanded(!isCardExpanded);
              setIsPaused(true); // Полная остановка при любом клике
            }}
            className="w-full mt-2 py-2.5 text-xs text-primary font-medium flex items-center justify-center gap-1.5 bg-card/50 rounded-lg border border-border/30 hover:bg-card transition-colors"
          >
            <span>{isCardExpanded ? "Свернуть" : "Показать подробнее"}</span>
            {isCardExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Desktop Two Column Layout */}
        <div className="hidden lg:flex flex-row gap-5">
          
          {/* Left Sidebar - Navigation Card with Vertical Tabs */}
          <nav className="w-[280px] xl:w-[320px] flex-shrink-0">
            <div className="bg-gradient-to-b from-white to-gray-50/80 rounded-2xl shadow-card border border-border/30 p-3">
              <div className="flex flex-col gap-1">
                {solutions.map((solution, index) => (
                  <button
                    key={solution.id}
                    onClick={() => handleManualSelect(solution.id)}
                    className={cn(
                      "w-full text-left py-2.5 transition-all duration-200 group flex items-center gap-3 cursor-pointer",
                      activeSolution === solution.id
                        ? "bg-primary text-primary-foreground shadow-md border border-primary rounded-xl px-3"
                        : "bg-transparent border-l-2 border-primary/30 hover:border-primary/60 rounded-none pl-4 pr-3"
                    )}
                  >
                    <span className={cn(
                      "text-xs font-bold tabular-nums shrink-0 transition-colors",
                      activeSolution === solution.id
                        ? "text-primary-foreground bg-white/20 px-2 py-1 rounded-md"
                        : "text-primary/60"
                    )}>
                      {formatNumber(index + 1)}
                    </span>
                    <span className={cn(
                      "text-[13px] transition-colors leading-tight",
                      activeSolution === solution.id
                        ? "text-primary-foreground font-medium"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {solution.menuTitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Content Panel - Description Card */}
          <div className="flex-1 min-w-0">
            <div className="bg-gradient-to-br from-white via-white to-primary/[0.03] rounded-2xl shadow-elevated border border-border/30 p-6 h-full">
              <div 
                key={currentSolution.id}
                className="animate-enter flex flex-col h-full"
              >
                {/* Block 1: Solution Title & Description */}
                <div className="pb-5">
                  <h2 className="text-xl lg:text-2xl xl:text-[1.65rem] font-semibold text-foreground mb-3 leading-[1.2] tracking-tight">
                    {currentSolution.h2Title}
                  </h2>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-[70ch]">
                    {currentSolution.description}
                  </p>
                </div>

                {/* 2-Column Grid with Dividers */}
                <div className="bg-card shadow-soft border border-border rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-0">
                  {/* Left Column */}
                  <div className="space-y-4 pr-6 border-r border-border/15">
                    {/* Block 2: Problems */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                          Что идёт не так
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {currentSolution.problems.map((problem, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            </span>
                            <span className="text-foreground leading-relaxed text-sm">{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Block 4: Example */}
                    <div className="pt-4 border-t border-border/15">
                      <div className="flex items-center gap-2 mb-2">
                        <Quote className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                          Пример
                        </h3>
                      </div>
                      <p className="text-[13px] text-foreground/80 italic leading-relaxed">
                        "{currentSolution.example}"
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 pl-6">
                    {/* Block 3: How It Works */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                          Как работает
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {currentSolution.howItWorks.map((step, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-primary" strokeWidth={2.5} />
                            </span>
                            <span className="text-foreground leading-relaxed text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Block 5: Result */}
                    <div className="pt-4 border-t border-border/15">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                          Результат
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {currentSolution.result}
                      </p>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Block 6: CTA Zone */}
                <div className="pt-5 mt-4 border-t border-border/15 flex items-center gap-5">
                  <Button 
                    onClick={handleCTAClick}
                    size="lg"
                    className="text-base px-8 py-3 rounded-xl shadow-elevated hover:shadow-[0_8px_30px_rgba(73,190,216,0.35)] transition-all duration-300 font-semibold"
                  >
                    {currentSolution.ctaText}
                  </Button>
                  
                  {currentSolution.caseLink ? (
                    <a 
                      href={currentSolution.caseLink}
                      className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium group"
                    >
                      Посмотреть кейс
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <button 
                      onClick={handleCTAClick}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm group"
                    >
                      Задать вопрос
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
