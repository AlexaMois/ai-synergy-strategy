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
    <section className="bg-background pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* 12-колоночная сетка */}
        <div className="grid grid-cols-12 gap-4">
          {/* Контейнер 8/12 от левого края */}
          <div className="col-span-12 lg:col-span-8 border border-border/50 rounded-lg bg-primary/5 p-4 sm:p-6 shadow-sm">
            {/* ИИ-решения для бизнеса */}
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground leading-tight mb-3">
                ИИ-решения для бизнеса
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {businessTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/60 rounded bg-background py-3 px-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-center gap-2.5 h-[56px]"
                    >
                      <Icon className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-foreground leading-tight">
                        {tile.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ИИ-решения для руководителей */}
            <div>
              <p className="text-sm font-medium text-muted-foreground leading-tight mb-3">
                ИИ-решения для руководителей
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {leaderTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/60 rounded bg-background py-3 px-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-center gap-2.5 h-[56px]"
                    >
                      <Icon className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-foreground leading-tight">
                        {tile.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
