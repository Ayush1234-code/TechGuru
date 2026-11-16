import { BarChart3, BookOpen, Code2, Layers, ListChecks, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { codingProblems } from "../data/codingBank";
import { categories, questions } from "../data/mockData";
import { api } from "../services/api";

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    let active = true;
    api("/auth/admin/stats")
      .then((data) => {
        if (active) setStats(data);
      })
      .catch((error) => {
        if (active) setStatsError(error.message || "Failed to load live stats");
      });
    return () => {
      active = false;
    };
  }, []);

  const modules = [
    { label: "Questions", value: questions.length, icon: BookOpen },
    { label: "Coding Problems", value: codingProblems.length, icon: Code2 },
    { label: "Mock Tests", value: 4, icon: ListChecks },
    { label: "Categories", value: Object.keys(categories).length, icon: Layers },
    { label: "Users", value: stats ? stats.users : "Live", icon: Users },
    { label: "Attempts", value: stats ? stats.attempts : "Ready", icon: BarChart3 }
  ];

  const difficultyStats = ["Easy", "Medium", "Hard"].map((difficulty) => ({
    difficulty,
    count: questions.filter((question) => question.difficulty === difficulty).length + codingProblems.filter((problem) => problem.difficulty === difficulty).length
  }));

  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <span className="badge border-blue-100 bg-blue-50 text-blue-700">Settings</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Content and analytics control center</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Manage questions, coding problems, mock tests, categories, difficulty levels, users, and analytics from one operational surface.</p>
        {statsError && <p className="mt-3 text-sm font-bold text-red-600">Live stats unavailable: {statsError}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map(({ label, value, icon: Icon }) => <div className="card p-5" key={label}><Icon className="text-blue-700" size={22} /><p className="mt-4 text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p><button className="btn-secondary mt-4 w-full">Manage {label}</button></div>)}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card p-6">
          <h2 className="panel-title">Difficulty Distribution</h2>
          <div className="mt-5 space-y-4">{difficultyStats.map((item) => <div key={item.difficulty}><div className="flex justify-between text-sm font-bold"><span>{item.difficulty}</span><span>{item.count}</span></div><div className="mt-2 h-2 rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(100, item.count / 10)}%` }} /></div></div>)}</div>
        </div>
        <div className="card p-6">
          <h2 className="panel-title">Category Coverage</h2>
          <div className="mt-4 grid gap-3">{Object.keys(categories).map((category) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={category}><div className="flex justify-between gap-3"><p className="font-black">{category}</p><p className="text-sm font-bold text-blue-700">{categories[category].length} topics</p></div><p className="mt-2 text-sm text-slate-500">{categories[category].join(", ")}</p></div>)}</div>
        </div>
      </div>
    </div>
  );
}
