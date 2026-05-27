export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  ANALYST: 'analyst',
  SUPPORT: 'support',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_CLUBS: 'manage_clubs',
  MANAGE_GROUPS: 'manage_groups',
  MODERATE_CONTENT: 'moderate_content',
  MANAGE_VERIFICATION: 'manage_verification',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_BILLING: 'manage_billing',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_CLUBS,
    PERMISSIONS.MANAGE_GROUPS,
    PERMISSIONS.MODERATE_CONTENT,
    PERMISSIONS.MANAGE_VERIFICATION,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.MODERATE_CONTENT,
    PERMISSIONS.MANAGE_VERIFICATION,
  ],
  [ROLES.ANALYST]: [
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.SUPPORT]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_VERIFICATION,
  ],
};
