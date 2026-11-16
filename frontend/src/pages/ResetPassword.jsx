import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";

const inputFrame = "h-12 w-full rounded-xl border bg-white/[0.04] pl-11 pr-12 text-sm font-medium text-white outline-none transition duration-200 placeholder:text-slate-500 focus:bg-white/[0.06] focus:ring-4";
const inputTone = (hasError) => hasError
  ? "border-red-400/60 focus:border-red-400 focus:ring-red-500/10"
  : "border-white/10 focus:border-cyan-400/60 focus:ring-cyan-500/10";

function getPasswordChecks(password) {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /\d/.test(password) },
    { label: "Symbol", met: /[^A-Za-z0-9]/.test(password) }
  ];
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = (searchParams.get("token") || "").trim();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const checks = useMemo(() => getPasswordChecks(form.password), [form.password]);
  const score = checks.filter((check) => check.met).length;
  const strengthLabel = score <= 2 ? "Weak" : score <= 4 ? "Good" : "Strong";
  const strengthColor = score <= 2 ? "from-red-400 to-orange-400" : score <= 4 ? "from-amber-300 to-yellow-400" : "from-emerald-300 to-cyan-400";

  useEffect(() => {
    if (!success) return undefined;
    const timer = setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: { message: "Password updated. Sign in with your new password." }
      });
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate, success]);

  const validate = () => {
    const next = {};
    if (!form.password) {
      next.password = "Password is required";
    } else if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters";
    } else if (form.password.length > 72) {
      next.password = "Password must be at most 72 characters";
    }
    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your new password";
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords do not match";
    }
    return next;
  };

  const submit = async (event) => {
    event.preventDefault();
    setServerError("");
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password: form.password })
      });
      setSuccess(true);
    } catch (requestError) {
      setServerError(requestError.message || "We could not reset your password. Please request a new link.");
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
          <div aria-hidden="true" className="absolute -inset-8 rounded-[2.5rem] bg-violet-500/10 blur-3xl" />

          <div className="relative mb-7 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 text-white shadow-glow">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">Tech Guru</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">Interview Intelligence</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1224]/90 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.75)] backdrop-blur-2xl sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />

            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                <ShieldCheck size={12} className="text-violet-300" /> Secure recovery
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">04 / Update</span>
            </div>

            {!token ? (
              <div className="mt-6">
                <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>This password reset link is missing a token. Please request a new reset link.</span>
                </div>
                <Link to="/forgot-password" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-300 transition hover:text-cyan-200">
                  <ArrowLeft size={16} /> Request a new reset link
                </Link>
              </div>
            ) : success ? (
              <div className="mt-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={32} />
                </div>
                <h1 className="mt-5 text-3xl font-black tracking-tight">Password updated</h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">Your password has been reset successfully. Redirecting you to sign in...</p>
                <div className="mt-5 flex justify-center">
                  <Loader2 size={20} className="animate-spin text-cyan-300" />
                </div>
                <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-300 transition hover:text-cyan-200">
                  Go to Login <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">Set a new password</h1>
                <p className="mt-2 text-sm leading-6 text-slate-400">Choose a strong password you have not used elsewhere. Your reset link can only be used once.</p>

                {serverError && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 animate-fade-up">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                    <Link to="/forgot-password" className="mt-2 inline-flex font-black text-red-100 underline decoration-red-300/40 underline-offset-4">
                      Request a new reset link
                    </Link>
                  </div>
                )}

                <form onSubmit={submit} noValidate className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="reset-password" className="text-sm font-bold text-slate-200">New password</label>
                    <div className="group relative mt-2">
                      <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-200 group-focus-within:text-cyan-300" />
                      <input
                        id="reset-password"
                        className={`${inputFrame} ${inputTone(Boolean(errors.password))}`}
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={form.password}
                        onChange={(event) => setForm({ ...form, password: event.target.value })}
                        placeholder="Create a strong password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "reset-password-error" : "reset-password-strength"}
                        disabled={loading}
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
                    {errors.password && <span id="reset-password-error" className="mt-2 block text-xs font-bold text-red-300">{errors.password}</span>}
                    <div id="reset-password-strength" className="mt-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="grid flex-1 grid-cols-5 gap-1.5">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <span key={level} className={`h-1.5 rounded-full ${level <= score ? `bg-gradient-to-r ${strengthColor}` : "bg-white/10"}`} />
                          ))}
                        </div>
                        <span className={`text-[11px] font-black ${score <= 2 ? "text-red-300" : score <= 4 ? "text-amber-200" : "text-emerald-300"}`}>
                          {form.password ? strengthLabel : "Strength"}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                        {checks.map((check) => (
                          <span key={check.label} className={`text-[11px] font-semibold ${check.met ? "text-emerald-300" : "text-slate-500"}`}>
                            {check.met ? "✓" : "•"} {check.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reset-confirm-password" className="text-sm font-bold text-slate-200">Confirm new password</label>
                    <div className="group relative mt-2">
                      <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-200 group-focus-within:text-cyan-300" />
                      <input
                        id="reset-confirm-password"
                        className={`${inputFrame} ${inputTone(Boolean(errors.confirmPassword))}`}
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                        placeholder="Confirm your new password"
                        aria-invalid={Boolean(errors.confirmPassword)}
                        aria-describedby={errors.confirmPassword ? "reset-confirm-password-error" : undefined}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
                        title={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition duration-200 hover:bg-white/[0.06] hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                        onClick={() => setShowConfirmPassword((value) => !value)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span id="reset-confirm-password-error" className="mt-2 block text-xs font-bold text-red-300">{errors.confirmPassword}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-sm font-black text-white shadow-[0_16px_40px_rgba(59,130,246,0.35)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(99,102,241,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080f20] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition duration-200 group-hover:opacity-100" />
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Updating password...
                      </>
                    ) : (
                      <>
                        Reset Password <ArrowRight size={18} className="transition duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 flex justify-center">
                  <Link to="/login" className="inline-flex items-center gap-2 text-sm font-black text-cyan-300 transition hover:text-cyan-200">
                    <ArrowLeft size={16} /> Back to Login
                  </Link>
                </div>
              </>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] font-semibold text-slate-500">
              <ShieldCheck size={13} className="text-cyan-400/80" /> Reset links are single-use and expire in 15 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
