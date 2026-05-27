"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users2, Edit2, Trash2, BarChart3, Plus, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useClubs } from "@/hooks/queries/useClubs";
import { useClubMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import type { Club } from "@/lib/types";

export default function ClubsPage() {
  const [editModal, setEditModal] = useState<Club | null>(null);
  const [deleteModal, setDeleteModal] = useState<Club | null>(null);

  // React Query fetching
  const { data: response, isLoading, isError } = useClubs();
  const clubs: Club[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: clubs.length };

  // Mutations
  const { update, deleteClub } = useClubMutations();

  return (
    <PageShell
      title="Clubs Management"
      subtitle="Manage community clubs, engagement metrics, and moderation"
      badge="Community"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Clubs", value: meta.total, color: "text-purple-400" },
          { label: "Active", value: clubs.filter(c => c.status === "active").length, color: "text-emerald-400" },
          { label: "Suspended", value: clubs.filter(c => c.status === "suspended").length, color: "text-red-400" },
          { label: "Total Members", value: clubs.reduce((a, c) => a + c.member_count, 0).toLocaleString(), color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Clubs grid & loading handling */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04]" />
                <div className="space-y-2 flex-1">
                  <div className="h-3.5 w-24 rounded bg-white/[0.04]" />
                  <div className="h-2.5 w-16 rounded bg-white/[0.03]" />
                </div>
              </div>
              <div className="h-12 w-full rounded bg-white/[0.03]" />
              <div className="h-6 w-full rounded bg-white/[0.04]" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8" />
          <p className="text-sm">Failed to retrieve platform clubs.</p>
        </div>
      ) : clubs.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-12 text-center text-slate-500">
          <p className="text-sm">No community clubs are active on the platform.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club, i) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                    <Users2 className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{club.name}</p>
                    <p className="text-xs text-slate-500">{club.category}</p>
                  </div>
                </div>
                <StatusBadge status={club.status} />
              </div>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">{club.description}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Members", value: club.member_count.toLocaleString() },
                  { label: "Posts", value: club.post_count.toLocaleString() },
                  { label: "Engagement", value: `${club.engagement_rate}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-white/[0.03] border border-white/[0.05] p-2 text-center">
                    <p className="text-sm font-bold text-white">{value}</p>
                    <p className="text-[10px] text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              {/* Engagement bar */}
              <div className="mb-4">
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${club.engagement_rate}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500">Owner: {club.owner_name}</p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditModal(club)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors">
                    <BarChart3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteModal(club)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit modal inside AnimatePresence */}
      <AnimatePresence>
        {editModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0F0F1A] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Edit Club</h3>
                <button onClick={() => setEditModal(null)} className="text-slate-500 hover:text-white">
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Club Name", key: "name", value: editModal.name },
                  { label: "Category", key: "category", value: editModal.category },
                  { label: "Description", key: "description", value: editModal.description },
                ].map(({ label, key, value }) => (
                  <div key={label}>
                    <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
                    <input
                      id={`edit-club-${key}`}
                      defaultValue={value}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setEditModal(null)}
                  className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const name = (document.getElementById("edit-club-name") as HTMLInputElement)?.value;
                    const category = (document.getElementById("edit-club-category") as HTMLInputElement)?.value;
                    const description = (document.getElementById("edit-club-description") as HTMLInputElement)?.value;
                    update.mutate({ id: editModal.id, data: { name, category, description } });
                    setEditModal(null);
                  }}
                  disabled={update.isPending}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete modal inside AnimatePresence */}
      <AnimatePresence>
        {deleteModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-white mb-2">Delete Club</h3>
              <p className="text-sm text-slate-400 mb-6">
                Delete <span className="text-white font-medium">&ldquo;{deleteModal.name}&rdquo;</span>? This will remove all{" "}
                {deleteModal.member_count.toLocaleString()} members and {deleteModal.post_count.toLocaleString()}{" "}
                posts.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteClub.mutate(deleteModal.id);
                    setDeleteModal(null);
                  }}
                  disabled={deleteClub.isPending}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
                >
                  Delete Club
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
