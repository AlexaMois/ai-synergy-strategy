export type CaseProblem = "documents" | "requests" | "control" | "manual" | "travel" | "procurement";
export interface CaseStudy {
  id: string;
  problem: string;
  industry: string;
  client: string;
  solution: string;
  images: { key: string; alt: string; caption: string; kind: "screenshot" | "photo" }[];
  results: { value: string; label: string; confirmation: string }[];
  problems: CaseProblem[];
  visibility: "public" | "draft";
  link: string;
}

export const caseProblems: { id: CaseProblem; label: string }[] = [
  { id: "documents", label: "Документы и знания" },
  { id: "requests", label: "Заявки клиентов" },
  { id: "control", label: "Отчёты и контроль" },
  { id: "manual", label: "Ручная работа" },
  { id: "travel", label: "Командировки" },
  { id: "procurement", label: "Закупки и тендеры" },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "aktransservice", client: "АкТрансСервис", industry: "Транспорт · Нефтегаз",
    problem: "Документы, инструкции и рабочие данные разбросаны по разным системам?",
    solution: "Создали корпоративный портал, поиск по документам и базе знаний, Jarvis в MAX и автоматические проверки рабочих данных. Сохранили привычные инструменты сотрудников.",
    images: [
      { key: "portal", alt: "Корпоративный портал АкТрансСервиса", caption: "Корпоративный портал", kind: "screenshot" },
      { key: "dashboard", alt: "Дашборд рабочих данных АкТрансСервиса", caption: "Дашборд рабочих данных", kind: "screenshot" },
      { key: "jarvis", alt: "Меню Jarvis в MAX для сотрудников АкТрансСервиса", caption: "Jarvis в MAX", kind: "screenshot" },
    ],
    results: [{ value: "1,7 млн ₽", label: "Сохранено за квартал в рамках проекта цифровизации", confirmation: "Результат, опубликованный в подробном кейсе АкТрансСервиса; относится к проекту в целом." }],
    problems: ["documents", "control", "manual", "travel"], visibility: "public", link: "/cases/aktransservice",
  },
  {
    id: "kraypotrebsoyuz", client: "Крайпотребсоюз", industry: "Потребительская кооперация",
    problem: "Вам предлагают потратить миллионы на оборудование. А точно ли оно необходимо?",
    solution: "Проработали архитектуру решения и нашли способ отказаться от запланированной покупки серверного оборудования.",
    images: [{ key: "kray-meeting", alt: "Александра Моисеева на собрании Крайпотребсоюза", caption: "Собрание Крайпотребсоюза · материал проекта", kind: "photo" }],
    results: [{ value: "1,3 млн ₽", label: "Разовая экономия капитальных затрат", confirmation: "Отказ от серверного оборудования; в подробном кейсе описано подтверждение результатов Председателем Правления." }],
    problems: ["documents", "control", "manual"], visibility: "public", link: "/cases/kraypotrebsoyuz",
  },
  {
    id: "production-doc-search", client: "Производственная компания", industry: "Производство",
    problem: "Станок простаивает, пока сотрудник ищет нужную инструкцию?",
    solution: "Создали поиск по технической документации. Сотрудник получает доступ через QR-код и находит информацию по рабочему запросу.",
    images: [], results: [{ value: "3 секунды", label: "Ответ на технический запрос", confirmation: "Время ответа, опубликованное в существующем подробном кейсе." }],
    problems: ["documents", "manual"], visibility: "public", link: "/cases/production-doc-search",
  },
  {
    id: "cargo-express", client: "Грузовой Экспресс", industry: "Транспорт · Логистика",
    problem: "Клиенты звонят, пишут и отправляют голосовые. Как не терять заявки?",
    solution: "Организовали единый учёт обращений через Telegram и таблицы без внедрения сложной CRM.",
    images: [], results: [
      { value: "0%", label: "Потерь заявок после внедрения", confirmation: "Результат описанного проекта, не гарантия для других компаний." },
      { value: "9–12 часов", label: "Экономия в неделю на обработке заявок для команды из 3 человек", confirmation: "Общий результат команды из трёх менеджеров, опубликованный в подробном кейсе." },
    ],
    problems: ["requests", "control", "manual"], visibility: "public", link: "/cases/cargo-express",
  },
];

export function publishedCases(problem: CaseProblem | "all" = "all") {
  return caseStudies.filter(item => item.visibility === "public" && (problem === "all" || item.problems.includes(problem)));
}
export function availableCaseProblems() {
  return caseProblems.filter(problem => publishedCases(problem.id).length > 0);
}
export function caseForPath(path: string) {
  return publishedCases().find(item => item.link === path.replace(/\/$/, ""));
}