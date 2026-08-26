import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-lg border border-white/10 bg-zinc-950/70 px-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition hover:border-white/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
