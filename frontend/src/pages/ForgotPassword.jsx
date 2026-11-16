import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputFrame = "h-12 w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 text-sm font-medium text-white outline-none transition duration-200 placeholder:text-slate-500 focus:bg-white/[0.06] focus:ring-4";
const inputTone = (hasError) => hasError
  ? "border-red-400/60 focus:border-red-400 focus:ring-red-500/10"
  : "border-white/10 focus:border-cyan-400/60 focus:ring-cyan-500/10";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Email is required");
      return;
    }
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const data = await api("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: normalizedEmail })
      });
      setMessage(data.message || "If an account with that email exists, password reset instructions have been sent.");
    } catch (requestError) {
      setError(requestError.message || "We could not process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040916] text-white selection:bg-cyan-400/30 selection:text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.24),transparent_32rem),radial-gradient(circle_at_84%_82%,rgba(124,58,237,0.2),transparent_30rem),linear-gradient(180deg,#040916_0%,#070d1f_52%,#040916_100%)]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[10%] h-72 w-72 rounded-full bg-blue-600/20 blur-[110px] animate-soft-pulse" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[6%] right-[4%] h-80 w-80 rounded-full bg-violet-600/20 blur-[120px] animate-soft-pulse" style={{ animationDelay: "1.2s" }} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="relative w-full max-w-[470px] animate-fade-up">
          <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-blue-500/10 blur-3xl" />

          <div className="relative mb-7 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-white shadow-glow">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">Tech Guru</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">Interview Intelligence</p>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1224]/90 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.75)] backdrop-blur-2xl sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                <ShieldCheck size={12} className="text-cyan-300" /> Account recovery
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">03 / Reset</span>
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">Forgot Your Password?</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">Enter your registered email address and we'll send you a password reset link.</p>

            {error && (
              <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 animate-fade-up">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div role="status" className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 animate-fade-up">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <div className="mt-6">
              <label htmlFor="forgot-email" className="text-sm font-bold text-slate-200">Email</label>
              <div className="group relative mt-2">
                <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-200 group-focus-within:text-cyan-300" />
                <input
                  id="forgot-email"
                  className={`${inputFrame} ${inputTone(Boolean(error))}`}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "forgot-email-error" : undefined}
                  disabled={loading}
                />
              </div>
              {error && <span id="forgot-email-error" className="mt-2 block text-xs font-bold text-red-300">{error}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-6 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-sm font-black text-white shadow-[0_16px_40px_rgba(59,130,246,0.35)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f20] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition duration-200 group-hover:opacity-100" />
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending reset link...
                </>
              ) : (
                <>
                  Send Reset Link <ArrowRight size={18} className="transition duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <div className="mt-6 flex justify-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm font-black text-cyan-300 transition hover:text-cyan-200">
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] font-semibold text-slate-500">
              <ShieldCheck size={13} className="text-cyan-400/80" /> For your security, reset links expire in 15 minutes
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
