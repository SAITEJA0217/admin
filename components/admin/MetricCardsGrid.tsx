"use client";

import MetricCard from "./MetricCard";
import { useDashboardMetrics } from "@/hooks/queries/useAnalytics";

export default function MetricCardsGrid() {
  const { data: cards, isLoading } = useDashboardMetrics();

  if (isLoading || !cards) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-24 animate-pulse rounded-2xl bg-white/[0.02] border border-white/[0.05]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, i) => (
        <div key={card.id} className="xl:col-span-1 sm:col-span-1">
          <MetricCard {...card} index={i} />
        </div>
      ))}
    </div>
  );
}
