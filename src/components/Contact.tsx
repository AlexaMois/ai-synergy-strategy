import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router-dom";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { trackFormSubmission } from "@/utils/analytics";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Обязательное поле").max(100, "Максимум 100 символов"),
  company: z.string().trim().min(1, "Обязательное поле").max(100, "Максимум 100 символов"),
  industry: z.string().trim().min(1, "Обязательное поле").max(100, "Максимум 100 символов"),
  phone: z.string().trim().min(1, "Обязательное поле").max(30, "Максимум 30 символов"),
  email: z.string().trim().email("Введите корректный email").max(255, "Максимум 255 символов"),
  comment: z.string().trim().max(1000, "Максимум 1000 символов").optional(),
  consent: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных")
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  defaultComment?: string;
}

const Contact = ({ defaultComment = "" }: ContactProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  const {
    ref,
    getStaggeredClass
  } = useMobileAnimations({
    threshold: 0.2
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
      phone: "",
      email: "",
      comment: defaultComment,
      consent: false
    }
  });

  const consentValue = watch("consent");

  // Honeypot state - hidden from users, bots will fill it
  const [honeypot, setHoneypot] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('send-to-telegram', {
        body: {
          formType: 'contact',
          data: {
            name: data.name,
            company: data.company,
            industry: data.industry,
            phone: data.phone,
            email: data.email,
            comment: data.comment || '',
          },
          pageUrl: location.pathname,
          website: honeypot, // Honeypot field
        },
      });

      if (error) {
        console.error("Error sending to Telegram:", error);
        // Handle rate limit error
        if (error.message?.includes("429") || error.message?.includes("rate")) {
          toast.error("Слишком много запросов. Пожалуйста, попробуйте позже.");
        } else {
          toast.error("Произошла ошибка при отправке. Попробуйте ещё раз.");
        }
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
      <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-gradient-to-b from-white via-white to-gray-50/50 section-gradient-bottom-light overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`p-8 sm:p-12 rounded-2xl bg-card border border-border shadow-soft ${getStaggeredClass(1, 'animate-scale-in')}`}>
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
    <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-gradient-to-b from-white via-white to-gray-50/50 section-gradient-bottom-light overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Двухколоночный макет */}
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12">
            {/* Левая колонка - текст */}
            <div className={`${getStaggeredClass(1, 'animate-fade-in-up')}`}>
              <h2 className="section-title mb-4">
                Будем <span className="font-semibold">на связи</span>
              </h2>
              <p className="text-foreground text-lg">
                Оставьте свои контакты, и я свяжусь с вами,
                чтобы обсудить задачу и понять, где ИИ действительно даст эффект.
              </p>
            </div>

            {/* Правая колонка - форма */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className={`p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-soft ${getStaggeredClass(2, 'animate-fade-in-up')}`}
            >
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

              {/* Компания */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Компания <span className="text-primary">*</span>
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
                  Отрасль <span className="text-primary">*</span>
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

              {/* Телефон */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Телефон <span className="text-primary">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  {...register("phone")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email - full width */}
            <div className="space-y-2 mb-4 sm:mb-6">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-primary">*</span>
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

            {/* Комментарий - full width */}
            <div className="space-y-2 mb-4 sm:mb-6">
              <Label htmlFor="comment" className="text-foreground">
                Комментарий
              </Label>
              <Textarea
                id="comment"
                placeholder="Расскажите о вашей задаче"
                rows={4}
                {...register("comment")}
                className={errors.comment ? "border-destructive" : ""}
              />
              {errors.comment && (
                <p className="text-sm text-destructive">{errors.comment.message}</p>
              )}
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
                    <Link to="/consent" className="text-primary hover:underline">
                      условиями обработки персональных данных
                    </Link>
                    . Сайт не передаёт информацию третьим лицам.
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-destructive mt-2">{errors.consent.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto h-12 px-8 text-base shrink-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </Button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
