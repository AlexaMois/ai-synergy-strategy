import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import brushAccent from "@/assets/brush-accent-1.png";
import { Target, TrendingUp, MessageCircle, Search, Shield, Users } from "lucide-react";

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
          className={`max-w-7xl mx-auto bg-[#FAFBFC] rounded-3xl p-12 md:p-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
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
              
              {/* Вступительный текст */}
              <div className="mb-6">
                <p className="text-base text-text-body leading-relaxed">
                  Потому что я работаю не с технологиями — <span className="font-semibold">я работаю с бизнесом</span>.
                  Считаю экономику каждого решения, вижу процессы изнутри и не продаю то, что не принесёт эффекта.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Карточка 1 */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#F8F3FF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-base font-semibold text-text-heading leading-relaxed mb-2">
                    12+ лет в управлении, финансах и операционке
                  </p>
                  <p className="text-base text-text-body leading-relaxed">
                    Понимаю, как работают компании, как строятся процессы и что действительно влияет на прибыль.
                  </p>
                </div>
                
                {/* Карточка 2 */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#F8F3FF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-base font-semibold text-text-heading leading-relaxed mb-2">
                    Победитель Национальной премии "Бизнес-Успех" (2025)
                  </p>
                  <p className="text-base text-text-body leading-relaxed">
                    Признание за реальные проекты, а не за презентации.
                  </p>
                </div>
                
                {/* Карточка 3 */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#F8F3FF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-base font-semibold text-text-heading leading-relaxed mb-2">
                    Член Национального фонда искусственного интеллекта
                  </p>
                  <p className="text-base text-text-body leading-relaxed">
                    Экспертиза, подтверждённая профессиональным сообществом.
                  </p>
                </div>
                
                {/* Карточка 4 */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#F8F3FF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-base font-semibold text-text-heading leading-relaxed mb-2">
                    Резидент IT-Парк Казань и КРИТБИ
                  </p>
                  <p className="text-base text-text-body leading-relaxed">
                    Практика внедрений на российских платформах и в закрытых контурах.
                  </p>
                </div>
                
                {/* Карточка 5 */}
                <div 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#F8F3FF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <p className="text-base font-semibold text-text-heading leading-relaxed mb-2">
                    ROI клиентов 200–400% в первые месяцы внедрения
                  </p>
                  <p className="text-base text-text-body leading-relaxed">
                    Я оцениваю выгоду до старта — и веду проекты до результата.
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка: Моя позиция */}
            <div>
              <div className="mb-8">
                <h2 className="text-[30px] font-medium text-text-heading mb-3">
                  🔥 Моя позиция
                </h2>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-base text-text-body leading-relaxed">
                  <span className="font-semibold">ИИ — это инструмент управления</span>, а не модный проект.
                  Он должен усиливать процессы, снижать издержки и давать прогнозируемый эффект.
                </p>
              </div>

              <div className="space-y-4">
                <div 
                  className="flex items-start gap-4 p-5 rounded-full bg-white"
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
                    <p className="text-base text-text-body leading-relaxed">
                      <span className="font-semibold">Я за честные решения</span><br />
                      Если автоматизация не окупится — я скажу об этом сразу. Это экономит бюджеты, время и доверие.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-5 rounded-full bg-white"
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
                    <p className="text-base text-text-body leading-relaxed">
                      <span className="font-semibold">Я за инженерный подход</span>, а не "кнопку ИИ"<br />
                      Сначала анализ, архитектура и риски — потом выбор инструмента.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-5 rounded-full bg-white"
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
                    <p className="text-base text-text-body leading-relaxed">
                      <span className="font-semibold">Я за прозрачность</span><br />
                      Объясняю управленцам на их языке: деньги, скорость, нагрузка, устойчивость.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-5 rounded-full bg-white"
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
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-text-body leading-relaxed">
                      <span className="font-semibold">Я за зрелые команды</span><br />
                      Внедрение работает тогда, когда люди понимают смысл изменений.
                    </p>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-5 rounded-full bg-white"
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
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-text-body leading-relaxed">
                      <span className="font-semibold">Я за устойчивость</span>, а не зависимость<br />
                      Строю системы, которые компания может поддерживать без меня.
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
