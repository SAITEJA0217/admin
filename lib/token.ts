// ─── Token Management ─────────────────────────────────────────────────────────
// Single source of truth for access + refresh tokens.

const ACCESS_KEY = "vl_token";
const REFRESH_KEY = "vl_refresh";

// ─── Getters ──────────────────────────────────────────────────────────────────

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
};

// ─── Setters ──────────────────────────────────────────────────────────────────

export const setAccessToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, token);
};

export const setRefreshToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(REFRESH_KEY, token);
};

// ─── Clear ────────────────────────────────────────────────────────────────────

export const clearTokens = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  // Clean up legacy keys from previous implementations
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("vl_admin_token");
  localStorage.removeItem("vl_admin_refresh");
};