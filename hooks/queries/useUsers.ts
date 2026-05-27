import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { usersService, type UserListParams } from "@/services/admin/users.service";
import { queryKeys } from "@/constants/query-keys";
import type { AdminUser } from "@/lib/types";
import type { PaginatedResponse } from "@/lib/http";

export function useUsers(
  params: UserListParams = {},
  options?: Omit<UseQueryOptions<PaginatedResponse<AdminUser>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => usersService.getAll(params),
    staleTime: 60_000,
    gcTime: 300_000,
    
    
    ...options,
  });
}

export function useUser(
  id: string,
  options?: Omit<UseQueryOptions<AdminUser>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersService.getById(id),
    staleTime: 60_000,
    gcTime: 300_000,
    enabled: !!id,
    ...options,
  });
}
