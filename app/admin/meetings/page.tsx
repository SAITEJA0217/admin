"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, XCircle, CheckCircle2, BarChart3, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useMeetings } from "@/hooks/queries/useMeetings";
import { useMeetingMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/lib/types";

const MEETING_TYPE_LABELS: Record<string, string> = {
  intro: "Intro Call",
  pitch: "Pitch",
  follow_up: "Follow-up",
  due_diligence: "Due Diligence",
};

export default function MeetingsPage() {
  const [filter, setFilter] = useState("all");
  const [cancelModal, setCancelModal] = useState<Meeting | null>(null);

  // React Query fetching
  const { data: response, isLoading, isError } = useMeetings({
    status: filter,
  });
  
  const meetings: Meeting[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: meetings.length };

  // Mutations
  const { cancel } = useMeetingMutations();

  return (
    <PageShell
      title="Meetings"
      subtitle="Monitor investor-startup meetings, cancellations, and analytics"
      badge="System"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Scheduled", value: meetings.filter(m => m.status === "scheduled").length, color: "text-blue-400" },
          { label: "Completed", value: meetings.filter(m => m.status === "completed").length, color: "text-emerald-400" },
          { label: "Cancelled", value: meetings.filter(m => m.status === "cancelled").length, color: "text-red-400" },
          { label: "No Show", value: meetings.filter(m => m.status === "no_show").length, color: "text-orange-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Analytics summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Completion Rate", value: `${meetings.length > 0 ? Math.round((meetings.filter(m => m.status === "completed").length / meetings.length) * 100) : 0}%`, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/15" },
          { label: "Avg Duration", value: `${meetings.length > 0 ? Math.round(meetings.reduce((a, m) => a + m.duration_minutes, 0) / meetings.length) : 0} min`, icon: Clock, color: "text-blue-400", bg: "bg-blue-500/15" },
          { label: "Total Meetings", value: meta.total, icon: BarChart3, color: "text-purple-400", bg: "bg-purple-500/15" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 flex items-center gap-3">
              <div className={cn("rounded-lg p-2.5", s.bg)}>
                <Icon className={cn("h-5 w-5", s.color)} />
              </div>
              <div>
                <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {["all", "scheduled", "completed", "cancelled", "no_show"].map((f) => (
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

      {/* Meetings table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Meeting", "Type", "Startup", "Investor", "Scheduled", "Duration", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-white/[0.04]" />
                        <div className="h-3.5 w-24 bg-white/[0.04] rounded" />
                      </div>
                    </td>
                    {Array.from({ length: 6 }).map((_, cIdx) => (
                      <td key={cIdx} className="px-4 py-4">
                        <div className="h-3 w-16 bg-white/[0.04] rounded" />
                      </td>
                    ))}
                    <td className="px-4 py-4">
                      <div className="h-6 w-12 bg-white/[0.04] rounded-lg" />
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-red-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8" />
                      <p className="text-sm font-medium">Failed to retrieve meetings schedule.</p>
                    </div>
                  </td>
                </tr>
              ) : meetings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    <p className="text-sm">No scheduled meetings found matching criteria.</p>
                  </td>
                </tr>
              ) : (
                meetings.map((meeting, i) => (
                  <motion.tr
                    key={meeting.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="group hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-purple-500/15 flex items-center justify-center">
                          <Calendar className="h-3.5 w-3.5 text-purple-400" />
                        </div>
                        <p className="text-xs font-medium text-slate-200 max-w-[140px] truncate">{meeting.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400">
                        {MEETING_TYPE_LABELS[meeting.meeting_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-300">{meeting.startup_name}</td>
                    <td className="px-4 py-3 text-xs text-slate-300">{meeting.investor_name}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {new Date(meeting.scheduled_at).toLocaleDateString()}
                      <br />
                      <span className="text-[10px] text-slate-600">{new Date(meeting.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {meeting.duration_minutes}m
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={meeting.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {meeting.status === "scheduled" && (
                          <button onClick={() => setCancelModal(meeting)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors" title="Cancel">
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors">
                          <Users className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Cancel modal inside AnimatePresence */}
      <AnimatePresence>
        {cancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setCancelModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-white mb-2">Cancel Meeting</h3>
              <p className="text-sm text-slate-400 mb-4">Cancel <span className="text-white font-medium">&ldquo;{cancelModal.title}&rdquo;</span>? Both parties will be notified.</p>
              <textarea
                id="cancel-reason-textarea"
                placeholder="Reason for cancellation (optional)"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors resize-none h-20 mb-4"
              />
              <div className="flex gap-2">
                <button onClick={() => setCancelModal(null)} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors">Keep Meeting</button>
                <button
                  onClick={() => {
                    const reason = (document.getElementById("cancel-reason-textarea") as HTMLTextAreaElement)?.value;
                    cancel.mutate({ id: cancelModal.id, reason });
                    setCancelModal(null);
                  }}
                  disabled={cancel.isPending}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
                >
                  Cancel Meeting
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
