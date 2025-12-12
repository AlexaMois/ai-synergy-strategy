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
          <div className="hidden lg:flex col-span-4 items-center justify-center p-6 lg:p-8">
            <div className="relative w-full flex items-center justify-center">
              <svg 
                viewBox="0 0 400 180" 
                className="w-full h-auto animate-brush-draw"
                preserveAspectRatio="xMidYMid meet"
                style={{ 
                  filter: 'drop-shadow(0 6px 20px hsl(var(--primary) / 0.25))',
                  maxHeight: '200px'
                }}
              >
                <defs>
                  <linearGradient id="brushGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#49BED8" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#49BED8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#49BED8" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
                
                {/* Широкий горизонтальный мазок кисти */}
                <path 
                  d="M10 95 
                     Q40 45 100 70 
                     T180 55 
                     T270 65 
                     T350 80 
                     Q390 90 385 100
                     Q370 140 300 130 
                     T180 135 
                     T80 125 
                     T20 110 
                     Q5 105 10 95 Z"
                  fill="url(#brushGradient)"
                />
                
                {/* Дополнительные штрихи для текстуры */}
                <path 
                  d="M50 85 Q120 65 200 75 T340 70"
                  fill="none"
                  stroke="#49BED8"
                  strokeWidth="8"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
