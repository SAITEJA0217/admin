"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Settings, Menu, Search, ChevronRight, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/store/slices/authSlice";
import { clearTokens } from "@/lib/token";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

const breadcrumbMap: Record<string, string[]> = {
  "/admin/operations": ["Admin", "Operations", "Dashboard"],
  "/admin/users": ["Admin", "Operations", "Users"],
  "/admin/verification": ["Admin", "Operations", "Verification"],
  "/admin/moderation": ["Admin", "Community", "Moderation"],
  "/admin/reports": ["Admin", "Operations", "Reports"],
  "/admin/clubs": ["Admin", "Community", "Clubs"],
  "/admin/groups": ["Admin", "Community", "Groups"],
  "/admin/badges": ["Admin", "Community", "Badges"],
  "/admin/helpdesk": ["Admin", "System", "Helpdesk"],
  "/admin/meetings": ["Admin", "System", "Meetings"],
  "/admin/analytics": ["Admin", "System", "Analytics"],
  "/admin/audit-logs": ["Admin", "System", "Audit Logs"],
  "/admin/security": ["Admin", "System", "Security"],
  "/admin/settings": ["Admin", "System", "Settings"],
};

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const crumbs = breadcrumbMap[pathname] ?? ["Admin"];

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearTokens();
    dispatch(logoutAction());
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl px-4 sm:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumbs */}
      <nav className="hidden sm:flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-600" />}
            <span
              onClick={() => {
                if (crumb === "Dashboard" || crumb === "Operations") {
                  router.push("/admin/operations");
                }
              }}
              className={
                i === crumbs.length - 1
                  ? "font-medium text-slate-200"
                  : "text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 w-64 hover:border-purple-500/30 transition-colors group">
        <Search className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-400 transition-colors" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search everything..."
          className="flex-1 bg-transparent text-xs text-slate-200 placeholder-slate-500 outline-none"
        />
        <kbd className="hidden lg:flex items-center gap-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`relative rounded-xl p-2.5 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors ${
              notificationsOpen ? "bg-white/[0.06] text-white" : ""
            }`}
            aria-label="Toggle notifications menu"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-purple-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-white/[0.08] bg-[#0F0F1A]/95 backdrop-blur-xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-1">
                <p className="text-xs font-semibold text-slate-200">Notifications</p>
                <span className="rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-bold text-purple-400">1 New</span>
              </div>
              <div className="space-y-0.5 max-h-64 overflow-y-auto">
                <div className="rounded-lg p-2.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-purple-400">System Alert</span>
                    <span className="text-[9px] text-slate-500">Just now</span>
                  </div>
                  <p className="text-xs text-slate-300">Welcome to Venture Launcher Admin Control panel.</p>
                </div>
              </div>
              <div className="h-px bg-white/[0.06] my-1" />
              <button
                onClick={() => {
                  setNotificationsOpen(false);
                  router.push("/admin/audit-logs");
                }}
                className="w-full text-center py-2 text-[10px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                View All Audit Logs
              </button>
            </div>
          )}
        </div>

        {/* Quick Settings */}
        <button
          onClick={() => router.push("/admin/settings")}
          className="rounded-xl p-2.5 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
          aria-label="Go to settings"
        >
          <Settings className="h-[18px] w-[18px]" />
        </button>

        {/* Profile Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="ml-1 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:shadow-lg hover:shadow-purple-900/40 transition-shadow outline-none"
            aria-label="User profile dropdown menu"
          >
            SA
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/[0.08] bg-[#0F0F1A]/95 backdrop-blur-xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                <p className="text-xs font-semibold text-slate-200">Super Admin</p>
                <p className="text-[10px] text-slate-500 truncate">admin@venturelauncher.io</p>
              </div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/admin/settings");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                My Profile
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/admin/settings");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Account Settings
              </button>
              <div className="h-px bg-white/[0.06] my-1" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
