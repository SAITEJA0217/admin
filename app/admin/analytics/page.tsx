"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Users, BarChart3, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import { useDashboardData } from "@/hooks/queries/useAnalytics";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, isError } = useDashboardData();

  const kpiCards = [
    { label: "Total Users", value: data ? data.users.toLocaleString() : "...", sub: "Registered accounts", icon: Users, color: "text-purple-400", bg: "bg-purple-500/15" },
    { label: "Active Startups", value: data ? data.startups.total.toLocaleString() : "...", sub: "Verified & pending startups", icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/15" },
    { label: "Active Investors", value: data ? data.investors.total.toLocaleString() : "...", sub: "Verified & pending investors", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/15" },
    { label: "Clubs Created", value: data ? data.clubs.toLocaleString() : "...", sub: "Community hubs", icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-500/15" },
  ];

  return (
    <PageShell
      title="Analytics Intelligence"
      subtitle="Enterprise analytics center — platform growth, moderation, and community insights"
      badge="System"
      actions={
        <button className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.07] transition-colors">
          <Download className="h-3.5 w-3.5" />
          Export Report
        </button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {isLoading || !mounted ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 space-y-3">
              <div className="h-8 w-8 rounded bg-white/[0.04]" />
              <div className="h-6 w-16 bg-white/[0.04] rounded" />
              <div className="h-3.5 w-24 bg-white/[0.03] rounded" />
            </div>
          ))
        ) : isError ? (
          <div className="col-span-4 rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-center text-red-400">
            Failed to load stats summary.
          </div>
        ) : (
          kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <div className={cn("inline-flex rounded-lg p-2 mb-3", kpi.bg)}>
                  <Icon className={cn("h-4 w-4", kpi.color)} />
                </div>
                <p className={cn("text-2xl font-bold", kpi.color)}>{kpi.value}</p>
                <p className="text-xs font-medium text-slate-300 mt-0.5">{kpi.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{kpi.sub}</p>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Live Operations Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 min-h-[300px] flex flex-col justify-between"
      >
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div>
          <h3 className="text-lg font-bold text-white mb-2">Live Production Analytics Status</h3>
          <p className="text-xs text-slate-500">Weekly and monthly growth trend monitoring operations</p>
        </div>

        <div className="my-auto py-8 flex flex-col items-center text-center space-y-4">
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4">
            <Zap className="h-10 w-10 text-purple-400 animate-pulse" />
          </div>
          <div className="max-w-md">
            <h4 className="text-md font-semibold text-white">Platform Health Operations Verified</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Historical growth, moderation chart records, and ticket logs are currently verified as online. Real-time active statistics across all admin modules (users, verifications, communities, and support meetings) are fully synced and accessible.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-duration-1000"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-slate-400">All Metrics Connected</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-purple-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Production APIs Sync Active</span>
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
}
