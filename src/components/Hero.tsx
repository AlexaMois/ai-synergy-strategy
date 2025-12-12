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
              viewBox="0 0 280 220" 
              className="w-full h-auto max-w-[260px]"
              style={{ filter: 'drop-shadow(0 4px 16px hsl(var(--primary) / 0.25))' }}
            >
              <defs>
                <linearGradient id="brushGradient1" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="brushGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              
              {/* Основной эллиптический мазок */}
              <path
                d="M50 130 Q30 80 80 50 Q140 15 200 40 Q260 70 240 120 Q220 170 160 180 Q100 190 60 160 Q40 145 50 130"
                fill="none"
                stroke="url(#brushGradient1)"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-brush-stroke"
              />
              
              {/* Внутренний слой */}
              <path
                d="M70 125 Q55 90 95 65 Q145 35 190 55 Q235 75 220 115 Q205 155 155 165 Q105 175 75 150 Q60 140 70 125"
                fill="none"
                stroke="url(#brushGradient2)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-brush-stroke-delayed"
              />
              
              {/* Динамичный хвост мазка */}
              <path
                d="M45 145 Q25 160 15 180 Q10 195 20 200"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeOpacity="0.6"
                className="animate-brush-stroke"
              />
              
              {/* Брызги/текстура */}
              <circle cx="35" cy="175" r="4" fill="hsl(var(--primary))" fillOpacity="0.5" className="animate-brush-stroke-delayed" />
              <circle cx="25" cy="190" r="3" fill="hsl(var(--primary))" fillOpacity="0.4" className="animate-brush-stroke-delayed" />
              <circle cx="245" cy="85" r="3" fill="hsl(var(--primary))" fillOpacity="0.4" className="animate-brush-stroke-delayed" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
