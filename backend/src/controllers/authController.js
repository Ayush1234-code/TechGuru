import crypto from "crypto";
import TestAttempt from "../models/TestAttempt.js";
import User from "../models/User.js";
import { revokeToken, signToken } from "../middleware/auth.js";
import {
  assertPasswordResetEmailConfigured,
  RESET_TOKEN_TTL_MINUTES,
  sendPasswordResetEmail
} from "../services/emailService.js";
import ApiError from "../utils/ApiError.js";
import { validateEmail, validateName, validatePassword, validateString } from "../utils/validation.js";

const GENERIC_RESET_MESSAGE = "If an account with that email exists, password reset instructions have been sent.";
const INVALID_RESET_TOKEN_MESSAGE = "This password reset link is invalid or has expired.";
const RESET_TOKEN_TTL_MS = RESET_TOKEN_TTL_MINUTES * 60 * 1000;

function hashResetToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function createResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return {
    token,
    tokenHash: hashResetToken(token),
    expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS)
  };
}

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  preferredLanguage: user.preferredLanguage,
  skills: user.skills,
  streak: user.streak,
  testsCompleted: user.testsCompleted,
  averageScore: user.averageScore
});

export async function register(req, res) {
  const name = validateName(req.body?.name);
  const email = validateEmail(req.body?.email);
  const password = validatePassword(req.body?.password);

  const exists = await User.findOne({ email });
  if (exists) {
    throw new ApiError(409, "Email already registered");
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id, user.authVersion);
  res.status(201).json({ token, user: publicUser(user) });
}

export async function login(req, res) {
  const email = validateEmail(req.body?.email);
  const password = req.body?.password;

  if (typeof password !== "string" || !password.length) {
    throw new ApiError(400, "password is required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken(user._id, user.authVersion);
  res.json({ token, user: publicUser(user) });
}

export async function forgotPassword(req, res) {
  const email = validateEmail(req.body?.email);
  assertPasswordResetEmailConfigured();

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: GENERIC_RESET_MESSAGE });
  }

  const { token, tokenHash, expiresAt } = createResetToken();
  user.resetPasswordToken = tokenHash;
  user.resetPasswordExpires = expiresAt;
  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail({ to: user.email, name: user.name, token });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false }).catch((cleanupError) => {
      console.error("Failed to clear password reset token:", cleanupError.message);
    });
    throw error;
  }

  return res.json({ message: GENERIC_RESET_MESSAGE });
}

export async function resetPassword(req, res) {
  const token = validateString(req.body?.token, "token", { required: true, max: 256 });
  const password = validatePassword(req.body?.password);
  const tokenHash = hashResetToken(token);

  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: { $gt: new Date() }
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) {
    throw new ApiError(400, INVALID_RESET_TOKEN_MESSAGE);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.authVersion = Number(user.authVersion || 0) + 1;
  await user.save();

  res.json({ message: "Password reset successful. You can now log in with your new password." });
}

export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function logout(req, res) {
  if (req.token) {
    await revokeToken(req.token);
  }
  res.json({ message: "Logged out successfully" });
}

export async function adminStats(req, res) {
  const [totalUsers, totalAttempts] = await Promise.all([
    User.countDocuments(),
    TestAttempt.countDocuments()
  ]);
  res.json({ users: totalUsers, attempts: totalAttempts });
}
