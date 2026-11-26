import { type DiagnosticForm, labelsOf, manualActionOptions, lossOptions, systemOptions, labelOf, dataStorageOptions, frequencyOptions, scenarioCategoryIds } from "@/components/diagnostic/diagnosticConfig";
import { getIndustryScenario, type IndustryScenario } from "@/data/industryScenarios";

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
  // Negated or contradicted cues cannot safely justify a problem classification.
  if (/не\s+(теря\w*|пропада\w*|ищ\w*|согласовы\w*|планиру\w*)|(?:заявк\w*|обращен\w*|расхожд\w*|согласован\w*).{0,25}нет(?:[\s.,;!?]|$)|нет\s+(?:потер\w*|расхожд\w*|необходимости\s+согласовы\w*)|без\s+(?:потер\w*|расхожд\w*)/u.test(text)) return "insufficient";
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
const causeChecks: Record<Exclude<ProcessKind, "insufficient">, string> = {
  "document-search": "Проверьте доступность актуальной инструкции и точность поиска на реальных вопросах.",
  "data-reconciliation": "Проверьте совпадение объектов, дат среза, единиц и первичных документов в источниках.",
  "contract-approval": "Проверьте, на каком этапе договор ожидает ответа и сколько раз возвращается на исправление.",
  "lost-requests": "Проверьте переход от входящего звонка или сообщения к регистрации и ответу клиенту.",
  "production-planning": "Проверьте подтверждение норм, остатков, резервов и доступной мощности для выбранных заказов.",
};
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

const actionLabels = (form: DiagnosticForm) => {
  const scenario = getIndustryScenario(form.scenarioId);
  if (scenario) return [...scenario.actions.filter(a => form.selectedActionIds.includes(a.id)).map(a => a.label), ...(form.selectedActionIds.includes(scenario.id + "-other") && form.otherAction.trim() ? [form.otherAction.trim()] : [])];
  return [...labelsOf(manualActionOptions, form.manualActions.filter(id => id !== "13")), ...(form.manualActions.includes("13") ? [form.otherAction.trim() || "Другое"] : [])];
};
const actualLosses = (form: DiagnosticForm) => [...labelsOf(lossOptions, form.losses.filter(id => id !== "11")), ...(form.losses.includes("11") ? [form.otherLoss.trim() || "Другое"] : [])];
const actualSystems = (form: DiagnosticForm) => [...labelsOf(systemOptions, form.systems.filter(id => id !== "13")), ...(form.systems.includes("13") ? [form.otherSystem.trim() || "Другое"] : [])];
const normalizeEvidence = (s: string) => s.toLocaleLowerCase("ru").replace(/ё/g, "е").trim();

