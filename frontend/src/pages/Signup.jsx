import { AlertCircle, ArrowRight, Brain, Code2, Eye, EyeOff, FileText, Loader2, Lock, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputFrame = "h-12 w-full rounded-xl border bg-white/[0.04] pl-11 pr-4 text-sm font-medium text-white outline-none transition duration-200 placeholder:text-slate-500 focus:bg-white/[0.06] focus:ring-4";
const inputTone = (hasError) => hasError
  ? "border-red-400/60 focus:border-red-400 focus:ring-red-500/10"
  : "border-white/10 focus:border-cyan-400/60 focus:ring-cyan-500/10";

const prepSteps = [
  ["01", "Resume Analysis", "Skill signals and role fit", FileText],
  ["02", "Coding Practice", "Language-specific rounds", Code2],
  ["03", "AI Feedback", "Clear next actions", Brain]
];

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    else if (form.name.trim().length < 2) next.name = "Name must be at least 2 characters";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters";
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      await signup({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      navigate("/app/dashboard", { replace: true });
    } catch (error) {
      setServerError(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040916] text-white selection:bg-cyan-400/30 selection:text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.24),transparent_32rem),radial-gradient(circle_at_82%_84%,rgba(124,58,237,0.2),transparent_30rem),linear-gradient(180deg,#040916_0%,#070d1f_52%,#040916_100%)]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[10%] h-72 w-72 rounded-full bg-blue-600/20 blur-[110px] animate-soft-pulse" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[6%] right-[4%] h-80 w-80 rounded-full bg-violet-600/20 blur-[120px] animate-soft-pulse" style={{ animationDelay: "1.2s" }} />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden border-r border-white/[0.06] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(37,99,235,0.16),transparent_26rem),radial-gradient(circle_at_82%_82%,rgba(124,58,237,0.12),transparent_24rem)]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-white shadow-glow">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">Tech Guru</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">Interview Intelligence</p>
            </div>
          </div>

          <div className="relative z-10 max-w-xl py-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3.5 py-1.5 text-xs font-bold text-violet-100">
              <Sparkles size={13} /> Your preparation starts here
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.04] tracking-tight xl:text-[3.6rem]">
              Build Your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">AI Interview</span>{" "}
              Advantage.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">
              Create one profile and unlock a preparation loop shaped around your resume, target role, and real performance.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Your preparation loop</p>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> Ready
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {prepSteps.map(([number, title, detail, Icon]) => (
                  <div key={title} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/20 font-mono text-[10px] font-bold text-cyan-300">{number}</span>
                    <Icon size={16} className="shrink-0 text-blue-300" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-200">{title}</p>
                      <p className="truncate text-[10px] text-slate-500">{detail}</p>
                    </div>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-400/[0.06] px-3 py-3">
                <ShieldCheck size={15} className="shrink-0 text-cyan-300" />
                <p className="text-[11px] font-semibold leading-5 text-slate-300">Secure account setup with a personalized roadmap after your first session.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            <ShieldCheck size={14} className="text-cyan-400/80" /> Passwords are hashed before storage
          </div>
        </aside>

        <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
          <div className="relative w-full max-w-[450px] animate-fade-up">
            <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-violet-500/10 blur-3xl" />

            <div className="relative mb-7 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 shadow-glow">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-base font-black tracking-tight">Tech Guru</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">Interview Intelligence</p>
              </div>
            </div>

            <form onSubmit={submit} noValidate className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1224]/90 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.75)] backdrop-blur-2xl sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />

              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                  <ShieldCheck size={12} className="text-violet-300" /> Secure signup
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">02 / Signup</span>
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">Create your account</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Set up your profile to unlock personalized practice and AI feedback.</p>

              {serverError && (
                <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 animate-fade-up">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="signup-name" className="text-sm font-bold text-slate-200">Full name</label>
                  <div className="group relative mt-2">
                    <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-200 group-focus-within:text-cyan-300" />
                    <input
                      id="signup-name"
                      className={`${inputFrame} ${inputTone(Boolean(errors.name))}`}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "signup-name-error" : undefined}
                    />
                  </div>
                  {errors.name && <span id="signup-name-error" className="mt-2 block text-xs font-bold text-red-300">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="signup-email" className="text-sm font-bold text-slate-200">Email</label>
                  <div className="group relative mt-2">
                    <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-200 group-focus-within:text-cyan-300" />
                    <input
                      id="signup-email"
                      className={`${inputFrame} ${inputTone(Boolean(errors.email))}`}
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "signup-email-error" : undefined}
                    />
                  </div>
                  {errors.email && <span id="signup-email-error" className="mt-2 block text-xs font-bold text-red-300">{errors.email}</span>}
                </div>

                <div>
                  <label htmlFor="signup-password" className="text-sm font-bold text-slate-200">Password</label>
                  <div className="group relative mt-2">
                    <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-200 group-focus-within:text-cyan-300" />
                    <input
                      id="signup-password"
                      className={`${inputFrame} pr-12 ${inputTone(Boolean(errors.password))}`}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Create a password"
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? "signup-password-error" : "signup-password-hint"}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      title={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition duration-200 hover:bg-white/[0.06] hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password ? (
                    <span id="signup-password-error" className="mt-2 block text-xs font-bold text-red-300">{errors.password}</span>
                  ) : (
                    <p id="signup-password-hint" className="mt-2 text-xs text-slate-500">Use at least 8 characters and a unique password.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-sm font-black text-white shadow-[0_16px_40px_rgba(59,130,246,0.35)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f20] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition duration-200 group-hover:opacity-100" />
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Creating account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight size={18} className="transition duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link className="font-black text-cyan-300 transition hover:text-cyan-200" to="/login">Sign in</Link>
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] font-semibold text-slate-500">
                <ShieldCheck size={13} className="text-cyan-400/80" /> Your password is securely hashed
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
