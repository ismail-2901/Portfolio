import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-small px-5 text-label font-medium transition duration-interactive ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-accent bg-accent text-canvas hover:bg-copy hover:border-copy",
        secondary: "border border-control-border bg-surface text-copy hover:border-control-hover",
        ghost: "text-muted hover:text-copy",
        danger:
          "border border-danger/40 bg-danger-surface/10 text-danger-strong hover:border-danger/70 hover:bg-danger-surface/20"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-11 px-4 text-label",
        icon: "size-11 p-0"
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
