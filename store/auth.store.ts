import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { tokenStorage } from "@/lib/http";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminRole =
  | "super_admin"
  | "admin"
  | "moderator"
  | "analyst"
  | "support";

export interface AuthUser {
  id: string;
  full_name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions
  setAuth: (user: AuthUser, token: string, refreshToken?: string) => void;
  setUser: (user: AuthUser) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  hydrate: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user, token, refreshToken) => {
        tokenStorage.setToken(token);
        if (refreshToken) tokenStorage.setRefresh(refreshToken);
        set({ user, token, isAuthenticated: true, isLoading: false });
      },

      setUser: (user) => set({ user }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        tokenStorage.clear();
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },

      hydrate: () => {
        const token = tokenStorage.getToken();
        if (!token) {
          set({ isLoading: false });
        } else {
          set({ token, isLoading: false });
        }
      },
    }),
    {
      name: "vl_admin_auth",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
