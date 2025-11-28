import OptimizedImage from "@/components/OptimizedImage";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { useCountUp } from "@/hooks/use-count-up";
import brushAccent from "@/assets/brush-accent-1.png";

const CaseCard = ({ caseItem, index, isVisible }: { caseItem: any; index: number; isVisible: boolean }) => {
  const roiValue = parseInt(caseItem.roi.match(/\d+/)[0]);
  const roiCount = useCountUp({ end: roiValue, duration: 2000, isVisible, prefix: 'ROI ', suffix: '%' });
  
  return (
    <div
      className={`space-y-4 p-6 rounded-2xl border border-border/30 bg-gradient-card shadow-card transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:scale-[1.015] cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-text-heading">{caseItem.title}</h3>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold text-accent">{caseItem.result}</p>
          <p className="text-lg font-semibold text-text-subtle">{roiCount}</p>
        </div>
      </div>
      <p className="text-base text-text-body leading-relaxed">
        {caseItem.description}
      </p>
    </div>
  );
};

const Cases = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const parallaxOffset = useParallax(0.25);
  const cases = [
    {
      title: "Крайпотребсоюз",
      result: "–92% времени",
      roi: "ROI 278%",
      description:
        "Автоматизация документооборота и аналитики. Сокращение рутинных операций с 8 часов до 40 минут.",
    },
    {
      title: "Голосовой ассистент",
      result: "70% автоматизация",
      roi: "ROI 340%",
      description:
        "Разработка голосового помощника для службы поддержки. Обработка без участия оператора.",
    },
    {
      title: "Грузовой экспресс",
      result: "–35% простоев",
      roi: "ROI 215%",
      description:
        "Внедрение ИИ для прогнозирования маршрутов. Снижение простоев и экономия топлива на 18%.",
    },
  ];

  return (
    <section id="cases" ref={ref} className="relative py-16 bg-secondary overflow-hidden">
      {/* Brush Accent */}
      <OptimizedImage 
        src={brushAccent} 
        alt="" 
        className={`absolute top-40 left-12 w-[460px] opacity-15 pointer-events-none transition-all duration-600 ease-out ${isVisible ? 'animate-fade-slide-up' : 'opacity-0'}`}
        style={{ 
          transform: `translateY(${parallaxOffset * 0.7}px) rotate(15deg)`,
          animationDelay: '0.3s'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center text-text-heading ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Кейсы
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <CaseCard key={index} caseItem={caseItem} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;
