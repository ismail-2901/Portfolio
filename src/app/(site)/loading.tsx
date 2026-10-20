export default function SiteLoading() {
  return (
    <div className="container-shell flex min-h-screen items-center justify-center" role="status" aria-live="polite" aria-busy="true">
      <div className="w-full max-w-3xl space-y-5" aria-hidden="true">
        <div className="h-4 w-24 animate-pulse rounded-[2px] bg-accent/15" />
        <div className="h-16 w-full animate-pulse rounded-[2px] bg-surface-raised" />
        <div className="h-16 w-4/5 animate-pulse rounded-[2px] bg-surface-raised" />
        <div className="h-5 w-2/3 animate-pulse rounded-[2px] bg-surface-raised" />
      </div>
    </div>
  );
}
