import express from "express";
import { getProblem, listProblems, runCode, submitCode } from "../controllers/codingController.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/problems", protect, asyncHandler(listProblems));
router.get("/problems/:id", protect, asyncHandler(getProblem));
router.post("/run", protect, asyncHandler(runCode));
router.post("/submit", protect, asyncHandler(submitCode));
export default router;
