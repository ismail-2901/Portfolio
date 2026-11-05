import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tight border border-rule bg-surface px-2 py-1 font-sans text-metadata text-muted",
        className
      )}
      {...props}
    />
  );
}
