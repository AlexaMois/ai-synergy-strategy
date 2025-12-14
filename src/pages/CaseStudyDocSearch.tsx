import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  QrCode,
  Search,
  MessageCircle,
  TrendingUp,
  Users,
  BookOpen,
  Shield,
  Server,
  Zap,
  FileText,
  Settings,
  Headphones,
  BarChart3,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Building2,
  Lock,
  Eye,
  UserCheck,
  FileCheck,
} from "lucide-react";
import { useState } from "react";

const CaseStudyDocSearch = () => {
  const [expandedUseCase, setExpandedUseCase] = useState<string | undefined>("item-1");

  const useCases = [
    {
      id: "item-1",
      icon: Settings,
      title: "Поддержка производственного процесса",
      subtitle: "Текущее производство, сборка, ремонт",
      features: [
        "QR-коды на рабочих местах — сотрудники ищут инструкции в реальном времени",
        "Справка по допускам, технологии, процедурам",
        "Чек-листы и процедуры контроля качества",
        "Диагностика неисправностей при поломке оборудования",
      ],
      result: "50–100 часов в месяц сэкономлено, брак на 30–50% ниже",
    },
    {
      id: "item-2",
      icon: Headphones,
      title: "Поддержка клиентов 24/7",
      subtitle: "Для конечных пользователей вашего оборудования или услуг",
      features: [
        "Клиент сканирует QR на товаре/документе → получает справку в чат-боте",
        "Вопросы о параметрах, использовании, установке, устранении неисправностей",
        "Система отвечает мгновенно, даже в выходные и ночью",
        "Снижение обращений в техподдержку на 60–70%",
      ],
      result: "Выше лояльность клиентов, снижение нагрузки на операторов на 60–70%",
    },
    {
      id: "item-3",
      icon: BookOpen,
      title: "Внутренняя база знаний компании",
      subtitle: "Единое хранилище всех регламентов и процессов",
      features: [
        "Все инструкции, SOPs, регламенты в одном месте",
        "Поиск по смыслу — сотрудник спрашивает как угодно, система понимает",
        "История изменений документов — кто и когда что менял",
        "Версионирование — старые версии процессов всегда доступны",
      ],
      result: "Новые сотрудники обучаются в 4–6 раз быстрее",
    },
    {
      id: "item-4",
      icon: Users,
      title: "Быстрое обучение новых сотрудников",
      subtitle: "Вместо 2–3 недель — 3–5 дней до первого результата",
      features: [
        "Все инструкции доступны в чат-боте — новичок может ответить на большинство вопросов сам",
        "Интерактивные чек-листы — пошаговые подсказки",
        "Не требует постоянной помощи опытных коллег",
      ],
      result: "Снижение зависимости от «ключевых» людей, ускорение масштабирования",
    },
    {
      id: "item-5",
      icon: BarChart3,
      title: "Аналитика и выявление проблем производства",
      subtitle: "Данные для улучшения процессов",
      features: [
        "Система собирает все вопросы сотрудников — видно узкие места в производстве",
        "«Как исправить брак в узле X?» — если это частый вопрос, значит есть проблема",
        "Дашборд для руководства — какие темы спрашивают чаще всего",
        "Метрики качества и времени — видно, где терять время и где брак",
      ],
      result: "Быстрое выявление проблем, приоритизация улучшений",
    },
    {
      id: "item-6",
      icon: Building2,
      title: "Техподдержка для производителей и поставщиков",
      subtitle: "Если вы производитель оборудования или компонентов",
      features: [
        "Ваши клиенты встраивают вашу документацию в свою систему",
        "Их сотрудники получают справку по вашему оборудованию в реальном времени",
        "Снижение звонков в вашу техподдержку на 60–70%",
        "Вы собираете данные об ошибках клиентов — используете для улучшения продукта",
      ],
      result: "Масштабируемая техподдержка, выше репутация, развитие продукта",
    },
    {
      id: "item-7",
      icon: Megaphone,
      title: "Маркетинг и позиционирование как эксперта",
      subtitle: "Контент на основе вашей документации",
      features: [
        "Частые вопросы клиентов → идеи для статей, видео, вебинаров",
        "Демонстрация экспертизы — «мы разбираемся в каждой детали»",
        "Обучающие видео на YouTube с QR-кодами на расширенную документацию",
        "Статьи в блог на основе частых вопросов — органический трафик",
      ],
      result: "Позиционирование как лидера индустрии, органический трафик",
    },
  ];

  const timeline = [
    { stage: "Согласование и подготовка", days: "3–5 дней" },
    { stage: "Загрузка и обработка документов", days: "7–10 дней" },
    { stage: "Развёртывание системы", days: "5–7 дней" },
    { stage: "Тестирование с командой", days: "3–5 дней" },
    { stage: "Обучение и запуск", days: "2–3 дня" },
  ];

  const included = [
    "Анализ и подготовка всей вашей технической документации (любые форматы, языки)",
    "Оцифровка и структурирование документов через ComBox LLM",
    "QR-коды на рабочие места (изготовление, доставка, наклейка)",
    "Чат-бот в Telegram, Max или веб (на ваш выбор)",
    "Развёртывание системы (на вашем сервере или нашем)",
    "Обучение команды (как пользоваться системой)",
    "Техническая поддержка на период внедрения (3–4 недели)",
    "Документация администратора и инструкции пользователей",
  ];

  const security = [
    { icon: Lock, text: "Закрытый контур — ваша документация остаётся либо на вашем сервере, либо на нашем в России" },
    { icon: Shield, text: "Без отправки на чужие серверы — ComBox работает локально, данные не идут в облако" },
    { icon: Eye, text: "История и аудит — все вопросы и ответы логируются, видно кто и когда что спрашивал" },
    { icon: UserCheck, text: "Разделение прав доступа — каждый сотрудник видит только релевантную информацию" },
    { icon: Server, text: "Может быть развёрнута на вашем сервере — для максимальной независимости" },
    { icon: FileCheck, text: "Соглашение о конфиденциальности — подписываем при необходимости" },
  ];

  const advantages = [
    { icon: Zap, title: "ComBox LLM", text: "Российская модель, понимает русский идеально, на 90% дешевле GPT" },
    { icon: QrCode, title: "QR на рабочем месте", text: "Сотрудник просто наводит телефон, не нужно помнить команды" },
    { icon: Lock, title: "Закрытый контур", text: "Ваша ноу-хау остаётся под замком" },
    { icon: TrendingUp, title: "Окупается за 1 месяц", text: "Результат виден в сэкономленном времени и снижении брака" },
    { icon: CheckCircle2, title: "Готовое решение", text: "Работает уже, не пилот" },
    { icon: Settings, title: "Гибкая архитектура", text: "Выбираете, где хранить — у себя или у нас" },
    { icon: Users, title: "Масштабируется", text: "От одного рабочего места до сотен, от 50 документов до тысяч" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <PageBreadcrumbs currentPage="Интеллектуальный поиск по документации" />

            <div className="mt-8 sm:mt-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
                <QrCode className="w-10 h-10 text-primary" />
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-tight max-w-4xl mx-auto">
                Система интеллектуального поиска по технологической документации
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-primary font-medium">
                QR-код на рабочем месте → ответ в чат-боте за 3 секунды
              </p>

              {/* Visual flow */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border/50">
                  <QrCode className="w-8 h-8 text-primary" />
                  <span className="text-sm font-medium">Сканирование QR</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 sm:rotate-0" />
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border/50">
                  <Search className="w-8 h-8 text-primary" />
                  <span className="text-sm font-medium">Вопрос системе</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 sm:rotate-0" />
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border/50">
                  <MessageCircle className="w-8 h-8 text-primary" />
                  <span className="text-sm font-medium">Ответ за 3 сек</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Задача
            </h2>

            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50 mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Инженер, сборщик или техник столкнулся с проблемой: как правильно собрать, проверить качество, найти нужный допуск? 
                Ищет инструкцию — листает регламенты, спрашивает опытного коллегу, <span className="text-foreground font-medium">теряет 20–30 минут на один вопрос</span>.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-5 text-center shadow-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">20–30</div>
                <div className="text-sm text-muted-foreground mt-1">минут на один вопрос</div>
              </div>
              <div className="bg-card rounded-xl p-5 text-center shadow-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">50–100</div>
                <div className="text-sm text-muted-foreground mt-1">часов потерь в месяц</div>
              </div>
              <div className="bg-card rounded-xl p-5 text-center shadow-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">100–200K</div>
                <div className="text-sm text-muted-foreground mt-1">₽ убытков ежемесячно</div>
              </div>
              <div className="bg-card rounded-xl p-5 text-center shadow-sm border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-primary">5–10%</div>
                <div className="text-sm text-muted-foreground mt-1">брака из-за ошибок</div>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5">
              <p className="text-foreground font-medium">
                Главное: вся информация есть в документации, но она разбросана и недоступна в нужный момент.
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Решение
            </h2>

            <p className="text-muted-foreground mb-8">
              Сотрудник наводит телефон на QR-код на рабочем месте → за 3 секунды в чат-боте получает точный ответ из вашей документации:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border/50">
                <p className="font-medium text-foreground mb-2">«Как собрать узел X?»</p>
                <p className="text-sm text-muted-foreground">→ пошаговый алгоритм + схема + фото</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border/50">
                <p className="font-medium text-foreground mb-2">«Какой допуск на деталь Y?»</p>
                <p className="text-sm text-muted-foreground">→ спецификация + чертёж</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border/50">
                <p className="font-medium text-foreground mb-2">«Как проверить качество?»</p>
                <p className="text-sm text-muted-foreground">→ процедура проверки + примеры брака</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border/50">
                <p className="font-medium text-foreground mb-2">«Что делать при неисправности Z?»</p>
                <p className="text-sm text-muted-foreground">→ алгоритм диагностики + решение</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-5 text-center">
              <p className="text-lg font-medium text-foreground">
                Результат: задача решается за <span className="text-primary">3–5 минут</span> вместо 20–30 минут. 
                Брак снижается на <span className="text-primary">30–50%</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Economics Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Экономика
            </h2>

            <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Метрика</TableHead>
                    <TableHead className="text-center">Было</TableHead>
                    <TableHead className="text-center">Стало</TableHead>
                    <TableHead className="text-center text-primary">Экономия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Время на один вопрос</TableCell>
                    <TableCell className="text-center text-muted-foreground">20–30 мин</TableCell>
                    <TableCell className="text-center text-muted-foreground">3–5 мин</TableCell>
                    <TableCell className="text-center font-medium text-primary">15–25 минут</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Часов в месяц (команда 10 чел)</TableCell>
                    <TableCell className="text-center text-muted-foreground">50–100 ч</TableCell>
                    <TableCell className="text-center text-muted-foreground">10–15 ч</TableCell>
                    <TableCell className="text-center font-medium text-primary">40–85 часов</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Денежный эквивалент</TableCell>
                    <TableCell className="text-center text-muted-foreground">—</TableCell>
                    <TableCell className="text-center text-muted-foreground">—</TableCell>
                    <TableCell className="text-center font-medium text-primary">100–200K ₽/мес</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Брак и переделки</TableCell>
                    <TableCell className="text-center text-muted-foreground">5–10%</TableCell>
                    <TableCell className="text-center text-muted-foreground">1–2%</TableCell>
                    <TableCell className="text-center font-medium text-primary">50–150K ₽/мес</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <div className="text-sm text-muted-foreground mb-1">Экономия в месяц</div>
                <div className="text-3xl sm:text-4xl font-bold text-primary">150–350K ₽</div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Окупаемость</div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground">1 месяц</div>
                <div className="text-sm text-muted-foreground mt-1">при инвестиции 150K ₽</div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              Применение
            </h2>
            <p className="text-muted-foreground mb-8">7 вариантов использования системы</p>

            <Accordion
              type="single"
              collapsible
              value={expandedUseCase}
              onValueChange={setExpandedUseCase}
              className="space-y-3"
            >
              {useCases.map((useCase, index) => (
                <AccordionItem
                  key={useCase.id}
                  value={useCase.id}
                  className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30">
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                        <useCase.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary font-medium">{index + 1}.</span>
                          <span className="font-medium text-foreground">{useCase.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{useCase.subtitle}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <ul className="space-y-2 mb-4">
                      {useCase.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-primary/5 rounded-lg p-3">
                      <p className="text-sm font-medium text-foreground">
                        Результат: {useCase.result}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-8">
              Стоимость
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Option 1 */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Вариант 1</h3>
                    <p className="text-sm text-muted-foreground">На вашем сервере</p>
                  </div>
                </div>

                <div className="text-3xl font-bold text-foreground mb-4">
                  150 000 ₽
                </div>

                <p className="text-sm text-muted-foreground mb-4">Полный контроль над данными</p>

                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p className="font-medium text-foreground mb-2">Требования к серверу:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Intel Core i9/Ryzen 9 (12+ ядер)</li>
                    <li>• 64 ГБ RAM</li>
                    <li>• 2× RTX 5080/5090</li>
                    <li>• NVMe SSD 1–2 ТБ</li>
                    <li>• ОС: АТЛАНТ/D12 или Windows Server</li>
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Если сервера нет: готовый ~450–550 тыс. ₽
                </p>
              </div>

              {/* Option 2 */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Вариант 2</h3>
                    <p className="text-sm text-muted-foreground">На нашем сервере</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Разработка и настройка</span>
                    <span className="font-semibold">100 000 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Комплектующие</span>
                    <span className="font-semibold">≈ 250 000 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ежемесячно</span>
                    <span className="font-semibold">15 000 ₽/мес</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-1">При делении на 3 компании:</p>
                  <p className="text-sm text-muted-foreground">
                    ≈ 40K ₽ (первоначально) + 5K ₽/месяц
                  </p>
                </div>
              </div>
            </div>

            {/* Google Sheets Option */}
            <div className="bg-card rounded-xl p-5 shadow-sm border border-border/50">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Опция: Интеграция с Google Таблицами</p>
                    <p className="text-sm text-muted-foreground">Добавляет контекст заказов, статусов, данных из вашей системы</p>
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">+50 000 ₽</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-8">
              Сроки внедрения
            </h2>

            <div className="relative">
              <div className="hidden sm:block absolute left-[18px] top-6 bottom-6 w-0.5 bg-border" />

              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative z-10 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 bg-card rounded-xl p-4 shadow-sm border border-border/50">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-medium text-foreground">{item.stage}</span>
                        <span className="text-sm text-primary font-medium">{item.days}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-primary/10 rounded-xl p-5 text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">3–4 недели</div>
                  <div className="text-sm text-muted-foreground">полное внедрение</div>
                </div>
                <div className="flex-1 bg-card rounded-xl p-5 text-center shadow-sm border border-border/50">
                  <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">10–14 дней</div>
                  <div className="text-sm text-muted-foreground">пилот на 3–5 рабочих мест</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Что включено
            </h2>

            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-card rounded-xl p-4 shadow-sm border border-border/50">
                  <span className="text-primary font-medium shrink-0">•</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Безопасность
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {security.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
              Почему именно мы
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {advantages.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-5 shadow-sm border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />

        <Partners />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CaseStudyDocSearch;
