// ─── Core Entity Types ────────────────────────────────────────────────────────

export type UserRole = "founder" | "investor" | "manufacturer" | "admin" | "moderator";
export type UserStatus = "active" | "inactive" | "suspended" | "banned";
export type VerificationStatus = "pending" | "verified" | "rejected" | "featured";
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";
export type ReportStatus = "pending" | "reviewing" | "resolved" | "dismissed";
export type MeetingStatus = "scheduled" | "completed" | "cancelled" | "no_show";
export type BadgeCategory = "achievement" | "role" | "community" | "special";
export type AuditAction =
  | "user.created"
  | "user.suspended"
  | "user.verified"
  | "report.resolved"
  | "content.deleted"
  | "badge.awarded"
  | "meeting.cancelled"
  | "login.failed"
  | "settings.changed"
  | "club.created"
  | "group.removed";

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  verification_status: VerificationStatus;
  joined_at: string;
  last_active: string;
  avatar?: string;
  company?: string;
  location?: string;
}

export interface VerificationRequest {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  entity_type: "startup" | "investor" | "manufacturer";
  entity_name: string;
  status: VerificationStatus;
  submitted_at: string;
  reviewed_at?: string;
  reviewer?: string;
  documents: string[];
  notes?: string;
  startupProfile?: { companyName: string };
  investorProfile?: { fullName: string };
  manufacturerProfile?: { factoryName: string };
  email?: string;
  createdAt?: string;
  role?: string;
  user?: any;
}

export interface Report {
  id: string;
  reporter_name: string;
  reporter_email: string;
  target_type: "post" | "comment" | "user" | "club" | "group";
  target_id: string;
  target_preview: string;
  reason: string;
  status: ReportStatus;
  severity: "low" | "medium" | "high";
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  post_count: number;
  status: "active" | "inactive" | "suspended";
  created_at: string;
  owner_name: string;
  engagement_rate: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  member_count: number;
  post_count: number;
  status: "active" | "inactive" | "flagged";
  created_at: string;
  owner_name: string;
  is_private: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string;
  color: string;
  awarded_count: number;
  created_at: string;
  is_active: boolean;
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  subject: string;
  description: string;
  user_name: string;
  user_email: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  resolved_at?: string;
}

export interface Meeting {
  id: string;
  title: string;
  startup_name: string;
  investor_name: string;
  scheduled_at: string;
  duration_minutes: number;
  status: MeetingStatus;
  meeting_type: "intro" | "pitch" | "follow_up" | "due_diligence";
  notes?: string;
}

export interface AuditLog {
  id: string;
  action: AuditAction;
  admin_name: string;
  admin_email: string;
  target_type: string;
  target_id: string;
  target_name: string;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface SecurityEvent {
  id: string;
  type: "failed_login" | "suspicious_activity" | "rate_limit" | "blocked_ip" | "session_anomaly";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  ip_address: string;
  user_email?: string;
  timestamp: string;
  resolved: boolean;
}

export interface AnalyticsDataPoint {
  date: string;
  users: number;
  startups: number;
  investors: number;
  meetings: number;
  reports: number;
  tickets: number;
}
