/* Состояние анкеты и ограничения повторного показа приглашения. */
const KEY_STARTED = "self-start-form-started";
const KEY_SUBMITTED = "self-start-form-submitted";
const KEY_POPUP_SHOWN = "self-start-popup-shown";
const KEY_POPUP_UNTIL = "self-start-popup-suppressed-until-v1";
const KEY_COMPLETED_UNTIL = "self-start-popup-completed-until-v1";
const KEY_SOURCE = "self-start-source";
const DAY_MS = 24 * 60 * 60 * 1000;

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach((listener) => listener());

const readSession = (key: string) => {
  try { return sessionStorage.getItem(key) === "1"; }
  catch { return false; }
};
const writeSession = (key: string, value: string) => {
  try { sessionStorage.setItem(key, value); }
  catch { /* storage may be unavailable */ }
  notify();
};

let fallbackUntil: Record<string, number> = {};
const readUntil = (key: string): number => {
  try {
    const timestamp = Number(localStorage.getItem(key));
    return Number.isFinite(timestamp) && timestamp > 0
      ? Math.max(timestamp, fallbackUntil[key] || 0)
      : fallbackUntil[key] || 0;
  } catch {
    return fallbackUntil[key] || 0;
  }
};
const suppressUntil = (key: string, days: number) => {
  const until = Math.max(readUntil(key), Date.now() + days * DAY_MS);
  fallbackUntil[key] = until;
  try { localStorage.setItem(key, String(until)); }
  catch { /* fall back to current-tab memory */ }
  notify();
};

export const isDiagnosticStarted = () => readSession(KEY_STARTED);
export const isDiagnosticSubmitted = () => readSession(KEY_SUBMITTED) || readUntil(KEY_COMPLETED_UNTIL) > Date.now();
export const isExitPopupShown = () => readSession(KEY_POPUP_SHOWN);
export const isExitPopupSuppressed = () =>
  isDiagnosticStarted() || isDiagnosticSubmitted() || readUntil(KEY_POPUP_UNTIL) > Date.now();

export const markDiagnosticStarted = () => writeSession(KEY_STARTED, "1");
export const markDiagnosticSubmitted = () => {
  writeSession(KEY_SUBMITTED, "1");
  suppressUntil(KEY_COMPLETED_UNTIL, 90);
};
export const markExitPopupShown = () => writeSession(KEY_POPUP_SHOWN, "1");
export const markExitPopupDismissed = () => suppressUntil(KEY_POPUP_UNTIL, 14);
export const markExitPopupAccepted = () => {
  suppressUntil(KEY_POPUP_UNTIL, 14);
  try { sessionStorage.setItem(KEY_SOURCE, "exit_popup"); }
  catch { /* storage may be unavailable */ }
};
export const getDiagnosticSource = (): "exit_popup" | null => {
  try { return sessionStorage.getItem(KEY_SOURCE) === "exit_popup" ? "exit_popup" : null; }
  catch { return null; }
};

export const subscribeDiagnosticState = (listener: Listener) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

/* Флаг запуска анкеты при переходе из другого раздела. */
const AUTOSTART_FLAG = "self-start-autostart";
export const requestDiagnosticAutostart = () => {
  try { sessionStorage.setItem(AUTOSTART_FLAG, "1"); }
  catch { /* storage may be unavailable */ }
};
export const consumeDiagnosticAutostart = () => {
  try {
    const active = sessionStorage.getItem(AUTOSTART_FLAG) === "1";
    if (active) sessionStorage.removeItem(AUTOSTART_FLAG);
    return active;
  } catch {
    return false;
  }
};
