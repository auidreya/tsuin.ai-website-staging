import React from "react";
import { Button } from "@/components/ui/button";
import { Gridlines } from "@/components/site/Gridlines";
import { Shibasuke } from "@/components/site/Shibasuke";
import { ArrowRight, Play } from "lucide-react";

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="w-4 shrink-0 text-right select-none" style={{ color: "#3b4261" }}>
        {n}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

function TerminalMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl border"
      style={{ background: "#1a1b26", borderColor: "#2f334d" }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#16161e", borderBottom: "1px solid #2f334d" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#f7768e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#e0af68" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#9ece6a" }} />
        </div>
        <span className="text-xs ml-2 truncate" style={{ color: "#787c99" }}>
          token.service.ts
        </span>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
          style={{ background: "rgba(42,195,222,0.12)", color: "#2ac3de" }}
        >
          ✦ Tsuin active
        </span>
      </div>

      {/* Split pane */}
      <div className="flex" style={{ minHeight: "260px" }}>
        {/* Code editor */}
        <div
          className="flex-1 p-4 font-mono text-xs leading-loose overflow-hidden min-w-0"
          style={{ color: "#c0caf5" }}
        >
          <div className="space-y-0.5">
            <Line n={1}>
              <span style={{ color: "#565f89" }}>// token.service.ts</span>
            </Line>
            <Line n={2}><span /></Line>
            <Line n={3}>
              <span style={{ color: "#bb9af7" }}>async function </span>
              <span style={{ color: "#7aa2f7" }}>rotateRefreshToken</span>
              <span>(</span>
            </Line>
            <Line n={4}>
              <span>&nbsp;&nbsp;</span>
              <span style={{ color: "#e0af68" }}>userId</span>
              <span style={{ color: "#2ac3de" }}>: string</span>
            </Line>
            <Line n={5}><span>{") {"}</span></Line>
            <Line n={6}>
              <span style={{ color: "#565f89" }}>&nbsp;&nbsp;{"// 7-day TTL — see Tsuin ↗"}</span>
            </Line>
            <Line n={7}>
              <span>&nbsp;&nbsp;</span>
              <span style={{ color: "#bb9af7" }}>const </span>
              <span style={{ color: "#e0af68" }}>ttl </span>
              <span>= </span>
              <span style={{ color: "#ff9e64" }}>604800</span>
              <span>;</span>
            </Line>
            <Line n={8}>
              <span>&nbsp;&nbsp;</span>
              <span style={{ color: "#bb9af7" }}>await </span>
              <span>redis.</span>
              <span style={{ color: "#7aa2f7" }}>setex</span>
              <span>(</span>
            </Line>
            <Line n={9}>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span style={{ color: "#9ece6a" }}>
                {"`refresh:${"}userId{"}`"}
              </span>
              <span>,</span>
            </Line>
            <Line n={10}>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span style={{ color: "#e0af68" }}>ttl</span>
              <span>, </span>
              <span style={{ color: "#e0af68" }}>newToken</span>
            </Line>
            <Line n={11}><span>&nbsp;&nbsp;);</span></Line>
            <Line n={12}><span>{"}"}</span></Line>
          </div>
        </div>

        {/* Tsuin reasoning pane — hidden on mobile */}
        <div
          className="hidden sm:block w-52 p-4 text-xs shrink-0"
          style={{
            background: "#1f2335",
            borderLeft: "1px solid #2f334d",
            color: "#c0caf5",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold" style={{ color: "#2ac3de" }}>
              ✦ Tsuin
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: "rgba(42,195,222,0.1)", color: "#2ac3de" }}
            >
              Decision
            </span>
          </div>

          <div className="font-semibold mb-2" style={{ color: "#e0af68" }}>
            Redis over Postgres
          </div>
          <p
            className="leading-relaxed mb-4"
            style={{ color: "#787c99", fontSize: "11px" }}
          >
            "Postgres token table was hitting 400ms P99 at 50k req/s. Redis brought
            it to {"<"}8ms. Tried JWT blacklist first — added too much complexity."
          </p>

          <div
            className="flex items-center gap-2 pt-3"
            style={{ borderTop: "1px solid #2f334d" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "#2ac3de", color: "#1a1b26" }}
            >
              S
            </div>
            <div>
              <div style={{ color: "#c0caf5", fontSize: "10px" }}>Sarah Chen</div>
              <div style={{ color: "#565f89", fontSize: "10px" }}>Feb 14, 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Gridlines />
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-xs text-muted-foreground mb-4">
              For solo plan · Pay once · No subscription · Lifetime access
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
              Save your best
              <br />
              <span className="text-primary">thoughts.</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Your AI Twin captures your technical intent in real-time, so it can
              handle the maintenance, the onboarding, and the "why did we do this?"
              pings while you stay in the flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Try Alpha0 <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto"
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play size={14} /> Watch demo (2 min)
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Built for engineers who hate context switching.
            </p>
          </div>

          {/* Terminal mockup */}
          <div className="relative">
            <TerminalMockup />
            {/* Shibasuke — only on lg+ so it doesn't overlap on tablet */}
            <div className="hidden lg:block absolute -bottom-10 -right-8 z-10">
              <Shibasuke pose="mascot" size={150} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
