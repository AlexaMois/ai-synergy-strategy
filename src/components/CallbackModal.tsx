import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { trackFormSubmission, trackZakazatZvonok } from "@/utils/analytics";

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  let cleaned = digits;
  if (cleaned.startsWith("8") || cleaned.startsWith("7")) cleaned = cleaned.slice(1);
  cleaned = cleaned.slice(0, 10);
  let formatted = "+7";
  if (cleaned.length > 0) formatted += " (" + cleaned.slice(0, 3);
  if (cleaned.length >= 3) formatted += ") " + cleaned.slice(3, 6);
  else if (cleaned.length > 0) formatted += ")";
  if (cleaned.length >= 6) formatted += "-" + cleaned.slice(6, 8);
  if (cleaned.length >= 8) formatted += "-" + cleaned.slice(8, 10);
  return formatted;
};

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

const schema = z.object({
  name: z.string().trim().min(1, "Обязательное поле").max(100, "Максимум 100 символов"),
  phone: z.string().regex(phoneRegex, "Введите номер в формате +7 (XXX) XXX-XX-XX"),
  comment: z.string().trim().max(1000, "Максимум 1000 символов").optional(),
  consent: z.boolean().refine((v) => v === true, "Необходимо согласие на обработку данных"),
});

type FormData = z.infer<typeof schema>;

export const CALLBACK_MODAL_EVENT = "openCallbackModal";

export type CallbackVariant = "callback" | "task";

export const openCallbackModal = (variant: CallbackVariant = "callback") => {
  window.dispatchEvent(new CustomEvent(CALLBACK_MODAL_EVENT, { detail: { variant } }));
};

export const openTaskModal = () => openCallbackModal("task");

const CallbackModal = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [variant, setVariant] = useState<CallbackVariant>("callback");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "+7", comment: "", consent: false },
  });

  const consentValue = watch("consent");
  const phoneValue = watch("phone");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { variant?: CallbackVariant } | undefined;
      const nextVariant: CallbackVariant = detail?.variant === "task" ? "task" : "callback";
      setVariant(nextVariant);
      if (nextVariant === "callback") {
        trackZakazatZvonok();
      }
      setIsSubmitted(false);
      reset({ name: "", phone: "+7", comment: "", consent: false });
      setOpen(true);
    };
    window.addEventListener(CALLBACK_MODAL_EVENT, handler);
    return () => window.removeEventListener(CALLBACK_MODAL_EVENT, handler);
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-to-telegram", {
        body: {
          formType: variant === "task" ? "task" : "callback",
          data: {
            name: data.name,
            company: "—",
            industry: "—",
            phone: data.phone,
            email: "callback@no-reply.local",
            comment:
              data.comment ||
              (variant === "task" ? "Запрос: обсудить задачу" : "Заказ обратного звонка"),
          },
          pageUrl: location.pathname,
          website: honeypot,
        },
      });
      if (error) {
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
      trackFormSubmission((variant === "task" ? "task" : "callback") as any);
    } catch (e) {
      console.error("callback submit error", e);
      toast.error("Произошла ошибка при отправке. Попробуйте ещё раз.");
      setIsSubmitting(false);
    }
  };

  const title = variant === "task" ? "Обсудить задачу" : "Заказать звонок";
  const description =
    variant === "task"
      ? "Опишите задачу и оставьте контакт — свяжусь в ближайшее рабочее время."
      : "Оставьте номер — я перезвоню в ближайшее рабочее время.";
  const submitLabel = variant === "task" ? "Отправить" : "Заказать звонок";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px]">
        {isSubmitted ? (
          <div className="py-6 text-center">
            <DialogHeader>
              <DialogTitle className="text-2xl">Спасибо, заявка отправлена</DialogTitle>
              <DialogDescription className="text-base text-foreground pt-2">
                Я свяжусь с вами в ближайшее рабочее время.
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="cb-name">Имя <span className="text-primary">*</span></Label>
                <Input
                  id="cb-name"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cb-phone">Телефон <span className="text-primary">*</span></Label>
                <Input
                  id="cb-phone"
                  type="tel"
                  placeholder="+7"
                  value={phoneValue}
                  onChange={(e) => setValue("phone", formatPhoneNumber(e.target.value), { shouldValidate: false })}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cb-comment">Комментарий</Label>
                <Textarea
                  id="cb-comment"
                  placeholder="Коротко о задаче (необязательно)"
                  rows={3}
                  {...register("comment")}
                />
              </div>
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <Input
                  name="website"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="cb-consent"
                  checked={consentValue}
                  onCheckedChange={(c) => setValue("consent", c as boolean)}
                  className={errors.consent ? "border-destructive" : ""}
                />
                <Label htmlFor="cb-consent" className="text-sm leading-relaxed cursor-pointer">
                  Я согласен(а) с{" "}
                  <Link to="/legal/consent" className="text-primary hover:underline" target="_blank">
                    условиями обработки персональных данных
                  </Link>
                </Label>
              </div>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}
              <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : submitLabel}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallbackModal;