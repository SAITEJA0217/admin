// ─── API Endpoint Constants ────────────────────────────────────────────────────

export const API = {
  /* -------------------------------------------------------------------------- */
  /*                                    AUTH                                    */
  /* -------------------------------------------------------------------------- */

  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
    resendVerification: "/auth/resend-verification",
    me: "/auth/me",
  },

  /* -------------------------------------------------------------------------- */
  /*                                 DASHBOARD                                  */
  /* -------------------------------------------------------------------------- */

  dashboard: {
    base: "/admin/dashboard",
  },

  /* -------------------------------------------------------------------------- */
  /*                                    USERS                                   */
  /* -------------------------------------------------------------------------- */

  users: {
    base: "/admin/users",
    byId: (id: string) => `/admin/user/${id}`,
    toggleActive: (id: string) => `/admin/users/${id}/toggle-active`,
    deletePortfolio: (id: string) => `/admin/portfolio/${id}`,
  },

  /* -------------------------------------------------------------------------- */
  /*                           PROFILE MODERATION                               */
  /* -------------------------------------------------------------------------- */

  manufacturers: {
    verify: (id: string) => `/admin/manufacturers/${id}/verify`,
    reject: (id: string) => `/admin/manufacturers/${id}/reject`,
  },

  investors: {
    verify: (id: string) => `/admin/investors/${id}/verify`,
    reject: (id: string) => `/admin/investors/${id}/reject`,
  },

  startups: {
    verify: (id: string) => `/admin/startups/${id}/verify`,
    reject: (id: string) => `/admin/startups/${id}/reject`,
  },

  profiles: {
    feature: (role: string, id: string) => `/admin/profiles/${role}/${id}/feature`,
  },

  /* -------------------------------------------------------------------------- */
  /*                                MODERATION                                  */
  /* -------------------------------------------------------------------------- */

  moderation: {
    reports: "/admin/reports",
    resolve: (id: string) => `/admin/reports/${id}/resolve`,
    deleteComment: (id: string) => `/admin/comments/${id}`,
    pinPost: (id: string) => `/admin/posts/${id}/pin`,
  },

  /* -------------------------------------------------------------------------- */
  /*                                    CLUBS                                   */
  /* -------------------------------------------------------------------------- */

  clubs: {
    base: "/admin/clubs",
    byId: (id: string) => `/admin/clubs/${id}`,
  },

  /* -------------------------------------------------------------------------- */
  /*                                   GROUPS                                   */
  /* -------------------------------------------------------------------------- */

  groups: {
    verify: (id: string) => `/admin/groups/${id}/verify`,
    byId: (id: string) => `/admin/groups/${id}`,
  },

  /* -------------------------------------------------------------------------- */
  /*                                   BADGES                                   */
  /* -------------------------------------------------------------------------- */

  badges: {
    base: "/admin/badges",
    award: "/admin/badges/award",
    revoke: "/admin/badges/revoke",
  },

  /* -------------------------------------------------------------------------- */
  /*                                  HELPDESK                                  */
  /* -------------------------------------------------------------------------- */

  helpdesk: {
    base: "/admin/contact-messages",
    resolve: (id: string) => `/admin/contact-messages/${id}/resolve`,
  },

  /* -------------------------------------------------------------------------- */
  /*                                AUDIT LOGS                                  */
  /* -------------------------------------------------------------------------- */

  auditLogs: {
    base: "/admin/audit-logs",
  },

  /* -------------------------------------------------------------------------- */
  /*                                  MEETINGS                                  */
  /* -------------------------------------------------------------------------- */

  meetings: {
    base: "/admin/meetings",
    cancel: (id: string) => `/admin/meetings/${id}/cancel`,
    // User-facing endpoints
    create: "/meetings",
    list: "/meetings",
    respond: (id: string) => `/meetings/${id}/respond`,
    delete: (id: string) => `/meetings/${id}`,
  },

  /* -------------------------------------------------------------------------- */
  /*                               NOTIFICATIONS                                */
  /* -------------------------------------------------------------------------- */

  notifications: {
    base: "/notifications",
    unreadCount: "/notifications/unread-count",
    readAll: "/notifications/read-all",
    read: (id: string) => `/notifications/${id}/read`,
  },
} as const;