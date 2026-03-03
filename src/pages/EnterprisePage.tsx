import { useState } from "react";
import {
  ArrowRight, Server, Cloud, ShieldCheck, Users, GitBranch,
  Search, Lock, BarChart3, Headphones, Settings2, CheckCircle2, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// ─── Data ──────────────────────────────────────────────────────────────────────

const deploymentOptions = [
  {
    icon: Server,
    title: "On-Premise",
    tag: "Full sovereignty",
    desc: "Deploy Tsuin entirely within your own infrastructure — VPC, private cloud, or air-gapped environments. Your code, your decisions, your servers. Nothing leaves your perimeter.",
    bullets: [
      "Runs inside your VPC or on bare metal",
      "Air-gapped deployment supported",
      "Full data sovereignty — zero cloud dependency",
      "Bring your own LLM inference endpoint",
      "Custom retention and deletion policies",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud",
    tag: "Instant setup",
    desc: "Fully managed by Tsuin. Spin up in minutes, not months. SOC 2 compliant, end-to-end encrypted, with dedicated tenant isolation so your data is never co-mingled.",
    bullets: [
      "Provisioned in under 10 minutes",
      "Dedicated tenant — no shared infrastructure",
      "End-to-end encryption at rest and in transit",
      "99.9% uptime SLA with automated failover",
      "Managed updates, no ops burden on your team",
    ],
  },
];

const capabilities = [
  {
    icon: Lock,
    title: "SSO / SAML",
    desc: "Integrate with Okta, Azure AD, Google Workspace, or any SAML 2.0 provider. One login, full access control.",
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    desc: "Granular permissions per engineer, team, and repository. Define who can read, contribute, or admin the knowledge base.",
  },
  {
    icon: ShieldCheck,
    title: "Audit Logs",
    desc: "Every query, every decision captured, every access event — logged and exportable. Full compliance trail for SOC 2, ISO 27001, GDPR.",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    desc: "Usage analytics by team, cost per engineer, adoption metrics, and knowledge base health — all in one place.",
  },
  {
    icon: GitBranch,
    title: "Custom Integrations",
    desc: "Webhooks, REST API, and native connectors for GitHub, GitLab, Bitbucket, Slack, Linear, Jira, and Confluence.",
  },
  {
    icon: Search,
    title: "Enterprise Knowledge Search",
    desc: "Cross-repo, cross-team semantic search. Any engineer can query the entire org's decision history in milliseconds.",
  },
  {
    icon: Settings2,
    title: "Policy Controls",
    desc: "Set retention periods, restrict LLM models, enforce capture requirements per team — from a single admin panel.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "A named support engineer, a private Slack channel, and a guaranteed SLA. We're on call so your team doesn't get blocked.",
  },
];

const useCases = [
  {
    title: "New hire onboarding",
    desc: "Cut ramp time from 3 months to 3 weeks. New engineers get instant access to the 'why' behind every architectural decision without pinging senior engineers.",
    stat: "~60%",
    statLabel: "reduction in ramp time (pilot data)",
  },
  {
    title: "Knowledge retention",
    desc: "When a staff engineer leaves, their entire reasoning history stays. No more institutional knowledge walking out the door.",
    stat: "100%",
    statLabel: "of context preserved on offboarding",
  },
  {
    title: "Incident response",
    desc: "During an outage, engineers can instantly query 'what changed in this service and why' — across every commit, PR, and Slack discussion.",
    stat: "<2 min",
    statLabel: "average time-to-context in incidents",
  },
];

const integrations = [
  "GitHub", "GitLab", "Bitbucket", "Slack", "Linear", "Jira", "Confluence", "Okta", "Azure AD",
];

const faqs = [
  {
    q: "How long does an on-premise deployment take?",
    a: "Most on-premise deployments go live within 2–4 weeks. We provide a Helm chart for Kubernetes, Docker Compose for simpler setups, and a dedicated implementation engineer to guide your team.",
  },
  {
    q: "What LLM providers does Tsuin Enterprise support?",
    a: "Any. Tsuin is inference-agnostic. Point it at your Azure OpenAI deployment, Amazon Bedrock, GCP Vertex, a private Ollama instance, or any OpenAI-compatible endpoint. No vendor lock-in.",
  },
  {
    q: "Does Tsuin train on our code or decisions?",
    a: "Never. Your codebase and captured decisions are never used to train Tsuin's models. On-premise deployments have zero telemetry by default. Cloud deployments send only anonymised usage metrics — no code, no reasoning content.",
  },
  {
    q: "What compliance certifications does Tsuin hold?",
    a: "SOC 2 Type II audit is in progress (expected Q3 2026). On-premise deployments inherit your own compliance posture. We provide a security questionnaire, DPA, and architecture diagrams on request.",
  },
  {
    q: "Can we pilot Enterprise before committing?",
    a: "Yes. We run a 30-day paid pilot for teams of 5–20 engineers to validate ROI before a full rollout. Book a call and we'll scope it with you.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function Faq({ q, a }: { q: string; a: string }) {
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
      {open && <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-16 pb-14 md:pt-24 md:pb-20 text-center px-4">
        <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
          Enterprise
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-5 max-w-3xl mx-auto leading-[1.1]">
          The AI Twin your whole engineering org can trust.
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
          Deploy on your infrastructure or ours. Either way, your code stays yours — and your team's collective reasoning is preserved forever.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Book a call <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Download security brief
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Usually responds within 1 business day · No obligation
        </p>
      </section>

      {/* ── Deployment choice ── */}
      <section className="py-14 md:py-20 px-4 bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              Deployment
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              Deploy on your terms
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Choose the model that fits your security posture. Switch between them at any time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {deploymentOptions.map(({ icon: Icon, title, tag, desc, bullets }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-xs text-primary font-medium">{tag}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2.5 mt-auto">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security callout ── */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              We don't see your code. Ever.
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tsuin processes all reasoning locally — in your IDE, in your repo, on your servers. Even on the cloud plan, your source code is never transmitted to Tsuin's infrastructure. The AI Twin is trained on your patterns and stored in your environment. We never use your data to train our models.
            </p>
          </div>
        </div>
      </section>

      {/* ── Capabilities grid ── */}
      <section className="py-14 md:py-20 px-4 bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Built for how enterprises actually work
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon size={17} className="text-primary" />
                </div>
                <div className="font-semibold text-sm mb-1.5">{title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases with stats ── */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              Use cases
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Where teams see ROI first
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {useCases.map(({ title, desc, stat, statLabel }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
                <div
                  className="text-4xl font-semibold text-primary mb-1"
                  style={{ fontFamily: "'Funnel Display', sans-serif" }}
                >
                  {stat}
                </div>
                <div className="text-xs text-muted-foreground mb-5">{statLabel}</div>
                <div className="font-semibold text-sm mb-2">{title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="py-12 md:py-16 px-4 bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
            Connects with your existing stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <div
                key={name}
                className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium"
              >
                {name}
              </div>
            ))}
            <div className="px-4 py-2 rounded-lg border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground">
              + more via API
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Common enterprise questions
            </h2>
          </div>
          <div>
            {faqs.map(({ q, a }) => (
              <Faq key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 md:py-24 px-4 bg-secondary/20 border-t border-border text-center">
        <p className="text-xs uppercase tracking-widest text-primary mb-4 font-medium">
          Get started
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Ready to bring Tsuin to your org?
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          We'll scope a deployment plan, answer your security questions, and get your team into a pilot within a week.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            Book a call <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Download security brief
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          On-premise or cloud · Custom SLA · Dedicated support engineer
        </p>
      </section>

      <Footer />
    </div>
  );
}
