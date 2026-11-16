import ApiError from "./ApiError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function validateEmail(email, field = "email") {
  const value = normalizeEmail(email);
  if (!value) {
    throw new ApiError(400, `${field} is required`);
  }
  if (!EMAIL_REGEX.test(value)) {
    throw new ApiError(400, `${field} must be a valid email address`);
  }
  return value;
}

export function validatePassword(password, field = "password") {
  if (typeof password !== "string" || !password.length) {
    throw new ApiError(400, `${field} is required`);
  }
  if (password.length < 8) {
    throw new ApiError(400, `${field} must be at least 8 characters`);
  }
  if (password.length > 72) {
    throw new ApiError(400, `${field} must be at most 72 characters`);
  }
  return password;
}

export function validateName(name) {
  if (typeof name !== "string" || !name.trim().length) {
    throw new ApiError(400, "name is required");
  }
  if (name.trim().length < 2) {
    throw new ApiError(400, "name must be at least 2 characters");
  }
  if (name.trim().length > 50) {
    throw new ApiError(400, "name must be at most 50 characters");
  }
  return name.trim();
}

export function validateString(value, field, { required = true, max = 500 } = {}) {
  if (value === undefined || value === null) {
    if (required) throw new ApiError(400, `${field} is required`);
    return "";
  }
  if (typeof value !== "string") {
    throw new ApiError(400, `${field} must be a string`);
  }
  const trimmed = value.trim();
  if (!trimmed.length) {
    if (required) throw new ApiError(400, `${field} is required`);
    return "";
  }
  if (trimmed.length > max) {
    throw new ApiError(400, `${field} must be at most ${max} characters`);
  }
  return trimmed;
}

export function validateNumber(value, field, { min = 0, max = Number.MAX_SAFE_INTEGER, default: fallback } = {}) {
  const num = value === undefined || value === null || value === "" ? fallback : Number(value);
  if (Number.isNaN(num)) {
    throw new ApiError(400, `${field} must be a number`);
  }
  if (num < min || num > max) {
    throw new ApiError(400, `${field} must be between ${min} and ${max}`);
  }
  return num;
}

export function validateArray(value, field, { required = true, max = 200 } = {}) {
  if (value === undefined || value === null) {
    if (required) throw new ApiError(400, `${field} is required`);
    return [];
  }
  if (!Array.isArray(value)) {
    throw new ApiError(400, `${field} must be an array`);
  }
  if (value.length > max) {
    throw new ApiError(400, `${field} cannot exceed ${max} items`);
  }
  return value;
}
