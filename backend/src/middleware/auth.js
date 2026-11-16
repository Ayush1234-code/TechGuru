import crypto from "crypto";
import jwt from "jsonwebtoken";
import TokenBlacklist from "../models/TokenBlacklist.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "dev-secret" || secret.length < 24) {
    throw new ApiError(500, "JWT_SECRET is not configured securely. Set a strong JWT_SECRET in backend/.env");
  }
  return secret;
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function signToken(userId, authVersion = 0) {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ id: userId, version: authVersion }, getSecret(), { expiresIn });
}

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
    if (!token) {
      throw new ApiError(401, "Not authorized. Please log in.");
    }
    let decoded;
    try {
      decoded = jwt.verify(token, getSecret());
    } catch {
      throw new ApiError(401, "Token invalid or expired. Please log in again.");
    }
    const revoked = await TokenBlacklist.findOne({ tokenHash: hashToken(token) });
    if (revoked) {
      throw new ApiError(401, "Token revoked. Please log in again.");
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "Account no longer exists.");
    }
    if (Number(decoded.version || 0) !== Number(user.authVersion || 0)) {
      throw new ApiError(401, "Session expired. Please log in again.");
    }
    req.user = user;
    req.token = token;
    req.tokenDecoded = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authorized. Please log in."));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied. Administrator privileges required."));
    }
    next();
  };
}

export async function revokeToken(token) {
  try {
    const decoded = jwt.verify(token, getSecret());
    const expiresAt = new Date(decoded.exp * 1000);
    await TokenBlacklist.findOneAndUpdate(
      { tokenHash: hashToken(token) },
      { $setOnInsert: { expiresAt } },
      { upsert: true }
    );
  } catch {
    // Invalid tokens have nothing to revoke.
  }
}
