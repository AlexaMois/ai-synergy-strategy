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

const FAQ = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  const faqs = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer:
        "От 50 000 ₽ за быстрые решения до 500 000 ₽ за архитектуру и сопровождение. Начинаем с экспресс-аудита.",
    },
    {
      question: "Сколько это занимает?",
      answer:
        "Экспресс-аудит — 60 минут. Интеграции — от 2 недель. Сложные проекты — 2–4 месяца.",
    },
    {
      question: "Команда поймёт, что происходит?",
      answer:
        "Да. Объясняю простым языком. Каждый проект завершается обучением сотрудников.",
    },
    {
      question: "А если решение не сработает?",
      answer:
        "Есть пилот. Все гипотезы проверяем до масштабирования.",
    },
    {
      question: "Вы работаете с нашей отраслью?",
      answer:
        "Да. Логистика, PR, финансы, медицина, образование, ритейл.",
    },
    {
      question: "Будем зависеть от вас?",
      answer:
        "Нет. Я создаю автономные системы и передаю управляемый продукт.",
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
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-2 border-border pb-3"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-bold text-text-heading hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-text-body leading-relaxed pt-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Запросить экспресс-аудит
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
