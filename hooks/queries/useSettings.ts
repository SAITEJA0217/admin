import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService, type AllSettings } from "@/services/admin/settings.service";
import { queryKeys } from "@/constants/query-keys";
import { toast } from "sonner";

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsService.getAll(),
    staleTime: 60_000,
    gcTime: 300_000,
  });
}

export function useSettingsMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ section, data }: { section: string; data: Partial<AllSettings> }) => {
      return settingsService.update(section, data);
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.all });
      toast.success(res.message ?? "Settings saved successfully");
    },
    onError: () => {
      toast.error("Failed to save changes");
    },
  });
}
