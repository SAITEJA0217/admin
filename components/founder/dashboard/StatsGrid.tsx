"use client";

import { Eye, Heart, MessageSquare, CheckCircle } from "lucide-react";

import type { FounderDashboardData } from "@/types/founder";

interface StatsGridProps {
  data: FounderDashboardData;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
}

function StatCard({ title, value, subtitle, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-blue-400">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function StatsGrid({ data }: StatsGridProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Profile Views"
        value={data.profileViews.total}
        subtitle={`${data.profileViews.thisWeek} this week`}
        icon={Eye}
      />

      <StatCard
        title="Investor Interests"
        value={data.investorInterests.total}
        subtitle={`${data.investorInterests.pending} pending`}
        icon={Heart}
      />

      <StatCard
        title="Messages"
        value={data.messages.total}
        subtitle={`${data.messages.unread} unread`}
        icon={MessageSquare}
      />

      <StatCard
        title="Profile Completion"
        value={`${data.profileCompletion}%`}
        subtitle={`Status: ${data.verificationStatus}`}
        icon={CheckCircle}
      />
    </section>
  );
}
