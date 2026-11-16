import { Award, Code2, Flame, Mail, Trophy, User } from "lucide-react";
import MetricCard from "../components/MetricCard";
import PerformanceChart from "../components/PerformanceChart";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-800 text-4xl font-black text-white shadow-sm">{user?.name?.[0] || "A"}</div>
            <div>
              <span className="badge border-blue-100 bg-blue-50 text-blue-700">Candidate Profile</span>
              <h1 className="mt-3 text-4xl font-black tracking-tight">{user?.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-slate-500"><Mail size={16} /> {user?.email}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-500"><Code2 size={16} /> Preferred language</p>
            <p className="mt-2 text-2xl font-black">{user?.preferredLanguage || "JavaScript"}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Current streak" value={`${user?.streak || 7} days`} detail="Consistency badge active" icon={Flame} />
        <MetricCard label="Average score" value={`${user?.averageScore || 82}%`} detail="Across tests" icon={Trophy} />
        <MetricCard label="Tests completed" value={user?.testsCompleted || 14} detail="Mocks and assessments" icon={Award} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card p-6">
          <h2 className="panel-title">Skills</h2><div className="mt-4 flex flex-wrap gap-2">{(user?.skills || ["React", "Node.js", "DSA"]).map((skill) => <span className="badge border-blue-100 bg-blue-50 text-blue-700" key={skill}>{skill}</span>)}</div>
          <h2 className="mt-7 panel-title">Achievements</h2><div className="mt-4 grid gap-3">{["7-day streak", "Frontend finisher", "API builder"].map((badge) => <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 font-bold" key={badge}><Award size={17} className="text-blue-700" />{badge}</div>)}</div>
          <h2 className="mt-7 panel-title">Profile summary</h2><p className="mt-3 text-sm leading-6 text-slate-500">Strong full-stack foundation with growing DSA consistency. Recommended focus: timed graph and API-auth rounds.</p>
        </div>
        <PerformanceChart />
      </div>
    </div>
  );
}
