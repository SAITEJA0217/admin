import { useQuery } from "@tanstack/react-query";
import { groupsService, type GroupListParams } from "@/services/admin/groups.service";
import { queryKeys } from "@/constants/query-keys";

export function useGroups(params: GroupListParams = {}) {
  return useQuery({
    queryKey: queryKeys.groups.list(params),
    queryFn: () => groupsService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
