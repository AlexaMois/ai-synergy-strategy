import { type DiagnosticForm, labelsOf, manualActionOptions, lossOptions, systemOptions, labelOf, dataStorageOptions } from "@/components/diagnostic/diagnosticConfig";

export const ASSESSMENT_STEPS = 5;
export const MEETING_PRICE = 17000;
export type AssessmentResult = { problem: string; cause: string; scale: string; solution: string; firstStep: string };

export function processHours(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+([.]\d+)?$/.test(normalized)) return null;
  const hours = Number(normalized);
  return Number.isFinite(hours) && hours > 0 ? hours : null;
}

export const validProcessTime = (value: string) => value === "unknown" || processHours(value) !== null;

export type ProcessKind = "document-search" | "data-reconciliation" | "contract-approval" | "lost-requests" | "production-planning" | "insufficient";

// Current work is evidence; goals, industries and checkboxes cannot establish a problem.
export function classifyProcess(form: DiagnosticForm): ProcessKind {
  const description = form.processDescription.trim().toLocaleLowerCase("ru").replace(/ё/g, "е");
  if (!description) return "insufficient";
  const text = `${form.process.toLocaleLowerCase("ru").replace(/ё/g, "е")}. ${description}`;
  const kinds: ProcessKind[] = [];
  const has = (pattern: RegExp) => pattern.test(text);
  if (has(/поиск|ищ[уе]|найти|искать|отыск|наход/) && has(/инструкц|документ|руководств|технич|чертеж/)) kinds.push("document-search");
  if (has(/свер[кяи]|сопостав|расхожд|расходятся|не совпада|несовпад|различаются|конфликт|разнятся/) && has(/данн|отчет|ремонт|статус|1с|проект|смет|закуп|материал|таблиц|источник|сумм|остат/)) kinds.push("data-reconciliation");
  if (has(/согласован|согласовы|согласовать|утвержден|утвержда|подписан|подписы|подписать/) && has(/договор|контракт/)) kinds.push("contract-approval");
  if (has(/заявк|обращен|звонк|голосов/) && has(/теря|тере|потер|пропада|пропущ|без ответа|не отвеч|не ответ|забыва|не фиксир|не запис|не учитыв/)) kinds.push("lost-requests");
  if (has(/план|расчет|рассчит|счита|потребност|комплектац/) && has(/выпуск|производств|сырь|норм.{0,20}расход|загруз.{0,20}(стан|оборуд)|издел/)) kinds.push("production-planning");
  // No arbitrary precedence when several independent problems are described.
  return kinds.length === 1 ? kinds[0] ?? "insufficient" : "insufficient";
}

