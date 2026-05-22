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
  Clock,
  GraduationCap,
  Wrench,
  LifeBuoy,
  Map
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Что входит": Package,
  "Результат": TrendingUp
};

type Service = {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
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
    icon: Compass,
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
    icon: Map,
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
    icon: FileText,
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
    icon: GraduationCap,
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
    icon: Handshake,
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
    icon: Wrench,
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
    icon: LifeBuoy,
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
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="section-title text-center leading-tight mb-4">
              Форматы <span className="font-semibold">работы</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Каждый формат закрывает конкретную управленческую задачу: от первого разбора до внедрения и регулярного сопровождения цифровых инструментов.
            </p>
          </div>
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
                    className={`bg-card rounded-2xl border border-border ring-1 ring-border/30 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                      isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline group flex-col items-stretch" hideIndicator>
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
                          <h3 className="text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {service.subtitle}
                          </p>
                          {/* Handwritten expand text below subtitle */}
                          <div className="mt-3 flex items-center gap-1.5">
                            <span className={`text-handwriting text-primary transition-all duration-300 ${isOpen ? 'hidden' : 'inline-flex items-center gap-1'}`}>
                              развернуть <span className="text-lg">↓</span>
                            </span>
                            <span className={`text-handwriting text-primary transition-all duration-300 ${isOpen ? 'inline-flex items-center gap-1' : 'hidden'}`}>
                              свернуть <span className="text-lg">↑</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 space-y-6">
                        {/* Metrics grid */}
                        <div className="grid grid-cols-3 gap-4 p-5 bg-primary/5 rounded-xl shadow-soft ring-1 ring-primary/10">
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

                        {/* Sections in two columns on desktop with vertical divider */}
                        <div className="flex flex-col md:flex-row md:gap-0">
                          {/* Left column */}
                          <div className="flex-1 space-y-4 md:pr-6 md:border-r md:border-border">
                            {service.sections.filter((_, i) => i % 2 === 0).map((section, sIndex) => {
                              const SectionIcon = sectionIcons[section.heading] || Info;
                              return (
                                <div 
                                  key={sIndex} 
                                  className="animate-fade-in-up"
                                  style={{ animationDelay: `${0.2 + sIndex * 0.1}s` }}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <SectionIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                    <h4 className="font-semibold text-foreground">
                                      {section.heading}
                                    </h4>
                                  </div>
                                  {section.content && (
                                    <p className="text-foreground leading-relaxed pl-7">
                                      {section.content}
                                    </p>
                                  )}
                                  {section.list && (
                                    <ul className="space-y-2 pl-7">
                                      {section.list.map((item, iIndex) => (
                                        <li 
                                          key={iIndex} 
                                          className="flex items-start gap-2 text-foreground"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {/* Right column */}
                          <div className="flex-1 space-y-4 md:pl-6 mt-4 md:mt-0">
                            {service.sections.filter((_, i) => i % 2 === 1).map((section, sIndex) => {
                              const SectionIcon = sectionIcons[section.heading] || Info;
                              return (
                                <div 
                                  key={sIndex} 
                                  className="animate-fade-in-up"
                                  style={{ animationDelay: `${0.25 + sIndex * 0.1}s` }}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <SectionIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                    <h4 className="font-semibold text-foreground">
                                      {section.heading}
                                    </h4>
                                  </div>
                                  {section.content && (
                                    <p className="text-foreground leading-relaxed pl-7">
                                      {section.content}
                                    </p>
                                  )}
                                  {section.list && (
                                    <ul className="space-y-2 pl-7">
                                      {section.list.map((item, iIndex) => (
                                        <li 
                                          key={iIndex} 
                                          className="flex items-start gap-2 text-foreground"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Pricing block */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-primary/5 rounded-xl shadow-soft ring-1 ring-primary/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
