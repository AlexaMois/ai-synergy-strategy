import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { DollarSign, Clock, Users, Shield, Briefcase, Unlock, LucideIcon } from "lucide-react";

const FAQ = () => {
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  const faqs: { question: string; answer: string; icon: LucideIcon }[] = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer:
        "Стоимость зависит от задач. На экспресс-аудите я показываю, какой объём работ действительно нужен — и где бюджет можно оптимизировать.",
      icon: DollarSign,
    },
    {
      question: "Сколько это занимает?",
      answer:
        "Экспресс-аудит — 60 минут. Интеграции — от 2 недель. Сложные проекты — 2–4 месяца.",
      icon: Clock,
    },
    {
      question: "Команда поймёт, что происходит?",
      answer:
        "Да. Объясняю простым языком. Каждый проект завершается обучением сотрудников.",
      icon: Users,
    },
    {
      question: "А если решение не сработает?",
      answer:
        "На этапе диагностики я отсекаю нерабочие идеи. Внедряем только то, что имеет доказанный экономический эффект.",
      icon: Shield,
    },
    {
      question: "Вы работаете с нашей отраслью?",
      answer:
        "Да. Логистика, PR, финансы, медицина, образование, ритейл.",
      icon: Briefcase,
    },
    {
      question: "Будем зависеть от вас?",
      answer:
        "Нет. Я создаю автономные системы и передаю управляемый продукт.",
      icon: Unlock,
    },
  ];

  return (
    <section ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-20 left-20 w-[400px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.7}px) rotate(25deg)` }}
      />
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center leading-tight ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}>
          Частые вопросы, <span className="font-semibold">ответы на главное</span>
        </h2>

        <div className={`max-w-4xl mx-auto ${getStaggeredClass(1, 'animate-fade-in-up')}`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-2 border-border pb-3"
                >
                  <AccordionTrigger className="text-left text-lg font-medium text-text-heading hover:text-accent hover:bg-gray-100/50 transition-colors duration-200 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-accent shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-text-body leading-relaxed pt-3 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-12 text-center">
            <Button 
              className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
              asChild
            >
              <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                Запросить экспресс-аудит
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
