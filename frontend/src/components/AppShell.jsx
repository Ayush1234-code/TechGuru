import { BarChart3, BookOpen, Brain, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, FileText, History, Home, LogOut, Menu, Settings, Sparkles, Trophy, User, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: Home },
  { to: "/app/resume", label: "Resume Analysis", icon: FileText },
  { to: "/app/practice", label: "Practice", icon: BookOpen },
  { to: "/app/coding", label: "Coding Practice", icon: Code2 },
  { to: "/app/mock-tests", label: "Mock Tests", icon: Brain },
  { to: "/assessment", label: "Assessments", icon: Trophy },
  { to: "/app/mock-tests", label: "Interview", icon: BriefcaseBusiness },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/feedback", label: "Progress", icon: BarChart3 },
  { to: "/app/profile", label: "Profile", icon: User }
];

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = () => {
    logout();
    navigate("/");
  };
  const visibleNav = user?.role === "admin" ? [...nav, { to: "/app/admin", label: "Settings", icon: Settings }] : nav;

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
      <button aria-label="Open navigation" className="fixed left-4 top-4 z-40 rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden" onClick={() => setOpen(true)}>
        <Menu size={20} />
      </button>
      <aside className={`fixed inset-y-0 left-0 z-50 border-r border-slate-200 bg-white shadow-[18px_0_45px_rgba(15,23,42,0.06)] transition-all duration-300 md:translate-x-0 ${collapsed ? "md:w-24" : "md:w-72"} ${open ? "w-72 translate-x-0" : "w-72 -translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-sm">
                <Sparkles size={20} />
              </div>
              {!collapsed && <div>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-blue-600">Tech Guru</p>
                <h1 className="text-lg font-black text-slate-900">Interview OS</h1>
              </div>}
            </div>
            <button aria-label="Collapse navigation" className="hidden rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition hover:bg-blue-50 md:block" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
            </button>
            <button aria-label="Close navigation" className="rounded-xl p-2 hover:bg-slate-100 md:hidden" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
            {visibleNav.map(({ to, label, icon: Icon }) => (
              <NavLink key={`${to}-${label}`} to={to} onClick={() => setOpen(false)} title={label} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition duration-200 ${isActive ? "border border-blue-200 bg-blue-50 text-slate-900 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"} ${collapsed ? "md:justify-center" : ""}`}>
                <Icon className="shrink-0" size={18} /> {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-slate-200 p-4">
            <div className={`mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 ${collapsed ? "md:px-2" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-black text-blue-800">{user?.name?.[0] || "C"}</div>
                {!collapsed && <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-900">{user?.name || "Candidate"}</p>
                  <p className="truncate text-xs text-slate-500">{user?.email}</p>
                </div>}
              </div>
            </div>
            <button className={`btn-secondary w-full ${collapsed ? "md:px-0" : ""}`} onClick={signOut} title="Logout"><LogOut size={16} /> {!collapsed && "Logout"}</button>
          </div>
        </div>
      </aside>
      <main className={`relative min-h-screen px-4 py-6 transition-all duration-300 md:px-8 ${collapsed ? "md:ml-24" : "md:ml-72"}`}>
        <div className="mx-auto max-w-7xl animate-fade-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
