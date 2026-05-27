import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { env } from "./env";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "./token";

// ─── Error Types ──────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  errors?: Record<string, string[]>;
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

export const http = axios.create({
  baseURL: env.apiUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor (with token refresh & queue) ────────────────────────

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent refresh loop for the refresh endpoint itself
      if (originalRequest.url?.includes("/auth/refresh-token")) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue requests while a refresh is in progress
        return new Promise((resolve) => {
          refreshQueue.push((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(http(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = getRefreshToken();
        if (!currentRefreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(
          `${env.apiUrl}/auth/refresh-token`,
          { refreshToken: currentRefreshToken }
        );

        // Backend response: { data: { accessToken, refreshToken? } }
        const newAccessToken: string = data?.data?.accessToken ?? data?.accessToken;
        if (!newAccessToken) throw new Error("Invalid refresh response");

        setAccessToken(newAccessToken);

        const newRefreshToken = data?.data?.refreshToken ?? data?.refreshToken;
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        // Drain queued requests
        refreshQueue.forEach((cb) => cb(newAccessToken));
        refreshQueue = [];

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return http(originalRequest);
      } catch {
        clearTokens();
        refreshQueue = [];
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalize error for consumers
    const apiError: ApiError = {
      message:
        (error.response?.data as { message?: string })?.message ??
        error.message ??
        "An unexpected error occurred",
      status: error.response?.status ?? 0,
      code: (error.response?.data as { code?: string })?.code,
      errors: (error.response?.data as { errors?: Record<string, string[]> })
        ?.errors,
    };

    return Promise.reject(apiError);
  }
);

// ─── Typed Response Helpers ───────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    per_page: number;
    last_page: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
