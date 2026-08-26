import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-36 w-full resize-y rounded-lg border border-white/10 bg-zinc-950/70 px-3 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition hover:border-white/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
