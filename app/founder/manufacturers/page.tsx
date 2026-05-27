// app/explore/manufacturers/page.tsx

"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { Search, Loader2, AlertCircle, Factory } from "lucide-react";
import { getManufacturers, type ManufacturerProfile } from "@/services/manufacturer.service";
import ManufacturerCard from "@/components/manufacturer/ManufacturerCard";

export default function ExploreManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<ManufacturerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");
        const response = await getManufacturers();
        setManufacturers(response.data || []);
      } catch (err) {
        console.error("Failed to load manufacturers profile matrix:", err);
        setError(err instanceof Error ? err.message : "Could not retrieve manufacturer listings.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter listings reactively based on input queries
  const filteredManufacturers = manufacturers.filter((m) => {
    const term = searchQuery.toLowerCase();
    return (
      m.companyName.toLowerCase().includes(term) ||
      m.location.toLowerCase().includes(term) ||
      m.capabilities.some((c) => c.toLowerCase().includes(term))
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8 transition-colors duration-150 select-none">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Typography Heading Layout */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Explore Manufacturers
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Discover and negotiate hardware production pipelines with verified manufacturing facilities across your sector landscape.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full max-w-xs shrink-0 flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-gray-400 dark:text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search facility name, location, or tech..."
              className="w-full text-sm rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-gray-900 outline-none focus:ring-2 focus:border-transparent shadow-sm transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* Loading Indicator State */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-12 text-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Loading verified facilities...</p>
          </div>
        )}

        {/* Failed Request Alert Layout Box */}
        {error && !loading && (
          <div className="mx-auto max-w-md flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900/60 dark:text-red-400 leading-normal">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Failed to populate catalog references</p>
              <p className="text-xs opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Populated Result Layout Grid Matrix */}
        {!loading && !error && (
          <>
            {filteredManufacturers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredManufacturers.map((manufacturer) => (
                  <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center max-w-sm mx-auto dark:bg-zinc-900 dark:border-zinc-800">
                <Factory className="h-10 w-10 text-gray-400 mx-auto dark:text-zinc-600 mb-3" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">No items found</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  No registered manufacturing configurations match your search criteria. Try modifying filter parameters.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
