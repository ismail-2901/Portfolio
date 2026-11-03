export function DatabaseUnavailableNotice({ className = "" }: { className?: string }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`border-l border-accent pl-4 text-body-small text-muted ${className}`.trim()}
    >
      Some portfolio content is temporarily unavailable. Please try again shortly.
    </p>
  );
}
