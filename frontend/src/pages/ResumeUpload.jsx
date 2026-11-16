import { FileUp, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalysis({ skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "JavaScript"], keyPoints: ["Full-stack project portfolio", "API integration experience", "Frontend component design"], tests: ["Frontend React Medium", "Backend APIs Medium", "DSA Arrays Easy"] });
      setLoading(false);
    }, 700);
  };
  return (
    <div className="space-y-6">
      <div className="aurora-card p-6 md:p-8">
        <span className="badge border-blue-100 bg-blue-50 text-blue-700"><Wand2 size={14} /> Resume AI</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Turn your resume into a prep roadmap</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Upload PDF or DOC, extract skills, and launch recommended assessments from your actual experience.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-6">
          <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-slate-50 p-6 text-center transition hover:border-blue-300 hover:bg-blue-50">
            <FileUp className="text-blue-700" size={46} />
            <span className="mt-4 text-xl font-black">Drop your resume here</span>
            <span className="mt-2 text-sm text-slate-500">PDF, DOC, or DOCX. Preview and AI extraction appear instantly.</span>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0])} />
          </label>
          {file && <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-black">{file.name}</p><p className="text-sm text-slate-500">{Math.round(file.size / 1024)} KB ready for analysis</p></div>}
          <button className="btn-primary mt-5 w-full" disabled={!file || loading} onClick={analyze}><Sparkles size={16} /> {loading ? "Analyzing..." : "Extract skills with AI"}</button>
        </div>
        <div className="card p-6">
          <h2 className="panel-title">AI Insights</h2>
          {!analysis ? <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Upload a resume to see extracted skills, key points, and recommended assessments.</div> : (
            <div className="mt-5 space-y-5 animate-fade-up">
              <div><h3 className="font-black">Extracted Skills</h3><div className="mt-3 flex flex-wrap gap-2">{analysis.skills.map((skill) => <span className="badge border-blue-100 bg-blue-50 text-blue-700" key={skill}>{skill}</span>)}</div></div>
              <div><h3 className="font-black">Key Points</h3><ul className="mt-2 space-y-2 text-sm text-slate-500">{analysis.keyPoints.map((point) => <li key={point}>- {point}</li>)}</ul></div>
              <div><h3 className="font-black">Recommended Tests</h3><div className="mt-3 grid gap-2">{analysis.tests.map((test) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 font-bold" key={test}>{test}</div>)}</div></div>
              <div className="flex flex-wrap gap-3"><Link className="btn-primary" to="/app/mock-tests">Start Recommended Test</Link><Link className="btn-secondary" to="/app/practice">Practice Related Questions</Link></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
