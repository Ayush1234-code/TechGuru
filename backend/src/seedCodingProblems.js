import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import CodingProblem from "./models/CodingProblem.js";
import { codingProblems, validateCodingProblems } from "./utils/codingBank.js";

dotenv.config();
await connectDB();

const summary = validateCodingProblems(codingProblems);
if (summary.validationErrors.length || summary.duplicateCount) {
  console.error("Coding bank validation failed. Seed aborted.");
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

await CodingProblem.deleteMany({});
await CodingProblem.insertMany(codingProblems);

console.log("Replaced coding practice bank successfully.");
console.log(JSON.stringify(summary, null, 2));
process.exit(0);
