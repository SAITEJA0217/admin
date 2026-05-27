import { useQuery } from "@tanstack/react-query";
import { securityService } from "@/services/admin/security.service";
import { queryKeys } from "@/constants/query-keys";

export function useSecurityEvents(params: { resolved?: boolean; severity?: string; page?: number } = {}) {
  return useQuery({
    queryKey: queryKeys.security.events(params),
    queryFn: () => securityService.getEvents(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
    refetchInterval: 60 // Poll security events every minute
  });
}
