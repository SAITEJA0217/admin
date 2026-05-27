"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  UserX,
  Flag,
  LucideIcon,
} from "lucide-react";
import { useModerationOverviewMetrics } from "@/hooks/queries/useAnalytics";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  CheckCircle2,
  UserX,
  Flag,
};

const colorConfig = {
  yellow: {
    icon: "text-yellow-400",
    iconBg: "bg-yellow-500/15",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    glow: "hover:shadow-[0_0_20px_rgba(234,179,8,0.12)]",
  },
  green: {
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]",
  },
  red: {
    icon: "text-red-400",
    iconBg: "bg-red-500/15",
    border: "border-red-500/20 hover:border-red-500/40",
    glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.12)]",
  },
  orange: {
    icon: "text-orange-400",
    iconBg: "bg-orange-500/15",
    border: "border-orange-500/20 hover:border-orange-500/40",
    glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]",
  },
};

const badgeConfig = {
  yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  red: "bg-red-500/15 text-red-400 border-red-500/25",
};

export default function ModerationMetrics() {
  const { data: metrics, isLoading } = useModerationOverviewMetrics();

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Flag className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-200">Moderation Overview</h2>
        <span className="rounded-full bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 text-[10px] text-slate-500">
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || !metrics ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-36 animate-pulse rounded-2xl bg-white/[0.02] border border-white/[0.05]" />
          ))
        ) : (
          metrics.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Flag;
            const cfg = colorConfig[item.color as keyof typeof colorConfig] ?? colorConfig.yellow;
            const badgeCfg = badgeConfig[item.badgeColor as keyof typeof badgeConfig] ?? badgeConfig.yellow;
            const itemAny = item as any;
            const isPositive = itemAny.change !== undefined ? itemAny.change >= 0 : true;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
                className={cn(
                  "group rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-5",
                  "transition-all duration-300 cursor-default",
                  cfg.border,
                  cfg.glow
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("rounded-xl p-2.5", cfg.iconBg)}>
                    <Icon className={cn("h-5 w-5", cfg.icon)} />
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider",
                      badgeCfg
                    )}
                  >
                    {item.badge}
                  </span>
                </div>

                <p className="text-2xl font-bold text-white mb-1">
                  {item.value.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-slate-300">{item.title}</p>

                {itemAny.change !== undefined && (
                  <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.05] pt-3">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isPositive ? "text-red-400" : "text-emerald-400"
                      )}
                    >
                      {isPositive ? "▲" : "▼"} {Math.abs(itemAny.change)}
                    </span>
                    <span className="text-xs text-slate-500">since yesterday</span>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
