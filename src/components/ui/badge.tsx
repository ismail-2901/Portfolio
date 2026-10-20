import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] border border-rule bg-surface px-2 py-1 font-mono text-[11px] text-muted",
        className
      )}
      {...props}
    />
  );
}
