import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, ChevronDown, BookOpen, Lightbulb, Cpu, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

const links = [
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
];

const docsSections = [
  { icon: BookOpen,   label: "Getting Started", id: "getting-started", desc: "Install, configure, and make your first capture." },
  { icon: Lightbulb,  label: "Concepts",        id: "concepts",        desc: "AI Twin, Logic Capture, Knowledge Graph and more." },
  { icon: Cpu,        label: "How it Works",    id: "how-it-works",    desc: "Data flow, storage, and the model layer." },
  { icon: HelpCircle, label: "FAQ",             id: "faq",             desc: "Common questions answered directly." },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  function openDocs() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDocsOpen(true);
  }

  function closeDocs() {
    closeTimer.current = setTimeout(() => setDocsOpen(false), 120);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img
              src={
                theme === "dark"
                  ? "/tsuin.ai-logo.ai/tsuin-white-horizontal-full.png"
                  : "/tsuin.ai-logo.ai/tsuin-black-horizontal-full.png"
              }
              alt="Tsuin"
              className="h-7 w-auto"
              style={theme === "light" ? { mixBlendMode: "multiply" } : undefined}
            />
          </Link>
          <span className="hidden sm:inline-flex text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
            Alpha
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {links.map(({ label, href }) => {
            const isActive = href === location.pathname;
            return href.startsWith("/") && !href.startsWith("/#") ? (
              <Link
                key={label}
                to={href}
                className={`hover:text-foreground transition-colors ${isActive ? "text-foreground font-medium" : ""}`}
              >
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className="hover:text-foreground transition-colors">
                {label}
              </a>
            );
          })}

          {/* Docs dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={openDocs}
            onMouseLeave={closeDocs}
          >
            <button
              className={`flex items-center gap-1 hover:text-foreground transition-colors ${docsOpen ? "text-foreground" : ""}`}
            >
              Docs
              <ChevronDown
                size={13}
                className={`transition-transform duration-150 ${docsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown panel */}
            {docsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl border border-border bg-background shadow-xl shadow-black/10 p-2"
                onMouseEnter={openDocs}
                onMouseLeave={closeDocs}
              >
                {/* Arrow */}
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 border-l border-t border-border bg-background" />

                {docsSections.map(({ icon: Icon, label, id, desc }) => (
                  <Link
                    key={id}
                    to={`/docs?section=${id}`}
                    onClick={() => setDocsOpen(false)}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <Icon size={15} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground leading-none mb-1">{label}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </Button>
          <Button className="hidden sm:inline-flex">Try Alpha0</Button>
          <button
            className="md:hidden p-2 -mr-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur px-4 py-4 flex flex-col gap-1">
          {links.map(({ label, href }) =>
            href.startsWith("/") && !href.startsWith("/#") ? (
              <Link
                key={label}
                to={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/50"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 border-b border-border/50"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            )
          )}

          {/* Docs accordion in mobile */}
          <div className="border-b border-border/50">
            <button
              className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5"
              onClick={() => setMobileDocsOpen((v) => !v)}
            >
              Docs
              <ChevronDown size={14} className={`transition-transform duration-150 ${mobileDocsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileDocsOpen && (
              <div className="pb-2 space-y-0.5">
                {docsSections.map(({ icon: Icon, label, id }) => (
                  <Link
                    key={id}
                    to={`/docs?section=${id}`}
                    className="flex items-center gap-2.5 py-2 pl-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => { setMobileOpen(false); setMobileDocsOpen(false); }}
                  >
                    <Icon size={13} className="text-primary" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Button className="w-full mt-3">Try Alpha0</Button>
        </div>
      )}
    </header>
  );
}
