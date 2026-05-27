"use client";

import { motion } from "framer-motion";
import {
  Users,
  Rocket,
  TrendingUp,
  Factory,
  Activity,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Rocket,
  TrendingUp,
  Factory,
  Activity,
  ShieldCheck,
};

const colorConfig = {
  purple: {
    icon: "text-purple-400",
    iconBg: "bg-purple-500/15",
    glow: "hover:shadow-[0_0_24px_rgba(124,58,237,0.2)]",
    border: "hover:border-purple-500/30",
    trend: "text-purple-400",
    badge: "bg-purple-500/15 text-purple-400",
  },
  blue: {
    icon: "text-blue-400",
    iconBg: "bg-blue-500/15",
    glow: "hover:shadow-[0_0_24px_rgba(37,99,235,0.2)]",
    border: "hover:border-blue-500/30",
    trend: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400",
  },
  cyan: {
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/15",
    glow: "hover:shadow-[0_0_24px_rgba(6,182,212,0.2)]",
    border: "hover:border-cyan-500/30",
    trend: "text-cyan-400",
    badge: "bg-cyan-500/15 text-cyan-400",
  },
  emerald: {
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    glow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]",
    border: "hover:border-emerald-500/30",
    trend: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400",
  },
  violet: {
    icon: "text-violet-400",
    iconBg: "bg-violet-500/15",
    glow: "hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]",
    border: "hover:border-violet-500/30",
    trend: "text-violet-400",
    badge: "bg-violet-500/15 text-violet-400",
  },
  indigo: {
    icon: "text-indigo-400",
    iconBg: "bg-indigo-500/15",
    glow: "hover:shadow-[0_0_24px_rgba(99,102,241,0.2)]",
    border: "hover:border-indigo-500/30",
    trend: "text-indigo-400",
    badge: "bg-indigo-500/15 text-indigo-400",
  },
};

export interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
  icon: string;
  color: keyof typeof colorConfig;
  description: string;
  index?: number;
}

export default function MetricCard({
  title,
  value,
  trend,
  icon,
  color,
  description,
  index = 0,
}: MetricCardProps) {
  const Icon = iconMap[icon] ?? Users;
  const cfg = colorConfig[color];
  const isPositive = trend !== undefined ? trend >= 0 : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl border border-white/7 bg-white/3 p-5",
        "backdrop-blur-sm transition-all duration-300 cursor-default",
        "hover:bg-white/5",
        cfg.glow,
        cfg.border
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn("rounded-xl p-2.5", cfg.iconBg)}>
          <Icon className={cn("h-5 w-5", cfg.icon)} />
        </div>
        {trend !== undefined && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
              cfg.badge
            )}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mb-1">
        <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
      </div>

      {/* Title + description */}
      <p className="text-sm font-medium text-slate-300">{title}</p>
      <p className="mt-0.5 text-xs text-slate-500">{description}</p>

      {/* Footer */}
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 border-t border-white/5 pt-3">
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-emerald-400" : "text-red-400"
            )}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
          <span className="text-xs text-slate-500">vs last 7d</span>
        </div>
      )}
    </motion.div>
  );
}
