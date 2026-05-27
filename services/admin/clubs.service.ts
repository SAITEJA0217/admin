import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { Club } from "@/lib/types";

export interface ClubListParams {
  search?: string;
  status?: string;
  category?: string;
  page?: number;
  per_page?: number;
}

export interface UpdateClubDto {
  name?: string;
  description?: string;
  category?: string;
  status?: Club["status"];
}

export const clubsService = {
  getAll: (params?: ClubListParams) =>
    http
      .get<PaginatedResponse<Club>>(API.clubs.base, { params })
      .then((r) => r.data),

  update: (id: string, data: UpdateClubDto) =>
    http
      .put<ApiResponse<Club>>(API.clubs.byId(id), data)
      .then((r) => r.data.data),

  delete: (id: string) =>
    http
      .delete<{ message: string }>(API.clubs.byId(id))
      .then((r) => r.data),
};
