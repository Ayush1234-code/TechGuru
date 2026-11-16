import TestAttempt from "../models/TestAttempt.js";

export async function dashboard(req, res) {
  const attempts = await TestAttempt.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(12);
  const averageScore = attempts.length ? Math.round(attempts.reduce((sum, a) => sum + a.accuracy, 0) / attempts.length) : req.user.averageScore;
  res.json({
    name: req.user.name,
    streak: req.user.streak,
    averageScore,
    testsCompleted: attempts.length || req.user.testsCompleted,
    recentTopics: ["React", "Node.js", "Arrays", "MongoDB"],
    recommendedTests: ["React Hooks Medium", "Node APIs Medium", "DP Fundamentals"],
    performance: attempts.reverse().map((a) => ({ label: a.category, score: a.accuracy }))
  });
}

export async function performance(req, res) {
  const attempts = await TestAttempt.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ attempts });
}
