"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Network, Lock, Globe, ShieldAlert, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useGroups } from "@/hooks/queries/useGroups";
import { useGroupMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import type { Group } from "@/lib/types";

export default function GroupsPage() {
  const [filter, setFilter] = useState("all");

  // React Query fetching
  const { data: response, isLoading, isError } = useGroups({
    status: filter,
  });
  const groups: Group[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: groups.length };

  // Mutations
  const { approve, deleteGroup } = useGroupMutations();

  return (
    <PageShell
      title="Groups Management"
      subtitle="Verify groups, manage moderation actions, and remove spam"
      badge="Community"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Groups", value: meta.total, color: "text-blue-400" },
          { label: "Active", value: groups.filter(g => g.status === "active").length, color: "text-emerald-400" },
          { label: "Flagged", value: groups.filter(g => g.status === "flagged").length, color: "text-red-400" },
          { label: "Private", value: groups.filter(g => g.is_private).length, color: "text-purple-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {["all", "active", "flagged", "inactive"].map((f) => (
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

      {/* Table & Data Handling */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Group", "Type", "Members", "Posts", "Status", "Owner", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-white/[0.04]" />
                        <div className="space-y-2">
                          <div className="h-3 w-28 rounded bg-white/[0.04]" />
                          <div className="h-2.5 w-36 rounded bg-white/[0.03]" />
                        </div>
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
                      <p className="text-sm font-medium">Failed to retrieve community groups.</p>
                    </div>
                  </td>
                </tr>
              ) : groups.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    <p className="text-sm">No community groups matching filters.</p>
                  </td>
                </tr>
              ) : (
                groups.map((group, i) => (
                  <motion.tr
                    key={group.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                          <Network className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">{group.name}</p>
                          <p className="text-[10px] text-slate-500 max-w-[160px] truncate">{group.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        {group.is_private ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                        {group.is_private ? "Private" : "Public"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-200">{group.member_count.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{group.post_count.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={group.status} /></td>
                    <td className="px-4 py-3 text-xs text-slate-400">{group.owner_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {group.status !== "active" && (
                          <button
                            onClick={() => approve.mutate(group.id)}
                            disabled={approve.isPending}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                            title="Verify"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteGroup.mutate(group.id)}
                          disabled={deleteGroup.isPending}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
    </PageShell>
  );
}
