import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Прокрутить наверх при смене пути (но не при смене hash)
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;
