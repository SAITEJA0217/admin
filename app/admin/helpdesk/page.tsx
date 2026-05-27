"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useTickets } from "@/hooks/queries/useHelpdesk";
import { useHelpdeskMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import type { SupportTicket } from "@/lib/types";

const PRIORITY_COLORS: Record<string, string> = {
  low: "text-slate-400 bg-slate-500/15 border-slate-500/25",
  medium: "text-yellow-400 bg-yellow-500/15 border-yellow-500/25",
  high: "text-orange-400 bg-orange-500/15 border-orange-500/25",
  critical: "text-red-400 bg-red-500/15 border-red-500/25",
};

export default function HelpdeskPage() {
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [filter, setFilter] = useState("all");

  // React Query fetching
  const { data: response, isLoading, isError } = useTickets({
    status: filter,
  });
  const tickets: SupportTicket[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  // Mutations
  const { resolve } = useHelpdeskMutations();

  return (
    <PageShell
      title="Helpdesk"
      subtitle="Support ticket management and resolution workflow"
      badge="System"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Open Tickets", value: tickets.filter(t => t.status === "open").length, icon: AlertCircle, color: "text-blue-400", bg: "bg-blue-500/15" },
          { label: "In Progress", value: tickets.filter(t => t.status === "in_progress").length, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/15" },
          { label: "Resolved", value: tickets.filter(t => t.status === "resolved").length, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/15" },
          { label: "Critical", value: tickets.filter(t => t.priority === "critical").length, icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/15" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 flex items-center gap-3">
              <div className={cn("rounded-lg p-2", s.bg)}>
                <Icon className={cn("h-4 w-4", s.color)} />
              </div>
              <div>
                <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {["all", "open", "in_progress", "resolved", "closed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium capitalize transition-colors border-b-2 -mb-px",
              filter === f ? "border-purple-500 text-purple-400" : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Ticket list */}
        <div className="space-y-2">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-white/[0.04] rounded" />
                  <div className="h-3 w-12 bg-white/[0.04] rounded" />
                </div>
                <div className="h-4 w-3/4 bg-white/[0.03] rounded" />
                <div className="h-3 w-24 bg-white/[0.03] rounded" />
              </div>
            ))
          ) : isError ? (
            <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm">Failed to retrieve tickets.</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-12 text-center text-slate-500">
              <p className="text-sm">No helpdesk tickets found matching search.</p>
            </div>
          ) : (
            tickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(ticket)}
                className={cn(
                  "group rounded-xl border p-4 cursor-pointer transition-all",
                  selected?.id === ticket.id
                    ? "border-purple-500/40 bg-purple-500/10"
                    : "border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.1]"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">{ticket.ticket_number}</span>
                    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase", PRIORITY_COLORS[ticket.priority])}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={ticket.status} />
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-200 mb-1">{ticket.subject}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{ticket.user_name}</p>
                  <p className="text-xs text-slate-600">{new Date(ticket.created_at).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Ticket detail inside AnimatePresence for cinematic smoothness */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 h-fit sticky top-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500">{selected.ticket_number}</span>
                    <h3 className="text-base font-semibold text-white mt-1">{selected.subject}</h3>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 mb-4">
                  <p className="text-sm text-slate-300">{selected.description}</p>
                </div>
                <div className="space-y-2 mb-6">
                  {[
                    { label: "User", value: selected.user_name },
                    { label: "Email", value: selected.user_email },
                    { label: "Category", value: selected.category },
                    { label: "Priority", value: <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase", PRIORITY_COLORS[selected.priority])}>{selected.priority}</span> },
                    { label: "Assigned to", value: selected.assigned_to ?? "Unassigned" },
                    { label: "Created", value: new Date(selected.created_at).toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-1.5 border-b border-white/[0.05]">
                      <span className="text-xs text-slate-500">{label}</span>
                      <span className="text-xs text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
                {selected.status !== "resolved" && (
                  <div className="flex">
                    <button
                      onClick={() => {
                        resolve.mutate({ id: selected.id });
                        setSelected(prev => prev ? { ...prev, status: "resolved" } : null);
                      }}
                      disabled={resolve.isPending}
                      className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 flex flex-col items-center justify-center text-center"
              >
                <LifeBuoy className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm text-slate-500">Select a ticket to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}
