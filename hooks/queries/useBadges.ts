import { useQuery } from "@tanstack/react-query";
import { badgesService } from "@/services/admin/badges.service";
import { queryKeys } from "@/constants/query-keys";

export function useBadges(params: { is_active?: boolean; category?: string; page?: number } = {}) {
  return useQuery({
    queryKey: queryKeys.badges.list(params),
    queryFn: () => badgesService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
