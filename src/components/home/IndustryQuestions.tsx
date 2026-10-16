import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MousePointerClick } from "lucide-react";
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

const CONTACT_CONTEXT_STORAGE_KEY = "aleksamois.contactContext";
const CONTACT_CONTEXT_EVENT = "aleksamois:contact-context";

const industries: Industry[] = [
  {
    id: "production",
    label: "Производство",
    questions: [
      {
        topic: "01 · Простои и потери",
        q: "Станок встал. Почему инженер полчаса ищет инструкцию, пока производство теряет деньги?",
        problem:
          "Документация где-то есть, но нужную схему или описание неисправности приходится искать вручную.",
        change:
          "Быстрый поиск по технической документации оборудования с ответами и ссылками на источники.",
        caseRef: {
          title: "QR-код на рабочем месте → ответ из документации за 3 секунды",
          text: "Для производственной компании собрали умный поиск по технической документации: текст, изображения, смешанные языки.",
          metric: "Экономия 150–350 тыс ₽/мес",
          to: "/cases/production-doc-search",
        },
      },
      {
        topic: "02 · Планирование и сроки",
        q: "Почему план производства снова собирают вручную из десятка таблиц, а ошибки приходится искать по ходу работы?",
        problem:
          "Нужно учесть заказы, остатки, нормы, загрузку участков и разные варианты продукции. Одно несовпадение в исходных данных — и расчёты приходится перепроверять.",
        change:
          "Автоматизировать расчёт производственной потребности и подготовку плана выпуска по согласованным правилам. Расчётного робота уже разработали и продемонстрировали на данных производственной компании; прототип требует дальнейшей проверки и доработки.",
      },
      {
        topic: "03 · Запасы и обеспеченность",
        q: "Склады забиты, деньги в запасах заморожены. Почему для нужного заказа опять не хватает сырья?",
        problem:
          "Остатки, потребности и планы производства находятся в разных выгрузках. Пока их свели, ситуация уже изменилась.",
        change:
          "Сопоставлять потребность производства с остатками и показывать, каких материалов не хватает, а где есть излишки. Эту задачу прорабатывали в рамках автоматизации производственного планирования.",
      },
      {
        topic: "04 · Деньги и себестоимость",
        q: "Себестоимость опять выросла. Это сырьё подорожало, выход продукции упал или мы где-то теряем деньги?",
        problem:
          "Показатели собираются с задержкой. Чтобы найти причину отклонения, руководителю приходится запрашивать несколько отчётов.",
        change:
          "Объединить данные о затратах, сырье, выпуске и отклонениях в понятную управленческую картину. Эту проблему зафиксировали при разборе производственного отдела «Крайпотребсоюза»; автоматизацию такого расчёта предлагаем после проверки данных.",
      },
      {
        topic: "05 · Зависимость от людей",
        q: "Один опытный сотрудник ушёл в отпуск — и полпроизводства не знает, как теперь работать?",
        problem:
          "Правила расчётов, особенности продукции и рабочие инструкции хранятся в голове конкретного человека. Передача дел превращается в отдельный проект.",
        change:
          "Сохранить рабочие знания компании, организовать поиск по инструкциям и справочникам, закрепить правила выполнения задач. Подобный механизм уже делали: корпоративная база знаний и ИИ-помощник «Джарвис» для «АкТрансСервиса».",
      },
      {
        topic: "06 · Бумажная рутина",
        q: "Почему сотрудники снова заполняют журналы и отчёты вместо того, чтобы заниматься производством?",
        problem:
          "Одни показатели записывают на бумаге, другие переносят в Excel, затем снова сводят для руководителя.",
        change:
          "Организовать единый сбор производственных данных и автоматизировать повторяющиеся отчёты. При аудите производственного отдела выявили 18 журналов учёта, часть которых заполнялась дважды в день; механизмы автоматического сбора отчётов уже применяли в других проектах.",
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
        topic: "01 · Потерянные заявки",
        q: "Клиент позвонил, написал в мессенджер, прислал голосовое — а заявка опять потерялась?",
        problem:
          "Обращения приходят по разным каналам и в разном виде. Часть из них остаётся в личных переписках и не доходит до работы.",
        change:
          "Приём обращений в одном месте: голосовые и текстовые заявки записываются и попадают в общий учёт. Похожее решение реализовано в другой сфере — механизм из кейса «Грузовой Экспресс».",
      },
      {
        topic: "02 · Неясно, кто отвечает за клиента",
        q: "Клиенту уже пообещали услугу. А кто из сотрудников возьмёт заказ и когда приступит к работе?",
        problem:
          "Заказ принят, но ответственный не назначен. Клиент ждёт, а руководитель выясняет, кто возьмётся.",
        change:
          "Учёт заявок, передача исполнителям и контроль откликов. Основа — реализованная система для службы сиделок.",
      },
      {
        topic: "03 · Путаница с исполнителями",
        q: "Смена начинается завтра, а кто из сотрудников на неё выйдет — снова выясняем по перепискам?",
        problem:
          "Графики и договорённости живут в чатах и в голове администратора. Любая замена превращается в обзвон.",
        change:
          "Учёт назначений, графиков, статусов исполнителей и напоминаний. Основа — реализованная система для службы сиделок.",
      },
      {
        topic: "04 · Отчёты приходится выпрашивать",
        q: "Сотрудник отработал смену. Почему руководителю опять приходится выпрашивать отчёт и напоминать о документах?",
        problem:
          "Факт выполнения работы подтверждается устно или с задержкой. Документы собираются вручную и по напоминаниям.",
        change:
          "Электронные отчёты о сменах и фиксация выполнения работы. Основа — реализованная система для службы сиделок.",
      },
      {
        topic: "05 · Ручное оформление договоров",
        q: "Каждый новый клиент — снова вручную заполняем один и тот же договор?",
        problem:
          "Одни и те же данные переносятся из документа в документ. На это уходит время, появляются опечатки.",
        change:
          "Подготовка договоров и заполнение данных без повторного ручного ввода. Основа — реализованная автоматизация договоров.",
      },
      {
        topic: "06 · Постоянный ручной контроль",
        q: "Руководитель сам проверяет каждую заявку: нашли исполнителя, ответили клиенту, получили оплату?",
        problem:
          "Нет общей картины по заявкам, поэтому контроль держится на руководителе лично.",
        change:
          "Единый учёт заявок, действий, отчётов, договоров и оплат. Основа — реализованная система для службы сиделок.",
      },
    ],
  },
];

