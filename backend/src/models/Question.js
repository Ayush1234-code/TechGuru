import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, index: true },
    subCategory: { type: String, required: true },
    topic: String,
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    type: { type: String, enum: ["mcq", "text"], default: "mcq" },
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
