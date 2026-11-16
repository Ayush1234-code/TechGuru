import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Question from "./models/Question.js";
import { questions, validateMcqQuestions } from "./utils/mcqBank.js";

dotenv.config();
await connectDB();

const summary = validateMcqQuestions(questions);
if (summary.duplicateCount || summary.invalidQuestionCount) {
  console.error("MCQ bank validation failed. Seed aborted.");
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

await Question.deleteMany({});
await Question.insertMany(questions);

console.log("Replaced MCQ question bank successfully.");
console.log(JSON.stringify(summary, null, 2));
process.exit(0);
