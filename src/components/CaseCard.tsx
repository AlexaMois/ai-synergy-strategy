import { useCountUp } from "@/hooks/use-count-up";
import { LucideIcon } from "lucide-react";

interface CaseCardProps {
  caseItem: {
    icon: LucideIcon;
    company: string;
    about: string;
    aboutLabel?: string;
    client?: string;
    situation?: string;
    problems?: string[];
    features?: string[];
    solution?: {
      budget?: string;
      steps: string[];
    };
    quote?: string;
    results: {
      period: string;
      items: string[];
    };
    mainMetric: { value: number; prefix: string; suffix: string };
    bgColor: string;
  };
  index: number;
  counterVisible: boolean;
  staggerClass: string;
}

const CaseCard = ({ caseItem, index, counterVisible, staggerClass }: CaseCardProps) => {
  const Icon = caseItem.icon;
  
  // Main metric counter
  const metricCount = useCountUp({
    end: caseItem.mainMetric.value,
    duration: 1800,
    isVisible: counterVisible,
    prefix: caseItem.mainMetric.prefix,
    suffix: caseItem.mainMetric.suffix
  });
  
  // Individual metric counters
  const count92 = useCountUp({ end: 92, duration: 1800, isVisible: counterVisible });
  const count80 = useCountUp({ end: 80, duration: 1800, isVisible: counterVisible });
  const count278 = useCountUp({ end: 278, duration: 1800, isVisible: counterVisible });
  const count5 = useCountUp({ end: 5, duration: 1800, isVisible: counterVisible });
  const count99 = useCountUp({ end: 99, duration: 1800, isVisible: counterVisible });
  const count3 = useCountUp({ end: 3, duration: 1800, isVisible: counterVisible });

  return (
    <div
      className={`p-4 sm:p-6 rounded-[20px] bg-white shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary-light/15 flex flex-col gradient-border gradient-border-hover ${staggerClass}`}
    >
      {/* Icon and Company */}
      <div className="flex items-start gap-3 mb-4">
        <Icon className="w-8 h-8 flex-shrink-0" style={{ color: '#49BED8' }} strokeWidth={1.5} />
        <h3 className="text-base sm:text-lg font-semibold text-text-heading leading-tight">
          {caseItem.company}
        </h3>
      </div>

      {/* About / Client */}
      {caseItem.about && (
        <div className="mb-4">
          <p className="text-handwriting mb-1">
            {caseItem.aboutLabel || (caseItem.client ? 'Типовой клиент:' : 'Клиент:')}
          </p>
          <p className="text-sm text-text-body leading-relaxed">
            {caseItem.about}
          </p>
          {caseItem.client && (
            <p className="text-sm text-text-body leading-relaxed mt-2">{caseItem.client}</p>
          )}
        </div>
      )}

      {/* Situation */}
      {caseItem.situation && (
        <div className="mb-4">
          <p className="text-handwriting mb-1">
            Ситуация:
          </p>
          <p className="text-sm text-text-body leading-relaxed">
            {caseItem.situation}
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gray-200 my-3"></div>

      {/* Problems */}
      {caseItem.problems && (
        <div className="mb-4">
          <p className="text-handwriting mb-2">
            Проблема:
          </p>
          <ul className="space-y-1">
            {caseItem.problems.map((problem, idx) => (
              <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Features */}
      {caseItem.features && (
        <div className="mb-4">
          <p className="text-handwriting mb-2">
            Возможности:
          </p>
          <ul className="space-y-1">
            {caseItem.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution */}
      {caseItem.solution && (
        <div className="mb-4">
          <p className="text-handwriting mb-2">
            {caseItem.solution.budget ? `Решение (бюджет ${caseItem.solution.budget}):` : 'Инженерное решение:'}
          </p>
          <ul className="space-y-1">
            {caseItem.solution.steps.map((step, idx) => (
              <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quote */}
      {caseItem.quote && (
        <div className="mb-4">
          <p className="text-handwriting mb-2">
            Особенность этого решения:
          </p>
          <p className="text-sm italic text-text-body leading-relaxed">
            "{caseItem.quote}"
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gray-200 my-3"></div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-handwriting mb-2">
          {caseItem.results.period ? `Результаты (${caseItem.results.period}):` : 'Результат:'}
        </p>
        <ul className="space-y-1.5">
          {caseItem.results.items.map((result, idx) => {
            // Extract numbers for animation
            const match92 = result.match(/92%/);
            const match80 = result.match(/80%/);
            const match278 = result.match(/278%/);
            const match5 = result.match(/×5/);
            const match99 = result.match(/99%/);
            const match3 = result.match(/3–4/);
            
            if (match92) {
              return (
                <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>Экономия <span className="font-semibold text-primary">{count92}%</span> времени на обработку (~550 часов/месяц)</span>
                </li>
              );
            }
            if (match80) {
              return (
                <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>Сокращение ФОТ на эту операцию на <span className="font-semibold text-primary">{count80}%</span></span>
                </li>
              );
            }
            if (match278) {
              return (
                <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>ROI <span className="font-semibold text-primary">{count278}%</span> (окупилось за 3 недели)</span>
                </li>
              );
            }
            if (match5) {
              return (
                <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>×<span className="font-semibold text-primary">{count5}</span> скорость обработки заявок (вместо 3 минут — 30 сек)</span>
                </li>
              );
            }
            if (match99) {
              return (
                <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>Точность <span className="font-semibold text-primary">{count99}%</span> {result.includes('маршрутов') ? 'маршрутов (вместо 70%)' : 'распознавания'}</span>
                </li>
              );
            }
            if (match3) {
              return (
                <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>Экономия <span className="font-semibold text-primary">{count3}–4</span> часа в неделю (диспетчеры)</span>
                </li>
              );
            }
            
            // Default render without animation
            return (
              <li key={idx} className="text-sm text-text-body leading-snug flex items-start gap-2">
                <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                <span>{result}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Link */}
      <div className="mt-auto space-y-2">
        {/* Case-specific links - all cases now have same link */}
        <a 
          href={index === 0 ? "/case-studies/kraypotrebsoyuz" : index === 2 ? "/case-studies/cargo-express" : "#"} 
          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all duration-300"
        >
          <span>Читать подробный разбор кейса →</span>
        </a>
      </div>
    </div>
  );
};

export default CaseCard;
