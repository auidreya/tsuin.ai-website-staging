import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const principles = [
  {
    n: "01",
    title: "Code is the artifact. Reasoning is the knowledge.",
    body: "A codebase without its history of decisions is a structure without blueprints. You can read every line and still not know why the walls are where they are. The reasoning behind the code — the trade-offs weighed, the paths rejected, the constraints that no longer exist — is the knowledge that makes software maintainable. We build tools that capture it.",
  },
  {
    n: "02",
    title: "Context loss is the real technical debt.",
    body: "The engineering industry has invested enormous effort in linting rules, type systems, and automated tests. All of it operates on the code itself. Almost nothing operates on the reason the code exists. When a senior engineer leaves, or when a decision made two years ago is revisited by someone who wasn't there, the loss is invisible — and catastrophic. We believe context loss is the most expensive form of technical debt, and the least measured.",
  },
  {
    n: "03",
    title: "The best knowledge capture is one you don't notice.",
    body: "Tools that require discipline to maintain are tools that get abandoned. Wikis go stale. Architecture decision records sit empty. Notion pages rot. We don't blame the engineers — we blame the friction. Tsuin's design principle is that capturing reasoning should be indistinguishable from coding. If you have to stop to document, we've already failed.",
  },
  {
    n: "04",
    title: "Local first, always.",
    body: "Your codebase is proprietary. Your architectural decisions are a competitive advantage. No product that genuinely respects that should require you to trust a third-party server with your source code or your reasoning. Tsuin processes everything locally by default. The cloud is opt-in, encrypted, and used only to enable features that are physically impossible to do locally. We will never change this.",
  },
  {
    n: "05",
    title: "The AI should know your codebase, not just code in general.",
    body: "General-purpose LLMs are useful. But they know nothing about why your auth service is structured the way it is, why you chose Postgres over MongoDB for this specific use case, or what the alternative was when you picked this library in 2022. An AI that knows your codebase is a different category of tool — it can answer the questions that actually slow teams down. We build that tool.",
  },
  {
    n: "06",
    title: "Engineering knowledge should survive org change.",
    body: "The half-life of institutional knowledge in a fast-growing engineering org is measured in months. Acquisitions, reorgs, attrition, rapid hiring: each event degrades the collective understanding of why things are built the way they are. We think this is solvable. Knowledge that is captured, structured, and versioned alongside code can outlast any individual, any team, and any reorg.",
  },
  {
    n: "07",
    title: "Surveillance and knowledge capture are opposites.",
    body: "Some tools monitor engineers to extract data. Tsuin gives engineers a tool to preserve their own thinking. The distinction matters. A knowledge tool that makes engineers feel watched is not a knowledge tool — it is a liability. Our privacy controls, our local-first architecture, and our refusal to offer manager-facing analytics are not concessions. They are the product.",
  },
];

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-primary mb-4 font-medium">
          Manifesto
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.08]">
          Engineering knowledge shouldn't die with a pull request.
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          We believe the most valuable thing an engineer produces is not the code — it's the
          understanding behind it. This is why we built Tsuin.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-4">
        <hr className="border-border" />
      </div>

      {/* Principles */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-2xl space-y-16">
          {principles.map(({ n, title, body }) => (
            <div key={n} className="flex gap-6 md:gap-10">
              <span
                className="text-3xl font-semibold text-muted-foreground/20 shrink-0 leading-none mt-1 select-none"
                style={{ fontFamily: "'Funnel Display', sans-serif" }}
              >
                {n}
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-4 leading-snug">
                  {title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-24 px-4 bg-secondary/20 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base sm:text-lg font-medium leading-relaxed mb-6">
            "We are building the tool we wish had existed every time we inherited a codebase, lost a colleague, or spent a week relearning a decision that took a day to make."
          </p>
          <p className="text-sm text-muted-foreground">— The Tsuin Team</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
