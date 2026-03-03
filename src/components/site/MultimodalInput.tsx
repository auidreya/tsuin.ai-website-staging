import { useState } from "react";
import { Mic, MessageSquare, Hash, Video, Monitor } from "lucide-react";
import { Shibasuke } from "@/components/site/Shibasuke";

const inputModes = [
  {
    id: "voice",
    icon: Mic,
    label: "Voice",
    desc: "Speak to your Twin hands-free while you code.",
    example: "\"Why did we choose Postgres over Mongo for this service?\"",
    response: "Based on the decision captured Mar 2024: Postgres was chosen for ACID compliance on payment records. Mongo was prototyped but rejected — Kai noted that eventual consistency was too risky for billing. See PR #189 and the RFC in Notion.",
  },
  {
    id: "chat",
    icon: MessageSquare,
    label: "Chat",
    desc: "Type a question like you're messaging a teammate.",
    example: "What broke last time someone touched this file?",
    response: "Two incidents: Nov 2024 — a race condition in the retry logic (fixed in PR #247). Feb 2025 — env var missing in prod deploy, caused 12-min downtime. Both are logged with root cause and fix. Want the diffs?",
  },
  {
    id: "messages",
    icon: Hash,
    label: "Messages",
    desc: "Connect Slack, Discord, or any messaging app.",
    example: "@tsuin what's the status of the auth refactor?",
    response: "The auth refactor (Epic #44) is 60% complete. Last update from Priya on Jan 9: session token rotation is done, OAuth scopes are pending. 3 open PRs. No blockers flagged. ETA end of sprint.",
  },
  {
    id: "video",
    icon: Video,
    label: "Video",
    desc: "Record a loom or video note — Twin transcribes and indexes it.",
    example: "[Video] Kai walks through the payment flow architecture",
    response: "Transcribed and linked to files: src/payments/, src/billing/. Key decision captured: idempotency keys added after a double-charge incident in staging. Tagged as Architecture decision — searchable by the team.",
  },
  {
    id: "screen",
    icon: Monitor,
    label: "Screen",
    desc: "Share your screen — Twin captures context from what you're looking at.",
    example: "[Screen recording] Debugging the flaky test in CI",
    response: "Captured: test_auth_flow failing on line 84. Cross-referenced with similar failure from Aug 2024 — root cause was a timing issue with the mock server. Fix: increase timeout to 2000ms. Priya resolved it the same way.",
  },
];

export function MultimodalInput() {
  const [active, setActive] = useState("voice");
  const current = inputModes.find((m) => m.id === active)!;

  return (
    <section className="py-14 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="hidden sm:block absolute -top-4 left-0 md:left-8 opacity-80">
            <Shibasuke pose="cookie" size={120} />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            Multimodal by design
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Talk to your Twin however you think.
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your AI Twin isn't locked inside your IDE or terminal. It's a floating window on your screen — always open, never in the way. Speak, type, message, or record. It understands all of it.
          </p>
        </div>

        {/* Input mode tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {inputModes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Demo panel */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card overflow-hidden shadow-md">

          {/* Floating window title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400/70" />
              <div className="w-3 h-3 rounded-full bg-amber-400/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
            </div>
            <span className="text-xs text-muted-foreground ml-2 font-medium">Tsuin — AI Twin</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Mode label */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {(() => { const Icon = current.icon; return <Icon size={12} className="text-primary" />; })()}
              <span>{current.desc}</span>
            </div>

            {/* Input bubble */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/10 border border-primary/20 px-4 py-3">
                <p className="text-sm text-foreground leading-relaxed italic">
                  {current.example}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1.5 text-right">You</p>
              </div>
            </div>

            {/* Output bubble */}
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">T</div>
                  <span className="text-[10px] font-medium text-primary">AI Twin</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {current.response}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Learns actively when you engage it. Learns passively from commits, PRs, and messages in the background.
        </p>
      </div>
    </section>
  );
}
