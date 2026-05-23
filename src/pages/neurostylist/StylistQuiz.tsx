import { useEffect, useMemo, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check, Loader2, Upload, ImagePlus, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  QUIZ_QUESTIONS,
  SECTIONS,
  PHOTO_TYPES,
  type Question,
  type FieldDef,
  type PhotoTypeOption,
} from "./quizConfig";

interface StylistQuizProps {
  onClose: () => void;
}

type AnswerValue = string | string[] | number | Record<string, string>;

interface UploadedPhoto {
  type: string; // PHOTO_TYPES value, may be "" until user picks
  path: string;
  name: string;
  size: number;
}

interface ReviewItem {
  id: string;
  photoPath?: string;
  photoName?: string;
  description: string;
  status: "" | "wearing" | "shelved";
  questions: string[];
}

const STATUS_OPTIONS = [
  { value: "wearing", label: "Ношу сейчас" },
  { value: "shelved", label: "Лежит без дела" },
] as const;

// Автосейв прогресса анкеты: чтобы при ошибке загрузки/закрытии вкладки
// клиент не начинал заново.
const DRAFT_KEY = "ns_quiz_draft_v1";
const DRAFT_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 дней

type QuizDraft = {
  step: number;
  answers: Record<string, AnswerValue>;
  photos: UploadedPhoto[];
  reviewItems: ReviewItem[];
  otherText: Record<string, string>;
  website: string;
  savedAt: number;
};

