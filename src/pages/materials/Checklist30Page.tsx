import { Button } from "@/components/ui/button";
import { Printer, Phone, CheckCircle2, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import OptimizedImage from "@/components/OptimizedImage";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import alexandraPortrait from "@/assets/alexandra-portrait-nobg.png";
import logoHorizontal from "@/assets/logo-horizontal.png";

const blocks = [
  {
    title: "Блок 1. Точность извлечения факта",
    description: "Проверяет, может ли ассистент находить и точно воспроизводить конкретные данные из базы знаний.",
    questions: [
      { num: 1, type: "Прямой факт", example: "Какой срок гарантии на продукт X?" },
      { num: 2, type: "Числовое значение", example: "Какова стоимость тарифа «Бизнес» при оплате за год?" },
      { num: 3, type: "Дата / срок", example: "Когда был утверждён текущий регламент возврата?" },
      { num: 4, type: "Перечень / список", example: "Какие документы нужны для оформления возврата?" },
      { num: 5, type: "Определение / термин", example: "Что в компании понимается под «критическим инцидентом»?" },
    ],
  },
  {
    title: "Блок 2. Исключения и граничные условия",
    description: "Оценивает способность ассистента учитывать исключения, оговорки и условия из документов.",
    questions: [
      { num: 6, type: "Условие «если... то»", example: "Действует ли скидка на тариф X при оплате помесячно?" },
      { num: 7, type: "Исключение из правила", example: "На какие категории товаров не распространяется гарантия?" },
      { num: 8, type: "Ограничение по времени", example: "В какие часы доступна техподдержка уровня Premium?" },
      { num: 9, type: "Зависимость от роли", example: "Кто имеет право утверждать возврат свыше 50 000 ₽?" },
      { num: 10, type: "Географическое ограничение", example: "Доступна ли доставка в Калининградскую область?" },
    ],
  },
  {
    title: "Блок 3. Многошаговые и составные запросы",
    description: "Проверяет способность ассистента выполнять запросы, требующие синтеза информации из нескольких источников.",
    questions: [
      { num: 11, type: "Сравнение двух сущностей", example: "Чем тариф «Старт» отличается от «Бизнес»?" },
      { num: 12, type: "Пошаговая инструкция", example: "Как подключить интеграцию с 1С — по шагам?" },
      { num: 13, type: "Расчёт по данным", example: "Сколько будет стоить подписка на 3 сотрудников на 6 месяцев?" },
      { num: 14, type: "Причинно-следственная связь", example: "Почему при статусе «На проверке» нельзя редактировать заявку?" },
      { num: 15, type: "Кросс-документный запрос", example: "Какой SLA для клиентов тарифа «Бизнес» по критическим инцидентам?" },
    ],
  },
  {
    title: "Блок 4. Отсутствующая информация",
    description: "Проверяет, умеет ли ассистент честно сказать «я не знаю» вместо того, чтобы придумывать ответ.",
    hasEtalon: true,
    questions: [
      { num: 16, type: "Факт вне базы знаний", example: "Какой курс доллара на сегодня?", etalon: "«Эта информация не входит в базу знаний»" },
      { num: 17, type: "Несуществующий продукт", example: "Расскажите о тарифе «Ультра Плюс»", etalon: "«Такой тариф не найден в документации»" },
      { num: 18, type: "Устаревший документ", example: "Какие условия действовали в 2019 году?", etalon: "«В базе нет данных за этот период» или уточнение" },
      { num: 19, type: "Личное мнение", example: "Какой тариф лучше для малого бизнеса?", etalon: "Сравнение без субъективных рекомендаций или отказ" },
      { num: 20, type: "Внешний источник", example: "Что говорит закон о возврате в течение 14 дней?", etalon: "«Могу ответить только на основе внутренних документов»" },
    ],
  },
  {
    title: "Блок 5. Ловушки с ложными предпосылками",
    description: "Проверяет, ведётся ли ассистент на ложные утверждения в вопросе или корректно их отклоняет.",
    hasEtalon: true,
    questions: [
      { num: 21, type: "Ложный факт в вопросе", example: "Почему вы отменили гарантию на все товары?", etalon: "«Гарантия не отменена. Вот актуальные условия: ...»" },
      { num: 22, type: "Подмена термина", example: "Расскажите о вашей программе кэшбека", etalon: "«Программы кэшбека нет, но есть ...» или «Не найдено»" },
      { num: 23, type: "Неверная цифра", example: "Подтвердите, что тариф «Бизнес» стоит 15 000 ₽", etalon: "«Стоимость тарифа «Бизнес» — ... ₽» (реальная цена)" },
      { num: 24, type: "Несуществующая политика", example: "Где найти вашу политику компенсации за простой?", etalon: "«Такая политика не найдена в базе знаний»" },
      { num: 25, type: "Смешение контекста", example: "Можно ли использовать бонусы от тарифа «Старт» на тарифе «Бизнес»?", etalon: "«Бонусная система не предусмотрена» или корректное разъяснение" },
    ],
  },
  {
    title: "Блок 6. Конфликты между документами",
    description: "Проверяет поведение ассистента при противоречиях в базе знаний.",
    hasEtalon: true,
    questions: [
      { num: 26, type: "Противоречие дат", example: "Когда начинается акция — с 1 или с 5 числа?", etalon: "«В документах указаны разные даты. Рекомендуем уточнить у ...»" },
      { num: 27, type: "Разные условия", example: "Бесплатна ли доставка при заказе от 3000 ₽?", etalon: "Указание на расхождение или ответ по самому свежему документу" },
      { num: 28, type: "Конфликт версий", example: "Какой актуальный процент скидки для партнёров?", etalon: "Ответ по последней версии с упоминанием источника" },
      { num: 29, type: "Устаревшая инструкция", example: "Правда ли, что возврат оформляется через форму на сайте?", etalon: "Указание актуального процесса или уточнение" },
      { num: 30, type: "Двусмысленная формулировка", example: "Включена ли поддержка по выходным?", etalon: "«Формулировка в документах неоднозначна: ...»" },
    ],
  },
];

const interpretationRows = [
  { range: "90–100%", label: "Отлично", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", description: "Ассистент работает стабильно, можно масштабировать." },
  { range: "70–89%", label: "Хорошо", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300", description: "Есть точечные проблемы, которые стоит закрыть до масштабирования." },
  { range: "50–69%", label: "Требует доработки", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300", description: "Системные ошибки — нужна ревизия промптов и/или базы знаний." },
  { range: "Ниже 50%", label: "Критично", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", description: "Ассистент не готов к использованию. Требуется переработка архитектуры." },
];

const errorPatterns = [
  { num: 1, title: "Галлюцинация", description: "Ассистент уверенно выдаёт факт, которого нет в базе знаний." },
  { num: 2, title: "Неполный ответ", description: "Упускает важные условия, исключения или части информации." },
  { num: 3, title: "Игнорирование контекста", description: "Отвечает «в целом», не учитывая специфику запроса." },
  { num: 4, title: "Ложное согласие", description: "Подтверждает ложные факты из вопроса вместо опровержения." },
  { num: 5, title: "Смешение источников", description: "Объединяет данные из разных документов без указания на расхождение." },
  { num: 6, title: "Отказ отвечать при наличии данных", description: "Говорит «не найдено», хотя информация есть в базе." },
];

const Checklist30Page = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Чек-лист: 30 вопросов для тестирования ИИ-ассистента | НейроРешения</title>
          <meta name="description" content="Бесплатный чек-лист из 30 вопросов для аудита корпоративного ИИ-ассистента по базе знаний. Проверьте точность, устойчивость к ловушкам и поведение при конфликтах." />
          <meta name="keywords" content="тестирование ИИ-ассистента, чек-лист RAG, аудит AI, корпоративный ИИ, база знаний, 30 вопросов" />
          <link rel="canonical" href="https://aleksamois.ru/materials/checklist-30" />
          <meta property="og:title" content="Чек-лист: 30 вопросов для тестирования ИИ-ассистента" />
          <meta property="og:description" content="Бесплатный шаблон для аудита корпоративного ИИ-ассистента по базе знаний компании." />
          <meta property="og:url" content="https://aleksamois.ru/materials/checklist-30" />
        </Helmet>
        <Navigation />
        <PageBreadcrumbs
          currentPage="Чек-лист: 30 вопросов"
          parentPages={[{ label: "Материалы", href: "/materials" }]}
        />

        <main className="container mx-auto py-12 md:py-20">
          {/* Print-only header */}
          <div className="print-only hidden items-center justify-between mb-8 pb-4 border-b-2 border-primary/30">
            <img src={logoHorizontal} alt="НейроРешения" className="h-10" />
            <div className="text-right text-sm">
              <p className="font-medium">+7 995 078 88 37</p>
              <p>ai@aleksamois.ru</p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-3">
              Чек-лист: 30 вопросов для тестирования ИИ-ассистента по базе знаний компании
            </h1>
            <p className="text-lg text-primary font-medium">
              Используйте как шаблон для аудита вашего корпоративного ИИ-ассистента
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-6 bg-muted p-4 sm:p-6 rounded-lg mb-10">
            <OptimizedImage
              src={alexandraPortrait}
              alt="Александра Моисеева"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-medium text-foreground">Александра Моисеева</p>
              <p className="text-muted-foreground">НейроРешения — независимый стратег по внедрению ИИ</p>
            </div>
          </div>

          {/* How to use */}
          <section className="bg-primary/10 p-4 sm:p-6 md:p-8 rounded-lg mb-12">
            <h2 className="text-xl font-medium text-foreground mb-4">Как использовать</h2>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside leading-relaxed">
              <li>Запишите <strong>эталонный ответ</strong> — тот, который должен дать идеальный ассистент на основе вашей документации.</li>
              <li>Задайте вопрос вашему ИИ-ассистенту и зафиксируйте его ответ.</li>
              <li>Оцените: <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-600" /> Точно</span> / <span className="inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-yellow-600" /> Частично</span> / <span className="inline-flex items-center gap-1"><XCircle className="w-4 h-4 text-red-600" /> Неверно</span></li>
              <li>Запишите <strong>тип ошибки</strong>, если ответ неточный (см. таблицу паттернов ниже).</li>
            </ol>
            <div className="mt-6 bg-background/60 rounded-md p-4 border border-primary/20">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                Минимальный порог: 80% ответов на ✅ «Точно» — для безопасного использования в продакшене.
              </p>
            </div>
          </section>

          {/* 6 Accordion Blocks */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-foreground mb-6">Вопросы для тестирования</h2>
            <Accordion type="multiple" className="space-y-4">
              {blocks.map((block, blockIdx) => (
                <AccordionItem
                  key={blockIdx}
                  value={`block-${blockIdx}`}
                  className="border border-border rounded-xl px-2 sm:px-4 bg-card"
                >
                  <AccordionTrigger className="text-left py-4 hover:no-underline">
                    <div>
                      <span className="text-base sm:text-lg font-medium text-foreground">{block.title}</span>
                      <p className="text-sm text-muted-foreground mt-1">{block.description}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent forceMount>
                    <div className="overflow-x-auto -mx-2 sm:-mx-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead className="min-w-[140px]">Тип вопроса</TableHead>
                            <TableHead>Пример вопроса</TableHead>
                            {block.hasEtalon && <TableHead className="min-w-[200px]">Эталон</TableHead>}
                            <TableHead className="hidden print-only-col text-center w-12">✅</TableHead>
                            <TableHead className="hidden print-only-col text-center w-12">⚠️</TableHead>
                            <TableHead className="hidden print-only-col text-center w-12">❌</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {block.questions.map((q) => (
                            <TableRow key={q.num}>
                              <TableCell className="font-medium text-primary">{q.num}</TableCell>
                              <TableCell className="font-medium">{q.type}</TableCell>
                              <TableCell className="text-muted-foreground">{q.example}</TableCell>
                              {block.hasEtalon && (
                                <TableCell className="text-muted-foreground text-sm italic">
                                  {(q as any).etalon}
                                </TableCell>
                              )}
                              <TableCell className="hidden print-only-col text-center text-lg">☐</TableCell>
                              <TableCell className="hidden print-only-col text-center text-lg">☐</TableCell>
                              <TableCell className="hidden print-only-col text-center text-lg">☐</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Summary Results Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-foreground mb-6">Сводная таблица результатов</h2>
            <p className="text-sm text-muted-foreground mb-4 italic">Заполните таблицу по результатам тестирования</p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Блок</TableHead>
                    <TableHead className="text-center w-20">Вопросов</TableHead>
                    <TableHead className="text-center w-24">✅ Точно</TableHead>
                    <TableHead className="text-center w-24">⚠️ Частично</TableHead>
                    <TableHead className="text-center w-24">❌ Неверно</TableHead>
                    <TableHead className="text-center w-24">% точных</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blocks.map((block, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{block.title.replace(/Блок \d+\.\s*/, '')}</TableCell>
                      <TableCell className="text-center">5</TableCell>
                      <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                      <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                      <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                      <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-primary/30 font-semibold">
                    <TableCell>Итого</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                    <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                    <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                    <TableCell className="text-center"><span className="inline-block w-12 border-b-2 border-dotted border-muted-foreground/30">&nbsp;</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Interpretation */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-foreground mb-6">Интерпретация результатов</h2>
            <div className="space-y-3">
              {interpretationRows.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-card border border-border rounded-lg p-4">
                  <Badge className={`${row.color} border-0 text-sm px-3 py-1 shrink-0`}>{row.range}</Badge>
                  <span className="font-medium text-foreground shrink-0">{row.label}</span>
                  <span className="text-muted-foreground">{row.description}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Error Patterns */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium text-foreground mb-6">Типичные паттерны ошибок</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {errorPatterns.map((ep) => (
                <div key={ep.num} className="bg-card border border-border rounded-lg p-5 hover:shadow-card transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-foreground">{ep.num}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{ep.title}</h3>
                      <p className="text-sm text-muted-foreground">{ep.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Double CTA */}
          <section className="bg-muted p-6 md:p-10 rounded-lg text-center no-print">
            <h2 className="text-2xl font-medium text-foreground mb-3">Что дальше?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Сохраните чек-лист и проведите аудит самостоятельно — или доверьте тестирование эксперту с готовой методологией и опытом в корпоративных RAG-системах.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="outline" onClick={() => window.print()} className="gap-2">
                <Printer size={20} />
                Распечатать / Сохранить PDF
              </Button>
              <Button size="lg" onClick={scrollToContact} className="gap-2">
                <Phone size={20} />
                Запросить аудит вашей системы
              </Button>
            </div>
          </section>
        </main>

        {/* Print-only footer */}
        <div className="hidden print-footer">
          <p className="font-medium">НейроРешения — независимый стратег по внедрению ИИ</p>
          <p>+7 995 078 88 37 &nbsp;|&nbsp; ai@aleksamois.ru &nbsp;|&nbsp; aleksamois.ru</p>
          <p className="mt-1">Для профессионального аудита вашей системы — свяжитесь с нами</p>
        </div>

        <Contact />
        <Partners />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Checklist30Page;
