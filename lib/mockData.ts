import type {
  AdminUser, VerificationRequest, Report, Club, Group,
  Badge, SupportTicket, Meeting, AuditLog, SecurityEvent, AnalyticsDataPoint,
} from "./types";

// ─── Dashboard Metrics ────────────────────────────────────────────────────────
export const metricCards = [
  { id: "total-users", title: "Total Users", value: "48,291", trend: 12.4, icon: "Users", color: "purple" as const, description: "Registered accounts" },
  { id: "total-startups", title: "Total Startups", value: "3,847", trend: 8.7, icon: "Rocket", color: "blue" as const, description: "Active ventures" },
  { id: "total-investors", title: "Total Investors", value: "1,204", trend: 5.2, icon: "TrendingUp", color: "cyan" as const, description: "Verified investors" },
  { id: "total-manufacturers", title: "Manufacturers", value: "892", trend: 3.1, icon: "Factory", color: "emerald" as const, description: "Production partners" },
  { id: "active-users", title: "Active Users", value: "12,483", trend: 18.9, icon: "Activity", color: "violet" as const, description: "Last 24 hours" },
  { id: "verified-profiles", title: "Verified Profiles", value: "31,056", trend: 6.3, icon: "ShieldCheck", color: "indigo" as const, description: "Identity confirmed" },
];

export const ecosystemGrowthData = [
  { day: "Mon", users: 4200, startups: 320, investors: 88 },
  { day: "Tue", users: 5800, startups: 410, investors: 102 },
  { day: "Wed", users: 5200, startups: 380, investors: 95 },
  { day: "Thu", users: 7100, startups: 520, investors: 130 },
  { day: "Fri", users: 6400, startups: 470, investors: 118 },
  { day: "Sat", users: 8900, startups: 640, investors: 155 },
  { day: "Sun", users: 9800, startups: 710, investors: 172 },
];

export const activityFeedItems = [
  { id: "1", type: "verification", message: "New startup profile submitted for verification", actor: "NovaTech Labs", time: "2m ago", icon: "ShieldCheck", color: "purple" },
  { id: "2", type: "report", message: "Content report flagged for review", actor: "Community Mod", time: "8m ago", icon: "Flag", color: "red" },
  { id: "3", type: "user", message: "Investor account verified successfully", actor: "Apex Capital", time: "15m ago", icon: "UserCheck", color: "green" },
  { id: "4", type: "system", message: "Automated audit log snapshot completed", actor: "System", time: "22m ago", icon: "Database", color: "blue" },
  { id: "5", type: "club", message: "New club created: AI Founders Circle", actor: "Sarah Chen", time: "34m ago", icon: "Users", color: "cyan" },
  { id: "6", type: "security", message: "Suspicious login attempt blocked", actor: "Security Engine", time: "41m ago", icon: "ShieldAlert", color: "orange" },
  { id: "7", type: "meeting", message: "Investor-Startup meeting scheduled", actor: "Platform", time: "1h ago", icon: "Calendar", color: "violet" },
  { id: "8", type: "badge", message: "Badge awarded: Top Contributor", actor: "Marcus Rivera", time: "1h 20m ago", icon: "Award", color: "yellow" },
];

export const moderationMetrics = [
  { id: "pending-reports", title: "Pending Reports", value: 47, badge: "WATCH", badgeColor: "yellow" as const, icon: "AlertTriangle", color: "yellow" as const, change: 12 },
  { id: "resolved-reports", title: "Resolved Reports", value: 1284, badge: "OK", badgeColor: "green" as const, icon: "CheckCircle2", color: "green" as const, change: 34 },
  { id: "suspended-accounts", title: "Suspended Accounts", value: 23, badge: "RISK", badgeColor: "red" as const, icon: "UserX", color: "red" as const, change: -3 },
  { id: "flagged-content", title: "Flagged Content", value: 89, badge: "WATCH", badgeColor: "yellow" as const, icon: "Flag", color: "orange" as const, change: 7 },
];

export const operationalMetrics = [
  { label: "Scheduled Meetings", value: "342", icon: "Calendar", color: "purple" },
  { label: "Support Tickets", value: "128", icon: "LifeBuoy", color: "blue" },
  { label: "Audit Logs Today", value: "4,891", icon: "ScrollText", color: "cyan" },
  { label: "Platform Activity", value: "98.4%", icon: "Gauge", color: "emerald" },
];

