"use client";
import { useState } from "react";
import {
  CheckCircle, AlertTriangle, XCircle, ZoomIn, ZoomOut,
  RotateCw, FileText, Sparkles, Upload, ScanLine,
  Brain, ShieldCheck, ArrowRight,
} from "lucide-react";

const headerFields = [
  { label: "Vendor Name",    value: "Sharma Distributors Ltd.", status: "success" },
  { label: "Invoice Amount", value: "₹12,400", note: "vs ₹12,800 on PO",      status: "warning" },
  { label: "Invoice Date",   value: "12 Jan 2025",                              status: "success" },
  { label: "GST Number",     value: "29AABCS1429B1Z5", note: "Not in GSTIN DB", status: "danger"  },
  { label: "PO Reference",   value: "PO-2024-00347",                            status: "success" },
  { label: "Payment Terms",  value: "Net 30 Days",                              status: "success" },
];

const lineItems = [
  { desc: "Basmati Rice 25kg x 10", qty: 10, rate: "₹840",  amount: "₹8,400", status: "success" },
  { desc: "Sunflower Oil 15L x 3",  qty:  3, rate: "₹920",  amount: "₹2,760", status: "warning" },
  { desc: "Turmeric 1kg x 12",      qty: 12, rate: "₹104",  amount: "₹1,248", status: "success" },
];

const timeline = [
  { label: "Uploaded",      icon: Upload,      done: true,  current: false },
  { label: "OCR Scan",      icon: ScanLine,    done: true,  current: false },
  { label: "AI Extraction", icon: Brain,       done: true,  current: false },
  { label: "Validation",    icon: ShieldCheck, done: false, current: true  },
  { label: "Approved",      icon: CheckCircle, done: false, current: false },
];

const sBadge = (s: string) => {
  if (s === "success") return "bg-[#0F8F83]/10 text-[#0F8F83]";
  if (s === "warning") return "bg-[#D97706]/10 text-[#D97706]";
  if (s === "danger")  return "bg-[#DC2626]/10 text-[#DC2626]";
  return "bg-[#9CA3AF]/15 text-[#9CA3AF]";
};
const sText = (s: string) =>
  ({ success: "Verified", warning: "Mismatch", danger: "Error" }[s] ?? "—");
const sIcon = (s: string) => {
  if (s === "success") return <CheckCircle className="w-3.5 h-3.5 text-[#0F8F83]" />;
  if (s === "warning") return <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />;
  if (s === "danger")  return <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />;
  return null;
};

