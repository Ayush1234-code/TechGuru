import cors from "cors";
import dns from "dns";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import { globalLimiter } from "./middleware/rateLimiter.js";
import notFound from "./middleware/notFound.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await connectDB();

const app = express();
app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.disable("x-powered-by");
app.use(helmet());

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(mongoSanitize());

app.use(globalLimiter);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", product: "Tech Guru" })
);

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);

app.use(errorHandler);

const port = Number(process.env.PORT || 5000);

const startServer = (portToUse) => {
  const server = app.listen(portToUse, () => {
    console.log("Node Version:", process.version);
    console.log(`Tech Guru API running on port ${portToUse}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = portToUse + 1;
      console.warn(
        `Port ${portToUse} is already in use. Retrying on port ${nextPort}...`
      );
      startServer(nextPort);
      return;
    }

    console.error("Server failed to start:", error);
    process.exit(1);
  });
};

startServer(port);
