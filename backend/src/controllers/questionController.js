import Question from "../models/Question.js";
import { questions as fallbackQuestions } from "../utils/sampleData.js";
import { getStructuredAIResponse } from "../utils/ai.js";
import { validateNumber, validateString } from "../utils/validation.js";

async function allQuestions(filter = {}) {
  const dbQuestions = await Question.find(filter).lean();
  if (dbQuestions.length) return dbQuestions;
  return fallbackQuestions.filter((q) => Object.entries(filter).every(([key, value]) => q[key] === value));
}

export async function getQuestions(req, res) {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.difficulty) filter.difficulty = req.query.difficulty;
  res.json({ questions: await allQuestions(filter) });
}

export async function getQuestionsByCategory(req, res) {
  res.json({ questions: await allQuestions({ category: req.params.category }) });
}

export async function generateQuestions(req, res) {
  const count = validateNumber(req.body?.count, "count", { min: 1, max: 20, default: 5 });
  const category = validateString(req.body?.category, "category", { required: false, max: 100 }) || "Technical";
  const subCategory = validateString(req.body?.subCategory, "subCategory", { required: false, max: 100 }) || "General";
  const difficulty = validateString(req.body?.difficulty, "difficulty", { required: false, max: 20 }) || "Medium";
  const payload = await getStructuredAIResponse(
    "You generate concise interview MCQs.",
    `Create ${count} questions for ${category}/${subCategory} at ${difficulty}. Return {"questions":[{"category":"","subCategory":"","difficulty":"","type":"mcq","question":"","options":[],"correctAnswer":"","explanation":""}]}`,
    { questions: fallbackQuestions.slice(0, count) }
  );
  res.json(payload);
}
