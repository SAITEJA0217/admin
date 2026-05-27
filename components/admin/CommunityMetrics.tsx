"use client";

import { motion } from "framer-motion";
import {
  Users2,
  Network,
  MessageSquare,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { useCommunityMetrics } from "@/hooks/queries/useAnalytics";
import { cn } from "@/lib/utils";

interface CommunityMetric {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, LucideIcon> = {
  Users2,
  Network,
  MessageSquare,
  BarChart3,
};

const colorMap: Record<string, { icon: string; bg: string }> = {
  violet: { icon: "text-violet-400", bg: "bg-violet-500/15" },
  blue: { icon: "text-blue-400", bg: "bg-blue-500/15" },
  cyan: { icon: "text-cyan-400", bg: "bg-cyan-500/15" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/15" },
};

export default function CommunityMetrics() {
  const { data: metrics, isLoading } = useCommunityMetrics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-white/7 bg-white/3 backdrop-blur-sm p-6"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-white">Community Metrics</h3>
        <p className="mt-0.5 text-xs text-slate-500">Engagement and social health</p>
      </div>

      <div className="space-y-3">
        {isLoading || !metrics ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-16 animate-pulse rounded-xl bg-white/2 border border-white/5" />
          ))
        ) : (
          metrics.map((item: CommunityMetric, i: number) => {
            const Icon = iconMap[item.icon] ?? BarChart3;
            const cfg = colorMap[item.color] ?? colorMap.violet;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/2 p-4 hover:bg-white/5 hover:border-white/9 transition-all duration-200 cursor-default"
              >
                <div className={cn("shrink-0 rounded-lg p-2", cfg.bg)}>
                  <Icon className={cn("h-4 w-4", cfg.icon)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-300">{item.label}</p>
                    <p className="text-sm font-bold text-white">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
