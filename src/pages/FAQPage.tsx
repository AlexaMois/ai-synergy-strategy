import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Compass, Wallet, Map, GraduationCap, LifeBuoy, Search, X, Shield } from "lucide-react";
import { Link } from "react-router-dom";

import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import { trackCTAClick } from "@/utils/analytics";

interface FAQItem {
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  questions: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "start",
    title: "С чего начать",
    icon: Compass,
    questions: [
      {
        question: "Как понять, какой формат мне подходит?",
        answer: "Выберите продукт для регулярной работы, ИИ-агент для одной повторяющейся задачи, Hermes или индивидуального ИИ-агента для согласованного сценария. Комплексная автоматизация объединяет процессы и системы. Бесплатная проверка, выездная консультация и аудит доступны для уточнения задачи.",
        links: [
          { label: "Подобрать формат работы", href: "/start" },
          { label: "Все услуги", href: "/services" },
        ],
      },
      {
        question: "Можно начать с короткого разбора?",
        answer: "Да. Бесплатная проверка бизнес-процесса доступна самостоятельно. Выездная консультация за 8 000 ₽ в Красноярске охватывает один процесс до одного часа; результат — краткое письменное заключение. Стоимость полностью засчитывается в оплату последующего проекта автоматизации.",
        links: [{ label: "Подобрать формат работы", href: "/start" }],
      },
      {
        question: "Что делать, если задача пока сформулирована не до конца?",
        answer: "Начните с бесплатной проверки процесса или выездной консультации. Определим, какие операции требуют внимания и какой следующий шаг даст измеримый результат.",
        links: [{ label: "Подобрать формат работы", href: "/start" }],
      },
      {
        question: "Можно сразу заказать внедрение?",
        answer: "Да, если задача уже понятна, есть процесс для цифровизации и ясно, какой результат нужен. Для уточнения объёма доступны бесплатная проверка бизнес-процесса, выездная консультация и комплексный аудит.",
        links: [{ label: "Все услуги", href: "/services" }],
      }
    ]
  },
  {
    id: "pricing",
    title: "Форматы и цены",
    icon: Wallet,
    questions: [
      {
        question: "Сколько стоит работа?",
        answer: "ИИ-агенты: внедрение от 25 000 ₽, ежемесячная лицензия 990, 1 490 или 3 990 ₽ по выбранному формату. Для Нейроаналитика условия эксплуатации индивидуальны. Hermes — 36 000 ₽, продвинутая настройка от 126 000 ₽; модели, инфраструктура и внешние сервисы отдельно. Полноценные индивидуальные проекты от 260 000 ₽. Выездная консультация 8 000 ₽, аудит от 116 000 ₽, корпоративная программа 68 000–152 000 ₽. Условия двух программных продуктов согласуем по задаче.",
        links: [{ label: "Полный прайс", href: "/pricing" }],
      },
      {
        question: "От чего зависит итоговая стоимость?",
        answer: "Итоговая стоимость зависит от масштаба компании, количества процессов, объёма данных, уровня интеграций, количества участников и глубины сопровождения.",
        links: [{ label: "Полный прайс", href: "/pricing" }],
      },
      {
        question: "Можно заказать только одну услугу?",
        answer: "Да. Выберите самостоятельное предложение по задаче. Бесплатная проверка, выездная консультация и аудит могут стать входом в проект автоматизации.",
        links: [{ label: "Все услуги", href: "/services" }],
      },
      {
        question: "Можно оплачивать поэтапно?",
        answer: "По договору-оферте базовый порядок оплаты 80/20. Этапы индивидуального проекта согласуются в договоре или счёте."
      }
    ]
  },
  {
    id: "strategy",
    title: "Проверка бизнес-процесса, консультация и аудит",
    icon: Map,
    questions: [
      {
        question: "Чем бесплатная проверка отличается от выездной консультации?",
        answer: "Бесплатная проверка формирует предварительный результат по вашим ответам. Выездная консультация предполагает изучение одного процесса на территории клиента в Красноярске и письменное заключение."
      },
      {
        question: "Когда нужен комплексный аудит?",
        answer: "Комплексный аудит подходит для подробного разбора компании: процессов, данных, документов, текущих инструментов, рисков и готовности к внедрению."
      },
      {
        question: "Что я получу после аудита?",
        answer: "Вы получите карту процессов и ручной нагрузки, точки потерь, риски, бюджетные ориентиры и дорожную карту внедрения."
      },
      {
        question: "Что входит в глубокий аудит?",
        answer: "В аудит входят интервью с руководителями и ключевыми сотрудниками, анализ процессов, документов, данных, текущих инструментов, точек потерь, рисков и подготовка дорожной карты внедрения."
      }
    ]
  },
  {
    id: "learning",
    title: "Обучение, внедрение и разработка",
    icon: GraduationCap,
    questions: [
      {
        question: "Когда подходит авторская программа «Цифровые инструменты для бизнеса»?",
        answer: "Программа подходит, когда сотрудники используют цифровые инструменты по-разному, тратят много времени на документы, поиск информации, отчёты и тексты, а руководителю нужен единый стандарт работы команды."
      },
      {
        question: "Что даёт обучение сотрудникам?",
        answer: "Сотрудники учатся применять цифровые инструменты в реальных рабочих задачах: готовить документы, искать информацию, формулировать запросы, работать с источниками и видеть процессы, которые можно упростить."
      },
      {
        question: "Когда нужен индивидуальный проект автоматизации?",
        answer: "Индивидуальный проект подходит, когда требуется связать несколько процессов, сотрудников и систем или создать инструмент под специальные требования. Состав и критерии приёмки согласуем до начала работ."
      },
      {
        question: "Когда нужна разработка цифрового решения?",
        answer: "Разработка нужна, когда компании требуется конкретный инструмент под бизнес-процесс: заявки, документы, отчёты, база знаний, уведомления, внутренний помощник, портал или интеграция между сервисами."
      }
    ]
  },
  {
    id: "technical-obligations",
    title: "Эксплуатация и результат",
    icon: LifeBuoy,
    questions: [
      {
        question: "Какие технические обязательства действуют после запуска?",
        answer: "Объём технического обслуживания созданных нами продуктов и проектов, сроки реакции, восстановление, обновления и резервное копирование закрепляются в договоре. Лицензии ИИ-агентов содержат указанный состав. Индивидуальные доработки, изменения внешних API, обновления систем и замена оборудования оцениваются по согласованному объёму."
      },
      {
        question: "Сколько длится внедрение?",
        answer: "Срок зависит от задачи, масштаба компании и готовности процессов. Небольшие внедрения могут занимать несколько недель, более сложные проекты требуют поэтапной работы."
      },
      {
        question: "Как понять, что результат достигнут?",
        answer: "Результат фиксируется через понятные показатели: меньше ручной нагрузки, быстрее обработка заявок или документов, понятнее контроль для руководителя, меньше потерь времени и рабочий инструмент, которым пользуется команда."
      },
      {
        question: "Что происходит после завершения проекта?",
        answer: "После запуска действуют согласованные договорные обязательства. Новые сценарии и развитие системы оформляются отдельным объёмом работ.",
        links: [{ label: "Все услуги", href: "/services" }],
      }
    ]
  },
  {
    id: "security-format",
    title: "Безопасность и формат работы",
    icon: Shield,
    questions: [
      {
        question: "Как защищены данные компании в работе?",
        answer: "До старта подписывается соглашение о конфиденциальности. Документы и данные обсуждаются только в согласованных каналах, доступ ограничивается ролями, чувствительные данные при необходимости обезличиваются. Сами цифровые решения проектируются с учётом ограничений компании: можно использовать только разрешённые сервисы, локальные модели или закрытый контур."
      },
      {
        question: "Какие данные нужны для старта?",
        answer: "Для бесплатной проверки бизнес-процесса достаточно описания процесса и задачи. Для глубокого аудита и разработки понадобятся примеры документов, выгрузки из систем, описание ролей и доступов. Состав данных всегда согласовывается заранее.",
        links: [{ label: "Подобрать формат работы", href: "/start" }],
      },
      {
        question: "Что с персональными данными и 152-ФЗ?",
        answer: "Решения проектируются с учётом 152-ФЗ. Где это применимо — используются локальные модели, шифрование каналов, ограниченный доступ и хранение данных в инфраструктуре компании."
      },
      {
        question: "Работа проходит онлайн или офлайн?",
        answer: "По умолчанию работа идёт онлайн: видеовстречи, переписка, общий рабочий канал и доступ к материалам через документы и таблицы. Очные встречи возможны в Красноярске и по договорённости в других городах — обычно для собственников и крупных проектов."
      },
      {
        question: "Где территориально вы работаете?",
        answer: "Базируюсь в Красноярске, работаю с компаниями по всей России и СНГ. Часовые пояса и формат коммуникации согласовываются на старте, чтобы встречи и контроль не зависели от географии."
      }
    ]
  }
];

// Flatten all questions for Schema.org
const allQuestions = faqCategories.flatMap(cat => cat.questions);

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(window.location.hash === "#technical-obligations" ? "technical-obligations" : "start");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const scrollToContact = () => {
    trackCTAClick({ location: 'faq' });
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter questions based on search query
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase();
    const results: { category: FAQCategory; question: FAQItem }[] = [];
    
    faqCategories.forEach(category => {
      category.questions.forEach(q => {
        if (q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)) {
          results.push({ category, question: q });
        }
      });
    });
    
    return results;
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allQuestions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  const activeData = faqCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAQ по цифровому развитию бизнеса — Александра Моисеева, НейроРешения</title>
        <meta 
          name="description" 
          content="Ответы на вопросы о продуктах, ИИ-агентах, лицензиях, автоматизации, консультациях, проверке бизнес-процесса и обучении." 
        />
        <meta name="keywords" content="FAQ цифровое развитие бизнеса, стоимость цифровизации, сроки внедрения, безопасность данных, обучение цифровым инструментам, аудит компании" />
        <link rel="canonical" href="https://aleksamois.ru/faq/" />
        <meta property="og:title" content="FAQ по цифровому развитию бизнеса — Александра Моисеева, НейроРешения" />
        <meta property="og:description" content="Ответы на вопросы о продуктах, ИИ-агентах, лицензиях, автоматизации, консультациях, проверке бизнес-процесса и обучении." />
        <meta property="og:url" content="https://aleksamois.ru/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.faq())}
        </script>
      </Helmet>

      

      <PageBreadcrumbs currentPage="FAQ" />
      <main className="pb-16">
        <div className="container mx-auto px-4">

          {/* Hero Section */}
          <section className="text-left mb-8 mt-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              <span className="font-bold">Частые вопросы</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Ответы на вопросы о продуктах, ИИ-агентах, лицензиях, автоматизации, консультациях, проверке бизнес-процесса и обучении.
            </p>
          </section>

          {/* Search */}
          <section className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-6 text-base bg-card border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {isSearching && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {filteredQuestions?.length === 0 
                  ? "Ничего не найдено" 
                  : `Найдено: ${filteredQuestions?.length}`}
              </p>
            )}
          </section>

          {/* Category Tabs - hidden when searching */}
          {!isSearching && (
            <section className="mb-8">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide justify-center">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-200 font-medium text-sm",
                        activeCategory === category.id
                          ? "bg-primary !text-[#212121] shadow-md"
                          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.title}</span>
                      <span className="text-xs opacity-70">({category.questions.length})</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ Accordion */}
          <section className="bt-faq bt-faq-results mb-16">
            <div className="bt-faq-layout">
              <h2 className="bt-faq-heading">{isSearching ? "Результаты поиска" : activeData?.title}</h2>
              <div className="bt-faq-body">
            {isSearching ? (
              // Search results
              filteredQuestions && filteredQuestions.length > 0 && (
                <Accordion type="single" collapsible className="bt-faq-list">
                  {filteredQuestions.map((item, index) => {
                    const Icon = item.category.icon;
                    return (
                      <AccordionItem
                        key={`search-${index}`}
                        value={`item-${index}`}
                        className="bt-faq-item"
                      >
                        <AccordionTrigger className="bt-faq-trigger">
                          <div className="flex flex-col gap-1 pr-4">
                            <span className="font-medium text-foreground">
                              {item.question.question}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon className="h-3 w-3" />
                              {item.category.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="bt-faq-answer">
                          <p>{item.question.answer}</p>
                          {item.question.links && item.question.links.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-3">
                              {item.question.links.map((l) => (
                                <Link key={l.href} to={l.href} className="text-primary hover:underline font-medium">
                                  {l.label} →
                                </Link>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )
            ) : (
              // Category view
              activeData && (
                <Accordion type="single" collapsible className="bt-faq-list">
                  {activeData.questions.map((item, index) => (
                    <AccordionItem
                      key={`${activeCategory}-${index}`}
                      value={`item-${index}`}
                      className="bt-faq-item"
                    >
                      <AccordionTrigger className="bt-faq-trigger">
                        <span className="font-medium text-foreground pr-4">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="bt-faq-answer">
                        <p>{item.answer}</p>
                        {item.links && item.links.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {item.links.map((l) => (
                              <Link key={l.href} to={l.href} className="text-primary hover:underline font-medium">
                                {l.label} →
                              </Link>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )
            )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 bg-muted/30 rounded-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-[1.05]">
              Остались вопросы?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Начните с каталога решений или бесплатной проверки процесса. Выберите подходящий результат и формат работы.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/start")}
                className="px-8"
              >
                Подобрать формат работы
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/services")}
                className="px-8"
              >
                Посмотреть услуги
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
