import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("techGuruUser") || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("techGuruToken"));
  const [user, setUser] = useState(readStoredUser);
  const [validating, setValidating] = useState(Boolean(localStorage.getItem("techGuruToken")));

  const persist = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem("techGuruToken", nextToken);
    localStorage.setItem("techGuruUser", JSON.stringify(nextUser));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    setValidating(false);
    localStorage.removeItem("techGuruToken");
    localStorage.removeItem("techGuruUser");
  };

  useEffect(() => {
    const onUnauthorized = () => clearSession();
    window.addEventListener("techguru:unauthorized", onUnauthorized);
    return () => window.removeEventListener("techguru:unauthorized", onUnauthorized);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("techGuruToken");
    if (!storedToken) {
      setValidating(false);
      return undefined;
    }
    let active = true;
    setValidating(true);
    api("/auth/me")
      .then((data) => {
        if (!active) return;
        setUser(data.user);
        localStorage.setItem("techGuruUser", JSON.stringify(data.user));
        setValidating(false);
      })
      .catch(() => {
        if (!active) return;
        clearSession();
      });
    return () => {
      active = false;
    };
  }, []);

  const login = async (form) => {
    const data = await api("/auth/login", { method: "POST", body: JSON.stringify(form) });
    persist(data.token, data.user);
  };

  const signup = async (form) => {
    const data = await api("/auth/register", { method: "POST", body: JSON.stringify(form) });
    persist(data.token, data.user);
  };

  const logout = async () => {
    try {
      if (localStorage.getItem("techGuruToken")) {
        await api("/auth/logout", { method: "POST" });
      }
    } catch {
      // Token is cleared regardless of network outcome.
    } finally {
      clearSession();
    }
  };

  const value = useMemo(
    () => ({ token, user, login, signup, logout, isAuthenticated: Boolean(token && user), validating }),
    [token, user, validating]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
