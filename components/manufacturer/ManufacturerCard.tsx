// components/manufacturer/ManufacturerCard.tsx

import { useRouter } from "next/navigation";
import { MapPin, Box, ArrowRight, Star } from "lucide-react";
import type { ManufacturerProfile } from "@/services/manufacturer.service";

interface ManufacturerCardProps {
  manufacturer: ManufacturerProfile;
}

export default function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/explore/manufacturers/${manufacturer.id}`)}
      className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition dark:bg-zinc-900 dark:border-zinc-800 cursor-pointer group"
    >
      <div className="space-y-4">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate group-hover:text-blue-500 transition">
              {manufacturer.companyName}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-400">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500" />
              <span className="truncate">{manufacturer.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/60 dark:text-amber-400">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>{manufacturer.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {manufacturer.description}
        </p>

        {/* Capabilities Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {manufacturer.capabilities.map((capability, idx) => (
            <span
              key={idx}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Detail Blocks */}
      <div className="mt-6 border-t border-gray-100 pt-4 dark:border-zinc-800/80 flex items-center justify-between text-xs font-medium">
        <div className="space-y-0.5">
          <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Min Order Quantity</span>
          <div className="flex items-center gap-1 text-gray-900 dark:text-zinc-100 font-semibold">
            <Box className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span>{manufacturer.minimumOrderQuantity.toLocaleString()} units</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-500 group-hover:translate-x-1 transition-transform">
          View Profile
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
