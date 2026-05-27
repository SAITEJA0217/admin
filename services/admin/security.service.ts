import { http, type ApiResponse } from "@/lib/http";
import type { SecurityEvent } from "@/lib/types";

export const securityService = {
  getEvents: (params?: { resolved?: boolean; severity?: string; page?: number }) =>
    Promise.resolve({ data: [] as SecurityEvent[], meta: { total: 0 } }),

  resolveEvent: (id: string) =>
    Promise.resolve({} as SecurityEvent),

  blockIp: (ip_address: string, reason?: string) =>
    Promise.resolve({ message: "IP blocked successfully" }),

  getSessions: () =>
    Promise.resolve([] as AdminSession[]),

  revokeSession: (id: string) =>
    Promise.resolve({ message: "Session revoked successfully" }),
};

export interface AdminSession {
  id: string;
  name: string;
  ip: string;
  browser: string;
  location: string;
  active: boolean;
  last_seen: string;
}