export const communityMetrics = [
  { label: "Total Clubs", value: "284", icon: "Users2", color: "violet" },
  { label: "Total Groups", value: "1,047", icon: "Network", color: "blue" },
  { label: "Active Discussions", value: "3,291", icon: "MessageSquare", color: "cyan" },
  { label: "Engagement Rate", value: "74.2%", icon: "BarChart3", color: "emerald" },
];

// ─── Users ────────────────────────────────────────────────────────────────────
export const mockUsers: AdminUser[] = [
  { id: "u1", full_name: "Sarah Chen", email: "sarah.chen@novatech.io", role: "founder", status: "active", verification_status: "verified", joined_at: "2024-01-15", last_active: "2026-05-24", company: "NovaTech Labs", location: "San Francisco, CA" },
  { id: "u2", full_name: "Marcus Rivera", email: "m.rivera@apexcap.com", role: "investor", status: "active", verification_status: "featured", joined_at: "2023-11-02", last_active: "2026-05-23", company: "Apex Capital", location: "New York, NY" },
  { id: "u3", full_name: "Priya Sharma", email: "priya@quantumleap.ai", role: "founder", status: "active", verification_status: "verified", joined_at: "2024-03-08", last_active: "2026-05-22", company: "QuantumLeap AI", location: "Austin, TX" },
  { id: "u4", full_name: "James Okafor", email: "j.okafor@greenbridge.mfg", role: "manufacturer", status: "active", verification_status: "verified", joined_at: "2024-02-20", last_active: "2026-05-21", company: "GreenBridge Mfg", location: "Detroit, MI" },
  { id: "u5", full_name: "Elena Volkov", email: "elena@deepwave.vc", role: "investor", status: "active", verification_status: "verified", joined_at: "2023-09-14", last_active: "2026-05-20", company: "DeepWave Ventures", location: "Boston, MA" },
  { id: "u6", full_name: "Kai Nakamura", email: "kai@synapse.io", role: "founder", status: "inactive", verification_status: "pending", joined_at: "2024-04-01", last_active: "2026-04-15", company: "Synapse IO", location: "Seattle, WA" },
  { id: "u7", full_name: "Amara Diallo", email: "amara@solaris.energy", role: "founder", status: "active", verification_status: "verified", joined_at: "2024-01-28", last_active: "2026-05-24", company: "Solaris Energy", location: "Miami, FL" },
  { id: "u8", full_name: "Tom Whitfield", email: "tom.w@bridgepoint.fund", role: "investor", status: "suspended", verification_status: "rejected", joined_at: "2023-12-05", last_active: "2026-03-10", company: "Bridgepoint Fund", location: "Chicago, IL" },
  { id: "u9", full_name: "Lena Fischer", email: "lena@precisionparts.de", role: "manufacturer", status: "active", verification_status: "verified", joined_at: "2024-02-14", last_active: "2026-05-23", company: "Precision Parts GmbH", location: "Munich, DE" },
  { id: "u10", full_name: "Raj Patel", email: "raj@cloudnine.tech", role: "founder", status: "active", verification_status: "pending", joined_at: "2024-05-01", last_active: "2026-05-24", company: "CloudNine Tech", location: "London, UK" },
  { id: "u11", full_name: "Sofia Mendez", email: "sofia@latamvc.com", role: "investor", status: "active", verification_status: "verified", joined_at: "2023-10-18", last_active: "2026-05-22", company: "LatAm Ventures", location: "São Paulo, BR" },
  { id: "u12", full_name: "David Kim", email: "david@nexgen.kr", role: "founder", status: "active", verification_status: "verified", joined_at: "2024-03-22", last_active: "2026-05-21", company: "NexGen Korea", location: "Seoul, KR" },
];

