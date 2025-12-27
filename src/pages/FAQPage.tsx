import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingUp, AlertTriangle, Users, Shield, Search, X } from "lucide-react";
import Navigation from "@/components/Navigation";
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
    id: "cost",
    title: "Стоимость и бюджет",
    icon: Wallet,
    questions: [
      {
        question: "Сколько стоит внедрение ИИ для бизнеса?",
        answer: "Стоимость зависит от задачи и масштаба процессов. Диагностика — от 15 000 ₽, архитектура и внедрение — от 150 000 ₽, сопровождение — от 60 000 ₽ в месяц. Точная цена становится понятна после анализа процессов."
      },
      {
        question: "Почему цены на ИИ-решения так сильно отличаются?",
        answer: "Разброс связан с тем, что «ИИ» — это широкий термин. Демо-бот за 30 000 ₽ и промышленная система за 500 000 ₽ решают разные задачи. Цена определяется сложностью интеграций, объёмом данных и требованиями к надёжности."
      },
      {
        question: "Можно ли начать с небольшого бюджета?",
        answer: "Да. Диагностика стоит 15 000 ₽ и даёт понимание, где ИИ даст эффект. Это минимальный вход, который экономит от неверных решений позже."
      },
      {
        question: "Есть ли фиксированная цена или всё индивидуально?",
        answer: "Есть типовые ценовые диапазоны. Но точная стоимость всегда индивидуальна, потому что зависит от процессов, данных и интеграций конкретного бизнеса."
      },
      {
        question: "Сколько стоит диагностика ИИ-процессов?",
        answer: "Диагностика стоит от 15 000 ₽. Включает анализ процессов, данных, ограничений и расчёт экономики. По итогам — отчёт с рекомендациями и тремя сценариями внедрения."
      },
      {
        question: "Что входит в стоимость внедрения?",
        answer: "Архитектура решения, настройка интеграций, тестирование, обучение команды, документация. Перечень фиксируется в договоре до начала работ."
      },
      {
        question: "Есть ли скрытые расходы после запуска?",
        answer: "Нет скрытых расходов. Возможные затраты после запуска: поддержка (если нужна), масштабирование, обновления. Всё это обсуждается заранее."
      },
      {
        question: "Можно ли внедрять ИИ поэтапно?",
        answer: "Да, и это правильный подход. Начинаем с пилота на одном процессе, замеряем результат, потом масштабируем. Это снижает риски и позволяет контролировать бюджет."
      },
      {
        question: "Что дороже: готовый продукт или кастомное решение?",
        answer: "Готовый продукт дешевле на старте, но часто требует доработок. Кастомное решение дороже, но точно под задачу. Выбор зависит от специфики процессов."
      },
      {
        question: "Почему «дешёвый ИИ-бот» — не всегда выгодно?",
        answer: "Дешёвый бот не учитывает процессы, ломается при нагрузке, требует постоянных доработок. В итоге переделка стоит дороже, чем если сразу спроектировать правильно."
      }
    ]
  },
  {
    id: "roi",
    title: "Окупаемость и эффект",
    icon: TrendingUp,
    questions: [
      {
        question: "Когда ИИ начинает окупаться?",
        answer: "В большинстве случаев — от 1 до 3 месяцев. Окупаемость считается в конкретных показателях: часы сотрудников, снижение потерь, ускорение процессов."
      },
      {
        question: "Как посчитать ROI от внедрения ИИ?",
        answer: "ROI = (экономия + дополнительная выручка) / затраты на внедрение. Рассчитывается на этапе диагностики: сколько теряется сейчас, сколько можно сэкономить, какой срок окупаемости."
      },
      {
        question: "За счёт чего появляется экономия?",
        answer: "Экономия появляется за счёт: сокращения ручного труда, снижения ошибок, ускорения процессов, уменьшения потерь заявок и данных."
      },
      {
        question: "Можно ли увидеть эффект уже в первый месяц?",
        answer: "Да, если выбрать правильную точку входа. Обычно первые результаты видны через 2–4 недели после запуска пилота."
      },
      {
        question: "Какие метрики вы используете для оценки результата?",
        answer: "Время выполнения операций, количество ошибок, конверсия заявок, часы сотрудников, потери данных, скорость ответа. Метрики определяются под задачу."
      },
      {
        question: "Что делать, если ИИ не дал ожидаемого эффекта?",
        answer: "Анализирую причины: неверная гипотеза, проблемы с данными, сопротивление команды. Корректирую или честно говорю, что задача не решается ИИ."
      },
      {
        question: "Есть ли реальные кейсы с цифрами?",
        answer: "Да. Например: «Грузовой Экспресс» — экономия 3–4 часа в неделю на менеджера, «НейроФермер» — экономия 60 часов в месяц. Все кейсы с цифрами на странице /cases."
      },
      {
        question: "Можно ли остановить проект, если он не зашёл?",
        answer: "Да. Поэтому начинаю с диагностики и пилота. Если на этапе пилота результат не подтверждается — проект не масштабируется."
      },
      {
        question: "Как понять, что ИИ вообще нужен моему бизнесу?",
        answer: "ИИ нужен, если есть: повторяющиеся задачи, большой объём данных, потери из-за ошибок или задержек. Если этого нет — скорее всего, достаточно простой автоматизации."
      },
      {
        question: "В каких процессах ИИ даёт максимальный эффект?",
        answer: "Обработка заявок, работа с документами, ответы на типовые вопросы, прогнозирование спроса, анализ данных. Там, где много рутины и данных."
      }
    ]
  },
  {
    id: "risks",
    title: "Риски и ошибки",
    icon: AlertTriangle,
    questions: [
      {
        question: "Какие главные ошибки при внедрении ИИ?",
        answer: "Внедрение без диагностики, выбор решения «по моде», игнорирование команды, отсутствие расчёта экономики. Каждая из этих ошибок приводит к потере бюджета."
      },
      {
        question: "Почему ИИ-проекты часто проваливаются?",
        answer: "Из-за спешки, отсутствия понимания процессов, неготовности данных, сопротивления команды. 80% провалов — из-за попытки «быстро внедрить»."
      },
      {
        question: "Что будет, если выбрать неправильную архитектуру?",
        answer: "Система будет работать нестабильно, потребует постоянных доработок, не выдержит масштабирования. Переделка обходится дороже, чем сразу спроектировать правильно."
      },
      {
        question: "Можно ли потерять данные при внедрении ИИ?",
        answer: "При правильном подходе — нет. Данные не удаляются, а дополняются. Перед внедрением делаем резервное копирование и тестируем на копии."
      },
      {
        question: "Опасно ли использовать ИИ для бизнеса?",
        answer: "Опасно — внедрять без понимания. ИИ усиливает существующие процессы: если есть порядок — станет лучше, если хаос — хаос усилится."
      },
      {
        question: "Что если сотрудники будут сопротивляться?",
        answer: "Сопротивление возникает, если внедрять «сверху». Мы обучаем команду, показываем выгоду каждой роли, встраиваем ИИ в привычные инструменты."
      },
      {
        question: "Может ли ИИ «сломать» текущие процессы?",
        answer: "Нет, если внедрять правильно. ИИ встраивается в процессы, а не заменяет их. Изменения происходят постепенно, с контролем на каждом этапе."
      },
      {
        question: "Нужно ли менять CRM или 1С?",
        answer: "Обычно нет. ИИ интегрируется с существующими системами через API. Замена CRM или 1С — отдельная задача, не связанная с внедрением ИИ."
      },
      {
        question: "Что делать, если подрядчик исчезнет?",
        answer: "Поэтому мы передаём документацию и обучаем команду. Система не должна зависеть от одного исполнителя."
      },
      {
        question: "Как избежать зависимости от разработчика?",
        answer: "Используем открытые решения, передаём исходный код, документируем архитектуру, обучаем команду. Цель — чтобы бизнес мог работать без нас."
      }
    ]
  },
  {
    id: "implementation",
    title: "Команда и внедрение",
    icon: Users,
    questions: [
      {
        question: "Нужно ли обучать сотрудников работе с ИИ?",
        answer: "Да, обучение входит в процесс внедрения. Без понимания, как работает система, команда не будет её использовать."
      },
      {
        question: "Сколько времени занимает внедрение?",
        answer: "Диагностика — 2–3 недели. Пилот — 3–6 недель. Полное внедрение — 2–4 месяца. Зависит от сложности процессов и готовности данных."
      },
      {
        question: "Кто со стороны клиента должен участвовать?",
        answer: "Руководитель проекта, владельцы процессов, IT-специалист (если есть). Минимум — один ответственный за принятие решений."
      },
      {
        question: "Нужен ли отдельный ИТ-отдел?",
        answer: "Нет. Большинство решений внедряются без участия IT. Если нужна интеграция с внутренними системами — достаточно одного технического специалиста."
      },
      {
        question: "Можно ли внедрить ИИ без остановки операционки?",
        answer: "Да. Внедрение происходит параллельно с текущей работой. Переключение на новую систему — плавное, после тестирования."
      },
      {
        question: "Как выглядит процесс внедрения по шагам?",
        answer: "1) Диагностика. 2) Архитектура. 3) Разработка пилота. 4) Тестирование. 5) Обучение команды. 6) Запуск. 7) Корректировка. 8) Масштабирование."
      },
      {
        question: "Кто поддерживает систему после запуска?",
        answer: "Варианты: ваша команда (после обучения), наша поддержка по договору, комбинированный вариант. Определяется до начала работ."
      },
      {
        question: "Можно ли масштабировать решение позже?",
        answer: "Да, если архитектура спроектирована правильно. Поэтому важно не экономить на этапе проектирования."
      },
      {
        question: "Что происходит после завершения проекта?",
        answer: "Передаём документацию, обучаем команду, закрываем акт. При необходимости — договор на поддержку. Система остаётся у вас."
      },
      {
        question: "Чем диагностика отличается от консалтинга?",
        answer: "Диагностика — это конкретный анализ ваших процессов с расчётом экономики. Консалтинг часто — общие рекомендации без привязки к цифрам."
      }
    ]
  },
  {
    id: "security",
    title: "Безопасность",
    icon: Shield,
    questions: [
      {
        question: "Где хранятся данные?",
        answer: "Варианты: ваш сервер, защищённая инфраструктура в РФ, облако (если допустимо). Выбор зависит от требований безопасности."
      },
      {
        question: "Можно ли работать без облаков?",
        answer: "Да. Используем локальные модели и закрытые контуры. Данные не передаются в облако, всё работает на вашем оборудовании."
      },
      {
        question: "Соответствует ли решение требованиям РФ?",
        answer: "Да. Учитываем 152-ФЗ, требования к локализации данных, отраслевые регламенты. Для финансов, производства, госструктур — особые требования."
      },
      {
        question: "Можно ли использовать локальные языковые модели?",
        answer: "Да. Есть российские и open-source модели, которые работают на вашем оборудовании без передачи данных вовне."
      },
      {
        question: "Как обеспечивается безопасность коммерческой информации?",
        answer: "Закрытый контур, локальные модели, разграничение доступа, шифрование, NDA. Конкретные меры определяются на этапе архитектуры."
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
        <title>FAQ — Вопросы об ИИ для бизнеса | Александра Моисеева</title>
        <meta 
          name="description" 
          content="45 ответов на главные вопросы о внедрении ИИ: стоимость, окупаемость, риски, безопасность данных, внедрение. Честные ответы без маркетинга." 
        />
        <meta name="keywords" content="внедрение ИИ, стоимость ИИ, ROI ИИ, риски ИИ, безопасность ИИ, FAQ" />
        <link rel="canonical" href="https://aleksamois.ru/faq" />
        <meta property="og:title" content="FAQ — Вопросы об ИИ для бизнеса | Александра Моисеева" />
        <meta property="og:description" content="45 ответов на главные вопросы о внедрении ИИ: стоимость, окупаемость, риски, безопасность." />
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

      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PageBreadcrumbs currentPage="FAQ" />

          {/* Hero Section */}
          <section className="text-center mb-12 mt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Вопросы об ИИ для бизнеса
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              45 честных ответов о стоимости, окупаемости, рисках и внедрении. 
              Без маркетинга — только факты и экономика.
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
              Обсудить задачу
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
