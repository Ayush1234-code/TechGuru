import mongoose from "mongoose";

const codingProblemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    topic: { type: String, required: true, index: true },
    tags: [{ type: String }],
    acceptance: Number,
    solved: Boolean,
    statement: { type: String, required: true },
    constraints: [{ type: String }],
    inputFormat: String,
    outputFormat: String,
    sampleInput: String,
    sampleOutput: String,
    explanation: String,
    approach: String,
    timeComplexity: String,
    spaceComplexity: String,
    examples: [
      {
        input: String,
        output: String,
        explanation: String
      }
    ],
    testCases: [
      {
        input: String,
        expectedOutput: String,
        visibility: { type: String, enum: ["visible", "hidden"], default: "visible" }
      }
    ],
    visibleTestCases: [
      {
        input: String,
        expectedOutput: String,
        visibility: { type: String, default: "visible" }
      }
    ],
    hiddenTestCases: [
      {
        input: String,
        expectedOutput: String,
        visibility: { type: String, default: "hidden" }
      }
    ],
    starterCode: {
      Java: String,
      "C++": String,
      C: String,
      Python: String,
      JavaScript: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("CodingProblem", codingProblemSchema);
