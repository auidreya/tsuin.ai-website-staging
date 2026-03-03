import { ArrowRight, HardDrive, Lock, Layers, Infinity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: HardDrive,
    title: "On-premise, always",
    desc: "Runs locally on your machine. No cloud dependency, no subscriptions, no data leaving your desk.",
  },
  {
    icon: Lock,
    title: "Your data, full stop",
    desc: "Reasoning, decisions, captures — all stored in your git repo. You own it, version it, take it anywhere.",
  },
  {
    icon: Layers,
    title: "Floats on your screen",
    desc: "Not in your IDE. Not in a terminal tab. A lightweight window that lives on your desktop, ready whenever you are.",
  },
  {
    icon: Infinity,
    title: "Pay once. Keep forever.",
    desc: "No monthly billing. No renewal emails. One payment — lifetime access, all future updates included.",
  },
];

export function SoloPlan() {
  return (
    <div className="dark">
      <section className="py-14 md:py-24 bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — pitch */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
                Solo Plan
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 leading-[1.1]">
                Your AI Twin.
                <br />
                <span className="text-primary">On your machine. Forever.</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                Solo is built for the developer who wants complete ownership. Your Twin runs locally, learns from how you work, and never phones home. You buy it once — it's yours for life.
              </p>

              {/* Price block */}
              <div className="inline-flex items-baseline gap-3 mb-8">
                <span
                  className="text-5xl font-semibold text-foreground"
                  style={{ fontFamily: "'Funnel Display', sans-serif" }}
                >
                  $350
                </span>
                <span className="text-xl text-muted-foreground/50 line-through">$500</span>
                <span className="text-xs font-semibold bg-primary/20 text-primary px-2.5 py-1 rounded-full">
                  30% pre-launch discount
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-8 -mt-4">
                One-time payment · Lifetime access · Only on Steam
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="gap-2">
                  Pre-order on Steam <ArrowRight size={16} />
                </Button>
                <Link
                  to="/pricing"
                  className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
                >
                  See full pricing
                </Link>
              </div>
            </div>

            {/* Right — pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon size={17} className="text-primary" />
                  </div>
                  <div className="font-semibold text-sm mb-1.5">{title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
