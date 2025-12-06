import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import alexandraHeadshot from "@/assets/alexandra-headshot.png";
import nPattern from "@/assets/n-pattern.png";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";
import { toast } from "@/hooks/use-toast";

const Hero = () => {
  const tabsContent = {
    owner: {
      title: "Видишь маржу, простои, узкие места в реальном времени",
      description: "Растёшь по выручке, но не по прибыли. Прибыль +23% за год, директор вышел из аврала (80+ человек).",
      button1: "Разобрать один процесс",
      button2: "Сколько я теряю сейчас"
    },
    production: {
      title: "ИИ видит узкие места, прогнозирует закупки, ловит брак",
      description: "Люди вводят данные вручную, простои невидимы. Брак −40%, штрафы −80%, окупилось за 4 месяца.",
      button1: "Разобрать один процесс",
      button2: "Сколько я теряю сейчас"
    },
    sales: {
      title: "Автоответчик 24/7, квалификация 30 сек",
      description: "Заявки теряются, ответ 2 часа. Реакция 2ч → 3мин, конверсия +35%, чек +18%.",
      button1: "Разобрать один процесс",
      button2: "Сколько я теряю сейчас"
    }
  };
  return <section className="relative bg-background pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-28 md:pb-14 lg:pt-32 lg:pb-16 overflow-hidden hero-skeleton">
      {/* N Pattern Background - static, no parallax to reduce reflows */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.01] pointer-events-none" style={{
      backgroundImage: `url(${nPattern})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '120px'
    }} />
      <div className="container mx-auto">
        <Tabs defaultValue="owner" className="w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-6 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in-left">
              {/* Верхний блок с градиентной обводкой */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white shadow-card gradient-border gradient-border-hover">
                <div className="space-y-3">
                  <div className="inline-block">
                    <span className="text-handwriting text-2xl sm:text-3xl">Независимый инженер по ИИ и цифровой архитектуре</span>
                  </div>

                  <p className="text-lg text-text-body leading-relaxed font-semibold">Встраиваю ИИ в вашу текущую цепочку, не переделывая процессы</p>
                  
                  <p className="text-base text-text-body leading-relaxed">
                    Менеджеры не успевают на лиды, первичка вбивается вручную, склад то забит, то пуст, маржу видите 20-го. За 3–6 месяцев: ответ на лида в минуты, первичка автоматом, склад по прогнозу, маржа каждый день. <span className="font-semibold">Гарантирую ROI 200–400% или не беру проект.</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-text-subtle uppercase tracking-wide">Три типа руководителей, у которых это работает быстрее всего</p>
                  <TabsList className="bg-transparent p-0 h-auto gap-2 sm:gap-4 md:gap-6 border-b border-gray-200 flex-wrap justify-start w-full">
                  <TabsTrigger value="owner" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium">
                    Собственник
                  </TabsTrigger>
                  <TabsTrigger value="production" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium">
                    <span className="hidden sm:inline">Директор по производству</span>
                    <span className="sm:hidden">Дир. производства</span>
                  </TabsTrigger>
                  <TabsTrigger value="sales" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium">
                    <span className="hidden sm:inline">Директор по продажам</span>
                    <span className="sm:hidden">Дир. продаж</span>
                  </TabsTrigger>
                </TabsList>
                </div>
              </div>

              <TabsContent value="owner" className="mt-0 transition-all duration-300">
                <div className="space-y-4">
                  <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-tight text-text-heading animate-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>
                    {tabsContent.owner.title}
                  </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    {tabsContent.owner.description}
                  </p>
                  
                   <div className="flex flex-col gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                     <div className="flex flex-col gap-2">
                       <Button className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base" asChild>
                         <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                           {tabsContent.owner.button1}
                         </a>
                       </Button>
                       <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                     </div>
                     <a 
                      href="/checklist" 
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Эта страница находится в разработке",
                          description: "Скоро здесь появится полезная информация",
                        });
                      }}
                      className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium"
                    >
                      {tabsContent.owner.button2}
                    </a>
                  </div>

                  <p className="text-sm text-text-subtle leading-tight mt-8 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
                    36 проектов · 350+ консультаций · окупаемость 3–6 месяцев · ROI 200–400% за год
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="production" className="mt-0 transition-all duration-300">
                <div className="space-y-4">
                   <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-tight text-text-heading animate-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>
                     {tabsContent.production.title}
                   </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    {tabsContent.production.description}
                  </p>
                  
                   <div className="flex flex-col gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                     <div className="flex flex-col gap-2">
                       <Button className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base" asChild>
                         <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                           {tabsContent.production.button1}
                         </a>
                       </Button>
                       <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                     </div>
                    <a 
                      href="/checklist" 
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Эта страница находится в разработке",
                          description: "Скоро здесь появится полезная информация",
                        });
                      }}
                      className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium"
                    >
                      {tabsContent.production.button2}
                    </a>
                  </div>

                  <p className="text-sm text-text-subtle leading-tight mt-8 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
                    36 проектов · 350+ консультаций · окупаемость 3–6 месяцев · ROI 200–400% за год
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="sales" className="mt-0 transition-all duration-300">
                <div className="space-y-4">
                   <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-tight text-text-heading animate-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>
                     {tabsContent.sales.title}
                   </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                    {tabsContent.sales.description}
                  </p>
                  
                   <div className="flex flex-col gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                     <div className="flex flex-col gap-2">
                       <Button className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base" asChild>
                         <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                           {tabsContent.sales.button1}
                         </a>
                       </Button>
                       <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                     </div>
                    <a 
                      href="/checklist" 
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Эта страница находится в разработке",
                          description: "Скоро здесь появится полезная информация",
                        });
                      }}
                      className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium"
                    >
                      {tabsContent.sales.button2}
                    </a>
                  </div>

                  <p className="text-sm text-text-subtle leading-tight mt-8 animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
                    36 проектов · 350+ консультаций · окупаемость 3–6 месяцев · ROI 200–400% за год
                  </p>
                </div>
              </TabsContent>
            </div>
          
            {/* Правая колонка с фото */}
            <div className="lg:col-span-5 flex items-center justify-center animate-fade-in-right">
              <img 
                src={alexandraHeadshot} 
                alt="Александра Моисеева — независимый инженер по ИИ и цифровой архитектуре"
                width="522"
                height="630"
                className="w-full max-w-xl lg:max-w-2xl h-auto object-contain"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </Tabs>
      </div>
    </section>;
};
export default Hero;
