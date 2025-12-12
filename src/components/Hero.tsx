import { Button } from "@/components/ui/button";
import { Phone, Calendar, Send } from "lucide-react";
const Hero = () => {
  const phoneNumber = "+7 993 721 73 67";
  const phoneLink = "tel:+79937217367";
  const telegramLink = "https://t.me/AlexandraMois";
  const calendarLink = "https://calendar.app.google/Zb3NNbpFm3Yh1uA59";
  const businessTiles = ["Продажи и заявки", "Контроль лидов", "Документы и первичка", "Производство и объекты", "Поддержка клиентов", "Аналитика и маржа", "Интеграции и архитектура", "Отчёты и контроль", "Прогнозирование", "Управление процессами", "CRM без CRM", "Данные и дашборды"];
  const leaderTiles = ["Автоматическая подготовка тендерной документации", "Личный голосовой помощник руководителя", "Дашборд директора"];
  return <section className="bg-background pt-14 sm:pt-16 pb-4 sm:pb-5">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Заголовок */}
        <div className="mb-3">
          <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight">
            ИИ-решения для бизнеса
          </p>
        </div>

        {/* Основная сетка — 12 плиток (2 ряда по 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-5">
          {businessTiles.map((title, index) => <div key={index} className="border border-dashed border-border rounded-md py-2.5 px-3 text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer">
              <span className="text-[13px] font-medium text-foreground leading-snug block">
                {title}
              </span>
            </div>)}
        </div>

        {/* Блок для руководителей */}
        <div className="mb-3">
          <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight">
            ИИ-решения для руководителей
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {leaderTiles.map((title, index) => <div key={index} className="border border-dashed border-border rounded-md py-2.5 px-3 text-left hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer">
              <span className="text-[13px] font-medium text-foreground leading-snug block">
                {title}
              </span>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Hero;