import type { SVGProps } from "react";

/** Иконка мессенджера MAX (фирменный знак) */
const MaxIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="max-icon-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7B5CFF" />
        <stop offset="100%" stopColor="#3E7BFF" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="url(#max-icon-gradient)" />
    <path
      d="M12 34V15.5c0-1 1.3-1.5 2-.7l8.5 9.8c.8.9 2.2.9 3 0l8.5-9.8c.7-.8 2-.3 2 .7V34"
      fill="none"
      stroke="#fff"
      strokeWidth="4.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MaxIcon;
