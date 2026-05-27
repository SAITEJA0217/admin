// components/founder/layout/FounderMobileNav.tsx

"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
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

export default function FounderMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isActive = (href: string) => {
    if (href === "/founder") {
      return pathname === "/founder";
    }

    return pathname.startsWith(href);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    clearTokens();
    dispatch(logout());
    closeMenu();
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile / Tablet Top Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-4 text-white lg:hidden">
        <Link
          href="/founder"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
            <Rocket className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-sm font-semibold">
              Venture Launcher
            </h1>
            <p className="text-xs text-slate-400">
              Founder Portal
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Backdrop */}
      {isOpen && (
        <button
          type="button"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close navigation menu"
        />
      )}

      {/* Slide-Out Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-r border-slate-800 bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <Link
            href="/founder"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
              <Rocket className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Venture Launcher
              </h2>
              <p className="text-xs text-slate-400">
                Founder Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
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
                    onClick={closeMenu}
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
    </>
  );
}