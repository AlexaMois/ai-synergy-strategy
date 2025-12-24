import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Layers, ShieldCheck } from "lucide-react";

const ServicesDetailed = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const services = [
    {
      number: "01",
      icon: Search,
      title: "Аудит–анализ процессов и ИТ-ландшафта",
      subtitle: "Точка, с которой начинается зрелое внедрение",
      sections: [
        {
          heading: "Что это такое",
          content: "Честный разбор текущих процессов, архитектуры и данных: где есть потери, где есть пространство для автоматизации, а где ИИ не нужен вовсе."
        },
        {
          heading: "Для кого это",
          content: "Для CEO, COO и ИТ-директоров, которые хотят принимать технологические решения на основе фактов, а не предположений подрядчиков."
        },
        {
          heading: "Какая боль закрывает",
          list: [
            "сложно понять, что именно стоит автоматизировать;",
            "подрядчики предлагают разные решения, и каждое «лучшее»;",
            "есть страх вложиться в инструмент, который не принесёт пользы;",
            "люди опасаются изменений и не понимают, зачем они нужны;",
            "нет единой картины процессов — только гипотезы."
          ]
        },
        {
          heading: "Как это работает",
          list: [
            "Разбираю цели бизнеса и контекст.",
            "Исследую процессы: где теряются время, деньги, контроль.",
            "Оцениваю зрелость данных и ИТ-ландшафт.",
            "Смотрю, что уже есть и что можно усилить без замены.",
            "Формирую карту решений: полезные → возможные → лишние."
          ]
        },
        {
          heading: "Что вы получаете",
          list: [
            "чёткий ответ: где ИИ даст эффект, а где — нет;",
            "список решений, которые можно внедрить в ближайшие 2–6 недель;",
            "процессы, которые нужно починить прежде чем автоматизировать;",
            "сценарии по уровню вложений: минимальный / оптимальный / расширенный;",
            "прозрачный прогноз нагрузки на команду."
          ]
        },
        {
          heading: "Почему это важно",
          content: "Без анализа почти любая компания покупает \"видимость автоматизации\", а не реальный инструмент."
        },
        {
          heading: "В чём отличие",
          content: "Я не оцениваю только технологии.\nЯ смотрю на смысл задачи, процессы, людей, данные и архитектуру вместе."
        },
        {
          heading: "Микроистория",
          content: "В одной компании было шесть автоматизаций — ни одна не использовалась.\nПосле аудита–анализа оказалось: решение лежало прямо под руками, просто было неправильно встроено в процесс."
        },
        {
          heading: "Цифры",
          content: "В типичных проектах компании видят снижение потерь времени на 20–60%."
        }
      ],
      cta: "Заказать аудит–анализ процессов"
    },
    {
      number: "02",
      icon: Layers,
      title: "Стратегия и архитектура ИИ-решений",
      subtitle: "Система, а не набор разрозненных инструментов",
      sections: [
        {
          heading: "Что это такое",
          content: "Проектирование того, как ИИ должен работать внутри компании: через какие точки проходит задача, какие инструменты подходят, что можно связать, а что лучше исключить."
        },
        {
          heading: "Для кого это",
          content: "Для тех, кто хочет внедрять ИИ не \"точечно\", а как часть управленческой логики."
        },
        {
          heading: "Какая боль закрывает",
          list: [
            "решения работают отдельно, не усиливая друг друга;",
            "бизнес сталкивается с перегруженными \"коробками\";",
            "нет ясности, что выбрать: Make? n8n? LLM? API?",
            "сметы подрядчиков неочевидны;",
            "каждый инструмент живёт своей жизнью."
          ]
        },
        {
          heading: "Как это работает",
          list: [
            "Формулируем, что должно измениться в бизнесе.",
            "Строю архитектуру: Make / n8n / API / российские LLM / закрытые контуры.",
            "Проектирую маршруты данных и взаимодействие ролей.",
            "Выбираю инструменты без привязки к вендорам.",
            "Формирую карту внедрения: шаги, риски, сроки."
          ]
        },
        {
          heading: "Что вы получаете",
          list: [
            "ясную, обоснованную архитектуру, которую понимают и управленцы, и ИТ;",
            "три сценария внедрения (быстрый / оптимальный / фундаментальный);",
            "прозрачные критерии выбора подрядчиков;",
            "конкретные требования к инструментам;",
            "понимание, где простота важнее мощности, а где наоборот."
          ]
        },
        {
          heading: "Почему это важно",
          content: "ИИ работает только тогда, когда идёт в связке с процессами.\nЕсли логики нет — эффект не появится, даже при дорогих технологиях."
        },
        {
          heading: "В чём отличие",
          content: "Я соединяю управленческое мышление и инженерную точность.\nСмотрю на систему так же, как собственник или CTO."
        },
        {
          heading: "Микроистория",
          content: "Компания хотела внедрить 14 инструментов.\nПосле архитектуры осталось 3 — самые простые и недорогие.\nЭффект — в разы выше, чем от первоначального плана."
        },
        {
          heading: "Цифры",
          content: "Компании часто сокращают бюджет внедрения ×3–5, сохраняя качество."
        }
      ],
      cta: "Получить архитектуру под вашу задачу"
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Сопровождение внедрения и независимая экспертиза",
      subtitle: "Чтобы решения работали, а не превращались в «ещё один проект»",
      sections: [
        {
          heading: "Что это такое",
          content: "Полное сопровождение внедрения: проверка смет и ТЗ, контроль подрядчиков, обучение сотрудников и доведение решения до результата."
        },
        {
          heading: "Для кого это",
          content: "Для компаний, которые хотят снизить риски и не быть заложниками технических подрядчиков."
        },
        {
          heading: "Какая боль закрывает",
          list: [
            "сложно понять, адекватна ли смета;",
            "внедрения затягиваются и усложняются;",
            "команды боятся ИИ или не понимают, что с ним делать;",
            "подрядчики предлагают лишние функции;",
            "решение сделано, но им никто не пользуется."
          ]
        },
        {
          heading: "Как это работает",
          list: [
            "Проверяю сметы, архитектуру, ТЗ.",
            "Контролирую ход работ и качество.",
            "Обучаю сотрудников работать с ИИ простым языком.",
            "Помогаю встроить решение в процессы.",
            "Оцениваю результат на реальных цифрах."
          ]
        },
        {
          heading: "Что вы получаете",
          list: [
            "решение, которое работает, а не \"лежит на полке\";",
            "минимизацию лишних затрат;",
            "управляемый процесс внедрения;",
            "уверенность, что подрядчики делают нужное;",
            "команду, которая понимает инструмент."
          ]
        },
        {
          heading: "Почему это важно",
          content: "ИИ — это не только про код.\nЭто про людей, функции, процессы и ответственность."
        },
        {
          heading: "В чём отличие",
          content: "Я стою на стороне клиента.\nМоя задача — защитить бизнес, а не оправдать подрядчика."
        },
        {
          heading: "Микроистория",
          content: "В одной компании подрядчик предложил решение за 2 млн.\nПосле экспертизы: половина функций не нужна, а задача решается за 0 ₽ — тем, что уже стоит."
        },
        {
          heading: "Цифры",
          content: "Компании сокращают бюджет внедрения на 20–80%."
        }
      ],
      cta: "Получить независимую экспертизу внедрения"
    }
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {services.map((service, serviceIndex) => {
              const Icon = service.icon;
              return (
                <AccordionItem
                  key={service.number}
                  value={service.number}
                  className={`bg-card border border-border rounded-2xl shadow-soft hover:shadow-card transition-shadow duration-200 overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${serviceIndex * 0.15}s` }}
                >
                  <AccordionTrigger className="px-6 py-6 sm:px-8 sm:py-8 hover:no-underline hover:bg-primary/10 transition-colors [&[data-state=open]]:bg-primary/10">
                    <div className="flex items-start gap-4 sm:gap-6 w-full text-left">
                      {/* Number and Icon */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div className="text-4xl sm:text-5xl font-bold text-primary/30">
                          {service.number}
                        </div>
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />
                      </div>
                      
                      {/* Title and Subtitle */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-2 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-base sm:text-lg text-primary font-medium italic leading-relaxed">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 sm:px-8 pb-8">
                    <div className="space-y-6 pt-6 border-t border-border">
                      {service.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-2">
                          <h4 className="text-lg font-medium text-foreground">
                            {section.heading}
                          </h4>
                          {section.content && (
                            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                              {section.content}
                            </p>
                          )}
                          {section.list && (
                            <ul className="space-y-2 ml-4">
                              {section.list.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-base text-muted-foreground leading-relaxed flex">
                                  <span className="mr-2 text-primary flex-shrink-0">—</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Button size="lg" className="w-full sm:w-auto" asChild>
                          <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                            {service.cta}
                          </a>
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
    </section>
  );
};

export default ServicesDetailed;
