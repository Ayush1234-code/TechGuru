import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    testType: { type: String, enum: ["mock", "assessment", "coding"], required: true },
    category: { type: String, required: true },
    difficulty: { type: String, default: "Medium" },
    answers: [
      {
        questionId: String,
        answer: String,
        correct: Boolean
      }
    ],
    score: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    feedback: {
      strengths: [String],
      weaknesses: [String],
      suggestions: [String],
      skillPerformance: [{ skill: String, score: Number }],
      recommendedTopics: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model("TestAttempt", testAttemptSchema);
