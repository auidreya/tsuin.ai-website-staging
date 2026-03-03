import { useState } from "react";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const stats = [
  { value: "Seed", label: "Funding stage" },
  { value: "8", label: "Team size" },
  { value: "Remote", label: "Work style" },
  { value: "KL · SF", label: "Offices" },
];

const values = [
  {
    title: "Context over process",
    desc: "We care more about understanding why something is being built than following a rigid process. Documentation of reasoning is first-class.",
  },
  {
    title: "Ownership, end to end",
    desc: "Everyone ships to production. There are no handoff ceremonies. You own what you build from design to deployment to monitoring.",
  },
  {
    title: "Honest by default",
    desc: "We say what we mean in code reviews, product discussions, and 1:1s. Diplomatic honesty, not dishonest diplomacy.",
  },
  {
    title: "Build for engineers, as engineers",
    desc: "Every team member is a developer-first thinker. We use our own product. If something irritates us, we fix it.",
  },
];

const benefits = [
  "Competitive salary + meaningful equity",
  "Full remote — work from anywhere",
  "Quarterly in-person sprints (KL & SF)",
  "Generous equipment budget",
  "Health, dental & vision coverage",
  "Unlimited PTO (and we mean it)",
  "Learning & conference budget",
  "Direct access to founders and early customers",
];

const openRoles = [
  {
    id: 1,
    title: "Senior Full-Stack Engineer",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    desc: "Own the VSCode extension and the local daemon end-to-end. You'll be the primary engineer on the capture pipeline and the local vector index.",
  },
  {
    id: 2,
    title: "ML Engineer — Embeddings & Retrieval",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    desc: "Improve our local embedding model and hybrid retrieval system. Work on fine-tuning, benchmarking, and ONNX runtime optimisation for on-device inference.",
  },
  {
    id: 3,
    title: "Product Designer",
    dept: "Design",
    type: "Full-time",
    location: "Remote",
    desc: "Design the IDE extension, the web dashboard, and the onboarding experience for new engineers. You'll own the design system and work directly with the founders.",
  },
  {
    id: 4,
    title: "Developer Advocate",
    dept: "Growth",
    type: "Full-time",
    location: "Remote",
    desc: "Write, speak, and build demos that help engineers understand and adopt Tsuin. You're half educator, half engineer, and fully autonomous.",
  },
  {
    id: 5,
    title: "Enterprise Account Executive",
    dept: "Sales",
    type: "Full-time",
    location: "San Francisco / Remote",
    desc: "Own the full enterprise sales cycle from first call to signed contract. Work closely with engineering to translate customer needs into product requirements.",
  },
];

const departments = ["All", "Engineering", "Design", "Growth", "Sales"];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");

  const filtered =
    activeDept === "All" ? openRoles : openRoles.filter((r) => r.dept === activeDept);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-16 pb-14 md:pt-24 md:pb-20 text-center px-4">
        <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
          Careers
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-5 max-w-3xl mx-auto leading-[1.08]">
          Help us fix how engineering knowledge is preserved.
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
          We're a small team working on a problem that affects every engineering org on the planet. Join us early.
        </p>
        <Button size="lg" className="gap-2">
          See open roles <ArrowRight size={16} />
        </Button>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-4 bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div
                className="text-3xl font-semibold mb-1"
                style={{ fontFamily: "'Funnel Display', sans-serif" }}
              >
                {value}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              How we work
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              What we care about
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="font-semibold mb-2">{title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-14 md:py-20 px-4 bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              Perks
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              What you get
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div
                key={b}
                className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ── */}
      <section className="py-14 md:py-24 px-4" id="roles">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              Open positions
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {openRoles.length} roles open right now
            </h2>
          </div>

          {/* Department filter */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                  activeDept === dept
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Role cards */}
          <div className="space-y-3">
            {filtered.map(({ id, title, dept, type, location, desc }) => (
              <div
                key={id}
                className="rounded-xl border border-border bg-card p-5 md:p-6 flex flex-col md:flex-row md:items-start gap-4 hover:border-primary/40 transition-colors group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {dept}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{desc}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={12} /> {type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} /> {location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> Apply by rolling basis
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 gap-1.5 self-start md:self-center">
                  Apply <ArrowRight size={13} />
                </Button>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground text-sm">
                No open roles in this department right now. Check back soon.
              </div>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            Don't see the right role?{" "}
            <a href="mailto:hello@tsuin.ai" className="text-primary hover:underline underline-offset-4">
              Send us a note
            </a>{" "}
            — we always read speculative applications from great engineers.
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 md:py-24 px-4 bg-secondary/20 border-t border-border text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Ready to build something that matters?
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          We're early, we move fast, and the problem we're solving is real. Come help us fix it.
        </p>
        <Button size="lg" className="gap-2">
          View open roles <ArrowRight size={16} />
        </Button>
        <p className="mt-5 text-xs text-muted-foreground">
          Remote-first · Seed stage · Ships weekly
        </p>
      </section>

      <Footer />
    </div>
  );
}
