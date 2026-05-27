"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FileText,
  BarChart3,
  Factory,
  MessageSquare,
  Eye,
  Settings,
  LogOut,
  Rocket,
} from "lucide-react";

import { clearTokens } from "@/lib/token";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

interface NavigationItem {
  label: string;
  href: string;
  icon: ElementType;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/founder",
    icon: LayoutDashboard,
  },
  {
  label: "Profile",
  href: "/founder/profile",
  icon: User,
},
{
  label: "Update Profile",
  href: "/founder/profile/update",
  icon: Settings,
},
  {
    label: "Pitch Deck",
    href: "/founder/pitch-deck",
    icon: FileText,
  },
  {
    label: "Analytics",
    href: "/founder/analytics",
    icon: BarChart3,
  },
  {
    label: "Explore Manufacturers",
    href: "/founder/manufacturers",
    icon: Factory,
  },
  {
    label: "Messages",
    href: "/founder/messages",
    icon: MessageSquare,
  },
  {
    label: "Viewers",
    href: "/founder/viewers",
    icon: Eye,
  },
  {
    label: "Settings",
    href: "/founder/settings",
    icon: Settings,
  },
];

export default function FounderSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isActive = (href: string) => {
    if (href === "/founder") {
      return pathname === "/founder";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    clearTokens();
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white lg:flex">
      {/* Brand */}
      <div className="border-b border-slate-800 px-6 py-6">
        <Link href="/founder" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
            <Rocket className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Venture Launcher
            </h1>
            <p className="text-sm text-slate-400">Founder Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
