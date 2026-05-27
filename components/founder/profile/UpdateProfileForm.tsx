// components/founder/profile/UpdateProfileForm.tsx

"use client";

import { useEffect, useState, type ReactNode, type DragEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Save,
  Loader2,
  UploadCloud,
  Building,
} from "lucide-react";

import {
  founderProfileSchema,
  type FounderProfileFormData,
} from "@/schemas/founder-profile.schema";

import { getFounderProfile } from "@/services/founder/profile.service";
import { updateFounderProfile } from "@/services/founder/update-profile.service";

export default function UpdateProfileForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Logo uploading specific states
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FounderProfileFormData>({
    resolver: zodResolver(founderProfileSchema) as any,
    defaultValues: {
      companyName: "",
      tagline: "",
      description: "",
      Industry: "",
      stage: "",
      fundingGoal: undefined,
      fundingRaised: undefined,
      logoUrl: "",
      websiteUrl: "",
      linkedinUrl: "",
      pitchDeckKey: "",
      location: "",
      foundedYear: undefined,
      employeeCount: undefined,
    },
  });

  // Watch the logoUrl value to show live image feedback previews
  const currentLogoUrl = watch("logoUrl");

  useEffect(() => {
    const loadProfile = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setServerError("");

        const profile = await getFounderProfile();

        reset({
          companyName: profile.companyName || "",
          tagline: profile.tagline || "",
          description: profile.description || "",
          Industry: profile.industry || "",
          stage: profile.stage || "",
          fundingGoal: profile.fundingGoal ?? undefined,
          fundingRaised: profile.fundingRaised ?? undefined,
          logoUrl: profile.logoUrl || "",
          websiteUrl: profile.websiteUrl || "",
          linkedinUrl: profile.linkedinUrl || "",
          pitchDeckKey: profile.pitchDeckKey || "",
          location: profile.location || "",
          foundedYear: profile.foundedYear ?? undefined,
          employeeCount: profile.employeeCount ?? undefined,
        });
      } catch (error) {
        setServerError(
          error instanceof Error ? error.message : "Failed to load profile"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [reset]);

  // Handle Drag-and-Drop Event Interceptions
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadLogoFile(e.target.files[0]);
    }
  };

  // POST Request handler directly to target API endpoint
  const uploadLogoFile = async (file: File) => {
    try {
      setIsLogoUploading(true);
      setServerError("");
      setSuccessMessage("");

      const formData = new FormData();
      formData.append("logo", file); // or whatever key your API route parser uses (e.g. 'file')

      const res = await fetch("/api/founder/profile/logo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image assets to destination endpoint");
      }

      const data = await res.json();

      // Expected payload format: { success: true, url: "https://..." }
      if (data.url) {
        setValue("logoUrl", data.url, { shouldValidate: true, shouldDirty: true });
        setSuccessMessage("Logo file processed successfully.");
      } else {
        throw new Error("Invalid response format received from endpoint server assets");
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Logo upload failed");
    } finally {
      setIsLogoUploading(false);
    }
  };

  const onSubmit: SubmitHandler<FounderProfileFormData> = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");

      const payload = {
        ...data,
        tagline: data.tagline || undefined,
        description: data.description || undefined,
        Industry: data.Industry || undefined,
        stage: data.stage || undefined,
        logoUrl: data.logoUrl || undefined,
        websiteUrl: data.websiteUrl || undefined,
        linkedinUrl: data.linkedinUrl || undefined,
        pitchDeckKey: data.pitchDeckKey || undefined,
        location: data.location || undefined,
      };

      await updateFounderProfile(payload);

      setSuccessMessage("Profile updated successfully.");

      setTimeout(() => {
        router.push("/founder/profile");
      }, 1000);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Update Startup Profile
        </h1>
        <p className="mt-2 text-slate-400">
          Keep your startup information updated to attract investors.
        </p>
      </div>

      {/* Alerts */}
      {serverError && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
          {successMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Company Information */}
        <section>
          <h2 className="mb-6 text-lg font-semibold">
            Company Information
          </h2>

          {/* Interactive Drag and Drop Logo Upload Zone */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Company Logo
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Thumbnail Circle Display Box */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                {currentLogoUrl ? (
                  <img
                    src={currentLogoUrl}
                    alt="Company logo preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building className="h-8 w-8 text-slate-500" />
                )}
              </div>

              {/* Interactive Dropzone Wrapper Box */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`group relative flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition min-h-[80px] cursor-pointer
                  ${isDragActive
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950"
                  }
                `}
              >
                <input
                  id="logo-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLogoUploading}
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />

                {isLogoUploading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    <span>Uploading asset binary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <UploadCloud className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition" />
                      <span>
                        <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, or SVG formats accepted</p>
                  </div>
                )}
              </div>
            </div>
            {/* Hidden Input mapping form registration token state hooks */}
            <input type="hidden" {...register("logoUrl")} />
            {errors.logoUrl && (
              <p className="mt-2 text-sm text-red-400">{errors.logoUrl.message}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Company Name"
              error={errors.companyName?.message}
            >
              <input
                type="text"
                {...register("companyName")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Tagline"
              error={errors.tagline?.message}
            >
              <input
                type="text"
                {...register("tagline")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Industry"
              error={errors.Industry?.message}
            >
              <input
                type="text"
                {...register("Industry")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Stage"
              error={errors.stage?.message}
            >
              <input
                type="text"
                {...register("stage")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Location"
              error={errors.location?.message}
            >
              <input
                type="text"
                {...register("location")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Founded Year"
              error={errors.foundedYear?.message}
            >
              <input
                type="number"
                {...register("foundedYear")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Employee Count"
              error={errors.employeeCount?.message}
            >
              <input
                type="number"
                {...register("employeeCount")}
                className={inputClass}
              />
            </FormField>
          </div>

          <div className="mt-6">
            <FormField
              label="Description"
              error={errors.description?.message}
            >
              <textarea
                rows={6}
                {...register("description")}
                className={`${inputClass} resize-none`}
              />
            </FormField>
          </div>
        </section>

        {/* Funding Information */}
        <section>
          <h2 className="mb-6 text-lg font-semibold">
            Funding Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Funding Goal (INR)"
              error={errors.fundingGoal?.message}
            >
              <input
                type="number"
                {...register("fundingGoal")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Funding Raised (INR)"
              error={errors.fundingRaised?.message}
            >
              <input
                type="number"
                {...register("fundingRaised")}
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        {/* Links & Assets */}
        <section>
          <h2 className="mb-6 text-lg font-semibold">
            Links & Assets
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Website URL"
              error={errors.websiteUrl?.message}
            >
              <input
                type="url"
                {...register("websiteUrl")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="LinkedIn URL"
              error={errors.linkedinUrl?.message}
            >
              <input
                type="url"
                {...register("linkedinUrl")}
                className={inputClass}
              />
            </FormField>

            {/* Kept fallback text field input below just in case user needs manually fixed link string injection updates */}
            <FormField
              label="Logo URL (Manual Override)"
              error={errors.logoUrl?.message}
            >
              <input
                type="url"
                {...register("logoUrl")}
                className={inputClass}
              />
            </FormField>

            <FormField
              label="Pitch Deck Key"
              error={errors.pitchDeckKey?.message}
            >
              <input
                type="text"
                {...register("pitchDeckKey")}
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push("/founder/profile")}
            className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || isLogoUploading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper Components */
/* -------------------------------------------------------------------------- */

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
