"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  LifeBuoy,
  ScrollText,
  Gauge,
  LucideIcon,
} from "lucide-react";
import { useOperationalMetrics } from "@/hooks/queries/useAnalytics";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  LifeBuoy,
  ScrollText,
  Gauge,
};

const colorMap: Record<string, { icon: string; bg: string; dot: string }> = {
  purple: { icon: "text-purple-400", bg: "bg-purple-500/15", dot: "bg-purple-500" },
  blue: { icon: "text-blue-400", bg: "bg-blue-500/15", dot: "bg-blue-500" },
  cyan: { icon: "text-cyan-400", bg: "bg-cyan-500/15", dot: "bg-cyan-500" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/15", dot: "bg-emerald-500" },
};

export default function OperationalMetrics() {
  const { data: metrics, isLoading } = useOperationalMetrics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-6"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-white">Operational Metrics</h3>
        <p className="mt-0.5 text-xs text-slate-500">Platform infrastructure status</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {isLoading || !metrics ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-28 animate-pulse rounded-xl bg-white/[0.02] border border-white/[0.05]" />
          ))
        ) : (
          metrics.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Gauge;
            const cfg = colorMap[item.color] ?? colorMap.purple;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 cursor-default"
              >
                <div className={cn("mb-3 inline-flex rounded-lg p-2", cfg.bg)}>
                  <Icon className={cn("h-4 w-4", cfg.icon)} />
                </div>
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="mt-0.5 text-xs text-slate-400">{item.label}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                  <span className="text-[10px] text-slate-500">Active</span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
