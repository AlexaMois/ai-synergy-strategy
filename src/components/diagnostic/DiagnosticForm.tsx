import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Download } from "lucide-react";
import PillButton from "@/components/PillButton";
import { Button } from "@/components/ui/button";
import { assessProcess, assessmentSections, assessmentText, ASSESSMENT_STEPS, validProcessTime } from "@/lib/processAssessment";
import { readIndustryContext, setContactIntent } from "@/lib/contactIntent";
import { saveAssessmentPdf } from "@/lib/assessmentPdf";
import { scrollToContact } from "@/lib/scrollToContact";
import { markDiagnosticStarted } from "@/lib/diagnosticState";
import {
  DiagnosticForm as FormData,
  emptyForm,
  Option,
  aiUsageOptions,
  dataStorageOptions,
  frequencyOptions,
  lossOptions,
  manualActionOptions,
  systemOptions,
} from "./diagnosticConfig";

const TOTAL_STEPS = ASSESSMENT_STEPS;
const DRAFT_KEY = "diagnostic-draft-v2";

type Errors = Partial<Record<keyof FormData, string>>;

/* ---------- черновик ---------- */

const loadDraft = (): { step: number; form: FormData } | null => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { step?: number; form?: Partial<FormData>; sourceQuestion?: string };
    if (!parsed?.form) return null;
    if ((readIndustryContext()?.question || "") !== (parsed.sourceQuestion || "")) return null;
    const step = Math.min(Math.max(Number(parsed.step) || 1, 1), TOTAL_STEPS + 1);
    return { step, form: { ...emptyForm, ...parsed.form } };
  } catch {
    return null;
  }
};

const saveDraft = (step: number, form: FormData) => {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, form, sourceQuestion: readIndustryContext()?.question || "" }));
    markDiagnosticStarted();
  } catch {
    /* приватный режим — просто не сохраняем */
  }
};

/* есть ли незавершённый черновик — нужно, чтобы форма снова открылась после обновления страницы */
export const hasDiagnosticDraft = () => {
  try {
    return !!sessionStorage.getItem(DRAFT_KEY);
  } catch {
    return false;
  }
};

/* нормализация телефона: только цифры, 8XXXXXXXXXX → +7XXXXXXXXXX */
export const normalizePhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  return d ? `+${d}` : "";
};

/* ---------- поля ---------- */

const Label = ({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm md:text-base font-semibold text-foreground mb-2"
  >
    {children}
    {required && <span className="text-accent"> *</span>}
  </label>
);

const inputCls =
  "w-full rounded-2xl border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition";

const FieldError = ({ error }: { error?: string }) =>
  error ? (
    <p className="mt-1.5 flex items-start gap-1.5 text-xs md:text-sm text-destructive">
      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      {error}
    </p>
  ) : null;

const MultiHint = () => (
  <p className="text-xs text-muted-foreground mb-2 -mt-1">Можно выбрать несколько вариантов</p>
);

const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  hint,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  hint?: string;
  error?: string;
}) => {
  const id = useId();
  return (
    <div>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => type !== "number" && onChange(e.target.value.trim())}
        placeholder={placeholder}
        className={`${inputCls} ${error ? "border-destructive" : "border-foreground/10"}`}
        inputMode={type === "number" ? "numeric" : undefined}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? "any" : undefined}
        aria-invalid={!!error}
      />
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
      <FieldError error={error} />
    </div>
  );
};

const AreaField = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
}) => {
  const id = useId();
  return (
    <div>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onChange(e.target.value.trim())}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`${inputCls} resize-y leading-relaxed ${
          error ? "border-destructive" : "border-foreground/10"
        }`}
      />
      <FieldError error={error} />
    </div>
  );
};

