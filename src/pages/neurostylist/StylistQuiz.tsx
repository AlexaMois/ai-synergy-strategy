import { useEffect, useMemo, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { QUIZ_QUESTIONS, type Question } from "./quizConfig";

interface StylistQuizProps {
  onClose: () => void;
}

type AnswerValue = string | string[];

const StylistQuiz = ({ onClose }: StylistQuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const current: Question | undefined = QUIZ_QUESTIONS[step];
  const progress = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const isAnswered = (q: Question): boolean => {
    const v = answers[q.id];
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
      toast.error("Это поле важно для подбора образа");
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
      const name = (answers["name"] as string) || "";
      const contactRaw = ((answers["contact"] as string) || "").trim();
      const contact_type: "telegram" | "phone" =
        /^[+\d\s()\-]+$/.test(contactRaw) && contactRaw.replace(/\D/g, "").length >= 7
          ? "phone"
          : "telegram";

      const payload = QUIZ_QUESTIONS
        .filter((q) => q.id !== "name" && q.id !== "contact")
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
          return { question: q.title, value: typeof v === "string" ? v : "" };
        });

      const { data, error } = await supabase.functions.invoke("save-stylist-lead", {
        body: {
          name,
          contact: contactRaw,
          contact_type,
          answers: payload,
          website,
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
      toast.error("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at top right, hsl(290 30% 18%) 0%, hsl(295 35% 12%) 50%, hsl(300 20% 8%) 100%)",
        color: "hsl(40 30% 95%)",
      }}
    >
      {/* Soft glow accents */}
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

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 py-5">
        <div className="text-sm tracking-[0.2em] uppercase opacity-70">НейроСтилист</div>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      {!done && (
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
          <div className="mt-3 text-xs tracking-wider opacity-60">
            Шаг {step + 1} из {total}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 sm:px-10 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <FinalScreen onClose={onClose} />
          ) : current ? (
            <QuestionView
              key={current.id}
              q={current}
              value={answers[current.id]}
              onSetValue={(v) => setAnswer(current.id, v)}
              onToggleMulti={(v) => toggleMulti(current.id, v, current.maxSelect)}
              onEnter={handleNext}
            />
          ) : null}

          {/* Honeypot */}
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

      {/* Bottom action bar */}
      {!done && (
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
  onSetValue: (v: AnswerValue) => void;
  onToggleMulti: (v: string) => void;
  onEnter: () => void;
}

const QuestionView = ({ q, value, onSetValue, onToggleMulti, onEnter }: QuestionViewProps) => {
  return (
    <div className="animate-fade-in">
      <h2
        className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {q.title}
      </h2>
      {q.subtitle && (
        <p className="mt-3 text-base sm:text-lg opacity-70 leading-relaxed">{q.subtitle}</p>
      )}

      <div className="mt-8 sm:mt-10">
        {q.type === "single" && q.options && (
          <div className="grid gap-3">
            {q.options.map((opt) => {
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
        )}

        {q.type === "multi" && q.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => {
              const arr = Array.isArray(value) ? value : [];
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
              <p className="col-span-full text-xs opacity-50 mt-1">
                Максимум {q.maxSelect}
              </p>
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
    <h2
      className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      Спасибо. Образ начинает складываться.
    </h2>
    <p className="mt-5 text-base sm:text-lg opacity-75 max-w-lg mx-auto leading-relaxed">
      Александра свяжется с тобой в течение 24 часов и пришлёт персональный разбор.
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