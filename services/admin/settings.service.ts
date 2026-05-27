import { http, type ApiResponse } from "@/lib/http";
import { API } from "@/constants/api";

export interface PlatformSettings {
  platform_name: string;
  support_email: string;
  platform_version: string;
  open_registration: boolean;
  email_verification_required: boolean;
  invite_only_mode: boolean;
}

export interface NotificationSettings {
  new_verification_requests: boolean;
  high_severity_reports: boolean;
  failed_login_attempts: boolean;
  new_support_tickets: boolean;
  system_alerts: boolean;
}

export interface SecuritySettings {
  two_factor_required: boolean;
  session_timeout_minutes: number;
  max_login_attempts: number;
  ip_allowlist_enabled: boolean;
  auto_block_suspicious_ips: boolean;
}

export interface FeatureSettings {
  verification_system: boolean;
  meeting_scheduler: boolean;
  community_clubs: boolean;
  badge_system: boolean;
  ai_recommendations: boolean;
}

export interface AppearanceSettings {
  default_theme: "dark" | "light" | "system";
  accent_color: string;
}

export interface DataSettings {
  audit_log_retention_days: number;
  deleted_user_data_retention_days: number;
  gdpr_compliance_mode: boolean;
}

export type AllSettings = PlatformSettings &
  NotificationSettings &
  SecuritySettings &
  FeatureSettings &
  AppearanceSettings &
  DataSettings;

export const settingsService = {
  getAll: () =>
    Promise.resolve({
      verification: { auto_approve: false, require_mfa: false, require_kpc: false },
      system: { max_upload_mb: 10, api_rate_limit: 100 },
      notifications: { email_alerts: true, slack_integration: false },
      security: { session_timeout_min: 30, password_expiry_days: 90 },
    } as unknown as AllSettings),

  update: (section: string, data: Partial<AllSettings>) =>
    Promise.resolve({
      message: "Settings updated successfully",
      data: {
        verification: { auto_approve: false, require_mfa: false, require_kpc: false },
        system: { max_upload_mb: 10, api_rate_limit: 100 },
        notifications: { email_alerts: true, slack_integration: false },
        security: { session_timeout_min: 30, password_expiry_days: 90 },
      } as unknown as AllSettings,
    }),
};
