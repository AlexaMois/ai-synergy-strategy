import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  currentPage: string;
  parentPages?: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonLabel?: string;
}

const PageBreadcrumbs = ({ 
  currentPage, 
  parentPages,
  showBackButton = false,
  backButtonHref,
  backButtonLabel
}: PageBreadcrumbsProps) => {
  // Auto-detect if we should show back button for case detail pages
  const shouldShowBack = showBackButton || (parentPages && parentPages.some(p => p.href === "/cases"));
  const backHref = backButtonHref || "/cases";
  const backLabel = backButtonLabel || "Ко всем кейсам";

  return (
    <nav className="breadcrumb-nav" aria-label="breadcrumb">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm flex-wrap">
            <li>
              <Link 
                to="/" 
                className="transition-colors"
              >
                Главная
              </Link>
            </li>
            {parentPages?.map((parent, index) => (
              <li key={index} className="flex min-w-0 items-center gap-1.5">
                <span aria-hidden="true" className="breadcrumb-separator">&gt;</span>
                {parent.href ? (
                  <Link 
                    to={parent.href} 
                    className="transition-colors"
                  >
                    {parent.label}
                  </Link>
                ) : (
                  <span>{parent.label}</span>
                )}
              </li>
            ))}
            <li className="flex min-w-0 items-center gap-1.5">
              <span aria-hidden="true" className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-current font-medium" aria-current="page">
                {currentPage}
              </span>
            </li>
          </ol>

          {shouldShowBack && (
            <Button asChild variant="ghost" size="sm" className="hidden shrink-0 sm:flex">
              <Link to={backHref}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PageBreadcrumbs;
