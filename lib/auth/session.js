export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try { const storedUser = localStorage.getItem("afra-user"); return storedUser ? JSON.parse(storedUser) : null; } catch { return null; }
}

export async function logoutUser() {
  if (typeof window !== "undefined") { localStorage.removeItem("afra-user"); localStorage.removeItem("afra-remember"); }
  try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
}
