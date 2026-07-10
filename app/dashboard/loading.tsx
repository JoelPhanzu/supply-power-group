export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-navy-950">
      <div className="border-b border-border-soft px-6 py-5">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <div className="h-9 w-40 animate-pulse rounded-lg bg-navy-800" />
          <div className="h-9 w-32 animate-pulse rounded-full bg-navy-800" />
        </div>
      </div>

      <main className="mx-auto max-w-[1100px] px-6 py-12 md:py-16">
        <div className="mb-10 h-8 w-64 animate-pulse rounded-lg bg-navy-800" />
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
