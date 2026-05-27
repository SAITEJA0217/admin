import { useQuery } from "@tanstack/react-query";
import { meetingsService, type MeetingListParams } from "@/services/admin/meetings.service";
import { queryKeys } from "@/constants/query-keys";

export function useMeetings(params: MeetingListParams = {}) {
  return useQuery({
    queryKey: queryKeys.meetings.list(params),
    queryFn: () => meetingsService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
