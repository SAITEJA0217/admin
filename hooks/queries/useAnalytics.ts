import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/admin/analytics.service";
import { auditLogsService } from "@/services/admin/audit-logs.service";
import { queryKeys } from "@/constants/query-keys";

// ─── Deduplicated Dashboard Queries ──────────────────────────────────────────

export function useDashboardData() {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: () => analyticsService.getDashboard(),
    staleTime: 60_000, // Important for deduping and caching
  });
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: () => analyticsService.getDashboard(),
    staleTime: 60_000,
    select: (data) => [
      { id: "total-users", title: "Total Users", value: data.users.toLocaleString(), icon: "Users", color: "purple" as const, description: "Registered accounts" },
      { id: "total-startups", title: "Total Startups", value: data.startups.total.toLocaleString(), icon: "Rocket", color: "blue" as const, description: "Active ventures" },
      { id: "total-investors", title: "Total Investors", value: data.investors.total.toLocaleString(), icon: "TrendingUp", color: "cyan" as const, description: "Verified investors" },
      { id: "total-manufacturers", title: "Manufacturers", value: data.manufacturers.total.toLocaleString(), icon: "Factory", color: "emerald" as const, description: "Production partners" },
      { id: "active-clubs", title: "Active Clubs", value: data.clubs.toLocaleString(), icon: "Users2", color: "violet" as const, description: "Community clubs" },
      { id: "total-meetings", title: "Meetings Scheduled", value: data.meetings.toLocaleString(), icon: "Calendar", color: "indigo" as const, description: "Facilitated matches" },
    ],
  });
}

export function useCommunityMetrics() {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: () => analyticsService.getDashboard(),
    staleTime: 60_000,
    select: (data) => [
      { label: "Total Clubs", value: data.clubs.toString(), icon: "Users2", color: "violet" },
      { label: "Total Startups", value: data.startups.total.toString(), icon: "Rocket", color: "blue" },
      { label: "Verified Investors", value: data.investors.verified.toString(), icon: "ShieldCheck", color: "cyan" },
    ],
  });
}

export function useOperationalMetrics() {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: () => analyticsService.getDashboard(),
    staleTime: 60_000,
    select: (data) => [
      { label: "Scheduled Meetings", value: data.meetings.toString(), icon: "Calendar", color: "purple" },
      { label: "Active Investors", value: data.investors.total.toString(), icon: "Users", color: "blue" },
      { label: "Pending Verifications", value: (data.startups.pending + data.investors.pending + data.manufacturers.pending).toString(), icon: "AlertCircle", color: "cyan" },
    ],
  });
}

export function useModerationOverviewMetrics() {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: () => analyticsService.getDashboard(),
    staleTime: 60_000,
    select: (data) => [
      { id: "pending-reports", title: "Pending Verifications", value: data.startups.pending + data.investors.pending, badge: "VERIFY", badgeColor: "yellow" as const, icon: "AlertTriangle", color: "yellow" as const },
      { id: "verified-startups", title: "Verified Startups", value: data.startups.verified, badge: "OK", badgeColor: "green" as const, icon: "CheckCircle2", color: "green" as const },
      { id: "rejected-startups", title: "Rejected Startups", value: data.startups.rejected, badge: "BLOCKED", badgeColor: "red" as const, icon: "UserX", color: "red" as const },
      { id: "total-investors", title: "Total Investors", value: data.investors.total, badge: "INVESTOR", badgeColor: "yellow" as const, icon: "Flag", color: "orange" as const },
    ],
  });
}

export function useActivityFeed() {
  return useQuery({
    queryKey: queryKeys.dashboard.activity(),
    queryFn: async () => {
      try {
        const response = await auditLogsService.getAll({ page: 1, per_page: 8 });
        
        const res = response as any;
        const logs = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.logs)
          ? res.logs
          : Array.isArray(res?.data?.logs)
          ? res.data.logs
          : [];

        const iconMap: Record<string, string> = {
          "user.verified": "ShieldCheck",
          "report.resolved": "CheckCircle2",
          "user.suspended": "UserX",
          "content.deleted": "Flag",
          "badge.awarded": "Award",
          "club.created": "Users",
          "settings.changed": "Database",
          "login.failed": "ShieldAlert",
        };
        const colorMap: Record<string, string> = {
          "user.verified": "purple",
          "report.resolved": "green",
          "user.suspended": "red",
          "content.deleted": "orange",
          "badge.awarded": "yellow",
          "club.created": "cyan",
          "settings.changed": "blue",
          "login.failed": "red",
        };
        return logs.map((log: any) => ({
          id: log.id,
          type: log.action,
          message: `${log.action}: ${log.target_name || ""}`,
          actor: log.admin_name || log.admin_email || "System",
          time: new Date(log.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }),
          icon: iconMap[log.action] ?? "Database",
          color: colorMap[log.action] ?? "purple",
        }));
      } catch (err) {
        console.error(err);
        return [];
      }
    },
    staleTime: 60_000,
  });
}
