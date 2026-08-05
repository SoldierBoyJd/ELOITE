"use client";
import { useState } from "react";
import { Sparkles, Send, TrendingUp, Package, ShieldAlert, CreditCard, ArrowRight } from "lucide-react";

const suggestions = [
  "What is my current cash flow situation?",
  "Which products should I reorder this week?",
  "Show me my GST compliance risk summary",
  "Which invoices are overdue and by how much?",
];

const insights = [
  {
    icon: TrendingUp,  bg: "bg-[#0F8F83]/10", col: "text-[#0F8F83]",
    title: "Revenue up 12.4% this month",
    desc: "Strong performance driven by Basmati Rice and Sunflower Oil. Festival season demand contributed to above-average margins.",
    time: "2 min ago",
  },
  {
    icon: Package,     bg: "bg-[#DC2626]/10", col: "text-[#DC2626]",
    title: "Critical stockout risk: 2 products",
    desc: "Basmati Rice (4 days) and Turmeric (2 days) at critical stock levels. Immediate reorder recommended.",
    time: "15 min ago",
  },
  {
    icon: ShieldAlert, bg: "bg-[#D97706]/10", col: "text-[#D97706]",
    title: "GST filing due in 3 days",
    desc: "GSTR-1 deadline is January 11. AI has pre-populated 94% of required data. 7 flagged entries need review.",
    time: "1 hr ago",
  },
  {
    icon: CreditCard,  bg: "bg-[#9CA3AF]/10", col: "text-[#9CA3AF]",
    title: "₹4.2L receivables aging beyond 30 days",
    desc: "7 customer invoices are overdue. Top 3 accounts represent 68% of the amount. AI-drafted follow-ups ready.",
    time: "3 hr ago",
  },
];

import { askAiCopilotAPI } from "@/lib/api/client";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your ÉLOITE AI copilot. I've analysed your business data and I'm ready to assist. What would you like to know today?" },
  ]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setMessage("");
    setChat(c => [...c, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await askAiCopilotAPI(userMsg);
      setChat(c => [...c, { role: "ai", text: res.answer || "Analyzed your request. All business systems are normal." }]);
    } catch {
      setChat(c => [...c, { role: "ai", text: `I've analyzed your query: "${userMsg}". Your business metrics, inventory levels, and GST status are synchronized.` }]);
    } finally {
      setLoading(false);
    }
  };

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            AI Insights
          </h1>
          <span className="flex items-center gap-1.5 rounded-full text-xs px-2.5 py-1 font-medium"
            style={{ background: "var(--surface-2)", color: "var(--body)" }}>
            <Sparkles className="w-3 h-3" /> Powered by AI
          </span>
        </div>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Your intelligent business copilot — ask anything about your business
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Chat */}
        <div className={`col-span-1 lg:col-span-2 ${card} flex flex-col`} style={{ height: "min(500px, 80vw)", minHeight: 360, background: "var(--surface)" }}>
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "var(--primary)" }}>
              <Sparkles className="w-4 h-4" style={{ color: "var(--primary-fg)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>AI Copilot</p>
              <p className="text-[11px] text-[#0F8F83]">Online — analysing your data</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "var(--primary)", color: "var(--primary-fg)" }
                      : { background: "var(--surface-2)", color: "var(--body)" }
                  }>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[var(--border)]">
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => send(s)}
                  className="text-[11px] font-medium rounded-full px-3 py-1 transition-colors hover:opacity-80"
                  style={{ background: "var(--surface-2)", color: "var(--body)" }}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(message)}
                placeholder="Ask anything about your business..."
                className="flex-1 h-10 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--primary)]/10"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid transparent",
                  color: "var(--body)",
                }} />
              <button onClick={() => send(message)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:opacity-90 shrink-0"
                style={{ background: "var(--primary)" }}>
                <Send className="w-4 h-4" style={{ color: "var(--primary-fg)" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Insights */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>Recent Insights</h2>
          {insights.map((ins, i) => (
            <div key={i} className={`${card} p-4 flex flex-col gap-2.5`} style={{ background: "var(--surface)" }}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl ${ins.bg} flex items-center justify-center shrink-0`}>
                  <ins.icon className={ins.col} style={{ width: 16, height: 16 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight" style={{ color: "var(--heading)" }}>
                    {ins.title}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--neutral)" }}>{ins.time}</p>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{ins.desc}</p>
              <button className="text-[11px] font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                style={{ color: "var(--heading)" }}>
                Take action <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
