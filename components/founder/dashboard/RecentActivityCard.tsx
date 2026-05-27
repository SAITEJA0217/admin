export interface RecentActivity {
  icon: string;
  text: string;
  time: string;
}

interface RecentActivityCardProps {
  activities: RecentActivity[];
}

export default function RecentActivityCard({
  activities,
}: RecentActivityCardProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Latest updates related to your startup
          profile and investor engagement.
        </p>
      </div>

      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center">
          <p className="text-sm text-slate-500">
            No recent activity available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={`${activity.text}-${index}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-lg">
                {activity.icon}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {activity.text}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}