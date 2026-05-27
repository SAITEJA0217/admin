"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Flag,
  FileText,
  Users2,
  Network,
  Award,
  LifeBuoy,
  Calendar,
  BarChart3,
  ScrollText,
  Lock,
  Settings,
  X,
  Zap,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: "Operations",
    items: [
      { label: "Dashboard", href: "/admin/operations", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Verification", href: "/admin/verification", icon: ShieldCheck },
      { label: "Moderation", href: "/admin/moderation", icon: Flag },
      { label: "Reports", href: "/admin/reports", icon: FileText },
    ],
  },
  {
    group: "Community",
    items: [
      { label: "Clubs", href: "/admin/clubs", icon: Users2 },
      { label: "Groups", href: "/admin/groups", icon: Network },
      { label: "Badges", href: "/admin/badges", icon: Award },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Helpdesk", href: "/admin/helpdesk", icon: LifeBuoy },
      { label: "Meetings", href: "/admin/meetings", icon: Calendar },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
      { label: "Security", href: "/admin/security", icon: Lock },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col",
        "bg-[#0A0A0F]/95 backdrop-blur-xl",
        "border-r border-white/[0.06]",
        "transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-900/40">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-white">Venture Launcher</p>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-purple-400 uppercase">
              Admin OS
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden rounded-md p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.group}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-purple-600/20 text-purple-300 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.3)]"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0 transition-colors",
                          isActive ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300"
                        )}
                      />
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-3 w-3 text-purple-400 opacity-60" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Admin profile card */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 hover:bg-white/[0.05] transition-colors cursor-pointer">
          <div className="relative flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
              SA
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0A0A0F]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Super Admin</p>
            <p className="text-[10px] text-slate-500 truncate">admin@venturelauncher.io</p>
          </div>
          <Settings className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
