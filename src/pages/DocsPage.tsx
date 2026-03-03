import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, Lightbulb, Cpu, HelpCircle, ChevronRight, Menu, X } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// ─── Content ──────────────────────────────────────────────────────────────────

const docs = [
  {
    id: "getting-started",
    icon: BookOpen,
    title: "Getting Started",
    sections: [
      {
        heading: "What is Tsuin?",
        body: [
          "Tsuin is a local-first developer tool that captures the reasoning behind your code as you write it — not the code itself, but the decisions, trade-offs, and context that explain why the code is the way it is.",
          "Every engineer carries implicit knowledge: why you chose Redis over Postgres, why that API is rate-limited, why the retry logic works the way it does. Tsuin externalises that knowledge into a searchable, versioned record that lives alongside your git history.",
          "Tsuin runs as a VSCode extension. It observes your editing patterns, commit messages, and optionally your Slack threads — then surfaces the relevant decision context when you or a teammate revisits that code.",
        ],
      },
      {
        heading: "First Logic Capture Session",
        body: [
          "After installing the extension, open any file in your project. You'll see a small Tsuin status indicator in the bottom bar. When you begin editing, Tsuin enters a passive observation mode — it does not interrupt your flow.",
          "To make your first explicit capture, trigger the command palette (`Cmd+Shift+P`) and run `Tsuin: Capture Decision`. A lightweight panel slides in asking: what decision did you just make, and why? Your answer is linked to the current file, line range, and the current git commit SHA.",
          "You don't need to do this every time. Tsuin also captures implicitly from commit messages and comments prefixed with `// tsuin:`. The explicit capture is for decisions too nuanced to fit in a commit message.",
        ],
      },
      {
        heading: "How to work with your own AI Twin",
        body: [
          "Your AI Twin is not a chatbot. It is a model of your own engineering judgment — trained exclusively on your captures, commits, and (optionally) your team's Slack discussions. It can only answer questions grounded in decisions that have actually been captured.",
          "To query your Twin, use the Tsuin sidebar panel and type a natural-language question: \"Why is this service stateless?\" or \"Who decided to use this library and what were the alternatives?\". The Twin responds with cited answers — every claim links back to the original capture.",
          "Your Twin improves as you capture more. In the first week it will have sparse coverage. By 30 days of normal use, most architectural decisions in active files will be covered.",
        ],
      },
      {
        heading: "Installation Guide",
        body: [
          "**VSCode**: Search for `Tsuin` in the Extensions Marketplace, or install via `ext install tsuin.tsuin-vscode`. After installation, sign in with your Tsuin account (or create one — the Solo plan is free).",
          "**JetBrains** (coming soon — Team plan): The JetBrains plugin is in closed beta. Join the waitlist from your dashboard.",
          "**CLI**: `npm install -g @tsuin/cli` gives you `tsuin capture`, `tsuin query`, and `tsuin export` commands for scripting and CI integration. Run `tsuin auth login` to connect it to your account.",
          "On first run, Tsuin indexes your current repo's git history to seed initial context. This is a one-time process and runs locally — no data is uploaded during indexing.",
        ],
      },
    ],
  },
  {
    id: "concepts",
    icon: Lightbulb,
    title: "Concepts",
    sections: [
      {
        heading: "What is AI Twin?",
        body: [
          "Your AI Twin is a personalised inference layer built from your own engineering history. Unlike a general-purpose LLM, it is scoped entirely to decisions you — and optionally your team — have made and captured. It does not hallucinate architectural rationale; it only surfaces what has been recorded.",
          "Technically, the Twin is a retrieval-augmented system: your captures are embedded into a local vector index, and when you ask a question, the most relevant captures are retrieved and passed to a language model as grounding context. The LLM synthesises a coherent answer; the captures provide the facts.",
          "The Twin is yours. On the Solo plan, the index lives entirely on your machine. On the Team plan, the index is encrypted and hosted per-tenant. In neither case does Tsuin use your captures to train shared models.",
        ],
      },
      {
        heading: 'What is "Logic Capture"?',
        body: [
          "Logic Capture is Tsuin's term for the act of recording a decision and its reasoning at the moment it is made. A capture is not a comment, not a ticket, and not a commit message — though it can be seeded from all three.",
          "A capture contains: the decision itself (what was chosen), the rationale (why), the alternatives considered (what was rejected), the author and timestamp, and a code anchor (the file, line range, and commit SHA where the decision is embodied).",
          "Captures are stored as structured JSON files inside a `.tsuin/` directory at the root of your repository. They are committed alongside your code, so they version with it. Checking out a branch gives you the captures that were active when that branch was last touched.",
        ],
      },
      {
        heading: "Knowledge Graph Explained",
        body: [
          "As captures accumulate, Tsuin builds a Knowledge Graph — a directed graph where nodes are decisions, code locations, authors, and concepts, and edges represent relationships: \"this decision influenced that one\", \"this file embodies these decisions\", \"these two decisions were made in the same context\".",
          "The graph is used to surface related context you didn't explicitly ask for. When you open a file, Tsuin can show not just the decisions anchored to that file, but decisions in connected files that explain why this file exists at all.",
          "The graph is computed locally and stored in `.tsuin/graph.db` (a SQLite file). It is rebuilt incrementally on each commit. You can inspect it with `tsuin graph --visualise` which opens a browser-based node graph.",
        ],
      },
      {
        heading: "Scenarios Replay",
        body: [
          "Scenarios Replay lets you reconstruct the decision-making context of any past moment in your codebase. Given a commit SHA or date range, Tsuin replays which decisions were active, what the state of the knowledge graph was, and what a new engineer would have seen if they'd joined on that day.",
          "This is particularly useful for incident post-mortems: you can replay the context as it existed when a bug was introduced, see what decisions were being made at that time, and understand whether the context that would have prevented the bug was missing or simply not captured.",
          "Replay is read-only and non-destructive. It creates a temporary in-memory snapshot of the graph state and does not alter your current captures.",
        ],
      },
      {
        heading: "Selective Capture & Privacy Settings",
        body: [
          "Not every decision should be captured. Tsuin gives you explicit control over what is and isn't recorded — because the goal is signal, not surveillance.",
          "You can exclude paths, file patterns, or entire directories from capture using a `.tsuin/ignore` file (same syntax as `.gitignore`). Anything matched is never indexed, never embedded, and never sent anywhere. This is how you keep credentials, personal notes, or sensitive business logic out of the Twin.",
          "Within a capture session, you can also mark individual captures as `private`. Private captures are stored locally only and are never synced to the Team knowledge base, even on the Team plan. Use this for decisions you want to remember personally but aren't ready to share with the broader team.",
          "The philosophy: Tsuin should feel like a trusted notebook, not a monitoring tool. You decide what goes in. The ignore file and private captures are the two mechanisms that enforce that boundary.",
        ],
      },
    ],
  },
  {
    id: "how-it-works",
    icon: Cpu,
    title: "How it Works",
    sections: [
      {
        heading: "Data Flow Architecture",
        body: [
          "When you make a capture (explicitly or implicitly), the data flows as follows: the raw capture JSON is written to `.tsuin/captures/` in your repo → the local Tsuin daemon picks it up → embeds it using a local embedding model (no network call) → writes the vector to `.tsuin/index/` → updates the graph in `.tsuin/graph.db`.",
          "On the Solo plan, the flow ends there. Everything is local. When you query your Twin, the query is embedded locally, the top-k captures are retrieved from the local index, and the result is passed to whichever LLM you have configured (local or API-based).",
          "On the Team plan, after the local write, captures are also encrypted with your tenant key and synced to Tsuin's cloud index — enabling cross-team search and the shared knowledge base. Your source code is never part of this sync; only the capture JSON is.",
        ],
      },
      {
        heading: "Local vs Cloud Processing",
        body: [
          "Embedding (turning captures into vectors) always happens locally. The embedding model runs in-process inside the VSCode extension using ONNX Runtime. This means no capture content ever leaves your machine as part of the embedding step.",
          "Inference (answering questions) can be local or cloud depending on your configuration. By default, Tsuin uses your configured API key (OpenAI, Anthropic, etc.) for the language model step. You can override this with a local model via Ollama by setting `tsuin.llm.provider = 'ollama'` in your settings.",
          "On the Team plan, the cloud index stores encrypted capture embeddings — not capture text. Decryption only happens client-side. Tsuin's servers process search queries against encrypted vectors without ever seeing plaintext capture content.",
        ],
      },
      {
        heading: "What Data is Stored",
        body: [
          "Locally (all plans): `.tsuin/captures/*.json` — raw capture records. `.tsuin/index/` — local vector index (FAISS). `.tsuin/graph.db` — SQLite knowledge graph. `.tsuin/settings.json` — local configuration.",
          "Cloud (Team/Enterprise only): Encrypted capture embeddings and metadata (author, timestamp, file path, capture ID). The capture body text is encrypted client-side before upload. Tsuin's infrastructure holds ciphertext only.",
          "What is never stored anywhere: your source code, file contents, compiler output, test results, or any data not explicitly written into a capture by you or the implicit capture pipeline you have configured.",
        ],
      },
      {
        heading: "How Context is Linked to Code",
        body: [
          "Each capture is anchored to a code location via a stable identifier: the file path relative to repo root + the byte-range of the relevant lines + the git tree SHA at the time of capture. This triple uniquely identifies a code location at a point in time.",
          "When the code is refactored and lines move, Tsuin uses git blame data to re-anchor captures to their new locations. If a section is deleted entirely, the capture is marked `orphaned` — it remains in the graph and is still searchable, but the IDE annotation is removed.",
          "This anchoring strategy means captures degrade gracefully rather than going stale silently. An orphaned capture is a signal that a decision was made about code that no longer exists — which is itself useful context.",
        ],
      },
      {
        heading: "Model Layer Overview",
        body: [
          "Tsuin has three model components: the Embedding Model, the Retrieval Layer, and the Generation Model.",
          "The **Embedding Model** is a fine-tuned variant of `nomic-embed-text` optimised for code-adjacent reasoning text (not code itself). It runs locally via ONNX and produces 768-dimensional vectors.",
          "The **Retrieval Layer** is a hybrid search combining dense vector similarity (FAISS) and sparse BM25 keyword matching. The top-k results are re-ranked using a cross-encoder before being passed to generation.",
          "The **Generation Model** is the LLM of your choice (configurable). Tsuin provides a system prompt and structured context but does not fine-tune the generation model. The quality of answers is bounded by the quality of your captures, not by the LLM.",
        ],
      },
    ],
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    sections: [
      {
        heading: "Does this slow down my IDE?",
        body: [
          "No measurable impact during normal editing. The Tsuin daemon runs as a separate process and communicates with the extension over a local socket. Capture processing (embedding + graph update) is async and debounced — it never blocks the editor thread.",
          "The embedding model loads once at startup (~200ms on first open) and stays resident. Incremental embedding of a single capture takes 10–40ms depending on length, runs in the background, and is invisible during editing.",
          "If you notice slowness, run `tsuin diagnostics` in the terminal. The most common cause is a large initial indexing run on a repo with thousands of commits. This only happens once and can be paused and resumed.",
        ],
      },
      {
        heading: "Is this surveillance?",
        body: [
          "No. Tsuin does not record keystrokes, screenshots, time-on-file, or any behavioural telemetry. It captures decisions — structured records that you author, explicitly or through the implicit pipeline you configure.",
          "The implicit pipeline (seeding from commit messages and `// tsuin:` comments) only runs on content you have already committed or explicitly written. It does not monitor your drafts, unsaved files, or clipboard.",
          "On the Team plan, managers and admins can search the shared knowledge base — but they see only the same captures any team member would see. There is no hidden analytics layer, no productivity scoring, and no 'who's doing what' dashboard. Tsuin is a knowledge tool, not a monitoring tool.",
        ],
      },
      {
        heading: "Does it train on my private code?",
        body: [
          "Never. Tsuin does not use your captures, your code, or your query history to train any model — ours or anyone else's. This applies to all plans, including the cloud Team plan.",
          "The embedding model shipped with Tsuin was trained on open-source code and documentation. The generation model is whatever LLM you configure — Tsuin passes your captures to it as context, but does not fine-tune it and does not retain query logs on our servers.",
          "If you are on the Enterprise on-premise plan, no data of any kind ever reaches Tsuin's infrastructure. The entire stack runs in your environment.",
        ],
      },
      {
        heading: "Can I delete Twin memory?",
        body: [
          "Yes, at any granularity. To delete a single capture: open it in the Tsuin panel and click Delete, or run `tsuin delete <capture-id>`. The capture is removed from the index, the graph, and the `.tsuin/captures/` directory, and a deletion tombstone is committed to your repo.",
          "To wipe all captures for a file: `tsuin delete --file path/to/file.ts`. To wipe the entire local index and start fresh: `tsuin reset --confirm`. This deletes all captures, the vector index, and the graph — but does not delete your git history.",
          "On the Team plan, deleting a capture also queues a deletion from the cloud index. Deletion propagates to all team members' local caches within the next sync cycle (typically under 60 seconds).",
        ],
      },
    ],
  },
];

