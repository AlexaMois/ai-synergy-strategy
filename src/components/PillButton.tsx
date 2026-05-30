import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

type Variant = "dark" | "light" | "turquoise" | "outline-dark" | "outline-light";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: "md" | "lg";
}

interface LinkProps extends BaseProps {
  to: string;
  href?: never;
  onClick?: () => void;
  target?: never;
  rel?: never;
}
interface AnchorProps extends BaseProps {
  href: string;
  to?: never;
  onClick?: () => void;
  target?: string;
  rel?: string;
}
interface ButtonProps extends BaseProps {
  onClick: () => void;
  to?: never;
  href?: never;
  target?: never;
  rel?: never;
}

type Props = LinkProps | AnchorProps | ButtonProps;

const PillButton = (props: Props) => {
  const { children, variant = "dark", className = "", size = "lg" } = props;

  const styles: Record<Variant, string> = {
    dark: "bg-foreground text-background hover:bg-foreground/90",
    light: "bg-background text-foreground hover:bg-background/90",
    turquoise: "bg-accent text-accent-foreground hover:bg-primary-dark",
    "outline-dark":
      "bg-transparent text-foreground ring-1 ring-foreground/20 hover:bg-foreground/5",
    "outline-light":
      "bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10",
  };

  const iconBg: Record<Variant, string> = {
    dark: "bg-accent text-accent-foreground",
    light: "bg-foreground text-background",
    turquoise: "bg-background text-foreground",
    "outline-dark": "bg-foreground text-background",
    "outline-light": "bg-white text-foreground",
  };

  const sizing =
    size === "lg"
      ? "pl-6 pr-2 py-2 text-base md:text-lg"
      : "pl-5 pr-1.5 py-1.5 text-sm md:text-base";
  const iconSize =
    size === "lg" ? "w-10 h-10 md:w-11 md:h-11" : "w-8 h-8 md:w-9 md:h-9";
  const arrow =
    size === "lg" ? "h-4 w-4 md:h-5 md:w-5" : "h-3.5 w-3.5 md:h-4 md:w-4";

  const cls = `group inline-flex items-center gap-3 ${sizing} rounded-full font-semibold shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`flex items-center justify-center ${iconSize} rounded-full ${iconBg[variant]} group-hover:translate-x-0.5 transition-transform`}
      >
        <ArrowRight className={arrow} />
      </span>
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} onClick={props.onClick} className={cls}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} target={props.target} rel={props.rel} onClick={props.onClick} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={(props as ButtonProps).onClick} className={cls}>
      {inner}
    </button>
  );
};

export default PillButton;