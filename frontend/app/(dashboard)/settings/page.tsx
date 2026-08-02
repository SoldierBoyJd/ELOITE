"use client";
import { useState } from "react";
import { Building2, Bell, Shield, CreditCard, Users, Plug, Save } from "lucide-react";

const tabs = [
  { id: "business",      label: "Business Profile", icon: Building2 },
  { id: "notifications", label: "Notifications",    icon: Bell      },
  { id: "security",      label: "Security",          icon: Shield    },
  { id: "billing",       label: "Billing",           icon: CreditCard},
  { id: "team",          label: "Team",              icon: Users     },
  { id: "integrations",  label: "Integrations",      icon: Plug      },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("business");
  const [fields, setFields] = useState({
    businessName: "Sharma Traders",
    gstin:        "27AABCS1429B1Z5",
    email:        "rajesh@sharmatraders.com",
    phone:        "+91 98765 43210",
    city:         "Mumbai",
    state:        "Maharashtra",
  });

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Manage your business profile, preferences, and integrations
        </p>
      </div>

      <div className="flex gap-6">
        {/* Side tabs */}
        <div className="w-56 shrink-0">
          <div className={`${card} p-2 flex flex-col gap-0.5`} style={{ background: "var(--surface)" }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
                style={
                  activeTab === tab.id
                    ? {
                        background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                        color: "var(--heading)",
                        fontWeight: 600,
                      }
                    : { color: "var(--muted)", fontWeight: 500 }
                }>
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "business" ? (
            <div className={`${card} p-6 flex flex-col gap-6`} style={{ background: "var(--surface)" }}>
              <div>
                <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Business Profile</h2>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  Update your business information and GST details
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Business Name", "businessName"],
                  ["GSTIN",         "gstin"       ],
                  ["Email Address", "email"       ],
                  ["Phone Number",  "phone"       ],
                  ["City",          "city"        ],
                  ["State",         "state"       ],
                ].map(([label, key]) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>{label}</label>
                    <input
                      value={fields[key as keyof typeof fields]}
                      onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                      className="h-10 px-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--primary)]/10"
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid transparent",
                        color: "var(--heading)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2 border-t border-[var(--border)]">
                <button className="h-9 px-5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-90"
                  style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          ) : (
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
