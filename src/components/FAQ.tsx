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
import { useNavigate, useLocation } from "react-router-dom";
import { trackCTAClick } from "@/utils/analytics";

const faqData = [
  {
    question: "Сколько стоит внедрение ИИ для бизнеса?",
    answerText: "Стоимость зависит от масштаба бизнеса и сложности задачи. Подробнее — на странице с ценами.",
  },
  {
    question: "Когда окупается внедрение ИИ?",
    answerText: "В наших кейсах — от 1 до 3 месяцев. Считаем окупаемость не «в теории», а в конкретных показателях: экономия часов сотрудников, снижение потерь заявок, ускорение платежей, снижение брака и переделок. Если окупаемость дольше 3–6 месяцев — мы честно говорим, что проект нецелесообразен.",
  },
  {
    question: "А если купить дешёвого бота или сделать своими силами?",
    answerText: "Можно. Именно так чаще всего и делают — до первого переделывания. Дешёвый бот не учитывает процессы, не масштабируется, ломается при росте нагрузки и требует постоянного «ручного допиливания». Мы проектируем промышленные решения, а не демо-ботов.",
  },
  {
    question: "Подойдёт ли ИИ именно нашей компании и отрасли?",
    answerText: "ИИ не универсален. Именно поэтому мы не продаём решение без диагностики. На старте разбираем: ваши процессы, данные, людей, ограничения. И даём честный ответ: где ИИ даст результат, где нужен порядок, а не нейросеть, где автоматизация вообще не нужна.",
  },
  {
    question: "Будет ли сопротивление сотрудников?",
    answerText: "Да — если внедрять ИИ «сверху». Поэтому мы встраиваем ИИ в привычные инструменты (Telegram, Google Sheets, CRM), показываем выгоду каждой роли, обучаем команду. В итоге сотрудники просят оставить систему, а не сопротивляются ей.",
  },
  {
    question: "А если ИИ не подойдёт или не даст эффект?",
    answerText: "Тогда вы узнаете это до больших затрат. Диагностика нужна именно для этого: проверить гипотезы, посчитать экономику, не тратить бюджет впустую. Мы не продаём ИИ «любой ценой».",
  },
  {
    question: "Буду ли я зависеть от вас после внедрения?",
    answerText: "Нет. Мы специально проектируем системы так, чтобы команда понимала, как они работают, документация оставалась у вас, и решения не держались на одном подрядчике.",
  },
  {
    question: "Вы работаете с конфиденциальными и чувствительными данными?",
    answerText: "Да. Используем закрытые контуры, локальные модели, решения без передачи данных в облако. Все данные могут храниться на вашем сервере либо на защищённой инфраструктуре в РФ.",
  },
  {
    question: "С чего правильнее начать внедрение ИИ?",
    answerText: "Не с выбора бота и не с покупки сервера. Правильный порядок: диагностика процессов, расчёт экономики, архитектура решения, пилот, масштабирование. Именно так ИИ становится инструментом бизнеса, а не экспериментом.",
  },
];

