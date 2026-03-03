import { useState } from "react";
import { Check, Minus, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Solo",
    badge: "Early Access",
    desc: "For solo devs who want to stop losing context forever. One-time payment, lifetime access.",
    monthly: 350,
    annual: 350,
    originalPrice: 500,
    priceSub: "one-time · lifetime access",
    discount: "30% pre-launch discount",
    cta: "Pre-order on Steam",
    ctaVariant: "default" as const,
    ctaNote: "Only available on Steam",
    highlight: true,
    features: [
      "1 developer seat",
      "Unlimited decisions captured",
      "VSCode extension",
      "Git-native reasoning history",
      "Local-only storage",
      "Instant codebase Q&A",
      "Community support",
    ],
  },
  {
    name: "Team",
    badge: "Coming soon",
    desc: "For teams who never want to repeat the same conversation twice.",
    monthly: null,
    annual: null,
    priceSub: null,
    cta: "Book a call",
    ctaVariant: "outline" as const,
    ctaNote: "Be first when Team launches",
    highlight: false,
    features: [
      "Unlimited developer seats",
      "Unlimited repositories",
      "Team-wide knowledge base",
      "Decision Trail timeline",
      "Onboarding Mode for new hires",
      "Slack + Linear integration",
      "Self-healing PR suggestions",
      "Hosted on cloud server",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    badge: "Coming soon",
    desc: "For orgs with compliance, security, and scale requirements.",
    monthly: null,
    annual: null,
    priceSub: "custom pricing",
    cta: "Book a call",
    ctaVariant: "outline" as const,
    ctaNote: "Customise your plan",
    highlight: false,
    features: [
      "Unlimited everything",
      "SSO / SAML",
      "Audit logs",
      "On-prem deployment option",
      "Custom integrations",
      "Dedicated Slack channel",
      "SLA guarantee",
      "Everything in Team",
    ],
  },
];

