import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Image } from "lucide-react";

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
}

const CasesPage = () => {
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="section-title mb-4">
              Кейсы и результаты внедрения ИИ
            </h1>
            <p className="text-lg text-text-body max-w-3xl mx-auto">
              Реальные примеры аудита процессов, автоматизации и ИИ-решений для бизнеса
            </p>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white rounded-[20px] shadow-card hover:shadow-hover transition-all duration-300 hover:scale-[1.02] p-6 md:p-8 gradient-border gradient-border-hover"
              >
                {/* Image Placeholder */}
                <div className="w-full h-[120px] bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-heading mb-4 leading-tight">
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

      <Footer />
      <BackToTop />
    </div>
  );
};

export default CasesPage;
