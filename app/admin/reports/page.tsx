"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, CheckCircle2, Trash2, Eye, AlertTriangle, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useReports } from "@/hooks/queries/useReports";
import { useModerationMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import type { Report } from "@/lib/types";

const FILTERS = ["all", "pending", "reviewing", "resolved", "dismissed"];

const severityColor: Record<string, string> = {
  low: "text-slate-400 bg-slate-500/15 border-slate-500/25",
  medium: "text-yellow-400 bg-yellow-500/15 border-yellow-500/25",
  high: "text-red-400 bg-red-500/15 border-red-500/25",
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Report | null>(null);
  const [deleteModal, setDeleteModal] = useState<Report | null>(null);

  // React Query fetching
  const { data: response, isLoading, isError } = useReports({
    status: filter,
  });
  const reports: Report[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: reports.length };

  // Mutations
  const { resolve, deleteComment } = useModerationMutations();

  return (
    <PageShell
      title="Platform Reports"
      subtitle="Monitor, review, and audit user-reported content flags"
      badge="Operations"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Pending", value: reports.filter(r => r.status === "pending").length, color: "text-yellow-400" },
          { label: "Reviewing", value: reports.filter(r => r.status === "reviewing").length, color: "text-blue-400" },
          { label: "Resolved", value: reports.filter(r => r.status === "resolved").length, color: "text-emerald-400" },
          { label: "High Severity", value: reports.filter(r => r.severity === "high").length, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium capitalize transition-colors border-b-2 -mb-px",
              filter === f ? "border-purple-500 text-purple-400" : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reports table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Report", "Target", "Reason", "Severity", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <div className="h-3.5 w-24 rounded bg-white/[0.04]" />
                        <div className="h-2.5 w-32 rounded bg-white/[0.03]" />
                      </div>
                    </td>
                    {Array.from({ length: 5 }).map((_, cIdx) => (
                      <td key={cIdx} className="px-4 py-4">
                        <div className="h-3 w-16 rounded bg-white/[0.04]" />
                      </td>
                    ))}
                    <td className="px-4 py-4">
                      <div className="h-6 w-16 rounded-lg bg-white/[0.04]" />
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-red-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8" />
                      <p className="text-sm font-medium">Failed to retrieve reports queue.</p>
                    </div>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    <p className="text-sm">No moderation reports matching criteria.</p>
                  </td>
                </tr>
              ) : (
                reports.map((report: any, i: number) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="group hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-xs font-medium text-slate-200">{report.reporter_name}</p>
                        <p className="text-[10px] text-slate-500">{report.reporter_email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400 capitalize">{report.target_type}</span>
                        <p className="text-[10px] text-slate-500 mt-1 max-w-[160px] truncate">{report.target_preview}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 max-w-[140px]">
                      <span className="truncate block">{report.reason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase", severityColor[report.severity])}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelected(report)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                         {report.status === "pending" && (
                           <button
                             onClick={() => setDeleteModal(report)}
                             className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                           >
                             <Trash2 className="h-3.5 w-3.5" />
                           </button>
                         )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Report detail drawer inside AnimatePresence */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="h-full w-full max-w-md border-l border-white/[0.1] bg-[#0A0A0F] p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Report Details</h3>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <StatusBadge status={selected.status} />
                    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase", severityColor[selected.severity])}>
                      {selected.severity} severity
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-2">{selected.reason}</p>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500 mb-1">Flagged Content Preview</p>
                  <p className="text-sm text-slate-300 italic">&ldquo;{selected.target_preview}&rdquo;</p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Reporter", value: selected.reporter_name },
                    { label: "Reporter Email", value: selected.reporter_email },
                    { label: "Target Type", value: selected.target_type },
                    { label: "Target ID", value: selected.target_id },
                    { label: "Reported", value: new Date(selected.created_at).toLocaleString() },
                    { label: "Resolved by", value: selected.resolved_by ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-white/[0.05]">
                      <span className="text-xs text-slate-500">{label}</span>
                      <span className="text-xs text-slate-200 capitalize">{value}</span>
                    </div>
                  ))}
                </div>
                {selected.status === "pending" && (
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        resolve.mutate({ id: selected.id, notes: "Operational audit verification passed." });
                        setSelected(null);
                      }}
                      disabled={resolve.isPending}
                      className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => {
                        deleteComment.mutate(selected.id);
                        setSelected(null);
                      }}
                      disabled={deleteComment.isPending}
                      className="flex-1 rounded-xl bg-red-600/80 py-2.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors"
                    >
                      Delete Content
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal inside AnimatePresence */}
      <AnimatePresence>
        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-red-500/15 p-2.5">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Delete Content</h3>
                  <p className="text-xs text-slate-400">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-6">Are you sure you want to permanently delete this content? The user will be notified.</p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteModal(null)} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors">Cancel</button>
                <button
                  onClick={() => {
                    deleteComment.mutate(deleteModal.id);
                    setDeleteModal(null);
                  }}
                  disabled={deleteComment.isPending}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
