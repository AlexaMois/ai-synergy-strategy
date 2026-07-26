import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Local typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthClient = { name?: string; client_name?: string; client_uri?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
type SupabaseOAuth = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
};
const supaOAuth = (): SupabaseOAuth =>
  ((supabase.auth as unknown as { oauth: SupabaseOAuth }).oauth);

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Разрешение доступа — aleksamois.ru";
  }, []);

  async function loadDetails() {
    if (!authorizationId) {
      setError("Отсутствует authorization_id.");
      return;
    }
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) {
      setNeedsAuth(true);
      return;
    }
    setUserEmail(sess.session.user.email ?? null);
    setNeedsAuth(false);
    const { data, error } = await supaOAuth().getAuthorizationDetails(authorizationId);
    if (error) {
      setError(error.message);
      return;
    }
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return;
    }
    setDetails(data ?? null);
  }

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationId]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const redirectTo = window.location.pathname + window.location.search;
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin + redirectTo },
          });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    await loadDetails();
  }

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await supaOAuth().approveAuthorization(authorizationId)
      : await supaOAuth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Сервер авторизации не вернул адрес перенаправления.");
      return;
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-xl p-6">
          <h1 className="text-xl font-semibold mb-2 text-neutral-900">Не удалось загрузить запрос</h1>
          <p className="text-sm text-neutral-600">{error}</p>
        </div>
      </main>
    );
  }

  if (needsAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
        <div className="max-w-md w-full bg-white border border-neutral-200 rounded-xl p-6">
          <h1 className="text-xl font-semibold mb-2 text-neutral-900">
            Вход для подключения приложения
          </h1>
          <p className="text-sm text-neutral-600 mb-4">
            Войдите в аккаунт клиентского портала, чтобы разрешить внешнему приложению работать от вашего имени.
          </p>
          <form onSubmit={handleAuth} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-[#49BED8] hover:bg-[#3aa8c2] text-white rounded-md py-2 text-sm font-medium disabled:opacity-50"
            >
              {busy ? "…" : mode === "signin" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-3 text-xs text-neutral-600 underline"
          >
            {mode === "signin" ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
          </button>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#49BED8] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const clientName = details.client?.client_name ?? details.client?.name ?? "внешнее приложение";
  const scopes = details.scopes ?? (details.scope ? details.scope.split(" ") : []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="max-w-md w-full bg-white border border-neutral-200 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-1 text-neutral-900">
          Подключить {clientName} к аккаунту
        </h1>
        {userEmail && (
          <p className="text-xs text-neutral-500 mb-3">Вошли как {userEmail}</p>
        )}
        <p className="text-sm text-neutral-700 mb-4">
          {clientName} сможет вызывать инструменты этого приложения от вашего имени, пока вы залогинены.
        </p>
        {scopes.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-neutral-500 mb-1">Запрошенные права</div>
            <ul className="text-sm text-neutral-700 list-disc list-inside space-y-1">
              {scopes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs text-neutral-500 mb-4">
          Разрешение не отменяет проверки прав и политики базы данных.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 bg-[#49BED8] hover:bg-[#3aa8c2] text-white rounded-md py-2 text-sm font-medium disabled:opacity-50"
          >
            Разрешить
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 rounded-md py-2 text-sm font-medium disabled:opacity-50"
          >
            Отменить
          </button>
        </div>
      </div>
    </main>
  );
}