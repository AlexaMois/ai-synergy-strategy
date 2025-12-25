import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[30%] text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark shadow-[0_4px_12px_hsl(192_63%_57%/0.3)] hover:shadow-[0_6px_16px_hsl(192_63%_57%/0.4)] hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_4px_12px_hsl(0_84%_60%/0.3)] hover:shadow-[0_6px_16px_hsl(0_84%_60%/0.4)] hover:-translate-y-0.5",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted shadow-[0_2px_8px_hsl(210_10%_40%/0.1)] hover:shadow-[0_4px_12px_hsl(210_10%_40%/0.15)] hover:-translate-y-0.5",
        secondary: "bg-muted text-foreground hover:bg-muted/80 shadow-[0_2px_8px_hsl(210_10%_40%/0.1)] hover:shadow-[0_4px_12px_hsl(210_10%_40%/0.15)] hover:-translate-y-0.5",
        ghost: "hover:bg-muted hover:text-foreground hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
