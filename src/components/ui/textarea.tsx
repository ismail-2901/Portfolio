import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-36 w-full resize-y rounded-[6px] border border-rule bg-surface px-3 py-3 text-sm text-copy placeholder:text-muted transition hover:border-muted",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
