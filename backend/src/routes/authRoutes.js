import express from "express";
import { adminStats, forgotPassword, login, logout, me, register, resetPassword } from "../controllers/authController.js";
import { authorize, protect } from "../middleware/auth.js";
import { authLimiter, passwordResetLimiter, passwordResetSubmitLimiter } from "../middleware/rateLimiter.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/register", authLimiter, asyncHandler(register));
router.post("/login", authLimiter, asyncHandler(login));
router.post("/forgot-password", passwordResetLimiter, asyncHandler(forgotPassword));
router.post("/reset-password", passwordResetSubmitLimiter, asyncHandler(resetPassword));
router.post("/logout", protect, asyncHandler(logout));
router.get("/me", protect, asyncHandler(me));
router.get("/admin/stats", protect, authorize("admin"), asyncHandler(adminStats));
export default router;
