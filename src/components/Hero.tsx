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
  ];

  const leaderTiles: TileData[] = [
    { title: "Автоматическая подготовка тендерной документации", icon: FileCheck },
    { title: "Личный голосовой помощник руководителя", icon: Mic },
    { title: "Дашборд директора", icon: PieChart },
  ];

  return (
    <section className="bg-background pt-20 sm:pt-24 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Единый контейнер — панель управления */}
        <div className="border border-border rounded-xl bg-card shadow-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Левая колонка — каталог решений */}
            <div className="flex-1 p-4 sm:p-5">
              {/* ИИ-решения для бизнеса */}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Для бизнеса
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {businessTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="aspect-[4/3] border border-border/60 rounded-lg p-3 bg-background hover:border-primary hover:bg-primary/5 transition-all duration-150 cursor-pointer flex flex-col justify-center items-center text-center gap-2"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-[10px] sm:text-[11px] font-medium text-foreground leading-tight">
                        {tile.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ИИ-решения для руководителей */}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Для руководителей
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {leaderTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/60 rounded-lg p-3 bg-background hover:border-primary hover:bg-primary/5 transition-all duration-150 cursor-pointer flex items-center gap-3"
                    >
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-medium text-foreground leading-tight">
                        {tile.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Разделитель */}
            <div className="hidden lg:block w-px bg-border" />

            {/* Правая колонка — инфографика */}
            <div className="hidden lg:flex w-72 p-5 items-center justify-center bg-muted/30">
              <svg 
                viewBox="0 0 200 240" 
                className="w-full h-auto max-h-[200px]"
                fill="none"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Узлы */}
                <circle cx="100" cy="50" r="35" fill="url(#grad1)" />
                <circle cx="50" cy="140" r="30" fill="url(#grad1)" />
                <circle cx="150" cy="140" r="30" fill="url(#grad1)" />
                <circle cx="100" cy="200" r="25" fill="url(#grad1)" />
                
                {/* Соединения */}
                <path d="M100 85 L50 110" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M100 85 L150 110" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M50 170 L100 175" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M150 170 L100 175" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.3" />
                
                {/* Точки */}
                <circle cx="100" cy="50" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
                <circle cx="50" cy="140" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
                <circle cx="150" cy="140" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
                <circle cx="100" cy="200" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;