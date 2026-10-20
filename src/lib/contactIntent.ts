export type ContactIntent = { kind: "implementation" | "meeting"; assessment?: string; process?: string; source?: "exit_popup" };
const KEY = "aleksamois.contactIntent";
export const INTENT_EVENT = "aleksamois:contact-intent";
export function readContactIntent(): ContactIntent | null {
  try {
    const data = JSON.parse(sessionStorage.getItem(KEY) || "null");
    return data && ["implementation", "meeting"].includes(data.kind) ? data : null;
  } catch { return null; }
}
export function setContactIntent(intent: ContactIntent | null) {
  try {
    if (intent) sessionStorage.setItem(KEY, JSON.stringify(intent));
    else sessionStorage.removeItem(KEY);
  } catch { /* private mode */ }
  window.dispatchEvent(new Event(INTENT_EVENT));
}
export function readIndustryContext(): { industry: string; question: string; topic: string } | null {
  try {
    const value = JSON.parse(sessionStorage.getItem("aleksamois.contactContext") || "null");
    if (!value) return null;
    return { industry: String(value.industry || ""), question: String(value.question || ""), topic: String(value.topic || "") };
  } catch { return null; }
}

export function intentTask(intent: ContactIntent | null) {
  if (!intent) return "";
  return [
    intent.kind === "meeting" ? "Запрос на услугу: Личный разбор с Александрой — 17 000 ₽ (owner-digital-session)." : "Запрос на внедрение цифрового решения.",
    intent.source === "exit_popup" ? "Источник обращения: всплывающее приглашение к самостоятельной проверке (exit_popup)." : "",
    intent.process ? `Выбранный процесс: ${intent.process}` : "",
    intent.assessment ? `Результат бесплатной проверки:\n${intent.assessment}` : "",
  ].filter(Boolean).join("\n\n");
}