// ─── Verification Requests ────────────────────────────────────────────────────
export const mockVerifications: VerificationRequest[] = [
  { id: "v1", user_id: "u6", user_name: "Kai Nakamura", user_email: "kai@synapse.io", entity_type: "startup", entity_name: "Synapse IO", status: "pending", submitted_at: "2026-05-20T10:30:00Z", documents: ["pitch_deck.pdf", "incorporation.pdf", "financials.xlsx"], notes: "AI-native infrastructure startup" },
  { id: "v2", user_id: "u10", user_name: "Raj Patel", user_email: "raj@cloudnine.tech", entity_type: "startup", entity_name: "CloudNine Tech", status: "pending", submitted_at: "2026-05-22T14:15:00Z", documents: ["deck.pdf", "team_bios.pdf"], notes: "Cloud infrastructure SaaS" },
  { id: "v3", user_id: "u8", user_name: "Tom Whitfield", user_email: "tom.w@bridgepoint.fund", entity_type: "investor", entity_name: "Bridgepoint Fund", status: "rejected", submitted_at: "2026-03-01T09:00:00Z", reviewed_at: "2026-03-05T11:00:00Z", reviewer: "Admin SA", documents: ["fund_docs.pdf"], notes: "Incomplete documentation" },
  { id: "v4", user_id: "u1", user_name: "Sarah Chen", user_email: "sarah.chen@novatech.io", entity_type: "startup", entity_name: "NovaTech Labs", status: "verified", submitted_at: "2024-01-20T08:00:00Z", reviewed_at: "2024-01-22T10:00:00Z", reviewer: "Admin SA", documents: ["pitch.pdf", "inc.pdf", "financials.pdf"] },
  { id: "v5", user_id: "u2", user_name: "Marcus Rivera", user_email: "m.rivera@apexcap.com", entity_type: "investor", entity_name: "Apex Capital", status: "featured", submitted_at: "2023-11-10T12:00:00Z", reviewed_at: "2023-11-12T09:00:00Z", reviewer: "Admin SA", documents: ["fund_overview.pdf", "portfolio.pdf"] },
  { id: "v6", user_id: "u4", user_name: "James Okafor", user_email: "j.okafor@greenbridge.mfg", entity_type: "manufacturer", entity_name: "GreenBridge Mfg", status: "verified", submitted_at: "2024-02-25T11:00:00Z", reviewed_at: "2024-02-27T14:00:00Z", reviewer: "Admin SA", documents: ["facility_cert.pdf", "iso_cert.pdf"] },
];

// ─── Reports ──────────────────────────────────────────────────────────────────
export const mockReports: Report[] = [
  { id: "r1", reporter_name: "Alex Johnson", reporter_email: "alex@email.com", target_type: "post", target_id: "p123", target_preview: "This investment opportunity guarantees 500% returns...", reason: "Spam / Misleading content", status: "pending", severity: "high", created_at: "2026-05-24T08:00:00Z" },
  { id: "r2", reporter_name: "Maria Santos", reporter_email: "maria@email.com", target_type: "user", target_id: "u99", target_preview: "User: fake_investor_2024", reason: "Impersonation", status: "reviewing", severity: "high", created_at: "2026-05-23T15:30:00Z" },
  { id: "r3", reporter_name: "Chris Lee", reporter_email: "chris@email.com", target_type: "comment", target_id: "c456", target_preview: "Your startup is garbage and you should quit...", reason: "Harassment / Hate speech", status: "resolved", severity: "medium", created_at: "2026-05-22T10:00:00Z", resolved_at: "2026-05-22T14:00:00Z", resolved_by: "Admin SA" },
  { id: "r4", reporter_name: "Yuki Tanaka", reporter_email: "yuki@email.com", target_type: "club", target_id: "cl77", target_preview: "Club: Crypto Pump Group", reason: "Promoting illegal activities", status: "pending", severity: "high", created_at: "2026-05-24T06:00:00Z" },
  { id: "r5", reporter_name: "Ben Carter", reporter_email: "ben@email.com", target_type: "post", target_id: "p789", target_preview: "Buy my course for $999 to learn...", reason: "Spam", status: "dismissed", severity: "low", created_at: "2026-05-21T12:00:00Z", resolved_at: "2026-05-21T16:00:00Z", resolved_by: "Admin SA" },
  { id: "r6", reporter_name: "Fatima Al-Hassan", reporter_email: "fatima@email.com", target_type: "group", target_id: "g33", target_preview: "Group: Fake Investor Network", reason: "Fraud / Scam", status: "reviewing", severity: "high", created_at: "2026-05-23T09:00:00Z" },
];

