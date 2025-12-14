import { useState } from "react";
import { ShoppingCart, Users, FileText, BookOpen, TrendingUp, BarChart3, FileCheck, Mic, PieChart, LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const businessTiles: TileData[] = [{
    id: "sales",
    title: "Продажи и заявки",
    icon: ShoppingCart,
    hoverText: "Чтобы заявки не терялись и клиент получал ответ сразу — даже ночью и в выходные.",
    expandedTitle: "Автоматизация продаж и заявок",
    expandedDescription: "Здесь будет подробное описание услуги по автоматизации продаж и обработки заявок.",
    buttonText: "Заказать автоматизацию продаж и обработки заявок с помощью ИИ"
  }, {
    id: "leads",
    title: "Контроль лидогенерации",
    icon: Users,
    hoverText: "Чтобы менеджеры не сливали лиды: видно, кто, когда и почему не закрыл сделку.",
    expandedTitle: "Контроль и квалификация лидов",
    expandedDescription: "Здесь будет подробное описание услуги по контролю и квалификации лидов.",
    buttonText: "Заказать контроль лидогенерации с помощью ИИ"
  }, {
    id: "docs",
    title: "Документы и первичка",
    icon: FileText,
    hoverText: "Чтобы убрать ручной ввод счетов, актов и накладных и снизить ошибки из-за человеческого фактора.",
    expandedTitle: "Автоматизация документооборота",
    expandedDescription: "Здесь будет подробное описание услуги по автоматизации документооборота.",
    buttonText: "Заказать автоматизацию документов и первички с помощью ИИ"
  }, {
    id: "knowledge",
    title: "База знаний",
    icon: BookOpen,
    hoverText: "Чтобы сотрудники получали ответы по регламентам и инструкциям без постоянных вопросов к руководству.",
    expandedTitle: "ИИ-база знаний",
    expandedDescription: "Здесь будет подробное описание услуги по созданию ИИ-базы знаний.",
    buttonText: "Заказать создание базы знаний для сотрудников с помощью ИИ"
  }, {
    id: "analytics",
    title: "Аналитика и маржа",
    icon: BarChart3,
    hoverText: "Чтобы понимать реальную прибыль, причины просадок и эффективность бизнеса без ожидания отчетов.",
    expandedTitle: "ИИ-аналитика",
    expandedDescription: "Здесь будет подробное описание услуги по ИИ-аналитике и прогнозированию.",
    buttonText: "Заказать ИИ-аналитику и контроль маржинальности бизнеса"
  }, {
    id: "forecast",
    title: "Прогнозирование спроса и закупок",
    icon: TrendingUp,
    hoverText: "Чтобы не морозить деньги в складе и не терять продажи из-за дефицита товара.",
    expandedTitle: "Прогнозирование спроса",
    expandedDescription: "Здесь будет подробное описание услуги по прогнозированию спроса и закупок.",
    buttonText: "Заказать прогнозирование спроса и закупок с помощью ИИ"
  }];
  const leaderTiles: TileData[] = [{
    id: "tender",
    title: "Автоматическая подготовка тендерной документации",
    icon: FileCheck,
    hoverText: "Чтобы не пропускать выгодные закупки и быстро понимать, где есть маржа и смысл участвовать.",
    expandedTitle: "Автоматизация тендерной документации",
    expandedDescription: "Здесь будет подробное описание услуги по автоматизации подготовки тендеров.",
    buttonText: "Заказать автоматизацию подготовки тендерной документации с помощью ИИ"
  }, {
    id: "voice",
    title: "Личный голосовой помощник руководителя",
    icon: Mic,
    hoverText: "Чтобы отвечать партнёрам и сотрудникам голосом, а тексты и письма формировались автоматически.",
    expandedTitle: "Голосовой ИИ-ассистент",
    expandedDescription: "Здесь будет подробное описание услуги голосового помощника для руководителя.",
    buttonText: "Заказать личного ИИ-помощника для руководителя"
  }, {
    id: "dashboard",
    title: "Дашборд директора",
    icon: PieChart,
    hoverText: "Чтобы в любой момент видеть ключевые цифры, долги и показатели без звонков и Excel.",
    expandedTitle: "Управленческий дашборд",
    expandedDescription: "Здесь будет подробное описание услуги по созданию управленческого дашборда.",
    buttonText: "Заказать дашборд руководителя с аналитикой на базе ИИ"
  }];
  const allTiles = [...businessTiles, ...leaderTiles];
  const selectedTileData = allTiles.find(tile => tile.id === selectedTile);
  const handleTileClick = (id: string) => {
    setSelectedTile(prev => prev === id ? null : id);
  };
  const handleButtonClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const TileComponent = ({
    tile
  }: {
    tile: TileData;
  }) => {
    const Icon = tile.icon;
    const isSelected = selectedTile === tile.id;
    const [showTooltip, setShowTooltip] = useState(false);
    
    const handleInteraction = () => {
      handleTileClick(tile.id);
      // On mobile, show tooltip briefly on tap
      if ('ontouchstart' in window) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2500);
      }
    };
    
    return <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
        <TooltipTrigger asChild>
          <div 
            onClick={handleInteraction}
            onMouseEnter={() => !('ontouchstart' in window) && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`
              bg-white border rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 
              transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3 
              min-h-[56px] sm:min-h-[64px] shadow-card active:scale-[0.98] sm:hover:shadow-hover sm:hover:scale-[1.02]
              touch-manipulation
              ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-hover' : 'border-border/40 sm:hover:border-primary/50'}
            `}>
            <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary shrink-0" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
              {tile.title}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[280px] text-sm bg-foreground text-background px-4 py-3 z-50">
          {tile.hoverText}
        </TooltipContent>
      </Tooltip>;
  };
  return <TooltipProvider>
      <section className="bg-background pt-24 sm:pt-28 pb-8 sm:pb-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* 12-колоночная сетка с двумя колонками */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            
            {/* Левая колонка — заголовок + плитки (8 колонок) */}
            <div className="col-span-12 lg:col-span-8">
              {/* Заголовок H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">Решения для бизнеса и руководителей
              <br />​
              </h1>
              
              {/* Подзаголовок */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Автоматизация продаж, документов, контроля и аналитики<br className="hidden sm:block" />
                без переделки системы и остановки операционки.
              </p>

              {/* Голубой контейнер с плитками */}
              <div className="rounded-xl bg-[hsl(var(--primary-light))] p-6 sm:p-8">
                {/* ИИ-решения для бизнеса */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {businessTiles.map(tile => <TileComponent key={tile.id} tile={tile} />)}
                  </div>
                </div>

                {/* ИИ-решения для руководителей */}
                <div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {leaderTiles.map(tile => <TileComponent key={tile.id} tile={tile} />)}
                  </div>
                </div>
              </div>

              {/* Белая карточка описания */}
              <Collapsible open={!!selectedTile}>
                <CollapsibleContent className="animate-accordion-down">
                  {selectedTileData && <div className="mt-4 bg-white rounded-xl shadow-md p-6 sm:p-8 border border-border/30">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {selectedTileData.expandedTitle}
                      </h3>
                      <p className="text-base text-muted-foreground mb-5 leading-relaxed">
                        {selectedTileData.expandedDescription}
                      </p>
                      <Button onClick={handleButtonClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        {selectedTileData.buttonText}
                      </Button>
                    </div>}
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Правая колонка — крупные слова на всю высоту (4 колонки) */}
            <div className="hidden lg:flex col-span-4 flex-col justify-center items-end relative select-none">
              <div className="flex flex-col items-end gap-6">
                <span className="text-8xl xl:text-9xl 2xl:[font-size:10rem] font-black uppercase text-foreground/5 leading-none tracking-tight">
                  КОНТРОЛЬ
                </span>
                
                <div className="relative">
                  <span className="text-8xl xl:text-9xl 2xl:[font-size:10rem] font-black uppercase text-foreground/5 leading-none tracking-tight">
                    ДАННЫЕ
                  </span>
                  {/* Рукописный акцент */}
                  <span className="absolute -bottom-1 right-0 text-handwriting text-2xl xl:text-3xl text-primary">
                    под контролем
                  </span>
                </div>
                
                <span className="text-8xl xl:text-9xl 2xl:[font-size:10rem] font-black uppercase text-foreground/5 leading-none tracking-tight">
                  ДЕНЬГИ
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </TooltipProvider>;
};
export default Hero;