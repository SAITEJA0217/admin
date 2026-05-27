import { applyOptimisticUpdate, rollbackOptimisticUpdate } from "@/lib/optimistic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { verificationService } from "@/services/admin/verification.service";
import { queryKeys } from "@/constants/query-keys";
import { env } from "@/lib/env";
import type { VerificationRequest } from "@/lib/types";

export function useVerificationMutations() {
  const qc = useQueryClient();

  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.verification.all });

  const approve = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      return verificationService.approve(id, role);
    },
    onMutate: async ({ id }) => {
      return applyOptimisticUpdate(qc, queryKeys.verification.all, (data) => data.map((item: any) => item.id === id ? { ...item, status: "approved" } : item));
    },
    onError: (err, variables, context) => {
      rollbackOptimisticUpdate(qc, queryKeys.verification.all, context);
      toast.error("Verification failed");
    },
    onSettled: () => invalidate(),
    onSuccess: (data) => {
      toast.success("Profile verified", { description: `${data?.entity_name ?? "Profile"} has been approved` });
    },
  });

  const reject = useMutation({
    mutationFn: async ({ id, role, reason }: { id: string; role: string; reason?: string }) => {
      return verificationService.reject(id, role, reason);
    },
    onMutate: async ({ id }) => {
      return applyOptimisticUpdate(qc, queryKeys.verification.all, (data) => data.map((item: any) => item.id === id ? { ...item, status: "rejected" } : item));
    },
    onError: (err, variables, context) => {
      rollbackOptimisticUpdate(qc, queryKeys.verification.all, context);
      toast.error("Failed to reject verification");
    },
    onSettled: () => invalidate(),
    onSuccess: () => {
      toast.success("Verification rejected");
    },
  });

  const feature = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      return verificationService.feature(id, role);
    },
    onMutate: async ({ id }) => {
      return applyOptimisticUpdate(qc, queryKeys.verification.all, (data) => data.map((item: any) => item.id === id ? { ...item, featured: true } : item));
    },
    onError: (err, variables, context) => {
      rollbackOptimisticUpdate(qc, queryKeys.verification.all, context);
      toast.error("Failed to feature profile");
    },
    onSettled: () => invalidate(),
    onSuccess: (data) => {
      toast.success("Profile featured!", { description: `${data?.entity_name ?? "Profile"} is now featured` });
    },
  });

  return { approve, reject, feature };
}
