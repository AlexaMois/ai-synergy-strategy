import { LucideIcon } from "lucide-react";

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

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl bg-white shadow-card hover:shadow-lg transition-shadow duration-200 flex flex-col ${staggerClass}`}
    >
      {/* Icon and Company */}
      <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 text-primary" strokeWidth={1.5} />
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground leading-tight">
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

      {/* Divider */}
      <div className="h-px bg-border my-2 sm:my-3"></div>

      {/* Solution */}
      {caseItem.solution && (
        <div className="mb-3 sm:mb-4">
          <p className="text-handwriting text-lg sm:text-xl mb-1.5 sm:mb-2">
            Как мы это сделали:
          </p>
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
            Что говорит клиент:
          </p>
          <p className="text-xs sm:text-sm italic text-foreground leading-relaxed">
            "{caseItem.quote}"
          </p>
          {caseItem.quoteAuthor && (
            <p className="text-[10px] sm:text-xs text-foreground mt-1">
              — {caseItem.quoteAuthor}
            </p>
          )}
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
          <p className="text-xs sm:text-sm font-medium text-primary leading-relaxed">
            {caseItem.resultsSummary}
          </p>
        </div>
      )}

      {/* Link */}
      <div className="mt-auto space-y-2">
        <a 
          href={caseItem.link || "#"} 
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary font-medium hover:underline transition-all duration-200 min-h-[44px] py-2"
        >
          <span>{caseItem.buttonText || "Читать подробный разбор кейса →"}</span>
        </a>
      </div>
    </div>
  );
};

export default CaseCard;
