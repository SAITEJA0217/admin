import { http, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";

export const analyticsService = {
  getDashboard: () =>
    http
      .get<ApiResponse<AdminDashboardData>>(API.dashboard.base)
      .then((r: { data: ApiResponse<AdminDashboardData> }) => r.data.data),
};

export interface AdminDashboardData {
  users: number;
  manufacturers: {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
  };
  investors: {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
  };
  startups: {
    total: number;
    pending: number;
    verified: number;
    rejected: number;
  };
  clubs: number;
  meetings: number;
}
