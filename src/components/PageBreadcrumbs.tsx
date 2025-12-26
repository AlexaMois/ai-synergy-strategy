import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  currentPage: string;
  parentPages?: BreadcrumbItem[];
}

const PageBreadcrumbs = ({ currentPage, parentPages }: PageBreadcrumbsProps) => {
  return (
    <nav className="py-4 border-b border-border" aria-label="breadcrumb">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-center">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap justify-center">
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
        </div>
      </div>
    </nav>
  );
};

export default PageBreadcrumbs;
