import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BackToHome = () => {
  const location = useLocation();
  
  // Показываем только на внутренних страницах
  if (location.pathname === '/') return null;
  
  return (
    <Link
      to="/"
      className="fixed bottom-4 sm:bottom-6 md:bottom-24 right-16 sm:right-24 md:right-36 z-40 bg-accent text-accent-foreground rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-card hover:shadow-hover transition-all duration-300 flex items-center gap-2"
      aria-label="На главную"
    >
      <Home className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-sm font-medium hidden sm:inline">Домой</span>
    </Link>
  );
};

export default BackToHome;