export default function InvoicePage() {
  const [activeTab, setActiveTab] = useState<"header"|"lineitems">("header");
  const [zoom, setZoom] = useState(100);

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            Invoice Intelligence
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            AI-powered invoice scanning, extraction and fraud detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors hover:opacity-80"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--heading)" }}>
            Upload Invoice
          </button>
          <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
            Batch Process
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Invoices",   value: "1,240", badge: "All Time",           bc: "bg-[#9CA3AF]/15 text-[#9CA3AF]" },
          { label: "Processed Today",  value: "34",    badge: "+6 from yesterday",   bc: "bg-[#0F8F83]/10 text-[#0F8F83]" },
          { label: "Pending Review",   value: "7",     badge: "Needs Attention",     bc: "bg-[#D97706]/10 text-[#D97706]" },
          { label: "Flagged",          value: "3",     badge: "Action Required",     bc: "bg-[#DC2626]/10 text-[#DC2626]" },
        ].map((s, i) => (
          <div key={i} className={`${card} p-5`} style={{ background: "var(--surface)" }}>
            <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>{s.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "var(--heading)" }}>{s.value}</p>
            <span className={`mt-2 inline-block rounded-full text-[11px] px-2.5 py-0.5 font-medium ${s.bc}`}>
              {s.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Preview + Analysis */}
      <div className="grid grid-cols-5 gap-5">

        {/* Document Preview */}
        <div className={`col-span-3 ${card} flex flex-col overflow-hidden`}
          style={{ background: "var(--surface)" }}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: "var(--body)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--heading)" }}>
                INV-2024-089.pdf
              </span>
              <span className="text-[11px] font-medium bg-[#D97706]/10 text-[#D97706] rounded-full px-2 py-0.5">
                Pending Validation
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[
                { icon: ZoomOut, action: () => setZoom(z => Math.max(50, z - 10)) },
                { icon: ZoomIn,  action: () => setZoom(z => Math.min(200, z + 10)) },
                { icon: RotateCw, action: () => {} },
              ].map(({ icon: Icon, action }, i) => (
                <button key={i} onClick={action}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                  style={{ background: "var(--surface-2)" }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: "var(--body)" }} />
                </button>
              ))}
              <span className="text-xs px-2 min-w-[3.5rem] text-center" style={{ color: "var(--muted)" }}>
                {zoom}%
              </span>
            </div>
          </div>

          {/* Mock Invoice */}
          <div className="flex-1 overflow-auto p-6" style={{ background: "var(--surface-2)" }}>
            <div className="rounded-xl border border-[var(--border)] p-6 mx-auto shadow-sm relative"
              style={{
                background: "var(--surface)",
                transform: `scale(${zoom/100})`,
                transformOrigin: "top center",
                maxWidth: 520,
              }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: "var(--primary)" }}>
                    <FileText className="w-5 h-5" style={{ color: "var(--primary-fg)" }} />
                  </div>
                  <p className="font-bold" style={{ color: "var(--heading)" }}>Sharma Distributors Ltd.</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>123 Market Road, Mumbai 400001</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>GSTIN: 29AABCS1429B1Z5</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold" style={{ color: "var(--heading)" }}>INVOICE</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>INV-2024-089</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Date: 12 Jan 2025</p>
                </div>
              </div>

              <div className="mb-5 rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "var(--neutral)" }}>Bill To</p>
                <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>Rajesh Trading Co.</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>PO Reference: PO-2024-00347</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>Payment Terms: Net 30 Days</p>
              </div>

              <table className="w-full mb-5 text-sm">
                <thead>
                  <tr className="border-b-2 border-[var(--border)]">
                    {["Description","Qty","Rate","Amount"].map(h => (
                      <th key={h} className={`text-[11px] font-semibold uppercase pb-2 ${h === "Description" ? "text-left" : "text-right"}`}
                        style={{ color: "var(--neutral)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)]">
                      <td className="py-2 text-xs" style={{ color: "var(--body)" }}>{item.desc}</td>
                      <td className="py-2 text-xs text-right" style={{ color: "var(--body)" }}>{item.qty}</td>
                      <td className="py-2 text-xs text-right" style={{ color: "var(--body)" }}>{item.rate}</td>
                      <td className={`py-2 text-xs text-right font-medium ${item.status === "warning" ? "text-[#D97706]" : ""}`}
                        style={item.status !== "warning" ? { color: "var(--heading)" } : {}}>
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col gap-1 items-end">
                {[["Subtotal","₹12,408"],["GST (18%)","₹2,233"]].map(([l,v]) => (
                  <div key={l} className="flex justify-between w-48 text-xs" style={{ color: "var(--muted)" }}>
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between w-48 text-sm font-bold pt-1 mt-1 border-t border-[var(--border)]"
                  style={{ color: "var(--heading)" }}>
                  <span>Total</span>
                  <span className="flex items-center gap-1">
                    ₹12,400
                    <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                  </span>
                </div>
              </div>

              <div className="mt-4 p-2.5 rounded-xl flex items-start gap-2
                bg-[#DC2626]/5 border border-[#DC2626]/20">
                <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-[#DC2626]">GST Number Unverifiable</p>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                    29AABCS1429B1Z5 not found in GSTIN database
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-2 flex flex-col gap-5">

          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Duplicate Score", value: "4%",        status: "success", note: "Low risk"   },
              { label: "Fraud Score",     value: "32%",       status: "warning", note: "Medium risk" },
              { label: "GST Status",      value: "Unverified", status: "danger",  note: "Check needed"},
            ].map((sc, i) => (
              <div key={i} className={`${card} p-4 text-center`} style={{ background: "var(--surface)" }}>
                <p className="text-[11px] font-medium leading-tight mb-2" style={{ color: "var(--muted)" }}>
                  {sc.label}
                </p>
                <p className={`text-lg font-bold ${
                  sc.status === "success" ? "text-[#0F8F83]"
                  : sc.status === "warning" ? "text-[#D97706]"
                  : "text-[#DC2626]"
                }`}>{sc.value}</p>
                <span className={`mt-1.5 inline-block rounded-full text-[10px] px-2 py-0.5 font-medium ${sBadge(sc.status)}`}>
                  {sc.note}
                </span>
              </div>
            ))}
          </div>

          {/* AI Extracted Fields */}
          <div className={`${card} overflow-hidden flex flex-col flex-1`}
            style={{ background: "var(--surface)" }}>
            <div className="px-5 pt-5 pb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" style={{ color: "var(--heading)" }} />
                  <span className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
                    AI Extracted Fields
                  </span>
                </div>
                <span className="text-[11px] font-medium bg-[#0F8F83]/10 text-[#0F8F83] rounded-full px-2.5 py-0.5">
                  98.2% confidence
                </span>
              </div>
              {/* Tabs */}
              <div className="flex gap-1 border-b border-[var(--border)]">
                {(["header","lineitems"] as const).map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`pb-2.5 px-1 text-xs font-medium transition-colors border-b-2 -mb-px`}
                    style={{
                      borderBottomColor: activeTab === t ? "var(--primary)" : "transparent",
                      color: activeTab === t ? "var(--heading)" : "var(--muted)",
                    }}>
                    {t === "header" ? "Header Fields" : "Line Items"}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-4 flex flex-col gap-2.5 flex-1 overflow-y-auto">
              {activeTab === "header" ? (
                headerFields.map((f, i) => (
                  <div key={i} className="flex items-start justify-between gap-3">
                    <span className="text-xs pt-0.5 shrink-0" style={{ color: "var(--muted)" }}>{f.label}</span>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        {sIcon(f.status)}
                        <span className={`text-xs font-medium ${
                          f.status === "danger"  ? "text-[#DC2626]"
                          : f.status === "warning" ? "text-[#D97706]"
                          : ""
                        }`} style={f.status === "success" ? { color: "var(--heading)" } : {}}>
                          {f.value}
                        </span>
                        <span className={`rounded-full text-[10px] px-1.5 py-0.5 font-medium ${sBadge(f.status)}`}>
                          {sText(f.status)}
                        </span>
                      </div>
                      {f.note && (
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--neutral)" }}>{f.note}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      {["Item","Qty","Rate","Total","Status"].map((h,i) => (
                        <th key={h} className={`text-[10px] font-semibold uppercase pb-2 ${i > 0 ? "text-right" : "text-left"}`}
                          style={{ color: "var(--neutral)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, i) => (
                      <tr key={i} className="border-b border-[var(--border)]">
                        <td className="py-2 text-[11px] max-w-[110px] truncate" style={{ color: "var(--body)" }}>
                          {item.desc}
                        </td>
                        <td className="py-2 text-right" style={{ color: "var(--body)" }}>{item.qty}</td>
                        <td className="py-2 text-right" style={{ color: "var(--body)" }}>{item.rate}</td>
                        <td className="py-2 text-right font-medium" style={{ color: "var(--heading)" }}>
                          {item.amount}
                        </td>
                        <td className="py-2 text-right">
                          <span className={`rounded-full text-[10px] px-1.5 py-0.5 font-medium ${sBadge(item.status)}`}>
                            {sText(item.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* AI Suggestion */}
            <div className="mx-5 mb-5 rounded-xl p-3.5 flex items-start gap-3
              bg-[#D97706]/5 border border-[#D97706]/20">
              <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#D97706]">AI Suggestion</p>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                  Amount mismatch of ₹400 detected between invoice total and PO value.
                  Verify with supplier before approving.
                </p>
                <button className="mt-2 text-[11px] font-medium text-[#D97706] flex items-center gap-1 hover:opacity-75 transition-opacity">
                  Contact Supplier <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Timeline */}
      <div className={`${card} p-6`} style={{ background: "var(--surface)" }}>
        <h2 className="font-semibold text-sm mb-6" style={{ color: "var(--heading)" }}>Processing Timeline</h2>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-5 h-0.5 z-0" style={{ background: "var(--border)" }} />
          {timeline.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-2 z-10 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors`}
                style={{
                  background: step.done ? "#0F8F83"
                    : step.current ? "rgba(217,119,6,.10)"
                    : "var(--surface)",
                  borderColor: step.done ? "#0F8F83"
                    : step.current ? "#D97706"
                    : "var(--border)",
                }}>
                <step.icon className="w-4 h-4"
                  style={{ color: step.done ? "#fff" : step.current ? "#D97706" : "var(--neutral)" }} />
              </div>
              <span className="text-[11px] font-medium"
                style={{ color: step.done ? "#0F8F83" : step.current ? "#D97706" : "var(--neutral)" }}>
                {step.label}
              </span>
              {step.current && (
                <span className="text-[10px] text-[#D97706] bg-[#D97706]/10 rounded-full px-2 py-0.5">
                  In Progress
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
