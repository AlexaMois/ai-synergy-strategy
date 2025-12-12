import { useState } from "react";
import { 
  ShoppingCart, 
  Users, 
  FileText, 
  BookOpen, 
  TrendingUp, 
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
      hoverText: "Чтобы заявки не терялись и клиент получал ответ сразу — даже ночью и в выходные.",
      expandedTitle: "Автоматизация продаж и заявок",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации продаж и обработки заявок.",
      buttonText: "Заказать"
    },
    { 
      id: "leads",
      title: "Контроль лидогенерации", 
      icon: Users,
      hoverText: "Чтобы менеджеры не сливали лиды: видно, кто, когда и почему не закрыл сделку.",
      expandedTitle: "Контроль и квалификация лидов",
      expandedDescription: "Здесь будет подробное описание услуги по контролю и квалификации лидов.",
      buttonText: "Заказать"
    },
    { 
      id: "docs",
      title: "Документы и первичка", 
      icon: FileText,
      hoverText: "Чтобы убрать ручной ввод счетов, актов и накладных и снизить ошибки из-за человеческого фактора.",
      expandedTitle: "Автоматизация документооборота",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации документооборота.",
      buttonText: "Заказать"
    },
    { 
      id: "knowledge",
      title: "База знаний", 
      icon: BookOpen,
      hoverText: "Чтобы сотрудники получали ответы по регламентам и инструкциям без постоянных вопросов к руководству.",
      expandedTitle: "ИИ-база знаний",
      expandedDescription: "Здесь будет подробное описание услуги по созданию ИИ-базы знаний.",
      buttonText: "Заказать"
    },
    { 
      id: "analytics",
      title: "Аналитика и маржа", 
      icon: BarChart3,
      hoverText: "Чтобы понимать реальную прибыль, причины просадок и эффективность бизнеса без ожидания отчетов.",
      expandedTitle: "ИИ-аналитика",
      expandedDescription: "Здесь будет подробное описание услуги по ИИ-аналитике и прогнозированию.",
      buttonText: "Заказать"
    },
    { 
      id: "forecast",
      title: "Прогнозирование спроса и закупок", 
      icon: TrendingUp,
      hoverText: "Чтобы не морозить деньги в складе и не терять продажи из-за дефицита товара.",
      expandedTitle: "Прогнозирование спроса",
      expandedDescription: "Здесь будет подробное описание услуги по прогнозированию спроса и закупок.",
      buttonText: "Заказать"
    },
  ];

  const leaderTiles: TileData[] = [
    { 
      id: "tender",
      title: "Автоматическая подготовка тендерной документации", 
      icon: FileCheck,
      hoverText: "Чтобы не пропускать выгодные закупки и быстро понимать, где есть маржа и смысл участвовать.",
      expandedTitle: "Автоматизация тендерной документации",
      expandedDescription: "Здесь будет подробное описание услуги по автоматизации подготовки тендеров.",
      buttonText: "Заказать"
    },
    { 
      id: "voice",
      title: "Личный голосовой помощник руководителя", 
      icon: Mic,
      hoverText: "Чтобы отвечать партнёрам и сотрудникам голосом, а тексты и письма формировались автоматически.",
      expandedTitle: "Голосовой ИИ-ассистент",
      expandedDescription: "Здесь будет подробное описание услуги голосового помощника для руководителя.",
      buttonText: "Заказать"
    },
    { 
      id: "dashboard",
      title: "Дашборд директора", 
      icon: PieChart,
      hoverText: "Чтобы в любой момент видеть ключевые цифры, долги и показатели без звонков и Excel.",
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

          </div>

          {/* Раскрывающийся блок - вынесен за пределы серого контейнера */}
          <Collapsible open={!!selectedTile} className="col-span-12 lg:col-span-8">
            <CollapsibleContent className="animate-accordion-down">
              {selectedTileData && (
                <div className="mt-4 pt-2">
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
    </section>
  );
};

export default Hero;
