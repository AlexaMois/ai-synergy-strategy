import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Compass, 
  Building2, 
  Handshake, 
  Users, 
  AlertTriangle, 
  Info, 
  Cog, 
  Package, 
  Lightbulb, 
  FileText, 
  TrendingUp,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Для кого это": Users,
  "Какая боль закрывает": AlertTriangle,
  "Почему это важно": Info,
  "Как это работает": Cog,
  "Что вы получаете": Package,
  "В чём отличие": Lightbulb,
  "Реальный пример": FileText,
  "Результат": TrendingUp
};

const services = [
  {
    number: "01",
    icon: Compass,
    title: "Диагностика",
    subtitle: "Анализ ваших процессов и ИТ-ландшафта. Честный разбор где ИИ даст результат за месяц, где нужна подготовка процессов, где он вообще не нужен.",
    sections: [
      {
        heading: "Для кого это",
        content: "CEO, COO, ИТ-директора, которые хотят принимать технологические решения на основе фактов, а не предположений подрядчиков."
      },
      {
        heading: "Какая боль закрывает",
        list: [
          "Сложно понять что именно стоит автоматизировать",
          "Подрядчики предлагают разные решения, каждое «лучшее»",
          "Есть страх вложиться в инструмент, который не принесёт пользы",
          "Люди боятся изменений и не понимают зачем они нужны",
          "Нет единой картины процессов — только гипотезы"
        ]
      },
      {
        heading: "Почему это важно",
        content: "Часто компании внедряют решения, которые технически работают, но не приносят результата для бизнеса. Честный анализ помогает избежать этой ошибки."
      },
      {
        heading: "Как это работает",
        list: [
          "Разбираю цели бизнеса и контекст",
          "Исследую процессы: где теряются время, деньги, контроль",
          "Оцениваю зрелость данных и ИТ-ландшафт",
          "Смотрю что уже есть и что можно усилить без замены",
          "Формирую карту решений: полезные → возможные → лишние"
        ]
      },
      {
        heading: "Что вы получаете",
        list: [
          "Четкий ответ где ИИ даст эффект, а где нет",
          "Список решений, которые можно внедрить в ближайшие 2–6 недель",
          "Процессы которые нужно починить прежде чем автоматизировать",
          "Сценарии по уровню вложений: минимальный / оптимальный / расширенный",
          "Прозрачный прогноз нагрузки на команду",
          "Понимание где простота важнее мощности, а где наоборот"
        ]
      },
      {
        heading: "В чём отличие",
        content: "Я не оцениваю только технологии. Смотрю на смысл задачи, процессы, людей, данные и архитектуру вместе."
      },
      {
        heading: "Реальный пример",
        content: "В одной компании было шесть внедренных автоматизаций — ни одна не использовалась. После диагностики оказалось: решение лежало прямо под руками, просто было неправильно встроено в процесс."
      },
      {
        heading: "Результат",
        content: "Снижение потерь времени на 20–60%. Четкое понимание: где внедрять ИИ, за сколько, за какое время, что чинить прежде чем автоматизировать."
      }
    ],
    metrics: [
      { value: "20-60%", label: "снижение потерь времени" },
      { value: "2-6 нед", label: "до внедрения решений" },
      { value: "3", label: "сценария бюджета" }
    ],
    price: "от 15 000 ₽",
    timeline: "7–10 дней",
    cta: "Заказать диагностику →"
  },
  {
    number: "02",
    icon: Building2,
    title: "Архитектура",
    subtitle: "Проектирование AI-решения, которое встраивается в ваш процесс. Выбираем технологии без лишних затрат, определяем интеграцию с CRM, 1С, производственными системами, готовим техническое задание для разработчиков.",
    sections: [
      {
        heading: "Для кого это",
        content: "Для тех, кто хочет внедрять ИИ не «точечно», а как часть управленческой логики. Для компаний, которые знают что внедрять, но не знают как."
      },
      {
        heading: "Какая боль закрывает",
        list: [
          "Решения работают отдельно, не усиливают друг друга",
          "Бизнес сталкивается с перегруженными «коробками» инструментов",
          "Нет ясности что выбрать: какую платформу, какой язык модели, свой сервер или облако",
          "Смета подрядчиков неочевидна и кажется завышена",
          "Каждый инструмент живёт своей жизнью, нет интеграции"
        ]
      },
      {
        heading: "Почему это важно",
        content: "ИИ работает только тогда, когда идёт в связке с процессами. Если логики нет — эффект не появится, даже при дорогих технологиях."
      },
      {
        heading: "Как это работает",
        list: [
          "Формулируем что должно измениться в бизнесе",
          "Строю архитектуру: интеграции, маршруты данных, взаимодействие ролей",
          "Выбираю инструменты без привязки к вендорам (только нужные)",
          "Учитываю требования РФ: где данные, какие контуры, импортозамещение",
          "Проектирую три сценария внедрения: быстрый / оптимальный / фундаментальный",
          "Формирую карту внедрения с шагами, рисками, сроками"
        ]
      },
      {
        heading: "Что вы получаете",
        list: [
          "Ясную обоснованную архитектуру, которую понимают управленцы и ИТ",
          "Три сценария внедрения с разными затратами и сроками",
          "Прозрачные критерии выбора подрядчиков",
          "Конкретные требования к инструментам (а не размытые)",
          "Техническое задание для разработки",
          "Понимание где простота важнее мощности, а где наоборот",
          "Реальный бюджет и сроки разработки"
        ]
      },
      {
        heading: "В чём отличие",
        content: "Я соединяю управленческое мышление и инженерную точность. Смотрю на систему так же, как собственник или CTO."
      },
      {
        heading: "Реальный пример",
        content: "Компания хотела внедрить 14 инструментов. После архитектуры осталось 3 — самые простые и недорогие. Эффект от трёх инструментов оказался в разы выше, чем от первоначального плана."
      },
      {
        heading: "Результат",
        content: "Компании часто сокращают бюджет внедрения ×3–5, сохраняя качество. Понимание что внедрять и в каком порядке."
      }
    ],
    metrics: [
      { value: "×3-5", label: "экономия на внедрении" },
      { value: "3", label: "сценария реализации" },
      { value: "100%", label: "готовое ТЗ" }
    ],
    price: "от 60 000 ₽",
    timeline: "7–10 дней",
    cta: "Заказать архитектуру →"
  },
  {
    number: "03",
    icon: Handshake,
    title: "Сопровождение",
    subtitle: "Контроль разработки и реализации, обучение команды, гарантия результата. Я проверяю что подрядчик делает правильно и что обещанные метрики действительно достигаются.",
    sections: [
      {
        heading: "Для кого это",
        content: "Для компаний, которые хотят снизить риски и не быть заложниками технических подрядчиков. Для тех, кто разочарован предыдущими проектами."
      },
      {
        heading: "Какая боль закрывает",
        list: [
          "Сложно понять адекватна ли смета подрядчика",
          "Внедрения затягиваются и становятся сложнее",
          "Команды боятся ИИ или не понимают что с ним делать",
          "Подрядчики предлагают лишние функции, раздувают проект",
          "Решение сделано, но им никто не пользуется, оно «лежит на полке»"
        ]
      },
      {
        heading: "Почему это важно",
        content: "ИИ — это не только про код. Это про людей, функции, процессы и ответственность. Если одного из этого нет — система не сработает."
      },
      {
        heading: "Как это работает",
        list: [
          "Проверяю сметы, архитектуру, техническое задание",
          "Контролирую ход работ еженедельно и качество разработки",
          "Обучаю сотрудников работать с ИИ простым языком",
          "Помогаю встроить решение в реальные процессы",
          "Оцениваю результат на реальных цифрах и метриках",
          "Гарантирую достижение обещанных результатов"
        ]
      },
      {
        heading: "Что вы получаете",
        list: [
          "Решение которое работает и используется, а не «лежит на полке»",
          "Минимизацию лишних затрат и функций",
          "Управляемый процесс внедрения (еженедельный контроль)",
          "Уверенность что подрядчики делают нужное",
          "Команду которая понимает инструмент и может его развивать",
          "Гарантию достижения метрик"
        ]
      },
      {
        heading: "В чём отличие",
        content: "Я стою на стороне клиента. Моя задача — защитить бизнес, а не оправдать подрядчика."
      },
      {
        heading: "Реальный пример",
        content: "В одной компании подрядчик предложил решение за 2 млн. После экспертизы: половина функций не нужна, а задача решается за 0 ₽ — тем, что уже стоит в системе."
      },
      {
        heading: "Результат",
        content: "Компании сокращают бюджет внедрения на 20–80%. Система работает, результаты достигаются, команда не боится ИИ."
      }
    ],
    metrics: [
      { value: "20-80%", label: "экономия бюджета" },
      { value: "100%", label: "гарантия результата" },
      { value: "1×/нед", label: "контроль работ" }
    ],
    price: "от 50 000 ₽/месяц",
    timeline: "2–3 месяца",
    cta: "Заказать сопровождение →"
  }
];

