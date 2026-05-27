import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { Report } from "@/lib/types";

export interface ReportListParams {
  status?: string;
  severity?: string;
  target_type?: string;
  page?: number;
  per_page?: number;
}

export const moderationService = {
  getAll: (params: ReportListParams) => {
    const cleanParams = { ...params };
    if (cleanParams.status === "all") {
      delete cleanParams.status;
    }
    return http
      .get<PaginatedResponse<Report>>(API.moderation.reports, { params: cleanParams })
      .then((r) => r.data);
  },

  resolve: (id: string, notes?: string) =>
    http
      .patch<ApiResponse<Report>>(API.moderation.resolve(id), { notes })
      .then((r) => r.data.data),

  deleteComment: (id: string) =>
    http
      .delete<{ message: string }>(API.moderation.deleteComment(id))
      .then((r) => r.data),

  pinPost: (id: string) =>
    http
      .patch<ApiResponse<any>>(API.moderation.pinPost(id))
      .then((r) => r.data.data),
};
