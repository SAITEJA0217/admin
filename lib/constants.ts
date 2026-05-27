export const APP_NAME = "Venture Launcher";
export const APP_VERSION = "2.4.1";

export const ITEMS_PER_PAGE = 20;

export const STATUS_COLORS = {
  active: "emerald",
  inactive: "slate",
  suspended: "red",
  banned: "red",
  pending: "yellow",
  verified: "emerald",
  rejected: "red",
  featured: "purple",
  open: "blue",
  in_progress: "yellow",
  resolved: "emerald",
  closed: "slate",
  scheduled: "blue",
  completed: "emerald",
  cancelled: "red",
  no_show: "orange",
  flagged: "red",
} as const;

export const ROLE_LABELS: Record<string, string> = {
  founder: "Founder",
  investor: "Investor",
  manufacturer: "Manufacturer",
  admin: "Admin",
  moderator: "Moderator",
};

export const PRIORITY_COLORS = {
  low: "slate",
  medium: "yellow",
  high: "orange",
  critical: "red",
} as const;
