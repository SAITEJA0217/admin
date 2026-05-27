import { api } from "@/lib/api";
import type {
  ApiResponse,
  FounderProfile,
} from "@/types/founder";

export async function getFounderProfile(): Promise<FounderProfile> {
  const response =
    await api<ApiResponse<FounderProfile>>(
      "/founders/me",
      {
        method: "GET",
      }
    );

  return response.data;
}