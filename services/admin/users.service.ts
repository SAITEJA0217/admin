import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { AdminUser } from "@/lib/types";

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface UserListParams {
  search?: string;
  role?: string;
  status?: string;
  verification_status?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}

export interface UpdateUserDto {
  status?: AdminUser["status"];
  verification_status?: AdminUser["verification_status"];
  role?: AdminUser["role"];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const usersService = {
  getAll: (params: UserListParams) =>
    http
      .get<PaginatedResponse<AdminUser>>(API.users.base, { params })
      .then((r) => r.data),

  getById: (id: string) =>
    http.get<ApiResponse<AdminUser>>(API.users.byId(id)).then((r) => r.data.data),

  toggleActive: (id: string) =>
    http
      .patch<ApiResponse<AdminUser>>(API.users.toggleActive(id))
      .then((r) => r.data.data),

  deletePortfolio: (id: string) =>
    http
      .delete<{ message: string }>(API.users.deletePortfolio(id))
      .then((r) => r.data),
};
