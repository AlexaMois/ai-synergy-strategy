import { type DiagnosticForm } from "@/components/diagnostic/diagnosticConfig";
import { clientAssessmentInputs, type AssessmentResult } from "./processAssessment";

export type ClientAssessment = {
  date: string;
  process: string;
  industry: string;
  question: string;
  state: "complete" | "insufficient" | "conflicting";
  status: string;
  metrics: { id: string; label: string; value: string }[];
  metricNote: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
  caveat: string;
};

export function buildClientAssessment(form: DiagnosticForm, result: AssessmentResult, date = new Date()): ClientAssessment {
  const { scenario, facts, universal, frequency, storage, causeHint } = clientAssessmentInputs(form);
  const { actions, losses, systems, hours } = facts;
  const conflict = facts.conflict || (form.losses.includes("10") && form.losses.some(id => id !== "10"));
  const sufficient = scenario ? facts.ready : !!universal?.recommendation && facts.hasLoss && !!form.consequences.trim() && actions.length > 0;
  const state = conflict ? "conflicting" : sufficient ? "complete" : "insufficient";
  const status = state === "complete" ? "Есть основание для проверки гипотезы" : state === "conflicting" ? "Требуется сверка ответов" : "Требуется исходный замер";
  const process = form.process.trim() || scenario?.process || "Выбранный процесс";
  const action = actions[0] || process;
  const missing: string[] = [];
  if (!form.processDescription.trim() || (scenario && !facts.relevant) || (!scenario && !universal?.recommendation)) missing.push("конкретный случай выполнения процесса");
  if (!form.consequences.trim() || !facts.hasLoss) missing.push("наблюдаемое последствие");
  if (!actions.length) missing.push("ручное действие");
  if (hours === null) missing.push("фактическое время выполнения");
  const cause = state === "complete"
    ? scenario ? "Гипотеза: " + scenario.cause : "Причина пока не установлена. " + causeHint
    : state === "conflicting" ? "Причина пока не установлена. Ответы требуют сверки: отмеченные потери и описанные последствия следует проверить раздельно."
    : "Причина пока не установлена. Уточнить: " + (missing.length ? missing.join(", ") : "источник данных и наблюдаемое отклонение") + ".";
  const solution = state === "complete" ? "При подтверждении гипотезы: " + (scenario?.solution || result.solution)
    : "Сначала зафиксировать исходные данные по выбранному процессу. Решение о дальнейшем изменении принять по результатам замера.";
  const experiment = scenario?.experiment || universal?.recommendation && universal.experiment || "Возьмите ближайший реальный случай процесса «" + process + "». Запишите действие, ответственного, источник данных, время начала и окончания и наблюдаемый результат.";
  const firstStep = state === "complete" ? experiment + " Ответственный за процесс подтверждает результаты."
    : state === "conflicting" ? "Ответственный за процесс: сопоставьте описанные последствия с первичными данными, измерьте время работы и заявленное отклонение раздельно. " + experiment
    : "Ответственный за процесс: начните с действия «" + action + "». " + experiment + " Зафиксируйте фактическое время и наблюдаемое отклонение.";
  const criterion = scenario?.criterion || universal?.recommendation?.criterion || "Зафиксированы исходное время выполнения, наблюдаемое отклонение и подтверждающий источник.";
  const sections = [
    { id: "situation", title: "Текущая ситуация и потери", paragraphs: [
      form.processDescription.trim() ? "Как устроен процесс: " + form.processDescription.trim() : "Описание процесса требует уточнения.",
      form.consequences.trim() ? "Последствия по вашим ответам: " + form.consequences.trim() : "Последствия предстоит уточнить.",
      losses.length ? "Отмечено: " + losses.join(", ") + "." : "",
      actions.length ? "Ручные действия: " + actions.join("; ") + "." : "",
      systems.length ? "Инструменты: " + systems.join(", ") + "." : "",
      storage ? "Хранение данных: " + storage + "." : "",
    ].filter(Boolean) },
    { id: "cause", title: "Возможная причина", paragraphs: [cause] },
    { id: "solution", title: "Рекомендуемое решение", paragraphs: [solution] },
    { id: "firstStep", title: "Первый шаг", paragraphs: [firstStep] },
    { id: "criteria", title: "Критерии проверки", paragraphs: [criterion, form.successCriteria.trim() ? "Ваш показатель: " + form.successCriteria.trim() : "", state !== "complete" ? "Сначала получите исходные значения; затем определите целевой результат." : "Сравните сопоставимые случаи до и после изменения."].filter(Boolean) },
    ...(form.goal.trim() ? [{ id: "goal", title: "Ваша цель", paragraphs: [form.goal.trim()] }] : []),
  ];
  return {
    date: date.toLocaleDateString("ru-RU"), process,
    industry: scenario?.industry || form.industry.trim() || "Отрасль уточняется",
    question: scenario?.question || "", state, status,
    metrics: [
      { id: "participants", label: "Участники", value: /^\d+$/.test(form.participants.trim()) && Number(form.participants) > 0 ? form.participants.trim() : "Уточнить" },
      { id: "week", label: "В неделю", value: hours === null ? "Уточнить" : hours + " ч" },
      { id: "fourWeeks", label: "За 4 недели", value: hours === null ? "Уточнить" : hours * 4 + " ч" },
      { id: "frequency", label: "Частота", value: frequency || "Уточнить" },
    ],
    metricNote: hours === null ? "Время пока неизвестно. Требуется замер суммарной нагрузки." : "Часы отражают суммарную нагрузку всех участников. Потенциальную экономию предстоит оценить отдельно.",
    sections,
    caveat: "Предварительная оценка по вашим ответам. Для подтверждения причины, эффекта и окупаемости требуется проверка на данных процесса.",
  };
}
