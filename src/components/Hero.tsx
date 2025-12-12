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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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


  return (
    <section className="bg-background pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Левая колонка — каталог (2/3) */}
          <div className="w-full lg:w-2/3">
            {/* ИИ-решения для бизнеса */}
            <div className="mb-4">
              <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight mb-3">
                ИИ-решения для бизнеса
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {businessTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/50 rounded-md py-2 px-3 bg-white shadow-sm hover:shadow-md hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 transition-all duration-200 cursor-pointer flex items-center gap-2"
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

          </div>

          {/* Правая колонка — абстрактная инфографика (1/3) */}
          <div className="hidden lg:flex w-full lg:w-1/3 items-center justify-center">
            <svg 
              viewBox="0 0 300 400" 
              className="w-full h-auto max-h-[320px]"
              fill="none"
            >
              {/* Градиентные определения */}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Абстрактные круги */}
              <circle cx="150" cy="120" r="80" fill="url(#grad1)" />
              <circle cx="200" cy="200" r="60" fill="url(#grad2)" />
              <circle cx="100" cy="280" r="70" fill="url(#grad1)" />
              <circle cx="180" cy="320" r="40" fill="url(#grad2)" />
              
              {/* Соединительные линии */}
              <path 
                d="M150 120 Q200 160 200 200" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                strokeOpacity="0.3"
                fill="none"
              />
              <path 
                d="M200 200 Q150 240 100 280" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                strokeOpacity="0.3"
                fill="none"
              />
              <path 
                d="M100 280 Q140 300 180 320" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                strokeOpacity="0.3"
                fill="none"
              />
              
              {/* Узловые точки */}
              <circle cx="150" cy="120" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
              <circle cx="200" cy="200" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
              <circle cx="100" cy="280" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
              <circle cx="180" cy="320" r="4" fill="hsl(var(--primary))" fillOpacity="0.6" />
              
              {/* Дополнительные декоративные элементы */}
              <circle cx="80" cy="100" r="20" fill="url(#grad2)" />
              <circle cx="240" cy="280" r="25" fill="url(#grad1)" />
              <circle cx="60" cy="200" r="15" fill="url(#grad2)" />
              
              {/* Мелкие точки-акценты */}
              <circle cx="120" cy="80" r="2" fill="hsl(var(--primary))" fillOpacity="0.4" />
              <circle cx="220" cy="140" r="2" fill="hsl(var(--primary))" fillOpacity="0.4" />
              <circle cx="70" cy="240" r="2" fill="hsl(var(--primary))" fillOpacity="0.4" />
              <circle cx="250" cy="180" r="2" fill="hsl(var(--primary))" fillOpacity="0.4" />
              <circle cx="130" cy="350" r="2" fill="hsl(var(--primary))" fillOpacity="0.4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;