/* одиночный выбор — круглые радиокнопки */
const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
}) => (
  <div role="radiogroup" aria-label={label}>
    <Label required={required}>{label}</Label>
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <Button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all h-auto whitespace-normal justify-start min-h-[52px] ${
              active
                ? "border-accent bg-accent/10 text-foreground font-semibold"
                : "border-foreground/10 bg-card text-foreground/80 hover:border-accent/50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 border-2 ${
                  active ? "border-accent" : "border-foreground/25"
                }`}
              >
                {active && <span className="w-2.5 h-2.5 rounded-full bg-accent" />}
              </span>
              {o.label}
            </span>
          </Button>
        );
      })}
    </div>
    <FieldError error={error} />
  </div>
);

/* множественный выбор — квадратные чекбоксы с галочкой */
const CheckGroup = ({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
  error?: string;
}) => (
  <div role="group" aria-label={label}>
    <Label required={required}>{label}</Label>
    <MultiHint />
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value.includes(o.id);
        return (
          <Button
            key={o.id}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() =>
              onChange(active ? value.filter((v) => v !== o.id) : [...value, o.id])
            }
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all h-auto whitespace-normal justify-start min-h-[52px] ${
              active
                ? "border-accent bg-accent/10 text-foreground font-semibold"
                : "border-foreground/10 bg-card text-foreground/80 hover:border-accent/50"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-[6px] shrink-0 border-2 ${
                  active ? "bg-accent border-accent" : "border-foreground/25"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-accent-foreground" strokeWidth={3} />}
              </span>
              {o.label}
            </span>
          </Button>
        );
      })}
    </div>
    <FieldError error={error} />
  </div>
);

/* ---------- итоговый экран ---------- */

const SummaryRow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-card p-5 ring-1 ring-foreground/5">
    <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{title}</p>
    <div className="text-sm md:text-base text-foreground/85 leading-relaxed break-words">
      {children}
    </div>
  </div>
);

/* ---------- основной компонент ---------- */

const DiagnosticForm = () => {
  const draft = useMemo(loadDraft, []);
  const [step, setStep] = useState(draft?.step ?? 1);
  const [form, setForm] = useState<FormData>(() => {
    const context = readIndustryContext();
    return { ...(draft?.form ?? emptyForm), industry: context?.industry || draft?.form.industry || "", process: draft?.form.process === context?.question ? "" : draft?.form.process || "" };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [completed, setCompleted] = useState(draft?.step === 6);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  // сохраняем черновик после каждого изменения
  useEffect(() => {
    saveDraft(completed ? 6 : step, form);
  }, [step, form, completed]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = (s: number): Errors => {
    const e: Errors = {};
    const isPositiveInt = (v: string) => /^\d+$/.test(v.trim()) && Number(v) >= 1;

    if (s === 1) {
      if (!form.process.trim()) e.process = "Укажите процесс, который хотите улучшить";
      if (!form.processDescription.trim())
        e.processDescription = "Опишите, как процесс устроен сейчас";
      if (form.manualActions.length === 0)
        e.manualActions = "Отметьте хотя бы одно ручное действие";
    }
    if (s === 2) {
      if (!isPositiveInt(form.participants))
        e.participants = "Укажите целое число сотрудников больше нуля";
      if (!form.frequency) e.frequency = "Выберите частоту повторения процесса";
      if (!validProcessTime(form.hoursPerWeek))
        e.hoursPerWeek = "Укажите число часов больше нуля или выберите «Не знаю»";
    }
    if (s === 3) {
      if (form.losses.length === 0) e.losses = "Отметьте, что теряется или задерживается";
      if (!form.consequences.trim()) e.consequences = "Опишите, к чему приводят проблемы";
    }
    if (s === 4) {
      if (form.systems.length === 0) e.systems = "Отметьте используемые программы и системы";
      
      if (!form.dataStorage) e.dataStorage = "Выберите один вариант";
    }
    if (s === 5) {
      if (!form.goal.trim()) e.goal = "Опишите результат за 1–3 месяца";
      if (!form.successCriteria.trim()) e.successCriteria = "Укажите критерий результата";

    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      scrollTop();
    } else {
      setCompleted(true);
      scrollTop();
    }
  };

  const back = () => {
    setErrors({});

    if (step > 1) {
      setStep(step - 1);
      scrollTop();
    }
  };

  const result = useMemo(() => assessProcess(form), [form]);
  const context = readIndustryContext();
  const request = (kind: "implementation" | "meeting") => {
    setContactIntent({ kind, process: form.process, assessment: assessmentText(form, result) });
    scrollToContact();
  };

  if (completed) {
    return (
      <div ref={topRef} className="max-w-4xl mx-auto scroll-mt-24" data-assessment-result>
        <div className="rounded-[28px] md:rounded-[36px] bg-surface-mint p-6 md:p-10 ring-1 ring-foreground/5 shadow-plate">
          <p className="text-sm font-semibold text-accent mb-3">Самостоятельная проверка · результат</p>
          <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-5">Ваш процесс: {form.process}</h3>
          {context?.industry && <p className="text-muted-foreground mb-5">{context.industry} · {context.topic}</p>}
          <div className="grid gap-3 md:grid-cols-2">
            {assessmentSections(result).map(([title, value]) => <SummaryRow key={title} title={title}>{value}</SummaryRow>)}
          </div>
          <p className="text-sm text-muted-foreground mt-6">Это предварительная оценка по вашим ответам, не аудит и не расчёт окупаемости. Возможную причину и решение нужно подтвердить на данных процесса.</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
            <Button variant="outline" disabled={pdfBusy} onClick={async () => {
              setPdfBusy(true); setPdfError("");
              try { await saveAssessmentPdf(form, result); }
              catch { setPdfError("Не удалось сохранить PDF. Попробуйте ещё раз."); }
              finally { setPdfBusy(false); }
            }}><Download className="h-4 w-4 mr-2" />{pdfBusy ? "Готовим PDF…" : "Сохранить результат в PDF"}</Button>
            <Button variant="ghost" onClick={() => { setCompleted(false); setStep(1); scrollTop(); }}>Изменить ответы</Button>
          </div>
          {pdfError && <p role="alert" className="text-destructive mt-3">{pdfError}</p>}
          <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <PillButton onClick={() => request("implementation")} variant="turquoise" size="md">Обсудить внедрение</PillButton>
            <PillButton onClick={() => request("meeting")} variant="dark" size="md">Личный разбор · 17 000 ₽</PillButton>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- шаги ---------- */
  const titles: Record<number, { h: string; sub: string }> = {
    1: { h: "Ключевой процесс", sub: "С чего начинаем разбор" },
    2: { h: "Масштаб процесса", sub: "Сколько людей и времени он забирает" },
    3: { h: "Проблемы и риски", sub: "Что теряется сегодня" },
    4: { h: "Системы и данные", sub: "В чём работаете и где лежат данные" },
    5: { h: "Нужный результат", sub: "Какой результат нужен" },

  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div ref={topRef} className="max-w-4xl mx-auto scroll-mt-24">
      <div className="rounded-t-[28px] bg-foreground px-5 sm:px-7 md:px-10 py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-background">Самостоятельная проверка одного процесса</h2>
      </div>
      <div className="rounded-b-[28px] bg-card p-5 sm:p-7 md:p-10 ring-1 ring-foreground/5 shadow-plate">
        {context?.question && <div className="mb-6 border-l-4 border-accent pl-4"><p className="text-xs font-semibold text-accent mb-2">Выбранная проблема · {context.industry}</p><p className="text-base text-foreground leading-relaxed">{context.question}</p></div>}
        {/* прогресс */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">
              Шаг {step} из {TOTAL_STEPS}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          {titles[step].sub}
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6 md:mb-8">
          {titles[step].h}
        </h3>

        <div className="space-y-6">
          {step === 1 && (
            <>
              <TextField
                label="Какой один процесс или участок работы вы хотите улучшить в первую очередь?"
                value={form.process}
                onChange={(v) => set("process", v)}
                placeholder="Например: обработка входящих заявок"
                required
                error={errors.process}
              />
              <AreaField
                label="Опишите, как процесс устроен сейчас"
                value={form.processDescription}
                onChange={(v) => set("processDescription", v)}
                placeholder="Кто что делает, в какой последовательности, где возникают задержки"
                required
                error={errors.processDescription}
              />
              <CheckGroup
                label="Какие действия сотрудники регулярно выполняют вручную?"
                options={manualActionOptions}
                value={form.manualActions}
                onChange={(v) => set("manualActions", v)}
                required
                error={errors.manualActions}
              />
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                label="Сколько сотрудников участвует в процессе?"
                type="number"
                value={form.participants}
                onChange={(v) => set("participants", v)}
                placeholder="4"
                required
                error={errors.participants}
              />
              <RadioGroup
                label="С какой частотой повторяется процесс?"
                options={frequencyOptions}
                value={form.frequency}
                onChange={(v) => set("frequency", v)}
                required
                error={errors.frequency}
              />
              <div>
                <Label required>Сколько часов в неделю уходит на процесс?</Label>
                <div className="flex flex-wrap gap-3 mb-3" role="group" aria-label="Оценка времени">
                  <Button variant={form.hoursPerWeek === "unknown" ? "outline" : "default"} onClick={() => set("hoursPerWeek", "")}>Указать часы</Button>
                  <Button variant={form.hoursPerWeek === "unknown" ? "default" : "outline"} aria-pressed={form.hoursPerWeek === "unknown"} onClick={() => set("hoursPerWeek", "unknown")}>Не знаю</Button>
                </div>
                {form.hoursPerWeek !== "unknown" && <TextField
                  label="Часов в неделю, суммарно по всем участникам"
                  type="number"
                  value={form.hoursPerWeek}
                  onChange={(v) => set("hoursPerWeek", v)}
                  placeholder="10"
                  error={errors.hoursPerWeek}
                />}
                {form.hoursPerWeek === "unknown" && <FieldError error={errors.hoursPerWeek} />}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <CheckGroup
                label="Что чаще всего теряется, задерживается или выполняется с ошибками?"
                options={lossOptions}
                value={form.losses}
                onChange={(v) => set("losses", v)}
                required
                error={errors.losses}
              />
              <AreaField
                label="К чему приводят текущие проблемы?"
                value={form.consequences}
                onChange={(v) => set("consequences", v)}
                placeholder="Например: клиенты ждут ответа, руководитель не видит статус заявок"
                required
                error={errors.consequences}
              />
            </>
          )}

          {step === 4 && (
            <>
              <CheckGroup
                label="Какие программы и системы используются в этом процессе?"
                options={systemOptions}
                value={form.systems}
                onChange={(v) => set("systems", v)}
                required
                error={errors.systems}
              />
              <RadioGroup
                label="Где хранятся данные по этому процессу?"
                options={dataStorageOptions}
                value={form.dataStorage}
                onChange={(v) => set("dataStorage", v)}
                required
                error={errors.dataStorage}
              />
            </>
          )}

          {step === 5 && (
            <>
              <AreaField
                label="Какой результат нужен за 1–3 месяца?"
                value={form.goal}
                onChange={(v) => set("goal", v)}
                placeholder="Например: единая точка приёма заявок и контроль сроков ответа"
                required
                error={errors.goal}
              />
              <TextField
                label="По какому критерию вы поймёте, что результат достигнут?"
                value={form.successCriteria}
                onChange={(v) => set("successCriteria", v)}
                placeholder="Например: ни одна заявка не теряется"
                required
                error={errors.successCriteria}
              />

            </>
          )}


        </div>

        {hasErrors && (
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertCircle className="w-4 h-4" /> Проверьте отмеченные поля
          </p>
        )}

        {/* навигация */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
          <Button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-base font-semibold text-foreground/80 hover:text-foreground hover:border-foreground/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </Button>
          <Button
            type="button"
            onClick={next}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent text-accent-foreground pl-6 pr-2 py-2 min-h-[52px] text-base md:text-lg font-semibold shadow-card hover:shadow-elevated hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
          >
            <span>
              {step === TOTAL_STEPS ? "Показать результат" : "Продолжить"}
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticForm;