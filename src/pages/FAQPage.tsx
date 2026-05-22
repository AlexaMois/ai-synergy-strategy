import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Compass, Wallet, Map, GraduationCap, LifeBuoy, Search, X } from "lucide-react";

import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Contact from "@/components/Contact";
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
        answer: "Ориентируйтесь на текущую задачу. Если нужен первый шаг — подойдёт стратегическая встреча. Если нужен план на 90 дней — разработка стратегии цифрового развития. Если требуется подробный разбор компании — глубокий аудит. Если задача уже понятна и нужно внедрение — подойдёт сопровождение внедрения или разработка цифрового решения."
      },
      {
        question: "Можно начать с короткого разбора?",
        answer: "Да. Для этого есть стратегическая встреча по цифровизации для собственника. Она помогает быстро понять текущую точку А, первые приоритеты и следующий шаг."
      },
      {
        question: "Что делать, если задача пока сформулирована не до конца?",
        answer: "Начните со страницы выбора формата или со стратегической встречи. На этом этапе задача уточняется: какие процессы требуют внимания, где есть ручная нагрузка и какой формат работы даст больше пользы."
      },
      {
        question: "Можно сразу заказать внедрение?",
        answer: "Да, если задача уже понятна, есть процесс для цифровизации и ясно, какой результат нужен. Если данных пока мало, сначала лучше пройти стратегию или аудит."
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
        answer: "Стоимость зависит от формата. Стратегическая встреча стоит 17 000 ₽. Разработка стратегии цифрового развития — 78 000 ₽. Авторская программа — 68 000–152 000 ₽. Глубокий аудит — от 116 000 ₽. Сопровождение внедрения — 89 000–170 000 ₽ в месяц. Разработка цифрового решения — от 260 000 ₽. Сопровождение цифровых инструментов — 35 000–89 000 ₽ в месяц."
      },
      {
        question: "От чего зависит итоговая стоимость?",
        answer: "Итоговая стоимость зависит от масштаба компании, количества процессов, объёма данных, уровня интеграций, количества участников и глубины сопровождения."
      },
      {
        question: "Можно заказать только одну услугу?",
        answer: "Да. Каждый формат работает как отдельная услуга. При этом часть форматов логично продолжают друг друга: стратегия может перейти в аудит, аудит — во внедрение, внедрение — в сопровождение."
      },
      {
        question: "Можно оплачивать поэтапно?",
        answer: "Да. Для внедрения, разработки и сопровождения можно использовать поэтапную оплату: старт, промежуточные этапы и финальная передача результата."
      }
    ]
  },
  {
    id: "strategy",
    title: "Стратегия и аудит",
    icon: Map,
    questions: [
      {
        question: "Чем стратегическая встреча отличается от стратегии цифрового развития?",
        answer: "Стратегическая встреча помогает быстро понять первый шаг. Разработка стратегии цифрового развития глубже: разбираются процессы, ручная нагрузка, приоритеты и формируется план действий на 90 дней."
      },
      {
        question: "Чем стратегия отличается от глубокого аудита?",
        answer: "Стратегия даёт практический план на ближайшие 90 дней. Глубокий аудит подходит для более подробного разбора компании: процессов, данных, документов, текущих инструментов, рисков и готовности к внедрению."
      },
      {
        question: "Что я получу после стратегии?",
        answer: "Вы получите точку А, карту ручной нагрузки, приоритеты цифрового развития, план действий на 90 дней и понимание следующего этапа."
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
        question: "Когда нужно сопровождение цифрового внедрения?",
        answer: "Сопровождение внедрения подходит, когда задача уже понятна, но нужен контроль процесса: задачи, сроки, подрядчики, команда, инструкции, обучение и проверка результата."
      },
      {
        question: "Когда нужна разработка цифрового решения?",
        answer: "Разработка нужна, когда компании требуется конкретный инструмент под бизнес-процесс: заявки, документы, отчёты, база знаний, уведомления, внутренний помощник, портал или интеграция между сервисами."
      }
    ]
  },
  {
    id: "support",
    title: "Сопровождение и результат",
    icon: LifeBuoy,
    questions: [
      {
        question: "Что входит в сопровождение цифровых инструментов компании?",
        answer: "В сопровождение входит контроль работы инструментов, разбор ошибок, донастройка сценариев, обновление инструкций, консультации для сотрудников, добавление новых процессов и ежемесячная сводка по обращениям и доработкам."
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
        answer: "После завершения проекта можно перейти в сопровождение. Это помогает развивать инструмент, добавлять новые сценарии, поддерживать сотрудников и адаптировать систему под новые задачи компании."
      }
    ]
  }
];

// Flatten all questions for Schema.org
const allQuestions = faqCategories.flatMap(cat => cat.questions);

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("cost");
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
        <title>FAQ по автоматизации бизнеса с ИИ | Александра Моисеева</title>
        <meta 
          name="description" 
          content="Отвечаю на главные вопросы директоров: сколько стоит автоматизация с ИИ, когда окупится, какие риски и чего точно не стоит делать." 
        />
        <meta name="keywords" content="стоимость автоматизации бизнеса, риски автоматизации бизнес процессов, окупаемость ИИ, FAQ искусственный интеллект для бизнеса" />
        <link rel="canonical" href="https://aleksamois.ru/faq" />
        <meta property="og:title" content="FAQ по автоматизации бизнеса с ИИ | Александра Моисеева" />
        <meta property="og:description" content="Отвечаю на главные вопросы директоров: сколько стоит автоматизация с ИИ, когда окупится, какие риски есть и чего точно не стоит делать." />
        <meta property="og:url" content="https://aleksamois.ru/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aleksamois.ru/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.faq())}
        </script>
      </Helmet>

      

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PageBreadcrumbs currentPage="FAQ" />

          {/* Hero Section */}
          <section className="text-center mb-12 mt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Ответы на главные вопросы <span className="font-bold">об автоматизации с ИИ</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Директора чаще всего боятся трёх вещей: что будет дорого, долго и «потом всё сломается, а людей переучивать». В этом разделе я честно разбираю, сколько на самом деле стоит автоматизация с ИИ, как считать окупаемость по конкретным процессам, какие риски есть и чего точно не стоит делать, чтобы не превратить проект в очередной дорогой эксперимент.
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
                          ? "bg-primary text-primary-foreground shadow-md"
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
          <section className="max-w-3xl mx-auto mb-16">
            {isSearching ? (
              // Search results
              filteredQuestions && filteredQuestions.length > 0 && (
                <Accordion type="single" collapsible className="space-y-3">
                  {filteredQuestions.map((item, index) => {
                    const Icon = item.category.icon;
                    return (
                      <AccordionItem
                        key={`search-${index}`}
                        value={`item-${index}`}
                        className="bg-card border border-border rounded-lg px-6 overflow-hidden"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-5">
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
                        <AccordionContent className="text-muted-foreground pb-5">
                          {item.question.answer}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )
            ) : (
              // Category view
              activeData && (
                <Accordion type="single" collapsible className="space-y-3">
                  {activeData.questions.map((item, index) => (
                    <AccordionItem
                      key={`${activeCategory}-${index}`}
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-lg px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <span className="font-medium text-foreground pr-4">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )
            )}
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 bg-muted/30 rounded-2xl mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Не нашли ответ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Задайте вопрос напрямую — отвечу лично в течение дня
            </p>
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="px-8"
            >
              Заказать звонок
            </Button>
          </section>
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default FAQPage;