const comparisonRows: {
  label: string;
  solo: string | boolean;
  team: string | boolean;
  enterprise: string | boolean;
}[] = [
  { label: "Developer seats", solo: "1", team: "Unlimited", enterprise: "Unlimited" },
  { label: "Repositories", solo: "1", team: "Unlimited", enterprise: "Unlimited" },
  { label: "Decisions captured", solo: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
  { label: "VSCode extension", solo: true, team: true, enterprise: true },
  { label: "Local-only storage", solo: true, team: true, enterprise: true },
  { label: "Instant codebase Q&A", solo: true, team: true, enterprise: true },
  { label: "Git-native history", solo: true, team: true, enterprise: true },
  { label: "Team knowledge base", solo: false, team: true, enterprise: true },
  { label: "Decision Trail", solo: false, team: true, enterprise: true },
  { label: "Onboarding Mode", solo: false, team: true, enterprise: true },
  { label: "Slack + Linear sync", solo: false, team: true, enterprise: true },
  { label: "Self-healing PRs", solo: false, team: true, enterprise: true },
  { label: "SSO / SAML", solo: false, team: false, enterprise: true },
  { label: "Audit logs", solo: false, team: false, enterprise: true },
  { label: "On-prem deployment", solo: false, team: false, enterprise: true },
  { label: "SLA guarantee", solo: false, team: false, enterprise: true },
  { label: "Support", solo: "Community", team: "Priority", enterprise: "Dedicated" },
];

const faqs = [
  {
    q: "How much does the Solo plan cost?",
    a: "Solo is a one-time payment of $500 — lifetime access, no subscription. During early access, it's $350 (30% off). This discount is available only while we're in alpha. Once we launch publicly, the price goes to $500 permanently.",
  },
  {
    q: "Why is Solo only available on Steam?",
    a: "Steam handles our distribution, licensing, and updates for Solo. It gives you a permanent license tied to your Steam account, automatic updates, and refund protection under Steam's standard policy. Just search 'Tsuin' on Steam to find it.",
  },
  {
    q: "How does local-only storage work? Does my code ever leave my machine?",
    a: "In the Solo plan, all reasoning and context is stored locally in your git repository. Nothing is sent to our servers. On the Team plan, encrypted reasoning metadata is synced to enable team-wide search — your actual source code never leaves your environment.",
  },
  {
    q: "How does the AI Twin learn? Do I need to write prompts or do anything special?",
    a: "No prompts, no friction. Tsuin passively observes as you code — commits, refactors, comments, and Slack discussions — and builds a model of your reasoning automatically. You get the context capture without the journaling overhead.",
  },
  {
    q: "Can I cancel or downgrade at any time?",
    a: "Yes, always. Cancel from your dashboard with one click. Your captured reasoning stays in your git repo regardless — Tsuin never holds your context hostage. If you downgrade from Team to Solo, you keep all locally stored history.",
  },
  {
    q: "What counts as a 'seat' on the Team plan?",
    a: "A seat is any developer who installs the Tsuin extension and is actively contributing reasoning to the shared knowledge base. Read-only users (e.g. product managers searching decisions) don't consume seats.",
  },
  {
    q: "Does Tsuin work with any language or framework?",
    a: "Yes. Tsuin is language-agnostic — it captures reasoning at the git and editor level, not the syntax level. TypeScript, Python, Go, Rust, Ruby: if you commit it, Tsuin understands it.",
  },
  {
    q: "What's included in the 14-day Team trial?",
    a: "Full access to every Team feature — unlimited seats, team knowledge base, Slack integration, Onboarding Mode, everything — for 14 days with no card required. At the end you choose to continue or revert to Solo automatically.",
  },
  {
    q: "How is Enterprise priced?",
    a: "Enterprise is custom-quoted based on team size, deployment model (cloud vs on-prem), and compliance requirements. Most Enterprise customers land between $12–18 per seat per month at volume. Reach out and we'll scope it within 24 hours.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function CellValue({ val }: { val: string | boolean }) {
  if (val === true) return <Check size={16} className="text-primary mx-auto" />;
  if (val === false) return <Minus size={14} className="text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm">{val}</span>;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        {q}
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-16 pb-10 md:pt-24 md:pb-14 text-center px-4">
        <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
          Pricing
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          For solo, own your AI Twin forever. Upgrade when your team is ready.
        </p>
      </section>

      {/* ── Plans ── */}
      <section className="pb-16 md:pb-24 px-4">
        <div className="mx-auto max-w-5xl grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map(({ name, badge, desc, monthly, originalPrice, discount, priceSub, cta, ctaVariant, ctaNote, highlight, features }: any) => {
            const price = monthly;
            return (
              <div
                key={name}
                className={`relative rounded-2xl border bg-card flex flex-col p-6 md:p-7 transition-shadow ${
                  highlight
                    ? "border-primary border-2 shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                <div className="flex justify-center mb-5" style={{ minHeight: "28px" }}>
                  {badge && (
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        badge === "Early Access"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                    {name}
                  </div>
                  <div className="flex items-baseline gap-2 mb-1" style={{ minHeight: "44px" }}>
                    {name === "Team" ? (
                      <span className="text-4xl font-semibold" style={{ fontFamily: "'Funnel Display', sans-serif" }}>
                        Subscription
                      </span>
                    ) : price === null ? (
                      <span className="text-4xl font-semibold" style={{ fontFamily: "'Funnel Display', sans-serif" }}>
                        Custom
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-semibold" style={{ fontFamily: "'Funnel Display', sans-serif" }}>
                          ${price}
                        </span>
                        {originalPrice && (
                          <span className="text-lg text-muted-foreground/50 line-through">
                            ${originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2" style={{ minHeight: "22px" }}>
                    {name === "Team" ? (
                      <p className="text-xs text-muted-foreground">monthly or annually</p>
                    ) : priceSub ? (
                      <p className="text-xs text-muted-foreground">{priceSub}</p>
                    ) : null}
                    {discount && (
                      <span className="text-xs font-medium bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-full">
                        {discount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      <span className={f === "Everything in Solo" || f === "Everything in Team" ? "text-muted-foreground italic" : ""}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <Button variant={ctaVariant} className="w-full gap-1.5 mb-2">
                    {cta} <ArrowRight size={14} />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">{ctaNote}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="pb-20 md:pb-28 px-4 bg-secondary/20">
        <div className="mx-auto max-w-5xl">
          <div className="pt-14 pb-10 text-center">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              Compare
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Everything in the details
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="text-left px-5 py-4 font-medium text-muted-foreground w-1/2">Feature</th>
                  <th className="text-center px-4 py-4 font-semibold">Solo</th>
                  <th className="text-center px-4 py-4 font-semibold text-primary">Team</th>
                  <th className="text-center px-4 py-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ label, solo, team, enterprise }, i) => (
                  <tr
                    key={label}
                    className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-card/50"}`}
                  >
                    <td className="px-5 py-3.5 text-muted-foreground">{label}</td>
                    <td className="px-4 py-3.5 text-center"><CellValue val={solo} /></td>
                    <td className="px-4 py-3.5 text-center bg-primary/5"><CellValue val={team} /></td>
                    <td className="px-4 py-3.5 text-center"><CellValue val={enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="py-12 px-4 text-center border-y border-border">
        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          "Tsuin cut our onboarding time in half. New engineers stop asking me why things are built a certain way — they just ask the Twin."
        </p>
        <p className="mt-3 text-xs font-medium text-foreground">
          — Staff Engineer, Series B startup (Pilot user)
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-4" id="faq">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Questions we get asked a lot
            </h2>
          </div>
          <div>
            {faqs.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="mailto:hello@tsuin.ai" className="text-primary hover:underline underline-offset-4">
              Email us
            </a>{" "}
            or join our{" "}
            <a href="#" className="text-primary hover:underline underline-offset-4">
              Discord
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 md:py-24 px-4 bg-secondary/20 text-center">
        <p className="text-xs uppercase tracking-widest text-primary mb-4 font-medium">
          Get started today
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Your context is slipping away right now.
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Every commit without Tsuin is reasoning lost forever. Start free in 30 seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Try Alpha0 <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Talk to sales
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          No credit card required · Works with any git repo · Cancel anytime
        </p>
      </section>

      <Footer />
    </div>
  );
}
