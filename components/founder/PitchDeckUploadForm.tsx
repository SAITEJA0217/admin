// components/founder/PitchDeckUploadForm.tsx

"use client";

import { useState, type DragEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  HardDrive
} from "lucide-react";

import { uploadPitchDeckDirectToS3 } from "@/services/founder/pitch-deck.service";
import { getAccessToken } from "@/lib/token";

interface UploadedFileMetadata {
  name: string;
  size: string;
  dbKeyReference: string;
  uploadedAt: string;
}

export default function PitchDeckUploadForm() {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileMeta, setUploadedFileMeta] = useState<UploadedFileMetadata | null>(null);

  const handleDrag = (e: DragEvent<HTMLLabelElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleFileSelection = (file: File) => {
    setError("");
    setSuccess("");

    const MAX_SIZE_BYTES = 25 * 1024 * 1024; // 25MB Max limit
    const allowedExtensions = /(\.pdf|\.pptx|\.ppt)$/i;

    if (!allowedExtensions.exec(file.name)) {
      setError("Unsupported format specifications. Please select valid PDF, PPTX, or PPT components.");
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError(`File weight threshold overflow (${formatBytes(file.size)}). Max allowed space constraint allocation is 25MB.`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadTrigger = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      setError("");
      setSuccess("");

      const activeSessionToken = getAccessToken();
      if (!activeSessionToken) {
        throw new Error("User authorization token missing or expired. Please sign back in again.");
      }

      const serverDatabaseKeyString = await uploadPitchDeckDirectToS3(selectedFile, activeSessionToken);

      setSuccess("File streamed directly into AWS cloud bucket vaults successfully!");
      setUploadedFileMeta({
        name: selectedFile.name,
        size: formatBytes(selectedFile.size),
        dbKeyReference: serverDatabaseKeyString,
        uploadedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });

      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Direct-to-S3 transfer execution failure occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white sm:p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Direct Cloud Upload (Pitch Deck)</h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
          Using secure single-use presigned URL authorizations to drop presentations data payloads straight inside cloud object repositories.
        </p>
      </div>

      {/* Operational State Banners */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Interactive Forms Workspace */}
      <div className="space-y-6">
        {/* Empty Dropzone File Selection Card */}
        {!selectedFile && !isUploading && (
          <div className="space-y-4">
            <label
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition min-h-[200px] cursor-pointer block
                ${isDragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950/80"
                }
              `}
            >
              <input
                type="file"
                accept=".pdf,.pptx,.ppt"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4 select-none pointer-events-none">
                <div className="rounded-full bg-slate-950 p-4 border border-slate-800 group-hover:scale-105 transition-transform duration-200">
                  <UploadCloud className="h-8 w-8 text-slate-400 group-hover:text-blue-400 transition" />
                </div>
                <div className="space-y-1">
                  <p className="text-base text-slate-200">
                    <span className="font-semibold text-blue-400 group-hover:underline">Click anywhere here</span> or drag files to stage presentation
                  </p>
                  <p className="text-xs text-slate-500">Secure pipeline encryption handled automatically</p>
                </div>
              </div>
            </label>

            {/* Constraints Reference Row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl bg-slate-950/50 p-4 border border-slate-800/60">
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Accepted Formats</p>
                  <p className="text-sm font-semibold text-slate-200">PDF, PPTX, or PPT configurations</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-800/60 pt-3 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-6">
                <HardDrive className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Maximum File Size</p>
                  <p className="text-sm font-semibold text-slate-200">Up to 25 MB file chunks</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staged Form Preparation Preview Panel */}
        {selectedFile && !isUploading && (
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="rounded-lg bg-blue-500/10 p-2 border border-blue-500/20">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate text-slate-200">{selectedFile.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatBytes(selectedFile.size)} • Staged & waiting</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleUploadTrigger}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 shadow-lg shadow-blue-600/10"
            >
              <UploadCloud className="h-4 w-4" />
              Upload Pitch Deck
            </button>
          </div>
        )}

        {/* Streaming Data In-Flight Processing Layout */}
        {isUploading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-8 flex flex-col items-center justify-center min-h-[200px]">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-3" />
            <p className="text-sm font-medium text-slate-200">Directly writing bitstream payloads down inside S3 storage nodes...</p>
            <p className="text-xs text-slate-500 mt-1">Bypassing local application web gateway instances for instant throughput execution.</p>
          </div>
        )}

        {/* Completed Database Key Log Outputs */}
        {uploadedFileMeta && !selectedFile && !isUploading && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3 min-w-0">
                <div className="rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/20">
                  <FileText className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate text-slate-200">{uploadedFileMeta.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Size: {uploadedFileMeta.size} • Uploaded at {uploadedFileMeta.uploadedAt}</p>
                </div>
              </div>
              <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                S3 Confirmed
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/40 border border-slate-800 p-4">
              <p className="text-xs font-medium uppercase text-slate-500 tracking-wide">Database Key Reference Pointer</p>
              <code className="text-xs font-mono block mt-1 break-all bg-slate-950 p-2 rounded border border-slate-800/80 text-blue-300">
                {uploadedFileMeta.dbKeyReference}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
