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
  linkLabel: string;
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
    problems: ["documents", "control", "manual"], visibility: "public", link: "/cases/aktransservice",
    linkLabel: "Посмотреть, как это работает",
  },
  {
    id: "kraypotrebsoyuz", client: "Крайпотребсоюз", industry: "Потребительская кооперация",
    problem: "Вам предлагают потратить миллионы на оборудование. А точно ли оно необходимо?",
    solution: "Проработали архитектуру решения и нашли способ отказаться от запланированной покупки серверного оборудования.",
    images: [{ key: "kray-meeting", alt: "Александра Моисеева на собрании Крайпотребсоюза", caption: "Собрание Крайпотребсоюза · материал проекта", kind: "photo" }],
    results: [{ value: "1,3 млн ₽", label: "Разовая экономия капитальных затрат", confirmation: "Отказ от серверного оборудования; в подробном кейсе описано подтверждение результатов Председателем Правления." }],
    problems: ["control", "manual"], visibility: "public", link: "/cases/kraypotrebsoyuz",
    linkLabel: "Читать кейс",
  },
  {
    id: "production-doc-search", client: "Производственная компания", industry: "Производство",
    problem: "Станок простаивает, пока сотрудник ищет нужную инструкцию?",
    solution: "Создали поиск по технической документации. Сотрудник получает доступ через QR-код и находит информацию по рабочему запросу.",
    images: [], results: [{ value: "3 секунды", label: "Ответ на технический запрос", confirmation: "Время ответа, опубликованное в существующем подробном кейсе." }],
    problems: ["documents", "manual"], visibility: "public", link: "/cases/production-doc-search",
    linkLabel: "Посмотреть, как это работает",
  },
  {
    id: "cargo-express", client: "Грузовой Экспресс", industry: "Транспорт · Логистика",
    problem: "Клиенты звонят, пишут и отправляют голосовые. Как объединить все обращения в одном учёте?",
    solution: "Организовали единый учёт обращений через привычные сотрудникам Telegram и таблицы.",
    images: [], results: [
      { value: "0%", label: "Потерь заявок после внедрения", confirmation: "Фактический показатель этого проекта. Результаты других внедрений оцениваются отдельно." },
      { value: "9–12 часов", label: "Экономия в неделю на обработке заявок для команды из 3 человек", confirmation: "Общий результат команды из трёх менеджеров, опубликованный в подробном кейсе." },
    ],
    problems: ["requests", "control", "manual"], visibility: "public", link: "/cases/cargo-express",
    linkLabel: "Посмотреть, как это работает",
  },
  {
    id: "neurotenderolog", client: "НейроТендеролог", industry: "Закупки · Сервис НейроРешений по подписке",
    problem: "Ручной просмотр закупок мешает управлять отбором подходящих предложений?",
    solution: "Создали собственный программный сервис по подписке: многоступенчатая фильтрация, ИИ-оценка соответствия и углублённый разбор документации. Карточки подходящих закупок поступают в MAX. Обновлённая версия в промышленной эксплуатации с июня 2026.",
    images: [], results: [
      { value: "3 клиента", label: "Постоянные клиенты сервиса в эксплуатации", confirmation: "Эксплуатационный показатель: три постоянных клиента, один пользуется более года. Оценка финансового эффекта требует отдельных исходных данных." },
      { value: "До 750", label: "Закупок просматривается в день на одно направление", confirmation: "Эксплуатационный показатель количества просмотренных закупок. Заявки и результаты участия оцениваются отдельно. Оценка финансового эффекта требует отдельных исходных данных." },
    ],
    problems: ["procurement", "manual"], visibility: "public", link: "/cases/neurotenderolog",
    linkLabel: "Читать кейс",
  },
  {
    id: "caregiver-matching", client: "Система подбора и сопровождения сиделок", industry: "Услуги · Уход",
    problem: "Как организовать приём заявок на уход и сопровождение работы сиделок?",
    solution: "Реализовали Telegram-бот и контур учёта в Google Таблицах. Текстовые и голосовые заявки становятся карточками, проходят модерацию и публикуются с закрытыми контактными данными. Система закрепляет заявку за первой откликнувшейся сиделкой, фиксирует статусы, отчёты, договоры и оплаты, отправляет напоминания.",
    images: [], results: [{ value: "2025", label: "Год реализации решения", confirmation: "Факт реализации Telegram-бота и контура учёта. Финансовую и временную эффективность оценивают по фактическим данным эксплуатации." }],
    problems: ["requests", "control", "manual"], visibility: "public", link: "/cases/caregiver-matching",
    linkLabel: "Читать кейс",
  },
  {
    id: "business-travel", client: "Автоматизация командировок", industry: "Организация командировок",
    problem: "Нужно решение для задач организации командировок?",
    solution: "Подобное решение внедрено в двух компаниях, используется в рабочих процессах, заказчики довольны результатом. Публичное описание ограничено фактом внедрения и использования для задач организации командировок.",
    images: [], results: [{ value: "2 компании", label: "Подобное решение внедрено и используется", confirmation: "Два действующих внедрения. Финансовый эффект оценивается отдельно" }],
    problems: ["travel", "manual"], visibility: "public", link: "/cases/business-travel",
    linkLabel: "Читать кейс",
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