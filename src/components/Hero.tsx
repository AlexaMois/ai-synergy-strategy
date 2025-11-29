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
      title: "За 30 минут покажу, где ваш бизнес теряет деньги в процессах",
      description: "Экспресс-аудит, после которого становится ясно, что автоматизировать, что НЕ автоматизировать и что даст ROI уже в первые месяцы.",
      button1: "Пройти экспресс-аудит процессов",
      button2: 'Скачать чек-лист "10 вопросов перед внедрением ИИ"'
    },
    operations: {
      title: "Где процессы буксуют — и что даст эффект быстрее всего",
      description: "Инженерный разбор, который выявляет узкие места, дублирование и реальные точки ускорения.",
      button1: "Пройти экспресс-аудит процессов",
      button2: 'Скачать чек-лист "10 вопросов перед внедрением ИИ"'
    },
    it: {
      title: "Как внедрять технологии, не ломая работающую систему",
      description: "Честная оценка зрелости процессов, рисков, архитектуры и реальных возможностей ИИ.",
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
                    для руководителей и владельцев бизнеса
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-[#999] mb-3">Для кого</p>
                  <TabsList className="bg-transparent p-0 h-auto gap-3 border-b border-gray-200 flex-wrap justify-start w-full">
                    <TabsTrigger 
                      value="ceo" 
                      className="text-sm px-4 py-2.5 bg-white text-[#666] border border-gray-200 rounded-lg transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:shadow-md"
                    >
                      Я — CEO
                    </TabsTrigger>
                    <TabsTrigger 
                      value="operations" 
                      className="text-sm px-4 py-2.5 bg-white text-[#666] border border-gray-200 rounded-lg transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:shadow-md"
                    >
                      <span className="hidden sm:inline">Я — операционный директор</span>
                      <span className="sm:hidden">Я — Опер. директор</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="it" 
                      className="text-sm px-4 py-2.5 bg-white text-[#666] border border-gray-200 rounded-lg transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:shadow-md"
                    >
                      Я — ИТ-директор
                    </TabsTrigger>
                  </TabsList>
                </div>

                <p className="text-base text-text-body leading-relaxed mb-6 max-w-xl">
                  Помогаю компаниям понять, какие ИИ- и цифровые решения действительно нужны, а какие только создают хаос, задержки и лишние расходы.
                </p>
              </div>

              <TabsContent value="ceo" className="mt-0 animate-fade-in">
                <div className="space-y-5">
                  <h1 className="text-[36px] font-semibold leading-tight text-text-heading">
                    {tabsContent.ceo.title}
                  </h1>
                  
                  <p className="text-base text-text-body leading-relaxed max-w-xl">
                    {tabsContent.ceo.description}
                  </p>
                  
                  <div className="flex flex-col gap-3 pt-2">
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
                      className="text-sm text-primary hover:text-primary-dark underline underline-offset-4 transition-colors"
                    >
                      {tabsContent.ceo.button2}
                    </a>
                  </div>

                  <p className="text-xs text-[#777] leading-tight mt-6">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="mt-0 animate-fade-in">
                <div className="space-y-5">
                  <h1 className="text-[36px] font-semibold leading-tight text-text-heading">
                    {tabsContent.operations.title}
                  </h1>
                  
                  <p className="text-base text-text-body leading-relaxed max-w-xl">
                    {tabsContent.operations.description}
                  </p>
                  
                  <div className="flex flex-col gap-3 pt-2">
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
                      className="text-sm text-primary hover:text-primary-dark underline underline-offset-4 transition-colors"
                    >
                      {tabsContent.operations.button2}
                    </a>
                  </div>

                  <p className="text-xs text-[#777] leading-tight mt-6">
                    36+ проектов · 350+ консультаций · ROI клиентов 200–400%
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="it" className="mt-0 animate-fade-in">
                <div className="space-y-5">
                  <h1 className="text-[36px] font-semibold leading-tight text-text-heading">
                    {tabsContent.it.title}
                  </h1>
                  
                  <p className="text-base text-text-body leading-relaxed max-w-xl">
                    {tabsContent.it.description}
                  </p>
                  
                  <div className="flex flex-col gap-3 pt-2">
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
                      className="text-sm text-primary hover:text-primary-dark underline underline-offset-4 transition-colors"
                    >
                      {tabsContent.it.button2}
                    </a>
                  </div>

                  <p className="text-xs text-[#777] leading-tight mt-6">
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