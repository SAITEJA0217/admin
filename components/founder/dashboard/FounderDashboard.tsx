
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  TrendingUp,
  MessageSquare,
  Target,
  User,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import { getFounderProfile } from "@/services/founder/profile.service";
import type { FounderProfile } from "@/types/founder";

export default function FounderDashboard() {
  const [profile, setProfile] = useState<FounderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getFounderProfile(); // Temporary until dedicated dashboard API exists
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDashboard();
  }, []);

  const completion = profile?.completionScore ?? 0;

  const fundingGoal = profile?.fundingGoal ?? 0;
  const fundingRaised = profile?.fundingRaised ?? 0;

  const fundingPercent =
    fundingGoal > 0
      ? Math.min(100, (fundingRaised / fundingGoal) * 100)
      : 0;

  const stats = useMemo(
    () => [
      {
        title: "Profile Views",
        value: "1,543",
        subtitle: "+127 this week",
        icon: Eye,
        iconBg: "bg-blue-500/20 text-blue-400",
        subtitleColor: "text-emerald-400",
      },
      {
        title: "Investor Interests",
        value: "23",
        subtitle: "8 accepted · 12 pending · 3 rejected",
        icon: TrendingUp,
        iconBg: "bg-pink-500/20 text-pink-400",
        subtitleColor: "text-emerald-400",
      },
      {
        title: "Messages",
        value: "47",
        subtitle: "5 unread",
        icon: MessageSquare,
        iconBg: "bg-emerald-500/20 text-emerald-400",
        subtitleColor: "text-yellow-400",
      },
      {
        title: "Profile Completion",
        value: `${completion}%`,
        subtitle: completion >= 80 ? "Looking great" : "Complete your profile",
        icon: Target,
        iconBg: "bg-orange-500/20 text-orange-400",
        subtitleColor:
          completion >= 80 ? "text-emerald-400" : "text-orange-400",
      },
    ],
    [completion]
  );

  const suggestedInvestors = [
    {
      name: "Sarah Chen",
      firm: "Venture Capital",
      match: 94,
    },
    {
      name: "Michael Roberts",
      firm: "Angel Investor",
      match: 89,
    },
    {
      name: "Emily Thompson",
      firm: "Venture Capital",
      match: 87,
    },
    {
      name: "David Park",
      firm: "Private Equity",
      match: 82,
    },
  ];

  const activities = [
    {
      title: "An investor viewed your profile",
      time: "2 hours ago",
      icon: Eye,
    },
    {
      title: "New interest from Angel Investor",
      time: "Yesterday",
      icon: TrendingUp,
    },
    {
      title: "Sarah Chen sent you a message",
      time: "2 days ago",
      icon: MessageSquare,
    },
    {
      title: `Profile completion increased to ${completion}%`,
      time: "3 days ago",
      icon: Target,
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5" />
          <span>{error || "Unable to load dashboard."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            {profile.logoUrl ? (
              <img
                src={profile.logoUrl}
                alt={profile.companyName || "Startup logo"}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                <User className="h-8 w-8 text-white" />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">
                Welcome back, {profile.companyName || "Founder"}
              </h1>
              <p className="mt-1 text-slate-400">
                Here's what's happening with your startup today.
              </p>
            </div>
          </div>

          <div className="w-full max-w-xs rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur lg:w-80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Profile Completion</p>
                <p className="mt-1 text-3xl font-bold">{completion}%</p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-500/40 text-sm font-semibold">
                {completion}%
              </div>
            </div>

            <Link
              href="/founder/profile/update"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Complete Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white"
            >
              <div className="mb-4 flex items-start justify-between">
                <p className="text-sm text-slate-400">{stat.title}</p>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p className="text-3xl font-bold">{stat.value}</p>

              <p className={`mt-2 text-xs ${stat.subtitleColor}`}>
                {stat.subtitle}
              </p>

              {stat.title === "Profile Completion" && (
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-white"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Suggested Investors */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Interested Investors</h2>
            <p className="mt-1 text-sm text-slate-400">
              Connect with investors who match your startup.
            </p>
          </div>

          <Link
            href="/founder/investors"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {suggestedInvestors.map((investor) => (
            <div
              key={investor.name}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                <User className="h-8 w-8 text-slate-400" />
              </div>

              <h3 className="font-semibold">{investor.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{investor.firm}</p>
              <p className="mt-3 text-sm font-medium text-emerald-400">
                {investor.match}% Match
              </p>

              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Funding + Activities */}
      <div className="grid gap-8 xl:grid-cols-3">
        {/* Funding */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white xl:col-span-1">
          <h2 className="text-xl font-semibold">Funding Progress</h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-slate-400">Raised</p>
              <p className="mt-1 text-2xl font-bold">
                ₹{fundingRaised.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Goal</p>
              <p className="mt-1 text-xl font-semibold">
                ₹{fundingGoal.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Progress</span>
                <span>{fundingPercent.toFixed(1)}%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-emerald-500"
                  style={{ width: `${fundingPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white xl:col-span-2">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
          <p className="mt-1 text-sm text-slate-400">
            Stay updated with your latest notifications.
          </p>

          <div className="mt-6 space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                    <Icon className="h-5 w-5 text-slate-300" />
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}