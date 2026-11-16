import Resume from "../models/Resume.js";
import { getStructuredAIResponse } from "../utils/ai.js";
import { validateString } from "../utils/validation.js";

const fallbackAnalysis = {
  extractedSkills: ["React", "Node.js", "MongoDB", "JavaScript", "REST APIs"],
  keyPoints: ["Full-stack project experience", "API design exposure", "Frontend component skills"],
  recommendedTests: ["Frontend React Medium", "Backend APIs Medium", "DSA Arrays Easy"]
};

export async function uploadResume(req, res) {
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl || "manual-upload";
  const resume = await Resume.create({ userId: req.user._id, fileUrl, ...fallbackAnalysis });
  res.status(201).json({ resume });
}

export async function getMyResume(req, res) {
  const resume = await Resume.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ resume });
}

export async function analyzeResume(req, res) {
  const resumeText = validateString(req.body?.resumeText, "resumeText", { required: true, max: 20000 });
  const analysis = await getStructuredAIResponse(
    "You extract interview-preparation signals from resumes.",
    `Analyze this resume text and return {"extractedSkills":[],"keyPoints":[],"recommendedTests":[]}: ${resumeText}`,
    fallbackAnalysis
  );
  res.json(analysis);
}
