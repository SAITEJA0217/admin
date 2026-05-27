
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Globe,
  Lamp,
  Loader2,
  MapPin,
  Pencil,
  Users,
  FileText,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

import { getFounderProfile } from "@/services/founder/profile.service";
import type { FounderProfile } from "@/types/founder";

export default function FounderProfileView() {
  const [profile, setProfile] = useState<FounderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getFounderProfile();
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load profile"
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProfile();
  }, []);

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

  if (error || !profile) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-300">
        {error || "Profile not found."}
      </div>
    );
  }

  const completion = profile.completionScore ?? 0;

  const fundingGoal = profile.fundingGoal ?? 0;
  const fundingRaised = profile.fundingRaised ?? 0;

  const fundingPercent =
    fundingGoal > 0
      ? Math.min(100, (fundingRaised / fundingGoal) * 100)
      : 0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const verificationColor = {
    VERIFIED: "text-green-400 bg-green-500/10 border-green-500/20",
    PENDING: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    REJECTED: "text-red-400 bg-red-500/10 border-red-500/20",
  }[
    (profile.verificationStatus || "PENDING") as
      | "VERIFIED"
      | "PENDING"
      | "REJECTED"
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            {profile.logoUrl ? (
              <img
                src={profile.logoUrl}
                alt={profile.companyName || "Startup logo"}
                className="h-24 w-24 rounded-3xl object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-800">
                <Building2 className="h-12 w-12 text-slate-500" />
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold sm:text-4xl">
                  {profile.companyName || "Untitled Startup"}
                </h1>

                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${verificationColor}`}
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {profile.verificationStatus || "PENDING"}
                </span>
              </div>

              {profile.tagline && (
                <p className="mt-2 text-lg text-slate-300">
                  {profile.tagline}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                {profile.industry && (
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    {profile.industry}
                  </span>
                )}

                {profile.stage && (
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300">
                    {profile.stage}
                  </span>
                )}

                {profile.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </span>
                )}

                {profile.foundedYear && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Founded {profile.foundedYear}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/founder/profile/update"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>

            <Link
              href="/founder/team"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              <Users className="h-4 w-4" />
              Manage Team
            </Link>
          </div>
        </div>

        {/* Completion */}
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-400">Profile Completion</span>
            <span className="font-medium text-white">{completion}%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* About */}
        <Card title="About Startup">
          {profile.description ? (
            <p className="leading-7 text-slate-300">
              {profile.description}
            </p>
          ) : (
            <EmptyState message="Add a company description to help investors understand your vision." />
          )}
        </Card>

        {/* Funding */}
        <Card title="Funding Overview">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Metric
                label="Funding Goal"
                value={formatCurrency(fundingGoal)}
              />
              <Metric
                label="Raised"
                value={formatCurrency(fundingRaised)}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">
                  {fundingPercent.toFixed(1)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-emerald-500"
                  style={{ width: `${fundingPercent}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Company Details */}
        <Card title="Company Details">
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Industry" value={profile.industry} />
            <Detail label="Stage" value={profile.stage} />
            <Detail
              label="Employees"
              value={
                profile.employeeCount !== null &&
                profile.employeeCount !== undefined
                  ? String(profile.employeeCount)
                  : undefined
              }
            />
            <Detail
              label="Featured"
              value={profile.isFeatured ? "Yes" : "No"}
            />
          </div>
        </Card>

        {/* Online Presence */}
        <Card title="Online Presence">
          <div className="space-y-3">
            {profile.websiteUrl && (
              <ExternalLink
                href={profile.websiteUrl}
                label="Website"
                icon={<Globe className="h-4 w-4" />}
              />
            )}

            {profile.linkedinUrl && (
              <ExternalLink
                href={profile.linkedinUrl}
                label="LinkedIn"
                icon={<Lamp className="h-4 w-4" />}
              />
            )}

            {!profile.websiteUrl && !profile.linkedinUrl && (
              <EmptyState message="Add your website and LinkedIn links." />
            )}
          </div>
        </Card>
      </div>

      {/* Pitch Deck */}
      <Card title="Pitch Deck">
        {profile.pitchDeckKey ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">
                Pitch deck uploaded successfully.
              </span>
            </div>

            <Link
              href="/founder/profile/update"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Replace Pitch Deck
            </Link>
          </div>
        ) : (
          <EmptyState message="No pitch deck uploaded yet." />
        )}
      </Card>

      {/* Team Members */}
      <Card title="Team Members">
        {profile.teamMembers && profile.teamMembers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No team members added yet." />
        )}
      </Card>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white sm:p-8">
      <h2 className="mb-5 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-medium text-white">{value || "Not specified"}</p>
    </div>
  );
}

function ExternalLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-4 text-slate-400">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
