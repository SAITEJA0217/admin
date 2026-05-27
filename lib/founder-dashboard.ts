import type {
  CompletionTask,
  FounderDashboardData,
  FounderProfile,
} from "@/types/founder";

function isFilled(
  value: string | number | null | undefined
): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return true;
}

function buildCompletionTasks(
  profile: FounderProfile
): CompletionTask[] {
  return [
    {
      label: "Add company name",
      completed: isFilled(
        profile.companyName
      ),
    },
    {
      label: "Write tagline",
      completed: isFilled(
        profile.tagline
      ),
    },
    {
      label: "Add company description",
      completed: isFilled(
        profile.description
      ),
    },
    {
      label: "Select industry",
      completed: isFilled(
        profile.industry
      ),
    },
    {
      label: "Choose startup stage",
      completed: isFilled(
        profile.stage
      ),
    },
    {
      label: "Upload company logo",
      completed: !!profile.logoUrl,
    },
    {
      label: "Upload pitch deck",
      completed:
        !!profile.pitchDeckUrl,
    },
    {
      label: "Add website URL",
      completed: isFilled(
        profile.websiteUrl
      ),
    },
    {
      label: "Add LinkedIn URL",
      completed: isFilled(
        profile.linkedinUrl
      ),
    },
    {
      label: "Add at least one team member",
      completed:
        profile.teamMembers.length > 0,
    },
  ];
}

function formatCurrency(
  amount: number | null
): string {
  if (amount === null) {
    return "Not Set";
  }

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export function mapFounderProfileToDashboard(
  profile: FounderProfile
): FounderDashboardData {
  const completionTasks =
    buildCompletionTasks(profile);

  const companyName =
    profile.companyName.trim() ||
    "Your Startup";

  const tagline =
    profile.tagline ||
    "Complete your profile to attract investors.";

  return {
    companyName,
    tagline,
    profileCompletion:
      profile.completionScore,
    verificationStatus:
      profile.verificationStatus,

    hasPitchDeck:
      !!profile.pitchDeckUrl,
    hasLogo: !!profile.logoUrl,
    teamCount:
      profile.teamMembers.length,
    profileViews: {
      total: 0,
      thisWeek: 0,
    },
    investorInterests: {
      total: 0,
      pending: 0,
    },
    messages: {
      total: 0,
      unread: 0,
    },
    isFeatured: profile.isFeatured,

    stats: [
      {
        label: "Funding Goal",
        value: formatCurrency(
          profile.fundingGoal
        ),
      },
      {
        label: "Funding Raised",
        value: formatCurrency(
          profile.fundingRaised
        ),
      },
      {
        label: "Team Members",
        value:
          profile.teamMembers.length,
      },
      {
        label: "Startup Stage",
        value:
          profile.stage || "Not Set",
      },
      {
        label: "Industry",
        value:
          profile.industry ||
          "Not Set",
      },
      {
        label: "Location",
        value:
          profile.location ||
          "Not Set",
      },
    ],

    completionTasks,
  };
}