type Recommendation = { focus: string; solution: string; experiment: string; criterion: string };
const recommendations: Record<Exclude<ProcessKind, "insufficient">, Recommendation> = {
  "document-search": {
    focus: "Поиск технических инструкций и документов",
    solution: "Проверить поиск по действующим документам: привязку к конкретному оборудованию или задаче, актуальную версию и ссылку на страницу-источник. Сначала проверить доступность и точность ответов, а не создавать шаблоны или закупать систему.",
    experiment: "Выберите 10 реальных вопросов, ответы на которые сотрудники ищут в инструкциях или документах. Для каждого запишите время поиска, найденный ответ, документ, версию и страницу; попросите ответственного специалиста проверить ответ. Если документы или актуальная версия недоступны, сначала выясните, кто их хранит и подтверждает.",
    criterion: "Число подтверждённых ответов из 10, число неверных или не найденных ответов и медианное время поиска в минутах. После упорядочивания документов повторите те же вопросы и сравните значения; целевой срок задайте по исходному замеру.",
  },
  "data-reconciliation": {
    focus: "Сверка данных и расхождений между источниками",
    solution: "Сопоставить одни и те же объекты и один период в исходных источниках; составить перечень расхождений и проверить каждое по первичному документу. Не объединять учёт до согласования идентификаторов, единиц и правил сверки.",
    experiment: "Возьмите одну выборку объектов из двух источников, укажите общий идентификатор и дату среза. Запишите сравниваемые значения, расхождения и подтверждение из первичных документов. Если источники или общий идентификатор не указаны, сначала уточните их.",
    criterion: "Доля объектов с расхождениями в выборке, число необъяснённых расхождений и время сверки в минутах. Повторите проверку после исправления правил и сравните с исходными значениями; неизвестные значения оставьте неизвестными.",
  },
  "contract-approval": {
    focus: "Согласование и подписание договоров",
    solution: "Проверить маршрут согласования одного договора: участники, порядок передачи, полномочия, версии документа и ожидание на каждом этапе. Менять только подтверждённый задерживающий этап, не подменять согласование сверкой сметы.",
    experiment: "Проследите один завершённый договор от поступления до согласования или подписания: отметьте время передачи и ответа каждого участника, возвраты на исправление и версии. При отсутствии отметок начните журнал для следующего договора; уточните, кто должен согласовывать и в какой срок.",
    criterion: "Полное время согласования в часах или днях, ожидание на каждом этапе и число возвратов. После изменения одного этапа сравните следующие сопоставимые договоры; отсутствие сроков или отметок не считать задержкой автоматически.",
  },
  "lost-requests": {
    focus: "Учёт входящих обращений и проверка ответов клиентам",
    solution: "Проверить, что каждое входящее обращение, включая звонки и голосовые, зарегистрировано, имеет ответственного и отмеченный ответ клиенту. Сначала найти пропуски между каналом и учётом, затем проверить правила регистрации и передачи.",
    experiment: "Возьмите 20 последовательных входящих обращений за выбранный период из журнала звонков и сообщений. Сопоставьте их с записями учёта: время поступления, регистрация, ответственный, время первого ответа и статус. Отдельно отметьте обращения без записи или ответа; уточните согласованный срок ответа, если его нет.",
    criterion: "Доля обращений без записи из 20, доля без ответа на дату проверки и медианное время первого ответа в минутах для отвеченных обращений. Не считать неотвеченное обращение потерянной продажей без подтверждения; повторить замер после изменения правил.",
  },
  "production-planning": {
    focus: "Проверка плана выпуска и расчёта потребности в сырье",
    solution: "Проверить расчёт на производственных заказах: нормы расхода и комплектацию, единицы измерения, доступные остатки с резервами, сроки поставки, доступную загрузку оборудования и ограничения плана. Не обещать автоматический расчёт до проверки исходных данных.",
    experiment: "Выберите 3 производственных заказа. Для каждого сопоставьте состав изделия и нормы расхода, количество выпуска, единицы измерения, остатки и резервы, потребность в сырье, сроки поставки и доступную загрузку оборудования. Пересчитайте потребность по подтверждённым нормам и проверьте выполнимость плана. Недостающие нормы, остатки или мощности запросите, не заменяйте предположениями.",
    criterion: "Число из 3 заказов с подтверждённой потребностью и выполнимым сроком, перечень расхождений по материалам в их единицах и время расчёта. Неподтверждённые заказы отмечать отдельно, не считать выполнимыми; повторить после исправления исходных данных.",
  },
};

