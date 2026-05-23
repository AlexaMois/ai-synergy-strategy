import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { useCountUp } from "@/hooks/use-count-up";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Target, TrendingUp, MessageCircle, Search } from "lucide-react";

const TrustAndPosition = () => {
  const {
    ref,
    getAnimationClass,
    getStaggeredClass
  } = useMobileAnimations({
    threshold: 0.2
  });

  // Counter animation for ROI numbers
  const {
    ref: counterRef,
    isVisible: counterVisible
  } = useIntersectionObserver({
    threshold: 0.5
  });
  const count200 = useCountUp({
    end: 200,
    duration: 1800,
    isVisible: counterVisible
  });
  const count400 = useCountUp({
    end: 400,
    duration: 1800,
    isVisible: counterVisible
  });
  const count12 = useCountUp({
    end: 12,
    duration: 1800,
    isVisible: counterVisible
  });

  return (
    <section ref={ref} className="relative py-14 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto">
        {/* Общий контейнер с тенью */}
        <div className={`max-w-7xl mx-auto bg-background rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 shadow-elevated ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12">
            {/* Левая колонка: Почему мне доверяют */}
            <div>
              <div className="mb-8">
                <h2 className="section-title mb-3">
                  Почему мне доверяют: <span className="font-semibold">реальный опыт и честная позиция</span>
                </h2>
                <div className="w-full h-px bg-border"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {/* Карточка 1 */}
                <div className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-muted shadow-xs gradient-border-hover hover-lift ${getStaggeredClass(0)}`}>
                  <p className="text-lg font-semibold text-foreground leading-relaxed mb-2">
                    Реальная польза
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Показываю, где цифровые инструменты дают измеримый эффект, а где создают лишние расходы. Смотрю на задачу через деньги, время, процессы и управляемость.
                  </p>
                </div>
                
                <div className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-muted shadow-xs gradient-border-hover hover-lift ${getStaggeredClass(1)}`}>
                  <p className="text-lg font-semibold text-foreground leading-relaxed mb-2">
                    <span className="font-semibold text-primary">{count12}+</span> лет в управлении и операционной работе
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Понимаю ответственность руководителя, цену ошибки, работу команды, давление сроков и влияние решений на экономику компании.
                  </p>
                </div>
                
                {/* Карточка 3 */}
                <div className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-muted shadow-xs gradient-border-hover hover-lift ${getStaggeredClass(2)}`}>
                  <p className="text-lg font-semibold text-foreground leading-relaxed mb-2">
                    Профессиональная база
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Дипломированный специалист по искусственному интеллекту, член ОПОРА России, резидент IT Park Казань, резидент КРИТБИ.
                  </p>
                </div>
                
                {/* Карточка 4 */}
                <div ref={counterRef as any} className={`p-4 sm:p-6 rounded-xl flex flex-col justify-center h-full min-h-[160px] bg-muted shadow-xs gradient-border-hover hover-lift ${getStaggeredClass(3)}`}>
                  <p className="text-lg font-semibold text-foreground leading-relaxed mb-2">
                    Проверенная эффективность
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ключевая метрика моей работы — сумма ненужных расходов, которых удалось избежать клиентам.
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка: Моя позиция */}
            <div>
              <div className="mb-8">
                <h2 className="section-title mb-3">
                  Моя позиция: <span className="font-semibold">честный подход</span>
                </h2>
                <div className="w-full h-px bg-border"></div>
              </div>

              <div className="space-y-4">
                <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-[24px] sm:rounded-full bg-card shadow-card gradient-border-hover hover-lift ${getStaggeredClass(4)}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="font-semibold">ИИ — инструмент управления</span><br />
                      ИИ усиливает процессы, помогает быстрее работать с данными, документами и решениями, когда у компании есть понятная задача и ответственность за результат.
                    </p>
                  </div>
                </div>

                <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-[24px] sm:rounded-full bg-card shadow-card gradient-border-hover hover-lift ${getStaggeredClass(5)}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="font-semibold">Инженерный подход</span><br />
                      Сначала задача, аудит, архитектура и экономика. Затем технологии, внедрение и конкретные решения под рабочие процессы компании.
                    </p>
                  </div>
                </div>

                <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-[24px] sm:rounded-full bg-card shadow-card gradient-border-hover hover-lift ${getStaggeredClass(6)}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                    <MessageCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="font-semibold">Честность решения</span><br />
                      Я прямо показываю, где инструмент даст пользу, где нужна подготовка процессов, а где выгоднее начать с аудита, стратегии или обучения команды. Я инженер по внедрению, а не продавец технологий.
                    </p>
                  </div>
                </div>

                <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-[24px] sm:rounded-full bg-card shadow-card gradient-border-hover hover-lift ${getStaggeredClass(7)}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                    <Search className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="font-semibold">Индивидуальность решений</span><br />
                      Подбираю решения под контекст компании: отрасль, команду, процессы, данные, бюджет, сроки и реальную готовность к изменениям.
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
