import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-cyan-300/30 bg-[linear-gradient(135deg,#22d3ee_0%,#4f46e5_56%,#312e81_100%)] text-white shadow-[0_18px_40px_rgba(79,70,229,0.35)] hover:-translate-y-0.5 hover:border-cyan-200/70 hover:shadow-[0_20px_46px_rgba(34,211,238,0.26)]",
        secondary:
          "border border-white/10 bg-white/[0.04] text-zinc-100 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/[0.07]",
        ghost: "text-zinc-300 hover:bg-white/[0.06] hover:text-white",
        danger:
          "border border-red-400/40 bg-red-500/10 text-red-100 hover:border-red-300/70 hover:bg-red-500/20"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        icon: "size-10 p-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { buttonVariants };
