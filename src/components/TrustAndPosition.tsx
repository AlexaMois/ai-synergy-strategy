import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { Target, TrendingUp, MessageCircle, Search } from "lucide-react";

const TrustAndPosition = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);

  return (
    <section ref={ref} className="relative py-16 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F8FCFD 0%, #FAFBFC 100%)'
    }}>
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
      
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Левая колонка: Почему мне доверяют */}
            <div>
              <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-3xl font-bold mb-5 text-text-heading">
                  Почему мне доверяют
                </h2>
                <div className="w-24 h-px bg-gray-300 mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                {/* Две вертикальные карточки в ряд */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div 
                    className={`p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ 
                      background: 'linear-gradient(180deg, #F3EEFF 0%, #FFFFFF 10%)',
                      animationDelay: '0.1s'
                    }}
                  >
                    <p className="text-sm text-text-body leading-[1.7] mb-3">
                      12+ лет в управлении, финансах и технологиях
                    </p>
                    <div className="w-12 h-px bg-primary/20 my-3"></div>
                    <p className="text-sm text-text-body leading-[1.7]">
                      Победитель Национальной премии "Бизнес-Успех", 2025
                    </p>
                  </div>
                  
                  <div 
                    className={`p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ 
                      background: 'linear-gradient(180deg, #F3EEFF 0%, #FFFFFF 10%)',
                      animationDelay: '0.15s'
                    }}
                  >
                    <p className="text-sm text-text-body leading-[1.7] mb-3">
                      Член Национального фонда искусственного интеллекта
                    </p>
                    <div className="w-12 h-px bg-primary/20 my-3"></div>
                    <p className="text-sm text-text-body leading-[1.7]">
                      Резидент IT-Парк Казань и КРИТБИ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка: Моя позиция */}
            <div>
              <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
              <h2 className={`text-3xl font-bold mb-10 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Моя позиция
              </h2>

              <div className="space-y-4">
                <div 
                  className={`flex items-start gap-5 p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ 
                    background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                    animationDelay: '0.1s'
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-body leading-[1.7]">
                      ИИ — инструмент, а не повод "повесить" на бизнес лишние расходы.
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex items-start gap-5 p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ 
                    background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                    animationDelay: '0.15s'
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-body leading-[1.7]">
                      Любой проект должен давать эффект, а не создавать видимость инноваций.
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex items-start gap-5 p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ 
                    background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                    animationDelay: '0.2s'
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-body leading-[1.7]">
                      Если ИИ не нужен — я честно скажу об этом сразу.
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex items-start gap-5 p-5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ 
                    background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)',
                    animationDelay: '0.25s'
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-body leading-[1.7]">
                      Диагностика — фильтр, без которого нельзя начинать.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Широкая карточка на всю ширину двух колонок */}
            <div className="lg:col-span-2">
              <div 
                className={`p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ 
                  background: 'linear-gradient(180deg, #F3EEFF 0%, #FFFFFF 10%)',
                  animationDelay: '0.2s'
                }}
              >
                <p className="text-sm text-text-body leading-[1.7] text-center">
                  Сопровождаю проекты до результата — без иллюзий, без хаоса, без "магии ИИ"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndPosition;
