import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { Group } from "@/lib/types";

export interface GroupListParams {
  status?: string;
  is_private?: boolean;
  page?: number;
  per_page?: number;
}

export const groupsService = {
  getAll: (params?: GroupListParams) => {
    const cleanParams = params ? { ...params } : {};
    if (cleanParams.status === "all") {
      delete cleanParams.status;
    }
    return http
      .get<PaginatedResponse<Group>>("/admin/groups", { params: cleanParams })
      .then((r) => r.data)
      .catch((err) => {
        if (err?.status === 404 || err?.response?.status === 404) {
          return {
            data: [],
            meta: { total: 0, page: 1, per_page: 10, last_page: 1 },
          };
        }
        throw err;
      });
  },

  verify: (id: string) =>
    http
      .patch<ApiResponse<Group>>(API.groups.verify(id))
      .then((r) => r.data.data),

  delete: (id: string) =>
    http
      .delete<{ message: string }>(API.groups.byId(id))
      .then((r) => r.data),
};