const faqRichAnswers: JSX.Element[] = [
  <div className="space-y-3">
    <p>Стоимость зависит от масштаба бизнеса и сложности задачи.</p>
    <p>Подробнее — на <a href="/pricing" className="text-primary hover:text-primary/80 underline transition-colors">странице с ценами</a>.</p>
  </div>,
  <div className="space-y-3">
    <p>В наших кейсах — от 1 до 3 месяцев.</p>
    <p>Считаем окупаемость не «в теории», а в конкретных показателях:</p>
    <div className="space-y-1">
      <p>• экономия часов сотрудников</p>
      <p>• снижение потерь заявок</p>
      <p>• ускорение платежей</p>
      <p>• снижение брака и переделок</p>
    </div>
    <p>Если окупаемость дольше 3–6 месяцев — мы честно говорим, что проект нецелесообразен.</p>
  </div>,
  <div className="space-y-3">
    <p>Можно. Именно так чаще всего и делают — до первого переделывания.</p>
    <p className="font-medium">Дешёвый бот:</p>
    <div className="space-y-1">
      <p>• не учитывает процессы</p>
      <p>• не масштабируется</p>
      <p>• ломается при росте нагрузки</p>
      <p>• требует постоянного «ручного допиливания»</p>
    </div>
    <p>Мы регулярно видим ситуации, где: «Дешевле было не начинать, чем потом переделывать».</p>
    <p>Мы проектируем промышленные решения, а не демо-ботов.</p>
  </div>,
  <div className="space-y-3">
    <p>ИИ не универсален. Именно поэтому мы не продаём решение без диагностики.</p>
    <p>На старте разбираем: ваши процессы, данные, людей, ограничения.</p>
    <p>И даём честный ответ:</p>
    <div className="space-y-1">
      <p>• где ИИ даст результат</p>
      <p>• где нужен порядок, а не нейросеть</p>
      <p>• где автоматизация вообще не нужна</p>
    </div>
    <p>Иногда лучший результат — не начинать проект.</p>
  </div>,
  <div className="space-y-3">
    <p>Да — если внедрять ИИ «сверху».</p>
    <p>Поэтому:</p>
    <div className="space-y-1">
      <p>• встраиваем ИИ в привычные инструменты (Telegram, Google Sheets, CRM)</p>
      <p>• показываем выгоду каждой роли</p>
      <p>• обучаем команду, а не просто запускаем систему</p>
    </div>
    <p>На практике: менеджеры не теряют заявки, бухгалтерия избавляется от ручной первички, руководитель получает прозрачную аналитику.</p>
    <p>В итоге сотрудники просят оставить систему, а не сопротивляются ей.</p>
  </div>,
  <div className="space-y-3">
    <p>Тогда вы узнаете это до больших затрат.</p>
    <p>Диагностика нужна именно для этого:</p>
    <div className="space-y-1">
      <p>• проверить гипотезы</p>
      <p>• посчитать экономику</p>
      <p>• не тратить бюджет впустую</p>
    </div>
    <p>Мы не продаём ИИ «любой ценой». Наша задача — результат, а не внедрение ради галочки.</p>
  </div>,
  <div className="space-y-3">
    <p>Нет.</p>
    <p>Мы специально проектируем системы так, чтобы:</p>
    <div className="space-y-1">
      <p>• команда понимала, как они работают</p>
      <p>• документация оставалась у вас</p>
      <p>• решения не держались на одном подрядчике</p>
    </div>
    <p>ИИ должен усиливать бизнес, а не привязывать его к исполнителю.</p>
  </div>,
  <div className="space-y-3">
    <p>Да.</p>
    <p>Используем: закрытые контуры, локальные модели, решения без передачи данных в облако.</p>
    <p>Все данные могут храниться на вашем сервере либо на защищённой инфраструктуре в РФ.</p>
    <p>Это особенно важно для: производства, финансов, логистики, договорной работы.</p>
  </div>,
  <div className="space-y-3">
    <p>Не с выбора бота и не с покупки сервера.</p>
    <p className="font-medium">Правильный порядок:</p>
    <div className="space-y-1">
      <p>• диагностика процессов</p>
      <p>• расчёт экономики</p>
      <p>• архитектура решения</p>
      <p>• пилот</p>
      <p>• масштабирование</p>
    </div>
    <p>Именно так ИИ становится инструментом бизнеса, а не экспериментом.</p>
    <p>👉 Если сомневаетесь — начните с диагностики.</p>
  </div>,
];

const FAQ = () => {
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    trackCTAClick({ location: 'faq' });
    
    if (location.pathname !== '/') {
      navigate('/#contact');
      return;
    }
    const element = document.querySelector('#contact');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answerText,
      }
    }))
  };

  return (
    <section ref={ref} className="relative py-10 md:py-16 lg:py-20 bg-gradient-to-b from-gray-100 to-gray-50 section-gradient-bottom-bg overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4">
        <h2 className={`section-title text-center leading-tight ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}>
          Частые вопросы, <span className="font-semibold">честные ответы</span>
        </h2>

        <div className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-0 ${getStaggeredClass(1, 'animate-fade-in-up')}`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.slice(0, 5).map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border pb-3"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-200 rounded-xl px-2 -mx-2">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-3">
                  {faqRichAnswers[index]}
                  <div className="mt-4">
                    <Button size="sm" onClick={scrollToContact}>
                      <span className="inline-flex items-center gap-2">
                        Разобрать мой процесс
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.slice(5).map((faq, index) => (
              <AccordionItem
                key={index + 5}
                value={`item-${index + 5}`}
                className="border-b border-border pb-3"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-200 rounded-xl px-2 -mx-2">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-3">
                  {faqRichAnswers[index + 5]}
                  <div className="mt-4">
                    <Button size="sm" onClick={scrollToContact}>
                      <span className="inline-flex items-center gap-2">
                        Разобрать мой процесс
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
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
