import { useState } from "react";

const questions = [
  "Why is this API rate-limited to 100/min?",
  "Who understands the billing module best?",
  "What broke the last time this file was touched?",
  "What were the alternatives to microservices?",
];

const timelineItems = [
  { emoji: "🔀", title: "PR #247 merged", meta: "Mar 4, 2024" },
  { emoji: "💬", title: "Race condition identified", meta: "Slack #payments" },
  { emoji: "📝", title: "RFC: idempotent retry", meta: "Architecture decision" },
  { emoji: "✅", title: "Deployed to production", meta: "Mar 8, 2024" },
];

const onboardingStats = [
  { emoji: "🧭", label: "Key modules", value: "auth, payments, notifications" },
  { emoji: "⚠️", label: "Known footguns", value: "3 identified" },
  { emoji: "👥", label: "Go-to engineers", value: "Charles K., Priya M." },
  { emoji: "📌", label: "Critical decisions", value: "7 documented" },
];

export function FeatureShowcase() {
  const [activeQ, setActiveQ] = useState(0);

  return (
    <div className="dark">
      <section className="py-14 md:py-24 bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
                Features
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Instant Codebase Q&A
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                Ask questions in plain English. Get cited answers with source
                links — from decisions your team already made.
              </p>

              <div className="space-y-2 mb-10">
                {questions.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => setActiveQ(i)}
                    className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-colors cursor-pointer ${
                      i === activeQ
                        ? "bg-primary/10 border-primary/40 text-foreground"
                        : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Stat */}
              <div className="flex items-end gap-3">
                <span
                  className="text-5xl font-semibold text-primary leading-none"
                  style={{ fontFamily: "'Funnel Display', sans-serif" }}
                >
                  ~6
                </span>
                <div className="pb-1">
                  <div className="font-semibold text-sm text-foreground">hours</div>
                  <div className="text-xs text-muted-foreground">
                    Time Saved · Per developer per week in pilot
                  </div>
                </div>
              </div>
            </div>

            {/* Right — two stacked cards */}
            <div className="space-y-4">
              {/* Decision Trail */}
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-primary mb-1 font-medium">
                  Decision Trail
                </p>
                <p className="text-xs text-muted-foreground mb-5">
                  Every change carries its why. No more orphaned comments.
                </p>
                <div className="space-y-3">
                  {timelineItems.map((item) => (
                    <div key={item.title} className="flex items-center gap-3 text-sm">
                      <span className="w-6 shrink-0 text-base">{item.emoji}</span>
                      <span className="flex-1 text-foreground">{item.title}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {item.meta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Onboarding Mode */}
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-primary mb-1 font-medium">
                  Onboarding Mode
                </p>
                <p className="text-xs text-muted-foreground mb-5">
                  New hire? Tsuin generates a full codebase orientation in seconds.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {onboardingStats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg bg-muted/40 border border-border/50 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-xs text-muted-foreground">
                        <span>{s.emoji}</span>
                        <span>{s.label}</span>
                      </div>
                      <div className="text-xs font-medium text-foreground">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
