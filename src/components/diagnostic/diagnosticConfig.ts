// Конфигурация анкеты «Первичная разбор бизнес-процессов компании».
// Значения id соответствуют вариантам каталога Bpium 81 — менять их нельзя.

export type Option = { id: string; label: string };

export const manualActionOptions: Option[] = [
  { id: "1", label: "Заявки и обращения клиентов" },
  { id: "2", label: "Подготовка КП, договоров, счетов" },
  { id: "3", label: "Отчёты и таблицы" },
  { id: "4", label: "Документооборот" },
  { id: "5", label: "Продажи и контроль менеджеров" },
  { id: "6", label: "Поиск информации" },
  { id: "7", label: "Согласования" },
  { id: "8", label: "Задачи в мессенджерах" },
  { id: "9", label: "Обучение сотрудников" },
  { id: "10", label: "Клиентская поддержка" },
  { id: "11", label: "Закупки и тендеры" },
  { id: "12", label: "Производство, логистика, склад" },
  { id: "13", label: "Другое" },
];

export const frequencyOptions: Option[] = [
  { id: "1", label: "Несколько раз в день" },
  { id: "2", label: "Каждый день" },
  { id: "3", label: "Несколько раз в неделю" },
  { id: "4", label: "Редко или по ситуации" },
];

export const lossOptions: Option[] = [
  { id: "1", label: "Время сотрудников" },
  { id: "2", label: "Заявки клиентов" },
  { id: "3", label: "Документы" },
  { id: "4", label: "Задачи" },
  { id: "5", label: "Деньги" },
  { id: "6", label: "Сроки" },
  { id: "7", label: "Информация между отделами" },
  { id: "8", label: "Контроль руководителя" },
  { id: "9", label: "Качество работы" },
  { id: "10", label: "Ничего критичного, хотим просто разобраться" },
  { id: "11", label: "Другое" },
];

export const systemOptions: Option[] = [
  { id: "1", label: "1С" },
  { id: "2", label: "Битрикс24" },
  { id: "3", label: "amoCRM" },
  { id: "4", label: "Bpium" },
  { id: "5", label: "Excel или Google Таблицы" },
  { id: "6", label: "Мессенджеры" },
  { id: "7", label: "Почта" },
  { id: "8", label: "Телефония" },
  { id: "9", label: "Сайт или форма заявок" },
  { id: "10", label: "Складская система" },
  { id: "11", label: "СЭД" },
  { id: "12", label: "Всё вручную" },
  { id: "13", label: "Другое" },
];

export const aiUsageOptions: Option[] = [
  { id: "1", label: "Да, регулярно" },
  { id: "2", label: "Да, но хаотично" },
  { id: "3", label: "Пробовали, но пользы пока мало" },
  { id: "4", label: "Пока нет" },
  { id: "5", label: "Хотим понять, где это может быть полезно" },
];

export const dataStorageOptions: Option[] = [
  { id: "1", label: "В CRM или системе" },
  { id: "2", label: "В Excel или таблицах" },
  { id: "3", label: "В мессенджерах или почте" },
  { id: "4", label: "На бумаге или вручную" },
];

export const urgencyOptions: Option[] = [
  { id: "1", label: "В ближайшую неделю" },
  { id: "2", label: "В течение месяца" },
  { id: "3", label: "В течение 2–3 месяцев" },
  { id: "4", label: "Пока изучаем варианты" },
  { id: "5", label: "Срок зависит от стоимости и формата" },
];

export const budgetOptions: Option[] = [
  { id: "1", label: "До 50 000 ₽" },
  { id: "2", label: "50 000–150 000 ₽" },
  { id: "3", label: "150 000–300 000 ₽" },
  { id: "4", label: "300 000–500 000 ₽" },
  { id: "5", label: "500 000–1 000 000 ₽" },
  { id: "6", label: "Более 1 000 000 ₽" },
  { id: "7", label: "Бюджет зависит от расчёта окупаемости" },
  { id: "8", label: "Бюджет пока не определён" },
];

export const decisionMakerOptions: Option[] = [
  { id: "1", label: "Я принимаю решение" },
  { id: "2", label: "Я влияю на решение" },
  { id: "3", label: "Решение принимает собственник" },
  { id: "4", label: "Решение принимает директор" },
  { id: "5", label: "Решение принимают несколько человек" },
  { id: "6", label: "Пока не определено" },
];

