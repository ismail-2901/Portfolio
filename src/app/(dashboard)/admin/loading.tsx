export default function AdminLoading() {
  return (
    <main className="mx-auto max-w-6xl" aria-busy="true">
      <div className="space-y-4" aria-hidden="true">
        <div className="h-4 w-24 animate-pulse rounded bg-cyan-300/20" />
        <div className="h-9 w-64 animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-lg border border-white/10 bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </main>
  );
}
