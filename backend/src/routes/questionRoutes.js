import express from "express";
import { generateQuestions, getQuestions, getQuestionsByCategory } from "../controllers/questionController.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/", protect, asyncHandler(getQuestions));
router.get("/category/:category", protect, asyncHandler(getQuestionsByCategory));
router.post("/generate-ai", protect, asyncHandler(generateQuestions));
export default router;
