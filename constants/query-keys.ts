// ─── React Query Key Factory ───────────────────────────────────────────────────
// Centralized, typed query keys to prevent stale cache bugs

export const queryKeys = {
  // Dashboard
  dashboard: {
    all: ["dashboard"] as const,
    metrics: () => ["dashboard", "metrics"] as const,
    activity: () => ["dashboard", "activity"] as const,
  },

  // Users
  users: {
    all: ["users"] as const,
    list: (params?: any) =>
      ["users", "list", params] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },

  // Verification
  verification: {
    all: ["verification"] as const,
    list: (params?: any) =>
      ["verification", "list", params] as const,
    detail: (id: string) => ["verification", "detail", id] as const,
  },

  // Moderation / Reports
  reports: {
    all: ["reports"] as const,
    list: (params?: any) =>
      ["reports", "list", params] as const,
    detail: (id: string) => ["reports", "detail", id] as const,
  },

  // Clubs
  clubs: {
    all: ["clubs"] as const,
    list: (params?: any) =>
      ["clubs", "list", params] as const,
    detail: (id: string) => ["clubs", "detail", id] as const,
  },

  // Groups
  groups: {
    all: ["groups"] as const,
    list: (params?: any) =>
      ["groups", "list", params] as const,
    detail: (id: string) => ["groups", "detail", id] as const,
  },

  // Badges
  badges: {
    all: ["badges"] as const,
    list: (params?: any) =>
      ["badges", "list", params] as const,
    detail: (id: string) => ["badges", "detail", id] as const,
  },

  // Helpdesk
  tickets: {
    all: ["tickets"] as const,
    list: (params?: any) =>
      ["tickets", "list", params] as const,
    detail: (id: string) => ["tickets", "detail", id] as const,
    replies: (id: string) => ["tickets", "replies", id] as const,
  },

  // Meetings
  meetings: {
    all: ["meetings"] as const,
    list: (params?: any) =>
      ["meetings", "list", params] as const,
    detail: (id: string) => ["meetings", "detail", id] as const,
  },

  // Notifications
  notifications: {
    all: ["notifications"] as const,
    list: (params?: any) =>
      ["notifications", "list", params] as const,
    unreadCount: () => ["notifications", "unread-count"] as const,
  },

  // Analytics
  analytics: {
    all: ["analytics"] as const,
    overview: (params?: any) =>
      ["analytics", "overview", params] as const,
    growth: (params?: any) =>
      ["analytics", "growth", params] as const,
    moderation: (params?: any) =>
      ["analytics", "moderation", params] as const,
  },

  // Audit Logs
  auditLogs: {
    all: ["audit-logs"] as const,
    list: (params?: any) =>
      ["audit-logs", "list", params] as const,
  },

  // Security
  security: {
    all: ["security"] as const,
    events: (params?: any) =>
      ["security", "events", params] as const,
    sessions: () => ["security", "sessions"] as const,
  },

  // Settings
  settings: {
    all: ["settings"] as const,
    section: (section: string) => ["settings", section] as const,
  },
} as const;
