import { Download, RotateCcw, Target, Trophy, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import PerformanceChart from "../components/PerformanceChart";

function byTopic(answers = []) {
  return Object.values(answers.reduce((acc, item) => {
    const key = item.topic || "General";
    acc[key] ||= { topic: key, total: 0, correct: 0 };
    acc[key].total += 1;
    if (item.correct) acc[key].correct += 1;
    return acc;
  }, {})).map((item) => ({ ...item, score: Math.round((item.correct / item.total) * 100) }));
}

export default function Feedback() {
  const { state } = useLocation();
  const total = state?.total ?? 15;
  const score = state?.score ?? 11;
  const accuracy = state?.accuracy ?? Math.round((score / total) * 100);
  const attempted = state?.attempted ?? score + 2;
  const skipped = state?.skipped ?? total - attempted;
  const wrong = state?.wrong ?? Math.max(0, attempted - score);
  const minutes = Math.max(1, Math.round((state?.timeTaken ?? 420) / 60));
  const topicRows = byTopic(state?.answers || []);
  const weakTopics = topicRows.filter((item) => item.score < 60).map((item) => item.topic);
  const strongTopics = topicRows.filter((item) => item.score >= 75).map((item) => item.topic);
  const chartData = topicRows.length ? topicRows.slice(0, 6).map((item) => ({ label: item.topic, score: item.score })) : [{ label: "Accuracy", score: accuracy }, { label: "Speed", score: Math.max(40, 100 - minutes * 4) }, { label: "Focus", score: 82 }];
  const stats = [["Overall Score", `${score}/${total}`, Trophy], ["Accuracy", `${accuracy}%`, Target], ["Attempted", attempted, Zap], ["Time Taken", `${minutes} min`, Target]];

  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <span className="badge border-blue-100 bg-blue-50 text-blue-700">Detailed Report</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Mock test performance report</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Overall score, accuracy, time, topic analysis, difficulty performance, and AI-style recommendations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">{stats.map(([label, value, Icon]) => <div className="card p-5" key={label}><Icon className="text-blue-700" size={22} /><p className="mt-3 text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>)}</div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-6">
          <h2 className="panel-title">Answer Summary</h2>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-2xl font-black">{score}</p><p className="text-xs font-bold text-slate-500">Correct</p></div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4"><p className="text-2xl font-black">{wrong}</p><p className="text-xs font-bold text-slate-500">Wrong</p></div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-2xl font-black">{skipped}</p><p className="text-xs font-bold text-slate-500">Skipped</p></div>
          </div>
          <h2 className="mt-7 panel-title">Difficulty Analysis</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">{state?.difficulty || "Medium"} questions landed at {accuracy}% accuracy. Move up one difficulty after two tests above 80%.</p>
        </div>

        <div className="card p-6">
          <h2 className="panel-title">Topic Wise Analysis</h2>
          <div className="mt-4 space-y-3">{(topicRows.length ? topicRows : [{ topic: state?.topic || "General", total, correct: score, score: accuracy }]).map((item) => <div key={item.topic}><div className="flex justify-between text-sm font-bold"><span>{item.topic}</span><span>{item.correct}/{item.total} - {item.score}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${item.score}%` }} /></div></div>)}</div>
        </div>
      </div>

      <PerformanceChart data={chartData} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6"><h2 className="panel-title">Weak Topics</h2><div className="mt-4 flex flex-wrap gap-2">{(weakTopics.length ? weakTopics : ["Revise missed concepts"]).map((topic) => <span className="badge border-red-200 bg-red-50 text-red-700" key={topic}>{topic}</span>)}</div></div>
        <div className="card p-6"><h2 className="panel-title">Strong Topics</h2><div className="mt-4 flex flex-wrap gap-2">{(strongTopics.length ? strongTopics : ["Build consistency"]).map((topic) => <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700" key={topic}>{topic}</span>)}</div></div>
        <div className="card p-6"><h2 className="panel-title">Improvement Suggestions</h2><p className="mt-4 text-sm leading-6 text-slate-600">{accuracy >= 75 ? "You are showing strong readiness. Keep pressure-testing weak topics with timed rounds." : "Focus on accuracy first, then speed. Review explanations and retake the same topic before increasing difficulty."}</p></div>
      </div>

      <div className="card p-6">
        <h2 className="panel-title">Recommended Learning Path</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Review incorrect explanations", "Practice weak topics", "Retake timed mock"].map((item, index) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={item}><p className="text-xs font-black text-blue-700">Step {index + 1}</p><p className="mt-2 font-bold">{item}</p></div>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/app/practice">Practice Weak Topics</Link>
          <Link className="btn-secondary" to="/app/mock-tests"><RotateCcw size={16} /> Retake Test</Link>
          <button className="btn-secondary" onClick={() => window.print()}><Download size={16} /> Download PDF Report</button>
        </div>
      </div>
    </div>
  );
}