// Короткие формулировки для «пузырей» чата и подсветка по умолчанию.
type BubbleCfg = { short: string; deco?: boolean };

const bubbles: Record<string, BubbleCfg[]> = {
  production: [
    { short: "Станок встал. Почему инженер полчаса ищет инструкцию, пока производство теряет деньги?", deco: true },
    { short: "Почему план производства снова собирают вручную из десятка таблиц, а ошибки приходится искать по ходу работы?", deco: true },
    { short: "Склады забиты, деньги в запасах заморожены. Почему для нужного заказа опять не хватает сырья?" },
    { short: "Себестоимость опять выросла. Это сырьё подорожало или мы где-то теряем деньги?", deco: true },
    { short: "Один опытный сотрудник ушёл в отпуск — и полпроизводства не знает, как теперь работать?" },
    { short: "Почему сотрудники снова заполняют журналы и отчёты вместо того, чтобы заниматься производством?" },
  ],
  transport: [
    { short: "Машина числится в ремонте, механик говорит, что готова. А чему верить?", deco: true },
    { short: "Чтобы понять, что происходит в компании, опять нужно собирать информацию по всем отделам?" },
    { short: "В компании сотни инструкций, договоров и приказов. А нужный документ опять никто не может найти?", deco: true },
    { short: "Бухгалтерия опять завалена вопросами по зарплате, а сотрудники неделями ждут ответа?" },
    { short: "Сотрудник вернулся из командировки. А где результаты, фотографии, замечания и что делать дальше?" },
    { short: "Почему на один и тот же вопрос сотрудникам приходится отвечать снова и снова?" },
  ],
  construction: [
    { short: "Как освободить инженеров ПТО от бесконечных таблиц, актов и ведомостей?" },
    { short: "Опять закупили лишнее? Или нужных материалов снова не хватило?", deco: true },
    { short: "В проекте одно, в смете другое, а закупили вообще третье?", deco: true },
    { short: "Нужный чертёж опять ищут по папкам, почте и перепискам?" },
    { short: "Чтобы понять, что происходит на объектах, снова приходится всех обзванивать?" },
    { short: "Документы неделями ходят по кабинетам. Где застряло согласование?", deco: true },
  ],
  services: [
    { short: "Клиент позвонил, написал в мессенджер, прислал голосовое — а заявка опять потерялась?", deco: true },
    { short: "Клиенту уже пообещали услугу. А кто из сотрудников возьмёт заказ и когда приступит к работе?" },
    { short: "Смена начинается завтра, а кто из сотрудников на неё выйдет — снова выясняем по перепискам?", deco: true },
    { short: "Сотрудник отработал смену. Почему руководителю опять приходится выпрашивать отчёт и напоминать о документах?" },
    { short: "Каждый новый клиент — снова вручную заполняем один и тот же договор?" },
    { short: "Руководитель сам проверяет каждую заявку: нашли исполнителя, ответили клиенту, получили оплату?" },
  ],
};

