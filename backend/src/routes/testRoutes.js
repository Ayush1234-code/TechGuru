import express from "express";
import { history, startTest, submitTest } from "../controllers/testController.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/start", protect, asyncHandler(startTest));
router.post("/submit", protect, asyncHandler(submitTest));
router.get("/history", protect, asyncHandler(history));
export default router;
