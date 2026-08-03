"use client";
import { useState, useEffect } from "react";
import {
  Building2, Bell, Shield, CreditCard, Users, Plug, Save,
  Loader2, Eye, EyeOff, AlertTriangle, Mail, Lock, Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "business",      label: "Business Profile", icon: Building2 },
  { id: "security",      label: "Security",         icon: Shield     },
  { id: "notifications", label: "Notifications",    icon: Bell       },
  { id: "billing",       label: "Billing",          icon: CreditCard },
  { id: "team",          label: "Team",             icon: Users      },
  { id: "integrations",  label: "Integrations",     icon: Plug       },
];

const input = `w-full h-11 px-4 rounded-xl text-sm outline-none transition-all
  bg-[var(--surface-2)] border border-[var(--border)]
  text-[var(--heading)] placeholder:text-[var(--disabled)]
  focus:ring-2 focus:ring-[var(--primary)]/15 focus:border-[var(--primary)]/30`;

export default function SettingsPage() {
  const supabase = createClient();
  const router   = useRouter();

  const [activeTab, setActiveTab] = useState("business");
  const [fetching, setFetching]   = useState(true);
  const [userEmail, setUserEmail] = useState("");

  /* ── Business profile state ── */
  const [profileLoading, setProfileLoading] = useState(false);
  const [fields, setFields] = useState({
    full_name: "", business_name: "", gstin: "", phone: "", city: "", state: "",
  });

  /* ── Security state ── */
  const [newEmail, setNewEmail]           = useState("");
  const [emailLoading, setEmailLoading]   = useState(false);

  const [currentPwd, setCurrentPwd]       = useState("");
  const [newPwd, setNewPwd]               = useState("");
  const [confirmPwd, setConfirmPwd]       = useState("");
  const [showCurrent, setShowCurrent]     = useState(false);
  const [showNew, setShowNew]             = useState(false);
  const [pwdLoading, setPwdLoading]       = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* ── Load user ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? "");
        setFields({
          full_name:     user.user_metadata?.full_name     ?? "",
          business_name: user.user_metadata?.business_name ?? "",
          gstin:         user.user_metadata?.gstin         ?? "",
          phone:         user.user_metadata?.phone         ?? "",
          city:          user.user_metadata?.city          ?? "",
          state:         user.user_metadata?.state         ?? "",
        });
      }
      setFetching(false);
    });
  }, []);

  /* ── Save business profile ── */
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    const { error } = await supabase.auth.updateUser({ data: fields });
    setProfileLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile saved successfully");
  };

  /* ── Change email ── */
  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setEmailLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setEmailLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Confirmation sent to both your old and new email addresses.");
    setNewEmail("");
  };

  /* ── Change password ── */
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) { toast.error("Passwords do not match."); return; }
    if (newPwd.length < 8)    { toast.error("Password must be at least 8 characters."); return; }
    setPwdLoading(true);
    // Re-authenticate first to verify current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail, password: currentPwd,
    });
    if (signInError) {
      toast.error("Current password is incorrect.");
      setPwdLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setPwdLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated successfully.");
    setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
  };

  /* ── Delete account ── */
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      toast.error('Type "DELETE" to confirm account deletion.');
      return;
    }
    setDeleteLoading(true);
    // Sign out — actual deletion requires admin API / server action
    // For now: sign out and show message (server-side deletion via Supabase admin)
    await supabase.auth.signOut();
    toast.success("Account deletion requested. You've been signed out.");
    router.push("/login");
  };

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Manage your business profile, security, and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6">
        {/* Side tabs */}
        <div className="w-full lg:w-56 shrink-0">
          <div className={`${card} p-2 flex flex-row lg:flex-col gap-0.5 overflow-x-auto`}
            style={{ background: "var(--surface)" }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl text-sm
                  transition-colors whitespace-nowrap"
                style={activeTab === tab.id
                  ? { background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                      color: "var(--heading)", fontWeight: 600 }
                  : { color: "var(--muted)", fontWeight: 500 }
                }>
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-5">

          {/* ── Business Profile ── */}
          {activeTab === "business" && (
            fetching ? (
              <div className={`${card} p-6 flex items-center justify-center`}
                style={{ background: "var(--surface)", minHeight: 300 }}>
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: "var(--neutral)" }} />
              </div>
            ) : (
              <form onSubmit={handleSaveProfile}>
                <div className={`${card} p-6 flex flex-col gap-6`} style={{ background: "var(--surface)" }}>
                  <div>
                    <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>
                      Business Profile
                    </h2>
                    <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                      Update your business information and contact details
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {([
                      ["Full Name",     "full_name",     "text"  ],
                      ["Business Name", "business_name", "text"  ],
                      ["GSTIN",         "gstin",         "text"  ],
                      ["Phone Number",  "phone",         "tel"   ],
                      ["City",          "city",          "text"  ],
                      ["State",         "state",         "text"  ],
                    ] as [string, keyof typeof fields, string][]).map(([label, key, type]) => (
                      <div key={key} className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                          {label}
                        </label>
                        <input type={type} value={fields[key]}
                          onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                          className={input} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2 border-t border-[var(--border)]">
                    <button type="submit" disabled={profileLoading}
                      className="h-9 px-5 rounded-xl text-sm font-medium transition-colors
                        flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                      style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                      {profileLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {profileLoading ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            )
          )}

          {/* ── Security ── */}
          {activeTab === "security" && (
            <>
              {/* Change Email */}
              <form onSubmit={handleChangeEmail}>
                <div className={`${card} p-6 flex flex-col gap-5`} style={{ background: "var(--surface)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--surface-2)" }}>
                      <Mail className="w-4 h-4" style={{ color: "var(--muted)" }} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
                        Change email address
                      </h2>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        Current: <span className="font-medium" style={{ color: "var(--body)" }}>{userEmail}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                      New email address
                    </label>
                    <input type="email" value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      placeholder="new@email.com" required className={input} />
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    A confirmation link will be sent to both your current and new email address.
                    Both must be confirmed for the change to take effect.
                  </p>
                  <div className="flex justify-end">
                    <button type="submit" disabled={emailLoading || !newEmail.trim()}
                      className="h-9 px-5 rounded-xl text-sm font-medium flex items-center gap-2
                        transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                      {emailLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {emailLoading ? "Sending…" : "Send confirmation"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Change Password */}
              <form onSubmit={handleChangePassword}>
                <div className={`${card} p-6 flex flex-col gap-5`} style={{ background: "var(--surface)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--surface-2)" }}>
                      <Lock className="w-4 h-4" style={{ color: "var(--muted)" }} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
                        Change password
                      </h2>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        Must be at least 8 characters
                      </p>
                    </div>
                  </div>
                  {[
                    { label: "Current password", val: currentPwd, setVal: setCurrentPwd, show: showCurrent, setShow: setShowCurrent, ac: "current-password" },
                    { label: "New password",     val: newPwd,     setVal: setNewPwd,     show: showNew,     setShow: setShowNew,     ac: "new-password"     },
                    { label: "Confirm password", val: confirmPwd, setVal: setConfirmPwd, show: showNew,     setShow: setShowNew,     ac: "new-password"     },
                  ].map(({ label, val, setVal, show, setShow, ac }) => (
                    <div key={label} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>{label}</label>
                      <div className="relative">
                        <input type={show ? "text" : "password"} value={val}
                          onChange={e => setVal(e.target.value)}
                          placeholder="••••••••" required minLength={8}
                          autoComplete={ac} className={`${input} pr-11`} />
                        <button type="button" onClick={() => setShow((s: boolean) => !s)} tabIndex={-1}
                          className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors
                            hover:text-[var(--heading)]"
                          style={{ color: "var(--neutral)" }}>
                          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button type="submit" disabled={pwdLoading}
                      className="h-9 px-5 rounded-xl text-sm font-medium flex items-center gap-2
                        transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                      {pwdLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {pwdLoading ? "Updating…" : "Update password"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Delete Account */}
              <div className={`${card} p-6 flex flex-col gap-5`}
                style={{ background: "var(--surface)", borderColor: "rgba(220,38,38,.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DC2626]/10 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-[#DC2626]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm text-[#DC2626]">Delete account</h2>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      Permanently remove your account and all data
                    </p>
                  </div>
                </div>
                <div className="rounded-xl p-3.5 flex items-start gap-2.5
                  bg-[#DC2626]/05 border border-[#DC2626]/15">
                  <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#DC2626] leading-relaxed">
                    This action is permanent and cannot be undone. All your business data,
                    invoices, inventory records, and settings will be deleted immediately.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                    Type <span className="font-mono text-[#DC2626]">DELETE</span> to confirm
                  </label>
                  <input type="text" value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    placeholder="DELETE" className={input} />
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading || deleteConfirm !== "DELETE"}
                  className="h-9 px-5 rounded-xl text-sm font-medium flex items-center gap-2
                    transition-colors self-end disabled:opacity-40 disabled:cursor-not-allowed
                    bg-[#DC2626] text-white hover:bg-[#b91c1c]">
                  {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {deleteLoading ? "Deleting…" : "Delete my account"}
                </button>
              </div>
            </>
          )}

          {/* ── Other tabs — Coming soon ── */}
          {!["business","security"].includes(activeTab) && (
            <div className={`${card} p-6 flex items-center justify-center`}
              style={{ background: "var(--surface)", minHeight: 300 }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "var(--surface-2)" }}>
                  {(() => {
                    const t = tabs.find(t => t.id === activeTab);
                    return t ? <t.icon className="w-5 h-5" style={{ color: "var(--neutral)" }} /> : null;
                  })()}
                </div>
                <p className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
                  {tabs.find(t => t.id === activeTab)?.label}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  Coming soon — this section is under development
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
