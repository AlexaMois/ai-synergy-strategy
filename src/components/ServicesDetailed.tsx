import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Package, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import chatHeartSketch from "@/assets/sketches/chat-heart-sketch.png";
import routeWarmSketch from "@/assets/sketches/route-warm-sketch.png";
import auditCareSketch from "@/assets/sketches/audit-care-sketch.png";
import bookAiSketch from "@/assets/sketches/book-ai-sketch.png";
import handsChipSketch from "@/assets/sketches/hands-chip-sketch.png";
import blueprintPlantSketch from "@/assets/sketches/blueprint-plant-sketch.png";
import teaLaptopSketch from "@/assets/sketches/tea-laptop-sketch.png";

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Что входит": Package,
  "Результат": TrendingUp
};

type Service = {
  number: string;
  sketch: string;
  title: string;
  subtitle: string;
  sections: { heading: string; content?: string; list?: string[] }[];
  price: string;
  cta: string;
  href: string;
};

const services: Service[] = [
  {
    number: "01",
    sketch: chatHeartSketch,
    title: "Стратегическая встреча по цифровизации для собственника",
    subtitle: "Быстрый управленческий разбор для собственника или руководителя, которому нужно понять первый шаг в цифровом развитии компании.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Разбор текущей ситуации",
          "Выявление повторяющихся процессов",
          "Определение ручной нагрузки",
          "Первичные приоритеты",
          "Короткий план следующих шагов"
        ]
      },
      {
        heading: "Результат",
        content: "Собственник получает понимание текущей точки А, первые процессы для разбора, приоритеты и понятный следующий шаг."
      }
    ],
    price: "17 000 ₽",
    cta: "Подробнее →",
    href: "/services/owner-digital-session"
  },
  {
    number: "02",
    sketch: routeWarmSketch,
    title: "Разработка стратегии цифрового развития бизнеса",
    subtitle: "Рабочий формат для компании, где нужен план цифрового развития на ближайшие 90 дней.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Стратегическая сессия с собственником или руководителем",
          "До 3 интервью с сотрудниками или руководителями",
          "Разбор повторяющихся процессов",
          "Выявление ручных задач",
          "Определение точек потерь",
          "Таблица с приоритетами",
          "Итоговый PDF-документ",
          "План цифровизации на 90 дней"
        ]
      },
      {
        heading: "Результат",
        content: "Компания получает точку А по процессам, список ручных задач, приоритеты, план действий на 90 дней и примерную вилку бюджета внедрения при наличии конкретных данных."
      }
    ],
    price: "78 000 ₽",
    cta: "Подробнее →",
    href: "/services/digital-development-strategy"
  },
  {
    number: "03",
    sketch: auditCareSketch,
    title: "Глубокий аудит компании для цифровизации",
    subtitle: "Подробный разбор процессов, данных, документов, текущих инструментов и готовности компании к цифровому развитию.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Анализ процессов",
          "Анализ документов и данных",
          "Разбор текущих цифровых инструментов",
          "Выявление ручной нагрузки",
          "Определение точек потерь",
          "Оценка готовности к внедрению",
          "Рекомендации по цифровизации",
          "Дорожная карта внедрения"
        ]
      },
      {
        heading: "Результат",
        content: "Компания получает карту процессов, список рисков, рекомендации, бюджетные ориентиры и дорожную карту цифрового развития."
      }
    ],
    price: "от 116 000 ₽",
    cta: "Подробнее →",
    href: "/services/digital-audit"
  },
  {
    number: "04",
    sketch: bookAiSketch,
    title: "Авторская программа «Цифровые инструменты для бизнеса»",
    subtitle: "Практическое обучение команды применению цифровых инструментов в рабочих задачах.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Обучение сотрудников на реальных задачах",
          "Работа с документами, отчётами, таблицами и коммуникациями",
          "Поиск и проверка информации",
          "Подготовка рабочих материалов",
          "Правила безопасного применения цифровых инструментов",
          "Шаблоны запросов и сценариев",
          "Разбор примеров из работы участников"
        ]
      },
      {
        heading: "Результат",
        content: "Сотрудники начинают применять цифровые инструменты в рабочих задачах, быстрее готовят материалы и понимают, какие процессы можно упростить или подготовить к автоматизации."
      }
    ],
    price: "68 000–152 000 ₽",
    cta: "Подробнее →",
    href: "/services/digital-tools-program"
  },
  {
    number: "05",
    sketch: handsChipSketch,
    title: "Сопровождение цифрового внедрения",
    subtitle: "Ведение цифрового внедрения до рабочего результата: задачи, сроки, команда, подрядчики, контроль применения и корректировка решений.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Планирование этапов внедрения",
          "Постановка задач",
          "Контроль сроков и ответственных",
          "Участие в рабочих встречах",
          "Взаимодействие с командой клиента",
          "Контроль подрядчиков",
          "Обучение сотрудников",
          "Корректировка решений по факту работы"
        ]
      },
      {
        heading: "Результат",
        content: "Внедрение движется по понятному плану, команда понимает изменения, руководитель видит состояние проекта и следующие шаги."
      }
    ],
    price: "89 000–170 000 ₽/мес",
    cta: "Подробнее →",
    href: "/services/implementation-support"
  },
  {
    number: "06",
    sketch: blueprintPlantSketch,
    title: "Проектирование и разработка цифрового решения под бизнес-процесс",
    subtitle: "Создание цифрового инструмента под конкретную задачу компании: заявки, документы, данные, отчёты, базы знаний, уведомления или внутренние помощники.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Постановка бизнес-задачи",
          "Проектирование логики решения",
          "Описание сценариев",
          "Подготовка технической архитектуры",
          "Выбор инструментов",
          "Разработка или сборка решения",
          "Тестирование",
          "Запуск первой рабочей версии"
        ]
      },
      {
        heading: "Результат",
        content: "Компания получает рабочее цифровое решение под конкретный бизнес-процесс, которое можно использовать, развивать и передавать на сопровождение."
      }
    ],
    price: "от 260 000 ₽",
    cta: "Подробнее →",
    href: "/services/digital-solution-design"
  },
  {
    number: "07",
    sketch: teaLaptopSketch,
    title: "Сопровождение цифровых инструментов компании",
    subtitle: "Регулярная поддержка, донастройка и развитие уже внедрённых цифровых инструментов.",
    sections: [
      {
        heading: "Что входит",
        list: [
          "Поддержка действующих инструментов",
          "Разбор ошибок",
          "Консультации команды",
          "Обновление инструкций",
          "Донастройка сценариев",
          "Добавление новых рабочих сценариев",
          "Контроль стабильности",
          "Рекомендации по развитию"
        ]
      },
      {
        heading: "Результат",
        content: "Цифровые инструменты работают стабильнее, команда получает поддержку, руководитель видит развитие системы после запуска."
      }
    ],
    price: "35 000–89 000 ₽/мес",
    cta: "Подробнее →",
    href: "/services/digital-tools-support"
  }
];