const ServicesDetailed = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
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

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Timeline container */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[23px] top-12 bottom-12 w-0.5 bg-primary/20 hidden md:block" />
            
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-6"
              value={openItem}
              onValueChange={setOpenItem}
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                const isOpen = openItem === service.number;
                
                return (
                  <AccordionItem
                    key={service.number}
                    value={service.number}
                    className={`bg-card rounded-2xl border border-border shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden ${
                      isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                      <div className="flex items-center gap-4 w-full">
                        {/* Timeline dot */}
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                          isOpen 
                            ? 'bg-primary ring-4 ring-primary/20' 
                            : 'bg-primary/20 group-hover:bg-primary/40'
                        }`}>
                          <span className={`text-sm font-bold transition-colors duration-300 ${
                            isOpen ? 'text-primary-foreground' : 'text-primary'
                          }`}>
                            {service.number}
                          </span>
                        </div>
                        
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                          isOpen ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Icon className={`w-6 h-6 transition-colors duration-300 ${
                            isOpen ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 space-y-6">
                        {/* Metrics grid */}
                        <div className="grid grid-cols-3 gap-4 p-5 bg-primary/5 rounded-xl">
                          {service.metrics.map((metric, mIndex) => (
                            <div 
                              key={mIndex} 
                              className="text-center animate-fade-in-up"
                              style={{ animationDelay: `${mIndex * 0.1}s` }}
                            >
                              <div className="text-2xl md:text-3xl font-bold text-primary">
                                {metric.value}
                              </div>
                              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Sections as white cards in 3-column grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.sections.map((section, sIndex) => {
                            const SectionIcon = sectionIcons[section.heading] || Info;
                            return (
                              <div 
                                key={sIndex} 
                                className="bg-card rounded-xl p-5 border border-border shadow-soft animate-fade-in-up"
                                style={{ animationDelay: `${0.2 + sIndex * 0.05}s` }}
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <SectionIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                  <h4 className="font-semibold text-foreground">
                                    {section.heading}
                                  </h4>
                                </div>
                                {section.content && (
                                  <p className="text-sm text-foreground leading-relaxed">
                                    {section.content}
                                  </p>
                                )}
                                {section.list && (
                                  <ul className="space-y-1.5">
                                    {section.list.map((item, iIndex) => (
                                      <li 
                                        key={iIndex} 
                                        className="flex items-start gap-2 text-sm text-foreground"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Pricing block */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-primary/5 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                              <div className="text-2xl font-semibold text-primary">
                                {service.price}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <div className="text-sm text-muted-foreground">Срок</div>
                                <div className="font-medium text-foreground">
                                  {service.timeline}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Button size="lg" className="w-full sm:w-auto" onClick={scrollToContact}>
                            {service.cta}
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetailed;
