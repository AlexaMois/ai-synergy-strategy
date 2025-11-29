import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCountUp } from "@/hooks/use-count-up";
import { Image } from "lucide-react";

const CasesPage = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const cases = [
    {
      id: 1,
      image: null,
      targetAudience: "Кооперативная сеть, 500+ сотрудников",
      caseTitle: "Автоматизация договоров и внедрение ИИ",
      industry: "Ритейл / Кооперация",
      task: "Крайпотребсоюз нуждался в комплексной автоматизации работы юридического и финансового отделов, а также внедрении ИИ для повышения эффективности работы.",
      actions: [
        "Проведён полный аудит процессов и выдано экспертное заключение",
        "Разработана архитектура решения на базе российской платформы",
        "Выполнено корпоративное обучение всех сотрудников",
        "Автоматизированы юридический и финансово-экономический отделы",
        "Внедрена система контроля и мониторинга"
      ],
      result: "Время на обработку договоров сократилось на 92%, фонд оплаты труда снизился на 80%. Возврат инвестиций составил 278% за первый год работы системы.",
      mainMetric: { value: 278, prefix: "ROI ", suffix: "%" }
    },
    {
      id: 2,
      image: null,
      targetAudience: "B2B-компании и корпоративный сектор",
      caseTitle: "Голосовой интерфейс для корпоративных систем",
      industry: "IT / Автоматизация",
      task: "Необходимо было создать голосовой интерфейс для упрощения взаимодействия с корпоративными системами и ускорения бизнес-процессов.",
      actions: [
        "Разработана архитектура голосового интерфейса",
        "Настроены API интеграции с CRM и внутренними системами",
        "Проведено обучение модели под специфику бизнеса",
        "Внедрена интеграция с Telegram для удобства сотрудников"
      ],
      result: "Скорость обработки задач увеличилась в 5 раз. Система интегрирована с CRM и Telegram, что позволило сэкономить время маркетинга и SMM-отдела.",
      mainMetric: { value: 5, prefix: "×", suffix: " скорость" }
    },
    {
      id: 3,
      image: null,
      targetAudience: "Логистическая компания",
      caseTitle: "Автоматизация заявок и контроль менеджеров",
      industry: "Логистика",
      task: "Грузовой Экспресс столкнулся с проблемой длительной обработки заявок и отсутствием контроля работы менеджеров. Требовались быстрые отчёты и прозрачность процессов.",
      actions: [
        "Внедрена автоматизация через Telegram-бот",
        "Настроена интеграция с Google Sheets для учёта",
        "Добавлено голосовое управление для водителей",
        "Проект полностью уложился в бюджет клиента"
      ],
      result: "Менеджеры экономят 3-4 часа рабочего времени в неделю. Точность обработки заявок достигла 99%. Окупаемость проекта составила всего 3 недели.",
      mainMetric: { value: 3, prefix: "окупаемость ", suffix: " недели" }
    },
    {
      id: 4,
      image: null,
      targetAudience: "Розничная сеть, 20+ точек продаж",
      caseTitle: "Прогнозирование спроса и учёт товаров",
      industry: "Ритейл",
      task: "Сеть магазинов теряла прибыль из-за излишков товара на складе и неточных прогнозов спроса. Требовалась умная система учёта с прогнозированием.",
      actions: [
        "Внедрена система учёта с ИИ-прогнозированием",
        "Настроено прогнозирование продаж на основе исторических данных",
        "Выполнена интеграция с 1С",
        "Обучен персонал работе с новой системой"
      ],
      result: "Излишки товара на складе сократились на 40%, точность прогнозов выросла на 25%. ROI составил 215% за год.",
      mainMetric: { value: 215, prefix: "ROI ", suffix: "%" }
    },
    {
      id: 5,
      image: null,
      targetAudience: "Частная медицинская клиника",
      caseTitle: "Запись пациентов и обработка документации",
      industry: "Медицина",
      task: "Клиника нуждалась в автоматизации записи пациентов и обработки медицинской документации для снижения нагрузки на администраторов.",
      actions: [
        "Внедрён голосовой бот для автоматической записи пациентов",
        "Настроена автоматическая обработка медицинских карт",
        "Выполнена интеграция с медицинской информационной системой",
        "Обеспечена GDPR-совместимость системы"
      ],
      result: "Время работы администраторов сократилось на 60%, точность распознавания речи составила 98%. Окупаемость проекта — 2 месяца.",
      mainMetric: { value: 60, prefix: "–", suffix: "% времени" }
    },
    {
      id: 6,
      image: null,
      targetAudience: "EdTech-стартап",
      caseTitle: "Персонализация обучения",
      industry: "Образование",
      task: "Образовательная платформа хотела повысить завершаемость курсов и автоматизировать проверку заданий для масштабирования бизнеса.",
      actions: [
        "Разработан ИИ-ассистент для студентов",
        "Внедрена автоматическая проверка эссе и кода",
        "Настроены персональные рекомендации курсов",
        "Добавлена аналитика прогресса обучения"
      ],
      result: "Завершаемость курсов выросла на 45%, время на проверку заданий сократилось на 70%. Вовлеченность студентов увеличилась в 3 раза.",
      mainMetric: { value: 45, prefix: "+", suffix: "% завершений" }
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
            Кейсы и результаты внедрения ИИ
          </h1>
          <p className="text-xl text-text-body max-w-3xl mx-auto">
            Конкретные проекты с измеримыми результатами. Без приукрашивания — только факты и цифры.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section ref={ref} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {cases.map((caseItem, index) => {
              const metricCount = useCountUp({
                end: caseItem.mainMetric.value,
                duration: 1800,
                isVisible,
                prefix: caseItem.mainMetric.prefix,
                suffix: caseItem.mainMetric.suffix
              });
              
              return (
                <div
                  key={caseItem.id}
                  className={`bg-white rounded-[20px] shadow-card transition-all duration-300 hover:shadow-hover hover:scale-[1.02] overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Header with Image and Meta */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      {/* Image Placeholder */}
                      <div className="w-full md:w-[120px] h-[100px] md:h-[100px] flex-shrink-0 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-heading mb-1">
                          <span className="text-text-subtle">Для кого:</span> {caseItem.targetAudience}
                        </p>
                        <h3 className="text-lg font-semibold text-text-heading mb-1 leading-tight">
                          <span className="text-text-subtle font-normal">Тема кейса:</span> {caseItem.caseTitle}
                        </h3>
                        <p className="text-xs text-text-subtle">
                          Отрасль: {caseItem.industry}
                        </p>
                      </div>
                    </div>

                    {/* Task */}
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold text-text-heading mb-2">Задача</h4>
                      <p className="text-base text-text-body leading-relaxed">
                        {caseItem.task}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold text-text-heading mb-2">Что сделали</h4>
                      <ul className="space-y-2">
                        {caseItem.actions.map((action, idx) => (
                          <li key={idx} className="text-sm text-text-body flex items-start">
                            <span className="mr-2 text-primary font-bold">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Result */}
                    <div className="pt-5 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-text-heading mb-2">Результат</h4>
                      <p className="text-base text-text-body leading-relaxed mb-4">
                        {caseItem.result}
                      </p>
                      
                      {/* Main Metric */}
                      <div className="text-center py-4 bg-primary-light/30 rounded-xl">
                        <p className="text-2xl md:text-3xl font-bold text-primary">
                          {metricCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default CasesPage;