import { useQuery } from "@tanstack/react-query";
import { clubsService, type ClubListParams } from "@/services/admin/clubs.service";
import { queryKeys } from "@/constants/query-keys";

export function useClubs(params: ClubListParams = {}) {
  return useQuery({
    queryKey: queryKeys.clubs.list(params),
    queryFn: () => clubsService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
