const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function notifyUnauthorized() {
  window.dispatchEvent(new CustomEvent("techguru:unauthorized"));
}

export async function api(path, options = {}) {
  const token = localStorage.getItem("techGuruToken");
  const headers = options.body instanceof FormData ? {} : { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { ...headers, ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    notifyUnauthorized();
  }
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
