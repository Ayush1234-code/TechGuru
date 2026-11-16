import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, validating } = useAuth();
  if (validating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
          Verifying session...
        </div>
      </div>
    );
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
