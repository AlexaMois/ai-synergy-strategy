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
import { JSX } from "react";

const FAQ = () => {
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.35);
  const faqs: { question: string; answer: string | JSX.Element; icon: LucideIcon }[] = [
    {
      question: "Сколько стоит внедрение ИИ?",
      answer: (
        <div className="space-y-3">
          <p className="font-medium">✅ Зависит от сложности:</p>
          <ul className="space-y-1.5 ml-4">
            <li>• Аудит: 6–200 тыс. ₽ (в зависимости от размера компании)</li>
            <li>• Стратегия + архитектура: 60–400 тыс. ₽</li>
            <li>• Сопровождение (месячный ретейнер): 50–150 тыс. ₽</li>
            <li>• Полный цикл (аудит → внедрение → 3 месяца сопровождения): 150–700 тыс. ₽</li>
          </ul>
          <p>Реальный пример: Грузовой Экспресс потратил 12 тыс. ₽ и окупился за 3 недели.</p>
          <p className="font-medium">Главное: я считаю ROI ВАШЕЙ компании, не мою комиссию.</p>
        </div>
      ),
      icon: DollarSign,
    },
    {
      question: "Сколько времени занимает внедрение?",
      answer: (
        <div className="space-y-3">
          <p className="font-medium">✅ Среднее:</p>
          <ul className="space-y-1.5 ml-4">
            <li>• Аудит: 3–4 недели</li>
            <li>• Архитектура + выбор инструментов: 4–8 недель</li>
            <li>• Первое внедрение: 2–12 недель (зависит от сложности)</li>
            <li>• Результаты: видны за 1–3 месяца</li>
          </ul>
          <p>Почему долго? Потому что я не навязываю первое попавшееся решение, а проектирую под вас. Спешка = 80% провалов.</p>
          <p>Реальный пример: Крайпотребсоюз внедрился за 3 недели, но аудит был 3 недели. Итого: 6 недель до результата.</p>
        </div>
      ),
      icon: Clock,
    },
    {
      question: "Команда поймёт, что происходит?",
      answer: (
        <div className="space-y-3">
          <p className="font-medium">✅ Да, это мой приоритет.</p>
          <p>Я:</p>
          <ul className="space-y-1.5 ml-4">
            <li>• Объясняю технологию на языке управления, а не на языке кодеров</li>
            <li>• Провожу вводные встречи для всей команды</li>
            <li>• Даю письменное объяснение каждого шага</li>
            <li>• Обучаю вашу команду, чтобы могли управлять после моего ухода</li>
          </ul>
          <p>Часто я слышу: "Первый консультант, который объяснил, а не запугал".</p>
        </div>
      ),
      icon: Users,
    },
    {
      question: "А если решение не сработает?",
      answer: (
        <div className="space-y-3">
          <p className="font-medium">✅ Три варианта страховки:</p>
          <div className="ml-4 space-y-2">
            <p><strong>1️⃣ Гарантия за мной:</strong><br />
            Если в течение 1 месяца после внедрения не достигнем обещанных метрик → я верну вам ретейнер за этот месяц.</p>
            
            <p><strong>2️⃣ Пилот перед полным внедрением:</strong><br />
            Сначала тестируем на подразделении (3–5 человек). Если не работает → откатываемся без потерь.</p>
            
            <p><strong>3️⃣ Совместная ответственность:</strong><br />
            Я не просто передаю отчёт и ухожу. Я сопровождаю 3 месяца и отвечаю за результат вместе с вами.</p>
          </div>
          <p>Реальная статистика: у моих клиентов 92% успеха с первой попытки.</p>
        </div>
      ),
      icon: Shield,
    },
    {
      question: "Вы работаете с нашей отраслью?",
      answer: (
        <div className="space-y-3">
          <p className="font-medium">✅ Я работала или работаю сейчас почти со всеми отраслями:</p>
          <ul className="space-y-1 ml-4">
            <li>✅ Ретейл (Крайпотребсоюз)</li>
            <li>✅ Логистика (Грузовой Экспресс)</li>
            <li>✅ SaaS (GolossOK)</li>
            <li>✅ Производство</li>
            <li>✅ HR и рекрутмент</li>
            <li>✅ Финтех</li>
            <li>✅ Call-центры</li>
          </ul>
          <p className="font-medium">ГЛАВНОЕ: я не ищу стандартное решение "для вашей отрасли". Я ищу решение именно для вашей компании — её процессов и данных.</p>
        </div>
      ),
      icon: Briefcase,
    },
    {
      question: "Будем зависеть от вас?",
      answer: (
        <div className="space-y-3">
          <p className="font-medium">✅ Нет. Моя задача — сделать вас независимыми.</p>
          <p>После моего ухода:</p>
          <ul className="space-y-1.5 ml-4">
            <li>✅ Ваша команда может управлять системой самостоятельно</li>
            <li>✅ Я документирую всё (инструкции, коды, архитектура)</li>
            <li>✅ Вы можете нанять разработчика для поддержки (я подскажу, что ему нужно)</li>
            <li>✅ Система работает на открытых инструментах (не привязана к одному вендору)</li>
          </ul>
          <p className="italic">Мой подход: "Если я тебя чему-то научила, но ты всё ещё зависишь от меня — я сделала что-то не так".</p>
        </div>
      ),
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
          ❓ Частые вопросы
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
