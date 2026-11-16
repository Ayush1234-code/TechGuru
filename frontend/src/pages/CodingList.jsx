import { CheckCircle2, Circle, Filter, Search, TerminalSquare } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { codingProblems } from "../data/codingBank";

const codingBlueprint = codingProblems.reduce((acc, problem) => {
  acc[problem.topic] = (acc[problem.topic] || 0) + 1;
  return acc;
}, {});

const color = {
  Easy: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Hard: "border-red-200 bg-red-50 text-red-700"
};

export default function CodingList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const filtered = useMemo(() => codingProblems.filter((problem) => {
    const haystack = `${problem.title} ${problem.topic} ${problem.tags.join(" ")}`.toLowerCase();
    const matchesSearch = haystack.includes(query.toLowerCase());
    const matchesCategory = category === "All" || problem.topic === category || problem.tags.includes(category);
    const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  }), [category, difficulty, query]);
  const solved = codingProblems.filter((problem) => problem.solved).length;

  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <span className="badge border-blue-100 bg-blue-50 text-blue-700"><TerminalSquare size={14} /> Coding Practice</span>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">LeetCode-style coding practice</h1>
            <p className="mt-3 max-w-2xl text-slate-600">{codingProblems.length} unique interview-focused DSA problems with visible tests, hidden tests, boilerplates, and judge feedback.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-2xl font-black">{codingProblems.length}</p><p className="text-xs font-bold text-slate-500">Problems</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-2xl font-black">{Object.keys(codingBlueprint).length}</p><p className="text-xs font-bold text-slate-500">Tracks</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-2xl font-black">{solved}</p><p className="text-xs font-bold text-slate-500">Solved</p></div>
          </div>
        </div>
      </div>

      <div className="card grid gap-3 p-4 lg:grid-cols-[1fr_220px_180px]">
        <div className="relative"><Search className="absolute left-3 top-3.5 text-slate-500" size={18} /><input className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search problems by title or topic" /></div>
        <label className="relative"><Filter className="absolute left-3 top-3.5 text-slate-500" size={18} /><select className="input pl-10" value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{Object.keys(codingBlueprint).map((item) => <option key={item}>{item}</option>)}</select></label>
        <select className="input" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>{["All", "Easy", "Medium", "Hard"].map((item) => <option key={item}>{item}</option>)}</select>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-[44px_1fr_112px_92px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase text-slate-500 md:grid-cols-[54px_1fr_130px_110px_96px]">
          <span>Status</span><span>Title</span><span>Difficulty</span><span className="hidden md:block">Acceptance</span><span>Solve</span>
        </div>
        {filtered.map((problem) => (
          <Link key={problem.id} to={`/app/coding/${problem.id}`} className="grid grid-cols-[44px_1fr_112px_92px] gap-3 border-b border-slate-100 px-4 py-4 transition hover:bg-blue-50 md:grid-cols-[54px_1fr_130px_110px_96px]">
            <div>{problem.solved ? <CheckCircle2 className="text-emerald-600" size={20} /> : <Circle className="text-slate-300" size={20} />}</div>
            <div className="min-w-0">
              <h2 className="truncate font-black text-slate-900">{problem.id}. {problem.title}</h2>
              <p className="mt-1 text-xs font-black uppercase tracking-wider text-slate-500">{problem.topic}</p>
              <div className="mt-2 flex flex-wrap gap-2">{problem.tags.slice(0, 3).map((tag) => <span className="badge" key={tag}>{tag}</span>)}</div>
            </div>
            <span className={`badge self-start ${color[problem.difficulty]}`}>{problem.difficulty}</span>
            <span className="hidden text-sm font-bold text-slate-400 md:block">{problem.acceptance}%</span>
            <span className="text-sm font-black text-blue-700">Open</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
