import { api } from "@/lib/api";
import type { FounderDashboardData } from "@/types/founder";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export async function getFounderDashboard(): Promise<FounderDashboardData> {
  const response = await api<ApiResponse<FounderDashboardData>>(
    "/founders/me",
    {
      method: "GET",
    }
  );

  return response.data;
}