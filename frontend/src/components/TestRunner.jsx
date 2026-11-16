import { AlertTriangle, Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Clock, Flag, SkipForward, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, questions as bank } from "../data/mockData";

const counts = [15, 20, 25, 30];

export default function TestRunner({ assessment = false }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Technical");
  const [topic, setTopic] = useState(categories.Technical[0]);
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(15);
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [skills, setSkills] = useState("JavaScript, React, DSA");
  const [started, setStarted] = useState(assessment);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const [skipped, setSkipped] = useState({});

  const activeQuestions = useMemo(() => {
    const topicPool = bank.filter((q) => q.category === category && q.subCategory === topic && q.difficulty === difficulty);
    const categoryPool = bank.filter((q) => q.category === category && q.subCategory === topic);
    const fallbackPool = bank.filter((q) => q.category === category);
    const unique = new Map();
    [...topicPool, ...categoryPool, ...fallbackPool].forEach((item) => unique.set(item.id, item));
    return Array.from(unique.values()).slice(0, count);
  }, [category, count, difficulty, topic]);

  const [seconds, setSeconds] = useState(count * 60);
  const question = activeQuestions[index];
  const answeredCount = Object.keys(answers).length;
  const currentScore = activeQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
  const progress = activeQuestions.length ? Math.round(((index + 1) / activeQuestions.length) * 100) : 0;

  const submit = () => {
    const details = activeQuestions.map((q) => ({
      questionId: q.id,
      question: q.question,
      topic: q.subCategory,
      difficulty: q.difficulty,
      answer: answers[q.id] || "",
      correctAnswer: q.correctAnswer,
      correct: answers[q.id] === q.correctAnswer,
      skipped: !answers[q.id]
    }));
    const score = details.filter((item) => item.correct).length;
    const skippedCount = details.filter((item) => item.skipped).length;
    const wrong = details.length - score - skippedCount;
    const accuracy = details.length ? Math.round((score / details.length) * 100) : 0;
    navigate("/app/feedback", {
      state: {
        score,
        total: activeQuestions.length,
        accuracy,
        attempted: activeQuestions.length - skippedCount,
        skipped: skippedCount,
        wrong,
        correct: score,
        category,
        topic,
        difficulty,
        timeTaken: count * 60 - seconds,
        answers: details
      }
    });
  };

  useEffect(() => {
    if (!started) return undefined;
    const timer = setInterval(() => setSeconds((current) => {
      if (current <= 1) {
        clearInterval(timer);
        setTimeout(submit, 0);
        return 0;
      }
      return current - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [started, answers, activeQuestions.length, seconds]);

  useEffect(() => {
    setTopic(categories[category][0]);
  }, [category]);

  useEffect(() => {
    setSeconds(count * 60);
    setIndex(0);
    setAnswers({});
    setReview({});
    setSkipped({});
  }, [count, category, topic, difficulty]);

  if (!started) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="aurora-card p-6 md:p-8">
          <span className="badge border-blue-100 bg-blue-50 text-blue-700">Mock Test Studio</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">Configure a professional timed assessment</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Choose category, topic, difficulty, question count, and timer. One question automatically equals one minute.</p>
        </div>
        {assessment && <div className="card grid gap-4 p-5 md:grid-cols-2"><label className="text-sm font-bold text-slate-700">Job Role<input className="input mt-2" value={jobRole} onChange={(event) => setJobRole(event.target.value)} /></label><label className="text-sm font-bold text-slate-700">Skills<input className="input mt-2" value={skills} onChange={(event) => setSkills(event.target.value)} /></label></div>}
        <div className="card grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-5">
          <label className="text-sm font-bold text-slate-700">Category<select className="input mt-2" value={category} onChange={(event) => setCategory(event.target.value)}>{Object.keys(categories).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-700">Topic<select className="input mt-2" value={topic} onChange={(event) => setTopic(event.target.value)}>{categories[category].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-700">Difficulty<select className="input mt-2" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>{["Easy", "Medium", "Hard"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-700">Questions<select className="input mt-2" value={count} onChange={(event) => setCount(Number(event.target.value))}>{counts.map((item) => <option key={item} value={item}>{item} Questions</option>)}</select></label>
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4"><p className="text-xs font-black uppercase text-blue-700">Timer</p><p className="mt-2 text-3xl font-black text-slate-900">{count} min</p></div>
        </div>
        <button className="btn-primary w-full md:w-auto" onClick={() => setStarted(true)}><Clock size={17} /> Start {count} Question Test</button>
      </div>
    );
  }

  return (
    <div className={assessment ? "min-h-screen bg-[#f7f9fc] p-4 text-slate-800 md:p-8" : ""}>
      <div className="mx-auto max-w-7xl">
        <div className="aurora-card mb-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-blue-700">Question {index + 1} of {activeQuestions.length}</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight">{category} / {topic}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black"><Trophy size={16} className="inline" /> Score {currentScore}</span>
              <span className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-lg font-black text-blue-800">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="card p-5 md:p-7">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="badge border-blue-100 bg-blue-50 text-blue-700">{question?.subCategory}</span>
              <span className="badge">{question?.difficulty}</span>
              {seconds < 60 && <span className="badge border-red-300/25 bg-red-500/15 text-red-100"><AlertTriangle size={13} /> Timer ending</span>}
            </div>
            <h2 className="text-2xl font-black leading-snug tracking-tight md:text-3xl">{question?.question}</h2>
            <div className="mt-7 grid gap-3">
              {question?.options.map((option) => (
                <button key={option} className={`rounded-2xl border p-4 text-left font-bold transition duration-200 hover:-translate-y-0.5 ${answers[question.id] === option ? "border-blue-300 bg-blue-50 text-slate-900 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"}`} onClick={() => { setAnswers({ ...answers, [question.id]: option }); setSkipped({ ...skipped, [question.id]: false }); }}>
                  <span className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full border ${answers[question.id] === option ? "border-blue-600 bg-blue-600" : "border-slate-300"}`} />{option}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="card p-4">
            <h2 className="panel-title">Question Palette</h2>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {activeQuestions.map((item, itemIndex) => {
                const active = itemIndex === index;
                const answered = answers[item.id];
                const marked = review[item.id];
                const wasSkipped = skipped[item.id];
                return <button key={item.id} className={`h-10 rounded-xl border text-sm font-black transition ${active ? "border-blue-300 bg-blue-50 text-blue-800" : marked ? "border-slate-300 bg-slate-100 text-slate-700" : answered ? "border-emerald-200 bg-emerald-50 text-emerald-700" : wasSkipped ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 bg-white text-slate-500"}`} onClick={() => setIndex(itemIndex)}>{itemIndex + 1}</button>;
              })}
            </div>
            <div className="mt-5 grid gap-2 text-sm text-slate-400">
              <p><CheckCircle2 size={14} className="inline text-emerald-200" /> Answered: {answeredCount}</p>
              <p><Flag size={14} className="inline text-slate-500" /> Review: {Object.values(review).filter(Boolean).length}</p>
              <p><SkipForward size={14} className="inline text-amber-200" /> Skipped: {Object.values(skipped).filter(Boolean).length}</p>
            </div>
          </aside>
        </div>

        <div className="sticky bottom-0 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_-14px_40px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button className="btn-secondary" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}><ChevronLeft size={16} /> Previous</button>
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary" onClick={() => { setSkipped({ ...skipped, [question.id]: true }); setIndex((value) => Math.min(activeQuestions.length - 1, value + 1)); }}><SkipForward size={16} /> Skip</button>
              <button className="btn-secondary" onClick={() => setReview({ ...review, [question.id]: !review[question.id] })}><Bookmark size={16} /> Mark for Review</button>
            </div>
            <button className="btn-primary" onClick={index === activeQuestions.length - 1 ? submit : () => setIndex((value) => Math.min(activeQuestions.length - 1, value + 1))}>{index === activeQuestions.length - 1 ? "Submit Test" : "Next"} <ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
