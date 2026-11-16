import { codingProblems, validateCodingProblems } from "./utils/codingBank.js";

const summary = validateCodingProblems(codingProblems);
console.log(JSON.stringify(summary, null, 2));
if (summary.validationErrors.length || summary.duplicateCount) {
  process.exitCode = 1;
}
