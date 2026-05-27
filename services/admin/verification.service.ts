import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { VerificationRequest, AdminUser } from "@/lib/types";

export interface VerificationListParams {
  status?: string;
  entity_type?: string;
  page?: number;
  per_page?: number;
}

const getVerifyEndpoint = (role: string, id: string) => {
  const r = role.toLowerCase();
  if (r.includes("manufacturer")) return API.manufacturers.verify(id);
  if (r.includes("investor")) return API.investors.verify(id);
  return API.startups.verify(id);
};

const getRejectEndpoint = (role: string, id: string) => {
  const r = role.toLowerCase();
  if (r.includes("manufacturer")) return API.manufacturers.reject(id);
  if (r.includes("investor")) return API.investors.reject(id);
  return API.startups.reject(id);
};

export const verificationService = {
  // Query users filtered by verification_status=pending when fetching requests
  getAll: (params: VerificationListParams) =>
    http
      .get<PaginatedResponse<AdminUser>>(API.users.base, {
        params: {
          verification_status: params.status || "pending",
          role: params.entity_type,
          page: params.page,
          per_page: params.per_page,
        },
      })
      .then((r) => {
        // Map AdminUser array to look like VerificationRequest for UI compatibility
        const items = r.data.data.map((user) => ({
          id: user.id,
          user_id: user.id,
          user_name: user.full_name,
          user_email: user.email,
          entity_type: (user.role === "founder" ? "startup" : user.role) as any,
          entity_name: user.company || "N/A",
          status: user.verification_status,
          submitted_at: user.joined_at,
          documents: [],
        }));
        return {
          ...r.data,
          data: items,
        };
      }),

  approve: (id: string, role: string) =>
    http
      .patch<ApiResponse<any>>(getVerifyEndpoint(role, id), {})
      .then((r) => r.data.data),

  reject: (id: string, role: string, reason?: string) =>
    http
      .patch<ApiResponse<any>>(getRejectEndpoint(role, id), { reason })
      .then((r) => r.data.data),

  feature: (id: string, role: string) =>
    http
      .patch<ApiResponse<any>>(API.profiles.feature(role.toLowerCase(), id), {})
      .then((r) => r.data.data),
};
