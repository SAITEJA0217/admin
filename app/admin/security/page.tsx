"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Lock, Monitor, ShieldAlert, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useSecurityEvents } from "@/hooks/queries/useSecurityEvents";
import { useSecurityMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";

const SEVERITY_STYLES: Record<string, string> = {
  low: "text-slate-400 bg-slate-500/15 border-slate-500/25",
  medium: "text-yellow-400 bg-yellow-500/15 border-yellow-500/25",
  high: "text-orange-400 bg-orange-500/15 border-orange-500/25",
  critical: "text-red-400 bg-red-500/15 border-red-500/25",
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  failed_login: Lock,
  suspicious_activity: AlertTriangle,
  rate_limit: Monitor,
  blocked_ip: Shield,
  session_anomaly: ShieldAlert,
};

const rbacRoles = [
  { role: "Super Admin", permissions: ["All permissions"], count: 1, color: "text-red-400" },
  { role: "Admin", permissions: ["User management", "Moderation", "Analytics", "Audit logs"], count: 3, color: "text-orange-400" },
  { role: "Moderator", permissions: ["Moderation", "Reports", "Content management"], count: 8, color: "text-yellow-400" },
  { role: "Support", permissions: ["Helpdesk", "User view", "Meetings view"], count: 12, color: "text-blue-400" },
  { role: "Analyst", permissions: ["Analytics read-only", "Reports view"], count: 5, color: "text-purple-400" },
];

export default function SecurityPage() {
  // React Query fetching
  const { data: response, isLoading, isError } = useSecurityEvents();
  const events = response?.data ?? [];

  // Mutations
  const { resolveEvent, blockIp } = useSecurityMutations();

  const unresolvedCount = events.filter(e => !e.resolved).length;
  const criticalCount = events.filter(e => e.severity === "critical").length;

  return (
    <PageShell
      title="Security Center"
      subtitle="Authentication monitoring, RBAC overview, and security event tracking"
      badge="System"
    >
      {/* Security status banner */}
      <AnimatePresence>
        {unresolvedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-center gap-3"
          >
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-300">{unresolvedCount} unresolved security event{unresolvedCount > 1 ? "s" : ""}</p>
              <p className="text-xs text-red-400/70">Immediate attention required</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Events", value: events.length, color: "text-purple-400" },
          { label: "Unresolved", value: unresolvedCount, color: "text-red-400" },
          { label: "Critical", value: criticalCount, color: "text-orange-400" },
          { label: "Blocked IPs", value: events.filter(e => e.type === "blocked_ip").length, color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Security Events */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Security Events</h3>
          <div className="space-y-2">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
                  <div className="h-4 w-24 bg-white/[0.04] rounded" />
                  <div className="h-3 w-3/4 bg-white/[0.03] rounded" />
                  <div className="h-2.5 w-1/2 bg-white/[0.03] rounded" />
                </div>
              ))
            ) : isError ? (
              <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8" />
                <p className="text-sm">Failed to retrieve security event list.</p>
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 text-center text-slate-500">
                <p className="text-sm">No security threats detected.</p>
              </div>
            ) : (
              events.map((event, i) => {
                const Icon = TYPE_ICONS[event.type] ?? Shield;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("rounded-lg p-2 flex-shrink-0", (SEVERITY_STYLES[event.severity] || "text-slate-400 bg-slate-500/15 border-slate-500/25").split(" ").slice(1).join(" "))}>
                        <Icon className={cn("h-4 w-4", (SEVERITY_STYLES[event.severity] || "text-slate-400 bg-slate-500/15 border-slate-500/25").split(" ")[0])} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase", SEVERITY_STYLES[event.severity] || "text-slate-400 bg-slate-500/15 border-slate-500/25")}>
                            {event.severity}
                          </span>
                          <div className="flex items-center gap-1">
                            {event.resolved
                              ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              : <XCircle className="h-3.5 w-3.5 text-red-400" />
                            }
                            <span className="text-[10px] text-slate-500">{event.resolved ? "Resolved" : "Active"}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 mb-1">{event.description}</p>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500">
                          <span className="font-mono">{event.ip_address}</span>
                          {event.user_email && <span>{event.user_email}</span>}
                          <span>{new Date(event.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    {!event.resolved && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.05]">
                        <button
                          onClick={() => resolveEvent.mutate(event.id)}
                          disabled={resolveEvent.isPending}
                          className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-1.5 text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => blockIp.mutate({ ip_address: event.ip_address, reason: event.description })}
                          disabled={blockIp.isPending}
                          className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 py-1.5 text-[10px] font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          Block IP
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* RBAC Overview */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">RBAC Overview</h3>
          <div className="space-y-2">
            {rbacRoles.map((role, i) => (
              <motion.div
                key={role.role}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className={cn("h-4 w-4", role.color)} />
                    <span className="text-sm font-semibold text-white">{role.role}</span>
                  </div>
                  <span className={cn("text-xs font-bold", role.color)}>{role.count} user{role.count > 1 ? "s" : ""}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map((perm) => (
                    <span key={perm} className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-slate-400">
                      {perm}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Admin Sessions */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white mb-4">Active Admin Sessions</h3>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
              {[
                { name: "Super Admin", ip: "192.168.1.100", browser: "Chrome 124", location: "San Francisco, CA", active: true },
                { name: "Moderator 1", ip: "10.0.0.45", browser: "Firefox 125", location: "New York, NY", active: true },
                { name: "Support Agent", ip: "172.16.0.22", browser: "Safari 17", location: "Austin, TX", active: false },
              ].map((session, i) => (
                <div key={i} className={cn("flex items-center justify-between py-2.5", i > 0 && "border-t border-white/[0.05]")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("h-2 w-2 rounded-full", session.active ? "bg-emerald-400" : "bg-slate-600")} />
                    <div>
                      <p className="text-xs font-medium text-slate-200">{session.name}</p>
                      <p className="text-[10px] text-slate-500">{session.browser} · {session.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-500">{session.ip}</p>
                    {session.active && (
                      <button className="text-[10px] text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
