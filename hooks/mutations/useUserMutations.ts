import { applyOptimisticUpdate, rollbackOptimisticUpdate } from "@/lib/optimistic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersService } from "@/services/admin/users.service";
import { verificationService } from "@/services/admin/verification.service";
import { queryKeys } from "@/constants/query-keys";
import type { AdminUser } from "@/lib/types";

export function useUserMutations() {
  const qc = useQueryClient();

  const invalidateUsers = () => qc.invalidateQueries({ queryKey: queryKeys.users.all });

  const toggleActiveUser = useMutation({
    mutationFn: async (id: string) => {
      return usersService.toggleActive(id);
    },
    onMutate: async (id) => {
      return applyOptimisticUpdate(qc, queryKeys.users.all, (data) =>
        data.map((item: any) =>
          item.id === id ? { ...item, status: item.status === "active" ? "suspended" : "active" } : item
        )
      );
    },
    onError: (err, variables, context) => {
      rollbackOptimisticUpdate(qc, queryKeys.users.all, context);
      toast.error("Failed to update active status");
    },
    onSettled: () => invalidateUsers(),
    onSuccess: (data) => {
      toast.success("User active status updated successfully");
    },
  });

  const deletePortfolio = useMutation({
    mutationFn: async (id: string) => {
      return usersService.deletePortfolio(id);
    },
    onSettled: () => invalidateUsers(),
    onSuccess: () => {
      toast.success("Portfolio deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete portfolio");
    },
  });

  const verifyUser = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      return verificationService.approve(id, role);
    },
    onMutate: async ({ id }) => {
      return applyOptimisticUpdate(qc, queryKeys.users.all, (data) =>
        data.map((item: any) => (item.id === id ? { ...item, verification_status: "verified" } : item))
      );
    },
    onError: (err, variables, context) => {
      rollbackOptimisticUpdate(qc, queryKeys.users.all, context);
      toast.error("Failed to verify user");
    },
    onSettled: () => invalidateUsers(),
    onSuccess: () => {
      toast.success("User verified successfully");
    },
  });

  return {
    suspendUser: toggleActiveUser, // Keep backwards compatibility with UI pages calling suspendUser
    activateUser: toggleActiveUser, // Keep backwards compatibility with UI pages calling activateUser
    verifyUser,
    deletePortfolio,
  };
}
