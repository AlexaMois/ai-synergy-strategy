import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import { Image } from "lucide-react";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

interface CaseItem {
  id: number;
  title: string;
  image: string | null;
  targetAudience: string;
  industry: string;
  price: string;
  status: string;
  task: string;
  actions: string[];
  results: string[];
  categories: string[];
}

const CATEGORIES = [
  "Все кейсы",
  "Автоматизация процессов и данных",
  "AI-ассистенты для бизнеса",
  "Контент и коммуникации с помощью ИИ",
  "Корпоративное обучение и внедрение ИИ-компетенций",
  "R&D и внутренние инструменты",
];

const CasesPage = () => {
  const [activeCategories, setActiveCategories] = useState<string[]>(["Все кейсы"]);

  const handleCategoryClick = (category: string) => {
    if (category === "Все кейсы") {
      // Если выбран "Все кейсы", сбросить все остальные
      setActiveCategories(["Все кейсы"]);
    } else {
      // Если выбрана конкретная категория
      setActiveCategories(prev => {
        // Убираем "Все кейсы" если он был активен
        const withoutAll = prev.filter(cat => cat !== "Все кейсы");
        
        // Переключаем выбранную категорию
        if (withoutAll.includes(category)) {
          const newCategories = withoutAll.filter(cat => cat !== category);
          // Если не осталось выбранных категорий, возвращаем "Все кейсы"
          return newCategories.length === 0 ? ["Все кейсы"] : newCategories;
        } else {
          return [...withoutAll, category];
        }
      });
    }
  };

  const cases: CaseItem[] = [
    {
      id: 1,
      title: "AI-SMM Агентство — автоматизация генерации контента",
      image: null,
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
      ],
      categories: ["Контент и коммуникации с помощью ИИ"]
    },
    {
      id: 2,
      title: "Умный AI-ассистент для родителей («Школьный ассистент»)",
      image: null,
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
      ],
      categories: ["Автоматизация процессов и данных"]
    },
    {
      id: 3,
      title: "НейроТендеролог — отбор релевантных тендеров",
      image: null,
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
      ],
      categories: ["AI-ассистенты для бизнеса", "R&D и внутренние инструменты"]
    },
    {
      id: 4,
      title: "НейроКонспектолог — автоматическая расшифровка встреч",
      image: null,
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
      ],
      categories: ["R&D и внутренние инструменты"]
    },
    {
      id: 5,
      title: "ИИ-Вася Секретарь",
      image: null,
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
      ],
      categories: ["AI-ассистенты для бизнеса"]
    },
    {
      id: 6,
      title: "НейроПожарник — AI-ассистент по нормам ПБ",
      image: null,
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
      ],
      categories: ["AI-ассистенты для бизнеса"]
    },
    {
      id: 7,
      title: "Грузовой Экспресс — автоматизация заявок",
      image: null,
      targetAudience: "транспортная компания",
      industry: "логистика",
      price: "от 200 000 ₽",
      status: "завершён",
      task: "Ускорить приём заявок, исключить ошибки и обеспечить аналитическую прозрачность без внедрения CRM.",
      actions: [
        "Telegram-бот с ИИ",
        "Автоматическое сохранение заявок",
        "Распределение по менеджерам",
        "Ежедневные отчёты"
      ],
      results: [
        "Экономия 3–4 часа в неделю на менеджера",
        "0 дублей, 0 потерь",
        "Полная аналитика в реальном времени"
      ],
      categories: ["Автоматизация процессов и данных"]
    },
    {
      id: 8,
      title: "НейроФермер — автоматизация учёта",
      image: null,
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
      ],
      categories: ["Автоматизация процессов и данных"]
    },
    {
      id: 9,
      title: "СамПродам Бот — автоматизация договоров",
      image: null,
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
        "Результаты будут добавлены"
      ],
      categories: ["Автоматизация процессов и данных"]
    },
    {
      id: 10,
      title: "Цифровой двойник производства",
      image: null,
      targetAudience: "Промышленный холдинг средней величины (разработчик: Combox Technology)",
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
      ],
      categories: ["Автоматизация процессов и данных"]
    },
    {
      id: 11,
      title: "Ассистент по корпоративным документам",
      image: null,
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
      ],
      categories: ["AI-ассистенты для бизнеса"]
    },
    {
      id: 12,
      title: "Распознавание и классификация входящих документов",
      image: null,
      targetAudience: "Компания, Москва (разработчик: Combox Technology)",
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
      ],
      categories: ["Автоматизация процессов и данных"]
    }
  ];

  const filteredCases = activeCategories.includes("Все кейсы")
    ? cases 
    : cases.filter(caseItem => 
        caseItem.categories.some(cat => activeCategories.includes(cat))
      );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
      
      <main className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="section-title mb-4">
              Кейсы и результаты, <span className="font-semibold">измеримый эффект</span>
            </h1>
            <p className="text-lg text-text-body max-w-3xl mx-auto">
              Реальные примеры аудита процессов, автоматизации и ИИ-решений для бизнеса
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => {
              const isActive = activeCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    px-6 py-3 rounded-xl border text-sm font-medium
                    transition-all duration-300 ease-out
                    ${isActive
                      ? 'bg-primary text-white border-primary shadow-md scale-105' 
                      : 'bg-white text-text-body border-gray-200 hover:bg-primary hover:text-white hover:border-primary hover:scale-[1.02] hover:shadow-sm'
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white rounded-[20px] shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] p-4 sm:p-6 md:p-8 gradient-border gradient-border-hover"
              >
                {/* Image Placeholder */}
                <div className="w-full h-[120px] bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-text-heading mb-4 leading-tight">
                  {caseItem.title}
                </h3>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-text-body">
                    <span className="text-text-subtle">Для кого:</span> {caseItem.targetAudience}
                  </p>
                  <p className="text-sm text-text-body">
                    <span className="text-text-subtle">Отрасль:</span> {caseItem.industry}
                  </p>
                  <p className="text-sm text-text-body">
                    <span className="text-text-subtle">Стоимость:</span> {caseItem.price}
                  </p>
                  <p className="text-sm text-text-body">
                    <span className="text-text-subtle">Статус проекта:</span> {caseItem.status}
                  </p>
                </div>

                {/* Task */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-handwriting mb-2">Задача</p>
                  <p className="text-sm text-text-body leading-relaxed">
                    {caseItem.task}
                  </p>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-handwriting mb-2">Что сделали</p>
                  <ul className="space-y-1.5">
                    {caseItem.actions.map((action, idx) => (
                      <li key={idx} className="text-sm text-text-body leading-relaxed flex">
                        <span className="text-primary mr-2">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-handwriting mb-2">Результаты и эффекты</p>
                  <ul className="space-y-1.5">
                    {caseItem.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-text-body leading-relaxed flex">
                        <span className="text-primary mr-2">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
        <Contact />

      <Footer />
      <BackToTop />
    </div>
    </PageTransition>
  );
};

export default CasesPage;
