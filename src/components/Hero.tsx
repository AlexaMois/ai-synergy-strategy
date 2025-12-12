import { 
  ShoppingCart, 
  Users, 
  FileText, 
  Factory, 
  Headphones, 
  BarChart3, 
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
    <section className="bg-background pt-24 sm:pt-28 pb-10 sm:pb-14">
      <div className="container mx-auto px-4 sm:px-6">
        {/* 12-колоночная сетка */}
        <div className="grid grid-cols-12 gap-4">
          {/* Контейнер 8/12 от левого края */}
          <div className="col-span-12 lg:col-span-8 border border-border/50 rounded-lg bg-primary/5 p-6 sm:p-8 shadow-sm">
            {/* ИИ-решения для бизнеса */}
            <div className="mb-6">
              <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight mb-4">
                ИИ-решения для бизнеса
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {businessTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/60 rounded bg-background py-4 px-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-start gap-3 min-h-[72px]"
                    >
                      <Icon className="w-7 h-7 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-foreground leading-tight">
                        {tile.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ИИ-решения для руководителей */}
            <div>
              <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight mb-4">
                ИИ-решения для руководителей
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {leaderTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/60 rounded bg-background py-4 px-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-start gap-3 min-h-[72px]"
                    >
                      <Icon className="w-7 h-7 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-foreground leading-tight">
                        {tile.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Анимированный мазок кисти справа */}
          <div className="hidden lg:flex col-span-4 items-center justify-center">
            <svg 
              viewBox="0 0 200 300" 
              className="w-full h-auto max-w-[180px] opacity-60"
              style={{ filter: 'drop-shadow(0 4px 12px hsl(var(--primary) / 0.2))' }}
            >
              <defs>
                <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(var(--primary-light))" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M30 280 Q60 250 50 200 Q40 150 80 120 Q120 90 100 50 Q90 20 120 10"
                fill="none"
                stroke="url(#brushGradient)"
                strokeWidth="35"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-brush-stroke"
              />
              <path
                d="M50 260 Q75 230 70 190 Q65 150 95 125 Q125 100 110 65 Q100 40 125 25"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="15"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-brush-stroke-delayed"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
