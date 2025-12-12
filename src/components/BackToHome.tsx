import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BackToHome = () => {
  const location = useLocation();
  
  // Показываем только на внутренних страницах
  if (location.pathname === '/') return null;
  
  return (
    <Link
      to="/"
      className="fixed bottom-6 left-6 z-40 bg-accent text-accent-foreground rounded-xl px-4 py-3 shadow-card hover:shadow-hover transition-all duration-300 flex items-center gap-2"
      aria-label="На главную"
    >
      <Home className="w-5 h-5" />
      <span className="text-sm font-medium">На главную</span>
    </Link>
  );
};

export default BackToHome;
