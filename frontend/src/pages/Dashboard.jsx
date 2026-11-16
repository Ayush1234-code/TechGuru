import { ArrowRight, Brain, CalendarCheck, Code2, FileText, Flame, History, LineChart, Target, Trophy, User, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import PerformanceChart from "../components/PerformanceChart";
import { useAuth } from "../context/AuthContext";

const quick = [
  ["/app/resume", "Upload Resume", FileText],
  ["/app/practice", "Practice Questions", Brain],
  ["/app/mock-tests", "Mock Tests", Target],
  ["/assessment", "Assessment Mode", Trophy],
  ["/app/coding", "Coding Practice", Code2],
  ["/app/history", "History", History],
  ["/app/profile", "Profile", User]
];

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="aurora-card glass-grid p-6 md:p-8">
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <span className="badge border-blue-100 bg-blue-50 text-blue-700"><Zap size={14} /> Today's goal</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Welcome back, {user?.name?.split(" ")[0] || "Candidate"}.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Build one focused interview habit today: finish a timed set, review misses, and practice the next recommended skill.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-600">Progress</p>
              <span className="badge border-green-100 bg-green-50 text-green-700">+12% this week</span>
            </div>
            <p className="mt-4 text-6xl font-black text-slate-900">87%</p>
            <div className="mt-5 h-3 rounded-full bg-slate-200">
              <div className="h-full w-[87%] rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Daily streak" value={`${user?.streak || 7} days`} detail="Keep the chain alive" icon={CalendarCheck} />
        <MetricCard label="Average score" value={`${user?.averageScore || 82}%`} detail="Across recent attempts" icon={LineChart} />
        <MetricCard label="Tests completed" value={user?.testsCompleted || 14} detail="Mock and assessment rounds" icon={Trophy} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <PerformanceChart />
        <div className="card p-5">
          <h2 className="panel-title">Recommended Practice</h2>
          <div className="mt-4 space-y-3">{["React Hooks Medium", "Node APIs Medium", "DSA Arrays Easy"].map((test) => <div key={test} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold transition hover:border-blue-200 hover:bg-blue-50"><span>{test}</span><ArrowRight className="text-blue-700 transition group-hover:translate-x-1" size={16} /></div>)}</div>
          <h2 className="mt-6 panel-title">Daily Streak</h2>
          <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700"><Flame size={18} /><span className="font-black">7 day streak active</span></div>
            <p className="mt-2 text-sm text-slate-600">Finish one coding problem to complete today's goal.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{["React", "MongoDB", "Arrays", "Auth"].map((topic) => <span key={topic} className="badge">{topic}</span>)}</div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quick.map(([to, label, Icon]) => <Link key={label} to={to} className="card group flex items-center justify-between gap-3 p-4 font-bold transition duration-200 hover:-translate-y-1 hover:border-blue-200"><span className="flex items-center gap-3"><Icon className="text-blue-700 transition group-hover:scale-110" size={21} />{label}</span><ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" size={16} /></Link>)}
      </div>
    </div>
  );
}
