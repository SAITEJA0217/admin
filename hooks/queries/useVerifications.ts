import { useQuery } from "@tanstack/react-query";
import { verificationService, type VerificationListParams } from "@/services/admin/verification.service";
import { queryKeys } from "@/constants/query-keys";

export function useVerifications(params: VerificationListParams = {}) {
  return useQuery({
    queryKey: queryKeys.verification.list(params),
    queryFn: () => verificationService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
