"use client";

import {
  BadgeCheck,
  Clock3,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import type { FounderDashboardData } from "@/types/founder";
import { useAppSelector } from "@/store/hooks";

interface WelcomeBannerProps {
  data: FounderDashboardData;
}

function getVerificationConfig(
  status: FounderDashboardData["verificationStatus"]
) {
  switch (status?.toUpperCase()) {
    case "VERIFIED":
      return {
        icon: BadgeCheck,
        label: "Verified",
        className:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      };

    case "REJECTED":
      return {
        icon: AlertCircle,
        label: "Rejected",
        className:
          "bg-red-500/10 text-red-400 border border-red-500/20",
      };

    default:
      return {
        icon: Clock3,
        label: "Pending Verification",
        className:
          "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      };
  }
}

function getInitials(email: string): string {
  const username = email.split("@")[0];

  return username
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function WelcomeBanner({
  data,
}: WelcomeBannerProps) {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  const displayName = user?.email ?? "Founder";
  const initials = getInitials(displayName);

  const verification =
    getVerificationConfig(data.verificationStatus);

  const VerificationIcon = verification.icon;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
      {/* Decorative Glow */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Content */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-semibold text-white shadow-lg">
                {initials}
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h2>
                <p className="mt-1 text-slate-400">
                  Track investor engagement and grow your startup with Venture Launcher.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${verification.className}`}
              >
                <VerificationIcon className="h-4 w-4" />
                <span>{verification.label}</span>
              </div>

              {data.isFeatured && (
                <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-400">
                  Featured Startup
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">
                Profile Completion
              </p>
              <span className="text-sm font-semibold text-white">
                {data.profileCompletion}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${data.profileCompletion}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Complete your profile to improve visibility and attract more investors.
            </p>

            <Link
              href="/founder/profile"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Complete Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}