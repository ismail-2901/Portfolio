"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback or ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex size-8 items-center justify-center rounded-lg border border-rule/60 text-muted hover:text-copy hover:border-rule transition-colors"
      title={copied ? "Copied!" : "Copy image URL"}
      aria-label={copied ? "Copied URL" : "Copy URL"}
    >
      {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
    </button>
  );
}

