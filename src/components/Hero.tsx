import { Button } from "@/components/ui/button";
import { Phone, Calendar, Send } from "lucide-react";

const Hero = () => {
  const phoneNumber = "+7 993 721 73 67";
  const phoneLink = "tel:+79937217367";
  const telegramLink = "https://t.me/AlexandraMois";
  const calendarLink = "https://calendar.app.google/Zb3NNbpFm3Yh1uA59";

  const businessTiles = [
    "Продажи и заявки",
    "Контроль лидов",
    "Документы и первичка",
    "Производство и объекты",
    "Поддержка клиентов",
    "Аналитика и маржа",
    "Интеграции и архитектура",
    "Отчёты и контроль",
    "Прогнозирование",
    "Управление процессами",
    "CRM без CRM",
    "Данные и дашборды",
  ];

  const leaderTiles = [
    "Автоматическая подготовка тендерной документации",
    "Личный голосовой помощник руководителя",
    "Дашборд директора",
  ];

  return (
    <section className="bg-background pt-16 sm:pt-18 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Заголовок и контакты — две колонки */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          {/* Левая колонка — текст */}
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight mb-2">
              ИИ-решения для бизнеса
            </h1>
            <p className="text-sm text-muted-foreground leading-snug max-w-xl">
              Встраиваю ИИ в существующие бизнес-процессы без переделки системы и операционки
            </p>
          </div>
          
          {/* Правая колонка — контакты */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  Заказать звонок
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                  <Send size={14} />
                  Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Основная сетка — 12 плиток (2 ряда по 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {businessTiles.map((title, index) => (
            <div
              key={index}
              className="border border-dashed border-border rounded-lg py-3 px-4 text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm font-medium text-foreground leading-snug block">
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* Блок для руководителей */}
        <div className="mb-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
            ИИ-решения для руководителей
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {leaderTiles.map((title, index) => (
            <div
              key={index}
              className="border border-dashed border-border rounded-lg py-3 px-4 text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              <span className="text-sm font-medium text-foreground leading-snug block">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
