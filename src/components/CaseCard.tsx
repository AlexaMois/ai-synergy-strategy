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
            {caseItem.aboutLabel || 'Клиент:'}
          </p>
          <p className="text-sm text-text-body leading-relaxed">
            {caseItem.about}
          </p>
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

      {/* Solution */}
      {caseItem.solution && (
        <div className="mb-4">
          <p className="text-handwriting mb-2">
            Как мы это сделали:
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
            Что говорит клиент:
          </p>
          <p className="text-sm italic text-text-body leading-relaxed">
            "{caseItem.quote}"
          </p>
          {caseItem.quoteAuthor && (
            <p className="text-xs text-muted-foreground mt-1">
              — {caseItem.quoteAuthor}
            </p>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gray-200 my-3"></div>

      {/* Results Summary */}
      {caseItem.resultsSummary && (
        <div className="mb-6">
          <p className="text-handwriting mb-2">
            Результат:
          </p>
          <p className="text-sm font-medium text-primary leading-relaxed">
            {caseItem.resultsSummary}
          </p>
        </div>
      )}

      {/* Link */}
      <div className="mt-auto space-y-2">
        <a 
          href={caseItem.link || "#"} 
          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all duration-300"
        >
          <span>{caseItem.buttonText || "Читать подробный разбор кейса →"}</span>
        </a>
      </div>
    </div>
  );
};

export default CaseCard;
