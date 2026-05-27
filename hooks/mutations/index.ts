import { applyOptimisticUpdate, rollbackOptimisticUpdate } from "@/lib/optimistic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { moderationService } from "@/services/admin/moderation.service";
import { badgesService } from "@/services/admin/badges.service";
import { clubsService } from "@/services/admin/clubs.service";
import { groupsService } from "@/services/admin/groups.service";
import { meetingsService } from "@/services/admin/meetings.service";
import { helpdeskService } from "@/services/admin/helpdesk.service";
import { securityService } from "@/services/admin/security.service";
import { queryKeys } from "@/constants/query-keys";

// ─── Moderation ───────────────────────────────────────────────────────────────

export function useModerationMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.reports.all });

  const resolve = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }) => moderationService.resolve(id, notes),
    onMutate: async ({ id }) => applyOptimisticUpdate(qc, queryKeys.reports.all, (data) => data.map((item: any) => item.id === id ? { ...item, status: "resolved" } : item)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.reports.all, context); toast.error("Failed to resolve report"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Report resolved"),
  });

  const deleteComment = useMutation({
    mutationFn: async (id: string) => moderationService.deleteComment(id),
    onMutate: async (id) => applyOptimisticUpdate(qc, queryKeys.reports.all, (data) => data.filter((item: any) => item.id !== id)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.reports.all, context); toast.error("Failed to delete comment"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Comment deleted permanently"),
  });

  const pinPost = useMutation({
    mutationFn: async (id: string) => moderationService.pinPost(id),
    onSuccess: () => toast.success("Post pinned successfully"),
    onError: () => toast.error("Failed to pin post"),
  });

  return { resolve, deleteComment, pinPost };
}

// ─── Badges ───────────────────────────────────────────────────────────────────

export function useBadgeMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.badges.all });

  const create = useMutation({
    mutationFn: async (data: Parameters<typeof badgesService.create>[0]) => badgesService.create(data),
    onSuccess: (data: any) => { invalidate(); toast.success(`Badge "${data.name}" created`); },
    onError: () => toast.error("Failed to create badge"),
  });

  const award = useMutation({
    mutationFn: async (data: Parameters<typeof badgesService.award>[0]) => badgesService.award(data),
    onSuccess: () => { invalidate(); toast.success("Badge awarded successfully"); },
    onError: () => toast.error("Failed to award badge"),
  });

  const revoke = useMutation({
    mutationFn: async (data: Parameters<typeof badgesService.revoke>[0]) => badgesService.revoke(data),
    onSuccess: () => { invalidate(); toast.success("Badge revoked successfully"); },
    onError: () => toast.error("Failed to revoke badge"),
  });

  return { create, award, revoke };
}

// ─── Clubs ────────────────────────────────────────────────────────────────────

export function useClubMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.clubs.all });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Parameters<typeof clubsService.update>[1] }) => clubsService.update(id, data),
    onMutate: async ({ id, data }) => applyOptimisticUpdate(qc, queryKeys.clubs.all, (old) => old.map((item: any) => item.id === id ? { ...item, ...data } : item)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.clubs.all, context); toast.error("Failed to update club"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Club updated"),
  });

  const deleteClub = useMutation({
    mutationFn: async (id: string) => clubsService.delete(id),
    onMutate: async (id) => applyOptimisticUpdate(qc, queryKeys.clubs.all, (data) => data.filter((item: any) => item.id !== id)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.clubs.all, context); toast.error("Failed to delete club"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Club deleted"),
  });

  return { update, deleteClub };
}

// ─── Groups ───────────────────────────────────────────────────────────────────

export function useGroupMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.groups.all });

  const approve = useMutation({
    mutationFn: async (id: string) => groupsService.verify(id),
    onMutate: async (id) => applyOptimisticUpdate(qc, queryKeys.groups.all, (data) => data.map((item: any) => item.id === id ? { ...item, verification_status: "verified" } : item)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.groups.all, context); toast.error("Failed to verify group"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Group verified"),
  });

  const deleteGroup = useMutation({
    mutationFn: async (id: string) => groupsService.delete(id),
    onMutate: async (id) => applyOptimisticUpdate(qc, queryKeys.groups.all, (data) => data.filter((item: any) => item.id !== id)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.groups.all, context); toast.error("Failed to remove group"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Group removed"),
  });

  return { approve, deleteGroup };
}

// ─── Meetings ─────────────────────────────────────────────────────────────────

export function useMeetingMutations() {
  const qc = useQueryClient();

  const cancel = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => meetingsService.cancel(id, reason),
    onMutate: async ({ id }) => applyOptimisticUpdate(qc, queryKeys.meetings.all, (data) => data.map((item: any) => item.id === id ? { ...item, status: "cancelled" } : item)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.meetings.all, context); toast.error("Failed to cancel meeting"); },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.meetings.all }),
    onSuccess: () => toast.success("Meeting cancelled", { description: "Both parties have been notified" }),
  });

  return { cancel };
}

// ─── Helpdesk ─────────────────────────────────────────────────────────────────

export function useHelpdeskMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: queryKeys.tickets.all });

  const resolve = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }) => helpdeskService.resolve(id, notes),
    onMutate: async ({ id }) => applyOptimisticUpdate(qc, queryKeys.tickets.all, (data) => data.map((item: any) => item.id === id ? { ...item, status: "resolved" } : item)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.tickets.all, context); toast.error("Failed to resolve ticket"); },
    onSettled: invalidate,
    onSuccess: () => toast.success("Ticket marked as resolved"),
  });

  return { resolve };
}

// ─── Security ─────────────────────────────────────────────────────────────────

export function useSecurityMutations() {
  const qc = useQueryClient();

  const resolveEvent = useMutation({
    mutationFn: async (id: string) => securityService.resolveEvent(id),
    onMutate: async (id) => applyOptimisticUpdate(qc, queryKeys.security.all, (data) => data.map((item: any) => item.id === id ? { ...item, resolved: true } : item)),
    onError: (err, variables, context) => { rollbackOptimisticUpdate(qc, queryKeys.security.all, context); toast.error("Failed to resolve event"); },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.security.all }),
    onSuccess: () => toast.success("Security event resolved"),
  });

  const blockIp = useMutation({
    mutationFn: async ({ ip_address, reason }: { ip_address: string; reason?: string }) => securityService.blockIp(ip_address, reason),
    onSuccess: (_, { ip_address }) => { qc.invalidateQueries({ queryKey: queryKeys.security.all }); toast.success("IP blocked", { description: ip_address }); },
    onError: () => toast.error("Failed to block IP"),
  });

  return { resolveEvent, blockIp };
}
