"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, UserPlus, MoreHorizontal, ShieldCheck, UserX, Eye, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useUsers } from "@/hooks/queries/useUsers";
import { useUserMutations } from "@/hooks/mutations/useUserMutations";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/lib/types";

const ROLES = ["all", "founder", "investor", "manufacturer", "admin"];
const STATUSES = ["all", "active", "inactive", "suspended"];

// ─── Memoized Table Row ────────────────────────────────────────────────────────

interface UserTableRowProps {
  user: AdminUser;
  index: number;
  onSelect: (user: AdminUser) => void;
  onVerify: (id: string, role: string) => void;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
  isVerifying: boolean;
  isSuspending: boolean;
  isActivating: boolean;
}

const UserTableRow = memo(function UserTableRow({
  user,
  index,
  onSelect,
  onVerify,
  onSuspend,
  onActivate,
  isVerifying,
  isSuspending,
  isActivating
}: UserTableRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.02 }}
      className="group hover:bg-white/[0.03] transition-colors"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 uppercase">
            {(user.full_name || user.email || "U")
              .split(" ")
              .filter(Boolean)
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">{user.full_name || user.email || "Unknown User"}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={user.role} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={user.verification_status} />
      </td>
      <td className="px-4 py-3 text-xs text-slate-400">{user.joined_at || "N/A"}</td>
      <td className="px-4 py-3 text-xs text-slate-400">{user.last_active || "Recently"}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onSelect(user)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
            title="View profile"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          {user.verification_status !== "verified" && (
            <button
              onClick={() => onVerify(user.id, user.role)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
              title="Verify"
              disabled={isVerifying}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
            </button>
          )}
          {user.status !== "suspended" ? (
            <button
              onClick={() => onSuspend(user.id)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              title="Suspend"
              disabled={isSuspending}
            >
              <UserX className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={() => onActivate(user.id)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
              title="Activate"
              disabled={isActivating}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
            </button>
          )}
          <button className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
});

// ─── Main Component ────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Fetch users using React Query
  const { data: response, isLoading, isError } = useUsers({
    search,
    role: roleFilter,
    status: statusFilter,
    page,
    per_page: 8,
  });

  const rawUsers: AdminUser[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];

  // Frontend fallback filtering
  const users = rawUsers.filter((user) => {
    const matchesRole =
      roleFilter === "all" ||
      user.role?.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" ||
      user.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesSearch =
      !search ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(search.toLowerCase());

    return matchesRole && matchesStatus && matchesSearch;
  });

  const meta = response?.meta ?? { total: users.length, page: 1, per_page: 8, last_page: 1 };

  const activeCount = users.filter(
    (u) => u.status?.toLowerCase() === "active"
  ).length;

  const suspendedCount = users.filter(
    (u) => u.status?.toLowerCase() === "suspended"
  ).length;

  const pendingVerificationCount = users.filter(
    (u) => u.verification_status?.toLowerCase() === "pending"
  ).length;

  // Mutations
  const { suspendUser, activateUser, verifyUser } = useUserMutations();

  // Stable callbacks for table rows to maintain memoization
  const handleSelect = useCallback((user: AdminUser) => setSelectedUser(user), []);
  const handleVerify = useCallback((id: string, role: string) => verifyUser.mutate({ id, role }), [verifyUser]);
  const handleSuspend = useCallback((id: string) => suspendUser.mutate(id), [suspendUser]);
  const handleActivate = useCallback((id: string) => activateUser.mutate(id), [activateUser]);

  return (
    <PageShell
      title="User Management"
      subtitle="Manage platform users, roles, and account status"
      badge="Operations"
      actions={
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/30">
          <UserPlus className="h-3.5 w-3.5" />
          Invite User
        </button>
      }
    >
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Users", value: users.length, color: "text-purple-400" },
          { label: "Active", value: activeCount, color: "text-emerald-400" },
          { label: "Suspended", value: suspendedCount, color: "text-red-400" },
          { label: "Pending Verification", value: pendingVerificationCount, color: "text-yellow-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search users..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-500" />
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRoleFilter(r);
                setPage(1);
              }}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                roleFilter === r
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                statusFilter === s
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table & Data Handling */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["User", "Role", "Status", "Verification", "Joined", "Last Active", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/[0.04]" />
                        <div className="space-y-2">
                          <div className="h-3 w-28 rounded bg-white/[0.04]" />
                          <div className="h-2 w-36 rounded bg-white/[0.03]" />
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
                      <p className="text-sm font-medium">Failed to retrieve user directory.</p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    <p className="text-sm">No operational users found matching criteria.</p>
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    index={i}
                    onSelect={handleSelect}
                    onVerify={handleVerify}
                    onSuspend={handleSuspend}
                    onActivate={handleActivate}
                    isVerifying={verifyUser.isPending}
                    isSuspending={suspendUser.isPending}
                    isActivating={activateUser.isPending}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !isError && users.length > 0 && (
          <div className="border-t border-white/[0.06] px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {users.length} of {meta.total} users
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: meta.last_page }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      "h-7 w-7 rounded-lg text-xs font-medium transition-colors",
                      page === pageNum
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                        : "text-slate-400 hover:bg-white/[0.06]"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedUser && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0F0F1A] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold text-white uppercase">
                    {(selectedUser.full_name || selectedUser.email || "U")
                      .split(" ")
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedUser.full_name || selectedUser.email || "Unknown User"}</h3>
                    <p className="text-sm text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="text-slate-500 hover:text-white transition-colors text-lg">
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Role", value: <StatusBadge status={selectedUser.role} /> },
                  { label: "Status", value: <StatusBadge status={selectedUser.status} /> },
                  { label: "Verification", value: <StatusBadge status={selectedUser.verification_status} /> },
                  { label: "Company", value: selectedUser.company ?? "—" },
                  { label: "Location", value: selectedUser.location ?? "—" },
                  { label: "Joined", value: selectedUser.joined_at || "N/A" },
                  { label: "Last Active", value: selectedUser.last_active || "Recently" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-xs text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                {selectedUser.verification_status !== "verified" && (
                  <button
                    onClick={() => {
                      verifyUser.mutate({ id: selectedUser.id, role: selectedUser.role });
                      setSelectedUser(null);
                    }}
                    className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    Verify
                  </button>
                )}
                {selectedUser.status !== "suspended" ? (
                  <button
                    onClick={() => {
                      suspendUser.mutate(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      activateUser.mutate(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    Activate
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
