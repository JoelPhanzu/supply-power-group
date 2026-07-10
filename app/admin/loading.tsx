export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-navy-950">
      <div className="border-b border-border-soft px-6 py-5">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="h-9 w-48 animate-pulse rounded-lg bg-navy-800" />
          <div className="h-9 w-32 animate-pulse rounded-full bg-navy-800" />
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-navy-800" />
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border border-border-soft bg-navy-800" />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-[28px] border border-border-soft bg-navy-800"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
