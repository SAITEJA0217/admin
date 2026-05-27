"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Globe, Palette, Database, Save, AlertCircle } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import { useSettings, useSettingsMutation } from "@/hooks/queries/useSettings";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "general", label: "General", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "platform", label: "Platform", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "data", label: "Data & Privacy", icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const { data: settings, isLoading, isError } = useSettings();
  const mutation = useSettingsMutation();

  // Local state copy for edits
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    mutation.mutate({ section: activeSection, data: formData });
  };

  return (
    <PageShell
      title="Settings"
      subtitle="Platform configuration, security policies, and admin preferences"
      badge="System"
      actions={
        <button
          onClick={handleSave}
          disabled={isLoading || mutation.isPending}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 transition-all"
        >
          <Save className="h-3.5 w-3.5" />
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      }
    >
      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-left",
                    activeSection === section.id
                      ? "bg-purple-600/20 text-purple-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 space-y-6"
        >
          {isLoading ? (
            <div className="animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/[0.04]">
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-white/[0.04] rounded" />
                    <div className="h-3 w-48 bg-white/[0.03] rounded" />
                  </div>
                  <div className="h-8 w-24 bg-white/[0.04] rounded-lg" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center text-red-400 flex flex-col items-center gap-2">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm">Failed to retrieve platform operational settings.</p>
            </div>
          ) : (
            <>
              {activeSection === "general" && (
                <>
                  <SettingsSection title="Platform Information">
                    <SettingRow label="Platform Name" description="The name displayed across the platform">
                      <input
                        value={formData.platform_name ?? ""}
                        onChange={(e) => handleFieldChange("platform_name", e.target.value)}
                        className="settings-input"
                      />
                    </SettingRow>
                    <SettingRow label="Support Email" description="Email for platform support inquiries">
                      <input
                        value={formData.support_email ?? ""}
                        onChange={(e) => handleFieldChange("support_email", e.target.value)}
                        className="settings-input"
                      />
                    </SettingRow>
                    <SettingRow label="Platform Version" description="Current platform version">
                      <input
                        value={formData.platform_version ?? "2.4.1"}
                        disabled
                        className="settings-input opacity-50 cursor-not-allowed"
                      />
                    </SettingRow>
                  </SettingsSection>
                  <SettingsSection title="Registration">
                    <SettingRow label="Open Registration" description="Allow new users to register">
                      <Toggle
                        checked={!!formData.open_registration}
                        onChange={(val) => handleFieldChange("open_registration", val)}
                      />
                    </SettingRow>
                    <SettingRow label="Email Verification Required" description="Require email verification on signup">
                      <Toggle
                        checked={!!formData.email_verification_required}
                        onChange={(val) => handleFieldChange("email_verification_required", val)}
                      />
                    </SettingRow>
                    <SettingRow label="Invite Only Mode" description="Restrict registration to invited users only">
                      <Toggle
                        checked={!!formData.invite_only_mode}
                        onChange={(val) => handleFieldChange("invite_only_mode", val)}
                      />
                    </SettingRow>
                  </SettingsSection>
                </>
              )}

              {activeSection === "notifications" && (
                <SettingsSection title="Admin Notifications">
                  {[
                    { label: "New Verification Requests", key: "new_verification_requests", desc: "Notify when new profiles need verification" },
                    { label: "High Severity Reports", key: "high_severity_reports", desc: "Notify on high/critical content reports" },
                    { label: "Failed Login Attempts", key: "failed_login_attempts", desc: "Alert on suspicious login activity" },
                    { label: "New Support Tickets", key: "new_support_tickets", desc: "Notify on critical priority tickets" },
                    { label: "System Alerts", key: "system_alerts", desc: "Platform health and performance alerts" },
                  ].map(({ label, key, desc }) => (
                    <SettingRow key={label} label={label} description={desc}>
                      <Toggle
                        checked={!!formData[key]}
                        onChange={(val) => handleFieldChange(key, val)}
                      />
                    </SettingRow>
                  ))}
                </SettingsSection>
              )}

              {activeSection === "security" && (
                <>
                  <SettingsSection title="Authentication">
                    <SettingRow label="Two-Factor Authentication" description="Require 2FA for all admin accounts">
                      <Toggle
                        checked={!!formData.two_factor_required}
                        onChange={(val) => handleFieldChange("two_factor_required", val)}
                      />
                    </SettingRow>
                    <SettingRow label="Session Timeout (minutes)" description="Auto-logout after inactivity">
                      <input
                        value={formData.session_timeout_minutes ?? 60}
                        onChange={(e) => handleFieldChange("session_timeout_minutes", parseInt(e.target.value))}
                        type="number"
                        className="settings-input w-24"
                      />
                    </SettingRow>
                    <SettingRow label="Max Login Attempts" description="Lock account after failed attempts">
                      <input
                        value={formData.max_login_attempts ?? 5}
                        onChange={(e) => handleFieldChange("max_login_attempts", parseInt(e.target.value))}
                        type="number"
                        className="settings-input w-24"
                      />
                    </SettingRow>
                  </SettingsSection>
                  <SettingsSection title="IP Security">
                    <SettingRow label="IP Allowlist" description="Restrict admin access to specific IPs">
                      <Toggle
                        checked={!!formData.ip_allowlist_enabled}
                        onChange={(val) => handleFieldChange("ip_allowlist_enabled", val)}
                      />
                    </SettingRow>
                    <SettingRow label="Auto-block Suspicious IPs" description="Automatically block IPs with suspicious activity">
                      <Toggle
                        checked={!!formData.auto_block_suspicious_ips}
                        onChange={(val) => handleFieldChange("auto_block_suspicious_ips", val)}
                      />
                    </SettingRow>
                  </SettingsSection>
                </>
              )}

              {activeSection === "platform" && (
                <SettingsSection title="Platform Features">
                  {[
                    { label: "Verification System", key: "verification_system", desc: "Enable profile verification workflow" },
                    { label: "Meeting Scheduler", key: "meeting_scheduler", desc: "Allow investor-startup meetings" },
                    { label: "Community Clubs", key: "community_clubs", desc: "Enable club creation and management" },
                    { label: "Badge System", key: "badge_system", desc: "Enable achievement badges" },
                    { label: "AI Recommendations", key: "ai_recommendations", desc: "Enable AI-powered matching" },
                  ].map(({ label, key, desc }) => (
                    <SettingRow key={label} label={label} description={desc}>
                      <Toggle
                        checked={!!formData[key]}
                        onChange={(val) => handleFieldChange(key, val)}
                      />
                    </SettingRow>
                  ))}
                </SettingsSection>
              )}

              {activeSection === "appearance" && (
                <SettingsSection title="Theme">
                  <SettingRow label="Default Theme" description="Platform default color theme">
                    <select
                      value={formData.default_theme ?? "dark"}
                      onChange={(e) => handleFieldChange("default_theme", e.target.value)}
                      className="settings-input"
                    >
                      <option value="dark">Dark (Default)</option>
                      <option value="light">Light</option>
                      <option value="system">System</option>
                    </select>
                  </SettingRow>
                  <SettingRow label="Accent Color" description="Primary brand accent color">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-lg border border-white/[0.1]"
                        style={{ backgroundColor: formData.accent_color ?? "#7C3AED" }}
                      />
                      <input
                        value={formData.accent_color ?? "#7C3AED"}
                        onChange={(e) => handleFieldChange("accent_color", e.target.value)}
                        className="settings-input w-28"
                      />
                    </div>
                  </SettingRow>
                </SettingsSection>
              )}

              {activeSection === "data" && (
                <SettingsSection title="Data Retention">
                  <SettingRow label="Audit Log Retention (days)" description="How long to keep audit logs">
                    <input
                      value={formData.audit_log_retention_days ?? 365}
                      onChange={(e) => handleFieldChange("audit_log_retention_days", parseInt(e.target.value))}
                      type="number"
                      className="settings-input w-24"
                    />
                  </SettingRow>
                  <SettingRow label="Deleted User Data Retention" description="Days to retain data after account deletion">
                    <input
                      value={formData.deleted_user_data_retention_days ?? 30}
                      onChange={(e) => handleFieldChange("deleted_user_data_retention_days", parseInt(e.target.value))}
                      type="number"
                      className="settings-input w-24"
                    />
                  </SettingRow>
                  <SettingRow label="GDPR Compliance Mode" description="Enable strict GDPR data handling">
                    <Toggle
                      checked={!!formData.gdpr_compliance_mode}
                      onChange={(val) => handleFieldChange("gdpr_compliance_mode", val)}
                    />
                  </SettingRow>
                </SettingsSection>
              )}
            </>
          )}
        </motion.div>
      </div>

      <style jsx global>{`
        .settings-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 8px 12px;
          font-size: 13px;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.2s;
        }
        .settings-input:focus {
          border-color: rgba(124,58,237,0.5);
        }
      `}</style>
    </PageShell>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/[0.06]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
      </div>
      <div className="divide-y divide-white/[0.04]">{children}</div>
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 gap-4">
      <div>
        <p className="text-sm font-medium text-slate-200">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
        checked ? "bg-purple-600" : "bg-white/[0.1]"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-4.5" : "translate-x-0.5"
        )}
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
}
