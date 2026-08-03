export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Page header skeleton */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-48 rounded-xl" style={{ background: "var(--surface-2)" }} />
          <div className="h-4 w-72 rounded-lg" style={{ background: "var(--surface-2)" }} />
        </div>
        <div className="h-9 w-28 rounded-xl" style={{ background: "var(--surface-2)" }} />
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-[20px] p-5 flex flex-col gap-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl" style={{ background: "var(--surface-2)" }} />
              <div className="h-5 w-16 rounded-full" style={{ background: "var(--surface-2)" }} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 rounded-lg" style={{ background: "var(--surface-2)" }} />
              <div className="h-7 w-32 rounded-lg" style={{ background: "var(--surface-2)" }} />
            </div>
            <div className="h-12 rounded-lg" style={{ background: "var(--surface-2)" }} />
            <div className="h-3 w-36 rounded-lg" style={{ background: "var(--surface-2)" }} />
          </div>
        ))}
      </div>

      {/* Wide card */}
      <div className="rounded-[20px] p-6 flex flex-col gap-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="h-5 w-40 rounded-lg" style={{ background: "var(--surface-2)" }} />
        <div className="h-48 rounded-xl" style={{ background: "var(--surface-2)" }} />
      </div>

      {/* Table skeleton */}
      <div className="rounded-[20px] overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="h-14 px-6 flex items-center border-b"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
          <div className="h-4 w-36 rounded-lg" style={{ background: "var(--border)" }} />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 px-6 flex items-center gap-4 border-b"
            style={{ borderColor: "var(--border)" }}>
            <div className="h-4 flex-1 rounded-lg" style={{ background: "var(--surface-2)" }} />
            <div className="h-4 w-20 rounded-lg" style={{ background: "var(--surface-2)" }} />
            <div className="h-4 w-16 rounded-lg" style={{ background: "var(--surface-2)" }} />
            <div className="h-6 w-16 rounded-full" style={{ background: "var(--surface-2)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