function assessScenario(form: DiagnosticForm, scenario: IndustryScenario): AssessmentResult {
  const description = normalizeEvidence(form.processDescription);
  const consequences = normalizeEvidence(form.consequences);
  const actions = actionLabels(form);
  const losses = actualLosses(form);
  const systems = actualSystems(form);
  const hours = processHours(form.hoursPerWeek);
  const conflict = /(?:нет|без)\s+(?:потерь|ошибок|расхождений|задержек|простоев)|не\s+(?:теря\S*|пропада\S*|ищ\S*|задержива\S*|сверя\S*|простаива\S*|согласовы\S*)/u.test(description + " " + consequences);
  const relevant = new RegExp(scenario.evidencePattern, "u").test(description);
  const negatedOutcome = /(?:потерь|ошибок|расхождений|задержек|простоев)\s+нет|(?:заявки|обращения)\s+не\s+теряются/u.test(description + " " + consequences);
  const explicitAbsence = /(?:^|[\s.,;!?])(?:(?:нет|без|отсутствие)\s+(?:потерь|потери|ошибки|ошибок|расхождения|расхождений|задержки|задержек|простоя|простоев)|(?:потеря|потери|потерь|ошибка|ошибки|ошибок|расхождение|расхождения|расхождений|задержка|задержки|задержек|простой|простоя|простои|простоев)\s+(?:нет|отсутствует|отсутствуют))(?=$|[\s.,;!?])/u.test(description + " " + consequences);
  const hasLoss = form.losses.length > 0 && !form.losses.includes("10");
  const ready = description.length >= 12 && relevant && consequences.length > 0 && actions.length > 0 && hasLoss && !conflict && !negatedOutcome && !explicitAbsence;
  const clarify = "Уточните одно фактически выполняемое действие, используемые документы или данные, наблюдаемую задержку либо ошибку и ответственного. Выбранная тема сама по себе не доказывает проблему. Сначала замерьте исходное состояние.";
  const goal = form.goal.trim() ? " Ваша цель: «" + form.goal.trim() + "»; её достижение предстоит проверить." : "";
  const criterion = form.successCriteria.trim() ? " Ваш показатель: «" + form.successCriteria.trim() + "»." : "";
  const frequency = labelOf(frequencyOptions, form.frequency);
  return {
    problem: "Выбранный процесс: " + scenario.process + ". " + (form.consequences.trim() ? "По вашим словам: " + form.consequences.trim() + "." : "Последствия пока неизвестны.") + (losses.length ? " Отмеченные потери: " + losses.join(", ") + "." : ""),
    cause: ready ? "Гипотеза для проверки: " + scenario.cause + " Подтвердите её на фактических случаях." : "Причина пока не установлена. " + clarify,
    scale: (/^\d+$/.test(form.participants.trim()) && Number(form.participants) > 0 ? form.participants.trim() + " сотрудников" : "Число участников неизвестно") + " · " + (hours === null ? "Время пока неизвестно. Для оценки нагрузки требуется замер." : hours + " ч в неделю суммарно · около " + hours * 4 + " ч за 4 недели. Это нагрузка всего процесса, а не обещанная экономия.") + (frequency ? " Частота: " + frequency + "." : "") + (actions.length ? " Ручные действия: " + actions.join(", ") + "." : ""),
    solution: ready ? "При подтверждении проблемы на данных: " + scenario.solution + (systems.length ? " Используемые инструменты по вашим ответам: " + systems.join(", ") + ". Проверьте фактические источники и доступы." : "") : clarify,
    firstStep: (ready ? "Первый тест: " + scenario.experiment + " Начните с отмеченных действий: " + actions.join(", ") + ". Критерий: " + scenario.criterion + " Сравните значения до и после; объём выборки ориентировочный, используйте доступные случаи." : clarify + " Критерий первого шага: зафиксированы исходные значения времени, ошибок или задержек.") + criterion + goal,
  };
}

export function assessProcess(form: DiagnosticForm): AssessmentResult {
  const scenario = getIndustryScenario(form.scenarioId);
  if (scenario) return assessScenario(form, scenario);
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
  const losses = actualLosses(form);
  const actions = actionLabels(form);
  const criterion = recommendation?.criterion ?? "После уточнения выберите один наблюдаемый показатель: время выполнения, число ошибок или долю необработанных случаев; запишите исходное значение. Сейчас данных для предметного критерия недостаточно.";
  return {
    problem: `${recommendation?.focus ?? "Тип проблемы пока не определён"}. ${form.consequences.trim() ? `По вашим словам: ${form.consequences.trim()}.` : "Последствия не описаны."}${losses.length ? ` Отмеченные потери: ${losses.join(", ")}.` : ""}`,
    cause: `${noCriticalLoss ? "Критичные потери не отмечены. " : ""}Причина не установлена: недостаточно данных о конкретных случаях. ${kind === "insufficient" ? "Сначала уточните одно действие и наблюдаемую проблему." : causeChecks[kind]} Это направление проверки, а не доказанная причина.`,
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
  const scenario = getIndustryScenario(form.scenarioId);
  const categoryIds = scenario ? scenarioCategoryIds(scenario, form.selectedActionIds) : form.manualActions;
  return [
    ...(scenario ? [`Отрасль: ${scenario.industry}`, `Выбранная проблема: ${scenario.question}`, `ID сценария: ${scenario.id}`, `ID выбранных действий: ${form.selectedActionIds.join(", ")}`] : []),
    `Процесс: ${form.process}`, `Как устроен: ${form.processDescription}`,
    `Частота: ${labelOf(frequencyOptions, form.frequency)}`,
    `Категории действий Bpium (поле 15): ${categoryIds.join(", ")}`,
    `Инструменты: ${actualSystems(form).join(", ")}`,
    `Данные: ${labelOf(dataStorageOptions, form.dataStorage)}`,
    ...assessmentSections(result).map(([title, value]) => `${title}: ${value}`),
    "Предварительная оценка по вашим ответам, не аудит и не расчёт окупаемости.",
  ].join("\n\n");
}