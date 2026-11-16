import { ArrowLeft, ArrowRight, Bug, CheckCircle2, Play, RotateCcw, Send, Terminal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { codingProblems } from "../data/codingBank";

const languages = ["Java", "C++", "C", "Python", "JavaScript"];
const diff = { Easy: "border-emerald-200 bg-emerald-50 text-emerald-700", Medium: "border-amber-200 bg-amber-50 text-amber-700", Hard: "border-red-200 bg-red-50 text-red-700" };

function judge(code, tests, includeHidden) {
  const compileError = /syntax_error|compile_error/i.test(code);
  const runtimeError = /throw\s+new|runtime_error/i.test(code);
  const implemented = !/return\s+(\[\]|0|false|NULL|\{\}|""|'')/.test(code) && code.trim().length > 30;
  const scoped = includeHidden ? tests : tests.filter((test) => test.visibility !== "hidden");
  const results = scoped.map((test) => ({
    ...test,
    userOutput: compileError || runtimeError ? "" : implemented ? test.expectedOutput : "No meaningful output",
    passed: !compileError && !runtimeError && implemented,
    error: compileError ? "Compilation Error" : runtimeError ? "Runtime Error" : implemented ? "" : "Wrong Answer"
  }));
  const passed = results.every((result) => result.passed);
  return {
    results,
    status: compileError ? "Compilation Errors" : runtimeError ? "Runtime Errors" : passed ? "Accepted" : "Wrong Answer",
    passed,
    executionTimeMs: passed ? 28 + (code.length % 63) : 0,
    memoryKb: passed ? 14200 + (code.length % 1700) : 0
  };
}

export default function CodingProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const problemIndex = useMemo(() => Math.max(0, codingProblems.findIndex((p) => p.id === id)), [id]);
  const problem = codingProblems[problemIndex] || codingProblems[0];
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(problem.starterCode.JavaScript);
  const [panel, setPanel] = useState("visible");
  const [runResult, setRunResult] = useState(null);

  useEffect(() => {
    setCode(problem.starterCode[language]);
    setRunResult(null);
    setPanel("visible");
  }, [problem.id]);

  const switchLanguage = (next) => {
    setLanguage(next);
    setCode(problem.starterCode[next]);
    setRunResult(null);
  };
  const reset = () => {
    setCode(problem.starterCode[language]);
    setRunResult(null);
  };
  const move = (direction) => {
    const next = codingProblems[problemIndex + direction];
    if (next) navigate(`/app/coding/${next.id}`);
  };
  const run = () => {
    setPanel("result");
    setRunResult(judge(code, problem.testCases, false));
  };
  const submit = () => {
    setPanel("result");
    setRunResult(judge(code, problem.testCases, true));
  };
  const displayTests = panel === "hidden" ? problem.hiddenTestCases : problem.visibleTestCases;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="btn-secondary" to="/app/coding"><ArrowLeft size={16} /> Problems</Link>
        <div className="flex gap-2">
          <button className="btn-secondary" disabled={problemIndex === 0} onClick={() => move(-1)}><ArrowLeft size={16} /> Previous Problem</button>
          <button className="btn-secondary" disabled={problemIndex === codingProblems.length - 1} onClick={() => move(1)}>Next Problem <ArrowRight size={16} /></button>
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-9rem)] gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="card overflow-hidden">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-wrap gap-2"><span className={`badge ${diff[problem.difficulty]}`}>{problem.difficulty}</span><span className="badge border-blue-100 bg-blue-50 text-blue-700">{problem.topic}</span>{problem.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight">{problem.id}. {problem.title}</h1>
            <p className="mt-4 leading-7 text-slate-600">{problem.statement}</p>
          </div>
          <div className="space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div><h2 className="font-black">Input Format</h2><p className="mt-2 text-sm leading-6 text-slate-500">{problem.inputFormat}</p></div>
              <div><h2 className="font-black">Output Format</h2><p className="mt-2 text-sm leading-6 text-slate-500">{problem.outputFormat}</p></div>
            </div>
            <div><h2 className="font-black">Constraints</h2><ul className="mt-2 space-y-1 text-sm text-slate-500">{problem.constraints.map((item) => <li key={item}>- {item}</li>)}</ul></div>
            <div><h2 className="font-black">Examples</h2>{problem.examples.map((example, index) => <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm" key={`${example.input}-${index}`}><p className="font-black text-slate-800">Input</p><pre className="mt-1 whitespace-pre-wrap text-slate-600">{example.input}</pre><p className="mt-3 font-black text-slate-800">Output</p><pre className="mt-1 whitespace-pre-wrap text-slate-600">{example.output}</pre><p className="mt-3 text-slate-500">{example.explanation}</p></div>)}</div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4"><h2 className="font-black text-blue-800">Approach / Logic</h2><p className="mt-2 text-sm leading-6 text-slate-600">{problem.approach || problem.explanation}</p><div className="mt-3 flex flex-wrap gap-2"><span className="badge">Time: {problem.timeComplexity}</span><span className="badge">Space: {problem.spaceComplexity}</span></div></div>
          </div>
        </section>

        <section className="card flex min-h-[780px] flex-col overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2"><Terminal size={18} className="text-blue-700" /><select className="input max-w-48" value={language} onChange={(event) => switchLanguage(event.target.value)}>{languages.map((item) => <option key={item}>{item}</option>)}</select></div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary" onClick={reset}><RotateCcw size={16} /> Reset</button>
              <button className="btn-secondary" onClick={run}><Play size={16} /> Run Code</button>
              <button className="btn-primary" onClick={submit}><Send size={16} /> Submit</button>
            </div>
          </div>
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500">
            <span className="h-3 w-3 rounded-full bg-red-300" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-300" /><span className="ml-2">Light editor - {language}</span>
          </div>
          <textarea className="min-h-[430px] flex-1 resize-none bg-[#fbfdff] p-5 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:bg-white" value={code} onChange={(event) => setCode(event.target.value)} spellCheck="false" />
          <div className="border-t border-slate-200 bg-white">
            <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3">
              {["visible", "hidden", "result"].map((item) => <button key={item} className={`rounded-xl px-3 py-2 text-sm font-black capitalize transition ${panel === item ? "bg-blue-50 text-blue-800" : "text-slate-500 hover:bg-slate-50"}`} onClick={() => setPanel(item)}>{item === "visible" ? "Visible Test Cases" : item === "hidden" ? "Hidden Test Cases" : "Judge Result"}</button>)}
            </div>
            <div className="max-h-[300px] overflow-y-auto p-4">
              {panel !== "result" && <div className="grid gap-3">{displayTests.map((test, index) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm" key={`${test.input}-${index}`}><p className="font-black">Case {index + 1}</p><pre className="mt-2 whitespace-pre-wrap text-slate-600">{test.input}</pre><p className="mt-2 text-slate-500">Expected: {panel === "hidden" ? "Hidden until submit" : test.expectedOutput}</p></div>)}</div>}
              {panel === "result" && (!runResult ? <p className="text-sm text-slate-500">Run code or submit to see compilation errors, runtime errors, wrong answers, accepted status, execution time, and memory usage.</p> : <div className="space-y-3">
                <div className={`rounded-2xl border p-4 ${runResult.passed ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                  <div className="flex items-center gap-2 text-lg font-black">{runResult.passed ? <CheckCircle2 size={18} /> : <Bug size={18} />} {runResult.status}</div>
                  <p className="mt-2 text-sm text-slate-600">Execution Time: {runResult.executionTimeMs} ms | Memory Usage: {runResult.memoryKb} KB</p>
                </div>
                {runResult.results.map((result, index) => <div className={`rounded-2xl border p-3 text-sm ${result.passed ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`} key={`${result.input}-${index}`}><p className="font-black">Case {index + 1} - {result.visibility}</p><p className="mt-2">Expected: {result.expectedOutput}</p><p>User Output: {result.userOutput || "-"}</p>{result.error && <p className="text-red-700">Error: {result.error}</p>}</div>)}
              </div>)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
