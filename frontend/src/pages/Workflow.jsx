import { ArrowRight, Brain, CheckCircle2, Code2, FileText, LineChart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  ["Upload resume", "AI extracts skills, key projects, strengths, and gaps from your resume.", FileText],
  ["Get a roadmap", "Tech Guru recommends interview tracks for frontend, backend, DSA, aptitude, and coding.", Brain],
  ["Practice deeply", "Solve category-wise questions, timed mocks, focused assessments, and coding problems.", Code2],
  ["Improve with analytics", "Review score, accuracy, time, weak topics, and next actions after every round.", LineChart]
];

export default function Workflow() {
  return (
    <div className="min-h-screen bg-[#f7fdff] text-slate-950">
      <header className="border-b border-cyan-900/10 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 shadow-glow"><Sparkles size={18} /></div>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-xl font-black tracking-tight text-transparent">Tech Guru</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-black shadow-sm" to="/login">Login</Link>
            <Link className="btn-primary" to="/signup">Signup</Link>
          </div>
        </div>
      </header>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_4%,rgba(34,211,238,0.22),transparent_28rem),radial-gradient(circle_at_90%_10%,rgba(124,58,237,0.12),transparent_30rem)]" />
        <section className="relative mx-auto max-w-7xl px-4 py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-700"><Sparkles size={14} /> Workflow</span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">A clear path from resume to interview readiness.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Tech Guru turns preparation into a guided loop: analyze, practice, assess, improve, and repeat with smarter recommendations.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map(([title, text, Icon], index) => (
              <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_22px_80px_rgba(14,165,233,0.1)] transition hover:-translate-y-1 hover:border-cyan-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg"><Icon size={24} /></div>
                <p className="mt-6 text-sm font-black text-cyan-600">STEP 0{index + 1}</p>
                <h2 className="mt-2 text-xl font-black">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-[2rem] border border-cyan-100 bg-white/80 p-6 shadow-[0_25px_90px_rgba(14,165,233,0.12)] backdrop-blur md:p-8">
            <h2 className="text-3xl font-black">Daily prep loop</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["15 min resume-based practice", "20 min mock or assessment", "1 coding problem + feedback"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-cyan-50 p-4 font-bold text-slate-700"><CheckCircle2 className="text-cyan-600" size={20} /> {item}</div>
              ))}
            </div>
            <Link className="btn-primary mt-6" to="/signup">Start workflow <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
