import { 
  ShoppingCart, 
  Users, 
  FileText, 
  Factory, 
  Headphones, 
  BarChart3, 
  Puzzle, 
  ClipboardCheck, 
  TrendingUp, 
  Settings, 
  Database, 
  LayoutDashboard,
  FileCheck,
  Mic,
  PieChart,
  LucideIcon
} from "lucide-react";

interface TileData {
  title: string;
  icon: LucideIcon;
}

const Hero = () => {
  const businessTiles: TileData[] = [
    { title: "Продажи и заявки", icon: ShoppingCart },
    { title: "Контроль лидов", icon: Users },
    { title: "Документы и первичка", icon: FileText },
    { title: "Производство и объекты", icon: Factory },
    { title: "Поддержка клиентов", icon: Headphones },
    { title: "Аналитика и маржа", icon: BarChart3 },
    { title: "Интеграции и архитектура", icon: Puzzle },
    { title: "Отчёты и контроль", icon: ClipboardCheck },
    { title: "Прогнозирование", icon: TrendingUp },
    { title: "Управление процессами", icon: Settings },
    { title: "CRM без CRM", icon: Database },
    { title: "Данные и дашборды", icon: LayoutDashboard },
  ];

  const leaderTiles: TileData[] = [
    { title: "Автоматическая подготовка тендерной документации", icon: FileCheck },
    { title: "Личный голосовой помощник руководителя", icon: Mic },
    { title: "Дашборд директора", icon: PieChart },
  ];

  return (
    <section className="bg-background pt-20 sm:pt-24 pb-4 sm:pb-5">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Заголовок */}
        <div className="mb-3">
          <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight">
            ИИ-решения для бизнеса
          </p>
        </div>

        {/* Основная сетка — 12 плиток (2 ряда по 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-5">
          {businessTiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <div 
                key={index} 
                className="border border-border/50 rounded-md py-2 px-3 bg-white shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-[11px] font-medium text-foreground leading-tight">
                  {tile.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Блок для руководителей */}
        <div className="mb-3">
          <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight">
            ИИ-решения для руководителей
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {leaderTiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <div 
                key={index} 
                className="border border-border/50 rounded-md py-2 px-3 bg-white shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-[11px] font-medium text-foreground leading-tight">
                  {tile.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;