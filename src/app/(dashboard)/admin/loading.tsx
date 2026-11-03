export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl" aria-busy="true">
      <div className="space-y-4" aria-hidden="true">
        <div className="h-4 w-24 animate-pulse rounded bg-accent/20" />
        <div className="h-9 w-64 animate-pulse rounded bg-copy/10" />
        <div className="grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-panel border border-rule bg-copy/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
