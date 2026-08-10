// Единая точка отправки всех форм сайта.
//
// Этап 2 (постоянная схема): все формы уходят только на обработчик в Yandex Cloud
// (ru-central1, https://forms.aleksamois.ru) → Bpium → MAX (бот «НейроСекретарь», только номер записи).
// Автоматического возврата к иностранному маршруту нет: если VITE_FORMS_BASE_URL не задан,
// отправка завершается безопасной ошибкой и данные никуда не уходят.

export type FormsEndpoint = "short-lead" | "diagnostic" | "stylist-lead";

const BASE = (import.meta.env.VITE_FORMS_BASE_URL as string | undefined)?.replace(/\/+$/, "") || "";

export const isRuFormsRouteEnabled = () => BASE.length > 0;

export interface FormsResult<T = Record<string, unknown>> {
  ok: boolean;
  recordId?: string;
  error?: string;
  fields?: Record<string, string[]>;
  data?: T;
}

const GENERIC_ERROR =
  "Не удалось отправить заявку. Попробуйте ещё раз или напишите на ai@aleksamois.ru";

const NOT_CONFIGURED_ERROR =
  "Отправка форм временно недоступна. Напишите на ai@aleksamois.ru или в Telegram.";

export async function submitForm(
  endpoint: FormsEndpoint,
  body: Record<string, unknown>,
): Promise<FormsResult> {
  if (!BASE) return { ok: false, error: NOT_CONFIGURED_ERROR };
  try {
    // Страница отправки — единственное дополнительное поле для уведомления в MAX (без ПДн).
    const pageUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "";
    const res = await fetch(`${BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageUrl, ...body }),
    });
    const payload = (await res.json().catch(() => null)) as FormsResult | null;
    if (!res.ok || !payload?.ok) {
      return { ok: false, error: payload?.error || GENERIC_ERROR, fields: payload?.fields };
    }
    return payload;
  } catch {
    return { ok: false, error: "Сервис временно недоступен. Попробуйте позже." };
  }
}

export interface UploadResult {
  ok: boolean;
  path?: string;
  error?: string;
}

/** Загрузка фото анкеты в Object Storage (ru-central1) по предподписанной ссылке. */
export async function uploadFormFile(file: File, contentType: string): Promise<UploadResult> {
  if (!BASE) return { ok: false, error: NOT_CONFIGURED_ERROR };
  try {
    const signRes = await fetch(`${BASE}/upload-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name || "photo.jpg", contentType, size: file.size }),
    });
    const signed = (await signRes.json().catch(() => null)) as
      | { ok?: boolean; url?: string; key?: string; error?: string }
      | null;
    if (!signRes.ok || !signed?.url || !signed?.key) {
      return { ok: false, error: signed?.error || "Не удалось подготовить загрузку фото" };
    }
    const put = await fetch(signed.url, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    if (!put.ok) return { ok: false, error: "Не удалось загрузить фото. Попробуйте снова." };
    return { ok: true, path: signed.key };
  } catch {
    return { ok: false, error: "Не удалось загрузить фото. Проверьте интернет." };
  }
}