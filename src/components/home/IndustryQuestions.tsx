import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, FileClock, Users, Table, BarChart3, AlertTriangle, Inbox, Truck,
  MessageSquare, HardHat, Package, CalendarClock, Wallet, MousePointerClick, type LucideIcon,
} from "lucide-react";
import { openTaskModal } from "@/components/CallbackModal";

interface CaseRef {
  title: string;
  text: string;
  metric?: string;
  to?: string;
}

interface Question {
  q: string;
  problem: string;
  change: string;
  caseRef?: CaseRef;
}

interface Industry {
  id: string;
  label: string;
  questions: Question[];
}

const industries: Industry[] = [
  {
    id: "production",
    label: "Производство",
    questions: [
      {
        q: "Заказы есть, а на каком этапе каждый — приходится выяснять по телефону?",
        problem:
          "Статус каждого заказа знает только тот, кто его ведёт. Каждый ваш вопрос — это прерванная работа сотрудника и лишний звонок.",
        change:
          "Заказы и их этапы собираются в одном рабочем поле. Картину по всем заказам видно без звонков, а сотрудники перестают дёргать друг друга.",
      },
      {
        q: "Инструкции и документация ищутся долго — сотрудники тратят часы на просмотр файлов?",
        problem:
          "Ответ на простой вопрос лежит в десятках документов, часто в рукописном виде или на другом языке.",
        change:
          "Нужный ответ находится за секунды прямо на рабочем месте — по QR-коду или запросу своими словами.",
        caseRef: {
          title: "QR-код на рабочем месте → ответ из документации за 3 секунды",
          text: "Для производственной компании собрали умный поиск по технической документации: текст, изображения, смешанные языки.",
          metric: "Экономия 150–350 тыс ₽/мес",
          to: "/cases/production-doc-search",
        },
      },
      {
        q: "Смены, наряды и задачи планируются в таблицах, которые никто не заполняет вовремя?",
        problem:
          "План живёт в файле, который каждый заполняет по-своему и когда вспомнит. Расхождения всплывают уже в работе.",
        change:
          "Задачи и смены заводятся в едином порядке, а вы видите, что запланировано, а что провисло, без ручной сверки.",
      },
      {
        q: "Отчёты к планёркам собираются вручную по крупицам из разных мест?",
        problem:
          "Перед каждой планёркой кто-то вручную обходит коллег и таблицы, чтобы собрать цифры.",
        change:
          "Данные собираются сами — планёрка начинается с готовой картины, а не с поиска цифр.",
      },
      {
        q: "Опыт лучших работников живёт только в головах — новички учатся месяцами?",
        problem:
          "Знания не записаны: уходит сотрудник — уходят и его знания, а новичок осваивает всё методом проб и ошибок.",
        change:
          "Опыт фиксируется в удобном виде, и новый сотрудник находит ответ сам, без долгих объяснений.",
      },
      {
        q: "Брак и переделки всплывают поздно — когда исправлять уже дорого?",
        problem:
          "Проблема видна на финальном этапе, когда цена ошибки максимальная.",
        change:
          "Контрольные точки подсвечивают отклонения раньше — исправлять дешевле и спокойнее.",
      },
    ],
  },
  {
    id: "transport",
    label: "Транспорт",
    questions: [
      {
        q: "Заявки приходят в мессенджеры, по почте и телефону — как ничего не потерять?",
        problem:
          "Заявки рассыпаны по личным чатам и почте. Одна забытая заявка — потерянный рейс и недовольный клиент.",
        change:
          "Заявки из любых каналов попадают в один рабочий поток — с понятным статусом и без потерь.",
        caseRef: {
          title: "Заявки голосом и текстом → сразу в рабочую таблицу",
          text: "Грузовой Экспресс: заявки принимаются голосом, из Telegram и Excel и попадают в единый рабочий поток. Руководитель получил понятный контроль.",
          metric: "0% потерь заявок · экономия 9–12 ч/нед",
          to: "/cases/cargo-express",
        },
      },
      {
        q: "Чтобы понять, где машина и что с рейсом, приходится обзванивать водителей?",
        problem:
          "Каждый вопрос о статусе — это звонок, который отвлекает водителя и занимает время диспетчера.",
        change:
          "Статусы рейсов видны в одном окне — без звонков и ожидания ответа.",
      },
      {
        q: "Командировки и разъездная работа оформляются в переписке — каждый раз заново?",
        problem:
          "Заявки, согласования и отчёты по поездкам живут в чатах, и каждый раз всё начинается с чистого листа.",
        change:
          "Типовые поездки оформляются по понятной схеме: заявка, согласование, отчёт — без ручной переписки.",
        caseRef: {
          title: "5 цифровых инструментов за 2 месяца — включая помощника для планёрок и командировок",
          text: "Для транспортной компании АкТрансСервис собрали рабочую архитектуру под реальные процессы: документы, контроль, планёрки, командировки.",
          metric: "1,7 млн ₽ сохранено за квартал",
          to: "/cases/aktransservice",
        },
      },
      {
        q: "Документы по рейсам оформляются вручную и теряются при передаче между сотрудниками?",
        problem:
          "Документы переходят из рук в руки и из чата в чат — теряются версии и время.",
        change:
          "Документы по рейсам идут по понятному маршруту — всегда известно, где документ и что с ним дальше.",
      },
      {
        q: "Клиент спрашивает про статус — а ответ приходится собирать у трёх сотрудников?",
        problem:
          "Пока вы собираете ответ, клиент ждёт и делает выводы о компании.",
        change:
          "Ответ по любой заявке находится за минуту — в одном месте, без обхода коллег.",
      },
      {
        q: "Топливо, ремонты, простои — расходы сводятся вручную из разных таблиц?",
        problem:
          "Сведения о расходах живут в разных местах, и реальная стоимость рейса видна только после ручной сводки.",
        change:
          "Расходы собираются в одну картину — стоимость рейса видна вовремя, а не постфактум.",
      },
    ],
  },
  {
    id: "construction",
    label: "Строительство",
    questions: [
      {
        q: "Чтобы узнать, что происходит на объекте, приходится постоянно звонить прорабу?",
        problem:
          "Объект живёт в звонках и чатах. Пока дозвонитесь — день прошёл, а картина всё равно приблизительная.",
        change:
          "Ход работ виден в одном месте: что сделано, что отстаёт, кто отвечает — без обзвона.",
      },
      {
        q: "О проблеме на объекте узнаёте, когда исправлять уже дороже?",
        problem:
          "Сигналы о сбоях тонут в ежедневной переписке и доходят до вас с опозданием.",
        change:
          "Отклонения подсвечиваются сразу — реагировать можно до того, как проблема стала дорогой.",
      },
      {
        q: "Материалы списываются, а по факту не сходится — и непонятно, где разрыв?",
        problem:
          "Списание и наличие живут в разных учётах, и разрыв видно только на инвентаризации.",
        change:
          "Приход, списание и остатки видны в связке — разрыв находится быстро и по адресу.",
      },
      {
        q: "Документы по объектам живут в бумагах и чатах — нужную версию не найти?",
        problem:
          "Акты, сметы и переписка по объекту разбросаны — поиск нужного документа занимает часы.",
        change:
          "Все документы по объекту — в одном месте, с понятным порядком версий и согласований.",
      },
      {
        q: "Подрядчики отчитываются кто как может — единой картины по объектам нет?",
        problem:
          "Каждый подрядчик присылает отчёт в своём формате, и сводить их приходится вручную.",
        change:
          "Отчёты приходят в едином виде — сравнивать подрядчиков и объекты можно на одной картине.",
      },
      {
        q: "Закрывающие документы собираются в конце месяца авралом?",
        problem:
          "Документы копятся до последнего, и конец месяца превращается в аврал с рисками.",
        change:
          "Документы оформляются по ходу работ — конец месяца проходит спокойно.",
      },
    ],
  },
  {
    id: "services",
    label: "Услуги",
    questions: [
      {
        q: "Клиенты обращаются, а кто ответил и кто отвечает за выполнение — непонятно?",
        problem:
          "Обращения теряются между сотрудниками, и клиент сам напоминает о себе — уже недовольный.",
        change:
          "У каждого обращения понятный ответственный и статус — ничего не теряется и не дублируется.",
        caseRef: {
          title: "Система распределения заявок для сиделок",
          text: "Заявки от клиентов распределяются между специалистами по понятным правилам — без потерь и личных договорённостей.",
        },
      },
      {
        q: "Заявки и обращения расползаются по личным чатам сотрудников?",
        problem:
          "Рабочие вопросы живут в личных переписках: сотрудник на больничном — история обращений пропадает вместе с ним.",
        change:
          "Общение с клиентами ведётся в общем рабочем поле — история сохраняется независимо от сотрудника.",
      },
      {
        q: "Расписание специалистов держится в голове администратора?",
        problem:
          "Пока администратор на месте — всё работает. Заболел или уволился — расписание рассыпается.",
        change:
          "Записи и расписание ведутся в одном порядке — любой сотрудник подхватывает работу без сбоя.",
      },
      {
        q: "Повторные клиенты теряются — некому вовремя напомнить о компании?",
        problem:
          "Клиент уходит молча — не из-за качества, а потому что о нём просто не вспомнили.",
        change:
          "Повторные визиты и напоминания происходят сами — клиенты возвращаются без ручной работы.",
      },
      {
        q: "Отчёт по выручке и загрузке собирается вручную раз в месяц?",
        problem:
          "Пока отчёт собран, ситуация уже изменилась — решения принимаются по устаревшим цифрам.",
        change:
          "Выручка и загрузка видны в любое время — решения принимаются по свежей картине.",
      },
      {
        q: "Перед покупкой дорогого решения непонятно, можно ли обойтись дешевле?",
        problem:
          "Под давлением обещаний легко купить дорогое, а потом годами оплачивать то, что работает вполсилы.",
        change:
          "Сначала считается экономика: иногда задача решается без крупной покупки — и это тоже наш результат.",
        caseRef: {
          title: "Отказ от покупки оборудования примерно за 1,5 млн ₽",
          text: "Крайпотребсоюз: архитектура решения позволила обойтись без покупки серверного оборудования. Время финансового отдела сэкономлено.",
          metric: "1,3 млн ₽ разовой экономии",
          to: "/cases/kraypotrebsoyuz",
        },
      },
    ],
  },
];

