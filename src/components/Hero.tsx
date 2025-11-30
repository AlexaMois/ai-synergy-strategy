import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizedImage from "@/components/OptimizedImage";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import alexandraPortrait from "@/assets/alexandra-portrait.jpg";
import nPattern from "@/assets/n-pattern.png";
import brushAccent from "@/assets/brush-accent-1.png";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";
const Hero = () => {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({
    threshold: 0.2
  });
  const parallaxOffset = useParallax(0.3);
  const tabsContent = {
    ceo: {
      title: "Как внедрять технологии, не нарушая устойчивость бизнеса",
      description: "Получаете честную оценку процессов, рисков и экономического эффекта: что даст результат, что не окупится, и в какой последовательности двигаться.",
      button1: "Пройти экспресс-аудит процессов",
      button2: 'Скачать чек-лист "10 вопросов перед внедрением ИИ"'
    },
    operations: {
      title: "Как убрать узкие места и повысить скорость операционки",
      description: "Выявляю дублирование, задержки и точки просадки. Показываю, какие решения действительно ускорят процессы и сократят нагрузку на команду.",
      button1: "Пройти экспресс-аудит процессов",
      button2: 'Скачать чек-лист "10 вопросов перед внедрением ИИ"'
    },
    it: {
      title: "Как внедрять ИИ без техдолга и архитектурных рисков",
      description: "Даю независимую оценку интеграций, безопасности и совместимости: какие ИИ-решения впишутся в вашу инфраструктуру и будут устойчивыми в поддержке.",
      button1: "Пройти экспресс-аудит процессов",
      button2: 'Скачать чек-лист "10 вопросов перед внедрением ИИ"'
    }
  };
  return <section ref={ref} className="relative bg-background py-10 md:py-16 lg:py-20 overflow-hidden">
      {/* N Pattern Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.01] pointer-events-none transition-transform duration-100 ease-out" style={{
      backgroundImage: `url(${nPattern})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '120px',
      transform: `translateY(${parallaxOffset * 0.1}px)`
    }} />
      {/* Brush Accent */}
      <OptimizedImage src={brushAccent} alt="" className={`absolute top-1/4 right-1/4 w-80 opacity-20 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`} style={{
      transform: `translateY(${-parallaxOffset * 0.5}px) rotate(-15deg)`,
      animationDelay: '0.2s'
    }} />
      <div className="container mx-auto">
        <Tabs defaultValue="ceo" className="w-full">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className={`lg:col-span-7 space-y-6 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              {/* Верхний блок с градиентной обводкой */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-card gradient-border gradient-border-hover">
                <div className="space-y-3">
                  <div className="inline-block">
                    <span className="text-handwriting text-2xl sm:text-3xl">Независимый стратег и инженер ИИ</span>
                  </div>

                  <p className="text-lg text-text-body leading-relaxed font-semibold">Помогаю компаниям выбирать ИИ-решения, которые дают измеримый эффект и отсекаю те, что превращаются в расходы и перегружают процессы</p>
                  
                  <p className="text-lg text-text-body leading-relaxed">
                    Формирую честную картину процессов: где ROI, где ускорение, где имитация внедрения
                  </p>
                </div>
              </div>

              {/* Визуальная пауза */}
              <div className="h-2"></div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs text-text-subtle uppercase tracking-wide">Кому это особенно важно</p>
                  <TabsList className="bg-transparent p-0 h-auto gap-2 sm:gap-4 md:gap-6 border-b border-gray-200 flex-wrap justify-start w-full">
                  <TabsTrigger value="ceo" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium">
                    Я — CEO
                  </TabsTrigger>
                  <TabsTrigger value="operations" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium">
                    <span className="hidden sm:inline">Я — операционный директор</span>
                    <span className="sm:hidden">Я — Опер. директор</span>
                  </TabsTrigger>
                  <TabsTrigger value="it" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium">
                    Я — руководитель отдела
                  </TabsTrigger>
                </TabsList>
                </div>
              </div>

              <TabsContent value="ceo" className="mt-0 data-[state=active]:animate-fade-in transition-all duration-300">
                <div className="space-y-4">
                  <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-tight text-text-heading">
                    Как внедрять технологии так, <span className="font-semibold">чтобы бизнес оставался устойчивым</span>
                  </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl">
                    Получите независимую оценку процессов, рисков и экономики: какие решения дадут эффект, во что не стоит вкладываться и в какой последовательности двигаться
                  </p>
                  
                   <div className="flex flex-col gap-4 pt-2">
                     <div className="flex flex-col gap-2">
                       <Button className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base" asChild>
                         <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                           {tabsContent.ceo.button1}
                         </a>
                       </Button>
                       <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                     </div>
                    <a href="/checklist" className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium">
                      {tabsContent.ceo.button2}
                    </a>
                  </div>

                  <p className="text-sm text-text-subtle leading-tight mt-8">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="mt-0 data-[state=active]:animate-fade-in transition-all duration-300">
                <div className="space-y-4">
                   <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-tight text-text-heading">
                     Как внедрять технологии так, <span className="font-semibold">чтобы бизнес оставался устойчивым</span>
                   </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl">
                    Получите независимую оценку процессов, рисков и экономики: какие решения дадут эффект, во что не стоит вкладываться и в какой последовательности двигаться
                  </p>
                  
                   <div className="flex flex-col gap-4 pt-2">
                     <div className="flex flex-col gap-2">
                       <Button className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base" asChild>
                         <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                           {tabsContent.operations.button1}
                         </a>
                       </Button>
                       <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                     </div>
                    <a href="/checklist" className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium">
                      {tabsContent.operations.button2}
                    </a>
                  </div>

                  <p className="text-sm text-text-subtle leading-tight mt-8">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="it" className="mt-0 data-[state=active]:animate-fade-in transition-all duration-300">
                <div className="space-y-4">
                   <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-tight text-text-heading">
                     Как внедрять технологии так, <span className="font-semibold">чтобы бизнес оставался устойчивым</span>
                   </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl">
                    Получите независимую оценку процессов, рисков и экономики: какие решения дадут эффект, во что не стоит вкладываться и в какой последовательности двигаться
                  </p>
                  
                   <div className="flex flex-col gap-4 pt-2">
                     <div className="flex flex-col gap-2">
                       <Button className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base" asChild>
                         <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                           {tabsContent.it.button1}
                         </a>
                       </Button>
                       <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                     </div>
                    <a href="/checklist" className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium">
                      {tabsContent.it.button2}
                    </a>
                  </div>

                  <p className="text-sm text-text-subtle leading-tight mt-8">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>
            </div>
          
            <div className={`lg:col-span-5 relative mb-8 lg:mb-0 flex justify-center lg:justify-end ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div className="w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[760px] h-[800px] sm:h-[900px] lg:h-[1000px] overflow-hidden">
                <OptimizedImage 
                  src={alexandraPortrait} 
                  alt="Александра Моисеева - AI консультант" 
                  className="w-full h-full object-cover object-top" 
                  priority 
                  responsive
                  sizes="(max-width: 640px) 560px, (max-width: 1024px) 640px, 760px"
                />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </section>;
};
export default Hero;