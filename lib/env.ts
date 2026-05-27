// ─── Environment Configuration ────────────────────────────────────────────────

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.venturelauncher.in/api/v1";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  "https://api.venturelauncher.in";

export const env = {
  // API BASE URL (includes /api/v1 suffix)
  apiUrl: API_URL,

  // SOCKET URL (base domain, no path suffix)
  socketUrl: SOCKET_URL,

  // ENVIRONMENT
  appEnv:
    process.env.NODE_ENV || "development",

  // FLAGS
  isDev:
    process.env.NODE_ENV === "development",

  isProd:
    process.env.NODE_ENV === "production",
} as const;