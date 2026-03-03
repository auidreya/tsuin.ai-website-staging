import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Solo",
    price: "Free",
    priceSub: "forever",
    desc: "For solo developers who want to stop losing context.",
    features: [
      "1 repository",
      "Up to 3 contributors",
      "Unlimited decisions captured",
      "VSCode extension",
      "Local-only storage",
    ],
    cta: "Get started free",
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Team",
    price: "$19",
    priceSub: "per seat / month",
    desc: "For teams that need shared context across the whole codebase.",
    features: [
      "Unlimited repositories",
      "Up to 20 contributors",
      "Team knowledge search",
      "Slack integration",
      "Priority support",
      "All Solo features",
    ],
    cta: "Start free trial",
    variant: "default" as const,
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSub: "volume pricing",
    desc: "For larger orgs with compliance and security requirements.",
    features: [
      "Unlimited everything",
      "SSO / SAML",
      "Audit logs",
      "Custom integrations",
      "Dedicated Slack support",
      "SLA guarantee",
    ],
    cta: "Talk to us",
    variant: "outline" as const,
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            Pricing
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Start free. Upgrade when your team is ready.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map(({ name, price, priceSub, desc, features, cta, variant, highlight }) => (
            <Card
              key={name}
              className={`p-6 flex flex-col ${
                highlight ? "border-primary border-2 shadow-lg shadow-primary/10" : ""
              }`}
            >
              {highlight && (
                <div className="text-xs font-semibold text-primary mb-3 uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <div className="font-medium text-muted-foreground text-sm mb-1">{name}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold">{price}</span>
                  {priceSub && (
                    <span className="text-xs text-muted-foreground">{priceSub}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={variant} className="w-full">
                {cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
