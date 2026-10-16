import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PillButton from "@/components/PillButton";
import { Link } from "react-router-dom";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { submitForm } from "@/lib/formsClient";
import { toast } from "sonner";
import { trackFormSubmission } from "@/utils/analytics";

// Format phone number as +7 (XXX) XXX-XX-XX
const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  // Remove leading 8 or 7, we'll add +7 prefix
  let cleaned = digits;
  if (cleaned.startsWith('8') || cleaned.startsWith('7')) {
    cleaned = cleaned.slice(1);
  }
  
  // Limit to 10 digits (without country code)
  cleaned = cleaned.slice(0, 10);
  
  // Build formatted string
  let formatted = '+7';
  if (cleaned.length > 0) {
    formatted += ' (' + cleaned.slice(0, 3);
  }
  if (cleaned.length >= 3) {
    formatted += ') ' + cleaned.slice(3, 6);
  } else if (cleaned.length > 0) {
    formatted += ')';
  }
  if (cleaned.length >= 6) {
    formatted += '-' + cleaned.slice(6, 8);
  }
  if (cleaned.length >= 8) {
    formatted += '-' + cleaned.slice(8, 10);
  }
  
  return formatted;
};

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const CONTACT_CONTEXT_STORAGE_KEY = "aleksamois.contactContext";
const CONTACT_CONTEXT_EVENT = "aleksamois:contact-context";

const optionalText = (max: number) => z.string().trim().max(max, `Максимум ${max} символов`).optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Обязательное поле").max(100, "Максимум 100 символов"),
  company: optionalText(100),
  industry: optionalText(100),
  phone: z.string().regex(phoneRegex, "Введите номер в формате +7 (XXX) XXX-XX-XX"),
  email: z.string().trim().email("Введите корректный email").max(255, "Максимум 255 символов").optional().or(z.literal("")),
  comment: z.string().trim().min(1, "Опишите задачу").max(1000, "Максимум 1000 символов"),
  consent: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных")
});

type ContactFormData = z.infer<typeof contactSchema>;

type ContactContext = {
  industry: string;
  question: string;
  topic: string;
};

interface ContactProps {
  defaultComment?: string;
}

