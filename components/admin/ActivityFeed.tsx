"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Flag,
  UserCheck,
  Database,
  Users,
  ShieldAlert,
  Calendar,
  Award,
  LucideIcon,
  Radio,
} from "lucide-react";
import { useActivityFeed } from "@/hooks/queries/useAnalytics";
import { cn } from "@/lib/utils";

interface ActivityFeedItem {
  id: string;
  type: string;
  message: string;
  actor: string;
  time: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Flag,
  UserCheck,
  Database,
  Users,
  ShieldAlert,
  Calendar,
  Award,
};

const colorMap: Record<string, string> = {
  purple: "text-purple-400 bg-purple-500/15",
  red: "text-red-400 bg-red-500/15",
  green: "text-emerald-400 bg-emerald-500/15",
  blue: "text-blue-400 bg-blue-500/15",
  cyan: "text-cyan-400 bg-cyan-500/15",
  orange: "text-orange-400 bg-orange-500/15",
  violet: "text-violet-400 bg-violet-500/15",
  yellow: "text-yellow-400 bg-yellow-500/15",
};

export default function ActivityFeed() {
  const { data: activityItems, isLoading } = useActivityFeed();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-white/7 bg-white/3 backdrop-blur-sm p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Radio className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Live Activity</h3>
          </div>
          <p className="text-xs text-slate-500">Real-time operational updates</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Feed & loading handling */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {isLoading || !activityItems ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex items-start gap-3 p-2.5">
              <div className="h-6 w-6 rounded-lg bg-white/4" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-white/4 rounded" />
                <div className="h-2 w-16 bg-white/3 rounded" />
              </div>
            </div>
          ))
        ) : (
          activityItems.map((item: ActivityFeedItem, i: number) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            const colorCls = colorMap[item.color] ?? colorMap.purple;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
                className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/4 transition-colors cursor-default"
              >
                <div className={cn("mt-0.5 shrink-0 rounded-lg p-1.5", colorCls)}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-300 leading-snug">
                    {item.message}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{item.actor}</p>
                </div>
                <span className="shrink-0 text-[10px] text-slate-600 font-mono">
                  {item.time}
                </span>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-white/5 pt-3">
        <button className="w-full rounded-xl border border-white/7 bg-white/3 py-2 text-xs font-medium text-slate-400 hover:bg-white/6 hover:text-slate-200 transition-colors">
          View All Activity
        </button>
      </div>
    </motion.div>
  );
}
