import { type DiagnosticForm, labelsOf, manualActionOptions, lossOptions, systemOptions, labelOf, dataStorageOptions } from "@/components/diagnostic/diagnosticConfig";

export const ASSESSMENT_STEPS = 5;
export const MEETING_PRICE = 17000;
export type AssessmentResult = { problem: string; cause: string; scale: string; solution: string; firstStep: string };

export function assessProcess(form: DiagnosticForm): AssessmentResult {
  const scattered = ["3", "4"].includes(form.dataStorage);
  const documents = form.manualActions.some(id => ["2", "4", "6"].includes(id));
  const requests = form.manualActions.some(id => ["1", "5", "8", "10"].includes(id));
  const stock = form.manualActions.some(id => ["11", "12"].includes(id));
  const noCriticalLoss = form.losses.length === 1 && form.losses[0] === "10";
  const cause = noCriticalLoss
    ? "Критичные потери не отмечены. Возможный резерв — повторяющиеся ручные действия; подтвердите его наблюдением за процессом."
    : scattered
      ? "Возможно, данные разрознены и нет единого учёта статусов и ответственных. Проверьте это на конкретных примерах."
      : documents
        ? "Возможно, поиск документов и повторный ввод данных не организованы по единым правилам. Проверьте актуальность источников и шаблонов."
        : "Возможно, ручные передачи между участниками и отсутствие единых правил создают задержки. Проследите путь одной задачи.";
  const solution = scattered
    ? "Сначала собрать данные, статусы и ответственных в одном учёте; затем проверить автоматизацию повторяющихся действий."
    : documents
      ? "Проверить единые шаблоны документов, заполнение из исходных данных и поиск с указанием источников."
      : requests
        ? "Проверить единый учёт обращений с ответственными, сроками и напоминаниями."
        : stock
          ? "Проверить сведение остатков, потребностей и сроков в единый учёт с согласованными правилами расчёта."
          : "Зафиксировать правила процесса и проверить автоматизацию одного повторяющегося действия в существующих системах.";
  const hours = Number(form.hoursPerWeek.replace(",", "."));
  return {
    problem: `${form.consequences.trim()} Отмеченные потери: ${labelsOf(lossOptions, form.losses).join(", ")}.`,
    cause,
    scale: `${form.participants} сотрудников · ${hours} ч в неделю суммарно · около ${hours * 4} ч за 4 недели. Ручные действия: ${labelsOf(manualActionOptions, form.manualActions).join(", ")}. Это нагрузка всего процесса, а не обещанная экономия.`,
    solution,
    firstStep: `Зафиксируйте путь одного реального случая процесса «${form.process.trim()}»: действия, время, передачи и ошибки. Сравните исходное значение показателя «${form.successCriteria.trim()}» с целью «${form.goal.trim()}», затем выберите одно действие для пробной автоматизации.`,
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