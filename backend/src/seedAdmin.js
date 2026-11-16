import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const name = process.env.ADMIN_NAME || "Admin";
const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD to create the admin user.");
  process.exit(1);
}
if (password.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const exists = await User.findOne({ email });
if (exists) {
  console.log(`Admin already exists for ${email} (role: ${exists.role})`);
  process.exit(0);
}

const user = await User.create({ name, email, password, role: "admin" });
console.log(`Created admin ${email} (role: ${user.role})`);
process.exit(0);
