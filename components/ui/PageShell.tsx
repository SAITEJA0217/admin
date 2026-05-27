import { cn } from "@/lib/utils";

interface PageShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function PageShell({
  title,
  subtitle,
  badge,
  actions,
  children,
  className,
}: PageShellProps) {
  return (
    <div className={cn("min-h-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10 space-y-6", className)}>
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-900/8 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-blue-900/8 blur-[120px]" />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          {badge && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-purple-400">{badge}</span>
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>

      {children}
    </div>
  );
}
