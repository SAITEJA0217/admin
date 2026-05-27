import { QueryClient } from "@tanstack/react-query";

/**
 * Utility to standardize React Query optimistic updates and reduce boilerplate.
 * Works with paginated responses of format `{ data: T[], meta: any }`.
 */

export async function applyOptimisticUpdate<T>(
  qc: QueryClient,
  queryKey: readonly any[],
  updateFn: (oldData: T[]) => T[]
) {
  await qc.cancelQueries({ queryKey });
  const previous = qc.getQueryData(queryKey);
  qc.setQueriesData({ queryKey }, (old: any) => {
    if (!old?.data) return old;
    return { ...old, data: updateFn(old.data) };
  });
  return { previous };
}

export function rollbackOptimisticUpdate(
  qc: QueryClient,
  queryKey: readonly any[],
  context: any
) {
  if (context?.previous) {
    qc.setQueriesData({ queryKey }, context.previous);
  }
}
