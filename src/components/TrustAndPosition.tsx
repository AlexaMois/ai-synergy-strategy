import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { Target, TrendingUp, MessageCircle, Search } from "lucide-react";

const TrustAndPosition = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden bg-background"
    >
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute top-1/2 right-20 w-[340px] opacity-12 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.5}px) rotate(-50deg)`,
          animationDelay: '0.1s'
        }}
      />
      
      <div className="container mx-auto">
        {/* Общий контейнер с тенью */}
        <div 
          className={`max-w-7xl mx-auto bg-background rounded-3xl p-12 md:p-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Левая колонка: Почему мне доверяют */}
            <div>
              <div className="mb-8">
                <h2 className="text-[30px] font-medium text-text-heading mb-3">
                  Почему мне доверяют
                </h2>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                {/* Карточка 1 */}
                <div 
                  className="p-6 rounded-xl text-center flex items-center justify-center h-full min-h-[160px]"
                  style={{ 
                    backgroundColor: 'hsl(var(--gray-50))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-lg text-text-body leading-relaxed">
                    Помогаю компаниям получать измеримую пользу от ИИ, а не создавать лишние расходы.
                  </p>
                </div>
                
                {/* Карточка 2 */}
                <div 
                  className="p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px]"
                  style={{ 
                    backgroundColor: 'hsl(var(--gray-50))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-lg font-semibold text-text-heading leading-relaxed mb-2">
                    12+ лет в управлении, финансах и операционке
                  </p>
                  <p className="text-lg text-text-body leading-relaxed">
                    Понимаю процессы изнутри и оцениваю решения через экономику.
                  </p>
                </div>
                
                {/* Карточка 3 */}
                <div 
                  className="p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px]"
                  style={{ 
                    backgroundColor: 'hsl(var(--gray-50))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-lg font-semibold text-text-heading leading-relaxed mb-2">
                    Профессиональное признание
                  </p>
                  <p className="text-lg text-text-body leading-relaxed">
                    Победитель «Бизнес-Успех» (2025), член НФИИ, резидент IT-Парк Казань и КРИТБИ.
                  </p>
                </div>
                
                {/* Карточка 4 */}
                <div 
                  className="p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px]"
                  style={{ 
                    backgroundColor: 'hsl(var(--gray-50))',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-lg font-semibold text-text-heading leading-relaxed mb-2">
                    Подтверждённый результат
                  </p>
                  <p className="text-lg text-text-body leading-relaxed">
                    36+ проектов, ROI клиентов 200–400% в первые месяцы внедрения.
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка: Моя позиция */}
            <div>
              <div className="mb-8">
                <h2 className="text-[30px] font-medium text-text-heading mb-3">
                  Моя позиция
                </h2>
                <div className="w-full h-px bg-gray-200"></div>
              </div>

              <div className="space-y-4">
                <div 
                  className="flex items-center gap-4 p-5 rounded-full bg-white"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #49BED8 0%, #D4EDFC 100%)'
                    }}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-text-body leading-relaxed">
                      ИИ — это инструмент управления. Он должен усиливать процессы и приносить предсказуемый эффект.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-4 p-5 rounded-full bg-white"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #49BED8 0%, #D4EDFC 100%)'
                    }}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-text-body leading-relaxed">
                      <span className="font-semibold">Инженерный подход</span><br />
                      Диагностика, архитектура, экономика — только после этого технологии.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-4 p-5 rounded-full bg-white"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #49BED8 0%, #D4EDFC 100%)'
                    }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-text-body leading-relaxed">
                      <span className="font-semibold">Честность решения</span><br />
                      Если автоматизация не окупится или не нужна, я говорю об этом сразу.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-4 p-5 rounded-full bg-white"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #49BED8 0%, #D4EDFC 100%)'
                    }}
                  >
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-text-body leading-relaxed">
                      <span className="font-semibold">Устойчивость и независимость</span><br />
                      Строю системы, которые компания может поддерживать сама, без внешней зависимости.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndPosition;
