import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageBreadcrumbsProps {
  currentPage: string;
}

const PageBreadcrumbs = ({ currentPage }: PageBreadcrumbsProps) => {
  return (
    <nav className="py-4 border-b border-border" aria-label="breadcrumb">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-center">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link 
                to="/" 
                className="hover:text-primary transition-colors"
              >
                Главная
              </Link>
            </li>
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
