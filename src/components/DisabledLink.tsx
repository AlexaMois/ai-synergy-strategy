import { Link } from "react-router-dom";
import { isRouteAllowed } from "@/config/routes";

interface DisabledLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  disabledLabel?: string;
}

const DisabledLink = ({ 
  to, 
  children, 
  className, 
  onClick, 
  onMouseEnter,
  style,
  disabled = false,
  disabledLabel
}: DisabledLinkProps) => {
  const isDisabled = disabled || !isRouteAllowed(to);

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  if (isDisabled) {
    return (
      <span 
        className={`${className} opacity-50 cursor-not-allowed`} 
        style={style}
        title={disabledLabel || "Скоро будет доступно"}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </span>
    );
  }

  return (
    <Link to={to} className={className} onClick={handleClick} style={style} onMouseEnter={onMouseEnter}>
      {children}
    </Link>
  );
};

export default DisabledLink;