// ─── Clubs ────────────────────────────────────────────────────────────────────
export const mockClubs: Club[] = [
  { id: "cl1", name: "AI Founders Circle", description: "Community for AI-first startup founders", category: "Technology", member_count: 1247, post_count: 3891, status: "active", created_at: "2024-02-01", owner_name: "Sarah Chen", engagement_rate: 82.4 },
  { id: "cl2", name: "Deep Tech Investors", description: "Connecting deep tech investors globally", category: "Investment", member_count: 892, post_count: 2104, status: "active", created_at: "2024-01-15", owner_name: "Marcus Rivera", engagement_rate: 74.1 },
  { id: "cl3", name: "Green Manufacturing Hub", description: "Sustainable manufacturing practices", category: "Manufacturing", member_count: 634, post_count: 1567, status: "active", created_at: "2024-03-10", owner_name: "James Okafor", engagement_rate: 68.9 },
  { id: "cl4", name: "FinTech Disruptors", description: "Financial technology innovation community", category: "Finance", member_count: 2103, post_count: 5892, status: "active", created_at: "2023-11-20", owner_name: "Elena Volkov", engagement_rate: 91.2 },
  { id: "cl5", name: "Crypto Pump Group", description: "Suspicious investment signals", category: "Finance", member_count: 234, post_count: 891, status: "suspended", created_at: "2026-04-01", owner_name: "Unknown User", engagement_rate: 12.3 },
  { id: "cl6", name: "HealthTech Pioneers", description: "Healthcare technology innovation", category: "Health", member_count: 1089, post_count: 2341, status: "active", created_at: "2024-02-28", owner_name: "Priya Sharma", engagement_rate: 77.8 },
];

// ─── Groups ───────────────────────────────────────────────────────────────────
export const mockGroups: Group[] = [
  { id: "g1", name: "Series A Founders 2024", description: "Private group for Series A founders", member_count: 89, post_count: 456, status: "active", created_at: "2024-03-01", owner_name: "Sarah Chen", is_private: true },
  { id: "g2", name: "Bay Area Startup Network", description: "Bay Area startup community", member_count: 1203, post_count: 3421, status: "active", created_at: "2023-12-01", owner_name: "Marcus Rivera", is_private: false },
  { id: "g3", name: "Fake Investor Network", description: "Suspicious group flagged for review", member_count: 45, post_count: 123, status: "flagged", created_at: "2026-04-15", owner_name: "Unknown", is_private: false },
  { id: "g4", name: "Manufacturing Excellence", description: "Best practices in manufacturing", member_count: 567, post_count: 1234, status: "active", created_at: "2024-01-20", owner_name: "James Okafor", is_private: false },
  { id: "g5", name: "VC Deal Flow 2026", description: "Exclusive deal flow sharing", member_count: 234, post_count: 789, status: "active", created_at: "2026-01-01", owner_name: "Elena Volkov", is_private: true },
];

// ─── Badges ───────────────────────────────────────────────────────────────────
export const mockBadges: Badge[] = [
  { id: "b1", name: "Verified Founder", description: "Identity and company verified", category: "role", icon: "ShieldCheck", color: "#7C3AED", awarded_count: 3847, created_at: "2023-01-01", is_active: true },
  { id: "b2", name: "Top Contributor", description: "Consistently high-quality contributions", category: "achievement", icon: "Star", color: "#F59E0B", awarded_count: 892, created_at: "2023-06-01", is_active: true },
  { id: "b3", name: "Deal Maker", description: "Successfully closed 3+ deals on platform", category: "achievement", icon: "Handshake", color: "#10B981", awarded_count: 234, created_at: "2024-01-01", is_active: true },
  { id: "b4", name: "Community Champion", description: "Active community builder", category: "community", icon: "Users", color: "#3B82F6", awarded_count: 567, created_at: "2023-09-01", is_active: true },
  { id: "b5", name: "Early Adopter", description: "Joined in the first 6 months", category: "special", icon: "Rocket", color: "#EC4899", awarded_count: 1204, created_at: "2023-01-01", is_active: true },
  { id: "b6", name: "Mentor", description: "Actively mentoring 5+ founders", category: "community", icon: "GraduationCap", color: "#06B6D4", awarded_count: 189, created_at: "2024-03-01", is_active: true },
];

