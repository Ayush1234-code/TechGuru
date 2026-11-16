import express from "express";
import { dashboard, performance } from "../controllers/analyticsController.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/dashboard", protect, asyncHandler(dashboard));
router.get("/performance", protect, asyncHandler(performance));
export default router;
