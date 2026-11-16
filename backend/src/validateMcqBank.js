import { questions, validateMcqQuestions } from "./utils/mcqBank.js";

const summary = validateMcqQuestions(questions);
console.log(JSON.stringify(summary, null, 2));
if (summary.duplicateCount || summary.invalidQuestionCount) {
  process.exitCode = 1;
}
