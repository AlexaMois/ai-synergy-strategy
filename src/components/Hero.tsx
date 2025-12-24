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
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-foreground leading-[1.15] mb-5 tracking-tight">
            Решения для бизнеса и руководителей
          </h1>
          <p className="text-lg sm:text-xl lg:text-[1.35rem] text-muted-foreground leading-relaxed max-w-3xl">
            Автоматизация продаж, документов, контроля и аналитики<br className="hidden sm:block" />
            без переделки системы и остановки операционки.
          </p>
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-card border border-border/60 rounded-xl shadow-sm text-left transition-all duration-200 hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-primary/70">{formatNumber(currentIndex + 1)}</span>
              <span className="font-medium text-foreground">{currentSolution.menuTitle}</span>
            </div>
            <ChevronDown className={cn(
              "w-5 h-5 text-muted-foreground transition-transform duration-300",
              mobileMenuOpen && "rotate-180"
            )} />
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-2 bg-card border border-border/60 rounded-xl shadow-lg overflow-hidden animate-fade-in">
              {solutions.map((solution, index) => (
                <button
                  key={solution.id}
                  onClick={() => handleSolutionSelect(solution.id)}
                  className={cn(
                    "w-full px-5 py-4 text-left transition-all duration-200 flex items-center gap-3 border-b border-border/30 last:border-b-0",
                    activeSolution === solution.id
                      ? "bg-primary/5"
                      : "hover:bg-muted/30"
                  )}
                >
                  <span className={cn(
                    "text-xs font-medium tabular-nums",
                    activeSolution === solution.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    {formatNumber(index + 1)}
                  </span>
                  <span className={cn(
                    "font-medium",
                    activeSolution === solution.id ? "text-primary" : "text-foreground"
                  )}>
                    {solution.menuTitle}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16">
          
          {/* Left Sidebar - Premium Navigation Panel */}
          <nav className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28">
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-2 shadow-sm">
                {solutions.map((solution, index) => (
                  <button
                    key={solution.id}
                    onClick={() => setActiveSolution(solution.id)}
                    className={cn(
                      "w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 group flex items-center justify-between",
                      activeSolution === solution.id
                        ? "bg-primary/10 border-l-[3px] border-l-primary ml-0"
                        : "hover:bg-muted/40 border-l-[3px] border-l-transparent ml-0"
                    )}
                  >
                    <span className={cn(
                      "text-[0.9rem] font-medium transition-colors leading-tight",
                      activeSolution === solution.id
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {solution.menuTitle}
                    </span>
                    <span className={cn(
                      "text-xs font-medium tabular-nums transition-colors",
                      activeSolution === solution.id
                        ? "text-primary"
                        : "text-muted-foreground/50 group-hover:text-muted-foreground"
                    )}>
                      {formatNumber(index + 1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Content Panel - Premium Card */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-sm">
              <div 
                key={currentSolution.id}
                className="animate-fade-in"
              >
                {/* H2 Title - Anchor */}
                <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-bold text-foreground mb-5 leading-[1.2] tracking-tight">
                  {currentSolution.h2Title}
                </h2>

                {/* Description - Value Statement */}
                <p className="text-lg sm:text-xl lg:text-[1.25rem] text-foreground/80 mb-10 lg:mb-12 leading-relaxed max-w-3xl">
                  {currentSolution.description}
                </p>

                {/* Content Grid */}
                <div className="space-y-8 lg:space-y-10">
                  
                  {/* Problems Section */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-5">
                      Что идёт не так
                    </h3>
                    <ul className="space-y-4">
                      {currentSolution.problems.map((problem, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="w-5 h-5 rounded-full bg-muted/80 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          </span>
                          <span className="text-foreground/85 leading-relaxed text-[0.95rem] lg:text-base">{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Thin Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-border/60 via-border/30 to-transparent" />

                  {/* How It Works Section */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-5">
                      Как работает решение
                    </h3>
                    <ul className="space-y-4">
                      {currentSolution.howItWorks.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                          </span>
                          <span className="text-foreground/85 leading-relaxed text-[0.95rem] lg:text-base">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Thin Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-border/60 via-border/30 to-transparent" />

                  {/* Example Block - Callout */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                      Пример
                    </h3>
                    <div className="bg-muted/30 border border-border/30 rounded-xl p-5 lg:p-6">
                      <p className="text-foreground/90 leading-relaxed text-[0.95rem] lg:text-base italic">
                        "{currentSolution.example}"
                      </p>
                    </div>
                  </div>

                  {/* Result Block - Strong Visual */}
                  <div className="pt-2">
                    <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                      Результат
                    </h3>
                    <p className="text-lg lg:text-xl font-medium text-foreground leading-relaxed">
                      {currentSolution.result}
                    </p>
                  </div>

                  {/* CTA Section - Premium Buttons */}
                  <div className="pt-4 lg:pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <Button 
                      onClick={handleCTAClick}
                      size="lg"
                      className="text-base px-8 py-6 h-auto rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium"
                    >
                      {currentSolution.ctaText}
                    </Button>
                    
                    {currentSolution.caseLink ? (
                      <a 
                        href={currentSolution.caseLink}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium group"
                      >
                        Посмотреть кейс
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <button 
                        onClick={handleCTAClick}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium group"
                      >
                        Задать вопрос
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
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
