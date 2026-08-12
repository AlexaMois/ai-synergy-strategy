/* Состояние самостоятельной анкеты, доступное и странице /start, и глобальному попапу. */

const KEY_STARTED = "self-start-form-started";
const KEY_SUBMITTED = "self-start-form-submitted";
const KEY_POPUP_SHOWN = "self-start-popup-shown";

type Listener = () => void;
const listeners = new Set<Listener>();

const read = (key: string) => {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};

const write = (key: string) => {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* приватный режим */
  }
  listeners.forEach((l) => l());
};

export const isDiagnosticStarted = () => read(KEY_STARTED);
export const isDiagnosticSubmitted = () => read(KEY_SUBMITTED);
export const isExitPopupShown = () => read(KEY_POPUP_SHOWN);

export const markDiagnosticStarted = () => write(KEY_STARTED);
export const markDiagnosticSubmitted = () => write(KEY_SUBMITTED);
export const markExitPopupShown = () => write(KEY_POPUP_SHOWN);

export const subscribeDiagnosticState = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/* флаг автозапуска анкеты при переходе с другой страницы */
export const AUTOSTART_FLAG = "self-start-autostart";

export const requestDiagnosticAutostart = () => {
  try {
    sessionStorage.setItem(AUTOSTART_FLAG, "1");
  } catch {
    /* ignore */
  }
};

export const consumeDiagnosticAutostart = () => {
  try {
    const v = sessionStorage.getItem(AUTOSTART_FLAG) === "1";
    if (v) sessionStorage.removeItem(AUTOSTART_FLAG);
    return v;
  } catch {
    return false;
  }
};
