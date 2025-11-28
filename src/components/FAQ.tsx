import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const FAQ = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const faqs = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer:
        "Начинаю с диагностики (от 150 000 ₽). Полное внедрение с сопровождением — от 500 000 ₽.",
    },
    {
      question: "Сколько времени займёт проект?",
      answer:
        "Диагностика — 2-4 недели. Пилотное внедрение — 1-3 месяца. Полномасштабное решение — 3-6 месяцев.",
    },
    {
      question: "Нужно ли обучать сотрудников?",
      answer:
        "Да, обучение — обязательная часть внедрения. Провожу практические воркшопы и создаю внутренние регламенты.",
    },
    {
      question: "Какие ошибки чаще всего допускают при внедрении ИИ?",
      answer:
        "Главная ошибка — внедрение ради хайпа, без измеримых целей. Вторая — игнорирование качества данных. Третья — отсутствие обучения команды.",
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className={`text-5xl md:text-6xl font-bold mb-24 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Вопросы и ответы
        </h2>

        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-2 border-border pb-4"
              >
                <AccordionTrigger className="text-left text-xl md:text-2xl font-bold hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground leading-relaxed pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
