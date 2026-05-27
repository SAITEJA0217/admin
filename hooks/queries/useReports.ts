import { useQuery } from "@tanstack/react-query";
import { moderationService, type ReportListParams } from "@/services/admin/moderation.service";
import { queryKeys } from "@/constants/query-keys";

export function useReports(params: ReportListParams = {}) {
  return useQuery({
    queryKey: queryKeys.reports.list(params),
    queryFn: () => moderationService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