// Короткие формулировки для «пузырей» чата: иконка, сторона иконки и подсветка по умолчанию.
type BubbleCfg = { short: string; icon: LucideIcon; side: "l" | "r"; deco?: boolean };

const bubbles: Record<string, BubbleCfg[]> = {
  production: [
    { short: "Статус заказа уточняете вручную?", icon: FileClock, side: "l" },
    { short: "Документы и инструкции ищутся слишком долго?", icon: Users, side: "r", deco: true },
    { short: "Смены и задачи ведёте в таблицах?", icon: Table, side: "l" },
    { short: "Отчёты к планёркам собираются вручную?", icon: BarChart3, side: "l" },
    { short: "Знания сильных сотрудников нигде не зафиксированы?", icon: Users, side: "l", deco: true },
    { short: "Ошибки замечаете слишком поздно?", icon: AlertTriangle, side: "l" },
  ],
  transport: [
    { short: "Заявки теряются между мессенджерами и почтой?", icon: Inbox, side: "l" },
    { short: "Где машина — узнаёте обзвоном водителей?", icon: Truck, side: "r", deco: true },
    { short: "Командировки оформляются в переписке?", icon: MessageSquare, side: "l" },
    { short: "Документы по рейсам теряются при передаче?", icon: FileClock, side: "l" },
    { short: "Статус для клиента собираете у трёх сотрудников?", icon: Users, side: "l", deco: true },
    { short: "Расходы сводите вручную из разных таблиц?", icon: BarChart3, side: "l" },
  ],
  construction: [
    { short: "Что на объекте — узнаёте звонком прорабу?", icon: HardHat, side: "l" },
    { short: "О проблеме узнаёте, когда исправлять дорого?", icon: AlertTriangle, side: "r", deco: true },
    { short: "Материалы списаны, а по факту не сходится?", icon: Package, side: "l" },
    { short: "Нужную версию документа не найти?", icon: FileClock, side: "l" },
    { short: "Подрядчики отчитываются кто как может?", icon: Users, side: "l", deco: true },
    { short: "Закрывающие документы — аврал в конце месяца?", icon: CalendarClock, side: "l" },
  ],
  services: [
    { short: "Непонятно, кто отвечает за обращение клиента?", icon: Users, side: "l" },
    { short: "Заявки расползаются по личным чатам?", icon: MessageSquare, side: "r", deco: true },
    { short: "Расписание держится в голове администратора?", icon: CalendarClock, side: "l" },
    { short: "Повторные клиенты теряются?", icon: Inbox, side: "l" },
    { short: "Отчёт по выручке — вручную раз в месяц?", icon: BarChart3, side: "l", deco: true },
    { short: "Непонятно, можно ли обойтись дешевле?", icon: Wallet, side: "l" },
  ],
};

