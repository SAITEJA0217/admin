"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Plus, AlertCircle, ShieldAlert, ShieldCheck } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import { useBadges } from "@/hooks/queries/useBadges";
import { useBadgeMutations } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import type { Badge } from "@/lib/types";

export default function BadgesPage() {
  const [createModal, setCreateModal] = useState(false);
  const [awardModal, setAwardModal] = useState(false);
  const [revokeModal, setRevokeModal] = useState(false);

  // React Query fetching
  const { data: response, isLoading, isError } = useBadges();
  const badges: Badge[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: badges.length };

  // Mutations
  const { create, award, revoke } = useBadgeMutations();

  return (
    <PageShell
      title="Badge System"
      subtitle="Create, manage, and award badges to platform members"
      badge="Community"
      actions={
        <div className="flex gap-2">
          <button
            onClick={() => setAwardModal(true)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.07] transition-colors"
          >
            Award Badge
          </button>
          <button
            onClick={() => setRevokeModal(true)}
            className="flex items-center gap-2 rounded-xl border border-red-500/[0.1] bg-red-500/[0.04] px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/[0.08] transition-colors"
          >
            Revoke Badge
          </button>
          <button
            onClick={() => setCreateModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/30"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Badge
          </button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Badges", value: meta.total, color: "text-purple-400" },
          { label: "Active", value: badges.filter((b: Badge) => b.is_active).length, color: "text-emerald-400" },
          { label: "Total Awarded", value: badges.reduce((a: number, b: Badge) => a + b.awarded_count, 0).toLocaleString(), color: "text-blue-400" },
          { label: "Categories", value: new Set(badges.map((b: Badge) => b.category)).size, color: "text-cyan-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badge cards & loader states */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/[0.04]" />
                <div className="space-y-2 flex-1">
                  <div className="h-3.5 w-24 bg-white/[0.04] rounded" />
                  <div className="h-2.5 w-16 bg-white/[0.03] rounded" />
                </div>
              </div>
              <div className="h-8 w-full bg-white/[0.03] rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8" />
          <p className="text-sm">Failed to retrieve badge systems.</p>
        </div>
      ) : badges.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-12 text-center text-slate-500 flex flex-col items-center gap-3">
          <Award className="h-10 w-10 text-slate-600 animate-pulse" />
          <div>
            <p className="text-sm font-semibold text-white">No custom badges established yet.</p>
            <p className="text-xs text-slate-500 mt-1">Use the Create, Award, and Revoke actions above to manage member achievements.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge: Badge, i: number) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: badge.color + "20", border: `1px solid ${badge.color}40` }}
                  >
                    <Award className="h-6 w-6" style={{ color: badge.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{badge.name}</p>
                    <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400 capitalize">{badge.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4">{badge.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-white">{badge.awarded_count.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">times awarded</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create / Award / Revoke modals inside AnimatePresence */}
      <AnimatePresence>
        {createModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Create Badge</h3>
                <button onClick={() => setCreateModal(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Badge Name", key: "name", placeholder: "e.g. Top Contributor" },
                  { label: "Description", key: "description", placeholder: "What this badge represents" },
                  { label: "Category", key: "category", placeholder: "achievement / role / community / special" },
                  { label: "Color (hex)", key: "color", placeholder: "#7C3AED" },
                ].map(({ label, key, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
                    <input
                      id={`badge-input-${key}`}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setCreateModal(false)} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors">Cancel</button>
                <button
                  onClick={() => {
                    const name = (document.getElementById("badge-input-name") as HTMLInputElement)?.value;
                    const description = (document.getElementById("badge-input-description") as HTMLInputElement)?.value;
                    const category = (document.getElementById("badge-input-category") as HTMLInputElement)?.value as any;
                    const color = (document.getElementById("badge-input-color") as HTMLInputElement)?.value;

                    create.mutate({ name, description, category, color });
                    setCreateModal(false);
                  }}
                  disabled={create.isPending}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  Create Badge
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {awardModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setAwardModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Award Badge</h3>
                <button onClick={() => setAwardModal(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">User ID</label>
                  <input
                    id="award-input-user-id"
                    placeholder="Enter recipient User ID"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Badge ID</label>
                  <input
                    id="award-input-badge-id"
                    placeholder="Enter Badge ID"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setAwardModal(false)} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors">Cancel</button>
                <button
                  onClick={() => {
                    const user_id = (document.getElementById("award-input-user-id") as HTMLInputElement)?.value;
                    const badge_id = (document.getElementById("award-input-badge-id") as HTMLInputElement)?.value;

                    award.mutate({ user_id, badge_id });
                    setAwardModal(false);
                  }}
                  disabled={award.isPending}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  Award Badge
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {revokeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setRevokeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-red-400">Revoke Badge</h3>
                <button onClick={() => setRevokeModal(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">User ID</label>
                  <input
                    id="revoke-input-user-id"
                    placeholder="Enter member User ID"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Badge ID</label>
                  <input
                    id="revoke-input-badge-id"
                    placeholder="Enter Badge ID to revoke"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/30 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setRevokeModal(false)} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] transition-colors">Cancel</button>
                <button
                  onClick={() => {
                    const user_id = (document.getElementById("revoke-input-user-id") as HTMLInputElement)?.value;
                    const badge_id = (document.getElementById("revoke-input-badge-id") as HTMLInputElement)?.value;

                    revoke.mutate({ user_id, badge_id });
                    setRevokeModal(false);
                  }}
                  disabled={revoke.isPending}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-500 transition-all"
                >
                  Revoke Badge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
