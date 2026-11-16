import express from "express";
import multer from "multer";
import { analyzeResume, getMyResume, uploadResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^\w.-]/g, "_")}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = file.originalname ? `.${file.originalname.split(".").pop().toLowerCase()}` : "";
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      const error = new Error("Only .pdf, .doc or .docx files are allowed");
      error.statusCode = 400;
      return cb(error);
    }
    cb(null, true);
  }
});

const router = express.Router();
router.post("/upload", protect, upload.single("resume"), asyncHandler(uploadResume));
router.get("/me", protect, asyncHandler(getMyResume));
router.post("/analyze-ai", protect, asyncHandler(analyzeResume));
export default router;
