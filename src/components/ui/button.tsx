import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-[6px] px-5 text-sm font-medium transition duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-accent bg-[var(--color-accent)] text-canvas hover:bg-white hover:border-white",
        secondary: "border border-rule bg-surface text-copy hover:border-muted",
        ghost: "text-muted hover:text-copy",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const buttonClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      const child = React.Children.only(children);

      if (!React.isValidElement<{ className?: string }>(child)) {
        throw new Error("Button with asChild requires a single React element.");
      }

      return React.cloneElement(child, {
        ...props,
        className: cn(buttonClassName, child.props.className)
      });
    }

    return (
      <button className={buttonClassName} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
