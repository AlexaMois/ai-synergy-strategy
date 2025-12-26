import { LucideIcon, ChevronDown } from "lucide-react";
import { useState, ReactNode } from "react";

// Function to highlight metrics (numbers, percentages, currency) in text
const highlightMetrics = (text: string): ReactNode[] => {
  // Regex to match numbers with units, percentages, currency, time ranges
  const metricPattern = /(\d+[\d\s,–-]*(?:\s*(?:млн|тыс|%|₽|часов?|часа|минут|месяц(?:ев|а)?|недел[ьи]|дн(?:ей|я)|×))?(?:\s*₽)?)/gi;
  
  const parts = text.split(metricPattern);
  
  return parts.map((part, index) => {
    if (part.match(metricPattern)) {
      return (
        <span key={index} className="text-primary font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
};
interface CaseCardProps {
  caseItem: {
    icon: LucideIcon;
    company: string;
    about: string;
    aboutLabel?: string;
    situation?: string;
    solution?: {
      steps: string[];
    };
    quote?: string;
    quoteAuthor?: string;
    resultsSummary?: string;
    buttonText?: string;
    link?: string;
    bgColor: string;
  };
  index: number;
  counterVisible: boolean;
  staggerClass: string;
}

const CaseCard = ({ caseItem, index, staggerClass }: CaseCardProps) => {
  const Icon = caseItem.icon;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl bg-card border border-border shadow-soft hover-lift-card flex flex-col ${staggerClass}`}
    >
      {/* Icon and Company */}
      <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground leading-tight pt-2">
          {caseItem.company}
        </h3>
      </div>

      {/* About / Client */}
      {caseItem.about && (
        <div className="mb-3 sm:mb-4">
          <p className="text-handwriting text-lg sm:text-xl mb-1">
            {caseItem.aboutLabel || 'Клиент:'}
          </p>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
            {caseItem.about}
          </p>
        </div>
      )}

      {/* Situation */}
      {caseItem.situation && (
        <div className="mb-3 sm:mb-4">
          <p className="text-handwriting text-lg sm:text-xl mb-1">
            Ситуация:
          </p>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
            {caseItem.situation}
          </p>
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs sm:text-sm text-primary font-medium py-2 hover:underline transition-all duration-200"
      >
        <span>{isExpanded ? "Свернуть" : "Как мы это сделали:"}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Collapsible Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* Solution */}
          {caseItem.solution && (
            <div className="mb-3 sm:mb-4 pt-2">
              <ul className="space-y-1">
                {caseItem.solution.steps.map((step, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-foreground leading-snug flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quote */}
          {caseItem.quote && (
            <div className="mb-3 sm:mb-4">
              <p className="text-handwriting text-lg sm:text-xl mb-1.5 sm:mb-2">
                Главный вывод:
              </p>
              <p className="text-xs sm:text-sm italic text-foreground leading-relaxed">
                "{caseItem.quote}"
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-border my-2 sm:my-3"></div>

          {/* Results Summary */}
          {caseItem.resultsSummary && (
            <div className="mb-4 sm:mb-6">
              <p className="text-handwriting text-lg sm:text-xl mb-1.5 sm:mb-2">
                Результат:
              </p>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                {highlightMetrics(caseItem.resultsSummary)}
              </p>
            </div>
          )}

          {/* Link */}
          <div className="space-y-2">
            <a 
              href={caseItem.link || "#"} 
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary font-medium hover:underline transition-all duration-200 min-h-[44px] py-2"
            >
              <span>{caseItem.buttonText || "Читать подробный разбор кейса →"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
