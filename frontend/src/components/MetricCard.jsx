export default function MetricCard({ label, value, detail, icon: Icon }) {
  return (
    <div className="card group p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{detail}</p>
        </div>
        {Icon && <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-blue-700 transition group-hover:scale-105"><Icon size={22} /></div>}
      </div>
    </div>
  );
}
