import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import CodingProblem from "./models/CodingProblem.js";
import Question from "./models/Question.js";
import { validateCodingProblems } from "./utils/codingBank.js";
import { codingProblems, questions } from "./utils/sampleData.js";

dotenv.config();
await connectDB();
await Question.deleteMany({});
await CodingProblem.deleteMany({});
await Question.insertMany(questions);
await CodingProblem.insertMany(codingProblems);
const summary = validateCodingProblems(codingProblems);
console.log("Seeded Tech Guru questions and professional coding problems");
console.log(JSON.stringify(summary, null, 2));
process.exit(0);
