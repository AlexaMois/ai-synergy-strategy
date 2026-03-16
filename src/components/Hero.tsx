import { useState, useEffect, useCallback, useRef } from "react";
import { Check, ArrowRight, AlertCircle, Lightbulb, Quote, TrendingUp, ChevronDown, ChevronUp, ChevronsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/utils/analytics";
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
const solutions: SolutionData[] = [{
  id: "sales",
  menuTitle: "Продажи и заявки",
  h2Title: "Автоматизация обработки заявок и продаж",
  description: "Система, которая ловит заявки 24/7 из всех каналов — Telegram, WhatsApp, сайт, email. ИИ сразу отвечает, менеджер видит в CRM. Ни одна заявка не теряется.",
  problems: ["Заявки теряются в мессенджерах и почте — никто не знает, сколько упущено", "Менеджеры отвечают с задержкой — клиент забывает о вас", "Каждый канал требует отдельного отслеживания"],
  howItWorks: ["ИИ-ассистент отвечает за 10 секунд, мгновенная квалификация лидов", "Все заявки автоматом попадают в CRM с контактами и историей", "Менеджер видит очередь горячих лидов и звонит только готовым к покупке"],
  example: "Клиент пишет в Telegram в 23:00 — получает ответ за секунду, менеджер видит утром и звонит первым делом. Сделка закрыта в день.",
  result: "Конверсия заявок +30-40%, доход +50–100 тыс. ₽ в месяц, потери сведены к минимуму.",
  ctaText: "Заказать звонок"
}, {
  id: "leads",
  menuTitle: "Контроль лидогенерации",
  h2Title: "Контроль качества лидов и работы менеджеров",
  description: "Дашборд, где видна конверсия каждого менеджера в реальном времени. Вы сразу видите, кто теряет лидов, кто работает неправильно. Вмешиваетесь до того, как потеряна сделка.",
  problems: ["Вы не видите, на каком этапе зависла заявка — узнаете вечером или на встрече", "Менеджеры работают по-разному — нет единого процесса", "Конверсия падает, но вы реагируете неделю спустя"],
  howItWorks: ["Каждая заявка отслеживается: кому звонили, что сказано, когда следующий звонок", "Дашборд показывает конверсию в % — видно, кто отстает", "Алерты: заявка не обработана > 2 часов, и менеджер слышит уведомление"],
  example: "Открыли дашборд в 10 утра, видите, что один менеджер не звонит горячим лидам. За 5 минут разобрали проблему, он перезвонил, сделка спасена.",
  result: "Потери лидов -30-50%, доход +100–200 тыс. ₽ в месяц, полный контроль воронки.",
  ctaText: "Заказать звонок"
}, {
  id: "docs",
  menuTitle: "Документы и первичка",
  h2Title: "Автоматизация документооборота и первичной документации",
  description: "Сканируете накладную на телефон или загружаете PDF — ИИ распознает, проверяет на ошибки, раскладывает по счетам, создает запись в системе. За 10 секунд вместо 30 минут ручной работы.",
  problems: ["Первичка теряется, перепутывается, бухгалтер часами ищет документы", "Ручной ввод данных — ошибки, которые потом сложно поймать", "Платеж задерживается на неделю, пока документ \"обработают\""],
  howItWorks: ["OCR распознает текст с фото и сканов с точностью 99%", "Система проверит дубли, опечатки в реквизитах, соответствие договору", "Автоматически создает счет, запись в 1С, отправляет клиенту"],
  example: "Водитель фотографирует накладную прямо на объекте, через 2 минуты документ в системе — все проверки пройдены. Клиент получает счет в день.",
  result: "Документооборот -40%, ошибки ручного ввода исчезают, ускорение платежей на неделю.",
  ctaText: "Заказать звонок",
  caseLink: "/cases/doc-search"
}, {
  id: "knowledge",
  menuTitle: "База знаний",
  h2Title: "ИИ-база знаний для сотрудников компании",
  description: "Вся информация о процессах, ответы на вопросы, шаблоны писем и чек-листы в одном месте. Новый сотрудник может работать со второго дня, потому что всё есть в поиске.",
  problems: ["Новый менеджер учится 3-4 недели и ещё совершает ошибки", "Знания в голове одного \"старого\" сотрудника — если он уходит, теряется весь опыт", "Когда нужно срочно найти шаблон письма, ищут полчаса в переписке"],
  howItWorks: ["Структурированная база: процессы, шаблоны писем, видео, чек-листы, FAQ", "Поиск по ключевым словам — находится за 30 секунд", "Каждый сотрудник видит только то, что нужно его роли"],
  example: "Новый менеджер приходит в понедельник, вторник уже самостоятельно звонит по скрипту, используя шаблоны из базы. За месяц выход на норму.",
  result: "Время обучения -50%, текучесть персонала ниже, повторные заказы +30%.",
  ctaText: "Заказать звонок"
}, {
  id: "analytics",
  menuTitle: "Аналитика и маржа",
  h2Title: "ИИ-аналитика маржинальности и эффективности бизнеса",
  description: "ИИ анализирует поведение клиентов и говорит: этот всегда покупает по вторникам, тот отказывает на цену выше, третий требует гарантию. Вместо отчета из 10 страниц — одна рекомендация.",
  problems: ["Клиенты кажутся все одинаковыми — нет персонализации в подходе", "Отчеты объемные, но они не дают действий — вы не видите \"что делать\"", "Одна стратегия для всех — многие клиенты не покупают, потому что подход неправильный"],
  howItWorks: ["ИИ выявляет паттерны: когда клиент покупает, на какую цену реагирует, что его держит", "Система говорит: \"Этому клиенту предложить скидку 15%\" или \"Ему нужна гарантия\"", "Результат: предложение подходит под клиента, а не наоборот"],
  example: "Видите, что клиент Х отказывает на вашу цену, но говорит \"да\" к вам, если добавить гарантию на 6 месяцев. Переговорили — сделка.",
  result: "Персонализированные предложения +20-30%, доход +100 тыс. ₽ в месяц, меньше отказов.",
  ctaText: "Заказать звонок"
}, {
  id: "forecast",
  menuTitle: "Прогнозирование спроса",
  h2Title: "Прогнозирование спроса и оптимизация закупок",
  description: "ИИ смотрит на ваши продажи за 2-3 года, находит закономерности и говорит: в декабре спрос вырастет в 2 раза, в июле упадет. Закупаете ровно столько, сколько нужно.",
  problems: ["Закупаете вслепую — берёте \"как в прошлый раз\" и попадаете в кассу", "То переизбыток товара, то дефицит и потеря сделок", "Деньги замораживаются в складе, оборот падает"],
  howItWorks: ["ИИ анализирует историю продаж: какие месяцы горячие, какие холодные", "Учитывает праздники, тренды, сезонность — делает прогноз на 2-3 месяца", "Вы закупаете на основе данных, а не интуиции"],
  example: "В ноябре обычно спрос +40%, поэтому закупаете на 40% больше. В июле -30%, закупаете меньше. Деньги не зависают, оборот растет.",
  result: "Оборачиваемость товара +20-30%, свободные оборотные средства +300 тыс. ₽, нет избытка и дефицита.",
  ctaText: "Заказать звонок"
}, {
  id: "tender",
  menuTitle: "Подготовка тендеров",
  h2Title: "Автоматизация подготовки тендерной документации",
  description: "Система отслеживает тендеры в Telegram-канале, парсит требования, генерирует коммерческое предложение. То, что готовилось 2 дня, теперь готово за 30 минут.",
  problems: ["Тендеры ловите вручную — может упустить важный", "КП готовится 2-3 дня — опаздываете на дедлайн", "За месяц участвуете в 5 тендерах вместо 25"],
  howItWorks: ["Бот отслеживает все источники: Telegram-каналы, email рассылки, сайты закупок", "Парсит требования автоматически — очищает от лишнего", "ИИ генерирует КП под ваш шаблон в нужный формат"],
  example: "Тендер выложили в 10 утра, ваша система спарсила в 10:05, КП генерируется в 10:35. Вы первый на финишной черте.",
  result: "Участие в тендерах 5x больше, доход +500 тыс. — 1 млн ₽ в месяц, выше шанс закрыть проект.",
  ctaText: "Заказать звонок"
}, {
  id: "voice",
  menuTitle: "Голосовой помощник",
  h2Title: "Личный голосовой ИИ-помощник руководителя",
  description: "Говорите в микрофон: \"Какая выручка вчера?\", \"Добавь заявку от такого-то\", \"Кто не звонил клиентам?\" ИИ отвечает и выполняет команду. Управляете компанией в машине.",
  problems: ["Управляете по отчетам, когда уже поздно — данные запоздалые на день", "Невозможно быстро добавить заявку, если находитесь в пути", "Все процессы требуют компьютера и планов на парочку часов"],
  howItWorks: ["ИИ понимает голосовые команды — спросить метрики или дать команду", "Система подключена к CRM, 1С, аналитике — получает данные в реальном времени", "Команды выполняются автоматически: добавить заявку, переместить в статус, отправить смс"],
  example: "В машине спросили: \"Какие проблемы у отдела продаж?\" ИИ рассказал про трех менеджеров, которые отстают. Приехали — первое дело решили проблемы.",
  result: "Рутина -30%, управляете в реальном времени из любого места, решения быстрее.",
  ctaText: "Заказать звонок"
}, {
  id: "dashboard",
  menuTitle: "Дашборд директора",
  h2Title: "Управленческий дашборд для руководителя бизнеса",
  description: "Все ключевые показатели на одном экране: выручка за вчера и тренд, маржа по проектам, топ-5 проблем на сегодня, остатки на счетах. Открыли утром — знаете, что менять.",
  problems: ["Отчеты приходят вечером или на день позже — управляете постфактум", "Данные в разных системах — полчаса на то, чтобы собрать картину", "Совещания тратят час на то, чтобы разобраться в цифрах"],
  howItWorks: ["Подключаются источники: банк, CRM, 1С, учет — все в одном месте", "ИИ агрегирует данные и выделяет проблемы (тревоги при отклонениях)", "Мобильная версия — смотрите в метро, дома, в командировке"],
  example: "Открыли дашборд в 9 утра, видите: выручка вчера = 250 тыс. (план 300 тыс.), маржа упала на 5%, два менеджера не звонят. За 10 минут решение принято.",
  result: "Управляемость бизнеса +20%, совещаний меньше на 30%, решения быстрее на день.",
  ctaText: "Заказать звонок"
}];
const Hero = () => {
  const [activeSolution, setActiveSolution] = useState<string>(solutions[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{
    [key: string]: HTMLButtonElement | null;
  }>({});
  const currentSolution = solutions.find((s) => s.id === activeSolution) || solutions[0];
  const currentIndex = solutions.findIndex((s) => s.id === activeSolution);
  const minSwipeDistance = 50;

  // Hide scroll hint on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      setActiveSolution((prev) => {
        const currentIdx = solutions.findIndex((s) => s.id === prev);
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
    trackCTAClick({
      location: 'hero',
      buttonText: currentSolution.ctaText
    });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  return <section className="relative pt-16 lg:pt-20 pb-6 lg:pb-8 overflow-hidden">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-100" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-3 lg:mb-5">
          {/* Badge + Title on one line */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 mb-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-foreground leading-[1.15] tracking-tight">
              Автоматизация бизнеса с ИИ <span className="font-bold">без лишнего «ИТ»</span>
            </h1>
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">
              <span>🇷🇺</span>
              <span className="font-medium">Работаем по всей России  </span>
            </div>
          </div>
          <blockquote className="relative max-w-2xl border-l-4 border-primary pl-4 sm:pl-5 py-2 sm:py-3 bg-primary/5 rounded-r-lg">
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed italic">
              Если у вас всё держится на нескольких людях, заявки и документы теряются, а директор занят тушением пожаров вместо развития — значит, система не работает, а люди закрывают её дыры.
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-foreground leading-relaxed mt-2 font-medium not-italic">
              Мы помогаем директорам производства и торговли за 4–6 недель убрать до 30% ручной рутины с помощью ИИ и автоматизации, не ломая текущие системы и не нанимая армию интеграторов.
            </p>
          </blockquote>
        </div>

        {/* Mobile Horizontal Scroll Navigation */}
        <div className="lg:hidden mb-4">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
            
            
          </p>
          <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide" style={{
          WebkitOverflowScrolling: 'touch'
        }}>
            {solutions.map((solution, index) => <button key={solution.id} ref={(el) => buttonRefs.current[solution.id] = el} onClick={() => handleManualSelect(solution.id)} className={cn("flex-shrink-0 min-w-[110px] py-2 px-3 rounded-xl transition-all duration-300", "flex items-center gap-2 text-xs font-medium whitespace-nowrap", activeSolution === solution.id ? "bg-primary text-primary-foreground shadow-md border border-primary scale-105" : "bg-card/50 border border-border/30 text-muted-foreground opacity-60")}>
                <span className={cn("font-bold tabular-nums", activeSolution === solution.id ? "text-primary-foreground" : "text-primary/60")}>
                  {formatNumber(index + 1)}
                </span>
                <span className="truncate">{solution.menuTitle}</span>
              </button>)}
          </div>
        </div>

        {/* Mobile: Show ONLY active solution with collapse/expand + swipe */}
        <div className="lg:hidden relative" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <div key={currentSolution.id} className="bg-card rounded-xl border border-t-[3px] border-border/20 border-t-primary p-4 animate-fade-in relative overflow-hidden">
            {/* Content wrapper with max-height transition */}
            <div className={cn("transition-all duration-300 overflow-hidden", isCardExpanded ? "max-h-[1000px]" : "max-h-[140px]")}>
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
                  {currentSolution.problems.map((problem, i) => <li key={i} className="text-xs text-foreground flex gap-2 leading-relaxed">
                      <span className="text-primary shrink-0">•</span>
                      <span>{problem}</span>
                    </li>)}
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
                  {currentSolution.howItWorks.map((step, i) => <li key={i} className="text-xs text-foreground flex gap-2 leading-relaxed">
                      <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>)}
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
            {!isCardExpanded && <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none" />}
          </div>
          
          {/* Expand/Collapse button */}
          <button onClick={() => {
          setIsCardExpanded(!isCardExpanded);
          setIsPaused(true); // Полная остановка при любом клике
        }} className="w-full mt-2 py-2.5 text-xs text-primary font-medium flex items-center justify-center gap-1.5 bg-card/50 rounded-lg border border-border/30 hover:bg-card transition-colors">
            <span>{isCardExpanded ? "Свернуть" : "Показать подробнее"}</span>
            {isCardExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop Two Column Layout */}
        <div className="hidden lg:flex flex-row gap-5">
          
          {/* Left Sidebar - Navigation Card with Vertical Tabs */}
          <nav className="w-[280px] xl:w-[320px] flex-shrink-0">
            <div className="bg-gradient-to-b from-white to-gray-50/80 rounded-2xl shadow-card border border-border/30 p-3">
              <div className="flex flex-col gap-1">
                {solutions.map((solution, index) => <button key={solution.id} onClick={() => handleManualSelect(solution.id)} className={cn("w-full text-left py-2.5 transition-all duration-200 group flex items-center gap-3 cursor-pointer", activeSolution === solution.id ? "bg-primary text-primary-foreground shadow-md border border-primary rounded-xl px-3" : "bg-transparent border-l-2 border-primary/30 hover:border-primary/60 rounded-none pl-4 pr-3")}>
                    <span className={cn("text-xs font-bold tabular-nums shrink-0 transition-colors", activeSolution === solution.id ? "text-primary-foreground bg-white/20 px-2 py-1 rounded-md" : "text-primary/60")}>
                      {formatNumber(index + 1)}
                    </span>
                    <span className={cn("text-[13px] transition-colors leading-tight", activeSolution === solution.id ? "text-primary-foreground font-medium" : "text-muted-foreground group-hover:text-foreground")}>
                      {solution.menuTitle}
                    </span>
                  </button>)}
              </div>
            </div>
          </nav>

          {/* Right Content Panel - Description Card */}
          <div className="flex-1 min-w-0">
            <div className="bg-gradient-to-br from-white via-white to-primary/[0.03] rounded-2xl shadow-elevated border border-border/30 p-4 lg:p-5 h-full">
              <div key={currentSolution.id} className="animate-enter flex flex-col h-full">
                {/* Block 1: Solution Title & Description */}
                <div className="pb-3">
                  <h2 className="text-lg lg:text-xl xl:text-[1.4rem] font-semibold text-foreground mb-2 leading-[1.2] tracking-tight">
                    {currentSolution.h2Title}
                  </h2>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-[70ch]">
                    {currentSolution.description}
                  </p>
                </div>

                {/* 2-Column Grid with Dividers */}
                <div className="bg-card shadow-soft border border-border rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-0">
                  {/* Left Column */}
                  <div className="space-y-3 pr-5 border-r border-border/15">
                    {/* Block 2: Problems */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                          Что идёт не так
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {currentSolution.problems.map((problem, index) => <li key={index} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            </span>
                            <span className="text-foreground leading-relaxed text-sm">{problem}</span>
                          </li>)}
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
                  <div className="space-y-3 pl-5">
                    {/* Block 3: How It Works */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                          Как работает
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {currentSolution.howItWorks.map((step, index) => <li key={index} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-primary" strokeWidth={2.5} />
                            </span>
                            <span className="text-foreground leading-relaxed text-sm">{step}</span>
                          </li>)}
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
                <div className="pt-3 mt-3 border-t border-border/15 flex items-center gap-4">
                  <Button onClick={handleCTAClick} size="default" className="text-sm px-6 py-2.5 rounded-xl shadow-elevated hover:shadow-[0_8px_30px_rgba(73,190,216,0.35)] transition-all duration-300 font-semibold">
                    {currentSolution.ctaText}
                  </Button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>;
};
export default Hero;