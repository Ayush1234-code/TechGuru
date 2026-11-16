import nodemailer from "nodemailer";
import ApiError from "../utils/ApiError.js";

const REQUIRED_ENV = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "FRONTEND_URL"
];

const RESET_TOKEN_TTL_MINUTES = 15;
let transporter = null;

function getMissingEnv() {
  return REQUIRED_ENV.filter((name) => !process.env[name] || !String(process.env[name]).trim());
}

function getSmtpPort() {
  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new ApiError(503, "Password reset is temporarily unavailable. Please try again later.");
  }
  return port;
}

function getFrontendBaseUrl() {
  const raw = process.env.FRONTEND_URL || "";
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new ApiError(503, "Password reset is temporarily unavailable. Please try again later.");
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new ApiError(503, "Password reset is temporarily unavailable. Please try again later.");
  }
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new ApiError(503, "Password reset is temporarily unavailable. Please try again later.");
  }
  return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildResetUrl(token) {
  return `${getFrontendBaseUrl()}/reset-password?token=${encodeURIComponent(token)}`;
}

function buildEmail({ name, resetUrl }) {
  const safeName = escapeHtml(name || "there");
  const safeResetUrl = escapeHtml(resetUrl);
  const text = [
    `Hi ${name || "there"},`,
    "",
    "We received a request to reset the password for your Tech Guru account.",
    "",
    `Reset your password: ${resetUrl}`,
    "",
    `This link expires in ${RESET_TOKEN_TTL_MINUTES} minutes and can only be used once.`,
    "",
    "If you did not request a password reset, you can safely ignore this email. Your password will not change.",
    "",
    "Tech Guru"
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #dbe5f0;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="background:#071224;padding:26px 30px;">
                <div style="font-size:22px;font-weight:800;letter-spacing:-0.4px;color:#ffffff;">Tech Guru</div>
                <div style="margin-top:6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#67e8f9;">Interview Intelligence</div>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 30px 12px;">
                <div style="font-size:12px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:#2563eb;">Password reset</div>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;letter-spacing:-0.7px;color:#0f172a;">Reset your password</h1>
                <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#475569;">Hi ${safeName},</p>
                <p style="margin:10px 0 0;font-size:15px;line-height:1.7;color:#475569;">We received a request to reset the password for your Tech Guru account. Click the button below to choose a new password.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 30px 8px;">
                <a href="${safeResetUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;padding:14px 26px;border-radius:12px;">Reset Password</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 30px 0;">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">This link expires in ${RESET_TOKEN_TTL_MINUTES} minutes and can only be used once.</p>
                <p style="margin:10px 0 0;font-size:13px;line-height:1.7;color:#64748b;">If the button does not work, copy and paste this link into your browser:</p>
                <p style="margin:8px 0 0;font-size:12px;line-height:1.6;word-break:break-all;color:#2563eb;">${safeResetUrl}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 30px 32px;">
                <div style="border-top:1px solid #e2e8f0;padding-top:20px;font-size:12px;line-height:1.7;color:#64748b;">If you did not request a password reset, you can safely ignore this email. Your password will not change.</div>
              </td>
            </tr>
          </table>
          <div style="margin-top:18px;font-size:11px;line-height:1.6;color:#94a3b8;">This is an automated message from Tech Guru. Please do not reply to this email.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject: "Reset your Tech Guru password",
    text,
    html
  };
}

export function assertPasswordResetEmailConfigured() {
  const missing = getMissingEnv();
  if (missing.length) {
    console.error(`Password reset email service is not configured. Missing: ${missing.join(", ")}`);
    throw new ApiError(503, "Password reset is temporarily unavailable. Please try again later.");
  }
  getSmtpPort();
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }
  const port = getSmtpPort();
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
  return transporter;
}

export async function sendPasswordResetEmail({ to, name, token }) {
  assertPasswordResetEmailConfigured();
  const resetUrl = buildResetUrl(token);
  const email = buildEmail({ name, resetUrl });

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html
    });
  } catch (error) {
    console.error("Password reset email delivery failed:", error.code || "EMAIL_SEND_FAILED");
    throw new ApiError(503, "We could not send the password reset email right now. Please try again later.");
  }
}

export { RESET_TOKEN_TTL_MINUTES };
