export default function PerformanceChart({ data }) {
  const points = data?.length ? data : [
    { label: "HTML", score: 68 },
    { label: "React", score: 82 },
    { label: "APIs", score: 74 },
    { label: "DSA", score: 61 },
    { label: "Mock", score: 88 }
  ];
  return (
    <div className="card p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="panel-title">Performance Graph</h2>
        <span className="badge border-blue-100 bg-blue-50 text-blue-700">Live trend</span>
      </div>
      <div className="flex h-64 items-end gap-3">
        {points.map((point) => (
          <div key={point.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-48 w-full items-end rounded-xl border border-slate-200 bg-slate-50 p-1.5">
              <div className="animate-grow-bar w-full rounded-lg bg-blue-500 transition-all" style={{ height: `${point.score}%` }} />
            </div>
            <span className="w-full truncate text-center text-xs font-bold text-slate-400">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
