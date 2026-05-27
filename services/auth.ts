// services/auth.ts

import { api } from "@/lib/api";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "@/lib/token";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/auth.types";

/* ==========================================================================
   TYPES & RESPONSES
   ========================================================================== */

interface RefreshTokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface GenericAuthResponse {
  success: boolean;
  message: string;
}

/* ==========================================================================
   CORE AUTHENTICATION ENDPOINTS
   ========================================================================== */

/**
 * Authenticates a user and returns their session tokens and profile information.
 */
export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return api<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

/**
 * Registers a new account entry inside the database.
 */
export async function register(payload: SignupRequest): Promise<SignupResponse> {
  return api<SignupResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

/* ==========================================================================
   PASSWORD RECOVERY LIFECYCLE
   ========================================================================== */

/**
 * Initiates a password reset cycle by emailing a single-use token link.
 */
export async function forgotPassword(email: string): Promise<GenericAuthResponse> {
  return api<GenericAuthResponse>("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

/**
 * Updates account credentials with a fresh password choice.
 * Note: Local "newPassword" parameter maps directly to backend "password" variable validation schema requirements.
 */
export async function resetPassword(
  token: string,
  newPassword: string,
  confirmPassword: string
): Promise<GenericAuthResponse> {
  return api<GenericAuthResponse>("/auth/reset-password", {
    method: "POST",
    body: {
      token,
      password: newPassword,
      confirmPassword,
    },
  });
}

/* ==========================================================================
   EMAIL VERIFICATION MANAGEMENT
   ========================================================================== */

/**
 * Validates a user's verification token via an explicit query parameter string handshake.
 */
export async function verifyEmail(token: string): Promise<GenericAuthResponse> {
  const queryParam = encodeURIComponent(token);
  return api<GenericAuthResponse>(`/auth/verify-email?token=${queryParam}`, {
    method: "GET",
  });
}

/**
 * Dispatches a new transactional token activation link back to an unverified user's inbox.
 */
export async function resendVerificationLink(email: string): Promise<GenericAuthResponse> {
  return api<GenericAuthResponse>("/auth/resend-verification", {
    method: "POST",
    body: { email },
  });
}

/* ==========================================================================
   TOKEN INTERCEPTORS & ROTATION SESSIONS
   ========================================================================== */

/**
 * Raw endpoint wrapper targeting access token renewal paths.
 */
export async function refreshToken(tokenString: string): Promise<RefreshTokenResponse> {
  return api<RefreshTokenResponse>("/auth/refresh-token", {
    method: "POST",
    body: { refreshToken: tokenString },
  });
}

/**
 * Orchestrates token updates by verifying current browser state strings, rotating parameters,
 * and saving fresh credentials cleanly. Emits clear fallbacks on absolute session expirations.
 */
export async function refreshAccessToken(): Promise<string> {
  const activeRefreshToken = getRefreshToken();

  if (!activeRefreshToken) {
    throw new Error("No refresh token found in storage context.");
  }

  try {
    const response = await api<RefreshTokenResponse>("/auth/refresh-token", {
      method: "POST",
      body: { refreshToken: activeRefreshToken },
    });

    // Save newly updated tokens into secure cookies or storage layout boundaries
    setAccessToken(response.data.accessToken);

    if (response.data.refreshToken) {
      setRefreshToken(response.data.refreshToken);
    }

    return response.data.accessToken;
  } catch (error) {
    // Session is unrecoverable or compromise suspected — clear out credentials entirely
    clearTokens();
    throw error;
  }
}
