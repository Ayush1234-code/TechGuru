import ApiError from "../utils/ApiError.js";

function isDuplicateKeyError(error) {
  return error?.code === 11000 || error?.code === 11001;
}

export default function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Server error";
  let details = error.details;

  if (error instanceof SyntaxError && error.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON in request body";
  } else if (error.type === "entity.too.large") {
    statusCode = 413;
    message = "Request body too large";
  } else if (error.name === "MulterError") {
    statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    message = error.code === "LIMIT_FILE_SIZE" ? "File too large" : `Upload error: ${error.code}`;
  } else if (isDuplicateKeyError(error)) {
    statusCode = 409;
    message = "Email already registered";
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    const fields = Object.keys(error.errors || {});
    message = fields.length ? `Validation failed: ${fields.join(", ")}` : "Invalid input";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid request parameter";
  } else if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token invalid or expired. Please log in again.";
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  const body = { message };
  if (details !== undefined) body.details = details;
  res.status(statusCode).json(body);
}
