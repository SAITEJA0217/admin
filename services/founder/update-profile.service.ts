import { api } from "@/lib/api";
import type {
  ApiResponse,
  FounderProfile,
} from "@/types/founder";

export type UpdateFounderProfileRequest = {
  companyName: string;
  tagline?: string;
  description?: string;
  Industry?: string;
  stage?: string;
  fundingGoal?: number;
  fundingRaised?: number;
  logoUrl?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  pitchDeckKey?: string;
  location?: string;
};

export async function updateFounderProfile(
  payload: UpdateFounderProfileRequest
): Promise<FounderProfile> {
  const response =
    await api<ApiResponse<FounderProfile>>(
      "/founders/me",
      {
        method: "PATCH",
        body: payload,
      }
    );

  return response.data;
}