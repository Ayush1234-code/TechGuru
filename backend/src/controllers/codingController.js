import CodingProblem from "../models/CodingProblem.js";
import { codingProblems } from "../utils/sampleData.js";
import { validateString } from "../utils/validation.js";

async function getProblems() {
  const dbProblems = await CodingProblem.find().lean();
  return dbProblems.length ? dbProblems : codingProblems.map((p, index) => ({ ...p, _id: String(index + 1) }));
}

export async function listProblems(req, res) {
  res.json({ problems: await getProblems() });
}

export async function getProblem(req, res) {
  const problems = await getProblems();
  const problem = problems.find((p) => String(p._id) === req.params.id);
  if (!problem) return res.status(404).json({ message: "Problem not found" });
  res.json({ problem });
}

export async function runCode(req, res) {
  const code = validateString(req.body?.code, "code", { required: false, max: 50000 }) || "";
  const problemId = validateString(req.body?.problemId, "problemId", { required: false, max: 100 }) || "";
  const includeHidden = Boolean(req.body?.includeHidden);
  const problems = await getProblems();
  const problem = problems.find((p) => String(p._id) === String(problemId)) || problems[0];
  const tests = includeHidden ? problem.testCases : problem.visibleTestCases || problem.testCases.filter((test) => test.visibility !== "hidden");
  const compileError = /syntax_error|compile_error/i.test(code);
  const runtimeError = /throw\s+new|runtime_error/i.test(code);
  const looksImplemented = !/return\s+(\[\]|0|false|NULL|\{\}|""|'')/.test(code) && code.trim().length > 30;
  const results = tests.map((testCase) => ({
    input: testCase.input,
    expectedOutput: testCase.expectedOutput,
    userOutput: compileError || runtimeError ? "" : looksImplemented ? testCase.expectedOutput : "No meaningful output",
    visibility: testCase.visibility || "visible",
    passed: !compileError && !runtimeError && looksImplemented,
    error: compileError ? "Compilation error detected by the mock judge." : runtimeError ? "Runtime error detected by the mock judge." : looksImplemented ? "" : "Wrong Answer: starter-code return detected."
  }));
  const passed = results.every((r) => r.passed);
  res.json({
    results,
    passed,
    status: compileError ? "Compilation Error" : runtimeError ? "Runtime Error" : passed ? "Accepted" : "Wrong Answer",
    executionTimeMs: passed ? 24 + String(code).length % 71 : 0,
    memoryKb: passed ? 13824 + String(code).length % 2048 : 0
  });
}

export async function submitCode(req, res) {
  const result = await new Promise((resolve) => {
    const fakeReq = { body: req.body };
    const fakeRes = { json: resolve };
    runCode(fakeReq, fakeRes);
  });
  res.json({ ...result, score: result.passed ? 100 : 0 });
}
