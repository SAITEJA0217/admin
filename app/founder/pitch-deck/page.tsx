// app/founder/pitch-deck/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PitchDeckUploadForm from "@/components/founder/PitchDeckUploadForm";

export default function PitchDeckUploadPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8 min-h-screen content-center">

      {/* Navigation Return Row Control */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus:outline-none"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      {/* Render modularized form logic */}
      <PitchDeckUploadForm />

    </main>
  );
}
