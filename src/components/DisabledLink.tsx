import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { isRouteAllowed } from "@/config/routes";

interface DisabledLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const DisabledLink = ({ to, children, className, onClick, style }: DisabledLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isRouteAllowed(to)) {
      e.preventDefault();
      toast({
        title: "Эта страница находится в разработке",
        description: "Скоро здесь появится полезная информация",
      });
    }
    onClick?.();
  };

  return (
    <Link to={to} className={className} onClick={handleClick} style={style}>
      {children}
    </Link>
  );
};

export default DisabledLink;
