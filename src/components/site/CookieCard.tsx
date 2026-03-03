import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Cookie } from "lucide-react";
import { Shibasuke } from "@/components/site/Shibasuke";

type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

function save(analytics: boolean, marketing: boolean) {
  const consent: CookieConsent = {
    essential: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("tsuin_cookie_consent", JSON.stringify(consent));
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-t first:border-t-0">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold flex items-center gap-1.5">
          {label}
          {disabled && (
            <span className="text-[10px] text-muted-foreground border rounded px-1 py-0.5 font-normal">
              always on
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative shrink-0 mt-0.5 h-5 w-9 rounded-full transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${checked ? "bg-primary" : "bg-border"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200
            ${checked ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}

export function CookieCard() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tsuin_cookie_consent");
    if (!stored) setOpen(true);
  }, []);

  if (!open) return null;

  const acceptAll = () => {
    save(true, true);
    setOpen(false);
  };

  const acceptSelected = () => {
    save(analytics, marketing);
    setOpen(false);
  };

  const rejectAll = () => {
    save(false, false);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px] z-50">
      {/* Shibasuke cookie sits on top of the card */}
      <div className="flex justify-end pr-6 pointer-events-none">
        <Shibasuke pose="cookie" size={120} className="-mb-6 drop-shadow-md" />
      </div>
      <Card className="p-5 shadow-xl border-2">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="text-2xl leading-none mt-0.5">
            <Cookie size={24} className="text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ fontFamily: '"Funnel Display", sans-serif' }}>
              We baked some cookies.
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Not the chocolate chip kind — sadly. These are the digital ones that help us
              understand how you use the site. No one actually reads these banners, but{" "}
              <span className="text-foreground font-medium">lawyers insist.</span>
            </p>
          </div>
        </div>

        {/* What's in the cookies */}
        <div className="text-[11px] text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 mb-3 leading-relaxed">
          <span className="font-semibold text-foreground">Essential</span> (site works) ·{" "}
          <span className={analytics ? "font-semibold text-foreground" : ""}>Analytics</span>{" "}
          (we see what pages you visit) ·{" "}
          <span className={marketing ? "font-semibold text-foreground" : ""}>Marketing</span>{" "}
          (ads follow you like a lost puppy)
        </div>

        {/* Expandable preferences */}
        {expanded && (
          <div className="mb-3 border rounded-lg px-3 py-1">
            <Toggle
              label="Essential cookies"
              description="Login sessions, preferences, security. The site literally breaks without these. Not our fault."
              checked={true}
              disabled
            />
            <Toggle
              label="Analytics cookies"
              description="We use these to see which pages you actually read and which you bail from in 3 seconds."
              checked={analytics}
              onChange={setAnalytics}
            />
            <Toggle
              label="Marketing cookies"
              description="Enables ads to haunt you across the internet. You've been warned."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={acceptAll}>
              Accept all cookies
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={rejectAll}>
              Essential only
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? "Hide preferences" : "Manage preferences"}
            </button>
            {expanded && (
              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={acceptSelected}>
                Save my choices
              </Button>
            )}
            {!expanded && (
              <a
                href="#"
                className="text-[11px] text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Cookie policy
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
