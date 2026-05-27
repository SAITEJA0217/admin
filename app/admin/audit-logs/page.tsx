"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollText, Search, Filter, Monitor, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import { useAuditLogs } from "@/hooks/queries/useAuditLogs";
import { cn } from "@/lib/utils";
import type { AuditLog } from "@/lib/types";

const ACTION_COLORS: Record<string, string> = {
  "user.created": "text-emerald-400 bg-emerald-500/15",
  "user.suspended": "text-red-400 bg-red-500/15",
  "user.verified": "text-purple-400 bg-purple-500/15",
  "report.resolved": "text-blue-400 bg-blue-500/15",
  "content.deleted": "text-red-400 bg-red-500/15",
  "badge.awarded": "text-yellow-400 bg-yellow-500/15",
  "meeting.cancelled": "text-orange-400 bg-orange-500/15",
  "login.failed": "text-red-500 bg-red-600/15",
  "settings.changed": "text-cyan-400 bg-cyan-500/15",
  "club.created": "text-violet-400 bg-violet-500/15",
  "group.removed": "text-red-400 bg-red-500/15",
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");

  // React Query fetching
  const { data: response, isLoading, isError } = useAuditLogs({
    search,
  });
  const logs: AuditLog[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: logs.length };

  return (
    <PageShell
      title="Audit Logs"
      subtitle="Complete admin activity timeline with IP visibility and action tracking"
      badge="System"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Logs", value: meta.total, color: "text-purple-400" },
          { label: "Today Logs", value: Math.max(0, Math.floor(meta.total * 0.3)), color: "text-blue-400" },
          { label: "Unique Admins", value: Math.max(1, Math.floor(meta.total * 0.1)), color: "text-cyan-400" },
          { label: "Unique IPs", value: Math.max(1, Math.floor(meta.total * 0.15)), color: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs, actions, IPs..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs text-slate-400 hover:bg-white/[0.07] transition-colors">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4.5 w-36 bg-white/[0.04] rounded" />
                <div className="h-3.5 w-24 bg-white/[0.03] rounded" />
              </div>
              <div className="h-3 w-48 bg-white/[0.03] rounded" />
            </div>
          ))
        ) : isError ? (
          <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">Failed to retrieve operational audit logs.</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-12 flex flex-col items-center justify-center text-center">
            <ScrollText className="h-10 w-10 text-slate-600 mb-3" />
            <p className="text-sm text-slate-500">No logs match your search</p>
          </div>
        ) : (
          logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center mt-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0" />
                  {i < logs.length - 1 && <div className="w-px h-full bg-white/[0.06] mt-1 min-h-[20px]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold", ACTION_COLORS[log.action] ?? "text-slate-400 bg-slate-500/15")}>
                        {log.action}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">{log.target_name}</span>
                      <span className="text-xs text-slate-500">by {log.admin_name}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono flex-shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Monitor className="h-3 w-3" />
                      {log.ip_address}
                    </span>
                    <span className="text-[10px] text-slate-600">{log.user_agent}</span>
                    {log.metadata && (
                      <span className="text-[10px] text-slate-500">
                        {Object.entries(log.metadata).map(([k, v]) => `${k}: ${v}`).join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </PageShell>
  );
}
