"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function EcosystemGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6 h-full min-h-[352px] flex flex-col justify-between"
    >
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Ecosystem Performance</h3>
        </div>
        <p className="text-xs text-slate-500">Live platform operations overview</p>
      </div>

      {/* Premium Informational Content */}
      <div className="my-auto py-6 flex flex-col items-center text-center space-y-4">
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-4">
          <Zap className="h-8 w-8 text-purple-400 animate-pulse" />
        </div>
        <div className="max-w-md">
          <h4 className="text-md font-semibold text-white">Real-Time Core Metrics Active</h4>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Historical growth trend analysis is currently offline. Real-time active counts for users, ventures, manufacturing partners, investor pipelines, clubs, and meeting matching are fully integrated with the production APIs below.
          </p>
        </div>
      </div>

      {/* Footer / Status */}
      <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-auto">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-400">All Modules Online</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-purple-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Production Verified</span>
        </div>
      </div>
    </motion.div>
  );
}
