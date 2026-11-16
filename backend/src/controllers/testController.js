import TestAttempt from "../models/TestAttempt.js";
import { questions as fallbackQuestions } from "../utils/sampleData.js";
import { validateArray, validateNumber, validateString } from "../utils/validation.js";

export async function startTest(req, res) {
  const category = validateString(req.body?.category, "category", { required: false, max: 100 }) || "Frontend";
  const difficulty = validateString(req.body?.difficulty, "difficulty", { required: false, max: 20 }) || "Medium";
  const count = validateNumber(req.body?.count, "count", { min: 1, max: 50, default: 10 });
  const pool = fallbackQuestions.filter((q) => q.category === category && (!difficulty || q.difficulty === difficulty));
  const selected = (pool.length ? pool : fallbackQuestions.filter((q) => q.category === category)).slice(0, count);
  res.json({ questions: selected, durationSeconds: selected.length * 60 });
}

export async function submitTest(req, res) {
  const answers = validateArray(req.body?.answers, "answers", { required: false, max: 200 });
  const category = validateString(req.body?.category, "category", { required: false, max: 100 }) || "General";
  const testType = validateString(req.body?.testType, "testType", { required: false, max: 20 }) || "mock";
  const difficulty = validateString(req.body?.difficulty, "difficulty", { required: false, max: 20 }) || "Medium";
  const timeTaken = validateNumber(req.body?.timeTaken, "timeTaken", { min: 0, max: 86400, default: 0 });
  const score = answers.filter((a) => a.correct).length;
  const accuracy = answers.length ? Math.round((score / answers.length) * 100) : 0;
  const feedback = {
    strengths: accuracy >= 70 ? ["Strong conceptual recall", "Good pacing"] : ["You completed the assessment"],
    weaknesses: accuracy < 70 ? ["Needs deeper revision", "Review explanations carefully"] : ["A few edge cases need polish"],
    suggestions: ["Practice missed subtopics", "Retake a harder mock after revision"],
    skillPerformance: [
      { skill: category, score: accuracy },
      { skill: "Speed", score: Math.max(40, 100 - Math.round(timeTaken / 12)) },
      { skill: "Accuracy", score: accuracy }
    ],
    recommendedTopics: ["React lifecycle", "API status codes", "Array patterns"]
  };
  const attempt = await TestAttempt.create({ userId: req.user._id, testType, category, difficulty, answers, score, accuracy, timeTaken, feedback });
  res.status(201).json({ attempt });
}

export async function history(req, res) {
  const attempts = await TestAttempt.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(30);
  res.json({ attempts });
}
