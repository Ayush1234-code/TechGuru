import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileUrl: { type: String, required: true },
    extractedSkills: [{ type: String }],
    keyPoints: [{ type: String }],
    recommendedTests: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
