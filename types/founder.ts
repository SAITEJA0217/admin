export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  linkedinUrl?: string | null;
  photoUrl?: string | null;
}

export type VerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

export interface FounderProfile {
  id: string;
  userId: string;

  companyName: string;
  tagline: string | null;
  description: string | null;
  industry: string | null;
  stage: string | null;

  fundingGoal: number | null;
  fundingRaised: number;

  logoUrl: string | null;
  pitchDeckKey: string | null;
  pitchDeckUrl: string | null;

  websiteUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;

  location: string | null;
  foundedYear: number | null;
  employeeCount: number | null;

  completionScore: number;
  isFeatured: boolean;

  verificationStatus: VerificationStatus;
  verificationNote: string | null;

  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  teamMembers: TeamMember[];
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  timestamp: string;
  data: T;
}

/* Dashboard UI Types */
export interface DashboardStat {
  label: string;
  value: string | number;
  helper?: string;
}

export interface CompletionTask {
  label: string;
  completed: boolean;
}

export interface FounderDashboardData {
  companyName: string;
  tagline: string;
  profileCompletion: number;
  verificationStatus: VerificationStatus;

  stats: DashboardStat[];
  completionTasks: CompletionTask[];

  hasPitchDeck: boolean;
  hasLogo: boolean;
  teamCount: number;

  profileViews: {
    total: number;
    thisWeek: number;
  };
  investorInterests: {
    total: number;
    pending: number;
  };
  messages: {
    total: number;
    unread: number;
  };
  isFeatured: boolean;
}