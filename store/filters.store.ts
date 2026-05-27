import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserFilters {
  search: string;
  role: string;
  status: string;
  page: number;
}

export interface ReportFilters {
  status: string;
  severity: string;
  page: number;
}

export interface VerificationFilters {
  status: string;
  entityType: string;
  page: number;
}

export interface MeetingFilters {
  status: string;
  type: string;
  page: number;
}

export interface TicketFilters {
  status: string;
  priority: string;
  page: number;
}

export interface GroupFilters {
  status: string;
  page: number;
}

export interface AuditLogFilters {
  search: string;
  action: string;
  page: number;
}

export interface AnalyticsFilters {
  dateRange: "7d" | "30d" | "90d" | "custom";
  startDate?: string;
  endDate?: string;
}

interface FiltersState {
  users: UserFilters;
  reports: ReportFilters;
  verification: VerificationFilters;
  meetings: MeetingFilters;
  tickets: TicketFilters;
  groups: GroupFilters;
  auditLogs: AuditLogFilters;
  analytics: AnalyticsFilters;

  setUserFilters: (f: Partial<UserFilters>) => void;
  setReportFilters: (f: Partial<ReportFilters>) => void;
  setVerificationFilters: (f: Partial<VerificationFilters>) => void;
  setMeetingFilters: (f: Partial<MeetingFilters>) => void;
  setTicketFilters: (f: Partial<TicketFilters>) => void;
  setGroupFilters: (f: Partial<GroupFilters>) => void;
  setAuditLogFilters: (f: Partial<AuditLogFilters>) => void;
  setAnalyticsFilters: (f: Partial<AnalyticsFilters>) => void;
  resetFilters: (page: keyof Omit<FiltersState, `set${string}` | "resetFilters">) => void;
}

const DEFAULT_FILTERS = {
  users: { search: "", role: "all", status: "all", page: 1 },
  reports: { status: "all", severity: "all", page: 1 },
  verification: { status: "all", entityType: "all", page: 1 },
  meetings: { status: "all", type: "all", page: 1 },
  tickets: { status: "all", priority: "all", page: 1 },
  groups: { status: "all", page: 1 },
  auditLogs: { search: "", action: "all", page: 1 },
  analytics: { dateRange: "30d" as const },
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      ...DEFAULT_FILTERS,

      setUserFilters: (f) =>
        set((s) => ({ users: { ...s.users, ...f, page: f.page ?? 1 } })),
      setReportFilters: (f) =>
        set((s) => ({ reports: { ...s.reports, ...f, page: f.page ?? 1 } })),
      setVerificationFilters: (f) =>
        set((s) => ({
          verification: { ...s.verification, ...f, page: f.page ?? 1 },
        })),
      setMeetingFilters: (f) =>
        set((s) => ({ meetings: { ...s.meetings, ...f, page: f.page ?? 1 } })),
      setTicketFilters: (f) =>
        set((s) => ({ tickets: { ...s.tickets, ...f, page: f.page ?? 1 } })),
      setGroupFilters: (f) =>
        set((s) => ({ groups: { ...s.groups, ...f, page: f.page ?? 1 } })),
      setAuditLogFilters: (f) =>
        set((s) => ({
          auditLogs: { ...s.auditLogs, ...f, page: f.page ?? 1 },
        })),
      setAnalyticsFilters: (f) =>
        set((s) => ({ analytics: { ...s.analytics, ...f } })),

      resetFilters: (page) =>
        set(() => ({
          [page]: DEFAULT_FILTERS[page as keyof typeof DEFAULT_FILTERS],
        })),
    }),
    {
      name: "vl_admin_filters",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : ({} as Storage)
      ),
    }
  )
);
