import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { DollarSign, Clock, Users, Shield, Briefcase, Unlock, LucideIcon } from "lucide-react";
import { JSX } from "react";

const FAQ = () => {
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const faqs: { question: string; answer: string | JSX.Element; icon: LucideIcon }[] = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer: (
        <div className="space-y-3">
          <p>Цена определяется архитектурой решения, а не технологией.</p>
          <p>Моя задача — найти вариант с максимальной отдачей на вложенный рубль.</p>
          <p>Это может быть как простая настройка сервиса, так и сложная интеграция. Главное — я всегда начинаю с расчета экономики проекта.</p>
        </div>
      ),
      icon: DollarSign,
    },
    {
      question: "Сколько времени занимает внедрение?",
      answer: (
        <div className="space-y-3">
          <p>Я уделяю максимум времени проектированию и техзаданию. В этом 70% успеха всего проекта.</p>
          <p>Вдумчивая архитектура на старте гарантирует быстрое и безошибочное внедрение на финише.</p>
        </div>
      ),
      icon: Clock,
    },
    {
      question: "Команда поймёт, что происходит?",
      answer: (
        <div className="space-y-3">
          <p>Да, работа с людьми — в том числе основа моего подхода.</p>
          <p>Я встраиваю ИИ в привычные коллективу процессы и показываю, как ту же самую задачу можно делать по-другому.</p>
          <p>После обучения сотрудники просто начинают использовать ИИ для тех же самых задач. Таким образом, задачи выполняются быстрее.</p>
        </div>
      ),
      icon: Users,
    },
    {
      question: "А если решение не сработает?",
      answer: (
        <div className="space-y-3">
          <p>Мы можем исключить этот риск только на этапе Аудита, пройдя его полностью.</p>
          <p>После Аудита вы получаете все точки для внедрения ИИ, точный расчет окупаемости и выбор из нескольких вариантов реализации.</p>
          <p>Тогда у вас нет риска, что решение окажется бесполезным.</p>
        </div>
      ),
      icon: Shield,
    },
    {
      question: "Вы работаете с нашей отраслью?",
      answer: (
        <div className="space-y-3">
          <p>Я работаю с бизнес-процессами: наймом, продажами, логистикой, учетом.</p>
          <p>Эти механизмы универсальны для любого бизнеса.</p>
          <p>Я использую свой опыт, чтобы ускорить ваши данные и сделать процессы прозрачными.</p>
        </div>
      ),
      icon: Briefcase,
    },
    {
      question: "Будем ли мы зависеть от вас?",
      answer: (
        <div className="space-y-3">
          <p>Вы получаете полный комплект: работающий софт, документацию, регламенты и обученную команду.</p>
          <p>В итоге у вас остается актив, который продолжает работать и развиваться самостоятельно и независимо от меня.</p>
        </div>
      ),
      icon: Unlock,
    },
  ];

  return (
    <section ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center leading-tight ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}>
          Частые вопросы, <span className="font-semibold">честные ответы</span>
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
                  <AccordionTrigger className="text-left text-base font-medium text-text-heading hover:text-accent hover:bg-gray-100/50 transition-colors duration-200 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-accent shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-text-body leading-relaxed pt-3 pl-8">
                    {typeof faq.answer === 'string' ? faq.answer : faq.answer}
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
                Пройти экспресс-аудит процессов
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
