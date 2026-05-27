import PageHeader from "@/components/admin/PageHeader";
import MetricCardsGrid from "@/components/admin/MetricCardsGrid";
import EcosystemGrowthChart from "@/components/admin/EcosystemGrowthChart";
import ActivityFeed from "@/components/admin/ActivityFeed";
import ModerationMetrics from "@/components/admin/ModerationMetrics";
import OperationalMetrics from "@/components/admin/OperationalMetrics";
import CommunityMetrics from "@/components/admin/CommunityMetrics";

export default function OperationsPage() {
  return (
    <div className="min-h-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10 space-y-8">
      {/* Ambient radial gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-900/8 blur-[100px]" />
      </div>

      <PageHeader />
      <MetricCardsGrid />

      {/* Analytics + Activity Feed */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <EcosystemGrowthChart />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      <ModerationMetrics />

      {/* Lower grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OperationalMetrics />
        <CommunityMetrics />
      </div>

      {/* Bottom padding */}
      <div className="h-8" />
    </div>
  );
}