export function assessProcess(form: DiagnosticForm): AssessmentResult {
  const kind = classifyProcess(form);
  const recommendation = kind === "insufficient" ? null : recommendations[kind];
  const currentWork = `${form.process} ${form.processDescription}`.toLocaleLowerCase("ru").replace(/ё/g, "е");
  const materialReconciliation = kind === "data-reconciliation" && /смет|материал|номенклатур/.test(currentWork);
  const repairReconciliation = kind === "data-reconciliation" && /ремонт|механик|машин|автомобил/.test(currentWork);
  const noCriticalLoss = form.losses.length === 1 && form.losses[0] === "10";
  const clarification = "Недостаточно сведений, чтобы однозначно определить тип проблемы и выбрать решение. Уточните: какое одно действие выполняется, с какими документами или данными, между какими участниками и где именно возникает ошибка или ожидание? Если описаны несколько проблем, выберите одну для первой проверки.";
  let experiment = recommendation?.experiment ?? clarification;
  if (materialReconciliation) experiment = "Выберите 10 позиций материалов с расхождениями в сравниваемых источниках (проект, смета и закупка — только если они используются). Сопоставьте номенклатуру, единицы измерения, объёмы и цены на одну дату и для одной версии проекта; запишите исходные значения, расхождения и подтверждающий документ. Не пересчитывайте несовместимые единицы без согласованного коэффициента. Отдельно отметьте позиции, для которых не хватает данных.";
  else if (repairReconciliation) experiment = "Выберите 20 записей о ремонте за один период. Для одной и той же машины и одного ремонта сопоставьте отчёт механика и второй источник (если используется 1С — запись в 1С) по идентификатору машины, дате, виду ремонта и статусу. Составьте список конфликтующих статусов и отсутствующих записей; проверьте их по первичным документам. Если общего идентификатора нет, сначала согласуйте его.";
  const hours = processHours(form.hoursPerWeek);
  const losses = labelsOf(lossOptions, form.losses);
  const actions = labelsOf(manualActionOptions, form.manualActions);
  const criterion = recommendation?.criterion ?? "После уточнения выберите один наблюдаемый показатель: время выполнения, число ошибок или долю необработанных случаев; запишите исходное значение. Сейчас данных для предметного критерия недостаточно.";
  return {
    problem: `${recommendation?.focus ?? "Тип проблемы пока не определён"}. ${form.consequences.trim() ? `По вашим словам: ${form.consequences.trim()}.` : "Последствия не описаны."}${losses.length ? ` Отмеченные потери: ${losses.join(", ")}.` : ""}`,
    cause: `${noCriticalLoss ? "Критичные потери не отмечены. " : ""}Причина не установлена: недостаточно данных о конкретных случаях.${recommendation ? ` Участок проверки по описанию: ${recommendation.focus.toLocaleLowerCase("ru")}. ${recommendation.solution}` : ` ${clarification}`} Это направление проверки, а не доказанная причина.`,
    scale: `${/^\d+$/.test(form.participants.trim()) && Number(form.participants) > 0 ? `${form.participants.trim()} сотрудников` : "Число участников неизвестно"} · ${hours === null ? "Время на процесс пока неизвестно. Недостаточно данных для оценки часов и возможной экономии." : `${hours} ч в неделю суммарно · около ${hours * 4} ч за 4 недели. Это нагрузка всего процесса, а не обещанная экономия.`}${actions.length ? ` Ручные действия: ${actions.join(", ")}.` : ""}`,
    solution: recommendation?.solution ?? clarification,
    firstStep: `${experiment} Критерий проверки: ${criterion}${form.successCriteria.trim() ? ` Ваш показатель: «${form.successCriteria.trim()}».` : ""}${form.goal.trim() ? ` Ваша цель: «${form.goal.trim()}»; достижение пока не проверено.` : ""} Размер выборки — предложение для первого теста, а не сведения о вашей компании; если случаев меньше, используйте доступные и укажите фактическое количество.`,
  };
}

export const assessmentSections = (result: AssessmentResult) => [
  ["Главная проблема", result.problem], ["Предполагаемая причина", result.cause],
  ["Масштаб ручной работы", result.scale], ["Возможное решение", result.solution],
  ["Первый шаг", result.firstStep],
];

export function assessmentText(form: DiagnosticForm, result: AssessmentResult) {
  return [
    `Процесс: ${form.process}`, `Как устроен: ${form.processDescription}`,
    `Инструменты: ${labelsOf(systemOptions, form.systems).join(", ")}`,
    `Данные: ${labelOf(dataStorageOptions, form.dataStorage)}`,
    ...assessmentSections(result).map(([title, value]) => `${title}: ${value}`),
    "Предварительная оценка по вашим ответам, не аудит и не расчёт окупаемости.",
  ].join("\n\n");
}