export const readyForCallOptions: Option[] = [
  { id: "1", label: "Да" },
  { id: "2", label: "Скорее да" },
  { id: "3", label: "Нужно согласовать" },
  { id: "4", label: "Пока нет" },
];

export const teamSizeOptions: Option[] = [
  { id: "1", label: "1–3 человека" },
  { id: "2", label: "4–10 человек" },
  { id: "3", label: "11–30 человек" },
  { id: "4", label: "31–50 человек" },
  { id: "5", label: "51–100 человек" },
  { id: "6", label: "100+ человек" },
];

export const wantsDraftOptions: Option[] = [
  { id: "1", label: "Да, можно" },
  { id: "2", label: "Сначала хочу обсудить задачу" },
  { id: "3", label: "Пока хочу только узнать варианты" },
];

export const labelOf = (options: Option[], id?: string) =>
  options.find((o) => o.id === id)?.label ?? "";

export const labelsOf = (options: Option[], selected: string[]) =>
  selected.map((id) => labelOf(options, id)).filter(Boolean);

export type DiagnosticForm = {
  process: string;
  manualActions: string[];
  processDescription: string;
  participants: string;
  frequency: string;
  hoursPerWeek: string;
  losses: string[];
  consequences: string;
  systems: string[];
  aiUsage: string;
  dataStorage: string;
  goal: string;
  successCriteria: string;
  urgency: string;
  budget: string;
  decisionMaker: string;
  readyForCall: string;
  companyOwner: string;
  companyName: string;
  industry: string;
  city: string;
  website: string;
  teamSize: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  notes: string;
  wantsDraft: string;
  consent: boolean;
};

export const emptyForm: DiagnosticForm = {
  process: "",
  manualActions: [],
  processDescription: "",
  participants: "",
  frequency: "",
  hoursPerWeek: "",
  losses: [],
  consequences: "",
  systems: [],
  aiUsage: "",
  dataStorage: "",
  goal: "",
  successCriteria: "",
  urgency: "",
  budget: "",
  decisionMaker: "",
  readyForCall: "",
  companyOwner: "",
  companyName: "",
  industry: "",
  city: "",
  website: "",
  teamSize: "",
  name: "",
  position: "",
  phone: "",
  email: "",
  notes: "",
  wantsDraft: "",
  consent: false,
};

// Готовность к следующему шагу — детерминированный расчёт без случайности и без ROI.
//
// Правила (максимум 12 баллов):
// 1. Частота процесса:      1 или 2 → 2 | 3 → 1 | 4 → 0
// 2. Использование ИИ:      1 → 2 | 2 или 5 → 1 | 3 или 4 → 0
// 3. Хранение данных:       1 → 2 | 2 → 1 | 3 или 4 → 0
// 4. Кто принимает решение: 1 или 2 → 2 | 3 или 4 → 1 | 5 или 6 → 0
// 5. Готовность к звонку:   1 → 2 | 2 → 1 | 3 или 4 → 0
// 6. Срочность:             1 или 2 → 2 | 3 → 1 | 4 или 5 → 0
//
// Итог: 9–12 — высокая | 5–8 — средняя | 0–4 — низкая.
const pick = (map: Record<string, number>, id: string) => map[id] ?? 0;

export function readinessScore(f: DiagnosticForm): number {
  return (
    pick({ "1": 2, "2": 2, "3": 1 }, f.frequency) +
    pick({ "1": 2, "2": 1, "5": 1 }, f.aiUsage) +
    pick({ "1": 2, "2": 1 }, f.dataStorage) +
    pick({ "1": 2, "2": 2, "3": 1, "4": 1 }, f.decisionMaker) +
    pick({ "1": 2, "2": 1 }, f.readyForCall) +
    pick({ "1": 2, "2": 2, "3": 1 }, f.urgency)
  );
}

export function readinessLevel(f: DiagnosticForm): { title: string; text: string; score: number } {
  const score = readinessScore(f);
  if (score >= 9)
    return {
      score,
      title: "Высокая готовность",
      text: "Есть основания обсудить пилотный проект. Формат решения подтвердим после анализа процесса, данных и ограничений.",
    };
  if (score >= 5)
    return {
      score,
      title: "Средняя готовность",
      text: "Задача понятна, но часть данных и процессов стоит привести в порядок. Разумнее начать с разбора процесса.",
    };
  return {
    score,
    title: "Низкая готовность",
    text: "Сначала стоит зафиксировать процесс и данные, а решение об инструментах принимать после разбора.",
  };
}