const ServicesDetailed = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  // Палитры под фирменный стиль NewHome / StartPage
  const palettes = [
    { bg: "bg-surface-mint",     text: "text-foreground", muted: "text-foreground/65", chipBg: "bg-accent/15 text-accent",         border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-accent",           text: "text-background", muted: "text-background/75", chipBg: "bg-background/20 text-background", border: "border-background/15", innerBg: "bg-background/10",   pillDark: false },
    { bg: "bg-surface-sand",     text: "text-foreground", muted: "text-foreground/65", chipBg: "bg-accent/15 text-accent",         border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-surface-lavender", text: "text-foreground", muted: "text-foreground/65", chipBg: "bg-accent/15 text-accent",         border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-surface-blush",    text: "text-foreground", muted: "text-foreground/65", chipBg: "bg-accent/15 text-accent",         border: "border-foreground/10", innerBg: "bg-background/60",   pillDark: false },
    { bg: "bg-card",             text: "text-foreground", muted: "text-muted-foreground", chipBg: "bg-accent/15 text-accent",      border: "border-foreground/10", innerBg: "bg-muted/40",        pillDark: false },
    { bg: "bg-foreground",       text: "text-background", muted: "text-background/65", chipBg: "bg-accent/20 text-accent",         border: "border-background/15", innerBg: "bg-background/10",   pillDark: true  },
  ];

  return (
    <section ref={ref} className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-5">
          Форматы{" "}
          <span className="font-iriska font-normal italic text-accent">работы</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Каждый формат закрывает конкретную управленческую задачу: от первого разбора до внедрения и регулярного сопровождения цифровых инструментов.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="space-y-5"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {services.map((service, index) => {
          const isOpen = openItem === service.number;
          const p = palettes[index % palettes.length];

          return (
            <AccordionItem
              key={service.number}
              value={service.number}
              className={`relative ${p.bg} rounded-[28px] md:rounded-[32px] ring-1 ring-foreground/5 shadow-card hover:shadow-plate transition-all duration-300 overflow-hidden ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <AccordionTrigger className="px-6 md:px-9 py-7 md:py-9 hover:no-underline group flex-col items-stretch" hideIndicator>
                <div className="flex items-start gap-5 md:gap-7 w-full relative">
                  {/* Скетч в углу */}
                  <img
                    src={service.sketch}
                    alt=""
                    width={512}
                    height={512}
                    loading="lazy"
                    className="hidden md:block absolute -bottom-6 -right-4 w-28 lg:w-36 h-auto object-contain opacity-90 pointer-events-none"
                  />
                  {/* Большой номер курсивом */}
                  <span className={`font-iriska italic ${p.text} text-5xl md:text-6xl lg:text-7xl leading-none flex-shrink-0 min-w-[3rem]`}>
                    {service.number}
                  </span>

                  <div className="flex-1 text-left min-w-0 md:pr-28 lg:pr-36">
                    <h3 className={`${p.text} text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm md:text-base ${p.muted} leading-relaxed mb-4 max-w-3xl`}>
                      {service.subtitle}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${p.text}/90`}>
                      <span className="font-iriska italic text-accent text-lg">
                        {isOpen ? "свернуть" : "развернуть"}
                      </span>
                      <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        ↓
                      </span>
                    </span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 md:px-9 pb-8 md:pb-9 relative">
                <div className={`pt-2 space-y-6 border-t ${p.border} mt-2`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-6">
                            {service.sections.filter((_, i) => i % 2 === 0).map((section, sIndex) => {
                              const SectionIcon = sectionIcons[section.heading] || Info;
                              return (
                                <div key={sIndex} className="animate-fade-in-up" style={{ animationDelay: `${0.1 + sIndex * 0.05}s` }}>
                                  <div className="flex items-center gap-2 mb-3">
                                    <SectionIcon className={`w-5 h-5 ${p.pillDark ? "text-accent" : "text-accent"} flex-shrink-0`} />
                                    <h4 className={`font-bold ${p.text} text-lg`}>
                                      {section.heading}
                                    </h4>
                                  </div>
                                  {section.content && (
                                    <p className={`${p.text}/90 leading-relaxed pl-7`}>{section.content}</p>
                                  )}
                                  {section.list && (
                                    <ul className="space-y-2 pl-7">
                                      {section.list.map((item, iIndex) => (
                                        <li key={iIndex} className={`flex items-start gap-2 ${p.text}/90`}>
                                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                            {service.sections.filter((_, i) => i % 2 === 1).map((section, sIndex) => {
                              const SectionIcon = sectionIcons[section.heading] || Info;
                              return (
                                <div key={sIndex} className="animate-fade-in-up" style={{ animationDelay: `${0.15 + sIndex * 0.05}s` }}>
                                  <div className="flex items-center gap-2 mb-3">
                                    <SectionIcon className="w-5 h-5 text-accent flex-shrink-0" />
                                    <h4 className={`font-bold ${p.text} text-lg`}>
                                      {section.heading}
                                    </h4>
                                  </div>
                                  {section.content && (
                                    <p className={`${p.text}/90 leading-relaxed pl-7`}>{section.content}</p>
                                  )}
                                  {section.list && (
                                    <ul className="space-y-2 pl-7">
                                      {section.list.map((item, iIndex) => (
                                        <li key={iIndex} className={`flex items-start gap-2 ${p.text}/90`}>
                                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                  </div>

                  {/* Прайс + CTA */}
                  <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-7 ${p.innerBg} rounded-[24px] ring-1 ${p.border} animate-fade-in-up`} style={{ animationDelay: "0.3s" }}>
                    <div>
                      <div className={`text-sm ${p.muted} mb-1`}>Стоимость</div>
                      <div className={`text-2xl md:text-3xl font-bold ${p.text}`}>
                        {service.price}
                      </div>
                    </div>

                    <Link
                      to={service.href}
                      className={`group/btn inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-base shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${
                        p.pillDark
                          ? "bg-background text-foreground hover:bg-background/90"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      <span>Подробнее</span>
                      <span className={`flex items-center justify-center w-10 h-10 rounded-full ${p.pillDark ? "bg-accent text-accent-foreground" : "bg-accent text-accent-foreground"} group-hover/btn:translate-x-0.5 transition-transform`}>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

export default ServicesDetailed;
