import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { AuditLog } from "@/lib/types";

export interface AuditLogParams {
  search?: string;
  action?: string;
  admin_email?: string;
  page?: number;
  per_page?: number;
  start_date?: string;
  end_date?: string;
}

export const auditLogsService = {
  getAll: (params?: AuditLogParams) =>
    http
      .get<PaginatedResponse<AuditLog>>(API.auditLogs.base, { params })
      .then((r: { data: PaginatedResponse<AuditLog> }) => r.data),
};
