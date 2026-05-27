"use client";

import { Bell } from "lucide-react";

import { useAppSelector } from "@/store/hooks";

interface FounderTopbarProps {
  pathname: string;
}

interface PageConfig {
  title: string;
  description: string;
}

const pageConfig: Record<string, PageConfig> = {
  "/founder": {
    title: "Dashboard",
    description:
      "Monitor your startup performance and investor engagement.",
  },
  "/founder/profile": {
    title: "Profile",
    description:
      "Manage your startup profile and team information.",
  },
  "/founder/pitch-deck": {
    title: "Pitch Deck",
    description:
      "Upload and manage your investor presentation.",
  },
  "/founder/analytics": {
    title: "Analytics",
    description:
      "Track views, interests, and conversion metrics.",
  },
  "/founder/manufacturers": {
    title: "Explore Manufacturers",
    description:
      "Discover trusted manufacturing partners.",
  },
  "/founder/messages": {
    title: "Messages",
    description:
      "Communicate with investors and partners.",
  },
  "/founder/viewers": {
    title: "Profile Viewers",
    description:
      "See who has viewed your startup profile.",
  },
  "/founder/settings": {
    title: "Settings",
    description:
      "Update account and startup preferences.",
  },
};

function getPageConfig(pathname: string): PageConfig {
  // Exact match first
  if (pageConfig[pathname]) {
    return pageConfig[pathname];
  }

  // Prefix match for nested routes
  const matchedRoute = Object.keys(pageConfig)
    .filter((route) => pathname.startsWith(route))
    .sort((a, b) => b.length - a.length)[0];

  return (
    pageConfig[matchedRoute] ?? {
      title: "Founder Portal",
      description:
        "Manage your startup and investor relationships.",
    }
  );
}

function getInitials(email: string): string {
  const name = email.split("@")[0];

  return name
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function FounderTopbar({
  pathname,
}: FounderTopbarProps) {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  const { title, description } =
    getPageConfig(pathname);

  const displayName = user?.email ?? "Founder";
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6 xl:px-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />

            {/* Example unread badge */}
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
              3
            </span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-semibold text-white">
              {initials}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">
                {displayName}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}