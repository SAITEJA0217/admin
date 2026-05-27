import { cn } from "@/lib/utils";

type BadgeVariant =
  | "active" | "inactive" | "suspended" | "banned"
  | "pending" | "verified" | "rejected" | "featured"
  | "open" | "in_progress" | "resolved" | "closed"
  | "scheduled" | "completed" | "cancelled" | "no_show"
  | "flagged" | "reviewing" | "dismissed"
  | "low" | "medium" | "high" | "critical"
  | "founder" | "investor" | "manufacturer" | "admin" | "moderator";

const variantStyles: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  inactive: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  suspended: "bg-red-500/15 text-red-400 border-red-500/25",
  banned: "bg-red-600/15 text-red-500 border-red-600/25",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  verified: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  rejected: "bg-red-500/15 text-red-400 border-red-500/25",
  featured: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  open: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  in_progress: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  closed: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  scheduled: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/25",
  no_show: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  flagged: "bg-red-500/15 text-red-400 border-red-500/25",
  reviewing: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  dismissed: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  low: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  critical: "bg-red-600/15 text-red-400 border-red-600/25",
  founder: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  investor: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  manufacturer: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  admin: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  moderator: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
};

const labelMap: Record<string, string> = {
  in_progress: "In Progress",
  no_show: "No Show",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const safeStatus = status || "pending";
  const style = variantStyles[safeStatus] ?? "bg-slate-500/15 text-slate-400 border-slate-500/25";
  const label = labelMap[safeStatus] ?? safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