function loadDraft(): QuizDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizDraft;
    if (!parsed || typeof parsed !== "object") return null;
    if (Date.now() - (parsed.savedAt || 0) > DRAFT_TTL_MS) {
      localStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

const StylistQuiz = ({ onClose }: StylistQuizProps) => {
  // Поднимаем черновик из localStorage синхронно при инициализации стейта.
  const draft = typeof window !== "undefined" ? loadDraft() : null;
  const [step, setStep] = useState<number>(draft?.step ?? 0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(draft?.answers ?? {});
  const [photos, setPhotos] = useState<UploadedPhoto[]>(draft?.photos ?? []);
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(draft?.reviewItems ?? []);
  const [otherText, setOtherText] = useState<Record<string, string>>(draft?.otherText ?? {});
  const [website, setWebsite] = useState<string>(draft?.website ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [draftRestored] = useState<boolean>(!!draft);

  const testMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("test") === "1";
  }, []);

  const total = QUIZ_QUESTIONS.length;
  const current: Question | undefined = QUIZ_QUESTIONS[step];

  // Section index (1..11) for current question
  const currentSectionIndex = useMemo(() => {
    if (!current?.section) return 0;
    const idx = SECTIONS.indexOf(current.section as (typeof SECTIONS)[number]);
    return idx >= 0 ? idx + 1 : 0;
  }, [current]);

  const progress = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Уведомление о восстановлении черновика.
  useEffect(() => {
    if (draftRestored) {
      toast.success("Восстановили ваши ответы — продолжайте с того же места", {
        duration: 5000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Сохраняем прогресс при каждом изменении (debounce через requestIdleCallback / setTimeout).
  useEffect(() => {
    if (done) return;
    const handle = setTimeout(() => {
      try {
        const draft: QuizDraft = {
          step,
          answers,
          photos,
          reviewItems,
          otherText,
          website,
          savedAt: Date.now(),
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        /* quota / private mode — ignore */
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [step, answers, photos, reviewItems, otherText, website, done]);

  // Очищаем черновик после успешной отправки.
  useEffect(() => {
    if (done) clearDraft();
  }, [done]);

  // Предупреждаем при попытке закрыть вкладку с незаконченной анкетой.
  useEffect(() => {
    if (done) return;
    const hasProgress =
      step > 0 ||
      Object.keys(answers).length > 0 ||
      photos.length > 0 ||
      reviewItems.length > 0;
    if (!hasProgress) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [step, answers, photos, reviewItems, done]);

  const isAnswered = (q: Question): boolean => {
    const v = answers[q.id];
    if (q.type === "welcome") return true;
    if (q.type === "photo") {
      // каждый загруженный фото должен иметь тип
      if (!photos.every((p) => p.type && p.type.length > 0)) return false;
      // обязательно: минимум 1 фото лица и 1 фото в полный рост
      const hasFace = photos.some((p) => p.type === "face");
      const hasFull = photos.some((p) => p.type === "full");
      return hasFace && hasFull;
    }
    if (q.type === "review_items") {
      // Любой набор валиден, но частично заполненные вещи требуют описание ИЛИ фото
      return true;
    }
    if (q.type === "multifield") {
      const obj = (v as Record<string, string>) || {};
      const requiredFields = (q.fields || []).filter((f) => f.required);
      return requiredFields.every((f) => (obj[f.id] || "").trim().length > 0);
    }
    if (q.type === "single_with_other") {
      if (typeof v !== "string" || !v) return !q.required;
      if (v === q.otherValue) return (otherText[q.id] || "").trim().length > 0;
      return true;
    }
    if (q.type === "scale") {
      if (typeof v === "number") return true;
      return !q.required;
    }
    if (!q.required) return true;
    if (q.type === "multi") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.trim().length > 0;
  };

  const setAnswer = (id: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id: string, value: string, maxSelect?: number) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else {
        if (maxSelect && arr.length >= maxSelect) return prev;
        arr.push(value);
      }
      return { ...prev, [id]: arr };
    });
  };

  const handleNext = () => {
    if (!current) return;
    if (!isAnswered(current)) {
      if (current.type === "photo") {
        const hasFace = photos.some((p) => p.type === "face");
        const hasFull = photos.some((p) => p.type === "full");
        if (!photos.every((p) => p.type && p.type.length > 0)) {
          toast.error("У некоторых фото не выбран тип");
        } else if (!hasFace || !hasFull) {
          toast.error("Нужно минимум 1 фото лица и 1 фото в полный рост");
        }
      } else {
        toast.error("Это поле важно для подбора образа");
      }
      return;
    }
    if (step < total - 1) setStep(step + 1);
    else void handleSubmit();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const contacts = (answers["contacts"] as Record<string, string>) || {};
      const name = (contacts.name || "").trim();
      const contactRaw = (contacts.contact || "").trim();
      const city = (contacts.city || "").trim();
      const contact_type: "telegram" | "phone" =
        /^[+\d\s()\-]+$/.test(contactRaw) && contactRaw.replace(/\D/g, "").length >= 7
          ? "phone"
          : "telegram";

      type PayloadAnswer = {
        section: string;
        question: string;
        value: string | string[];
      };
      const payload: PayloadAnswer[] = [];

      // Город — отдельной строкой в "Данные клиентки"
      if (city) {
        payload.push({ section: "Данные клиентки", question: "Город", value: city });
      }

      for (const q of QUIZ_QUESTIONS) {
        if (
          q.type === "welcome" ||
          q.type === "photo" ||
          q.type === "review_items" ||
          q.id === "contacts"
        ) {
          continue;
        }
        const section = q.section || "Прочее";
        const v = answers[q.id];

        if (q.type === "multifield") {
          const obj = (v as Record<string, string>) || {};
          for (const f of q.fields || []) {
            const val = (obj[f.id] || "").trim();
            if (val) payload.push({ section, question: f.label, value: val });
          }
          continue;
        }
        if (q.type === "multi" && Array.isArray(v)) {
          const opts = q.options || [];
          const labels = v.map((val) => opts.find((o) => o.value === val)?.label || val);
          if (labels.length > 0) payload.push({ section, question: q.title, value: labels });
          continue;
        }
        if (q.type === "single" && typeof v === "string" && v) {
          const label = (q.options || []).find((o) => o.value === v)?.label || v;
          payload.push({ section, question: q.title, value: label });
          continue;
        }
        if (q.type === "single_with_other" && typeof v === "string" && v) {
          if (v === q.otherValue) {
            const t = (otherText[q.id] || "").trim();
            if (t) payload.push({ section, question: q.title, value: t });
          } else {
            const label = (q.options || []).find((o) => o.value === v)?.label || v;
            payload.push({ section, question: q.title, value: label });
          }
          continue;
        }
        if (q.type === "scale" && typeof v === "number") {
          const sub = q.scaleLabels?.[v];
          payload.push({ section, question: q.title, value: sub ? `${v} — ${sub}` : String(v) });
          continue;
        }
        if (typeof v === "string" && v.trim()) {
          payload.push({ section, question: q.title, value: v.trim() });
        }
      }

      // === 5 вещей для разбора → отдельный блок в ответах ===
      const reviewQuestionOpts = QUIZ_QUESTIONS.find((q) => q.id === "review_items")?.reviewQuestionOptions || [];
      const filledReviewItems = reviewItems.filter(
        (it) => it.photoPath || it.description.trim() || it.questions.length > 0,
      );
      filledReviewItems.forEach((it, i) => {
        const parts: string[] = [];
        if (it.description.trim()) parts.push(`Что это: ${it.description.trim()}`);
        if (it.status) {
          const stLabel = STATUS_OPTIONS.find((o) => o.value === it.status)?.label;
          if (stLabel) parts.push(`Статус: ${stLabel}`);
        }
        if (it.questions.length > 0) {
          const qLabels = it.questions.map(
            (q) => reviewQuestionOpts.find((o) => o.value === q)?.label || q,
          );
          parts.push(`Вопросы: ${qLabels.join(", ")}`);
        }
        if (it.photoPath) parts.push("Фото: прикреплено");
        payload.push({
          section: "5 вещей для разбора",
          question: `Вещь на разбор №${i + 1}`,
          value: parts.join("\n") || "—",
        });
      });

      // === Photos payload (фото блока «Фото» + фото вещей на разбор) ===
      const photoPayload: { slotId: string; slotLabel: string; path: string }[] = [];
      for (const p of photos) {
        if (!p.type) continue;
        const label = PHOTO_TYPES.find((t) => t.value === p.type)?.label || p.type;
        photoPayload.push({ slotId: p.type, slotLabel: label, path: p.path });
      }
      filledReviewItems.forEach((it, i) => {
        if (!it.photoPath) return;
        const desc = it.description.trim();
        const label = `Вещь на разбор №${i + 1}${desc ? " — " + desc : ""}`;
        photoPayload.push({
          slotId: `review_item_${i + 1}`,
          slotLabel: label,
          path: it.photoPath,
        });
      });

      const { data, error } = await supabase.functions.invoke("save-stylist-lead", {
        body: {
          name,
          contact: contactRaw,
          contact_type,
          answers: payload,
          photos: photoPayload,
          items_count: filledReviewItems.length,
          max_photos: 20,
          website,
          test_mode: testMode,
        },
      });

      let errBody: { error?: string; details?: Record<string, string[]> } | null = null;
      if (error && typeof (error as { context?: Response }).context?.json === "function") {
        try {
          errBody = await (error as { context: Response }).context.clone().json();
        } catch {
          /* ignore */
        }
      }
      const dataErr = data && (data as { error?: string }).error
        ? (data as { error?: string; details?: Record<string, string[]> })
        : null;
      const failure = errBody || dataErr;

      if (error || failure) {
        const fieldLabels: Record<string, string> = {
          name: "Имя",
          contact: "Контакт",
          contact_type: "Тип контакта",
          answers: "Ответы анкеты",
          photos: "Фото",
          website: "Скрытое поле",
        };
        const details = failure?.details;
        if (details && typeof details === "object") {
          const lines = Object.entries(details)
            .map(([field, msgs]) => `• ${fieldLabels[field] || field}: ${(msgs as string[]).join(", ")}`)
            .join("\n");
          toast.error(failure?.error || "Проверь данные анкеты", {
            description: lines || undefined,
            duration: 8000,
          });
        } else {
          const msg = failure?.error || error?.message || "Не удалось отправить, попробуй ещё раз";
          toast.error(msg);
        }
        console.error("save-stylist-lead failed:", { error, failure });
        setSubmitting(false);
        return;
      }

      setDone(true);
      clearDraft();
    } catch (e) {
      console.error(e);
      toast.error("Не удалось отправить, попробуйте ещё раз");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="ns-quiz fixed inset-0 z-[100] flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at top right, hsl(290 30% 18%) 0%, hsl(295 35% 12%) 50%, hsl(300 20% 8%) 100%)",
        color: "hsl(40 30% 95%)",
      }}
    >
      <style>{`
        .ns-quiz, .ns-quiz * { box-sizing: border-box; }
        .ns-quiz {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .ns-quiz h1, .ns-quiz h2, .ns-quiz h3, .ns-quiz h4, .ns-quiz h5, .ns-quiz h6 {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          margin: 0 !important;
        }
        .ns-quiz p { color: inherit; font-size: inherit; line-height: inherit; }
        .ns-quiz input::placeholder,
        .ns-quiz textarea::placeholder { color: hsl(40 30% 95% / 0.4); }
        .ns-quiz select {
          background: hsl(0 0% 100% / 0.06);
          color: hsl(40 30% 95%);
          border: 1px solid hsl(0 0% 100% / 0.18);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
        }
        .ns-quiz select:focus { border-color: hsl(20 60% 75%); }
        .ns-quiz select option { background: hsl(295 35% 12%); color: hsl(40 30% 95%); }
        .ns-quiz .ns-serif {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0.005em;
          color: rgba(247, 237, 227, 0.92);
        }
        .ns-quiz .ns-cursive {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.01em;
          background-image: linear-gradient(135deg, #F5E6D0 0%, #E8B888 25%, #D4956A 55%, #A0622A 85%, #8B4E1E 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          padding: 0 0.02em 0.08em;
          line-height: 1;
          filter: drop-shadow(0 4px 24px rgba(139,78,30,0.35)) drop-shadow(0 0 20px rgba(212,149,106,0.4));
        }
        .ns-quiz .ns-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(247, 237, 227, 0.55);
        }
        .ns-quiz .ns-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.005em;
          line-height: 1.08;
          color: hsl(40 30% 96%);
          margin: 0;
        }
        .ns-quiz .ns-title--lg { font-size: clamp(34px, 6.2vw, 64px); }
        .ns-quiz .ns-title--md { font-size: clamp(28px, 5vw, 52px); }
        .ns-quiz .ns-subtitle {
          font-family: 'Outfit', sans-serif;
          font-style: normal;
          letter-spacing: normal;
          text-transform: none;
          font-size: clamp(16px, 2.1vw, 22px);
          line-height: 1.55;
          color: hsl(40 30% 95% / 0.82);
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "hsl(20 60% 75%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "hsl(270 40% 65%)" }}
      />

      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 py-5">
        <div className="text-base tracking-[0.2em] uppercase opacity-70">НейроСтилист</div>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {!done && current?.type !== "welcome" && (
        <div className="relative z-10 px-5 sm:px-10">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(20 60% 75%), hsl(45 60% 88%))",
                boxShadow: "0 0 12px hsl(20 60% 75% / 0.6)",
              }}
            />
          </div>
          {currentSectionIndex > 0 && (
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
              <span className="tracking-wider opacity-70">
                Шаг {currentSectionIndex} из {SECTIONS.length}
              </span>
              <span className="opacity-50">·</span>
              <span className="font-medium" style={{ color: "hsl(20 60% 80%)" }}>
                {current?.section}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 flex-1 overflow-y-auto px-5 sm:px-10 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <FinalScreen onClose={onClose} />
          ) : current ? (
            <QuestionView
              key={current.id}
              q={current}
              value={answers[current.id]}
              photos={photos}
              setPhotos={setPhotos}
              reviewItems={reviewItems}
              setReviewItems={setReviewItems}
              otherText={otherText[current.id] || ""}
              setOtherText={(t) => setOtherText((p) => ({ ...p, [current.id]: t }))}
              onSetValue={(v) => setAnswer(current.id, v)}
              onToggleMulti={(v) => toggleMulti(current.id, v, current.maxSelect)}
              onEnter={handleNext}
              onStart={handleNext}
              testMode={testMode}
            />
          ) : null}

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            aria-hidden="true"
            className="absolute opacity-0 pointer-events-none w-0 h-0"
            style={{ left: "-9999px" }}
          />
        </div>
      </div>

      {!done && current?.type !== "welcome" && (
        <div
          className="relative z-10 px-5 sm:px-10 py-5 border-t border-white/10"
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <button
              onClick={handleBack}
              disabled={step === 0 || submitting}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
            <button
              onClick={handleNext}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, hsl(20 60% 75%), hsl(45 60% 88%))",
                color: "hsl(300 20% 8%)",
                boxShadow: "0 0 32px hsl(20 60% 75% / 0.4)",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Отправляю…
                </>
              ) : step === total - 1 ? (
                <>
                  Отправить ответы
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== Question rendering =====

interface QuestionViewProps {
  q: Question;
  value: AnswerValue | undefined;
  photos: UploadedPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
  reviewItems: ReviewItem[];
  setReviewItems: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  otherText: string;
  setOtherText: (t: string) => void;
  onSetValue: (v: AnswerValue) => void;
  onToggleMulti: (v: string) => void;
  onEnter: () => void;
  onStart: () => void;
  testMode?: boolean;
}

const QuestionView = ({
  q,
  value,
  photos,
  setPhotos,
  reviewItems,
  setReviewItems,
  otherText,
  setOtherText,
  onSetValue,
  onToggleMulti,
  onEnter,
  onStart,
}: QuestionViewProps) => {
  if (q.type === "welcome") {
    const stepsCount = SECTIONS.length;
    return (
      <div className="animate-fade-in text-center py-8 sm:py-16">
        <div className="ns-eyebrow text-base sm:text-lg opacity-70 mb-6">анкета · {stepsCount} шагов</div>
        <div role="heading" aria-level={1} className="ns-title ns-title--lg ns-serif">
          <CalligraphyTitle text={q.title} cursiveSize="1.28em" />
        </div>
        {q.subtitle && (
          <p className="ns-eyebrow ns-subtitle mt-7 sm:mt-8 opacity-85 leading-relaxed max-w-xl mx-auto">
            {q.subtitle}
          </p>
        )}
        <button
          onClick={onStart}
          className="mt-12 inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.03]"
          style={{
            background: "linear-gradient(135deg, hsl(20 60% 75%), hsl(45 60% 88%))",
            color: "hsl(300 20% 8%)",
            boxShadow: "0 0 40px hsl(20 60% 75% / 0.45)",
          }}
        >
          {q.ctaLabel || "Начать"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div role="heading" aria-level={2} className="ns-title ns-title--md ns-serif">
        <CalligraphyTitle text={q.title} cursiveSize="1.25em" />
      </div>
      {q.subtitle && (
        <p className="ns-eyebrow ns-subtitle mt-5 sm:mt-6 opacity-80 leading-relaxed">{q.subtitle}</p>
      )}

      <div className="mt-8 sm:mt-10">
        {q.type === "single" && q.options && (
          <SingleOptions q={q} value={value as string | undefined} onSetValue={onSetValue} />
        )}

        {q.type === "single_with_other" && q.options && (
          <>
            <SingleOptions q={q} value={value as string | undefined} onSetValue={onSetValue} />
            {value === q.otherValue && (
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder={q.otherPlaceholder || "Свой вариант…"}
                className="mt-4 w-full px-5 py-4 rounded-2xl text-base outline-none border transition-all"
                style={{
                  background: "hsl(0 0% 100% / 0.04)",
                  borderColor: "hsl(20 60% 75% / 0.5)",
                  color: "hsl(40 30% 95%)",
                  backdropFilter: "blur(12px)",
                }}
                autoFocus
              />
            )}
          </>
        )}

        {q.type === "multi" && q.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => {
              const arr = Array.isArray(value) ? (value as string[]) : [];
              const active = arr.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => onToggleMulti(opt.value)}
                  className="text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3"
                  style={{
                    background: active ? "hsl(20 60% 75% / 0.12)" : "hsl(0 0% 100% / 0.04)",
                    borderColor: active ? "hsl(20 60% 75%)" : "hsl(0 0% 100% / 0.12)",
                    backdropFilter: "blur(12px)",
                    boxShadow: active ? "0 0 24px hsl(20 60% 75% / 0.25)" : "none",
                  }}
                >
                  <span className="font-medium">{opt.label}</span>
                  {active && <Check className="w-4 h-4 shrink-0" style={{ color: "hsl(20 60% 75%)" }} />}
                </button>
              );
            })}
            {q.maxSelect && (
              <p className="col-span-full text-xs opacity-50 mt-1">Максимум {q.maxSelect}</p>
            )}
          </div>
        )}

        {q.type === "text" && (
          <input
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onSetValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onEnter();
              }
            }}
            placeholder={q.placeholder}
            className="w-full px-5 py-4 rounded-2xl text-base outline-none border transition-all"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              borderColor: "hsl(0 0% 100% / 0.15)",
              color: "hsl(40 30% 95%)",
              backdropFilter: "blur(12px)",
            }}
            autoFocus
          />
        )}

        {q.type === "longtext" && (
          <textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onSetValue(e.target.value)}
            placeholder={q.placeholder}
            rows={5}
            className="w-full px-5 py-4 rounded-2xl text-base outline-none border transition-all resize-none"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              borderColor: "hsl(0 0% 100% / 0.15)",
              color: "hsl(40 30% 95%)",
              backdropFilter: "blur(12px)",
            }}
            autoFocus
          />
        )}

        {q.type === "scale" && (
          <ScaleField q={q} value={typeof value === "number" ? value : undefined} onSetValue={onSetValue} />
        )}

        {q.type === "multifield" && (
          <MultiFieldView
            q={q}
            value={(value as Record<string, string>) || {}}
            onSetValue={onSetValue}
            onEnter={onEnter}
          />
        )}

        {q.type === "photo" && (
          <TypedPhotoUploadView q={q} photos={photos} setPhotos={setPhotos} />
        )}

        {q.type === "review_items" && (
          <ReviewItemsView q={q} items={reviewItems} setItems={setReviewItems} />
        )}
      </div>
    </div>
  );
};

const SingleOptions = ({
  q,
  value,
  onSetValue,
}: {
  q: Question;
  value: string | undefined;
  onSetValue: (v: AnswerValue) => void;
}) => (
  <div className="grid gap-3">
    {(q.options || []).map((opt) => {
      const active = value === opt.value;
      return (
        <button
          key={opt.value}
          onClick={() => onSetValue(opt.value)}
          className="text-left px-5 py-4 rounded-2xl border transition-all duration-300"
          style={{
            background: active ? "hsl(20 60% 75% / 0.12)" : "hsl(0 0% 100% / 0.04)",
            borderColor: active ? "hsl(20 60% 75%)" : "hsl(0 0% 100% / 0.12)",
            backdropFilter: "blur(12px)",
            boxShadow: active ? "0 0 24px hsl(20 60% 75% / 0.25)" : "none",
          }}
        >
          <span className="font-medium">{opt.label}</span>
        </button>
      );
    })}
  </div>
);

const ScaleField = ({
  q,
  value,
  onSetValue,
}: {
  q: Question;
  value: number | undefined;
  onSetValue: (v: AnswerValue) => void;
}) => {
  const min = q.scaleMin ?? 1;
  const max = q.scaleMax ?? 10;
  const v = value ?? Math.round((min + max) / 2);
  const labels = q.scaleLabels || {};

  // Если значение ещё не зафиксировано — сохраним default при первом рендере,
  // чтобы отображаемое число совпадало с сохранённым значением.
  useEffect(() => {
    if (value === undefined) {
      onSetValue(Math.round((min + max) / 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs opacity-60">{labels[min] || min}</span>
        <span
          className="text-4xl font-serif"
          style={{
            fontFamily: "Georgia, serif",
            color: "hsl(20 60% 78%)",
            textShadow: "0 0 24px hsl(20 60% 75% / 0.5)",
          }}
        >
          {v}
        </span>
        <span className="text-xs opacity-60 text-right">{labels[max] || max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={v}
        onChange={(e) => onSetValue(Number(e.target.value))}
        className="w-full ns-scale-range"
        style={{ accentColor: "hsl(20 60% 75%)" }}
      />
      <div className="flex justify-between mt-3 text-[10px] opacity-50">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
          <span key={n} className="w-4 text-center">
            {n}
          </span>
        ))}
      </div>
      {labels[5] && v === 5 && (
        <p className="mt-4 text-sm opacity-70 text-center">{labels[5]}</p>
      )}
      {value === undefined && (
        <p className="mt-4 text-xs opacity-50 text-center">Передвинь, чтобы зафиксировать</p>
      )}
    </div>
  );
};

const MultiFieldView = ({
  q,
  value,
  onSetValue,
  onEnter,
}: {
  q: Question;
  value: Record<string, string>;
  onSetValue: (v: AnswerValue) => void;
  onEnter: () => void;
}) => {
  const fields = q.fields || [];
  return (
    <div className="grid gap-4">
      {fields.map((f: FieldDef) => (
        <div key={f.id}>
          <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">
            {f.label}
            {f.required && <span style={{ color: "hsl(20 60% 75%)" }}> *</span>}
          </label>
          <input
            type={f.type === "tel" ? "tel" : "text"}
            value={value[f.id] || ""}
            onChange={(e) => onSetValue({ ...value, [f.id]: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onEnter();
              }
            }}
            placeholder={f.placeholder}
            className="w-full px-5 py-4 rounded-2xl text-base outline-none border transition-all"
            style={{
              background: "hsl(0 0% 100% / 0.04)",
              borderColor: "hsl(0 0% 100% / 0.15)",
              color: "hsl(40 30% 95%)",
              backdropFilter: "blur(12px)",
            }}
          />
        </div>
      ))}
    </div>
  );
};

// ===== Typed photo uploader (with per-photo type) =====

async function uploadFileToStorage(file: File, keyPrefix: string): Promise<string | null> {
  // Пустой файл — iOS иногда отдаёт File с size=0, если фото ещё не выгрузилось из iCloud.
  if (file.size === 0) {
    toast.error(
      `«${file.name || "Фото"}»: файл пустой. Если фото в iCloud — откройте его в Фото и попробуйте снова.`,
    );
    return null;
  }
  if (file.size > 25 * 1024 * 1024) {
    toast.error(`Файл «${file.name}» больше 25 МБ — сожмите фото и попробуйте снова`);
    return null;
  }
  const sessionId =
    sessionStorage.getItem("ns_session") ||
    (() => {
      const id = crypto.randomUUID();
      sessionStorage.setItem("ns_session", id);
      return id;
    })();
  // Mobile Safari (особенно при share-sheet) часто отдаёт пустой file.type ИЛИ имя без расширения
  // (например, "image"). Тогда Supabase отклоняет файл по MIME. Восстанавливаем MIME и ext
  // из всех доступных сигналов.
  const extToMime: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    heic: "image/heic",
    heif: "image/heif",
    avif: "image/avif",
    gif: "image/gif",
  };
  const mimeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/heic": "heic",
    "image/heif": "heif",
    "image/avif": "avif",
    "image/gif": "gif",
  };
  const rawName = file.name || "";
  const lastDot = rawName.lastIndexOf(".");
  const nameExt = lastDot > 0 ? rawName.slice(lastDot + 1).toLowerCase() : "";
  const fileMime = (file.type || "").toLowerCase();
  const ext = extToMime[nameExt] ? nameExt : mimeToExt[fileMime] || "jpg";
  const contentType = fileMime || extToMime[ext] || "image/jpeg";
  const path = `${sessionId}/${keyPrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  // Retry до 3 раз с экспоненциальной задержкой — мобильные сети часто рвут запросы.
  let lastError: { message?: string } | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    // Тайм-аут на одну попытку: 90 сек. Иначе на медленной мобильной сети
    // запрос может «висеть» без ответа, и UI блокируется навсегда.
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const result = await Promise.race<{ error: { message?: string } | null }>([
      supabase.storage
        .from("stylist-uploads")
        .upload(path, file, { contentType, upsert: false })
        .then((r) => ({ error: r.error as { message?: string } | null })),
      new Promise<{ error: { message?: string } }>((resolve) => {
        timeoutId = setTimeout(
          () => resolve({ error: { message: "timeout: загрузка заняла больше 90 секунд" } }),
          90_000,
        );
      }),
    ]);
    if (timeoutId) clearTimeout(timeoutId);
    if (!result.error) return path;
    lastError = result.error;
    const msg = lastError.message || "";
    console.warn("Upload attempt failed:", { attempt: attempt + 1, name: file.name, size: file.size, type: file.type, contentType, ext, msg });
    // Не ретраим, если проблема в формате/размере/дубликате — повтор не поможет.
    if (/mime|format|size|large|exists|duplicate/i.test(msg)) break;
    if (attempt < 2) await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
  }
  if (lastError) {
    const error = lastError;
    console.error("Upload error:", error, { name: file.name, size: file.size, type: file.type, contentType });
    const msg = (error as { message?: string }).message || "";
    if (/mime|format/i.test(msg)) {
      toast.error(`«${file.name}»: формат не поддерживается. Загрузите JPG, PNG, HEIC или WebP.`);
    } else if (/size|large/i.test(msg)) {
      toast.error(`«${file.name}»: файл слишком большой. Максимум 25 МБ.`);
    } else if (/timeout/i.test(msg)) {
      toast.error(`«${file.name}»: слишком медленно. Подключитесь к Wi-Fi и попробуйте снова.`);
    } else {
      toast.error(`Не удалось загрузить «${file.name}»: ${msg || "проверьте интернет и попробуйте снова"}`);
    }
    return null;
  }
  return path;
}

const TypedPhotoUploadView = ({
  q,
  photos,
  setPhotos,
}: {
  q: Question;
  photos: UploadedPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const max = q.maxPhotos ?? 20;
  const types = q.photoTypes ?? PHOTO_TYPES;
  const hint = q.photoHint ?? [];

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = max - photos.length;
    if (remaining <= 0) {
      toast.error(
        `Можно загрузить до ${max} фото. Оставьте самые важные: лицо, полный рост, любимые образы, спорные вещи и 5 вещей для разбора.`,
      );
      return;
    }
    const filesArr = Array.from(files);
    if (filesArr.length > remaining) {
      toast.error(
        `Можно загрузить до ${max} фото. Оставьте самые важные: лицо, полный рост, любимые образы, спорные вещи и 5 вещей для разбора.`,
      );
    }
    const toUpload = filesArr.slice(0, remaining);
    setUploading(true);
    try {
      const uploaded: UploadedPhoto[] = [];
      for (const file of toUpload) {
        const path = await uploadFileToStorage(file, "photo");
        if (!path) continue;
        uploaded.push({ type: "", path, name: file.name, size: file.size });
      }
      if (uploaded.length > 0) {
        setPhotos((prev) => [...prev, ...uploaded]);
        toast.success(`Загружено: ${uploaded.length}. Выберите тип для каждого фото.`);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removePhoto = (path: string) => {
    setPhotos((prev) => prev.filter((p) => p.path !== path));
    void supabase.storage.from("stylist-uploads").remove([path]).catch(() => {});
  };

  const updateType = (path: string, type: string) => {
    setPhotos((prev) => prev.map((p) => (p.path === path ? { ...p, type } : p)));
  };

  const count = photos.length;
  const reachedMax = count >= max;

  return (
    <div className="grid gap-4">
      {hint.length > 0 && (
        <div
          className="rounded-2xl border p-4 text-sm leading-relaxed"
          style={{
            background: "hsl(0 0% 100% / 0.03)",
            borderColor: "hsl(0 0% 100% / 0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="opacity-80 mb-2">Лучше всего добавить:</div>
          <ul className="space-y-1 opacity-75">
            {hint.map((h, i) => (
              <li key={i}>— {h}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm font-medium">
          Загружено{" "}
          <span style={{ color: "hsl(20 60% 80%)" }}>
            {count} из {max}
          </span>{" "}
          фото
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading || reachedMax}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
          style={{
            background: "hsl(20 60% 75% / 0.15)",
            border: "1px solid hsl(20 60% 75% / 0.4)",
            color: "hsl(40 40% 92%)",
          }}
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImagePlus className="w-4 h-4" />
          )}
          {uploading ? "Загружаю…" : reachedMax ? "Лимит достигнут" : "Добавить фото"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {photos.length === 0 ? (
        <div
          className="rounded-2xl border-2 border-dashed p-8 text-center"
          style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}
        >
          <Upload className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <div className="text-sm opacity-60">Файлы пока не выбраны</div>
        </div>
      ) : (
        <div className="grid gap-3">
          {photos.map((p) => (
            <div
              key={p.path}
              className="rounded-2xl border p-3 flex items-center gap-3"
              style={{
                background: "hsl(0 0% 100% / 0.04)",
                borderColor: p.type
                  ? "hsl(0 0% 100% / 0.12)"
                  : "hsl(20 60% 75% / 0.5)",
              }}
            >
              <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(20 60% 75% / 0.15)" }}>
                <ImagePlus className="w-4 h-4" style={{ color: "hsl(20 60% 80%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs opacity-80 truncate mb-2">{p.name}</div>
                <select
                  value={p.type}
                  onChange={(e) => updateType(p.path, e.target.value)}
                  className="w-full"
                >
                  <option value="">— выберите тип фото —</option>
                  {types.map((t: PhotoTypeOption) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removePhoto(p.path)}
                aria-label="Удалить фото"
                className="shrink-0 p-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs opacity-60">
        До 10 МБ каждое (JPG, PNG, HEIC, WEBP). Фото не обязательны, но сильно помогают разбору.
      </p>
    </div>
  );
};

// ===== 5 вещей для разбора =====

const ReviewItemsView = ({
  q,
  items,
  setItems,
}: {
  q: Question;
  items: ReviewItem[];
  setItems: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
}) => {
  const max = q.maxItems ?? 5;
  const questionOptions = q.reviewQuestionOptions ?? [];

  const addItem = () => {
    if (items.length >= max) {
      toast.error(`Максимум ${max} вещей в стартовом разборе`);
      return;
    }
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: "", status: "", questions: [] },
    ]);
  };

  const updateItem = (id: string, patch: Partial<ReviewItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target?.photoPath) {
        void supabase.storage.from("stylist-uploads").remove([target.photoPath]).catch(() => {});
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  const toggleQuestion = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const has = it.questions.includes(value);
        return {
          ...it,
          questions: has ? it.questions.filter((v) => v !== value) : [...it.questions, value],
        };
      }),
    );
  };

  return (
    <div className="grid gap-4">
      {items.length === 0 && (
        <div
          className="rounded-2xl border-2 border-dashed p-6 text-center text-sm opacity-70"
          style={{ borderColor: "hsl(0 0% 100% / 0.14)" }}
        >
          Пока ни одной вещи. Добавьте до {max} — это сильно ускорит разбор.
        </div>
      )}

      {items.map((it, idx) => (
        <ReviewItemCard
          key={it.id}
          index={idx}
          item={it}
          questionOptions={questionOptions}
          onChange={(patch) => updateItem(it.id, patch)}
          onRemove={() => removeItem(it.id)}
          onToggleQuestion={(v) => toggleQuestion(it.id, v)}
        />
      ))}

      {items.length < max && (
        <button
          onClick={addItem}
          className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-sm font-medium transition-colors"
          style={{
            background: "hsl(20 60% 75% / 0.12)",
            border: "1px dashed hsl(20 60% 75% / 0.5)",
            color: "hsl(40 40% 92%)",
          }}
        >
          <Plus className="w-4 h-4" />
          Добавить вещь ({items.length}/{max})
        </button>
      )}
    </div>
  );
};

const ReviewItemCard = ({
  index,
  item,
  questionOptions,
  onChange,
  onRemove,
  onToggleQuestion,
}: {
  index: number;
  item: ReviewItem;
  questionOptions: { value: string; label: string }[];
  onChange: (patch: Partial<ReviewItem>) => void;
  onRemove: () => void;
  onToggleQuestion: (v: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const path = await uploadFileToStorage(file, `review-${index + 1}`);
      if (path) {
        // удаляем старый файл только после успешной загрузки нового
        const oldPath = item.photoPath;
        onChange({ photoPath: path, photoName: file.name });
        if (oldPath) {
          void supabase.storage.from("stylist-uploads").remove([oldPath]).catch(() => {});
        }
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div
      className="rounded-2xl border p-4 grid gap-4"
      style={{
        background: "hsl(0 0% 100% / 0.04)",
        borderColor: "hsl(0 0% 100% / 0.14)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold" style={{ color: "hsl(20 60% 82%)" }}>
          Вещь №{index + 1}
        </div>
        <button
          onClick={onRemove}
          className="text-xs opacity-60 hover:opacity-100 inline-flex items-center gap-1"
          aria-label="Удалить вещь"
        >
          <Trash2 className="w-3.5 h-3.5" /> Удалить
        </button>
      </div>

      {/* Фото */}
      <div>
        <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">Фото вещи</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
            style={{
              background: "hsl(20 60% 75% / 0.15)",
              border: "1px solid hsl(20 60% 75% / 0.4)",
              color: "hsl(40 40% 92%)",
            }}
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
            {uploading ? "Загружаю…" : item.photoPath ? "Заменить фото" : "Добавить фото"}
          </button>
          {item.photoName && (
            <span className="text-xs opacity-70 truncate max-w-[220px]">{item.photoName}</span>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
        </div>
      </div>

      {/* Что это за вещь */}
      <div>
        <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">Что это за вещь</label>
        <input
          type="text"
          value={item.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Например: бежевый блейзер из льна"
          className="w-full px-5 py-3 rounded-2xl text-base outline-none border transition-all"
          style={{
            background: "hsl(0 0% 100% / 0.04)",
            borderColor: "hsl(0 0% 100% / 0.15)",
            color: "hsl(40 30% 95%)",
          }}
        />
      </div>

      {/* Статус */}
      <div>
        <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">Носите сейчас?</label>
        <div className="grid grid-cols-2 gap-2">
          {STATUS_OPTIONS.map((opt) => {
            const active = item.status === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange({ status: active ? "" : opt.value })}
                className="text-left px-4 py-3 rounded-xl border text-sm transition-all"
                style={{
                  background: active ? "hsl(20 60% 75% / 0.12)" : "hsl(0 0% 100% / 0.04)",
                  borderColor: active ? "hsl(20 60% 75%)" : "hsl(0 0% 100% / 0.12)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Вопрос */}
      <div>
        <label className="block text-xs uppercase tracking-wider opacity-60 mb-2">В чём вопрос?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {questionOptions.map((opt) => {
            const active = item.questions.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => onToggleQuestion(opt.value)}
                className="text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between gap-2"
                style={{
                  background: active ? "hsl(20 60% 75% / 0.12)" : "hsl(0 0% 100% / 0.04)",
                  borderColor: active ? "hsl(20 60% 75%)" : "hsl(0 0% 100% / 0.12)",
                }}
              >
                <span>{opt.label}</span>
                {active && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(20 60% 75%)" }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FinalScreen = ({ onClose }: { onClose: () => void }) => (
  <div className="text-center py-8 sm:py-16 animate-fade-in">
    <div
      className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-8"
      style={{
        background: "linear-gradient(135deg, hsl(20 60% 75%), hsl(45 60% 88%))",
        boxShadow: "0 0 40px hsl(20 60% 75% / 0.5)",
      }}
    >
      <Check className="w-10 h-10" style={{ color: "hsl(300 20% 8%)" }} strokeWidth={3} />
    </div>
    <div role="heading" aria-level={1} className="ns-title ns-title--md ns-serif">
      <CalligraphyTitle text="Твои ответы сохранены" cursiveSize="1.25em" />
    </div>
    <p className="ns-eyebrow ns-subtitle mt-6 sm:mt-7 opacity-85 max-w-lg mx-auto leading-relaxed">
      Александра соберёт стиль-разбор на основе твоих ответов
    </p>
    <button
      onClick={onClose}
      className="mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "hsl(0 0% 100% / 0.08)",
        border: "1px solid hsl(0 0% 100% / 0.2)",
        color: "hsl(40 30% 95%)",
        backdropFilter: "blur(12px)",
      }}
    >
      Закрыть
    </button>
  </div>
);

export default StylistQuiz;

// ===== Calligraphy title =====
const STOP_WORDS = new Set([
  "и", "а", "но", "или", "да", "не", "ни", "же", "ли", "бы", "то",
  "в", "во", "на", "по", "с", "со", "к", "ко", "о", "об", "от", "до", "из", "у", "за", "при", "про", "для", "над", "под", "без",
  "что", "как", "где", "куда", "когда", "чем", "кто", "тебя", "тебе", "твой", "твоя", "твои", "твоё", "твое",
  "это", "этот", "эта", "эти", "то", "та", "те", "сейчас", "ещё", "уже", "очень", "более", "менее",
  "хочется", "должен", "должна", "должно", "должны", "быть", "есть", "может",
]);

function pickCursiveIndices(words: string[]): Set<number> {
  const isMeaningful = (w: string) => {
    const clean = w.toLowerCase().replace(/[«»"'(),.:;!?…—–-]/g, "");
    return clean.length >= 3 && !STOP_WORDS.has(clean);
  };
  const meaningful: number[] = [];
  words.forEach((w, i) => {
    if (isMeaningful(w)) meaningful.push(i);
  });

  const picks = new Set<number>();
  if (meaningful.length === 0) {
    picks.add(0);
    if (words.length > 1) picks.add(words.length - 1);
    return picks;
  }
  picks.add(meaningful[0]);
  const last = meaningful[meaningful.length - 1];
  if (last !== meaningful[0]) {
    picks.add(last);
  } else if (words.length - 1 !== meaningful[0]) {
    picks.add(words.length - 1);
  } else if (words.length > 1) {
    picks.add(0);
  }
  return picks;
}

function CalligraphyTitle({
  text,
  cursiveSize = "1.5em",
}: {
  text: string;
  cursiveSize?: string;
}) {
  const cleaned = text.trim();
  const parts = cleaned.split(/\s+/);

  if (parts.length < 2) {
    return (
      <span className="ns-cursive" style={{ fontSize: cursiveSize, display: "inline-block" }}>
        {cleaned}
      </span>
    );
  }

  const cursiveIdx = pickCursiveIndices(parts);

  return (
    <span style={{ display: "inline" }}>
      {parts.map((word, i) => {
        const isCursive = cursiveIdx.has(i);
        return (
          <span key={i}>
            {isCursive ? (
              <span
                className="ns-cursive"
                style={{
                  fontSize: cursiveSize,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            ) : (
              <span>{word}</span>
            )}
            {i < parts.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
