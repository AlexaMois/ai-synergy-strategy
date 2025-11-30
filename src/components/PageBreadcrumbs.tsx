import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageBreadcrumbsProps {
  currentPage: string;
}

const PageBreadcrumbs = ({ currentPage }: PageBreadcrumbsProps) => {
  const location = useLocation();
  
  return (
    <nav className="py-4 bg-background border-b border-[#E6EAEC]" aria-label="breadcrumb">
      <div className="container mx-auto px-4 max-w-6xl">
        <ol className="flex items-center gap-2 text-sm text-[#6A6A6A]">
          <li>
            <Link 
              to="/" 
              className="hover:text-accent transition-colors"
            >
              Главная
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-text-heading font-medium" aria-current="page">
            {currentPage}
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default PageBreadcrumbs;
