import { History as HistoryIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api";

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}

export default function History() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api("/tests/history")
      .then((data) => {
        if (!active) return;
        setAttempts(data.attempts || []);
        setLoading(false);
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message || "Failed to load history");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <span className="badge border-blue-100 bg-blue-50 text-blue-700">History</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Past attempts timeline</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Review test date, category, score, difficulty, and details.</p>
      </div>
      <div className="card overflow-hidden">
        <div className="hidden grid-cols-5 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-500 md:grid"><span>Date</span><span>Category</span><span>Score</span><span>Difficulty</span><span>Type</span></div>
        {loading && <div className="flex items-center justify-center gap-3 p-10 text-sm font-bold text-slate-500"><span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" /> Loading your attempts...</div>}
        {!loading && error && <div className="p-10 text-center text-sm font-bold text-red-600">{error}</div>}
        {!loading && !error && !attempts.length && (
          <div className="p-10 text-center text-slate-500">
            <HistoryIcon size={26} className="mx-auto mb-3 text-slate-300" />
            No attempts yet. Take a mock test or assessment to see your results here.
          </div>
        )}
        {!loading && !error && attempts.map((attempt) => (
          <div key={attempt._id} className="grid gap-3 border-b border-slate-100 px-4 py-4 text-sm last:border-b-0 md:grid-cols-5">
            <span>{formatDate(attempt.createdAt)}</span>
            <span>{attempt.category}</span>
            <span className="font-black text-blue-700">{attempt.score}/{attempt.answers?.length ?? attempt.score} · {attempt.accuracy}%</span>
            <span>{attempt.difficulty}</span>
            <span className="capitalize text-slate-500">{attempt.testType}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
