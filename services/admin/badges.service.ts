import { http, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { Badge } from "@/lib/types";

export interface CreateBadgeDto {
  name: string;
  description: string;
  category: Badge["category"];
  color: string;
  icon?: string;
}

export interface AwardBadgeDto {
  badge_id: string;
  user_id: string;
}

export interface RevokeBadgeDto {
  badge_id: string;
  user_id: string;
}

export const badgesService = {
  getAll: (params?: any) =>
    Promise.resolve({ data: [] as Badge[], meta: { total: 0 } }),

  create: (data: CreateBadgeDto) =>
    http
      .post<ApiResponse<Badge>>(API.badges.base, data)
      .then((r) => r.data.data),

  award: (data: AwardBadgeDto) =>
    http
      .post<ApiResponse<any>>(API.badges.award, data)
      .then((r) => r.data.data),

  revoke: (data: RevokeBadgeDto) =>
    http
      .delete<ApiResponse<any>>(API.badges.revoke, { data })
      .then((r) => r.data.data),
};
