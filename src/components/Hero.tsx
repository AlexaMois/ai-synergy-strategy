import { useState } from "react";
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
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface TileData {
  id: string;
  title: string;
  icon: LucideIcon;
  hoverText: string;
  expandedTitle: string;
  expandedDescription: string;
  buttonText: string;
}

const Hero = () => {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  const businessTiles: TileData[] = [
    { 
      id: "sales",
      title: "Продажи и заявки", 
      icon: ShoppingCart,
      hoverText: "Автоматизация воронки и обработки лидов",
      expandedTitle: "Автоматизация продаж и заявок",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации продаж и обработки заявок.",
      buttonText: "Заказать"
    },
    { 
      id: "leads",
      title: "Контроль лидов", 
      icon: Users,
      hoverText: "Отслеживание и квалификация клиентов",
      expandedTitle: "Контроль и квалификация лидов",
      expandedDescription: "Здесь будет подробное описание услуги по контролю и квалификации лидов.",
      buttonText: "Заказать"
    },
    { 
      id: "docs",
      title: "Документы и первичка", 
      icon: FileText,
      hoverText: "Генерация и проверка документов",
      expandedTitle: "Автоматизация документооборота",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации документооборота.",
      buttonText: "Заказать"
    },
    { 
      id: "production",
      title: "Производство и объекты", 
      icon: Factory,
      hoverText: "Мониторинг и оптимизация процессов",
      expandedTitle: "ИИ для производства",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации производства.",
      buttonText: "Заказать"
    },
    { 
      id: "support",
      title: "Поддержка клиентов", 
      icon: Headphones,
      hoverText: "Чат-боты и автоответы",
      expandedTitle: "Автоматизация поддержки",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации клиентской поддержки.",
      buttonText: "Заказать"
    },
    { 
      id: "analytics",
      title: "Аналитика и маржа", 
      icon: BarChart3,
      hoverText: "Дашборды и прогнозы",
      expandedTitle: "ИИ-аналитика",
      expandedDescription: "Здесь будет подробное описание услуги по ИИ-аналитике и прогнозированию.",
      buttonText: "Заказать"
    },
  ];

  const leaderTiles: TileData[] = [
    { 
      id: "tender",
      title: "Автоматическая подготовка тендерной документации", 
      icon: FileCheck,
      hoverText: "Сбор и оформление документов для тендеров",
      expandedTitle: "Автоматизация тендерной документации",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации подготовки тендеров.",
      buttonText: "Заказать"
    },
    { 
      id: "voice",
      title: "Личный голосовой помощник руководителя", 
      icon: Mic,
      hoverText: "Голосовое управление задачами и календарём",
      expandedTitle: "Голосовой ИИ-ассистент",
      expandedDescription: "Здесь будет подробное описание услуги голосового помощника для руководителя.",
      buttonText: "Заказать"
    },
    { 
      id: "dashboard",
      title: "Дашборд директора", 
      icon: PieChart,
      hoverText: "Ключевые метрики бизнеса в реальном времени",
      expandedTitle: "Управленческий дашборд",
      expandedDescription: "Здесь будет подробное описание услуги по созданию управленческого дашборда.",
      buttonText: "Заказать"
    },
  ];

  const allTiles = [...businessTiles, ...leaderTiles];
  const selectedTileData = allTiles.find(tile => tile.id === selectedTile);

  const handleTileClick = (id: string) => {
    setSelectedTile(prev => prev === id ? null : id);
  };

  const handleButtonClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const TileComponent = ({ tile }: { tile: TileData }) => {
    const Icon = tile.icon;
    const isSelected = selectedTile === tile.id;
    
    return (
      <div 
        onClick={() => handleTileClick(tile.id)}
        className={`
          group relative border rounded bg-background py-2 px-2.5 
          transition-all duration-300 cursor-pointer flex items-center gap-2 
          min-h-[48px]
          ${isSelected 
            ? 'border-primary bg-primary/10 shadow-md scale-[1.02]' 
            : 'border-border/80 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm hover:scale-[1.02]'
          }
        `}
      >
        <Icon className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-medium text-foreground leading-tight">
            {tile.title}
          </span>
          <span className="text-[10px] text-muted-foreground leading-snug mt-0.5 max-h-0 group-hover:max-h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out line-clamp-2 overflow-hidden">
            {tile.hoverText}
          </span>
        </div>
      </div>
    );
  };

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
                {businessTiles.map((tile) => (
                  <TileComponent key={tile.id} tile={tile} />
                ))}
              </div>
            </div>

            {/* ИИ-решения для руководителей */}
            <div>
              <p className="text-sm font-medium text-muted-foreground leading-tight mb-2.5">
                ИИ-решения для руководителей
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {leaderTiles.map((tile) => (
                  <TileComponent key={tile.id} tile={tile} />
                ))}
              </div>
            </div>

            {/* Раскрывающийся блок */}
            <Collapsible open={!!selectedTile}>
              <CollapsibleContent className="animate-accordion-down">
                {selectedTileData && (
                  <div className="mt-4 p-4 sm:p-5 bg-background rounded-lg border border-border shadow-sm">
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {selectedTileData.expandedTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {selectedTileData.expandedDescription}
                    </p>
                    <Button 
                      size="sm"
                      onClick={handleButtonClick}
                      className="bg-gradient-to-r from-primary-light to-primary-dark hover:from-primary hover:to-primary-dark text-white"
                    >
                      {selectedTileData.buttonText}
                    </Button>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
