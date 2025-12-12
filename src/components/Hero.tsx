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
          <div className="col-span-12 lg:col-span-8 border border-border rounded-lg bg-gray-100 p-3 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            {/* ИИ-решения для бизнеса */}
            <div className="mb-3">
              <p className="text-sm font-medium text-muted-foreground leading-tight mb-2.5">
                ИИ-решения для бизнеса
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {businessTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/80 rounded bg-background py-2 px-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-center gap-2 h-[48px]"
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
              <p className="text-sm font-medium text-muted-foreground leading-tight mb-2.5">
                ИИ-решения для руководителей
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {leaderTiles.map((tile, index) => {
                  const Icon = tile.icon;
                  return (
                    <div 
                      key={index} 
                      className="border border-border/80 rounded bg-background py-2 px-2.5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-center gap-2 h-[48px]"
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