const times = ["10:24", "10:26", "10:28", "10:31", "10:32", "10:35"];

// Разная ширина сообщений внутри колонки — как в живом чате.
const widths = ["md:max-w-[92%]", "md:max-w-[78%]", "md:max-w-[84%]", "md:max-w-[76%]", "md:max-w-[88%]", "md:max-w-[80%]"];

// Габариты окна переписки на компьютере оставлены прежними: сообщения плотнее,
// а свободное место равномерно распределяется между ними.
const chatMinH: Record<string, string> = {
  production: "md:min-h-[627.8px]",
  transport: "md:min-h-[586.5px]",
  construction: "md:min-h-[586.5px]",
  services: "md:min-h-[627.8px]",
};

// Деликатная подсказка «на меня можно нажать»: сообщения мягко пульсируют по очереди.
const PULSE_FIRST_MS = 1200;
const PULSE_ON_MS = 3000;
const PULSE_GAP_MS = 2400;



const IndustryQuestions = () => {
  const [activeId, setActiveId] = useState(industries[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  const industry = industries.find((i) => i.id === activeId) ?? industries[0];
  const openItem = openIdx !== null ? industry.questions[openIdx] : null;
  const items = industry.questions.map((q, i) => ({ q, idx: i, ...bubbles[industry.id][i] }));

  const chatRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);

  // Пульсируют два сообщения, уже подсвеченных бирюзой, — по очереди.
  const pulseTargets = useMemo(() => {
    const lit = (bubbles[activeId] ?? [])
      .map((b, i) => (b.deco ? i : -1))
      .filter((i) => i >= 0)
      .slice(0, 2);
    return lit.length > 1 ? lit : [];
  }, [activeId]);

  const saveContactContext = (nextIndustry: Industry, question?: Question) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(
      CONTACT_CONTEXT_STORAGE_KEY,
      JSON.stringify({
        industry: nextIndustry.label,
        question: question?.q ?? "",
        topic: question?.topic ?? "",
      }),
    );
    window.dispatchEvent(new CustomEvent(CONTACT_CONTEXT_EVENT));
  };

  useEffect(() => {
    const el = chatRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setPulseIdx(null);
    if (touched || !inView || pulseTargets.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let stop = false;
    let timer = 0;
    let step = 0;
    const next = () => {
      if (stop) return;
      setPulseIdx(pulseTargets[step % pulseTargets.length]);
      step += 1;
      timer = window.setTimeout(() => {
        setPulseIdx(null);
        timer = window.setTimeout(next, PULSE_GAP_MS);
      }, PULSE_ON_MS);
    };
    timer = window.setTimeout(next, PULSE_FIRST_MS);
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [activeId, touched, inView, pulseTargets]);


  const Bubble = ({ item, side }: { item: (typeof items)[number]; side: "l" | "r" }) => {
    const isOpen = openIdx === item.idx;
    const lit = isOpen || (!touched && !!item.deco);
    const pulsing = !isOpen && pulseIdx === item.idx;
    const bubbleEl = (
      <span
        className={`relative min-w-0 px-4 pt-2.5 pb-2 md:px-4 md:pt-1.5 md:pb-1 text-sm md:text-[17px] font-medium leading-snug md:leading-[1.4] transition-all duration-300 rounded-[22px] ${
          lit
            ? "bg-primary-dark text-accent-foreground"
            : "bg-background/[0.09] text-card ring-1 ring-background/10 group-hover:bg-background/[0.14] group-hover:ring-accent/50"
        } ${side === "l" ? "rounded-bl-none" : "rounded-br-none"} ${pulsing ? "bubble-soft-pulse" : ""}`}
      >

        <span aria-hidden className={`absolute bottom-0 h-3 w-3 ${lit ? "bg-primary-dark" : "bg-background/[0.09]"} ${side === "l" ? "-left-2 [clip-path:polygon(100%_0,100%_100%,0_100%)]" : "-right-2 [clip-path:polygon(0_0,100%_100%,0_100%)]"}`} />
        {item.short}
        <span
          className={`mt-1 block text-right text-[11px] leading-none font-medium md:mt-[6px] md:ml-2 md:inline md:float-right ${
            lit ? "text-accent-foreground/60" : "text-card/50"
          }`}
        >
          {times[item.idx % times.length]}
        </span>
        <span className="absolute -top-3 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-semibold whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
          <MousePointerClick className="h-3.5 w-3.5" /> Нажмите
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
          saveContactContext(industry, isOpen ? undefined : industry.questions[item.idx]);
        }}
        className={`group flex h-auto items-end gap-2.5 w-fit max-w-[94%] p-0 whitespace-normal text-left cursor-pointer hover:bg-transparent hover:text-inherit hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none transition-transform duration-300 ${widths[item.idx % widths.length]} ${
          side === "r" ? "self-end" : "self-start"
        }`}
      >
        {bubbleEl}
      </Button>
    );
  };

  return (
    <section id="industry-questions" className="scroll-mt-20 px-4 md:px-6 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-[32px] md:rounded-[40px] bg-foreground overflow-hidden shadow-plate ring-1 ring-foreground/5 px-6 md:px-10 lg:px-14 py-12 md:py-14">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <path d="M700 0 C 860 90, 980 140, 1200 200" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.45" />
              <path d="M560 120 C 660 320, 480 480, 620 700" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.28" />
              <path d="M0 600 C 180 540, 320 690, 520 620" stroke="hsl(var(--accent))" strokeWidth="0.8" fill="none" opacity="0.35" />
              <path d="M780 360 C 920 460, 1010 410, 1200 520" stroke="hsl(var(--accent))" strokeWidth="0.7" fill="none" opacity="0.22" />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-14 items-center">
            <div>
            <p className="text-[15px] uppercase tracking-[0.22em] text-accent font-semibold mb-4">Отрасли</p>
            <h2 className="text-4xl md:text-5xl font-bold text-background leading-[1.05] mb-5">
              Узнаёте <span className="font-iriska font-normal italic text-accent">свой бизнес</span>?
            </h2>
            <p className="text-base md:text-lg text-background/75 mb-7">
              Выберите свою сферу и найдите задачи, которые каждый день приходится решать вам и вашей команде.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-5">
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
                    saveContactContext(ind);
                  }}
                  className={`h-auto px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base border transition-all duration-300 ${
                    activeId === ind.id
                      ? "bg-accent border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                      : "bg-background/5 border-background/20 text-background hover:bg-background/10 hover:text-background hover:border-accent/70"
                  }`}
                >
                  {ind.label}
                </Button>
              ))}
            </div>

            <p className="text-sm md:text-base text-background/60 mb-8">Нажмите на вопрос, чтобы увидеть, что можно сделать</p>

            <PillButton onClick={() => openTaskModal()} variant="turquoise">
              Обсудить задачу
            </PillButton>
            </div>

            <div className="relative">
              <img
                src={chatDeco}
                alt=""
                width={1024}
                height={1024}
                loading="lazy"
                className="pointer-events-none absolute -top-14 -right-6 md:-right-10 z-10 w-24 md:w-36"
              />
              <div ref={chatRef} className={`relative flex flex-col rounded-[28px] bg-background/[0.04] ring-1 ring-background/10 backdrop-blur-sm overflow-hidden ${chatMinH[industry.id] ?? ""}`}>
                <div className="flex items-center gap-3 px-5 md:px-6 py-4 md:py-3 border-b border-background/10">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-background leading-tight">Вопросы собственников · {industry.label}</p>
                    <p className="text-xs text-background/50 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> на связи
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 md:gap-2.5 px-4 md:px-6 py-5 md:py-4">
                  {items.map((it) => <Bubble key={it.idx} item={it} side={it.idx % 2 === 0 ? "l" : "r"} />)}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {openItem && (
              <div id="industry-question-answer" className="mt-10 rounded-2xl bg-background/5 ring-1 ring-background/10 p-6 md:p-8">
                {openItem.topic && <p className="mb-3 text-sm font-semibold text-accent">{openItem.topic}</p>}
                <p className="font-semibold text-background text-lg mb-5">{openItem.q}</p>
                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{activeId === "services" ? "Что решим" : "Ситуация"}</p>
                    <p className="text-base text-background/70 leading-relaxed">{openItem.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{activeId === "transport" ? "Что можем предложить" : activeId === "services" ? "Что изменится" : "Что можем сделать"}</p>
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

          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryQuestions;
