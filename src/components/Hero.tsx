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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div 
            onClick={() => handleTileClick(tile.id)}
            className={`
              bg-white border rounded-lg py-3 px-4 
              transition-all duration-300 cursor-pointer flex items-center gap-3 
              min-h-[64px] shadow-card hover:shadow-hover hover:scale-[1.02]
              ${isSelected 
                ? 'border-primary ring-2 ring-primary/20 shadow-hover' 
                : 'border-border/40 hover:border-primary/50'
              }
            `}
          >
            <Icon className="w-10 h-10 text-primary shrink-0" strokeWidth={1.5} />
            <span className="text-sm font-medium text-foreground leading-snug">
              {tile.title}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-[280px] text-sm bg-foreground text-background px-4 py-3"
        >
          {tile.hoverText}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <section className="bg-background pt-24 sm:pt-28 pb-8 sm:pb-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* 12-колоночная сетка */}
          <div className="grid grid-cols-12 gap-4">
            {/* Голубой контейнер 8/12 от левого края */}
            <div className="col-span-12 lg:col-span-8 rounded-xl bg-[hsl(var(--primary-light))] p-6 sm:p-8">
              {/* ИИ-решения для бизнеса */}
              <div className="mb-6">
                <p className="text-base font-medium text-foreground/80 mb-4">
                  ИИ-решения для бизнеса
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {businessTiles.map((tile) => (
                    <TileComponent key={tile.id} tile={tile} />
                  ))}
                </div>
              </div>

              {/* ИИ-решения для руководителей */}
              <div>
                <p className="text-base font-medium text-foreground/80 mb-4">
                  ИИ-решения для руководителей
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leaderTiles.map((tile) => (
                    <TileComponent key={tile.id} tile={tile} />
                  ))}
                </div>
              </div>
            </div>

            {/* Белая карточка описания - вынесена за пределы голубого контейнера */}
            <Collapsible open={!!selectedTile} className="col-span-12 lg:col-span-8">
              <CollapsibleContent className="animate-accordion-down">
                {selectedTileData && (
                  <div className="mt-4 bg-white rounded-xl shadow-md p-6 sm:p-8 border border-border/30">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {selectedTileData.expandedTitle}
                    </h3>
                    <p className="text-base text-muted-foreground mb-5 leading-relaxed">
                      {selectedTileData.expandedDescription}
                    </p>
                    <Button 
                      onClick={handleButtonClick}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
    </TooltipProvider>
  );
};

export default Hero;
