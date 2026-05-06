import { useEffect, useMemo, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check, Loader2, Upload, ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { QUIZ_QUESTIONS, type Question, type FieldDef, type PhotoSlot } from "./quizConfig";

interface StylistQuizProps {
  onClose: () => void;
}

type AnswerValue = string | string[] | number | Record<string, string>;

interface UploadedPhoto {
  slotId: string;
  path: string; // storage path
  name: string;
  size: number;
}

const StylistQuiz = ({ onClose }: StylistQuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Test mode: ?test=1 in URL allows submitting without photos for E2E checks.
  const testMode = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("test") === "1";
  }, []);

  const total = QUIZ_QUESTIONS.length;
  const current: Question | undefined = QUIZ_QUESTIONS[step];
  const progress = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const isAnswered = (q: Question): boolean => {
    const v = answers[q.id];
    if (q.type === "welcome") return true;
    if (q.type === "photo") {
      const baseMin = q.minPhotos ?? (q.required ? 1 : 0);
      const min = testMode ? 0 : baseMin;
      return photos.length >= min;
    }
    if (q.type === "multifield") {
      const obj = (v as Record<string, string>) || {};
      const requiredFields = (q.fields || []).filter((f) => f.required);
      return requiredFields.every((f) => (obj[f.id] || "").trim().length > 0);
    }
    if (q.type === "single_with_other") {
      if (typeof v !== "string" || !v) return !q.required;
      if (v === q.otherValue) {
        return (otherText[q.id] || "").trim().length > 0;
      }
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
        toast.error("Загрузи хотя бы одно фото");
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

      const payload = QUIZ_QUESTIONS
        .filter((q) => q.type !== "welcome" && q.type !== "photo" && q.id !== "contacts")
        .map((q) => {
          const v = answers[q.id];
          if (q.type === "multi" && Array.isArray(v)) {
            const opts = q.options || [];
            const labels = v.map((val) => opts.find((o) => o.value === val)?.label || val);
            return { question: q.title, value: labels };
          }
          if (q.type === "single" && typeof v === "string") {
            const label = (q.options || []).find((o) => o.value === v)?.label || v;
            return { question: q.title, value: label };
          }
          if (q.type === "single_with_other" && typeof v === "string") {
            if (v === q.otherValue) {
              return { question: q.title, value: (otherText[q.id] || "").trim() };
            }
            const label = (q.options || []).find((o) => o.value === v)?.label || v;
            return { question: q.title, value: label };
          }
          if (q.type === "scale" && typeof v === "number") {
            const sub = q.scaleLabels?.[v];
            return { question: q.title, value: sub ? `${v} — ${sub}` : String(v) };
          }
          return { question: q.title, value: typeof v === "string" ? v : "" };
        })
        .filter((a) => {
          const val = a.value;
          if (Array.isArray(val)) return val.length > 0;
          return typeof val === "string" && val.trim().length > 0;
        });

      // City injected as part of answers
      if (city) payload.unshift({ question: "Город", value: city });

      const photoPayload = photos.map((p) => {
        const slot = QUIZ_QUESTIONS.find((q) => q.id === "photos")?.slots?.find(
          (s) => s.id === p.slotId,
        );
        return { slotId: p.slotId, slotLabel: slot?.label || p.slotId, path: p.path };
      });

      const { data, error } = await supabase.functions.invoke("save-stylist-lead", {
        body: {
          name,
          contact: contactRaw,
          contact_type,
          answers: payload,
          photos: photoPayload,
          website,
          test_mode: testMode,
        },
      });

      if (error || (data && (data as { error?: string }).error)) {
        const msg = error?.message || (data as { error?: string })?.error || "Не удалось отправить";
        toast.error(msg);
        setSubmitting(false);
        return;
      }

      setDone(true);
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
      {/* Scoped CSS reset to defeat global important rules from index.css */}
      <style>{`
        .ns-quiz, .ns-quiz * { box-sizing: border-box; }
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
        .ns-quiz .ns-serif {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, 'Times New Roman', serif;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .ns-quiz .ns-cursive {
          font-family: 'Marck Script', 'Caveat', 'Pinyon Script', 'Allura', 'Snell Roundhand', cursive;
          font-weight: 400;
          font-style: normal;
          letter-spacing: 0.005em;
          background-image: linear-gradient(135deg, #FFF1DB 0%, #F6D6A8 30%, #E5B584 65%, #C68B5C 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          padding: 0 0.04em 0.05em;
          line-height: 0.9;
          filter: drop-shadow(0 2px 14px rgba(246,214,168,0.45));
        }
        .ns-quiz .ns-eyebrow {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          letter-spacing: 0.04em;
        }
        /* Унифицированная типографика заголовков квиза.
           Используем role="heading" + div, чтобы обойти глобальный !important reset на h1-h6. */
        .ns-quiz .ns-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.08;
          color: hsl(40 30% 96%);
          margin: 0;
        }
        .ns-quiz .ns-title--lg { font-size: clamp(34px, 6.2vw, 64px); }
        .ns-quiz .ns-title--md { font-size: clamp(28px, 5vw, 52px); }
        .ns-quiz .ns-subtitle {
          font-size: clamp(16px, 2.1vw, 22px);
          line-height: 1.55;
          color: hsl(40 30% 95% / 0.82);
        }
        /* Marck Script (кириллица) имеет нормальный x-height —
           слегка приподнимем базовую линию, чтобы росчерки не «висли». */
        .ns-quiz .ns-cursive {
          vertical-align: -0.04em;
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
          <div className="mt-3 text-sm tracking-wider opacity-60">
            Шаг {step + 1} из {total}
          </div>
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
  otherText,
  setOtherText,
  onSetValue,
  onToggleMulti,
  onEnter,
  onStart,
  testMode,
}: QuestionViewProps) => {
  if (q.type === "welcome") {
    return (
      <div className="animate-fade-in text-center py-8 sm:py-16">
        <div className="ns-eyebrow text-base sm:text-lg opacity-70 mb-6">анкета · 16 шагов</div>
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
          <PhotoUploadView q={q} photos={photos} setPhotos={setPhotos} testMode={testMode} />
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

const PhotoUploadView = ({
  q,
  photos,
  setPhotos,
  testMode,
}: {
  q: Question;
  photos: UploadedPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
  testMode?: boolean;
}) => {
  const slots = q.slots || [];
  const baseMin = q.minPhotos ?? 1;
  const min = testMode ? 0 : baseMin;

  return (
    <div className="grid gap-4">
      {testMode && (
        <div
          className="text-xs px-4 py-3 rounded-xl border"
          style={{
            background: "hsl(20 60% 75% / 0.08)",
            borderColor: "hsl(20 60% 75% / 0.4)",
            color: "hsl(40 30% 95%)",
          }}
        >
          🧪 Тестовый режим — фото можно не загружать
        </div>
      )}
      {slots.map((slot) => (
        <PhotoSlotInput key={slot.id} slot={slot} photos={photos} setPhotos={setPhotos} />
      ))}
      <p className="text-xs opacity-60 mt-1">
        {min === 0
          ? "Фото не обязательны (тест) · до 10 МБ каждое (JPG, PNG, HEIC, WEBP)"
          : `Минимум ${min} фото · до 10 МБ каждое (JPG, PNG, HEIC, WEBP)`}
      </p>
    </div>
  );
};

const PhotoSlotInput = ({
  slot,
  photos,
  setPhotos,
}: {
  slot: PhotoSlot;
  photos: UploadedPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const slotPhotos = photos.filter((p) => p.slotId === slot.id);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const sessionId = sessionStorage.getItem("ns_session") ||
        (() => {
          const id = crypto.randomUUID();
          sessionStorage.setItem("ns_session", id);
          return id;
        })();

      const newPhotos: UploadedPhoto[] = [];
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`Файл "${file.name}" больше 10 МБ`);
          continue;
        }
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${sessionId}/${slot.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage
          .from("stylist-uploads")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error) {
          console.error("Upload error:", error);
          toast.error(`Не удалось загрузить "${file.name}"`);
          continue;
        }
        newPhotos.push({ slotId: slot.id, path, name: file.name, size: file.size });
      }
      if (newPhotos.length > 0) {
        setPhotos((prev) => [...prev, ...newPhotos]);
        toast.success(`Загружено: ${newPhotos.length}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Ошибка загрузки");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removePhoto = (path: string) => {
    setPhotos((prev) => prev.filter((p) => p.path !== path));
    void supabase.storage.from("stylist-uploads").remove([path]).catch(() => {});
  };

  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        background: "hsl(0 0% 100% / 0.03)",
        borderColor: "hsl(0 0% 100% / 0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">{slot.label}</span>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors disabled:opacity-50"
          style={{
            background: "hsl(20 60% 75% / 0.15)",
            border: "1px solid hsl(20 60% 75% / 0.4)",
            color: "hsl(40 40% 92%)",
          }}
        >
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImagePlus className="w-3.5 h-3.5" />}
          {uploading ? "Загружаю…" : "Добавить"}
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
      {slotPhotos.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {slotPhotos.map((p) => (
            <div
              key={p.path}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: "hsl(0 0% 100% / 0.06)",
                border: "1px solid hsl(0 0% 100% / 0.12)",
              }}
            >
              <Check className="w-3 h-3" style={{ color: "hsl(20 60% 78%)" }} />
              <span className="opacity-80 max-w-[180px] truncate">{p.name}</span>
              <button
                onClick={() => removePhoto(p.path)}
                aria-label="Удалить"
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs opacity-50 flex items-center gap-2">
          <Upload className="w-3.5 h-3.5" />
          Файл не выбран
        </div>
      )}
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

// ===== Calligraphy title — два рукописных акцента в каждом заголовке =====
// Стоп-слова, которые НЕ выделяем курсивом (служебные части речи)
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
    // fallback — первое и последнее
    picks.add(0);
    if (words.length > 1) picks.add(words.length - 1);
    return picks;
  }
  // первое значимое
  picks.add(meaningful[0]);
  // последнее значимое (если отличается)
  const last = meaningful[meaningful.length - 1];
  if (last !== meaningful[0]) {
    picks.add(last);
  } else if (words.length - 1 !== meaningful[0]) {
    // есть только одно значимое — добавим финальное слово как акцент
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
