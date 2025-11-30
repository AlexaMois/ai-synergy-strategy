import OptimizedImage from "@/components/OptimizedImage";
import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { Target, TrendingUp, MessageCircle, Search } from "lucide-react";

const TrustAndPosition = () => {
  const { ref, getAnimationClass, getStaggeredClass } = useMobileAnimations({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.3);

  return (
    <section 
      ref={ref}
      className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-background"
    >
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute top-1/2 right-20 w-[340px] opacity-12 pointer-events-none transition-all duration-600 ease-out ${getAnimationClass('animate-fade-slide-up', 'animate-mobile-fade-scale')}`}
        style={{ 
          transform: `translateY(${-parallaxOffset * 0.5}px) rotate(-50deg)`,
          animationDelay: '0.1s'
        }}
      />
      
      <div className="container mx-auto">
        {/* Общий контейнер с тенью */}
        <div 
          className={`max-w-7xl mx-auto bg-background rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 shadow-hover ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
            {/* Левая колонка: Почему мне доверяют */}
            <div>
              <div className="mb-8">
                <h2 className="text-[30px] font-medium text-text-heading mb-3 leading-tight">
                  Почему мне доверяют, <span className="font-semibold">и чем это подтверждено</span>
                </h2>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {/* Карточка 1 */}
                <div 
                  className={`p-4 sm:p-6 rounded-xl text-center flex items-center justify-center h-full min-h-[160px] bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover ${getStaggeredClass(0)}`}
                >
                  <p className="text-lg text-text-body leading-relaxed">
                    Показываю, где ИИ дает измеримый эффект, а где превращается в лишние затраты.
                  </p>
                </div>
                
                {/* Карточка 2 */}
                <div 
                  className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover ${getStaggeredClass(1)}`}
                >
                  <p className="text-lg font-semibold text-text-heading leading-relaxed mb-2">
                    12+ лет в управлении и операционке
                  </p>
                  <p className="text-lg text-text-body leading-relaxed">
                    Понимаю процессы изнутри и оцениваю решения через экономику компании.
                  </p>
                </div>
                
                {/* Карточка 3 */}
                <div 
                  className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover ${getStaggeredClass(2)}`}
                >
                  <p className="text-lg font-semibold text-text-heading leading-relaxed mb-2">
                    Профессиональное признание
                  </p>
                  <p className="text-lg text-text-body leading-relaxed">
                    Дипломированный специалист по ИИ. Победитель «Бизнес Успех» (2025), член НФИИ, резидент КРИТБИ.
                  </p>
                </div>
                
                {/* Карточка 4 */}
                <div 
                  className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-[hsl(var(--gray-50))] shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/30 gradient-border-gray gradient-border-gray-hover ${getStaggeredClass(3)}`}
                >
                  <p className="text-lg font-semibold text-text-heading leading-relaxed mb-2">
                    Подтвержденный результат
                  </p>
                  <p className="text-lg text-text-body leading-relaxed">
                    ROI клиентов от 200 до 400 процентов в первые месяцы работы.
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка: Моя позиция */}
            <div>
              <div className="mb-8">
                <h2 className="text-[30px] font-medium text-text-heading mb-3 leading-tight">
                  Моя позиция, <span className="font-semibold">что отличает подход</span>
                </h2>
                <div className="w-full h-px bg-gray-200"></div>
              </div>

              <div className="space-y-4">
                <div 
                  className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-full bg-white shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${getStaggeredClass(4)}`}
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
                      <span className="font-semibold">ИИ инструмент управления</span><br />
                      Он должен усиливать процессы и давать предсказуемый результат.
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-full bg-white shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${getStaggeredClass(5)}`}
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
                      Сначала аудит, анализ, архитектура и экономика, затем технологии и конкретные решения.
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-full bg-white shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${getStaggeredClass(6)}`}
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
                      Если ИИ не нужен, я прямо об этом скажу. Я инженер по внедрению, а не продавец технологий.
                    </p>
                  </div>
                </div>

                <div 
                  className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-full bg-white shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primary-light/20 gradient-border gradient-border-hover ${getStaggeredClass(7)}`}
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
                      <span className="font-semibold">Индивидуальность решений</span><br />
                      Подбираю решения под контекст компании: только то, что вы действительно будете использовать.
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
