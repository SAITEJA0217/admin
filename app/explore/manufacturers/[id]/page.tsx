// app/explore/manufacturers/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Box, Star, Clock, ShieldCheck, HelpCircle, FileText } from "lucide-react";
import { getManufacturerById, type ManufacturerProfile } from "@/services/manufacturer.service";

export default function ManufacturerDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // Grabs the id value straight from the dynamic folder variable mapping rule context
  const targetId = params.id as string;

  const [profile, setProfile] = useState<ManufacturerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const data = await getManufacturerById(targetId);
      setProfile(data);
      setLoading(false);
    }
    if (targetId) fetchDetails();
  }, [targetId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Loading catalog profile details...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950 text-center select-none">
        <HelpCircle className="h-12 w-12 text-red-500 mb-2" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Facility Profile Not Found</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 max-w-xs">
          The requested manufacturer signature key reference does not exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/explore/manufacturers")}
          className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition dark:bg-white dark:text-black"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8 transition-colors duration-150 select-none">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Navigation row back to search hub */}
        <button
          onClick={() => router.push("/explore/manufacturers")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </button>

        {/* Profile Card Workspace Shell */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 sm:p-8 space-y-8">

          {/* Main Typography Header Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-gray-100 pb-6 dark:border-zinc-800">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {profile.companyName}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500 dark:text-zinc-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Avg Lead Time: {profile.leadTime}</span>
                </div>
              </div>
            </div>

            {/* Performance Metric Badge block */}
            <div className="flex items-center gap-1.5 self-start rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/60 dark:text-amber-400">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>{profile.rating.toFixed(1)} / 5.0 Rating</span>
            </div>
          </div>

          {/* Operational Specification Details Grid Rows Layout */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider block">Production Run Allocation Constraints</span>
              <div className="flex items-center gap-2 text-base text-gray-900 dark:text-zinc-100 font-bold">
                <Box className="h-5 w-5 text-gray-400" />
                <span>Starts at {profile.minimumOrderQuantity.toLocaleString()} units per batch batch order</span>
              </div>
            </div>
          </div>

          {/* Plant Bio Information Summary Layout Column */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Facility Description</h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-zinc-300">
              {profile.description}
            </p>
          </div>

          {/* Capabilities Badges Block Group Layout Column */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Verified Technical Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {profile.capabilities.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-xl bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-400 border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Compliance Credentials Row Block */}
          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Facility Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {profile.certification.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 rounded-xl bg-gray-50 border border-gray-200/60 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                >
                  <FileText className="h-3.5 w-3.5 text-gray-400" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger Buttons Row Panel Footer Footer container */}
          <div className="border-t border-gray-100 pt-6 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-black hover:bg-neutral-800 px-6 py-3.5 text-sm font-bold text-white transition dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md"
            >
              <ShieldCheck className="h-4 w-4" />
              Initiate RFP & RFQ Negotiation
            </button>
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 transition dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Download Hardware Compliance Pack
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