const Contact = ({ defaultComment = "" }: ContactProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactContext, setContactContext] = useState<ContactContext | null>(null);
  
  const {
    ref,
    getStaggeredClass
  } = useMobileAnimations({
    threshold: 0.2,
    revealAfterMs: 2000
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      industry: "",
      phone: "+7",
      email: "",
      comment: defaultComment,
      consent: false
    }
  });

  const consentValue = watch("consent");
  const phoneValue = watch("phone");

  const readContactContext = () => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(CONTACT_CONTEXT_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<ContactContext>;
      const nextContext: ContactContext = {
        industry: typeof parsed.industry === "string" ? parsed.industry : "",
        question: typeof parsed.question === "string" ? parsed.question : "",
        topic: typeof parsed.topic === "string" ? parsed.topic : "",
      };
      if (!nextContext.industry && !nextContext.question) return;
      setContactContext(nextContext);
      if (nextContext.industry && !watch("industry")) {
        setValue("industry", nextContext.industry, { shouldValidate: false });
      }
    } catch {
      setContactContext(null);
    }
  };

  useEffect(() => {
    readContactContext();
    window.addEventListener(CONTACT_CONTEXT_EVENT, readContactContext);
    return () => window.removeEventListener(CONTACT_CONTEXT_EVENT, readContactContext);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: false });
  };

  // Honeypot state - hidden from users, bots will fill it
  const [honeypot, setHoneypot] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Персональные данные уходят только в CRM (Bpium). В MAX — только номер записи.
      const result = await submitForm('short-lead', {
        name: data.name.trim(),
        phone: data.phone,
        email: data.email?.trim() || '',
        company: data.company?.trim() || '',
        industry: data.industry?.trim() || contactContext?.industry || '',
        task: [
          data.comment.trim(),
          contactContext?.industry ? `Выбранная отрасль: ${contactContext.industry}` : '',
          contactContext?.topic ? `Тема вопроса: ${contactContext.topic}` : '',
          contactContext?.question ? `Выбранный вопрос: ${contactContext.question}` : '',
        ].filter(Boolean).join('\n\n'),
        selectedIndustry: contactContext?.industry || '',
        selectedQuestion: contactContext?.question || '',
        selectedQuestionTopic: contactContext?.topic || '',
        formName: 'Форма обратной связи',
        consent: true,
        website: honeypot, // Honeypot field
      });

      if (!result.ok) {
        toast.error(result.error || "Произошла ошибка при отправке. Попробуйте ещё раз.");
        setIsSubmitting(false);
        return;
      }


      setIsSubmitting(false);
      setIsSubmitted(true);
      trackFormSubmission('contact');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Произошла ошибка при отправке. Попробуйте ещё раз.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`p-8 sm:p-12 rounded-3xl bg-card shadow-elevated ${getStaggeredClass(1, 'animate-scale-in')}`}>
              <h2 className="section-title mb-4">
                Спасибо, <span className="font-semibold">я свяжусь с вами</span>
              </h2>
              <p className="text-foreground">
                Обычно отвечаю в течение 24 часов в рабочие дни.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Двухколоночный макет */}
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12">
            {/* Левая колонка - текст */}
            <div className={`${getStaggeredClass(1, 'animate-fade-in-up')}`}>
              <h2 className="section-title mb-4">
                Расскажите, <span className="font-semibold">какую задачу хотите решить</span>
              </h2>
              <p className="text-foreground text-lg">
                Опишите, что сейчас отнимает время, мешает работе или приводит к лишним расходам.
                Обсудим возможное решение и сориентируем по дальнейшим шагам.
              </p>
            </div>

            {/* Правая колонка - форма */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className={`p-6 sm:p-8 rounded-3xl bg-card shadow-elevated ${getStaggeredClass(2, 'animate-fade-in-up')}`}
            >
            <div className="space-y-2 mb-4 sm:mb-6">
              <Label htmlFor="comment" className="text-foreground">
                Описание задачи <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="comment"
                placeholder="Что сейчас отнимает время, мешает работе или приводит к лишним расходам?"
                rows={5}
                {...register("comment")}
                className={errors.comment ? "border-destructive" : ""}
              />
              {errors.comment && (
                <p className="text-sm text-destructive">{errors.comment.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Имя */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Имя <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Телефон */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Телефон <span className="text-primary">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

              {/* Компания */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Компания
                </Label>
                <Input
                  id="company"
                  placeholder="Название компании"
                  {...register("company")}
                  className={errors.company ? "border-destructive" : ""}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company.message}</p>
                )}
              </div>

              {/* Отрасль */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-foreground">
                  Отрасль
                </Label>
                <Input
                  id="industry"
                  placeholder="Сфера деятельности"
                  {...register("industry")}
                  className={errors.industry ? "border-destructive" : ""}
                />
                {errors.industry && (
                  <p className="text-sm text-destructive">{errors.industry.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Honeypot field - hidden from users, catches bots */}
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Чекбокс и кнопка в одну строку на десктопе */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consentValue}
                    onCheckedChange={(checked) => setValue("consent", checked as boolean)}
                    className={errors.consent ? "border-destructive" : ""}
                  />
                  <Label htmlFor="consent" className="text-sm text-foreground leading-relaxed cursor-pointer">
                    Я согласен(а) с{" "}
                    <Link to="/legal/consent" className="text-primary hover:underline">
                      условиями обработки персональных данных
                    </Link>
                    . Данные обрабатываются в соответствии с политикой обработки персональных данных.
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-destructive mt-2">{errors.consent.message}</p>
                )}
              </div>

              <PillButton
                type="submit"
                variant="dark"
                disabled={isSubmitting}
                className="w-full md:w-auto justify-between md:justify-center shrink-0"
              >
                {isSubmitting ? "Отправка..." : "Обсудить задачу"}
              </PillButton>
            </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
