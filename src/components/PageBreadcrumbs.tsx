import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
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
    <nav className="py-4 border-b border-border" aria-label="breadcrumb">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link 
                to="/" 
                className="hover:text-primary transition-colors"
              >
                Главная
              </Link>
            </li>
            {parentPages?.map((parent, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1" />
                {parent.href ? (
                  <Link 
                    to={parent.href} 
                    className="hover:text-primary transition-colors"
                  >
                    {parent.label}
                  </Link>
                ) : (
                  <span>{parent.label}</span>
                )}
              </li>
            ))}
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" />
            </li>
            <li className="text-foreground font-medium" aria-current="page">
              {currentPage}
            </li>
          </ol>

          {shouldShowBack && (
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
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
