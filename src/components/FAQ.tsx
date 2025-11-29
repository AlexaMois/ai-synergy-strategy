import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { DollarSign, Clock, Users, Shield, Briefcase, Unlock, LucideIcon } from "lucide-react";

const FAQ = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  const faqs: { question: string; answer: string; icon: LucideIcon }[] = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer:
        "От 50 000 ₽ за быстрые решения до 500 000 ₽ за архитектуру и сопровождение. Начинаем с экспресс-аудита.",
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
        "Есть пилот. Все гипотезы проверяем до масштабирования.",
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
    <section ref={ref} className="relative py-16 bg-background overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className="absolute top-20 left-20 w-[400px] opacity-15 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallaxOffset * 0.7}px) rotate(25deg)` }}
      />
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold mb-12 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Частые вопросы
        </h2>

        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-2 border-border pb-3"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-bold text-text-heading hover:text-accent hover:bg-gray-100/50 transition-colors duration-200 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-accent shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-text-body leading-relaxed pt-3 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="px-8"
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