// ─── Shared doc layout ────────────────────────────────────────────────────────

function DocContent({ doc }: { doc: typeof docs[number] }) {
  return (
    <article className="max-w-2xl">
      <div className="flex items-center gap-2.5 mb-2">
        <doc.icon size={18} className="text-primary" />
        <p className="text-xs uppercase tracking-widest text-primary font-medium">{doc.title}</p>
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">{doc.title}</h1>

      <div className="space-y-12">
        {doc.sections.map(({ heading, body }) => (
          <section key={heading} id={heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}>
            <h2 className="text-lg font-semibold tracking-tight mb-4 scroll-mt-24">{heading}</h2>
            <div className="space-y-3">
              {body.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {para.split(/(\*\*[^*]+\*\*)/).map((chunk, j) =>
                    chunk.startsWith("**") && chunk.endsWith("**") ? (
                      <strong key={j} className="text-foreground font-semibold">
                        {chunk.slice(2, -2)}
                      </strong>
                    ) : (
                      chunk
                    )
                  )}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [searchParams] = useSearchParams();
  const [activeId, setActiveId] = useState(() => {
    const section = searchParams.get("section");
    return docs.find((d) => d.id === section)?.id ?? docs[0].id;
  });

  useEffect(() => {
    const section = searchParams.get("section");
    if (section && docs.find((d) => d.id === section)) {
      setActiveId(section);
    }
  }, [searchParams]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeDoc = docs.find((d) => d.id === activeId)!;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex flex-1 mx-auto w-full max-w-6xl px-4 py-10 gap-8">

        {/* ── Mobile section picker ── */}
        <div className="md:hidden mb-6 w-full">
          <button
            className="flex items-center gap-2 text-sm font-medium border border-border rounded-lg px-4 py-2.5 bg-card w-full justify-between"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <span className="flex items-center gap-2">
              <activeDoc.icon size={15} className="text-primary" />
              {activeDoc.title}
            </span>
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
          {sidebarOpen && (
            <div className="mt-1 rounded-lg border border-border bg-card overflow-hidden">
              {docs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => { setActiveId(doc.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left border-b border-border/50 last:border-0 transition-colors ${
                    activeId === doc.id ? "text-foreground font-medium bg-primary/5" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <doc.icon size={14} className={activeId === doc.id ? "text-primary" : ""} />
                  {doc.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4 px-2">
            Documentation
          </p>
          <nav className="space-y-0.5">
            {docs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveId(doc.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  activeId === doc.id
                    ? "bg-primary/10 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <doc.icon size={14} className={activeId === doc.id ? "text-primary" : ""} />
                {doc.title}
                {activeId === doc.id && (
                  <ChevronRight size={13} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </nav>

          {/* In-page section anchors */}
          {activeDoc.sections.length > 0 && (
            <div className="mt-8 pl-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium mb-3">
                On this page
              </p>
              <div className="space-y-1.5 border-l border-border pl-3">
                {activeDoc.sections.map(({ heading }) => (
                  <a
                    key={heading}
                    href={`#${heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors leading-snug py-0.5"
                  >
                    {heading}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">
          <DocContent doc={activeDoc} />

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
            {docs[docs.findIndex((d) => d.id === activeId) - 1] ? (
              <button
                onClick={() => setActiveId(docs[docs.findIndex((d) => d.id === activeId) - 1].id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight size={15} className="rotate-180" />
                {docs[docs.findIndex((d) => d.id === activeId) - 1].title}
              </button>
            ) : <div />}
            {docs[docs.findIndex((d) => d.id === activeId) + 1] ? (
              <button
                onClick={() => setActiveId(docs[docs.findIndex((d) => d.id === activeId) + 1].id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {docs[docs.findIndex((d) => d.id === activeId) + 1].title}
                <ChevronRight size={15} />
              </button>
            ) : <div />}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
