import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer:
        "Стоимость зависит от масштаба проекта. Начинаю с диагностики (от 150 000 ₽), которая даёт чёткую карту процессов и расчёт ROI. Полное внедрение с сопровождением — от 500 000 ₽.",
    },
    {
      question: "Сколько времени займёт проект?",
      answer:
        "Диагностика — 2-4 недели. Пилотное внедрение — 1-3 месяца. Полномасштабное решение — 3-6 месяцев. Всё зависит от сложности процессов и готовности данных.",
    },
    {
      question: "Нужно ли обучать сотрудников?",
      answer:
        "Да, обучение — обязательная часть внедрения. Провожу практические воркшопы и создаю внутренние регламенты. ИИ работает эффективно, только когда команда понимает, как с ним взаимодействовать.",
    },
    {
      question: "Какие ошибки чаще всего допускают при внедрении ИИ?",
      answer:
        "Главная ошибка — внедрение ради хайпа, без измеримых целей. Вторая — игнорирование качества данных. Третья — отсутствие обучения команды. Я помогаю избежать этих ловушек с самого начала.",
    },
    {
      question: "С какими отраслями вы работаете?",
      answer:
        "Опыт работы в ритейле, логистике, производстве, образовании, госсекторе и B2B-услугах. Подход универсален — главное, чтобы были данные и процессы, которые можно улучшить.",
    },
    {
      question: "Станет ли компания зависимой от вас после внедрения?",
      answer:
        "Нет. Моя задача — не создать зависимость, а передать компетенции. Обучаю команду, документирую решения и настраиваю процессы так, чтобы система работала без моего участия.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Часто задаваемые вопросы
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              Запросить диагностику процессов
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
