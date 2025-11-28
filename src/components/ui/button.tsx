import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[30px] text-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 transition-all duration-500 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[hsl(185,72%,55%)] via-[hsl(185,82%,62%)] to-[hsl(185,92%,68%)] text-[hsl(0,0%,10%)] shadow-glow hover:shadow-glow-hover hover:scale-105 hover:from-[hsl(185,82%,62%)] hover:via-[hsl(185,92%,68%)] hover:to-[hsl(185,100%,75%)] active:shadow-glow-active active:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300",
        outline: "border-2 border-accent bg-transparent text-foreground hover:bg-gradient-to-r hover:from-accent/10 hover:via-accent/20 hover:to-accent/10 hover:shadow-glow hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-12 px-6 text-base",
        lg: "h-16 px-10 text-xl",
        icon: "h-14 w-14",
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
