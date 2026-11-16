import { CheckCircle2, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, questions } from "../data/mockData";

export default function Practice() {
  const [category, setCategory] = useState("Technical");
  const [subCategory, setSubCategory] = useState("Java");
  const [difficulty, setDifficulty] = useState("All");
  const [revealed, setRevealed] = useState({});
  const filtered = useMemo(() => questions.filter((q) => q.category === category && q.subCategory === subCategory && (difficulty === "All" || q.difficulty === difficulty)), [category, difficulty, subCategory]);
  const changeCategory = (next) => { setCategory(next); setSubCategory(categories[next][0]); setRevealed({}); };
  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <span className="badge border-blue-100 bg-blue-50 text-blue-700">Practice Bank</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Train by category, not random noise</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Each track has distinct questions so candidates can build targeted mastery.</p>
      </div>
      <div className="card p-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">{Object.keys(categories).map((c) => <button key={c} className={`rounded-xl px-4 py-2 text-sm font-black transition ${category === c ? "bg-slate-800 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"}`} onClick={() => changeCategory(c)}>{c}</button>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500">Language / Topic</span>
            <div className="relative">
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-bold text-slate-700 outline-none transition duration-200 hover:border-blue-200 hover:bg-blue-50/50 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              >
                {categories[category].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500">Difficulty</span>
            <div className="relative">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-bold text-slate-700 outline-none transition duration-200 hover:border-blue-200 hover:bg-blue-50/50 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              >
                {["All", "Easy", "Medium", "Hard"].map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </label>
        </div>
      </div>
      <div className="grid gap-4">
        {filtered.map((q, idx) => (
          <div className="card p-5 transition hover:border-blue-200" key={q.id}>
            <div className="mb-3 flex flex-wrap gap-2"><span className="badge">{q.difficulty}</span><span className="badge border-blue-100 bg-blue-50 text-blue-700">{q.subCategory}</span></div>
            <h2 className="text-xl font-black leading-snug">{idx + 1}. {q.question}</h2>
            <div className="mt-4 grid gap-2 md:grid-cols-2">{q.options.map((option) => <button key={option} className={`rounded-2xl border p-3 text-left text-sm font-bold transition ${revealed[q.id] && option === q.correctAnswer ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"}`} onClick={() => setRevealed({ ...revealed, [q.id]: option })}>{option}</button>)}</div>
            {!revealed[q.id] && <p className="mt-3 text-sm text-slate-500">Select an option to reveal the correct answer and explanation.</p>}
            {revealed[q.id] && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm animate-fade-up"><div className="flex items-center gap-2 font-black text-emerald-700"><CheckCircle2 size={16} /> {q.correctAnswer}</div><p className="mt-2 text-slate-600">{q.explanation}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
