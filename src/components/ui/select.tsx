import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-small border border-control-border bg-surface px-3 text-body-small text-copy transition duration-interactive hover:border-control-hover",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
