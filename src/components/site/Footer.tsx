import { Link } from "react-router-dom";
import { useTheme } from "@/lib/theme";

const explore: { label: string; href: string }[] = [
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

const company: { label: string; href: string }[] = [
  { label: "About", href: "#" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const connect = ["Discord", "X / Twitter", "LinkedIn", "GitHub"];

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="border-t bg-background py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Brand + links */}
        <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4">
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
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Capture your logic, offload the maintenance, and never fix the same
              bug twice.
            </p>
          </div>

          {/* Link columns — 3-col on mobile when brand is full-width */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {company.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("/") && !href.startsWith("/#") ? (
                    <Link to={href} className="hover:text-accent-foreground transition-colors">
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="hover:text-accent-foreground transition-colors">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {explore.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("/") && !href.startsWith("/#") ? (
                    <Link to={href} className="hover:text-accent-foreground transition-colors">
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="hover:text-accent-foreground transition-colors">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {connect.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-accent-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 Tsuin AI. All rights reserved.</span>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="hover:text-accent-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
