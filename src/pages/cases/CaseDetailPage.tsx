import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { CheckCircle, Target, TrendingUp, Users, Clock, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

interface CaseData {
  slug: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  industry: string;
  price: string;
  status: string;
  task: string;
  actions: string[];
  results: string[];
  quote?: string;
}

const casesData: Record<string, CaseData> = {
  "ai-smm": {
    slug: "ai-smm",
    title: "AI-SMM Агентство",
    subtitle: "Автоматизация генерации контента для digital-команд",
    targetAudience: "внутренний продукт для digital-команд и SMM-специалистов",
    industry: "маркетинг, digital",
    price: "от 250 000 ₽",
    status: "действующий",
    task: "Сократить время на создание контента, устранить хаос в публикациях, автоматизировать работу SMM-команды и снизить расходы на копирайтеров и стратегов.",
    actions: [
      "Создали AI-бота, который генерирует посты, сторис, прогревы, контент-планы",
      "Поддержка текстовых и голосовых брифов",
      "Генерация под разные форматы (Stories, Reels, Telegram и др.)",
      "Интеграция с Telegram, Google Sheets, AmoCRM",
      "Настройка адаптации под платформу и стиль"
    ],
    results: [
      "Сокращение времени на контент с 8 часов до 15 минут в неделю",
      "Экономия до 80 000 ₽ в месяц",
      "Рост охватов и вовлечённости",
      "Стабильные продажи за счёт регулярности контента"
    ]
  },
  "school-assistant": {
    slug: "school-assistant",
    title: "Школьный ассистент",
    subtitle: "Умный AI-ассистент для родителей и администрации лицея",
    targetAudience: "Лицей №101, Санкт-Петербург",
    industry: "образование",
    price: "от 70 000 ₽",
    status: "действующий",
    task: "Освободить администрацию от бесконечных запросов родителей, автоматизировать доступ к расписанию, посещаемости и уведомлениям.",
    actions: [
      "Телеграм-бот, собирающий профиль ученика при регистрации",
      "Хранение информации в Google Sheets",
      "Парсинг PDF-расписаний",
      "Ответы на запросы родителей за 5–10 секунд",
      "Автоматическая рассылка изменений и событий"
    ],
    results: [
      "Ответы за 5–10 сек вместо 10–15 минут",
      "Экономия до 50 часов в месяц у администрации",
      "0 пропущенных уведомлений",
      "Повышение дисциплины и вовлечённости"
    ]
  },
  "neuro-tender": {
    slug: "neuro-tender",
    title: "НейроТендеролог",
    subtitle: "Автоматический отбор релевантных тендеров с помощью ИИ",
    targetAudience: "внутренний R&D-проект",
    industry: "тендеры, госзакупки",
    price: "от 150 000 ₽",
    status: "действующий",
    task: "Ускорить анализ тендеров, исключить ручную проверку и снизить вероятность упущенных выгодных торгов.",
    actions: [
      "Python-скрипт, собирающий тендеры с Контура по расписанию",
      "Фильтрация по стоп-словам",
      "Оценка релевантности через LLM в 3 этапа",
      "Уведомления в Telegram"
    ],
    results: [
      "Сокращение времени с 3 часов до 15 минут в день",
      "Исключение человеческого фактора",
      "Точность релевантности 85–90%"
    ]
  },
  "neuro-notes": {
    slug: "neuro-notes",
    title: "НейроКонспектолог",
    subtitle: "Автоматическая расшифровка и протоколирование встреч",
    targetAudience: "digital-команды",
    industry: "бизнес-процессы, внутренняя коммуникация",
    price: "от 50 000 ₽",
    status: "завершён",
    task: "Автоматизировать протоколирование встреч, снизить потери информации и уменьшить ручную работу.",
    actions: [
      "Автоматическая транскрибация аудио и видео",
      "Разметка по спикерам и темам",
      "Создание структурированных протоколов",
      "Интеграции с Telegram, Notion, Google Docs"
    ],
    results: [
      "Экономия 10 часов в неделю",
      "Прозрачность договорённостей",
      "Минимизация ошибок"
    ]
  },
  "vasya-secretary": {
    slug: "vasya-secretary",
    title: "ИИ-Вася Секретарь",
    subtitle: "Персональный AI-ассистент для стартап-основателей",
    targetAudience: "стартап-основатель (команда 3–5 человек)",
    industry: "продуктивность, бизнес-ассистенты",
    price: "от 80 000 ₽",
    status: "действующий",
    task: "Сократить рутинные задачи, улучшить организацию данных и отказаться от дорогостоящего человеческого ассистента.",
    actions: [
      "Ассистент в Telegram и приложении",
      "Голосовое управление календарём",
      "Заметки, папки, визитки, заявки",
      "AI-юрист",
      "Интеграции с Google Sheets"
    ],
    results: [
      "Экономия 20+ часов в месяц",
      "3 секунды вместо 5 часов на поиск информации",
      "ROI ~15×",
      "Полный порядок в данных, 0 потерь"
    ]
  },
  "neuro-fireman": {
    slug: "neuro-fireman",
    title: "НейроПожарник",
    subtitle: "AI-ассистент по нормам пожарной безопасности",
    targetAudience: "группа компаний «АЛЬТ»",
    industry: "промышленная безопасность",
    price: "от 120 000 ₽",
    status: "действующий",
    task: "Облегчить работу специалистов ПБ и сократить риски ошибок и штрафов.",
    actions: [
      "AI-ассистент в Telegram",
      "Парсинг законодательства",
      "База знаний по нормативам",
      "Интеграции с Telegram и Google Sheets"
    ],
    results: [
      "Ответы за 10 секунд вместо 30 минут",
      "Освобождение 80% времени",
      "Снижение риска штрафов до нуля"
    ]
  },
  "neuro-farmer": {
    slug: "neuro-farmer",
    title: "НейроФермер",
    subtitle: "Автоматизация управленческого учёта для фермерского хозяйства",
    targetAudience: "фермерское хозяйство + сеть магазинов",
    industry: "сельское хозяйство",
    price: "от 300 000 ₽",
    status: "действующий",
    task: "Упорядочить управленческий учёт, разгрузить руководителя и устранить частые ошибки.",
    actions: [
      "Telegram-бот с голосовым управлением",
      "Учёт надоев, рождений, процедур",
      "Ролевой доступ",
      "Integrations + PDF-отчёты"
    ],
    results: [
      "Экономия 60 часов в месяц",
      "Прозрачность и управляемость",
      "Выгода до 2 млн ₽ в год"
    ]
  },
  "samprodam-bot": {
    slug: "samprodam-bot",
    title: "СамПродам Бот",
    subtitle: "Автоматизация подготовки договоров для агентства недвижимости",
    targetAudience: "Агентство недвижимости «ЭКСПЕРТ»",
    industry: "недвижимость",
    price: "от 200 000 ₽",
    status: "действующий",
    task: "Автоматизировать подготовку договоров, снизить ошибки и ускорить работу юристов и риелторов.",
    actions: [
      "Telegram-бот с OCR",
      "Чтение паспортов и ЕГРН",
      "Подстановка в шаблоны",
      "Генерация PDF и Word"
    ],
    results: [
      "Проект в активной разработке"
    ]
  },
  "digital-twin": {
    slug: "digital-twin",
    title: "Цифровой двойник производства",
    subtitle: "Мгновенный доступ к данным предприятия через AI",
    targetAudience: "Промышленный холдинг средней величины",
    industry: "промышленность, производство",
    price: "от 500 000 ₽",
    status: "действующий",
    task: "Сократить время на сбор и анализ данных, обеспечить мгновенный доступ к ключевым показателям и снизить простои из-за задержек в принятии решений.",
    actions: [
      "Автоматический сбор данных из CRM, ERP, СКУД, видеонаблюдения и кадровой системы",
      "Гибридный поиск по ключевым словам и векторным связям",
      "Чат-интерфейс для голосовых и текстовых запросов",
      "Работа в изолированном контуре предприятия"
    ],
    results: [
      "Ответы < 1 секунды вместо 1–2 часов",
      "Ускорение управленческих решений ×5",
      "Снижение простоев на 20%",
      "100% устранение ошибок ручного ввода",
      "ROI за 3 месяца"
    ]
  },
  "corporate-docs": {
    slug: "corporate-docs",
    title: "Ассистент по корпоративным документам",
    subtitle: "Семантический поиск по 10 000+ файлов за секунды",
    targetAudience: "Крупная IT-компания",
    industry: "IT, документооборот",
    price: "от 200 000 ₽",
    status: "завершён",
    task: "Автоматизировать поиск ответов по базе >10 000 файлов и сократить время отклика с 10–15 минут до 10–15 секунд.",
    actions: [
      "Поддержка форматов DOCX, XLSX, PDF, TXT",
      "Генерация эмбеддингов для семантического поиска",
      "Гибридный поиск по документам",
      "Интеграция с LLM для генерации ответов",
      "REST API для интеграции с внутренними системами"
    ],
    results: [
      "Ответы за 100 мс",
      "Точность поиска 95%",
      "−40% нагрузки на поддержку",
      "Повышение эффективности ×3"
    ]
  },
  "doc-classification": {
    slug: "doc-classification",
    title: "Распознавание и классификация документов",
    subtitle: "OCR + ИИ-классификация входящих документов",
    targetAudience: "Компания, Москва",
    industry: "документооборот, бизнес-процессы",
    price: "от 210 000 ₽",
    status: "завершён",
    task: "Снизить время обработки документов с 5 минут до 0,2 секунды и исключить ошибки маршрутизации.",
    actions: [
      "OCR-модуль: извлечение текста за 0,2 секунды",
      "Классификатор документов с точностью 98%",
      "RAG-поиск по CRM/1С",
      "Telegram-бот для загрузки документов",
      "Интеграции: 1С, Google Sheets, внутренние системы"
    ],
    results: [
      "Скорость обработки: 0,2 секунды",
      "98% точности классификации",
      "Автоматизация — от 3 операторов до 0",
      "Ошибки <1%",
      "Экономия 120 000 ₽/мес, окупаемость 1,5 месяца"
    ]
  }
};

const CaseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const caseData = slug ? casesData[slug] : null;

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

  if (!caseData) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <Navigation />
          <div className="pt-32 pb-20 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Кейс не найден</h1>
            <Button onClick={() => navigate('/cases')}>Все кейсы</Button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: {caseData.title} — Александра Моисеева</title>
        <meta name="description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <link rel="canonical" href={`https://aleksamois.ru/cases/${caseData.slug}`} />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <PageBreadcrumbs 
          currentPage={caseData.title} 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        <main>
          {/* Hero Section */}
          <section className="pt-10 pb-10 md:pb-16 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-primary" strokeWidth={1.5} />
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  caseData.status === 'действующий' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {caseData.status}
                </span>
              </div>
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold text-foreground leading-tight mb-4">
                {caseData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {caseData.subtitle}
              </p>
              
              {/* Placeholder for hero image */}
              <div className="bg-muted rounded-2xl p-12 mb-8 flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                  <p className="text-muted-foreground">Место для скриншота системы или фото</p>
                </div>
              </div>
            </div>
          </section>

          {/* Meta Info Section */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <Users className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Для кого</p>
                  <p className="text-foreground font-medium">{caseData.targetAudience}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <Target className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Отрасль</p>
                  <p className="text-foreground font-medium">{caseData.industry}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <TrendingUp className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                  <p className="text-foreground font-medium">{caseData.price}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <Clock className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground mb-1">Статус</p>
                  <p className="text-foreground font-medium">{caseData.status}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Task Section */}
          <section className="py-10 md:py-16 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="section-title mb-8">Задача</h2>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <p className="text-lg text-foreground leading-relaxed">
                  {caseData.task}
                </p>
              </div>
            </div>
          </section>

          {/* Actions Section */}
          <section className="py-10 md:py-16 bg-muted">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="section-title mb-8">Что было сделано</h2>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <ul className="space-y-4">
                  {caseData.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{action}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-10 md:py-16 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="section-title mb-8">Результаты</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {caseData.results.map((result, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 shadow-soft flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                    <p className="text-foreground font-medium">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 md:py-16 bg-primary/10">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Хотите похожий результат?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Обсудим вашу задачу и найдём оптимальное решение
              </p>
              <Button size="lg" onClick={scrollToContact}>
                Заказать звонок <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        </main>

        <Contact />
        <Partners />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CaseDetailPage;
