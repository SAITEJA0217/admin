import { useQuery } from "@tanstack/react-query";
import { helpdeskService, type TicketListParams } from "@/services/admin/helpdesk.service";
import { queryKeys } from "@/constants/query-keys";

export function useTickets(params: TicketListParams = {}) {
  return useQuery({
    queryKey: queryKeys.tickets.list(params),
    queryFn: () => helpdeskService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
