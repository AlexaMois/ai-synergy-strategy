import { useMobileAnimations } from "@/hooks/use-mobile-animations";
import { Target, TrendingUp, MessageCircle, Search } from "lucide-react";

const MyStory = () => {
  const { ref, getStaggeredClass, getAnimationClass } = useMobileAnimations({ threshold: 0.2 });
  
  return (
    <section id="about" ref={ref} className="relative py-10 md:py-16 lg:py-20 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F6F8FA 0%, #FAFBFC 100%)'
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto py-16">
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <h2 className={`section-title text-center ${getAnimationClass('animate-fade-in-up', 'animate-mobile-slide-up')}`}>
            Моя позиция
          </h2>

          <div className="space-y-4">
            <div 
              className={`flex items-start gap-6 p-4 sm:p-6 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${getStaggeredClass(0, 'animate-fade-in-up')}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)'
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-text-body leading-relaxed">
                  ИИ — инструмент, а не повод "повесить" на бизнес лишние расходы.
                </p>
              </div>
            </div>

            <div 
              className={`flex items-start gap-6 p-4 sm:p-6 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${getStaggeredClass(1, 'animate-fade-in-up')}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)'
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-text-body leading-relaxed">
                  Любой проект должен давать эффект, а не создавать видимость инноваций.
                </p>
              </div>
            </div>

            <div 
              className={`flex items-start gap-6 p-4 sm:p-6 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${getStaggeredClass(2, 'animate-fade-in-up')}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)'
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-text-body leading-relaxed">
                  Если ИИ не нужен — я честно скажу об этом сразу.
                </p>
              </div>
            </div>

            <div 
              className={`flex items-start gap-6 p-4 sm:p-6 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] ${getStaggeredClass(3, 'animate-fade-in-up')}`}
              style={{ 
                background: 'linear-gradient(180deg, #F8FCFE 0%, #F4F9FB 100%)'
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-text-body leading-relaxed">
                  Диагностика — фильтр, без которого нельзя начинать.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;
