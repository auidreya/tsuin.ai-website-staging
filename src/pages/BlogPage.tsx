import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const featured = {
  slug: "why-we-built-tsuin",
  category: "Company",
  title: "Why We Built Tsuin",
  subtitle:
    "Every engineer has inherited a codebase and wished the previous team left better breadcrumbs. We kept wishing for a tool that captured the reasoning — not just the code — so we built it.",
  author: "Tsuin Team",
  date: "Feb 12, 2026",
  readTime: "5 min read",
  color: "from-violet-500/30 via-indigo-500/20 to-purple-400/10",
};

const sidebarLeft = [
  {
    slug: "the-hidden-cost-of-context-loss",
    category: "Engineering",
    title: "The Hidden Cost of Context Loss in Fast-Growing Eng Teams",
    subtitle: "Attrition, rapid hiring, and reorgs erode institutional knowledge. We tried to quantify what that actually costs.",
    author: "Tsuin Team",
    date: "Feb 5, 2026",
    readTime: "8 min read",
    color: "from-teal-500/30 to-emerald-400/10",
  },
  {
    slug: "local-first-ai-tools",
    category: "Product",
    title: "Why Your AI Dev Tool Should Be Local-First",
    subtitle: "Sending your codebase to a third-party server is a trade-off most teams aren't consciously making.",
    author: "Tsuin Team",
    date: "Jan 28, 2026",
    readTime: "6 min read",
    color: "from-orange-500/30 to-amber-400/10",
  },
];

const recentWritings = [
  {
    slug: "adr-vs-logic-capture",
    category: "Engineering",
    title: "ADRs Are Great. So Why Does No One Fill Them In?",
    date: "Jan 20, 2026",
    color: "from-pink-500/30 to-rose-400/10",
  },
  {
    slug: "onboarding-new-engineers",
    category: "Product",
    title: "Cutting New Hire Ramp Time With an AI Twin",
    date: "Jan 10, 2026",
    color: "from-sky-500/30 to-blue-400/10",
  },
  {
    slug: "incident-response-context",
    category: "Engineering",
    title: "The 2am Incident and the Decision No One Remembered",
    date: "Dec 30, 2025",
    color: "from-red-500/30 to-orange-400/10",
  },
  {
    slug: "knowledge-graph-explained",
    category: "Concepts",
    title: "How Tsuin Builds a Knowledge Graph From Your Git History",
    date: "Dec 18, 2025",
    color: "from-cyan-500/30 to-teal-400/10",
  },
];

// ─── Card components ───────────────────────────────────────────────────────────

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
      {label}
    </span>
  );
}

/** Large hero card — center col */
function HeroCard({ post }: { post: typeof featured }) {
  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden cursor-pointer group h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="overflow-hidden h-64 md:h-80 shrink-0">
        <div
          className={`w-full h-full bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-105`}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <CategoryTag label={post.category} />
        <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.subtitle}
        </p>
        <div className="flex items-center gap-2 mt-5 text-xs text-muted-foreground">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
            T
          </div>
          <span>{post.author}</span>
          <span className="text-muted-foreground/40">·</span>
          <span>{post.date}</span>
          <span className="text-muted-foreground/40">·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}

/** Medium card — left sidebar */
function SideCard({ post }: { post: typeof sidebarLeft[number] }) {
  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden cursor-pointer group hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="overflow-hidden h-36 shrink-0">
        <div
          className={`w-full h-full bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-105`}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <CategoryTag label={post.category} />
        <h2 className="mt-1.5 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
          {post.title}
        </h2>
        <p className="text-xs text-muted-foreground mt-3">{post.date} · {post.readTime}</p>
      </div>
    </article>
  );
}

/** Horizontal thumbnail card — right sidebar */
function RecentCard({ post }: { post: typeof recentWritings[number] }) {
  return (
    <article className="flex gap-3 cursor-pointer group py-3 border-b border-border/50 last:border-0">
      <div className="overflow-hidden rounded-lg w-14 h-14 shrink-0">
        <div
          className={`w-full h-full bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-110`}
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <CategoryTag label={post.category} />
        <h3 className="mt-0.5 text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1">{post.date}</p>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">

        {/* ── Editorial grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* Left sidebar — 2 stacked medium cards */}
          <div className="lg:col-span-1 lg:order-1 flex flex-col gap-5">
            {sidebarLeft.map((post) => (
              <SideCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Featured hero — center */}
          <div className="lg:col-span-2 lg:order-2">
            <HeroCard post={featured} />
          </div>

          {/* Right sidebar — recent writings */}
          <div className="lg:col-span-1 lg:order-3">
            <div className="rounded-2xl border border-border bg-card p-5 h-full">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Recent Writings
                </p>
                <button className="flex items-center gap-1 text-xs text-primary hover:underline underline-offset-4 transition-colors">
                  View all <ArrowRight size={11} />
                </button>
              </div>
              <div className="mt-2">
                {recentWritings.map((post) => (
                  <RecentCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
