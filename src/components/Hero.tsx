import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizedImage from "@/components/OptimizedImage";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import alexandraPortrait from "@/assets/alexandra-portrait-nobg.png";
import nPattern from "@/assets/n-pattern.png";
import brushAccent from "@/assets/brush-accent-1.png";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { AVAILABLE_SLOTS_THIS_WEEK } from "@/config/availability";

const Hero = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
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

  return (
    <section ref={ref} className="relative bg-background pt-16 pb-20 overflow-hidden">
      {/* N Pattern Background */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.01] pointer-events-none transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url(${nPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px',
          transform: `translateY(${parallaxOffset * 0.1}px)`
        }}
      />
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute top-1/4 right-1/4 w-80 opacity-20 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.5}px) rotate(-15deg)`,
          animationDelay: '0.2s'
        }}
      />
      <div className="container mx-auto">
        <Tabs defaultValue="ceo" className="w-full">
          <div className="grid-12 items-center">
            <div className={`col-span-6 space-y-6 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm font-medium tracking-wide text-accent">
                    независимый стратег инженер ИИ
                  </span>
                </div>

                <p className="text-lg text-text-body leading-relaxed font-semibold">
                  Помогаю компаниям понять, какие ИИ-решения дают реальную ценность, а какие создают издержки и расфокусировку.
                </p>
                
                <p className="text-lg text-text-body leading-relaxed mb-6">
                  Формирую честную картину процессов: где ROI, где ускорение, где «имитация внедрения».
                </p>

                <TabsList className="bg-transparent p-0 h-auto mb-6 gap-4 md:gap-6 border-b border-gray-200 flex-wrap justify-start w-full">
                  <TabsTrigger 
                    value="ceo" 
                    className="text-sm px-3 md:px-4 py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium"
                  >
                    Я — CEO
                  </TabsTrigger>
                  <TabsTrigger 
                    value="operations" 
                    className="text-sm px-3 md:px-4 py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium"
                  >
                    <span className="hidden sm:inline">Я — операционный директор</span>
                    <span className="sm:hidden">Я — Опер. директор</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="it" 
                    className="text-sm px-3 md:px-4 py-3 bg-transparent text-[#666] border-b-2 border-transparent rounded-none transition-all duration-200 hover:text-[#0497BC] hover:bg-[#F8FCFD] data-[state=active]:text-[#0497BC] data-[state=active]:border-[#49BED8] data-[state=active]:bg-transparent data-[state=active]:font-medium"
                  >
                    Я — ИТ-директор
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="ceo" className="mt-0 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-[36px] font-semibold leading-tight text-text-heading">
                    {tabsContent.ceo.title}
                  </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl">
                    {tabsContent.ceo.description}
                  </p>
                  
                  <div className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <Button size="lg" asChild>
                        <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                          {tabsContent.ceo.button1}
                        </a>
                      </Button>
                      <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                    </div>
                    <a 
                      href="#" 
                      className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium"
                    >
                      {tabsContent.ceo.button2}
                    </a>
                  </div>

                  <p className="text-sm text-[#777] leading-tight mt-8">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="mt-0 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-[36px] font-semibold leading-tight text-text-heading">
                    {tabsContent.operations.title}
                  </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl">
                    {tabsContent.operations.description}
                  </p>
                  
                  <div className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <Button size="lg" asChild>
                        <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                          {tabsContent.operations.button1}
                        </a>
                      </Button>
                      <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                    </div>
                    <a 
                      href="#" 
                      className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium"
                    >
                      {tabsContent.operations.button2}
                    </a>
                  </div>

                  <p className="text-sm text-[#777] leading-tight mt-8">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="it" className="mt-0 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-[36px] font-semibold leading-tight text-text-heading">
                    {tabsContent.it.title}
                  </h1>
                  
                  <p className="text-lg text-text-body leading-relaxed max-w-xl">
                    {tabsContent.it.description}
                  </p>
                  
                  <div className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-col gap-2">
                      <Button size="lg" asChild>
                        <a href="https://calendar.app.google/Zb3NNbpFm3Yh1uA59" target="_blank" rel="noopener noreferrer">
                          {tabsContent.it.button1}
                        </a>
                      </Button>
                      <AvailabilityBadge slotsAvailable={AVAILABLE_SLOTS_THIS_WEEK} className="text-center" />
                    </div>
                    <a 
                      href="#" 
                      className="text-base text-primary hover:text-primary-dark underline underline-offset-4 transition-colors font-medium"
                    >
                      {tabsContent.it.button2}
                    </a>
                  </div>

                  <p className="text-sm text-[#777] leading-tight mt-8">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>
            </div>
          
            <div className={`col-span-6 relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <OptimizedImage 
                src={alexandraPortrait} 
                alt="Александра Моисеева - AI консультант" 
                className="rounded-lg w-[82%] h-auto object-cover mx-auto"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Hero;