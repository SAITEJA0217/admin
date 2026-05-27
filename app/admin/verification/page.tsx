"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX, Star, FileText, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useVerifications } from "@/hooks/queries/useVerifications";
import { useVerificationMutations } from "@/hooks/mutations/useVerificationMutations";
import { cn } from "@/lib/utils";
import type { VerificationRequest } from "@/lib/types";

const FILTERS = ["all", "pending", "verified", "rejected", "featured"];

export default function VerificationPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<VerificationRequest | null>(null);

  // React Query fetching
  const { data: response, isLoading, isError } = useVerifications({
    status: filter,
  });
  const requests: VerificationRequest[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  const meta = response?.meta ?? { total: requests.length };

  // Mutations
  const { approve, reject, feature } = useVerificationMutations();

  const entityTypeIcon = (role: string) => {
    switch (role?.toUpperCase()) {
      case "FOUNDER":
      case "STARTUP":
        return "🚀";
      case "INVESTOR":
        return "💼";
      case "MANUFACTURER":
        return "🏭";
      case "ADMIN":
        return "🛡️";
      default:
        return "📄";
    }
  };

  return (
    <PageShell
      title="Verification Center"
      subtitle="Review and approve startup, investor, and manufacturer profiles"
      badge="Operations"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Pending Review", value: requests.filter(v => v.status === "pending").length, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/15" },
          { label: "Verified", value: requests.filter(v => v.status === "verified").length, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/15" },
          { label: "Rejected", value: requests.filter(v => v.status === "rejected").length, icon: XCircle, color: "text-red-400", bg: "bg-red-500/15" },
          { label: "Featured", value: requests.filter(v => v.status === "featured").length, icon: Star, color: "text-purple-400", bg: "bg-purple-500/15" },
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

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06] pb-0">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium capitalize transition-colors border-b-2 -mb-px",
              filter === f
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid & dynamic lists loading */}
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
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8" />
          <p className="text-sm">Failed to retrieve verification queue.</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-12 text-center text-slate-500">
          <p className="text-sm">No verification requests found matching active filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {requests.map((req, i) => {
            console.log("REQ OBJECT:", req);

            const role =
              req.role?.toUpperCase() ||
              req.entity_type?.toUpperCase();

            const profileName = (() => {
              switch (role) {
                case "FOUNDER":
                case "STARTUP":
                  return (
                    req.startupProfile?.companyName ||
                    "Profile Name Unavailable"
                  );
                case "INVESTOR":
                  return (
                    req.investorProfile?.fullName ||
                    "Profile Name Unavailable"
                  );
                case "MANUFACTURER":
                  return (
                    req.manufacturerProfile?.factoryName ||
                    "Profile Name Unavailable"
                  );
                default:
                  return "Profile Name Unavailable";
              }
            })();

            const submittedBy =
              req.email ||
              "Unknown User";

            const submittedDate = req.createdAt
              ? new Date(req.createdAt).toLocaleDateString()
              : req.submitted_at && !isNaN(Date.parse(req.submitted_at))
                ? new Date(req.submitted_at).toLocaleDateString()
                : "Recently";

            const documentCount = req.documents?.length || 0;

            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer"
                onClick={() => setSelected(req)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{entityTypeIcon(role)}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {profileName}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">{role}</p>
                    </div>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Submitted by</span>
                    <span className="text-slate-300">
                      {submittedBy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Submitted</span>
                    <span className="text-slate-300">
                      {submittedDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Documents</span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {documentCount} files
                    </span>
                  </div>
                </div>
                {req.status === "pending" && (
                  <div className="flex gap-2 pt-3 border-t border-white/[0.05]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        approve.mutate({ id: req.id, role: req.entity_type });
                      }}
                      disabled={approve.isPending}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                      <ShieldCheck className="h-3 w-3" /> Verify
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reject.mutate({ id: req.id, role: req.entity_type, reason: "Incomplete details" });
                      }}
                      disabled={reject.isPending}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <ShieldX className="h-3 w-3" /> Reject
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.mutate({ id: req.id, role: req.entity_type });
                      }}
                      disabled={feature.isPending}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-400 hover:bg-purple-500/20 transition-colors"
                    >
                      <Star className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail drawer inside AnimatePresence to solve dynamic sliding exit animations */}
      <AnimatePresence>
        {selected && (() => {
          const role =
            selected.role?.toUpperCase() ||
            selected.entity_type?.toUpperCase();

          const profileName = (() => {
            switch (role) {
              case "FOUNDER":
              case "STARTUP":
                return (
                  selected.startupProfile?.companyName ||
                  "Profile Name Unavailable"
                );
              case "INVESTOR":
                return (
                  selected.investorProfile?.fullName ||
                  "Profile Name Unavailable"
                );
              case "MANUFACTURER":
                return (
                  selected.manufacturerProfile?.factoryName ||
                  "Profile Name Unavailable"
                );
              default:
                return "Profile Name Unavailable";
            }
          })();

          const submittedBy =
            selected.email ||
            "Unknown User";

          const submittedDate = selected.createdAt
            ? new Date(selected.createdAt).toLocaleString()
            : selected.submitted_at && !isNaN(Date.parse(selected.submitted_at))
              ? new Date(selected.submitted_at).toLocaleString()
              : "Recently";

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="h-full w-full max-w-md border-l border-white/[0.1] bg-[#0A0A0F] p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Verification Details</h3>
                  <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white">
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{entityTypeIcon(role)}</div>
                      <div>
                        <p className="font-semibold text-white">
                          {profileName}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{role}</p>
                      </div>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Submitted by", value: submittedBy },
                      { label: "Email", value: selected.user_email },
                      { label: "Submitted", value: submittedDate },
                      { label: "Reviewed by", value: selected.reviewer ?? "Pending" },
                      { label: "Notes", value: selected.notes ?? "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between py-2 border-b border-white/[0.05]">
                        <span className="text-xs text-slate-500">{label}</span>
                        <span className="text-xs text-slate-200 text-right max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Documents</p>
                    <div className="space-y-1.5">
                      {(selected.documents || []).map((doc) => (
                        <div key={doc} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                          <FileText className="h-3.5 w-3.5 text-blue-400" />
                          <span className="text-xs text-slate-300">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selected.status === "pending" && (
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => {
                          approve.mutate({ id: selected.id, role: selected.entity_type });
                          setSelected(null);
                        }}
                        disabled={approve.isPending}
                        className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                      >
                        Verify Profile
                      </button>
                      <button
                        onClick={() => {
                          reject.mutate({ id: selected.id, role: selected.entity_type, reason: "Security request" });
                          setSelected(null);
                        }}
                        disabled={reject.isPending}
                        className="flex-1 rounded-xl bg-red-600/80 py-2.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </PageShell>
  );
}
