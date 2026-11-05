import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-small border border-control-border bg-canvas/60 px-3 text-body md:text-body-small text-copy placeholder:text-muted transition duration-interactive hover:border-control-hover",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
