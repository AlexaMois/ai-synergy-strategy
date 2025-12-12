import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";

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

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      comment: "",
      consent: false
    }
  });

  const consentValue = watch("consent");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission (CRM/email)
    console.log("Form data:", data);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className={`p-8 sm:p-12 rounded-2xl bg-[hsl(var(--gray-50))] shadow-card gradient-border ${getStaggeredClass(1, 'animate-scale-in')}`}>
              <h2 className="text-2xl sm:text-3xl font-medium text-text-heading mb-4">
                Спасибо, я свяжусь с вами
              </h2>
              <p className="text-text-body">
                Обычно отвечаю в течение 24 часов в рабочие дни.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-medium text-text-heading mb-4 ${getStaggeredClass(1, 'animate-fade-in-up')}`}>
              Будем на связи
            </h2>
            <p className={`text-text-body text-lg ${getStaggeredClass(2, 'animate-fade-in-up')}`}>
              Оставьте свои контакты, и я свяжусь с вами,<br className="hidden sm:block" />
              чтобы обсудить задачу и понять, где ИИ действительно даст эффект.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={`p-6 sm:p-8 rounded-2xl bg-[hsl(var(--gray-50))] shadow-card gradient-border ${getStaggeredClass(3, 'animate-fade-in-up')}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Имя */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-text-heading">
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
                <Label htmlFor="company" className="text-text-heading">
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
                <Label htmlFor="industry" className="text-text-heading">
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
                <Label htmlFor="phone" className="text-text-heading">
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
              <Label htmlFor="email" className="text-text-heading">
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
              <Label htmlFor="comment" className="text-text-heading">
                Комментарий
              </Label>
              <Textarea
                id="comment"
                placeholder="Расскажите о вашей задаче (необязательно)"
                rows={4}
                {...register("comment")}
                className={errors.comment ? "border-destructive" : ""}
              />
              {errors.comment && (
                <p className="text-sm text-destructive">{errors.comment.message}</p>
              )}
            </div>

            {/* Чекбокс согласия */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={consentValue}
                  onCheckedChange={(checked) => setValue("consent", checked as boolean)}
                  className={errors.consent ? "border-destructive" : ""}
                />
                <Label htmlFor="consent" className="text-sm text-text-body leading-relaxed cursor-pointer">
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

            {/* Кнопка отправки */}
            <Button 
              type="submit" 
              className="w-full sm:w-auto h-12 px-8 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
