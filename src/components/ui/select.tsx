import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-lg border border-white/10 bg-zinc-950/70 px-3 text-sm text-zinc-100 transition hover:border-white/20",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