// ─── Support Tickets ──────────────────────────────────────────────────────────
export const mockTickets: SupportTicket[] = [
  { id: "t1", ticket_number: "VL-2026-0891", subject: "Unable to complete verification process", description: "I've submitted all documents but the status hasn't changed in 5 days.", user_name: "Kai Nakamura", user_email: "kai@synapse.io", status: "open", priority: "high", category: "Verification", created_at: "2026-05-20T10:00:00Z", updated_at: "2026-05-20T10:00:00Z" },
  { id: "t2", ticket_number: "VL-2026-0890", subject: "Meeting was cancelled without notice", description: "My scheduled meeting with Apex Capital was cancelled 10 minutes before.", user_name: "Priya Sharma", user_email: "priya@quantumleap.ai", status: "in_progress", priority: "medium", category: "Meetings", created_at: "2026-05-19T14:00:00Z", updated_at: "2026-05-20T09:00:00Z", assigned_to: "Support Agent 1" },
  { id: "t3", ticket_number: "VL-2026-0889", subject: "Profile data not saving correctly", description: "When I update my company description, it reverts after refresh.", user_name: "Amara Diallo", user_email: "amara@solaris.energy", status: "resolved", priority: "medium", category: "Technical", created_at: "2026-05-18T11:00:00Z", updated_at: "2026-05-19T15:00:00Z", assigned_to: "Tech Support", resolved_at: "2026-05-19T15:00:00Z" },
  { id: "t4", ticket_number: "VL-2026-0888", subject: "Billing discrepancy on premium plan", description: "I was charged twice for the same month.", user_name: "David Kim", user_email: "david@nexgen.kr", status: "open", priority: "critical", category: "Billing", created_at: "2026-05-24T07:00:00Z", updated_at: "2026-05-24T07:00:00Z" },
  { id: "t5", ticket_number: "VL-2026-0887", subject: "Cannot access club management features", description: "The edit button for my club is greyed out.", user_name: "Sofia Mendez", user_email: "sofia@latamvc.com", status: "in_progress", priority: "low", category: "Technical", created_at: "2026-05-17T16:00:00Z", updated_at: "2026-05-18T10:00:00Z", assigned_to: "Tech Support" },
];

// ─── Meetings ─────────────────────────────────────────────────────────────────
export const mockMeetings: Meeting[] = [
  { id: "m1", title: "Intro Call: NovaTech × Apex Capital", startup_name: "NovaTech Labs", investor_name: "Apex Capital", scheduled_at: "2026-05-25T14:00:00Z", duration_minutes: 30, status: "scheduled", meeting_type: "intro" },
  { id: "m2", title: "Pitch: QuantumLeap AI × DeepWave Ventures", startup_name: "QuantumLeap AI", investor_name: "DeepWave Ventures", scheduled_at: "2026-05-24T10:00:00Z", duration_minutes: 60, status: "completed", meeting_type: "pitch" },
  { id: "m3", title: "Follow-up: Solaris Energy × LatAm Ventures", startup_name: "Solaris Energy", investor_name: "LatAm Ventures", scheduled_at: "2026-05-23T15:00:00Z", duration_minutes: 45, status: "completed", meeting_type: "follow_up" },
  { id: "m4", title: "Due Diligence: CloudNine Tech × Bridgepoint", startup_name: "CloudNine Tech", investor_name: "Bridgepoint Fund", scheduled_at: "2026-05-22T11:00:00Z", duration_minutes: 90, status: "cancelled", meeting_type: "due_diligence", notes: "Investor cancelled" },
  { id: "m5", title: "Intro Call: Synapse IO × Apex Capital", startup_name: "Synapse IO", investor_name: "Apex Capital", scheduled_at: "2026-05-26T09:00:00Z", duration_minutes: 30, status: "scheduled", meeting_type: "intro" },
  { id: "m6", title: "Pitch: NexGen Korea × DeepWave Ventures", startup_name: "NexGen Korea", investor_name: "DeepWave Ventures", scheduled_at: "2026-05-21T13:00:00Z", duration_minutes: 60, status: "no_show", meeting_type: "pitch", notes: "Startup did not join" },
];

