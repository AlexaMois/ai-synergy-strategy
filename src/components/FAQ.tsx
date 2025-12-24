import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { ArrowRight } from "lucide-react";
import { JSX } from "react";

const FAQ = () => {
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const faqs: { question: string; answer: JSX.Element }[] = [
    {
      question: "Сколько стоит?",
      answer: (
        <div className="space-y-3">
          <div className="space-y-1">
            <p>Разбор процесса: от 15 000 ₽</p>
            <p>План внедрения: от 60 000 ₽</p>
            <p>Пилот внедрения: 200–500 тыс.</p>
            <p>Полное внедрение: 500 тыс. — 2 млн</p>
          </div>
          <p>ROI считаю на каждом этапе. Если метрики не растут — переделываю за свой счёт.</p>
        </div>
      ),
    },
    {
      question: "Когда окупится?",
      answer: (
        <div className="space-y-3">
          <p>Первый результат (экономия времени, ошибки −30–50%) — через 4–8 недель.</p>
          <p>Полная окупаемость — через 3–6 месяцев.</p>
          <p>Не беру проекты с окупаемостью &gt;6 месяцев.</p>
        </div>
      ),
    },
    {
      question: "Люди будут сопротивляться?",
      answer: (
        <div className="space-y-3">
          <p>Да, если их не подготовить. Я показываю каждому выгоду лично:</p>
          <div className="space-y-1">
            <p>• Менеджер видит: лиды не теряются</p>
            <p>• Мастер видит: не нужно писать отчёты</p>
            <p>• Бухгалтер видит: первичка сама вбивается</p>
          </div>
          <p>Они просят ИИ, чтобы убрать рутину.</p>
        </div>
      ),
    },
    {
      question: "А если ИИ не подойдёт?",
      answer: (
        <div className="space-y-3">
          <p>После разбора я считаю ROI и говорю честно: вот результат или не трогайте ИИ, хватит процесса.</p>
          <p>В 30% случаев я говорю «не трогайте». Это экономия: вы не потратите деньги на эксперименты.</p>
        </div>
      ),
    },
    {
      question: "Вы работаете с нашей отраслью?",
      answer: (
        <div className="space-y-3">
          <p>Я работаю с процессами: закупки, продажи, документы, склад.</p>
          <p>36 проектов в производстве, торговле, логистике, строительстве.</p>
          <p>Я уже видел ваши боли в других компаниях и знаю, как их закрыть.</p>
        </div>
      ),
    },
    {
      question: "Зависим ли я от вас после внедрения?",
      answer: (
        <div className="space-y-3">
          <p>Нет. Вы получаете документацию, регламенты, обученную команду, чек-листы.</p>
          <p>Система работает без меня. Я на связи, но вы не зависите от меня.</p>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-[#0B1220] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center leading-tight text-white ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}>
          Частые вопросы, <span className="font-semibold">честные ответы</span>
        </h2>

        <div className={`max-w-4xl mx-auto bg-white rounded-3xl shadow-card p-6 sm:p-8 ${getStaggeredClass(1, 'animate-fade-in-up')}`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border pb-3"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-200 rounded-xl px-2 -mx-2">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground leading-relaxed pt-3">
                  {faq.answer}
                  <div className="mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        Разобрать мой процесс
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </a>
                    </Button>
                  </div>
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
