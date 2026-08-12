import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { submitForm } from "@/lib/formsClient";
import { markDiagnosticStarted, markDiagnosticSubmitted } from "@/lib/diagnosticState";
import {
  DiagnosticForm as FormData,
  emptyForm,
  Option,
  aiUsageOptions,
  budgetOptions,
  dataStorageOptions,
  decisionMakerOptions,
  frequencyOptions,
  labelOf,
  labelsOf,
  lossOptions,
  manualActionOptions,
  readinessLevel,
  readyForCallOptions,
  systemOptions,
  teamSizeOptions,
  urgencyOptions,
  wantsDraftOptions,
} from "./diagnosticConfig";

const TOTAL_STEPS = 8;
const DRAFT_KEY = "diagnostic-draft-v1";

type Errors = Partial<Record<keyof FormData, string>>;

/* ---------- черновик ---------- */

const loadDraft = (): { step: number; form: FormData } | null => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { step?: number; form?: Partial<FormData> };
    if (!parsed?.form) return null;
    const step = Math.min(Math.max(Number(parsed.step) || 1, 1), TOTAL_STEPS);
    return { step, form: { ...emptyForm, ...parsed.form } };
  } catch {
    return null;
  }
};

const saveDraft = (step: number, form: FormData) => {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, form }));
    markDiagnosticStarted();
  } catch {
    /* приватный режим — просто не сохраняем */
  }
};

const clearDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
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
        min={type === "number" ? 1 : undefined}
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
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all min-h-[52px] ${
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
          </button>
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
          <button
            key={o.id}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() =>
              onChange(active ? value.filter((v) => v !== o.id) : [...value, o.id])
            }
            className={`text-left rounded-2xl border px-4 py-3 text-sm md:text-base transition-all min-h-[52px] ${
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
          </button>
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
  const [form, setForm] = useState<FormData>(draft?.form ?? emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const submittedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  // сохраняем черновик после каждого изменения
  useEffect(() => {
    if (!recordId) saveDraft(step, form);
  }, [step, form, recordId]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const scrollTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = (s: number): Errors => {
    const e: Errors = {};
    const isPositiveInt = (v: string) => /^\d+$/.test(v.trim()) && Number(v) >= 1;
    const isPositiveNum = (v: string) =>
      /^\d+([.,]\d+)?$/.test(v.trim().replace(",", ".")) && Number(v.replace(",", ".")) > 0;

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
      if (!isPositiveNum(form.hoursPerWeek))
        e.hoursPerWeek = "Укажите число часов больше нуля";
    }
    if (s === 3) {
      if (form.losses.length === 0) e.losses = "Отметьте, что теряется или задерживается";
      if (!form.consequences.trim()) e.consequences = "Опишите, к чему приводят проблемы";
    }
    if (s === 4) {
      if (form.systems.length === 0) e.systems = "Отметьте используемые программы и системы";
      if (!form.aiUsage) e.aiUsage = "Выберите один вариант";
      if (!form.dataStorage) e.dataStorage = "Выберите один вариант";
    }
    if (s === 5) {
      if (!form.goal.trim()) e.goal = "Опишите результат за 1–3 месяца";
      if (!form.successCriteria.trim()) e.successCriteria = "Укажите критерий результата";
      if (!form.urgency) e.urgency = "Выберите срочность задачи";
    }
    if (s === 6) {
      if (!form.budget) e.budget = "Выберите рассматриваемый бюджет";
      if (!form.decisionMaker) e.decisionMaker = "Укажите, кто принимает решение";
      if (!form.readyForCall) e.readyForCall = "Выберите один вариант";
    }
    if (s === 7) {
      if (!form.companyName.trim()) e.companyName = "Укажите название компании";
      if (!form.industry.trim()) e.industry = "Укажите сферу деятельности";
      if (!form.city.trim()) e.city = "Укажите город или регион";
      if (!form.teamSize) e.teamSize = "Выберите размер команды";
      if (form.website.trim() && !/^https?:\/\/\S+\.\S+/i.test(form.website.trim()))
        e.website = "Вставьте полную ссылку, например https://…";
    }
    if (s === 8) {
      if (!form.name.trim()) e.name = "Укажите ваше имя";
      if (!form.position.trim()) e.position = "Укажите должность";
      if (normalizePhone(form.phone).replace(/\D/g, "").length < 10)
        e.phone = "Укажите телефон, привязанный к MAX";
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        e.email = "Проверьте адрес электронной почты";
      if (!form.wantsDraft) e.wantsDraft = "Выберите один вариант";
      if (!form.consent) e.consent = "Нужно согласие на обработку персональных данных";
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
      void submit();
    }
  };

  const back = () => {
    setErrors({});
    setSubmitError(null);
    if (step > 1) {
      setStep(step - 1);
      scrollTop();
    }
  };

  const submit = async () => {
    if (submittedRef.current || submitting) return;
    submittedRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitForm("diagnostic", {
        process: form.process.trim(),
          manualActions: form.manualActions,
          processDescription: form.processDescription.trim(),
          participants: Math.trunc(Number(form.participants)),
          frequency: form.frequency,
          hoursPerWeek: Number(form.hoursPerWeek.replace(",", ".")),
          losses: form.losses,
          consequences: form.consequences.trim(),
          systems: form.systems,
          aiUsage: form.aiUsage,
          dataStorage: form.dataStorage,
          goal: form.goal.trim(),
          successCriteria: form.successCriteria.trim(),
          urgency: form.urgency,
          budget: form.budget,
          decisionMaker: form.decisionMaker,
          readyForCall: form.readyForCall,
          companyOwner: form.companyOwner.trim(),
          companyName: form.companyName.trim(),
          industry: form.industry.trim(),
          city: form.city.trim(),
          website: form.website.trim(),
          teamSize: form.teamSize,
          name: form.name.trim(),
          position: form.position.trim(),
          phone: normalizePhone(form.phone),
          email: form.email.trim(),
          notes: form.notes.trim(),
          wantsDraft: form.wantsDraft,
          consent: true,
      });
      const id = result.recordId;
      if (!result.ok || !id) {
        submittedRef.current = false;
        setSubmitError(
          result.error ||
            "Не удалось отправить анкету. Проверьте соединение и попробуйте ещё раз или напишите на ai@aleksamois.ru"
        );
        return;
      }
      clearDraft();
      markDiagnosticSubmitted();
      setRecordId(id);
      scrollTop();
    } catch {
      submittedRef.current = false;
      setSubmitError(
        "Не удалось отправить анкету. Проверьте соединение и попробуйте ещё раз или напишите на ai@aleksamois.ru"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const readiness = useMemo(() => readinessLevel(form), [form]);

  /* ---------- итоговый экран (только после 200 OK и ID) ---------- */
  if (recordId) {
    return (
      <div ref={topRef} className="max-w-4xl mx-auto">
        <div className="rounded-[28px] md:rounded-[36px] bg-surface-mint p-6 md:p-10 ring-1 ring-foreground/5 shadow-plate">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full mb-5">
            <Check className="w-4 h-4" />
            <span className="text-sm font-semibold">Анкета отправлена</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            Спасибо. Предварительный разбор процессов завершён.
          </h3>
          <p className="text-base md:text-lg text-foreground/75 mb-8">
            Мы изучим ответы и свяжемся с вами в MAX для короткого разговора на 15–20 минут.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <SummaryRow title="Выбранный процесс">{form.process}</SummaryRow>
            <SummaryRow title="Основные ручные действия">
              {labelsOf(manualActionOptions, form.manualActions).join(", ")}
            </SummaryRow>
            <SummaryRow title="Масштаб процесса">
              {form.participants} чел. · {labelOf(frequencyOptions, form.frequency).toLowerCase()} ·
              около {form.hoursPerWeek} ч в неделю
            </SummaryRow>
            <SummaryRow title="Проблемы и риски">
              {labelsOf(lossOptions, form.losses).join(", ")}
              {form.consequences && (
                <span className="block mt-1.5 text-muted-foreground">{form.consequences}</span>
              )}
            </SummaryRow>
            <SummaryRow title="Используемые системы">
              {labelsOf(systemOptions, form.systems).join(", ")}
              <span className="block mt-1.5 text-muted-foreground">
                ИИ: {labelOf(aiUsageOptions, form.aiUsage)} · данные:{" "}
                {labelOf(dataStorageOptions, form.dataStorage)}
              </span>
            </SummaryRow>
            <SummaryRow title="Ваша цель">
              {form.goal}
              {form.successCriteria && (
                <span className="block mt-1.5 text-muted-foreground">
                  Критерий: {form.successCriteria}
                </span>
              )}
            </SummaryRow>
            <SummaryRow title="Готовность к следующему шагу">
              <span className="font-semibold">{readiness.title}</span>
              <span className="block mt-1.5 text-muted-foreground">{readiness.text}</span>
            </SummaryRow>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground mt-6 leading-relaxed">
            Это предварительная оценка по ответам анкеты. Точный экономический эффект, архитектура
            решения, бюджет и срок окупаемости определяются после анализа процесса и исходных данных.
          </p>
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
    5: { h: "Цель и срочность", sub: "Какой результат нужен" },
    6: { h: "Бюджет и решение", sub: "Как принимается решение" },
    7: { h: "О компании", sub: "Контекст бизнеса" },
    8: { h: "Контакт", sub: "Связь только через MAX" },
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div ref={topRef} className="max-w-4xl mx-auto">
      <div className="rounded-[28px] md:rounded-[36px] bg-card p-5 sm:p-7 md:p-10 ring-1 ring-foreground/5 shadow-plate">
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
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
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
              <TextField
                label="Сколько часов в неделю уходит на процесс?"
                type="number"
                value={form.hoursPerWeek}
                onChange={(v) => set("hoursPerWeek", v)}
                placeholder="10"
                hint="Суммарно по всем участникам, приблизительно"
                required
                error={errors.hoursPerWeek}
              />
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
                label="Используете ли вы инструменты искусственного интеллекта в работе?"
                options={aiUsageOptions}
                value={form.aiUsage}
                onChange={(v) => set("aiUsage", v)}
                required
                error={errors.aiUsage}
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
              <RadioGroup
                label="Насколько срочно нужно разобраться с задачей?"
                options={urgencyOptions}
                value={form.urgency}
                onChange={(v) => set("urgency", v)}
                required
                error={errors.urgency}
              />
            </>
          )}

          {step === 6 && (
            <>
              <RadioGroup
                label="Какой бюджет компания готова рассматривать, если расчёт подтвердит экономический эффект?"
                options={budgetOptions}
                value={form.budget}
                onChange={(v) => set("budget", v)}
                required
                error={errors.budget}
              />
              <RadioGroup
                label="Кто принимает решение?"
                options={decisionMakerOptions}
                value={form.decisionMaker}
                onChange={(v) => set("decisionMaker", v)}
                required
                error={errors.decisionMaker}
              />
              <RadioGroup
                label="Готов ли руководитель к разговору на 15–20 минут?"
                options={readyForCallOptions}
                value={form.readyForCall}
                onChange={(v) => set("readyForCall", v)}
                required
                error={errors.readyForCall}
              />
              <TextField
                label="Ответственный со стороны компании"
                value={form.companyOwner}
                onChange={(v) => set("companyOwner", v)}
                placeholder="Необязательно"
              />
            </>
          )}

          {step === 7 && (
            <>
              <TextField
                label="Название компании"
                value={form.companyName}
                onChange={(v) => set("companyName", v)}
                required
                error={errors.companyName}
              />
              <TextField
                label="Сфера деятельности"
                value={form.industry}
                onChange={(v) => set("industry", v)}
                required
                error={errors.industry}
              />
              <TextField
                label="Город или регион"
                value={form.city}
                onChange={(v) => set("city", v)}
                required
                error={errors.city}
              />
              <TextField
                label="Сайт или соцсети компании"
                value={form.website}
                onChange={(v) => set("website", v)}
                placeholder="https://example.ru"
                hint="Вставьте полную ссылку, например https://…"
                error={errors.website}
              />
              <RadioGroup
                label="Размер команды"
                options={teamSizeOptions}
                value={form.teamSize}
                onChange={(v) => set("teamSize", v)}
                required
                error={errors.teamSize}
              />
            </>
          )}

          {step === 8 && (
            <>
              <TextField
                label="Ваше имя"
                value={form.name}
                onChange={(v) => set("name", v)}
                required
                error={errors.name}
              />
              <TextField
                label="Должность"
                value={form.position}
                onChange={(v) => set("position", v)}
                required
                error={errors.position}
              />
              <TextField
                label="Телефон, привязанный к MAX"
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                placeholder="+7 999 000 00 00"
                hint="Свяжемся только в MAX по этому номеру"
                required
                error={errors.phone}
              />
              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                placeholder="Необязательно"
                error={errors.email}
              />
              <AreaField
                label="Что важно знать перед первым разговором?"
                value={form.notes}
                onChange={(v) => set("notes", v)}
                placeholder="Необязательно"
                rows={3}
              />
              <RadioGroup
                label="Готовы получить предварительный вариант решения после короткого разговора?"
                options={wantsDraftOptions}
                value={form.wantsDraft}
                onChange={(v) => set("wantsDraft", v)}
                required
                error={errors.wantsDraft}
              />
              {/* honeypot */}
              <input
                type="text"
                name="company_extra"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                onChange={() => undefined}
              />
              <div>
                <label
                  className={`flex items-start gap-3 cursor-pointer rounded-2xl border bg-background p-4 ${
                    errors.consent ? "border-destructive" : "border-foreground/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 w-5 h-5 accent-accent shrink-0"
                  />
                  <span className="text-sm text-foreground/80 leading-relaxed">
                    Даю согласие на обработку персональных данных в соответствии с{" "}
                    <a
                      href="/legal/privacy-policy/"
                      className="text-accent underline underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      политикой конфиденциальности
                    </a>
                    .
                  </span>
                </label>
                <FieldError error={errors.consent} />
              </div>
            </>
          )}
        </div>

        {hasErrors && (
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertCircle className="w-4 h-4" /> Проверьте отмеченные поля
          </p>
        )}

        {submitError && (
          <div className="mt-6 rounded-2xl bg-destructive/10 p-4 ring-1 ring-destructive/20">
            <p className="flex items-start gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {submitError}
            </p>
          </div>
        )}

        {/* навигация */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1 || submitting}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-base font-semibold text-foreground/80 hover:text-foreground hover:border-foreground/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent text-accent-foreground pl-6 pr-2 py-2 min-h-[52px] text-base md:text-lg font-semibold shadow-card hover:shadow-elevated hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
          >
            <span>
              {submitting
                ? "Отправляем…"
                : step === TOTAL_STEPS
                ? "Отправить анкету"
                : "Продолжить"}
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform">
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticForm;