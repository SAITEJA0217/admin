import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { SupportTicket } from "@/lib/types";

export interface TicketListParams {
  status?: string;
  priority?: string;
  category?: string;
  assigned_to?: string;
  page?: number;
  per_page?: number;
}

export const helpdeskService = {
  getAll: (params?: TicketListParams) => {
    const cleanParams = params ? { ...params } : {};
    if (cleanParams.status === "all") {
      delete cleanParams.status;
    }
    return http
      .get<PaginatedResponse<SupportTicket>>(API.helpdesk.base, { params: cleanParams })
      .then((r) => r.data);
  },

  resolve: (id: string, notes?: string) =>
    http
      .patch<ApiResponse<SupportTicket>>(API.helpdesk.resolve(id), { notes })
      .then((r) => r.data.data),
};
