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
import ImpulseVisual from "./ImpulseVisual";

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
        {/* 12-колоночная сетка */}
        <div className="grid grid-cols-12 gap-4">
          {/* Контейнер 8/12 от левого края */}
          <div className="col-span-12 lg:col-span-8 border border-border/50 rounded-lg bg-primary/5 p-4 sm:p-6 shadow-sm">
            {/* Двухколоночный layout внутри */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Левая колонка — плитки (65-70%) */}
              <div className="flex-1 lg:w-[65%]">
                {/* ИИ-решения для бизнеса */}
                <div className="mb-4">
                  <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight mb-3">
                    ИИ-решения для бизнеса
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {businessTiles.map((tile, index) => {
                      const Icon = tile.icon;
                      return (
                        <div 
                          key={index} 
                          className="border border-border/60 rounded bg-background py-3 px-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-start gap-2 min-h-[64px]"
                        >
                          <Icon className="w-6 h-6 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                            {tile.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ИИ-решения для руководителей */}
                <div>
                  <p className="text-sm sm:text-base font-medium text-muted-foreground leading-tight mb-3">
                    ИИ-решения для руководителей
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {leaderTiles.map((tile, index) => {
                      const Icon = tile.icon;
                      return (
                        <div 
                          key={index} 
                          className="border border-border/60 rounded bg-background py-3 px-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer flex items-start gap-2 min-h-[64px]"
                        >
                          <Icon className="w-6 h-6 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                            {tile.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Правая колонка — визуал «Импульс» (30-35%) */}
              <div className="hidden lg:flex lg:w-[35%] items-center justify-center">
                <ImpulseVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
