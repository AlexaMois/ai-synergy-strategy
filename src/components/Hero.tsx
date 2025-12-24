import { useState } from "react";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentSolution = solutions.find(s => s.id === activeSolution) || solutions[0];
  const currentIndex = solutions.findIndex(s => s.id === activeSolution);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSolutionSelect = (id: string) => {
    setActiveSolution(id);
    setMobileMenuOpen(false);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-20 overflow-hidden min-h-[65vh] lg:min-h-[70vh] bg-[#FFFFFF]">
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header - With more top spacing */}
        <div className="mb-4 lg:mb-6 pb-3 lg:pb-4 border-b border-border/10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-[1.15] mb-3 tracking-tight">
            Решения для бизнеса и руководителей
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed max-w-2xl">
            Автоматизация продаж, документов, контроля и аналитики<br className="hidden sm:block" />
            без переделки системы и остановки операционки.
          </p>
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-muted/10 border border-border/20 rounded-lg text-left transition-all duration-200 hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-primary tabular-nums">{formatNumber(currentIndex + 1)}</span>
              <span className="font-semibold text-foreground text-sm">{currentSolution.menuTitle}</span>
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              mobileMenuOpen && "rotate-180"
            )} />
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-2 bg-muted/5 border border-border/20 rounded-lg overflow-hidden animate-fade-in">
              {solutions.map((solution, index) => (
                <button
                  key={solution.id}
                  onClick={() => handleSolutionSelect(solution.id)}
                  className={cn(
                    "w-full px-5 py-3.5 text-left transition-all duration-200 flex items-center justify-between border-b border-border/10 last:border-b-0",
                    activeSolution === solution.id
                      ? "bg-primary/8 border-l-[3px] border-l-primary"
                      : "hover:bg-muted/15 border-l-[3px] border-l-transparent"
                  )}
                >
                  <span className={cn(
                    "text-sm",
                    activeSolution === solution.id ? "text-foreground font-semibold" : "text-foreground/80"
                  )}>
                    {solution.menuTitle}
                  </span>
                  <span className={cn(
                    "text-[11px] font-medium tabular-nums",
                    activeSolution === solution.id ? "text-primary" : "text-muted-foreground/30"
                  )}>
                    {formatNumber(index + 1)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two Column Layout - Fixed left, fluid right */}
        <div className="flex flex-col lg:flex-row gap-0">
          
          {/* Left Sidebar - Premium Navigation Pills */}
          <nav className="hidden lg:block w-[280px] xl:w-[320px] flex-shrink-0">
            <div className="w-full py-0 flex flex-col gap-2">
              {solutions.map((solution, index) => (
                <button
                  key={solution.id}
                  onClick={() => setActiveSolution(solution.id)}
                  className={cn(
                    "w-full text-left px-5 py-3.5 transition-all duration-200 group flex items-center justify-between cursor-pointer rounded-lg",
                    activeSolution === solution.id
                      ? "bg-primary/8 border-l-[3px] border-l-primary"
                      : "hover:bg-muted/15 border-l-[3px] border-l-transparent hover:border-l-primary/20"
                  )}
                >
                  <span className={cn(
                    "text-[13px] transition-colors leading-tight truncate pr-3",
                    activeSolution === solution.id
                      ? "text-foreground font-semibold"
                      : "text-foreground/80 group-hover:text-foreground"
                  )}>
                    {solution.menuTitle}
                  </span>
                  <span className={cn(
                    "text-[11px] font-medium tabular-nums transition-colors shrink-0",
                    activeSolution === solution.id
                      ? "text-primary"
                      : "text-muted-foreground/30 group-hover:text-muted-foreground/50"
                  )}>
                    {formatNumber(index + 1)}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right Content Panel - Takes All Remaining Space */}
          <div className="flex-1 min-w-0">
            <div className="bg-background/60 border border-border/15 rounded-2xl lg:rounded-l-none lg:border-l-0 pt-0 px-6 sm:px-8 lg:px-10 pb-6 h-full flex flex-col">
              <div 
                key={currentSolution.id}
                className="animate-fade-in flex flex-col h-full"
              >
                {/* Block 1: Solution Title & Description */}
                <div className="pb-3 lg:pb-4">
                  <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-[1.65rem] font-semibold text-foreground mb-2 leading-[1.2] tracking-tight">
                    {currentSolution.h2Title}
                  </h2>
                  <p className="text-sm lg:text-base text-foreground leading-relaxed max-w-[70ch]">
                    {currentSolution.description}
                  </p>
                </div>

                {/* Block 2 & 3: Problems + How It Works - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 py-3 lg:py-4 border-t border-border/10">
                  {/* Block 2: Problems */}
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-3">
                      Что идёт не так
                    </h3>
                    <ul className="space-y-2.5">
                      {currentSolution.problems.map((problem, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                          </span>
                          <span className="text-foreground leading-relaxed text-[13px] lg:text-sm">{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Block 3: How It Works */}
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-3">
                      Как работает
                    </h3>
                    <ul className="space-y-2.5">
                      {currentSolution.howItWorks.map((step, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-primary" strokeWidth={2.5} />
                          </span>
                          <span className="text-foreground leading-relaxed text-[13px] lg:text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Block 4: Example + Result */}
                <div className="py-3 lg:py-4 border-t border-border/10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-2">
                      Пример
                    </h3>
                    <p className="text-[13px] text-foreground/80 italic leading-relaxed">
                      "{currentSolution.example}"
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-2">
                      Результат
                    </h3>
                    <p className="text-[13px] lg:text-sm font-medium text-foreground leading-relaxed">
                      {currentSolution.result}
                    </p>
                  </div>
                </div>

                {/* Block 5: CTA Zone */}
                <div className="pt-3 lg:pt-4 border-t border-border/10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                  <Button 
                    onClick={handleCTAClick}
                    size="default"
                    className="text-sm px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 font-medium"
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
                      className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium group"
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
