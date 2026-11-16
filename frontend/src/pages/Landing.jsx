import { ArrowRight, Brain, CheckCircle2, Code2, FileText, LineChart, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/tech-guru-hero.png";

const features = [
  ["AI Resume Intel", "Extract skills, key signals, and custom test plans from your resume.", FileText],
  ["Adaptive Interviews", "Timed mocks, focused assessments, and skill-aware feedback loops.", Brain],
  ["Coding Arena", "Split-screen coding practice with language boilerplates and test cases.", Code2],
  ["Performance OS", "Streaks, trends, strengths, weaknesses, and next best actions.", LineChart]
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7fdff] text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.22),transparent_28rem),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.18),transparent_30rem),linear-gradient(180deg,#f7fdff_0%,#eefaff_48%,#ffffff_100%)]" />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cyan-900/10 bg-white/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 shadow-glow"><Sparkles size={18} /></div>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-xl font-black tracking-tight text-transparent">Tech Guru</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            <a className="transition hover:text-cyan-600" href="#features">Features</a>
            <Link className="transition hover:text-cyan-600" to="/workflow">Workflow</Link>
            <Link className="transition hover:text-cyan-600" to="/contact">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link className="hidden min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg sm:inline-flex" to="/login">Login</Link>
            <Link className="btn-primary" to="/signup">Signup</Link>
          </div>
        </div>
      </header>

      <section className="relative pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-4 pb-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-700 shadow-sm"><Sparkles size={14} /> AI-powered interview coaching</span>
            <h1 className="mt-7 max-w-4xl text-6xl font-black leading-none tracking-tight md:text-8xl">Ace Your <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">Interviews</span> with AI</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">Personalized practice from your resume, realistic mock interviews, coding rounds, and instant AI feedback for engineering and exam aspirants.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="btn-primary px-6 py-3" to="/signup">Get started free <ArrowRight size={18} /></Link>
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg" to="/login"><Play size={17} /> Login</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md" />)}
              </div>
              <p className="text-sm font-semibold text-slate-600">Trusted by <span className="font-black text-slate-950">10,243+</span> learners</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-cyan-300/30 via-blue-300/20 to-violet-300/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-[0_35px_110px_rgba(14,165,233,0.22)] backdrop-blur">
              <img className="aspect-[1.22/1] w-full rounded-[1.5rem] object-cover" src={heroImage} alt="AI interview preparation illustration" />
              <div className="absolute left-8 top-8 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur">
                <p className="text-xs font-black uppercase tracking-wider text-cyan-600">Readiness</p>
                <p className="text-3xl font-black text-slate-950">87%</p>
              </div>
              <div className="absolute bottom-8 right-8 hidden rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur sm:block">
                <div className="flex items-center gap-2 text-sm font-black text-slate-950"><ShieldCheck className="text-cyan-600" size={18} /> Resume matched</div>
                <p className="mt-1 text-xs text-slate-500">React + APIs + DSA roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-600">About platform</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">A full preparation loop for ambitious candidates.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Upload your resume, train on exact skill gaps, run timed tests, solve coding problems, and leave every session with a clear next move.</p>
        </div>
      </section>

      <section id="features" className="relative border-y border-cyan-900/10 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Everything you need to <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">land the job</span></h2>
            <p className="mt-4 text-lg text-slate-600">A complete prep toolkit designed by interviewers, powered by AI.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {features.map(([title, text, Icon], index) => (
              <div key={title} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-[0_24px_80px_rgba(14,165,233,0.16)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg"><Icon className="transition group-hover:scale-110" size={24} /></div>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="relative mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">How it works</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["Analyze your resume", "Practice targeted rounds", "Track and improve"].map((step, index) => (
            <div key={step} className="rounded-[1.5rem] border border-cyan-100 bg-white/75 p-6 shadow-[0_20px_70px_rgba(14,165,233,0.08)] backdrop-blur">
              <p className="text-sm font-black text-cyan-600">0{index + 1}</p>
              <h3 className="mt-3 text-2xl font-black">{step}</h3>
              <p className="mt-3 leading-7 text-slate-600">Tech Guru turns preparation into a focused, measurable daily operating system.</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="relative border-t border-cyan-900/10 px-4 py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 rounded-[1.5rem] border border-cyan-100 bg-white p-6 shadow-[0_20px_70px_rgba(14,165,233,0.1)] md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black">Ready for your next interview?</h2>
            <p className="mt-2 text-slate-600">Contact: guptaayush0545@gmail.com</p>
          </div>
          <Link className="btn-primary" to="/signup">Create account</Link>
        </div>
      </footer>
    </div>
  );
}
