export type UserRole =
  | "FOUNDER"
  | "INVESTOR"
  | "MANUFACTURER"
  | "ADMIN";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  timestamp: string;
  data: {
    accessToken: string;
    refreshToken?: string;
    user?: any;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupResponse {
  status: number;
  message: string;
  timestamp: string;
}
