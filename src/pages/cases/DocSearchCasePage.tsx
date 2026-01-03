import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  Check, 
  Target,
  Server,
  Brain,
  FileText,
  Languages,
  Image,
  Wrench,
  Users,
  Building2,
  Cog,
  GraduationCap,
  Search,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackCTAClick } from "@/utils/analytics";

const DocSearchCasePage = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    trackCTAClick({ location: 'cases', buttonText: 'DocSearch CTA' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const losses = [
    { icon: Clock, value: "20–30 минут", label: "на один вопрос" },
    { icon: TrendingDown, value: "50–100 часов", label: "потерь в месяц (на команду)" },
    { icon: DollarSign, value: "100–200 тыс ₽", label: "косвенных убытков в месяц" },
    { icon: AlertTriangle, value: "5–10%", label: "брака из-за ошибок" },
  ];

  const workFormat = [
    "4 рабочих визита по 8 часов",
    "Аудит процессов",
    "Обучение персонала",
    "Проектирование решения",
    "Подготовка технического задания",
  ];

  const technicalWork = [
    "Собран и настроен локальный сервер на стороне клиента",
    "Установлена локальная языковая модель (Qwen)",
    "Начато внедрение Perplexity для аналитических и переводческих задач",
    "Разработаны промпты для перевода технического китайского",
    "Разработаны промпты для работы отдела VAT",
    "Разработаны промпты для обработки сложных инструкций",
    "Подготовлена архитектура интеллектуального поиска по документации",
  ];

  const pilotChecks = [
    "Понимание вопросов на русском языке",
    "Поиск ответов в документации на китайском и английском",
    "Работа с визуальными инструкциями и изображениями",
    "Контекст внутри одного большого станка и его узлов",
  ];

  const pilotResults = [
    { icon: Target, text: "100% точность ответов по выбранному руководству" },
    { icon: TrendingDown, text: "Снижение количества вопросов по телефону" },
    { icon: Languages, text: "Корректная работа с многоязычной документацией" },
    { icon: Image, text: "Понимание связки «текст + изображения»" },
    { icon: Wrench, text: "Инженерно корректные ответы" },
  ];

  const keyFindings = [
    "Решение реально разработано и протестировано",
    "Архитектура и ТЗ готовы",
    "Работа велась в рамках сопровождения и обучения",
    "Подтверждена техническая реализуемость сложного сценария",
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: Интеллектуальный поиск по технической документации | Александра Моисеева</title>
        <meta name="description" content="Кейс производственной компании: от хаоса в регламентах — к точным ответам за 3 секунды. Многоязычная документация, работа с изображениями, 100% точность ответов." />
        <link rel="canonical" href="https://aleksamois.ru/cases/doc-search" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <PageBreadcrumbs 
            currentPage="Интеллектуальный поиск" 
            parentPages={[{ label: "Кейсы", href: "/cases" }]}
          />

          {/* Hero */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Кейс
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  Производственная компания
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Интеллектуальный поиск по технической документации
              </h1>
              <p className="text-2xl md:text-3xl text-primary font-medium mb-8">
                От хаоса в регламентах — к точным ответам за 3 секунды
              </p>
            </div>
          </section>

          {/* О клиенте */}
          <section className="py-12 border-t border-border">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">О клиенте</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Производственная и сервисная компания, работающая со сложным промышленным оборудованием.
                </p>
                <p className="text-muted-foreground mb-4">Компания одновременно:</p>
                <ul className="space-y-3">
                  {[
                    { icon: Building2, text: "продаёт оборудование" },
                    { icon: Wrench, text: "обслуживает его" },
                    { icon: Cog, text: "выполняет ремонт и сервис" },
                    { icon: GraduationCap, text: "обучает персонал и клиентов" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-foreground">
                      <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Особенности документации</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Languages className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    На трёх языках — технический китайский, английский и русский
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    В разных форматах: PDF, сканы, изображения
                  </li>
                  <li className="flex items-start gap-3">
                    <Image className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    С большим количеством визуальных инструкций и схем
                  </li>
                  <li className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    Без единой структуры и логики поиска
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Исходная ситуация */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Исходная ситуация</h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8">
              <p className="text-lg text-foreground">
                Вся ключевая информация формально существовала, но на практике была <span className="font-semibold">недоступна</span>.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Как это выглядело в реальной работе</h3>
              <p className="text-muted-foreground mb-4">Инженер, сборщик или техник:</p>
              <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                <li>сталкивался с вопросом прямо на рабочем месте,</li>
                <li>начинал листать руководство,</li>
                <li>искал нужный фрагмент в многостраничных PDF,</li>
                <li>звонил более опытному коллеге,</li>
                <li>либо принимал решение «по опыту».</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-6">Потери до начала работ</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {losses.map((loss, index) => (
                <div key={index} className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                  <loss.icon className="w-8 h-8 text-red-500 mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{loss.value}</div>
                  <div className="text-sm text-muted-foreground">{loss.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-card rounded-2xl p-6 border-l-4 border-primary">
              <p className="text-lg font-semibold text-foreground">
                Главная проблема: Информация есть, но она не работает в момент принятия решения.
              </p>
            </div>
          </section>

          {/* Почему стандартные решения не подходили */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Почему стандартные решения не подходили</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-4">Компания рассматривала:</p>
                <ul className="space-y-2 text-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    классические базы знаний,
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    системы управления документацией,
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    корпоративные порталы.
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <p className="text-muted-foreground mb-4">От них отказались, потому что:</p>
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    они требуют дисциплины и обучения,
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    плохо приживаются на производстве,
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    не работают в режиме «вопрос → ответ прямо сейчас».
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Подход к работе */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Подход к работе</h2>
            <div className="bg-primary/5 rounded-2xl p-8 mb-8">
              <p className="text-lg text-foreground mb-4">
                Работа велась в формате <span className="font-semibold text-primary">сопровождения</span>, а не отдельного ИТ-проекта.
              </p>
              <p className="text-muted-foreground">Целью было:</p>
              <ul className="mt-4 space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  разобраться в реальных процессах,
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  обучать команду работе с ИИ,
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  провести аудит,
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  и параллельно решить самую критичную боль.
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-6 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-foreground mb-2">Ключевое решение</h3>
              <p className="text-muted-foreground">
                Не «перевести документацию», а <span className="text-foreground font-medium">дать сотруднику точный ответ на конкретный вопрос</span> — быстро и без лишних действий.
              </p>
            </div>
          </section>

          {/* Что было сделано */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">Что было сделано в рамках сопровождения</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Формат работы
                </h3>
                <ul className="space-y-2">
                  {workFormat.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  Техническая часть
                </h3>
                <ul className="space-y-2">
                  {technicalWork.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Пилот */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Пилот интеллектуального поиска</h2>
            
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <p className="text-muted-foreground mb-4">Для проверки гипотезы:</p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  выбрано одно техническое руководство,
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  проведена полная оцифровка и структурирование,
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  протестирована работа системы в реальных условиях.
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Что проверяли</h3>
                <ul className="space-y-3">
                  {pilotChecks.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Search className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Результаты пилота</h3>
                <ul className="space-y-3">
                  {pilotResults.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <item.icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Почему проект не был внедрён полностью */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Почему проект не был внедрён полностью</h2>
            
            <div className="bg-card rounded-2xl p-6 border border-border mb-6">
              <p className="text-muted-foreground mb-4">После успешного пилота:</p>
              <ul className="space-y-2 text-foreground mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  было подготовлено полное техническое задание,
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  предложено масштабирование решения на всю документацию компании.
                </li>
              </ul>

              <p className="text-muted-foreground mb-4">На этом этапе заказчик:</p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  оценил стоимость полноценного промышленного решения,
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  принял решение искать более бюджетный вариант,
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  отложил внедрение качественной архитектуры.
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
              <p className="text-foreground">
                Это было <span className="font-semibold">осознанное бизнес-решение</span>, а не отказ по техническим или качественным причинам.
              </p>
            </div>
          </section>

          {/* Что важно зафиксировать */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Что важно зафиксировать</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {keyFindings.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-2xl p-6">
              <p className="text-foreground">
                На базе этой работы сформирован <span className="font-semibold text-primary">готовый продукт</span>, доступный для внедрения у других производственных компаний.
              </p>
            </div>
          </section>

          {/* Статус сейчас */}
          <section className="py-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Статус сейчас</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full">
                <Check className="w-5 h-5" />
                <span className="font-medium">Пилот завершён</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full">
                <Check className="w-5 h-5" />
                <span className="font-medium">Решение оттестировано</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full">
                <Check className="w-5 h-5" />
                <span className="font-medium">Оформлено как продукт</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                <ArrowRight className="w-5 h-5" />
                <span className="font-medium">Готово к внедрению и масштабированию</span>
              </div>
            </div>
          </section>

          {/* Главный вывод */}
          <section className="py-12 border-t border-border">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Главный вывод кейса</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Интеллектуальный поиск по технической документации — это не чат-бот и не переводчик.
              </p>
              <p className="text-lg text-foreground mb-8">Это:</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <Brain className="w-6 h-6 text-primary" />
                  <span className="font-medium text-foreground">архитектура</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <Cog className="w-6 h-6 text-primary" />
                  <span className="font-medium text-foreground">понимание процессов</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <Image className="w-6 h-6 text-primary" />
                  <span className="font-medium text-foreground">работа с визуалом</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                  <Target className="w-6 h-6 text-primary" />
                  <span className="font-medium text-foreground">качество</span>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                которое не может быть «быстрым и дешёвым» без потери результата.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Готовы автоматизировать работу с документацией?
                  </h2>
                  <p className="text-muted-foreground">
                    Посмотрите готовый продукт или обсудите задачу для вашего производства
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => navigate('/products/doc-search')}>
                    Посмотреть продукт
                  </Button>
                  <Button size="lg" variant="outline" onClick={scrollToContact}>
                    Заказать звонок
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Contact />
      </main>

      <Footer />
    </PageTransition>
  );
};

export default DocSearchCasePage;
