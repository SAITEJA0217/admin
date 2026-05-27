import { http, type PaginatedResponse, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";
import type { Meeting } from "@/lib/types";

export interface MeetingListParams {
  status?: string;
  meeting_type?: string;
  page?: number;
  per_page?: number;
}

export const meetingsService = {
  getAll: (params: MeetingListParams) => {
    const cleanParams = { ...params };
    if (cleanParams.status === "all") {
      delete cleanParams.status;
    }
    return http
      .get<PaginatedResponse<Meeting>>(API.meetings.base, { params: cleanParams })
      .then((r) => r.data);
  },

  cancel: (id: string, reason?: string) =>
    http
      .patch<ApiResponse<Meeting>>(API.meetings.cancel(id), { reason })
      .then((r) => r.data.data),
};
