import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-[6px] border border-rule bg-surface px-3 text-sm text-copy placeholder:text-muted transition hover:border-muted",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
