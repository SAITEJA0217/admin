import { useQuery } from "@tanstack/react-query";
import { auditLogsService, type AuditLogParams } from "@/services/admin/audit-logs.service";
import { queryKeys } from "@/constants/query-keys";

export function useAuditLogs(params: AuditLogParams = {}) {
  return useQuery({
    queryKey: queryKeys.auditLogs.list(params),
    queryFn: () => auditLogsService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
  });
}
