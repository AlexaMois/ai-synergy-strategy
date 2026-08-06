// Единая точка отправки всех форм сайта.
//
// Этап 2: при заданном VITE_FORMS_BASE_URL (https://forms.aleksamois.ru) все формы уходят
// на обработчик в Yandex Cloud (ru-central1) → Bpium → Telegram только с номером записи.
// Пока переменная не задана, используется прежний путь через Lovable Cloud (обратная совместимость).

import { supabase } from "@/integrations/supabase/client";

export type FormsEndpoint = "short-lead" | "diagnostic" | "stylist-lead";

const FALLBACK_FUNCTIONS: Record<FormsEndpoint, string> = {
  "short-lead": "submit-short-lead",
  diagnostic: "submit-diagnostic",
  "stylist-lead": "save-stylist-lead",
};

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

export async function submitForm(
  endpoint: FormsEndpoint,
  body: Record<string, unknown>,
): Promise<FormsResult> {
  if (BASE) {
    try {
      const res = await fetch(`${BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

  // Прежний маршрут (используется, пока не переключён поддомен forms.aleksamois.ru)
  const { data, error } = await supabase.functions.invoke(FALLBACK_FUNCTIONS[endpoint], { body });

  let failure: FormsResult | null = null;
  const ctx = (error as { context?: Response } | null)?.context;
  if (error && typeof ctx?.json === "function") {
    try {
      failure = (await ctx.clone().json()) as FormsResult;
    } catch {
      /* ignore */
    }
  }
  const dataErr = (data as FormsResult | null)?.error ? (data as FormsResult) : null;
  const problem = failure || dataErr;

  if (error || problem) {
    return {
      ok: false,
      error: problem?.error || error?.message || GENERIC_ERROR,
      fields: problem?.fields || (problem as { details?: Record<string, string[]> })?.details,
    };
  }

  return { ok: true, recordId: (data as FormsResult | null)?.recordId, data: data as never };
}

/** Уведомление в Telegram без ПДн. При маршруте через РФ уведомление отправляет сам обработчик. */
export async function notifyForm(formName: string, recordId?: string, pageUrl?: string) {
  if (BASE) return; // обработчик в ru-central1 уже отправил уведомление
  try {
    await supabase.functions.invoke("send-to-telegram", {
      body: { formName, recordId, pageUrl: pageUrl ?? window.location.pathname },
    });
  } catch {
    /* уведомление не критично для пользователя */
  }
}