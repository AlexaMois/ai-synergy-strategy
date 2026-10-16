import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, FileClock, Users, Table, BarChart3, AlertTriangle, Inbox, Truck,
  MessageSquare, HardHat, Package, CalendarClock, Wallet, MousePointerClick, type LucideIcon,
} from "lucide-react";
import { openTaskModal } from "@/components/CallbackModal";
import PillButton from "@/components/PillButton";
import { Button } from "@/components/ui/button";
import chatDeco from "@/assets/industry-chat-deco.png";

interface CaseRef {
  title: string;
  text: string;
  metric?: string;
  to?: string;
}

interface Question {
  topic?: string;
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
        topic: "01 · Контроль ремонтов",
        q: "Машина числится в ремонте, механик говорит, что готова. А чему верить?",
        problem:
          "Данные механиков и данные учёта расходятся — пока их не сверили, непонятно, чему верить.",
        change:
          "Сопоставление ежедневных сообщений механиков с данными о ремонтах из 1С, поиск расхождений по машинам и отчёт для ответственного. Основа — модуль сверки ремонтов «Джарвиса»; полную безошибочность распознавания не обещаем.",
      },
      {
        topic: "02 · Отсутствие общей картины",
        q: "Чтобы понять, что происходит в компании, опять нужно собирать информацию по всем отделам?",
        problem:
          "У каждого подразделения свои документы, отчёты и данные. Руководитель тратит время не на решения, а на выяснение ситуации.",
        change:
          "Единое рабочее пространство и управленческие панели по согласованным показателям. Основа — корпоративный портал «АкТрансСервиса» и реализованная панель контроля документов; более широкий дашборд компании оценивается отдельно.",
      },
      {
        topic: "03 · Информационный хаос",
        q: "В компании сотни инструкций, договоров и приказов. А нужный документ опять никто не может найти?",
        problem:
          "Сотрудники ищут актуальную версию, спрашивают коллег и тратят время на повторные уточнения.",
        change:
          "Единое место для документов с поиском и разграничением доступа. Основа — действующий цифровой портал «АкТрансСервиса».",
        caseRef: {
          title: "5 цифровых инструментов за 2 месяца — включая портал документов",
          text: "Для транспортной компании АкТрансСервис собрали рабочую архитектуру под реальные процессы: документы, контроль, планёрки, командировки.",
          metric: "1,7 млн ₽ сохранено за квартал",
          to: "/cases/aktransservice",
        },
      },
      {
        topic: "04 · Перегрузка бухгалтерии",
        q: "Бухгалтерия опять завалена вопросами по зарплате, а сотрудники неделями ждут ответа?",
        problem:
          "Одни и те же вопросы приходят разными путями. Не всегда понятно, кто отвечает, на каком этапе обращение и получил ли сотрудник ответ.",
        change:
          "Автоматический приём зарплатных обращений, передача расчётчику, переписка, контроль статусов и уведомления. Основа — работающий зарплатный бот «АкТрансСервиса»: бот обрабатывает обращения, а не рассчитывает заработную плату.",
      },
      {
        topic: "05 · Командировки без отчётности",
        q: "Сотрудник вернулся из командировки. А где результаты, фотографии, замечания и что делать дальше?",
        problem:
          "Информация остаётся в сообщениях, голосовых и файлах. Руководителю приходится собирать её по частям.",
        change:
          "Сбор отчётов из командировок через мессенджер, фото и голосовые сообщения, структурирование информации по проектам. Основа — режим командировок «Джарвиса» и отдельное решение для отчётности выездных сотрудников.",
      },
      {
        topic: "06 · Зависимость от опытных сотрудников",
        q: "Почему на один и тот же вопрос сотрудникам приходится отвечать снова и снова?",
        problem:
          "Информация уже записана в регламентах и инструкциях, но за ответом всё равно обращаются к руководителю или самому опытному коллеге.",
        change:
          "ИИ-помощник, который ищет ответы по документам компании и показывает источники. Основа — «Джарвис» и общая база знаний «АкТрансСервиса».",
      },
    ],
  },
  {
    id: "construction",
    label: "Строительство",
    questions: [
      {
        topic: "01 · Перегрузка сотрудников",
        q: "Как освободить инженеров ПТО от бесконечных таблиц, актов и ведомостей?",
        problem:
          "Инженеры должны заниматься строительством, а вместо этого часами переносят данные из документа в документ.",
        change:
          "Автоматизировать подготовку ведомостей и документов. Основа — задачи ОКБ «Енисейпром» и реализованные механизмы работы с документами.",
      },
      {
        topic: "02 · Лишние расходы",
        q: "Опять закупили лишнее? Или нужных материалов снова не хватило?",
        problem:
          "Спецификации, упаковки, объёмы и цены приходится пересчитывать вручную. Ошибка обнаруживается, когда заказ уже оформлен.",
        change:
          "Автоматизировать комплектацию и расчёт материалов. Основа — разобранная задача Владимира по фасадам.",
      },
      {
        topic: "03 · Ошибки в расчётах",
        q: "В проекте одно, в смете другое, а закупили вообще третье?",
        problem:
          "Сотрудники вручную сверяют десятки документов. Расхождения отнимают время и создают риск лишних расходов.",
        change:
          "Сопоставлять проектные спецификации, сметы и закупочные ведомости, показывать расхождения для проверки. Основа — запрос ОКБ «Енисейпром».",
      },
      {
        topic: "04 · Потеря информации",
        q: "Нужный чертёж опять ищут по папкам, почте и перепискам?",
        problem:
          "На поиск актуальной версии уходит время, а решения приходится откладывать.",
        change:
          "Единый поиск по документам с управлением доступом. Аналогичный механизм работает в портале «АкТрансСервиса».",
      },
      {
        topic: "05 · Нет оперативной картины",
        q: "Чтобы понять, что происходит на объектах, снова приходится всех обзванивать?",
        problem:
          "Фото в одном чате, отчёты в другом, замечания в третьем. Пока собрали информацию, она уже устарела.",
        change:
          "Собирать отчёты, фото и голосовые сообщения в едином порядке. Есть действующий механизм выездной отчётности в боте командировок.",
      },
      {
        topic: "06 · Зависшие согласования",
        q: "Документы неделями ходят по кабинетам. Где застряло согласование?",
        problem:
          "Подписи, акты и согласования приходится отслеживать вручную. Руководитель лично выясняет, у кого сейчас документ.",
        change:
          "Организовать движение документов, статусы и ответственных. Потребность подтверждена в разборе отдела главного инженера; конкретное внедрение согласований требует отдельной проверки.",
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

// Короткие формулировки для «пузырей» чата: иконка и подсветка по умолчанию.
// Сторона иконки выводится из колонки: левая колонка — иконка слева, правая — справа.
type BubbleCfg = { short: string; icon: LucideIcon; deco?: boolean };

const bubbles: Record<string, BubbleCfg[]> = {
  production: [
    { short: "Статус заказа уточняете вручную?", icon: FileClock },
    { short: "Документы и инструкции ищутся слишком долго?", icon: Users, deco: true },
    { short: "Смены и задачи ведёте в таблицах?", icon: Table, deco: true },
    { short: "Отчёты к планёркам собираются вручную?", icon: BarChart3 },
    { short: "Опыт сильных сотрудников нигде не записан?", icon: Users },
    { short: "Ошибки замечаете слишком поздно?", icon: AlertTriangle, deco: true },
  ],
  transport: [
    { short: "Машина в ремонте, механик говорит, что готова. А чему верить?", icon: Wrench, deco: true },
    { short: "Что происходит в компании — опять собираем по всем отделам?", icon: BarChart3 },
    { short: "Нужный документ опять никто не может найти?", icon: FileClock, deco: true },
    { short: "Бухгалтерия завалена вопросами по зарплате?", icon: Wallet },
    { short: "Командировка закончилась — где результаты и что дальше?", icon: Truck },
    { short: "Одни и те же вопросы приходится объяснять заново?", icon: Users },
  ],
  construction: [
    { short: "Как освободить инженеров ПТО от бесконечных таблиц, актов и ведомостей?", icon: HardHat },
    { short: "Опять закупили лишнее? Или нужных материалов снова не хватило?", icon: Package, deco: true },
    { short: "В проекте одно, в смете другое, а закупили вообще третье?", icon: Table, deco: true },
    { short: "Нужный чертёж опять ищут по папкам, почте и перепискам?", icon: FileClock },
    { short: "Чтобы понять, что происходит на объектах, снова приходится всех обзванивать?", icon: Users },
    { short: "Документы неделями ходят по кабинетам. Где застряло согласование?", icon: CalendarClock, deco: true },
  ],
  services: [
    { short: "Непонятно, кто отвечает за обращение клиента?", icon: Users },
    { short: "Заявки расползаются по личным чатам?", icon: MessageSquare, deco: true },
    { short: "Расписание держится в голове администратора?", icon: CalendarClock, deco: true },
    { short: "Повторные клиенты теряются?", icon: Inbox },
    { short: "Отчёт по выручке — вручную раз в месяц?", icon: BarChart3 },
    { short: "Непонятно, можно ли обойтись дешевле?", icon: Wallet, deco: true },
  ],
};

const times = ["10:24", "10:26", "10:28", "10:31", "10:32", "10:35"];

// Разная ширина сообщений внутри колонки — как в живом чате.
const widths = ["md:max-w-[78%]", "md:max-w-[65%]", "md:max-w-[70%]", "md:max-w-[68%]", "md:max-w-[84%]", "md:max-w-[75%]"];


const IndustryQuestions = () => {
  const [activeId, setActiveId] = useState(industries[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  const industry = industries.find((i) => i.id === activeId) ?? industries[0];
  const openItem = openIdx !== null ? industry.questions[openIdx] : null;
  const items = industry.questions.map((q, i) => ({ q, idx: i, ...bubbles[industry.id][i] }));

  const Bubble = ({ item, side }: { item: (typeof items)[number]; side: "l" | "r" }) => {
    const isOpen = openIdx === item.idx;
    const lit = isOpen || (!touched && !!item.deco);
    const Icon = item.icon;
    const iconEl = (
      <span
        className={`shrink-0 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 transition-all duration-300 ${
          lit
            ? "bg-accent/15 ring-accent text-accent shadow-[0_0_26px_-4px_hsl(var(--accent)/1)]"
            : "bg-background/[0.06] ring-background/15 text-background/70 group-hover:ring-accent/70 group-hover:text-accent"
        }`}
      >
        <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" strokeWidth={1.6} />
      </span>
    );
    const bubbleEl = (
      <span
        className={`relative min-w-0 px-5 md:px-6 pt-4 pb-3 text-[15px] md:text-base font-medium leading-relaxed transition-all duration-300 rounded-[22px] ${
          lit
            ? "bg-accent text-accent-foreground shadow-[0_0_38px_-6px_hsl(var(--accent)/0.9)]"
            : "bg-background/[0.09] text-background ring-1 ring-background/10 group-hover:bg-background/[0.14] group-hover:ring-accent/50"
        } ${side === "l" ? "rounded-bl-none" : "rounded-br-none"}`}
      >
        <span aria-hidden className={`absolute bottom-0 h-3 w-3 ${lit ? "bg-accent" : "bg-background/[0.09]"} ${side === "l" ? "-left-2 [clip-path:polygon(100%_0,100%_100%,0_100%)]" : "-right-2 [clip-path:polygon(0_0,100%_100%,0_100%)]"}`} />
        <span className="block">{item.short}</span>
        <span className="absolute -top-3 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-[0_4px_16px_-4px_hsl(var(--accent)/0.9)]">
          <MousePointerClick className="h-3.5 w-3.5" /> Нажмите
        </span>
        <span
          className={`mt-1 flex justify-end text-[11px] leading-none font-medium ${
            lit ? "text-accent-foreground/60" : "text-background/45"
          }`}
        >
          {times[item.idx % times.length]}
        </span>
      </span>
    );
    return (
      <Button
        type="button"
        variant="ghost"
        aria-label={item.short}
        aria-expanded={isOpen}
        aria-controls="industry-question-answer"
        onClick={() => {
          setTouched(true);
          setOpenIdx(isOpen ? null : item.idx);
        }}
        className={`group flex h-auto items-end gap-3 w-fit max-w-[94%] p-0 whitespace-normal text-left cursor-pointer hover:bg-transparent hover:text-inherit hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none transition-transform duration-300 ${widths[item.idx % widths.length]} ${
          side === "r" ? "self-end" : "self-start"
        }`}
      >
        {side === "l" ? (
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
      </Button>
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
            <img
              src={chatDeco}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute -top-6 right-2 md:right-8 w-40 md:w-64 lg:w-72 opacity-90 drop-shadow-[0_0_45px_hsl(var(--accent)/0.35)]"
            />
          </div>

          <div className="relative">
            <p className="text-[15px] uppercase tracking-[0.22em] text-accent font-semibold mb-4">Отрасли</p>
            <h2 className="text-4xl md:text-6xl font-bold text-background leading-[1.05] mb-5">
              Узнаёте <span className="font-iriska font-normal italic text-accent">свой бизнес</span>?
            </h2>
            <p className="text-base md:text-xl text-background/75 max-w-3xl mb-8">
              Выберите свою сферу и найдите задачи, которые каждый день приходится решать вам и вашей команде.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {industries.map((ind) => (
                <Button
                  key={ind.id}
                  type="button"
                  variant="ghost"
                  aria-pressed={activeId === ind.id}
                  onClick={() => {
                    setActiveId(ind.id);
                    setOpenIdx(null);
                    setTouched(false);
                  }}
                  className={`h-auto px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base border transition-all duration-300 ${
                    activeId === ind.id
                      ? "bg-accent border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground shadow-[0_0_30px_-8px_hsl(var(--accent)/0.95)]"
                      : "bg-background/5 border-background/20 text-background hover:bg-background/10 hover:text-background hover:border-accent/70"
                  }`}
                >
                  {ind.label}
                </Button>
              ))}
            </div>

            <p className="text-base text-background/70 mb-8 md:mb-10">Нажмите на вопрос, чтобы увидеть, что можно сделать</p>

            <div className="mx-auto flex max-w-4xl flex-col gap-5 md:gap-6">
              {items.map((it) => <Bubble key={it.idx} item={it} side={it.idx % 2 === 0 ? "l" : "r"} />)}
            </div>

            {openItem && (
              <div id="industry-question-answer" className="mt-10 rounded-2xl bg-background/5 ring-1 ring-background/10 p-6 md:p-8">
                {openItem.topic && <p className="mb-3 text-sm font-semibold text-accent">{openItem.topic}</p>}
                <p className="font-semibold text-background text-lg mb-5">{openItem.q}</p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{activeId === "construction" ? "Ситуация" : "Что решим"}</p>
                    <p className="text-base text-background/70 leading-relaxed">{openItem.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{activeId === "construction" ? "Что можем сделать" : "Что изменится"}</p>
                    <p className="text-base text-background leading-relaxed">{openItem.change}</p>
                  </div>
                </div>
                {openItem.caseRef && (
                  <div className="mt-6 rounded-xl bg-accent/10 ring-1 ring-accent/20 p-5">
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1.5">Похожий проект</p>
                    <p className="text-sm font-semibold text-background leading-snug">{openItem.caseRef.title}</p>
                    <p className="mt-1 text-sm text-background/70 leading-relaxed">{openItem.caseRef.text}</p>
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
              <PillButton onClick={() => openTaskModal()} variant="turquoise">
                Обсудить задачу
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryQuestions;
