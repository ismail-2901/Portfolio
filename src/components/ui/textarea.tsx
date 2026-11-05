import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-36 w-full resize-y rounded-small border border-control-border bg-canvas/60 px-3 py-3 text-body md:text-body-small text-copy placeholder:text-muted transition duration-interactive hover:border-control-hover",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