// ─── Audit Logs ───────────────────────────────────────────────────────────────
export const mockAuditLogs: AuditLog[] = [
  { id: "al1", action: "user.verified", admin_name: "Super Admin", admin_email: "admin@vl.io", target_type: "user", target_id: "u1", target_name: "Sarah Chen", ip_address: "192.168.1.100", user_agent: "Chrome/124 Mac", timestamp: "2026-05-24T09:15:00Z" },
  { id: "al2", action: "report.resolved", admin_name: "Super Admin", admin_email: "admin@vl.io", target_type: "report", target_id: "r3", target_name: "Harassment Report #r3", ip_address: "192.168.1.100", user_agent: "Chrome/124 Mac", timestamp: "2026-05-22T14:00:00Z" },
  { id: "al3", action: "user.suspended", admin_name: "Super Admin", admin_email: "admin@vl.io", target_type: "user", target_id: "u8", target_name: "Tom Whitfield", ip_address: "192.168.1.100", user_agent: "Chrome/124 Mac", timestamp: "2026-03-10T11:00:00Z", metadata: { reason: "Fraudulent activity" } },
  { id: "al4", action: "content.deleted", admin_name: "Super Admin", admin_email: "admin@vl.io", target_type: "post", target_id: "p123", target_name: "Spam Post #p123", ip_address: "192.168.1.100", user_agent: "Chrome/124 Mac", timestamp: "2026-05-24T08:30:00Z" },
  { id: "al5", action: "badge.awarded", admin_name: "Super Admin", admin_email: "admin@vl.io", target_type: "user", target_id: "u2", target_name: "Marcus Rivera", ip_address: "192.168.1.100", user_agent: "Chrome/124 Mac", timestamp: "2026-05-23T16:00:00Z", metadata: { badge: "Top Contributor" } },
  { id: "al6", action: "club.created", admin_name: "System", admin_email: "system@vl.io", target_type: "club", target_id: "cl1", target_name: "AI Founders Circle", ip_address: "10.0.0.1", user_agent: "System/Auto", timestamp: "2024-02-01T10:00:00Z" },
  { id: "al7", action: "settings.changed", admin_name: "Super Admin", admin_email: "admin@vl.io", target_type: "settings", target_id: "sys", target_name: "Platform Settings", ip_address: "192.168.1.100", user_agent: "Chrome/124 Mac", timestamp: "2026-05-20T13:00:00Z", metadata: { changed: "verification_auto_approve" } },
  { id: "al8", action: "login.failed", admin_name: "Unknown", admin_email: "hacker@evil.com", target_type: "auth", target_id: "auth", target_name: "Admin Login", ip_address: "45.33.32.156", user_agent: "Python/3.11 requests", timestamp: "2026-05-24T03:22:00Z" },
];

// ─── Security Events ──────────────────────────────────────────────────────────
export const mockSecurityEvents: SecurityEvent[] = [
  { id: "se1", type: "failed_login", severity: "high", description: "15 failed login attempts from same IP in 5 minutes", ip_address: "45.33.32.156", user_email: "admin@vl.io", timestamp: "2026-05-24T03:22:00Z", resolved: false },
  { id: "se2", type: "suspicious_activity", severity: "medium", description: "Unusual data export pattern detected", ip_address: "192.168.1.200", user_email: "tom.w@bridgepoint.fund", timestamp: "2026-05-23T22:00:00Z", resolved: true },
  { id: "se3", type: "blocked_ip", severity: "low", description: "IP blocked due to rate limit violations", ip_address: "103.21.244.0", timestamp: "2026-05-23T18:00:00Z", resolved: true },
  { id: "se4", type: "session_anomaly", severity: "medium", description: "Session accessed from 2 different countries within 1 hour", ip_address: "8.8.8.8", user_email: "kai@synapse.io", timestamp: "2026-05-22T14:00:00Z", resolved: false },
  { id: "se5", type: "rate_limit", severity: "low", description: "API rate limit exceeded on /api/users endpoint", ip_address: "172.16.0.1", timestamp: "2026-05-22T10:00:00Z", resolved: true },
];

// ─── Analytics ────────────────────────────────────────────────────────────────
export const analyticsData: AnalyticsDataPoint[] = [
  { date: "Jan", users: 28000, startups: 2100, investors: 780, meetings: 180, reports: 34, tickets: 89 },
  { date: "Feb", users: 31000, startups: 2400, investors: 890, meetings: 210, reports: 28, tickets: 76 },
  { date: "Mar", users: 35000, startups: 2800, investors: 980, meetings: 245, reports: 41, tickets: 102 },
  { date: "Apr", users: 39000, startups: 3100, investors: 1050, meetings: 289, reports: 37, tickets: 94 },
  { date: "May", users: 44000, startups: 3500, investors: 1150, meetings: 320, reports: 47, tickets: 128 },
  { date: "Jun", users: 48291, startups: 3847, investors: 1204, meetings: 342, reports: 47, tickets: 128 },
];

export const moderationAnalytics = [
  { month: "Jan", resolved: 89, pending: 12, dismissed: 23 },
  { month: "Feb", resolved: 102, pending: 8, dismissed: 19 },
  { month: "Mar", resolved: 134, pending: 15, dismissed: 31 },
  { month: "Apr", resolved: 118, pending: 22, dismissed: 27 },
  { month: "May", resolved: 156, pending: 34, dismissed: 42 },
  { month: "Jun", resolved: 1284, pending: 47, dismissed: 89 },
];