const times = ["10:24", "10:26", "10:28", "10:31", "10:32", "10:35"];


const IndustryQuestions = () => {
  const [activeId, setActiveId] = useState(industries[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  const industry = industries.find((i) => i.id === activeId) ?? industries[0];
  const openItem = openIdx !== null ? industry.questions[openIdx] : null;
  const items = industry.questions.map((q, i) => ({ q, idx: i, ...bubbles[industry.id][i] }));
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);
  const lastIdx = items.length - 1;

  const Bubble = ({ item, col }: { item: (typeof items)[number]; col: "l" | "r" }) => {
    const isOpen = openIdx === item.idx;
    const lit = isOpen || (!touched && !!item.deco);
    const Icon = item.icon;
    const bg = lit ? "bg-gradient-to-br from-accent/35 via-accent/25 to-accent/15" : "bg-white/10 group-hover:bg-white/[0.16]";
    const tail = lit ? "text-accent/30" : "text-white/[0.14]";
    const iconEl = (
      <span
        className={`shrink-0 flex items-center justify-center w-12 h-12 md:w-[52px] md:h-[52px] rounded-full ring-1 transition-colors ${
          lit
            ? "bg-accent/20 ring-accent/60 text-accent shadow-[0_0_22px_-6px_hsl(var(--accent)/0.9)]"
            : "bg-white/5 ring-white/10 text-white/80 group-hover:text-white"
        }`}
      >
        <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" strokeWidth={1.6} />
      </span>
    );
    const bubbleEl = (
      <span
        className={`relative flex-1 min-w-0 px-5 md:px-6 py-3 md:py-3.5 text-[15px] md:text-base font-medium leading-snug ring-1 transition-all duration-300 rounded-[22px] ${bg} ${
          lit ? "ring-2 ring-accent text-white shadow-[0_0_22px_-2px_hsl(var(--accent)/0.95)]" : "ring-white/10 text-white group-hover:ring-accent/60"
        }`}
      >
        <span className="block pr-10 md:pr-12">{item.short}</span>
        <span className="absolute -top-3 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-[0_4px_16px_-4px_hsl(var(--accent)/0.9)]">
          <MousePointerClick className="h-3.5 w-3.5" /> Нажмите
        </span>
        {item.idx === lastIdx && !isOpen ? (
          <span className="absolute right-5 bottom-1/2 translate-y-1/2 inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent)/1)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent)/1)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
          </span>
        ) : (
          <span className="absolute right-4 bottom-1.5 text-sm font-medium text-white/45">
            {times[item.idx % times.length]}
          </span>
        )}
        <svg
          aria-hidden
          viewBox="0 0 22 18"
          className={`absolute bottom-1 h-[18px] w-[22px] ${tail} ${
            item.side === "r" ? "-right-[15px] -scale-x-100" : "-left-[15px]"
          }`}
        >
          <path d="M22 0 C 20 9, 11 14, 0 17 C 12 13, 19 8, 22 0 Z" fill="currentColor" />
        </svg>
      </span>
    );
    return (
      <button
        type="button"
        onClick={() => {
          setTouched(true);
          setOpenIdx(isOpen ? null : item.idx);
        }}
        className={`group flex items-center gap-3 md:gap-4 w-full text-left cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-300`}
      >
        {item.side === "l" ? (
          <>
            {iconEl}
            {bubbleEl}
          </>
        ) : (
          <>
            {bubbleEl}
            {iconEl}
          </>
        )}
      </button>
    );
  };

  return (
    <section className="px-4 md:px-6 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-[32px] md:rounded-[40px] bg-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-12 lg:px-16 py-14 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-16 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
            <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-[140px]" />
            <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-accent/15 blur-[120px]" />
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path d="M700 0 C 860 90, 980 140, 1200 200" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.45" />
              <path d="M560 120 C 660 320, 480 480, 620 700" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.28" />
              <path d="M0 600 C 180 540, 320 690, 520 620" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.35" />
              <path d="M780 360 C 920 460, 1010 410, 1200 520" stroke="hsl(var(--accent))" strokeWidth="0.7" fill="none" opacity="0.22" />
            </svg>
          </div>

          <div className="relative">
            <p className="text-[15px] uppercase tracking-[0.22em] text-accent font-semibold mb-4">Отрасли</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-5">
              Узнаёте <span className="font-iriska font-normal italic text-accent">свой бизнес</span>?
            </h2>
            <p className="text-base md:text-xl text-white/75 max-w-3xl mb-8">
              Выберите свою сферу и найдите задачи, которые каждый день приходится решать вам и вашей команде.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => {
                    setActiveId(ind.id);
                    setOpenIdx(null);
                    setTouched(false);
                  }}
                  className={`px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base border transition-all duration-300 ${
                    activeId === ind.id
                      ? "bg-accent border-accent text-accent-foreground shadow-[0_0_30px_-8px_hsl(var(--accent)/0.95)]"
                      : "bg-white/5 border-white/20 text-white hover:border-accent/70"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>

            <p className="text-base text-white/70 mb-8 md:mb-10">Нажмите на вопрос, чтобы увидеть, что можно сделать</p>

            <div className="grid md:grid-cols-2 gap-5 md:gap-x-14">
              <div className="flex flex-col gap-4 md:gap-5">
                {left.map((it) => <Bubble key={it.short} item={it} col="l" />)}
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                {right.map((it) => <Bubble key={it.short} item={it} col="r" />)}
              </div>
            </div>

            {openItem && (
              <div className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8">
                <p className="font-semibold text-white text-lg mb-5">{openItem.q}</p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Что решим</p>
                    <p className="text-base text-white/70 leading-relaxed">{openItem.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Что изменится</p>
                    <p className="text-base text-white leading-relaxed">{openItem.change}</p>
                  </div>
                </div>
                {openItem.caseRef && (
                  <div className="mt-6 rounded-xl bg-accent/10 ring-1 ring-accent/20 p-5">
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1.5">Похожий проект</p>
                    <p className="text-sm font-semibold text-white leading-snug">{openItem.caseRef.title}</p>
                    <p className="mt-1 text-sm text-white/70 leading-relaxed">{openItem.caseRef.text}</p>
                    {openItem.caseRef.metric && (
                      <p className="mt-2 text-sm font-semibold text-accent">{openItem.caseRef.metric}</p>
                    )}
                    {openItem.caseRef.to && (
                      <Link to={openItem.caseRef.to} className="mt-2 inline-flex items-center text-sm font-semibold text-accent hover:underline">
                        Читать кейс <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 flex justify-center items-center gap-4">
              <svg aria-hidden width="28" height="40" viewBox="0 0 28 40" className="text-accent hidden sm:block">
                <path d="M14 2 L24 12 M4 20 L22 22 M8 36 L22 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <button
                type="button"
                onClick={() => openTaskModal()}
                className="inline-flex items-center gap-3 px-10 md:px-16 py-4 md:py-5 rounded-full font-semibold text-base md:text-lg bg-accent text-accent-foreground shadow-[0_0_60px_-10px_hsl(var(--accent)/0.85)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Обсудить свою задачу <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryQuestions;
