export default function SiteLoading() {
  return (
    <main className="container-shell flex min-h-screen items-center justify-center pt-32" aria-busy="true">
      <div className="w-full max-w-3xl space-y-5" aria-hidden="true">
        <div className="h-4 w-24 animate-pulse rounded bg-cyan-300/20" />
        <div className="h-16 w-full animate-pulse rounded bg-white/10" />
        <div className="h-16 w-4/5 animate-pulse rounded bg-white/10" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
      </div>
    </main>
  );
}
