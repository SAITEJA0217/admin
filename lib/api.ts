// lib/api.ts — Fetch-based API client (used by auth services)

import { env } from "@/lib/env";
import { getAccessToken, clearTokens } from "@/lib/token";

interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * Lightweight fetch wrapper with:
 * - Auto Content-Type (JSON / FormData)
 * - Bearer token injection
 * - Structured error parsing
 * - 401 session cleanup
 */
export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options;

  const token = getAccessToken();
  const headers = new Headers(customHeaders);

  // Auto-set JSON Content-Type unless FormData
  if (body && !(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Inject auth token
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${env.apiUrl}${endpoint}`, {
    ...rest,
    headers,
    body:
      body instanceof FormData
        ? body
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
  });

  // Parse response safely
  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // Empty or non-JSON responses
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearTokens();
    }

    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data as T;
}

// ─── Verb Shortcuts ───────────────────────────────────────────────────────────

api.get = <T>(endpoint: string, options?: ApiOptions) =>
  api<T>(endpoint, { ...options, method: "GET" });

api.post = <T>(endpoint: string, body?: unknown, options?: ApiOptions) =>
  api<T>(endpoint, { ...options, method: "POST", body });

api.put = <T>(endpoint: string, body?: unknown, options?: ApiOptions) =>
  api<T>(endpoint, { ...options, method: "PUT", body });

api.patch = <T>(endpoint: string, body?: unknown, options?: ApiOptions) =>
  api<T>(endpoint, { ...options, method: "PATCH", body });

api.delete = <T>(endpoint: string, options?: ApiOptions) =>
  api<T>(endpoint, { ...options, method: "DELETE" });
